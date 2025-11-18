# GIL Platform - Claude Code Web Development Guide

**Purpose**: Detailed technical specifications for building the GIL Platform using Claude Code Web
**Target**: Development in parallel sessions on Claude Code Web
**Version**: 1.0
**Date**: 2025-11-17

---

## Overview

This document provides comprehensive specifications for building the GIL (Global Intelligence Layer) Platform in Claude Code Web. The platform is designed to be built incrementally across multiple parallel development sessions, with each component buildable independently.

### Development Philosophy
- **Component-Based**: Each major feature is a standalone component that can be developed in parallel
- **Incrementally Deployable**: Each phase produces a working demo
- **Test-Driven**: Write tests alongside components
- **Documentation-First**: Clear interfaces and examples for each component

---

## Phase 1: MVP Core (Build First)

### Session 1: Landing Page & Authentication

#### Files to Create
```
/frontend/src/
  pages/
    LandingPage.tsx
    SignupPage.tsx
    LoginPage.tsx
  components/
    auth/
      SignupForm.tsx
      LoginForm.tsx
      AuthLayout.tsx
  hooks/
    useAuth.ts
  lib/
    api-client.ts
```

#### Component Specifications

##### LandingPage.tsx
```typescript
/**
 * Landing page with hero section, value proposition, and CTA
 *
 * Features:
 * - Hero section with main value prop
 * - 3-column feature grid (AI Validation, Expert Consensus, Recognition)
 * - Dual CTA buttons (Get Started, Sign In)
 * - Responsive layout (mobile-first)
 *
 * Design:
 * - Gradient background (blue-50 to white)
 * - CollectiveGood branding colors
 * - Icons from lucide-react
 */

interface LandingPageProps {
  // No props - static page
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  // Implementation
  // - NavBar component (logo, no navigation for logged-out users)
  // - Hero section (h1, description, CTAs)
  // - Feature grid (3 cards with icons)
  // - Footer (optional for MVP)
}
```

##### SignupForm.tsx
```typescript
/**
 * Sign-up form with validation
 *
 * Fields:
 * - firstName (required, min 2 chars)
 * - lastName (required, min 2 chars)
 * - email (required, valid email format)
 * - password (required, min 8 chars, 1 number, 1 uppercase)
 * - confirmPassword (required, must match password)
 * - agreeToTerms (required checkbox)
 *
 * Validation: Zod schema
 * State: React Hook Form
 * Submission: Calls /api/auth/signup
 */

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms of Service"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
```

##### useAuth.ts Hook
```typescript
/**
 * Authentication state management hook
 *
 * Provides:
 * - user: User | null (current authenticated user)
 * - login: (email, password) => Promise<void>
 * - signup: (formData) => Promise<void>
 * - logout: () => Promise<void>
 * - isAuthenticated: boolean
 * - isLoading: boolean
 *
 * Uses:
 * - Zustand for global state
 * - Local storage for JWT token persistence
 * - Automatic token refresh
 */

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: UserProfile;
  competenceProfile?: CompetenceProfile;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

#### API Endpoints to Implement

##### Backend (FastAPI)
```python
# app/api/routes/auth.py

@router.post("/signup")
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Create new user account

    Steps:
    1. Validate email not already registered
    2. Hash password (bcrypt)
    3. Create user record
    4. Generate JWT token
    5. Return user + token
    """
    # Implementation
    pass

@router.post("/login")
async def login(credentials: OAuth2PasswordRequestForm, db: Session = Depends(get_db)):
    """
    Authenticate user and return JWT

    Steps:
    1. Look up user by email
    2. Verify password (bcrypt.verify)
    3. Generate access + refresh tokens
    4. Return tokens + user data
    """
    pass

@router.post("/refresh")
async def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    """
    Exchange refresh token for new access token
    """
    pass
```

#### Testing Requirements
```typescript
// __tests__/auth/SignupForm.test.tsx

describe('SignupForm', () => {
  test('displays validation errors for invalid inputs', async () => {
    // Render form
    // Submit with invalid data
    // Assert error messages displayed
  });

  test('successfully submits valid form data', async () => {
    // Mock API response
    // Fill form with valid data
    // Submit
    // Assert API called with correct data
    // Assert navigation to profile setup
  });

  test('shows password mismatch error', async () => {
    // Enter non-matching passwords
    // Assert error message
  });
});
```

---

### Session 2: Profile Setup Wizard

#### Files to Create
```
/frontend/src/
  pages/
    ProfileSetupPage.tsx
  components/
    onboarding/
      ProfileForm.tsx
      ProgressIndicator.tsx
  types/
    user.ts
```

#### Component Specifications

##### ProfileForm.tsx
```typescript
/**
 * Multi-field profile form for clinical information
 *
 * Fields:
 * - specialty: Select (dropdown with specialties)
 * - yearsExperience: Select (0-2, 3-5, 6-10, 11-20, 20+)
 * - boardCertified: Radio (Yes/No)
 * - currentRole: Text input (e.g., Attending Physician)
 * - institution: Text input (e.g., City Medical Center)
 * - country: Select (countries list)
 * - practiceSetting: Select (Academic, Community, Rural, etc.)
 *
 * Layout: 2-column grid on desktop, single column mobile
 */

interface UserProfile {
  specialty: string;
  yearsExperience: string;
  boardCertified: boolean;
  currentRole: string;
  institution: string;
  country: string;
  practiceSetting: string;
}

const SPECIALTIES = [
  "Internal Medicine",
  "Family Medicine",
  "Emergency Medicine",
  "Pediatrics",
  "Surgery",
  "Psychiatry",
  "Obstetrics/Gynecology",
  "Radiology",
  "Anesthesiology",
  "Other"
];

const PRACTICE_SETTINGS = [
  "Academic Medical Center",
  "Community Hospital",
  "Private Practice",
  "Rural/Remote Clinic",
  "Government Facility",
  "Other"
];
```

##### ProgressIndicator.tsx
```typescript
/**
 * Visual progress indicator for onboarding
 *
 * Steps:
 * 1. Sign Up (completed)
 * 2. Profile Setup (current)
 * 3. Skill Assessment (upcoming)
 * 4. Dashboard (final)
 *
 * Design: Horizontal stepper with checkmarks for completed steps
 */

interface Step {
  name: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}
```

#### API Endpoints
```python
# app/api/routes/users.py

@router.put("/users/{user_id}/profile")
async def update_profile(
    user_id: str,
    profile_data: UserProfile,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update user's clinical profile

    Validation:
    - User can only update their own profile (unless admin)
    - All required fields present
    """
    pass
```

---

### Session 3: Assessment Introduction & Case Presentation

#### Files to Create
```
/frontend/src/
  pages/
    AssessmentIntroPage.tsx
    AssessmentPage.tsx
  components/
    assessment/
      CasePresentation.tsx
      ProgressTimer.tsx
      AssessmentInstructions.tsx
```

#### Component Specifications

##### AssessmentIntroPage.tsx
```typescript
/**
 * Introduction screen before starting assessment
 *
 * Content:
 * - Overview of assessment format
 * - Expected duration (10 minutes)
 * - Number of cases (3-10, adaptive)
 * - Instructions for differential entry
 * - Begin Assessment button
 *
 * Design: Centered card layout with brain icon, info boxes
 */

interface AssessmentIntroProps {
  onBegin: () => void;
}
```

##### CasePresentation.tsx
```typescript
/**
 * Display clinical case vignette
 *
 * Sections:
 * - Case header (case number, patient name/ID)
 * - Demographics (age, sex)
 * - Chief complaint (quoted text)
 * - History
 * - Physical exam findings
 * - Vital signs (grid layout)
 * - Lab results (if applicable)
 * - Imaging findings (if applicable)
 *
 * Design: Card-based layout, collapsible sections for long content
 */

interface ClinicalCase {
  id: string;
  caseNumber: number;
  content: {
    presentation: string;
    demographics: { age: string; sex: string };
    vitalSigns?: Record<string, string | number>;
    labs?: Record<string, string | number>;
    history?: string;
    physicalExam?: string;
  };
  parameters: {
    difficulty: number;
    discrimination: number;
    specialty: string;
  };
}

interface CasePresentationProps {
  clinicalCase: ClinicalCase;
  caseNumber: number;
  totalCases?: number;
}
```

##### ProgressTimer.tsx
```typescript
/**
 * Countdown timer for overall assessment
 *
 * Features:
 * - Total time remaining (10 minutes = 600 seconds)
 * - Visual progress bar
 * - Warning state at <2 minutes (orange color)
 * - Auto-submit at 0:00
 *
 * Design: Compact bar at top of assessment page
 */

interface ProgressTimerProps {
  totalSeconds: number;
  onTimeExpired: () => void;
}
```

---

### Session 4: Differential Diagnosis Entry Interface

#### Files to Create
```
/frontend/src/
  components/
    assessment/
      DifferentialEntry.tsx
      DiagnosisInput.tsx
      DiagnosisRankList.tsx
      ConfidenceSelector.tsx
      CriticalFlagButton.tsx
```

#### Component Specifications

##### DifferentialEntry.tsx (Main Container)
```typescript
/**
 * Main component orchestrating differential entry
 *
 * Features:
 * - List of diagnoses (drag-to-rank)
 * - Add diagnosis button
 * - Remove diagnosis buttons
 * - Submit differential button (disabled until ≥1 diagnosis)
 * - Hint/help toggle
 *
 * State: Array of Diagnosis objects
 * Drag-Drop: Use @dnd-kit/core or react-beautiful-dnd
 */

interface Diagnosis {
  id: string;
  name: string;
  confidence: 'high' | 'medium' | 'low';
  notToMiss: boolean;
  rank: number; // 1-indexed position in list
}

interface DifferentialEntryProps {
  onSubmit: (differential: Diagnosis[]) => void;
  caseId: string;
}
```

##### DiagnosisInput.tsx
```typescript
/**
 * Single diagnosis entry row
 *
 * Components:
 * - Drag handle icon (grip vertical)
 * - Rank number badge (#1, #2, etc.)
 * - Text input (diagnosis name, autocomplete if vocab available)
 * - Confidence dropdown
 * - Critical flag button (orange alert triangle)
 * - Remove button (trash icon)
 *
 * Layout: Flexbox row, responsive stacking on mobile
 */

interface DiagnosisInputProps {
  diagnosis: Diagnosis;
  index: number;
  onUpdate: (field: keyof Diagnosis, value: any) => void;
  onRemove: () => void;
  dragHandleProps?: any; // From drag-drop library
}
```

##### CriticalFlagButton.tsx
```typescript
/**
 * Toggle button for "not-to-miss" diagnosis flag
 *
 * States:
 * - Unflagged: Gray background, outline icon
 * - Flagged: Orange background, solid icon
 *
 * Tooltip: "Mark as 'not-to-miss' diagnosis"
 */

interface CriticalFlagButtonProps {
  isActive: boolean;
  onClick: () => void;
}
```

#### Drag-Drop Implementation Notes
```typescript
// Use @dnd-kit/core for modern, accessible drag-drop

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableDiagnosis({ diagnosis, index, ...props }: DiagnosisInputProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: diagnosis.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DiagnosisInput
        {...props}
        diagnosis={diagnosis}
        index={index}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
```

---

### Session 5: Scoring & Feedback System

#### Files to Create
```
/frontend/src/
  components/
    assessment/
      FeedbackDisplay.tsx
      ScoreBreakdown.tsx
      PeerComparison.tsx
      ReferenceDifferential.tsx
  lib/
    scoring.ts
```

#### Scoring Logic

##### scoring.ts
```typescript
/**
 * Differential diagnosis scoring algorithms
 *
 * Components:
 * 1. Inclusion Score (35%): Did they include correct diagnoses?
 * 2. Ranking Score (25%): Were they ranked correctly?
 * 3. Critical Diagnosis Score (20%): Did they catch not-to-miss?
 * 4. Confidence Calibration (15%): Was confidence aligned with correctness?
 * 5. Efficiency Score (5%): Concise differential (not too long)?
 */

interface ReferenceDifferential {
  diagnoses: Array<{
    name: string;
    likelihood: number; // 0-1
    notToMiss: boolean;
  }>;
}

interface DifferentialScore {
  overall: number; // 0-100
  components: {
    inclusion: number;
    ranking: number;
    critical: number;
    calibration: number;
    efficiency: number;
  };
  matchedDiagnoses: Array<{
    submitted: string;
    reference: string;
    matchType: 'exact' | 'semantic' | 'none';
  }>;
}

function scoreDifferential(
  submitted: Diagnosis[],
  reference: ReferenceDifferential
): DifferentialScore {
  // 1. Inclusion scoring
  const inclusionScore = calculateInclusionScore(submitted, reference);

  // 2. Ranking scoring
  const rankingScore = calculateRankingScore(submitted, reference);

  // 3. Critical diagnosis scoring
  const criticalScore = calculateCriticalDiagnosisScore(submitted, reference);

  // 4. Confidence calibration
  const calibrationScore = calculateConfidenceCalibration(submitted, reference);

  // 5. Efficiency scoring
  const efficiencyScore = calculateEfficiencyScore(submitted, reference);

  // Weighted overall score
  const overall =
    (inclusionScore * 0.35) +
    (rankingScore * 0.25) +
    (criticalScore * 0.20) +
    (calibrationScore * 0.15) +
    (efficiencyScore * 0.05);

  return {
    overall,
    components: {
      inclusion: inclusionScore,
      ranking: rankingScore,
      critical: criticalScore,
      calibration: calibrationScore,
      efficiency: efficiencyScore
    },
    matchedDiagnoses: [] // Details of matching
  };
}

function calculateInclusionScore(
  submitted: Diagnosis[],
  reference: ReferenceDifferential
): number {
  let score = 0;
  const maxScore = reference.diagnoses.length;

  for (const refDx of reference.diagnoses) {
    const matched = submitted.find(subDx =>
      semanticMatch(subDx.name, refDx.name)
    );

    if (matched) {
      // Higher weight for more likely diagnoses
      score += refDx.likelihood;
    }
  }

  return (score / maxScore) * 100;
}

function semanticMatch(submitted: string, reference: string): boolean {
  // Normalize strings
  const normalize = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const subNorm = normalize(submitted);
  const refNorm = normalize(reference);

  // Exact match
  if (subNorm === refNorm) return true;

  // Contains match (for compound diagnoses)
  if (subNorm.includes(refNorm) || refNorm.includes(subNorm)) return true;

  // TODO: Use Levenshtein distance or semantic embeddings for fuzzy matching

  return false;
}
```

##### FeedbackDisplay.tsx
```typescript
/**
 * Comprehensive feedback display after case submission
 *
 * Sections:
 * 1. Overall score (large circular percentage)
 * 2. Component breakdown (5 bars with labels)
 * 3. Peer comparison (percentile bar, peer group stats)
 * 4. Reference differential (expert consensus)
 * 5. Your submission review (color-coded matches)
 * 6. Continue button (next case or complete)
 *
 * Design: Full-screen layout, scrollable, celebration animation for high scores
 */

interface FeedbackDisplayProps {
  score: DifferentialScore;
  peerComparison: PeerComparisonData;
  referenceDifferential: ReferenceDifferential;
  submittedDifferential: Diagnosis[];
  onContinue: () => void;
  isLastCase: boolean;
}
```

---

### Session 6: IRT/CAT Adaptive Engine

#### Files to Create
```
/backend/app/
  services/
    irt_engine.py
    competence_updater.py
  models/
    competence.py
    case.py
    response.py
```

#### IRT Engine Implementation

##### irt_engine.py
```python
"""
Item Response Theory (IRT) adaptive testing engine

Implements:
- 2-Parameter Logistic (2PL) IRT model
- Maximum Information case selection
- Maximum Likelihood Estimation of ability (theta)
- Stopping rules (minimum items, SE threshold, max items)
- Multidimensional extension (future)
"""

import numpy as np
from scipy.optimize import minimize
from typing import List, Tuple, Optional
from models.case import Case
from models.response import Response

class IRTEngine:
    """
    IRT-based adaptive testing engine for clinical competence assessment
    """

    def __init__(
        self,
        min_items: int = 3,
        max_items: int = 10,
        target_se: float = 0.35,
        initial_theta: float = 0.0
    ):
        self.min_items = min_items
        self.max_items = max_items
        self.target_se = target_se
        self.initial_theta = initial_theta

    def probability(self, theta: float, difficulty: float, discrimination: float) -> float:
        """
        2PL IRT probability function

        P(X=1|θ, a, b) = 1 / (1 + exp(-a(θ - b)))

        Args:
            theta: Ability parameter
            difficulty: Item difficulty parameter (b)
            discrimination: Item discrimination parameter (a)

        Returns:
            Probability of correct response
        """
        return 1 / (1 + np.exp(-discrimination * (theta - difficulty)))

    def information(self, theta: float, difficulty: float, discrimination: float) -> float:
        """
        Fisher Information function

        I(θ) = a² * P(θ) * Q(θ)
        where Q(θ) = 1 - P(θ)

        Returns:
            Information value (higher = more informative item at this theta)
        """
        p = self.probability(theta, difficulty, discrimination)
        q = 1 - p
        return (discrimination ** 2) * p * q

    def select_next_case(
        self,
        theta: float,
        available_cases: List[Case],
        previous_case_ids: List[str] = []
    ) -> Optional[Case]:
        """
        Select case that maximizes information at current theta estimate

        Args:
            theta: Current ability estimate
            available_cases: Pool of cases not yet administered
            previous_case_ids: IDs of cases already shown (to avoid repeats)

        Returns:
            Case with maximum information, or None if no cases available
        """
        if not available_cases:
            return None

        # Filter out previously shown cases
        candidates = [
            case for case in available_cases
            if case.id not in previous_case_ids
        ]

        if not candidates:
            return None

        max_info = -np.inf
        selected_case = None

        for case in candidates:
            info = self.information(
                theta,
                case.parameters.difficulty,
                case.parameters.discrimination
            )

            if info > max_info:
                max_info = info
                selected_case = case

        return selected_case

    def update_theta(self, responses: List[Response]) -> Tuple[float, float]:
        """
        Maximum Likelihood Estimation of theta using Newton-Raphson

        Args:
            responses: List of responses with scores and case parameters

        Returns:
            (theta_estimate, standard_error)
        """
        if not responses:
            return self.initial_theta, 1.0

        # Initial guess
        theta = self.initial_theta

        # Newton-Raphson iterations
        for _ in range(20):  # Max iterations
            gradient = 0
            hessian = 0

            for response in responses:
                a = response.case.parameters.discrimination
                b = response.case.parameters.difficulty
                score = response.score  # Continuous score 0-1

                p = self.probability(theta, b, a)

                # For continuous scores, treat as partial credit
                gradient += a * (score - p)
                hessian -= (a ** 2) * p * (1 - p)

            # Newton-Raphson update
            if hessian != 0:
                theta_new = theta - gradient / hessian

                # Check convergence
                if abs(theta_new - theta) < 0.001:
                    theta = theta_new
                    break

                theta = theta_new
            else:
                break

        # Calculate standard error
        information_sum = sum(
            self.information(theta, r.case.parameters.difficulty, r.case.parameters.discrimination)
            for r in responses
        )

        se = 1 / np.sqrt(information_sum) if information_sum > 0 else 1.0

        # Bound theta to reasonable range
        theta = np.clip(theta, -3, 3)

        return theta, se

    def should_stop(self, n_responses: int, current_se: float) -> bool:
        """
        Determine if assessment should terminate

        Stopping rules:
        1. Minimum items administered AND SE below threshold
        2. Maximum items reached

        Args:
            n_responses: Number of responses collected
            current_se: Current standard error of theta estimate

        Returns:
            True if assessment should stop
        """
        if n_responses < self.min_items:
            return False

        if n_responses >= self.max_items:
            return True

        if current_se <= self.target_se:
            return True

        return False
```

---

### Session 7: Dashboard & Competence Profile Visualization

#### Files to Create
```
/frontend/src/
  pages/
    DashboardPage.tsx
  components/
    dashboard/
      CompetenceProfile.tsx
      SkillLevelBadge.tsx
      CompetenceVectorChart.tsx
      PeerPercentileDisplay.tsx
      StrengthsAndGrowthAreas.tsx
```

#### Component Specifications

##### CompetenceProfile.tsx
```typescript
/**
 * Main competence profile visualization
 *
 * Displays:
 * - Overall skill level badge (Novice/Developing/Proficient/Expert)
 * - Theta value (with explainer tooltip)
 * - Multidimensional competence vector as radar/bar chart
 * - Top 3 strengths
 * - Top 3 growth areas
 * - Adaptive path visualization (theta progression over cases)
 *
 * Layout: Grid layout with cards
 */

interface CompetenceProfile {
  overallAbility: number; // Theta
  skillLevel: 'Novice' | 'Developing' | 'Proficient' | 'Expert';
  standardError: number;
  competenceVector: number[]; // One value per dimension
  casesCompleted: number;
  accuracy: number; // Percentage
  strengths: string[];
  areasForGrowth: string[];
  adaptivePath: number[]; // Theta history
  diagnosticAccuracy: {
    topDiagnosisAccuracy: number;
    criticalDiagnosisCapture: number;
  };
}

const COMPETENCE_DIMENSIONS = [
  "Emergency Medicine",
  "Cardiology",
  "Mental Health",
  "Complex Diagnostics"
];
```

##### CompetenceVectorChart.tsx
```typescript
/**
 * Radar or horizontal bar chart showing competence across dimensions
 *
 * Options:
 * - Radar chart (better for visual comparison)
 * - Horizontal bars (better for accessibility)
 *
 * Library: Recharts or D3.js
 */

interface CompetenceVectorChartProps {
  dimensions: string[];
  values: number[]; // One per dimension, range -1 to 1
  chartType?: 'radar' | 'bar';
}

// Recharts implementation
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';

export const CompetenceVectorChart: React.FC<CompetenceVectorChartProps> = ({
  dimensions,
  values,
  chartType = 'radar'
}) => {
  const data = dimensions.map((dim, idx) => ({
    dimension: dim,
    value: ((values[idx] + 1) / 2) * 100 // Convert -1 to 1 range to 0-100
  }));

  if (chartType === 'radar') {
    return (
      <RadarChart width={400} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="dimension" />
        <Radar dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
      </RadarChart>
    );
  }

  // Bar chart implementation...
};
```

##### PeerPercentileDisplay.tsx
```typescript
/**
 * Display user's percentile ranking among peers
 *
 * Shows:
 * - Overall percentile (large number)
 * - Horizontal bar showing position in distribution
 * - Peer group description (specialty, experience level)
 * - Median peer score
 * - User's rank (e.g., #35 out of 156)
 *
 * Design: Card with blue gradient background
 */

interface PeerComparisonData {
  percentile: number; // 0-100
  peerGroupSize: number;
  peerMedianScore: number;
  userRank: number;
  peerGroup: {
    specialty: string;
    experienceRange: string;
    boardCertified: boolean;
  };
}
```

---

## Testing Strategy

### Unit Tests
```typescript
// Example: scoring.test.ts

describe('Differential Scoring', () => {
  describe('calculateInclusionScore', () => {
    test('perfect match returns 100', () => {
      const submitted = [
        { name: 'Acute Myocardial Infarction', confidence: 'high', notToMiss: true },
        { name: 'Pulmonary Embolism', confidence: 'medium', notToMiss: true }
      ];

      const reference = {
        diagnoses: [
          { name: 'Acute Myocardial Infarction', likelihood: 0.6, notToMiss: true },
          { name: 'Pulmonary Embolism', likelihood: 0.3, notToMiss: true }
        ]
      };

      const score = calculateInclusionScore(submitted, reference);
      expect(score).toBeCloseTo(100);
    });

    test('semantic matching works', () => {
      const submitted = [{ name: 'MI', confidence: 'high', notToMiss: true }];
      const reference = {
        diagnoses: [{ name: 'Myocardial Infarction', likelihood: 1.0, notToMiss: true }]
      };

      const score = calculateInclusionScore(submitted, reference);
      expect(score).toBeGreaterThan(80); // Should match semantically
    });
  });
});
```

### Integration Tests
```python
# test_irt_engine.py

def test_case_selection_maximizes_information():
    """Test that selected case has maximum information at current theta"""
    engine = IRTEngine()
    theta = 0.5

    cases = [
        Case(difficulty=-1.0, discrimination=1.5),  # Too easy
        Case(difficulty=0.5, discrimination=2.0),   # Perfect match
        Case(difficulty=2.0, discrimination=1.0)    # Too hard
    ]

    selected = engine.select_next_case(theta, cases)

    assert selected.difficulty == 0.5
    assert selected.discrimination == 2.0

def test_theta_converges_with_responses():
    """Test MLE theta estimation converges"""
    engine = IRTEngine()

    # Simulate perfect responses to easy items
    responses = [
        Response(score=1.0, case=Case(difficulty=-1.0, discrimination=1.5)),
        Response(score=1.0, case=Case(difficulty=-0.5, discrimination=1.5)),
        Response(score=1.0, case=Case(difficulty=0.0, discrimination=1.5))
    ]

    theta, se = engine.update_theta(responses)

    assert theta > 0  # Should be positive for perfect easy responses
    assert se < 0.5   # Should have reasonable precision
```

---

## Deployment Strategy

### Development Environment Setup

#### Frontend (React)
```bash
# Initialize React app with TypeScript
npx create-react-app gil-platform --template typescript
cd gil-platform

# Install core dependencies
npm install zustand react-hook-form zod @hookform/resolvers
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install lucide-react
npm install recharts
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install dev dependencies
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @types/node
```

#### Backend (FastAPI)
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn[standard]
pip install sqlalchemy psycopg2-binary alembic
pip install pydantic pydantic-settings
pip install python-jose[cryptography] passlib[bcrypt]
pip install pytest pytest-asyncio httpx
pip install numpy scipy
```

### Database Setup
```sql
-- Initialize PostgreSQL database

CREATE DATABASE gil_platform;

-- Create tables (use Alembic for migrations in production)

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    specialty VARCHAR(100),
    years_experience VARCHAR(20),
    board_certified BOOLEAN,
    current_role VARCHAR(150),
    institution VARCHAR(200),
    country VARCHAR(100),
    practice_setting VARCHAR(100)
);

CREATE TABLE competence_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theta FLOAT DEFAULT 0.0,
    standard_error FLOAT DEFAULT 1.0,
    competence_vector FLOAT[],
    cases_completed INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content JSONB NOT NULL,
    reference_differential JSONB NOT NULL,
    parameters JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    case_id UUID REFERENCES cases(id),
    submitted_differential JSONB NOT NULL,
    scores JSONB NOT NULL,
    response_time_seconds FLOAT,
    theta_before FLOAT,
    theta_after FLOAT,
    submitted_at TIMESTAMP DEFAULT NOW()
);
```

### Deployment Checklist

#### Pre-Deployment
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] CORS settings configured
- [ ] Rate limiting implemented
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured (Mixpanel/PostHog)

#### Deployment Platforms

**Recommended: Vercel (Frontend) + Railway/Render (Backend)**
- Pros: Easy setup, good free tiers, automatic HTTPS
- Cons: Vendor lock-in, limited backend customization

**Alternative: AWS (Full Stack)**
- Frontend: S3 + CloudFront
- Backend: ECS or Lambda
- Database: RDS PostgreSQL
- Pros: Full control, scalable
- Cons: Complex setup, higher initial cost

**Budget Option: Cloudflare Pages + Supabase**
- Frontend: Cloudflare Pages (free)
- Backend: Cloudflare Workers (free tier generous)
- Database: Supabase (PostgreSQL, free tier)
- Pros: Extremely cost-effective, fast edge network
- Cons: Worker limitations (CPU time, memory)

---

## Next Steps & Iteration Plan

### Week 1-2: Foundation
- Build Landing, Signup, Login (Session 1)
- Profile Setup (Session 2)
- Deploy to staging environment

### Week 3-4: Core Assessment
- Assessment intro and case presentation (Session 3)
- Differential entry interface (Session 4)
- Basic scoring (hard-coded reference differentials)

### Week 5-6: Intelligence Layer
- IRT engine implementation (Session 6)
- Adaptive case selection
- Dashboard with competence profile (Session 7)

### Week 7-8: Polish & Launch
- Peer comparison features
- Gamification (badges, streaks)
- Bug fixes and UX improvements
- Soft launch with 50 beta testers

### Post-Launch Iterations
- LMIC community map features
- Peer prediction mechanisms (RBTS)
- Offline PWA capabilities
- Mobile app (React Native or Flutter)

---

**Document Maintenance**
**Last Updated**: 2025-11-17
**Next Review**: Weekly during active development
**Owner**: Development Team
