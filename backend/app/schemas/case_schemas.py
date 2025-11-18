"""Clinical case Pydantic schemas
These match the TypeScript definitions in frontend/src/types/case.ts
"""

from datetime import datetime
from typing import Optional, Dict, Any, List, Literal
from pydantic import BaseModel, Field


# Demographics and vitals
class Demographics(BaseModel):
    age: int
    sex: Literal['M', 'F', 'Other']
    location: Optional[str] = None


class VitalSigns(BaseModel):
    temperature: Optional[float] = None
    heart_rate: Optional[int] = None
    blood_pressure: Optional[str] = None
    respiratory_rate: Optional[int] = None
    oxygen_saturation: Optional[int] = None


class CaseContent(BaseModel):
    presentation: str
    demographics: Demographics
    vitals: Optional[VitalSigns] = None
    lab_results: Optional[Dict[str, Any]] = None
    imaging: Optional[List[str]] = None
    additional_info: Optional[str] = None


class IRTParameters(BaseModel):
    difficulty: float
    discrimination: float
    guessing: Optional[float] = None


# Clinical case schemas
class ClinicalCaseBase(BaseModel):
    content: CaseContent
    parameters: IRTParameters
    domain: str
    difficulty: float


class ClinicalCaseCreate(ClinicalCaseBase):
    pass


class ClinicalCase(ClinicalCaseBase):
    id: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Reference differential schemas
class ReferenceDifferentialBase(BaseModel):
    diagnosis_code: str
    diagnosis_name: str
    rank: int  # 1 = most likely
    weight: float = 1.0
    is_critical: bool = False  # "Not-to-miss" diagnosis


class ReferenceDifferentialCreate(ReferenceDifferentialBase):
    case_id: str


class ReferenceDifferential(ReferenceDifferentialBase):
    id: str
    case_id: str

    class Config:
        from_attributes = True


# Differential diagnosis entry schemas
class DiagnosisEntry(BaseModel):
    code: str
    name: str
    confidence: Literal['high', 'medium', 'low']
    reasoning: Optional[str] = None


class DifferentialDiagnosis(BaseModel):
    entries: List[DiagnosisEntry]
    critical_flagged: List[str] = Field(default_factory=list)  # Diagnosis codes
