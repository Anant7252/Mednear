from app.core.jwt import decode_token
from app.core.security import verify_password
from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
import uuid
from app.core.database import get_db
from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import (
    LoginRequest,
    TokenResponse,
    UserRegisterRequest,
    UserResponse,
    RefreshTokenRequest,
    AccessTokenResponse
)
from app.core.config import settings
from app.core.jwt import create_access_token,create_refresh_token
from app.core.dependencies import get_current_user
router=APIRouter(prefix="/auth",tags=["Authentication"])

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="REGISTER A NEW USER ACCOUNT",
)

async def register_user(
    payload:UserRegisterRequest,
    db:AsyncSession=Depends(get_db),
):
    query=select(User).where(User.email==payload.email)
    result=await db.execute(query)
    existing_user=result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Auser with this email address already exist"
        )

    hash_pwd=hash_password(payload.password)
    new_user=User(
        email=payload.email,
        phone=payload.phone,
        password_hash=hash_pwd,
        role=payload.role,
    )
    db.add(new_user)
    await db.flush()
    await db.refresh(new_user)

    return new_user


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Log in with email and password to receive JWT tokens",
)
async def login_user(
    payload:OAuth2PasswordRequestForm=Depends(),
    db:AsyncSession=Depends(get_db),
):
    query=select(User).where(User.email==payload.username)
    result=await db.execute(query)
    user=result.scalar_one_or_none()

    if not user or not verify_password(payload.password,user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token=create_access_token(user.id,user.role.value)
    refresh_token=create_refresh_token(user.id)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=user,
    )


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current authenticated user profile",
)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user),
):
    """
    Returns the profile of the user making the request.
    Requires a valid JWT Bearer access token.
    """
    return current_user

@router.post(
    "/refresh",
    response_model=AccessTokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Renew an expired access token using a valid refresh token",
)
async def refresh_aceess_token(
    payload:RefreshTokenRequest,
    db:AsyncSession=Depends(get_db)
):
    decoded = decode_token(payload.refresh_token, settings.JWT_REFRESH_SECRET)
    if not decoded or decoded.get("type") !='refresh':
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id=uuid.UUID(decoded["sub"])
    query=select(User).where(User.id ==user_id)
    result=await db.execute(query)
    user=result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User no longer exist"
        )

    new_access_token=create_access_token(user.id,user.role.value)
    return AccessTokenResponse(
        access_token=new_access_token,
        token_type="bearer"
    )
