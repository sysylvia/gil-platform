/**
 * Assessment response type definitions
 * These match the backend schemas in backend/app/schemas/response_schemas.py
 */

import { DifferentialDiagnosis } from './case'

export interface BTSData {
  ownAssessment: number  // 0-100 scale
  peerPrediction: number  // What user thinks others will say (0-100)
  communityAverage?: number  // Actual community average (revealed after submission)
}

export interface BTSScore {
  total: number  // Total BTS score (0-55)
  information: number  // Information score (0-10)
  prediction: number  // Prediction accuracy score (0-20)
  accuracy: number  // Clinical accuracy bonus (0-15)
  insight: number  // Unique insight bonus (0-10)
  predictionError: number  // |peerPrediction - communityAverage|
}

export interface AssessmentResponse {
  id: string
  userId: string
  caseId: string
  differential: DifferentialDiagnosis
  btsData?: BTSData
  score: number  // Clinical accuracy score (0-100)
  btsScore?: number  // Total BTS score
  thetaEstimate: number  // Updated IRT ability estimate
  isCorrect: boolean
  timeSpent: number  // Seconds
  createdAt: string
}

export interface FeedbackData {
  score: number
  btsScore?: BTSScore
  referenceDifferential: {
    diagnosisName: string
    rank: number
    isCritical: boolean
  }[]
  peerComparison: {
    percentile: number
    avgScore: number
    yourScore: number
  }
  competenceUpdate: {
    previousTheta: number
    newTheta: number
    standardError: number
  }
}

export interface SubmitAssessmentRequest {
  caseId: string
  differential: DifferentialDiagnosis
  btsData?: BTSData
  timeSpent: number
}

export interface SubmitAssessmentResponse {
  response: AssessmentResponse
  feedback: FeedbackData
  nextCase?: {
    id: string
    difficulty: number
  }
}
