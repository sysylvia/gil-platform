"""User and profile Pydantic schemas
These match the TypeScript definitions in frontend/src/types/user.ts
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# User schemas
class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    full_name: str
    profession: str


class User(UserBase):
    id: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Profile schemas
class UserProfileBase(BaseModel):
    full_name: str
    profession: str
    specialty: Optional[str] = None
    years_experience: Optional[int] = None
    country: Optional[str] = None
    institution: Optional[str] = None


class UserProfileCreate(UserProfileBase):
    pass


class UserProfile(UserProfileBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Competence profile schemas
class CompetenceProfile(BaseModel):
    id: str
    user_id: str
    domain: str
    theta: float = 0.0  # IRT ability estimate
    standard_error: float = 1.0
    num_assessments: int = 0
    last_updated: datetime

    class Config:
        from_attributes = True


# Authentication schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str
    profession: str


class AuthTokens(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AuthResponse(BaseModel):
    user: User
    tokens: AuthTokens
