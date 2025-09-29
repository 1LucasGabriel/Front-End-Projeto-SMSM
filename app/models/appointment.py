from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime

class Appointment(Base):
    """Modelo de Agendamento que associa uma demanda a uma vaga."""
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Chaves estrangeiras
    vaga_id = Column(Integer, ForeignKey("slots.id"), unique=True)
    paciente_id = Column(Integer, ForeignKey("users.id"))
    
    # Demanda pode ser de exame ou consulta
    solicitacao_exame_id = Column(Integer, ForeignKey("exam_requests.id"), nullable=True, unique=True)
    solicitacao_consulta_id = Column(Integer, ForeignKey("consultation_requests.id"), nullable=True, unique=True)
    
    data_agendamento = Column(DateTime, default=datetime.utcnow)
    
    # Relações
    vaga = relationship("Slot", back_populates="agendamento")
    paciente = relationship("User", back_populates="agendamentos")
    solicitacao_exame = relationship("ExamRequest", back_populates="agendamento")
    solicitacao_consulta = relationship("ConsultationRequest", back_populates="agendamento")