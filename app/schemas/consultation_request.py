from pydantic import BaseModel, Field, conint, EmailStr
from datetime import datetime, date
from typing import Optional

class ConsultationRequestBase(BaseModel):
    patient_name: str
    patient_email: EmailStr
    request_date: date
    request_time: datetime
    reason: str
    status: Optional[str] = Field(default="Pendente", description="Status da solicitação (Pendente, Aprovado, Rejeitado)")

class ConsultationRequestCreate(ConsultationRequestBase):

    pass

class ConsultationRequestUpdate(ConsultationRequestBase):

    pass

class ConsultationRequestInDB(ConsultationRequestBase):
    id: int

    class Config:
        from_attributes = True

class ConsultationRequestOut(ConsultationRequestInDB):

    pass
