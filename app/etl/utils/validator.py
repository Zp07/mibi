import io
import asyncpg
import pandas as pd
from fastapi import UploadFile, HTTPException
from datetime import datetime
from db.connections import get_db_connection

async def validate_file_extension(file: UploadFile):
    """
    Valida la extension del archivo.
    """
    
    if not file.filename.endswith(('.csv', '.json', '.xlsx')):
        raise HTTPException(status_code=400, detail="Solo se permiten archivos csv, json, xlsx.")
    
async def validate_file_column(df: pd.DataFrame):
    """
    Valida las columnas requeridas del archivo.
    """
    required_colums = ['fecha', 'producto', 'cantidad', 'precio_unitario']
    missing_columns = [col for col in required_colums if col not in df.columns]

    if missing_columns:
        raise HTTPException(status_code=400, detail=f"El archivo debe contener las columnas: {', '.join(missing_columns)}")
    
async def check_data_duplicate(df: pd.DataFrame):
    """
    Verifica si hay datos duplicados por fechas y client_id en base de datos.
    """
    conn = await get_db_connection()
    unique_dates = df['fecha'].unique()
    client_id = df['client_id'].iloc[0] 
    dates_with_data = []    

    try: 
        for date in unique_dates:
            date_str = date.isoformat() if isinstance(date, datetime) else date
            count = await conn.fetchval(
                "SELECT COUNT(*) FROM mibi_db WHERE fecha = $1 AND client_id = $2", date_str, client_id
            )
            if count > 0:
                dates_with_data.append(date_str) 
    finally:
        await conn.close()

    if dates_with_data:
        raise HTTPException(status_code=400, detail=f"Ya existen datos para las siguientes fechas: {', '.join(dates_with_data)}. No se procesó el archivo.")