import uvicorn
from fastapi import FastAPI
from api.v1.routers import api_router
from core.database import Base, engine

# Cria as tabelas no banco de dados.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API do Sistema de Saúde")

# Inclui todos os routers da API
app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
