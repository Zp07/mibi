from fastapi import APIRouter, UploadFile, File, Depends, Request, HTTPException
from utils.jwt import JWTBearer
from services.etl_processing import process_file
from utils.validator import validate_file_extension

router = APIRouter()

@router.get("/")
async def get_ventas(client_id: str ):
    """
    Recibe client_id y devuelve un mensaje de bienvenida verificando el login.
    """
    return "hello"
    

 
@router.post("/upload_file", dependencies=[Depends(JWTBearer())])
async def upload_file(request: Request, file: UploadFile = File(...)): 
    """
    Cargar el archivo, valida y firma con client_id del token.
    """

    #Validar Extension
    await validate_file_extension(file)
    client_id = request.state.client_id
    
    try:
        # procesar el archivo
        result =  await process_file(file, client_id)
        return {"status": "¡ Exitoso !", "message": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar  archivo: {str(e)}")