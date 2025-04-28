import os
import asyncpg
from db.models import DB_SCHEMA

# Configuración de la conexión a la base de datos
DB_CONFIG = { 
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", 5432)),
}

# Funcion para obtener la conexión a la base de datos
async def get_db_connection():
    """
    Obtiene una conexión a la base de datos.
    """
    conn = await asyncpg.connect(**DB_CONFIG)
    return conn

# Funcion para crear la tabla si no existe
async def ensure_table_exists():
    """
    Crea la tabla si no existe.
    """
    conn = await get_db_connection()
    try:
        await conn.execute(DB_SCHEMA)
    finally:
        await conn.close()
