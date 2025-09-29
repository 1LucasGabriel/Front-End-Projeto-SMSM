from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

class HealthUnitBase(BaseModel):
    name: str
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str

class UserCreate(UserBase):
    cpf: str
    password: str
    user_type: str = "doctor"
    professional_registration: Optional[str] = None
    health_unit_id: Optional[int] = None

class UserUpdate(BaseModel):
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    user_type: Optional[str] = None
    professional_registration: Optional[str] = None
    health_unit_id: Optional[int] = None

class UserOut(UserBase):
    id: int
    user_type: str
    cpf: str
    professional_registration: Optional[str] = None
    health_unit: Optional[HealthUnitBase] = None
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str