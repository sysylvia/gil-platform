/**
 * Community gamification type definitions
 * For Kibera map and other community features
 */

export type RegionStatus = 'unexplored' | 'emerging' | 'partial' | 'revealed'

export interface KiberaRegion {
  id: string
  name: string
  coverage: number  // 0-100 percentage
  totalAssessments: number
  position: {
    x: number  // SVG coordinate
    y: number  // SVG coordinate
  }
  status: RegionStatus
}

export interface CommunityStats {
  region: string
  totalAssessments: number
  coveragePercentage: number
  lastUpdated: string
}

export interface UserContribution {
  userId: string
  region: string
  contributionCount: number
  lastContribution: string
}

export interface TeamProgress {
  totalCases: number
  regionsRevealed: number
  totalRegions: number
  globalCoverage: number
  recentActivity: {
    userId: string
    userName: string
    region: string
    timestamp: string
  }[]
}

export interface Achievement {
  id: string
  name: string
  nameSwahili?: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: {
    current: number
    target: number
  }
}
