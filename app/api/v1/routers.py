from fastapi import APIRouter
from api.v1.endpoints import auth, users, exams, consultations, scheduling

api_router = APIRouter()

# Routers dos módulos
api_router.include_router(auth.router, prefix="/auth")
api_router.include_router(users.router, prefix="/users")
api_router.include_router(exams.router, prefix="/exams")
api_router.include_router(consultations.router, prefix="/consultations")
api_router.include_router(scheduling.router, prefix="/scheduling")
