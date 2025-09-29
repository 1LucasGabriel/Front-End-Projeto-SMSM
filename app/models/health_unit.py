from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class HealthUnit(Base):
    """Modelo de Unidade de Saúde."""
    __tablename__ = "health_units"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    phone = Column(String, nullable=True)
    users = relationship("User", back_populates="health_unit")