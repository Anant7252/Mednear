import uuid
from datetime import datetime,timedelta,timezone
from typing import Any
import jwt
from app.core.config import settings

ALGORITHM="HS256"

def create_access_token(user_id:uuid.UUID ,role:str)->str:
    now=datetime.now(timezone.utc)
    expire=now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload:dict[str,Any]={
        "sub":str(user_id),
        "role":role,
        "type":"access",
        "iat":now,
        "exp":expire
    }

    encoded_jwt=jwt.encode(payload,settings.JWT_ACCESS_SECRET,algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(user_id:uuid.UUID)->str:
    now=datetime.now(timezone.utc)
    expire=now+timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    payload:dict[str,Any]={
        "sub":str(user_id),
        "type":"refresh",
        "iat":now,
        "exp":expire,
    }
    encoded_jwt=jwt.encode(payload,settings.JWT_REFRESH_SECRET,algorithm=ALGORITHM)
    return  encoded_jwt


def decode_token(token:str,secret:str)-> dict[str,Any] | None :
    try:
        payload=jwt.decode(token,secret,algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None