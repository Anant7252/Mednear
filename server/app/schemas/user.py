import uuid 
from datetime import datetime 
from pydantic import BaseModel, EmailStr,Field

from app.models.user import UserRole

class UserRegisterRequest(BaseModel):
    email:EmailStr
    password:str=Field(
        min_length=8,
        max_length=128,
        description="Password must be between 8 and 128 characters long",
    )
    phone:str |None =Field(
        default=None,
        max_length=20,
        description="optional contact phone number",

    )

    role:UserRole=Field(
        default=UserRole.CUSTOMER,
        description= "Role of the user (customer, shop_owner, or admin)",
    )

class UserResponse(BaseModel):
    id:uuid.UUID
    email:EmailStr
    phone:str|None
    role:UserRole
    created_at:datetime

    model_config={"from_attributes":True}


class LoginRequest(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):
    access_token:str
    refresh_token:str
    token_types:str="bearer"
    user:UserResponse


class RefreshTokenRequest(BaseModel):
    refresh_token:str

class AccessTokenResponse(BaseModel):
    access_token:str
    token_type:str="bearer"

