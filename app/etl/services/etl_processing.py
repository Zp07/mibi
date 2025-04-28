import io
import pandas as pd
from fastapi import UploadFile
from db.connections import get_db_connection, ensure_table_exists
from utils.validator import validate_file_column, check_data_duplicate


async def process_file(file: UploadFile) -> str:
    """
    Procesa el archivo y realiza operaciones ETL.

    Args:
        file(archivo) :(UploadFile): el archivo a procesar.
    """

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

    # Verificar si hay datos duplicados por fecha 
    await check_data_duplicate(df)

    # Insertar los datos en la base de datos
    rows_inserted = await insert_data_to_db(df)

    return f"Archivo {file.filename} procesado exitosamente. {rows_inserted} registros insertados."

async def insert_data_to_db(df: pd.DataFrame) -> int:
    """
    Insertar datos en la base de datos.

    Args:
        df (pd.DataFrame): El DataFrame insertado en la base de datos.
    """
    conn = await get_db_connection()
    rows_inserted = 0

    try:
        for _, row in df.iterrows():
            await conn.execute(
                """
                INSERT INTO mibi_db
                (fecha, producto, cantidad, precio_unitario, total)
                VALUES ($1, $2, $3, $4, $5)
                """,
                row['fecha'],
                row['producto'],
                row['cantidad'],
                row['precio_unitario'],
                row['total'],
            )
            rows_inserted += 1
    finally:
        await conn.close()

    return rows_inserted
