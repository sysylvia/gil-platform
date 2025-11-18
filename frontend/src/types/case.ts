/**
 * Clinical case type definitions
 * These match the backend schemas in backend/app/schemas/case_schemas.py
 */

export interface Demographics {
  age: number
  sex: 'M' | 'F' | 'Other'
  location?: string
}

export interface VitalSigns {
  temperature?: number
  heartRate?: number
  bloodPressure?: string
  respiratoryRate?: number
  oxygenSaturation?: number
}

export interface CaseContent {
  presentation: string
  demographics: Demographics
  vitals?: VitalSigns
  labResults?: Record<string, any>
  imaging?: string[]
  additionalInfo?: string
}

export interface IRTParameters {
  difficulty: number
  discrimination: number
  guessing?: number
}

export interface ClinicalCase {
  id: string
  content: CaseContent
  parameters: IRTParameters
  domain: string
  difficulty: number
  isActive: boolean
  createdAt: string
}

export interface ReferenceDifferential {
  id: string
  caseId: string
  diagnosisCode: string
  diagnosisName: string
  rank: number  // 1 = most likely
  weight: number
  isCritical: boolean  // "Not-to-miss" diagnosis
}

export interface DiagnosisEntry {
  code: string
  name: string
  confidence: 'high' | 'medium' | 'low'
  reasoning?: string
}

export interface DifferentialDiagnosis {
  entries: DiagnosisEntry[]
  criticalFlagged: string[]  // Diagnosis codes flagged as critical
}
