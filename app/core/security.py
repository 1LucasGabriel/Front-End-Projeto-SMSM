import os
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from core.database import get_db
from models.user import User

# Inicializa a criptografia para hashing de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Obtenha a chave secreta e o algoritmo de variáveis do ambiente
SECRET_KEY = os.getenv("SECRET_KEY", "Quem_invadir_é_gay")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 dias

# Esquema de segurança para extrair o token do cabeçalho da requisição
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se uma senha em texto plano corresponde a uma senha com hash.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Cria um hash para uma senha.
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Cria um token de acesso JWT.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Usa a constante para definir o tempo de expiração
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def obter_usuario_atual(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Obtém o usuário atual com base no token JWT.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # A biblioteca `jose` lida com a decodificação
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        # Lida com erros de decodificação do token
        raise credentials_exception
