from dns.e164 import query
import uuid
from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.jwt import decode_token
from app.models.user import User

oauth2_schem=OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_current_user(
    token:str=Depends(oauth2_schem),
    db:AsyncSession=Depends(get_db)

)->User:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials or token expired",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload=decode_token(token,settings.JWT_ACCESS_SECRET)
    if payload is None:
        raise credentials_exception

    if payload.get("type")!="access":
        raise credentials_exception

    user_id_str=payload.get("sub")
    if not user_id_str:
        raise credentials_exception

    try:
        user_id=uuid.UUID(user_id_str)
    except ValueError:
        raise credentials_exception

    
    query =select(User).where(User.id==user_id)
    result=await db.execute(query)
    user=result.scalar_one_or_none()

    if user is None:
        raise credentials_exception
    
    return user