from fastapi import APIRouter, UploadFile, File, HTTPException
from services.etl_processing import process_file
from utils.validator import validate_file_extension

router = APIRouter()

@router.get("/")
async def get_ventas(cliendt_id: str ):
    """
    Recibe client_id y devuelve un mensaje de bienvenida verificando el login.
    """
    

 
@router.post("/upload_file")
async def upload_file(file: UploadFile = File(...), client_id: str = None): 
    """
    Cargar el archivo al servidor.
    """
    #Validar Extension
    await validate_file_extension(file)

    try:
        # procesar el archivo
        result =  await process_file(file)
        return {"status": "¡ Exitoso !", "message": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar  archivo: {str(e)}")