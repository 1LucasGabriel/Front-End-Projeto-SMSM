# app/main.py
# Ponto de entrada principal da aplicação FastAPI.
from fastapi import FastAPI
from sqlalchemy import text
from core.database import Base, engine, get_db
from api.v1.routers import api_router
import uvicorn

# Inicializa o banco de dados
def criar_tabelas():
    Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Saúde API",
    description="API para gerenciar usuários, unidades de saúde, solicitações e agendamentos.",
    version="1.0.0",
)

@app.on_event("startup")
def ao_iniciar():
    """Cria as tabelas do banco de dados ao iniciar a aplicação."""
    criar_tabelas()
    print("Tabelas criadas ou já existentes no banco de dados.")

# Inclui o router principal da API
app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
