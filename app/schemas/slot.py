from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SlotBase(BaseModel):
    data: datetime
    tipo_servico: str
    profissional_id: int
    unidade_saude_id: int

class SlotCreate(SlotBase):
    pass

class SlotUpdate(BaseModel):
    data: Optional[datetime] = None
    tipo_servico: Optional[str] = None
    profissional_id: Optional[int] = None
    unidade_saude_id: Optional[int] = None
    status: Optional[str] = None

class SlotOut(SlotBase):
    id: int
    status: str
    class Config:
        from_attributes = True
