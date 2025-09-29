from sqlalchemy import Column, Integer, String, DateTime
from core.database import Base
from datetime import datetime, timezone

class ExamRequest(Base):
    """Modelo de banco de dados para uma solicitação de exame."""
    __tablename__ = "exam_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    exam_type = Column(String, index=True)
    status = Column(String, default="pendente")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))