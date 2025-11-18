"""Assessment response Pydantic schemas
These match the TypeScript definitions in frontend/src/types/response.ts
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from app.schemas.case_schemas import DifferentialDiagnosis


# BTS (Bayesian Truth Serum) schemas
class BTSData(BaseModel):
    own_assessment: float = Field(..., ge=0, le=100)  # 0-100 scale
    peer_prediction: float = Field(..., ge=0, le=100)  # What user thinks others will say
    community_average: Optional[float] = None  # Revealed after submission


class BTSScore(BaseModel):
    total: float  # Total BTS score (0-55)
    information: float  # Information score (0-10)
    prediction: float  # Prediction accuracy score (0-20)
    accuracy: float  # Clinical accuracy bonus (0-15)
    insight: float  # Unique insight bonus (0-10)
    prediction_error: float  # |peer_prediction - community_average|


# Assessment response schemas
class AssessmentResponseBase(BaseModel):
    case_id: str
    differential: DifferentialDiagnosis
    bts_data: Optional[BTSData] = None
    time_spent: int  # Seconds


class AssessmentResponseCreate(AssessmentResponseBase):
    user_id: str


class AssessmentResponse(AssessmentResponseBase):
    id: str
    user_id: str
    score: float  # Clinical accuracy score (0-100)
    bts_score: Optional[float] = None  # Total BTS score
    theta_estimate: float  # Updated IRT ability estimate
    is_correct: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Feedback schemas
class ReferenceDifferentialFeedback(BaseModel):
    diagnosis_name: str
    rank: int
    is_critical: bool


class PeerComparison(BaseModel):
    percentile: float
    avg_score: float
    your_score: float


class CompetenceUpdate(BaseModel):
    previous_theta: float
    new_theta: float
    standard_error: float


class FeedbackData(BaseModel):
    score: float
    bts_score: Optional[BTSScore] = None
    reference_differential: List[ReferenceDifferentialFeedback]
    peer_comparison: PeerComparison
    competence_update: CompetenceUpdate


class NextCaseInfo(BaseModel):
    id: str
    difficulty: float


# Submit assessment request/response
class SubmitAssessmentRequest(BaseModel):
    case_id: str
    differential: DifferentialDiagnosis
    bts_data: Optional[BTSData] = None
    time_spent: int


class SubmitAssessmentResponse(BaseModel):
    response: AssessmentResponse
    feedback: FeedbackData
    next_case: Optional[NextCaseInfo] = None
