/**
 * User and profile type definitions
 * These match the backend schemas in backend/app/schemas/user_schemas.py
 */

export interface User {
  id: string
  email: string
  isActive: boolean
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  id: string
  userId: string
  fullName: string
  profession: string
  specialty?: string
  yearsExperience?: number
  country?: string
  institution?: string
  createdAt: string
  updatedAt: string
}

export interface CompetenceProfile {
  id: string
  userId: string
  domain: string
  theta: number  // IRT ability estimate
  standardError: number
  numAssessments: number
  lastUpdated: string
}

// Authentication
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  fullName: string
  profession: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}
