from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from schemas.user import UserOut, UserCreate, Token
from models.user import User
from core.database import get_db
from core.security import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel


router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.cpf == user_data.cpf).first():
        raise HTTPException(status_code=400, detail="CPF already registered.")
    if user_data.professional_registration and db.query(User).filter(User.professional_registration == user_data.professional_registration).first():
        raise HTTPException(status_code=400, detail="Professional registration already registered.")
    
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        username=user_data.username,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        cpf=user_data.cpf,
        professional_registration=user_data.professional_registration,
        hashed_password=hashed_password,
        user_type=user_data.user_type,
        health_unit_id=user_data.health_unit_id
    )
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Integrity error. Check if the data is valid.")

class LoginSchema(BaseModel):
    username: str
    password: str

@router.post("/login", response_model=Token)
def login_for_access_token(db: Session = Depends(get_db), login: LoginSchema = Depends()):
    user = db.query(User).filter(User.username == login.username).first()
    if not user or not verify_password(login.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}