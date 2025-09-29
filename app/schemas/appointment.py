# Esquemas de dados (Pydantic) para agendamentos.
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AppointmentCreate(BaseModel):
    demanda_id: int
    vaga_id: int
    tipo_demanda: str = Field(..., description="Pode ser 'exame' ou 'consulta'")

class AppointmentUpdate(BaseModel):
    vaga_id: Optional[int] = None

class AppointmentOut(BaseModel):
    id: int
    vaga_id: int
    paciente_id: int
    solicitacao_exame_id: Optional[int] = None
    solicitacao_consulta_id: Optional[int] = None
    data_agendamento: datetime
    class Config:
        from_attributes = True
