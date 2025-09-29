from sqlalchemy import Column, Integer, String, Date, DateTime
from core.database import Base

class ConsultationRequest(Base):
    """
    Modelo SQLAlchemy para requisições de consulta.
    """
    __tablename__ = "consultation_requests"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String, index=True)
    patient_email = Column(String, index=True)
    request_date = Column(Date)
    request_time = Column(DateTime)
    reason = Column(String)
    status = Column(String, default="Pendente")
