import jwt
import os
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error:bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)

        if credentials:
            try:
                payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
                request.state.client_id = payload["client_id"]
                return credentials.credentials
            except jwt.ExpiredSignatureError:
                raise HTTPException(status_code=401, detail="Token Expiro")
            except jwt.InvalidTokenError:
                raise HTTPException(status_code=401, detail="Token invalido")
        raise HTTPException(status_code=403, detail="Autenticación requerida")