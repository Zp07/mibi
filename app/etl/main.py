import os
from fastapi import FastAPI
from routes.routes import router
from middleware.cors import setup_cors

# validar variables de entorno
required_env_vars = ["DB_USER", "DB_PASSWORD", "DB_NAME", "DB_HOST", "DB_PORT"]
for var in required_env_vars:
    if not os.getenv(var):
        raise ValueError(f"La variable de entorno {var} es requerida.")

# Configuración de la aplicación FastAPI
app = FastAPI(
    title='MIBI ETL',
    description='API para la carga de archivos CSV, JSON y XLSX.',
    version='0.0.1',
)

# Configurar CORS
setup_cors(app)  

# Incluir rutas de la API
app.include_router(router, prefix="/api/v1", tags=["ETL"])

# Inicio del servidor
@app.get("/")
def ping():
    return {"message": "Bienvenido a MIBI ETL"}