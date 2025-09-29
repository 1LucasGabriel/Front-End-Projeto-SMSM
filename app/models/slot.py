from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime

class Slot(Base):
    """Modelo de Vaga disponível para agendamento."""
    __tablename__ = "slots"
    
    id = Column(Integer, primary_key=True, index=True)
    data = Column(DateTime)
    tipo_servico = Column(String) # 'consulta' ou 'exame'
    status = Column(String, default="disponivel") # 'disponivel', 'ocupada'
    
    # Chaves estrangeiras
    profissional_id = Column(Integer, ForeignKey("users.id"))
    unidade_saude_id = Column(Integer, ForeignKey("health_units.id"))
    
    # Relações
    profissional = relationship("User", back_populates="vagas")
    unidade_saude = relationship("HealthUnit", back_populates="vagas")
    agendamento = relationship("Appointment", back_populates="vaga", uselist=False)
