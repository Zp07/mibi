import io
import uuid
import pandas as pd
from fastapi import UploadFile
import traceback
import logging
from db.connections import get_db_connection, ensure_table_exists
from utils.validator import validate_file_column, check_data_duplicate


async def process_file(file: UploadFile, client_id: str) -> str:
    """
    Procesa el archivo y realiza operaciones ETL.
    """
    try:
        # Asegura que la tabla existe
        await ensure_table_exists()

        # Leer el archivo en memoria
        content = await file.read()

        # Convertir a dataframe según el tipo de archivo
        content_stream = io.BytesIO(content)

        if file.filename.endswith('.csv'):
            df = pd.read_csv(content_stream)
        elif file.filename.endswith('.json'):
            df = pd.read_json(content_stream)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(content_stream)
        else:
            raise ValueError("Formato no soportado. Unicamente archivos CSV, JSON, y XLSX.")
        
        # Validar las columnas del archivo
        await validate_file_column(df)

        # Preparar los datos
        df['fecha'] = pd.to_datetime(df['fecha']).dt.date

        if "total" not in df.columns:
            df['total'] = df['cantidad'] * df['precio_unitario']

        # Agregar la columna client_id
        df['client_id'] = client_id

        # Verificar si hay datos duplicados por fecha y client_id
        await check_data_duplicate(df)

        # Insertar los datos en la base de datos
        rows_inserted = await insert_data_to_db(df)

        return f"Archivo {file.filename} procesado exitosamente. {rows_inserted} registros insertados."
    except Exception as e:
        logging.error("Error procesando archivo: %s", str(e))
        traceback.print_exec()
        raise
async def insert_data_to_db(df: pd.DataFrame) -> int:
    """
    Insertar datos en la base de datos.
    """
    conn = await get_db_connection()
    try:
        records = [
            (
                row.fecha,
                str(row.producto),
                int(row.cantidad),
                float(row.precio_unitario),
                float(row.total),
                str(row.client_id)
            )
            for row in df.itertuples(index=False)
        ]
        await conn.executemany(
            """
            INSERT INTO ventas_mibi
            (fecha, producto, cantidad, precio_unitario, total, client_id)
            VALUES ($1, $2, $3, $4, $5,$6)
            """,
            records
            )
        logging.info(f"{len(records)} registros insertados correctamente en ventas_mibi.")
        return len(records)
    finally:
        await conn.close()

