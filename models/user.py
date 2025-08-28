from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base
from models.health_unit import HealthUnit

class User(Base):
    """Modelo de Usuário."""
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    cpf = Column(String, unique=True, index=True)
    professional_registration = Column(String, unique=True, nullable=True)
    hashed_password = Column(String)
    user_type = Column(String)
    health_unit_id = Column(Integer, ForeignKey("health_units.id"), nullable=True)
    health_unit = relationship("HealthUnit", back_populates="users")
