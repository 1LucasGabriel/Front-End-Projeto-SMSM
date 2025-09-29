from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ExamRequestBase(BaseModel):
    exam_type: str

class ExamRequestCreate(ExamRequestBase):
    pass

class ExamRequestUpdate(BaseModel):
    exam_type: Optional[str] = None
    status: Optional[str] = None

class ExamRequestOut(ExamRequestBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True