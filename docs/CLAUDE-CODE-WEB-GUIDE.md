# Claude Code Web Development Guide

**GIL Platform - Session-by-Session Build Guide**

This guide provides detailed instructions for building the GIL Platform using Claude Code Web across multiple parallel sessions. Each session is designed to be independent with minimal dependencies, allowing efficient parallel development.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Session Structure](#session-structure)
4. [Parallel Development Sessions](#parallel-development-sessions)
5. [Session Details](#session-details)
6. [Integration Strategy](#integration-strategy)
7. [Testing & Quality Assurance](#testing--quality-assurance)
8. [Deployment](#deployment)

---

## Overview

### Development Approach

The GIL Platform uses a **modular, session-based development** approach optimized for Claude Code Web:

- **6 parallel-capable sessions** covering frontend, backend, and integration
- **Type-safe interfaces** between components (TypeScript + Pydantic)
- **Mock data support** for independent frontend development
- **Pure algorithm modules** for backend logic
- **Incremental integration** with continuous testing

### Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│  Landing → Auth → Profile Setup → Assessment → Dashboard │
│                                                           │
│  Community Features (Kibera Map, Gamification)           │
└─────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                      │
│  Auth → User Mgmt → IRT Engine → BTS Scoring → Analytics│
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│              DATABASE (PostgreSQL)                       │
│  Users → Profiles → Cases → Responses → Community Stats │
└─────────────────────────────────────────────────────────┘
```

---

## Prerequisites

### Before Starting Development

1. **Repository Setup Complete:**
   ```bash
   cd /Users/sysylvia/Documents/Repos/gil-platform
   ./scripts/setup.sh
   ```

2. **Environment Configured:**
   - `backend/.env` - Database URL, secret key
   - `frontend/.env` - API URL

3. **Database Running:**
   ```bash
   docker-compose up postgres
   # OR run PostgreSQL locally
   ```

4. **Documentation Read:**
   - `docs/design/GIL-Platform-PRD-BMAD.md` (Comprehensive PRD)
   - `docs/design/Technical-Specs.md` (Technical specifications)
   - `docs/design/Unified-Prototype-Spec.md` (UI/UX specifications)

### Claude Code Web Setup

For each session, you'll:
1. Open Claude Code Web (https://claude.ai/code)
2. Upload the entire `gil-platform` repository
3. Reference this guide for session-specific instructions
4. Follow the session's checklist
5. Download completed code and integrate into repository

---

## Session Structure

Each session follows this pattern:

### 1. Context Setup
```
📋 What you need to tell Claude Code Web:

"I'm building [SESSION_NAME] for the GIL Platform.

Key context:
- Tech stack: [TECH_STACK]
- Files to create: [FILE_LIST]
- Dependencies: [DEPENDENCIES]
- Reference docs: [DOCS]

Please review the relevant documentation and ask clarifying questions before we begin."
```

### 2. Development
- Component creation
- Type definitions
- State management
- API integration (or mock)
- Styling

### 3. Testing
- Unit tests
- Component tests
- Integration tests (if applicable)

### 4. Documentation
- Component documentation
- API documentation
- Usage examples

### 5. Handoff
- Code review checklist
- Integration notes
- Next steps

---

## Parallel Development Sessions

### Session Dependency Graph

```
Session 1 (Landing & Auth)     Session 3 (IRT Engine)
         ↓                              ↓
Session 2 (Assessment UI)      Session 4 (Dashboard)
         ↓                              ↓
Session 5 (Community Features)
         ↓
    Session 6 (Integration)
```

### Recommended Order

**Week 1 - Start in Parallel:**
- Session 1: Landing & Auth (2-3 hours)
- Session 3: IRT Engine (2-3 hours)

**Week 2 - Continue in Parallel:**
- Session 2: Assessment Interface (3-4 hours)
- Session 4: Dashboard (2-3 hours)

**Week 3 - Features:**
- Session 5: Community Features (3-4 hours)

**Week 4 - Integration:**
- Session 6: Integration & Testing (4-6 hours)

---

## Session Details

### Session 1: Landing Page & Authentication

**Duration:** 2-3 hours
**Dependencies:** None
**Status:** Can start immediately

#### Goals
- Landing page with value proposition
- Signup form with validation
- Login form with JWT authentication
- Protected route wrapper
- Auth state management (Zustand)

#### Files to Create

**Frontend:**
```
frontend/src/
├── pages/
│   ├── LandingPage.tsx      # Hero, features, CTA
│   ├── SignupPage.tsx       # Signup form
│   └── LoginPage.tsx        # Login form
├── components/
│   └── onboarding/
│       ├── SignupForm.tsx   # Reusable signup component
│       ├── LoginForm.tsx    # Reusable login component
│       └── ProtectedRoute.tsx # Auth wrapper
├── store/
│   └── authStore.ts         # Zustand auth state
├── lib/
│   └── api-client.ts        # Axios instance with interceptors
└── hooks/
    └── useAuth.ts           # Auth hook
```

**Backend:**
```
backend/app/
├── api/routes/
│   └── auth.py              # /auth/signup, /auth/login, /auth/refresh
├── models/
│   ├── user.py              # User SQLAlchemy model
│   └── user_profile.py      # UserProfile model
└── services/
    └── auth_service.py      # Authentication business logic
```

#### Context for Claude Code Web

```markdown
# Session 1: Landing Page & Authentication

I'm building the landing page and authentication system for the GIL Platform.

## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- State: Zustand
- Forms: React Hook Form + Zod validation
- Backend: FastAPI + SQLAlchemy + JWT

## Key Requirements

### Landing Page
- Hero section: "Global Intelligence Layer - Recruiting clinicians worldwide"
- Feature highlights: IRT profiling, peer prediction, community gamification
- CTA buttons: "Get Started" → Signup, "Sign In" → Login
- Mobile responsive with CollectiveGood brand colors (see tailwind.config.js)

### Authentication
- Signup: Email, password (min 8 chars), full name, profession
- Login: Email, password
- JWT tokens: Access token (30 min) + refresh token (7 days)
- Protected routes: Redirect to login if not authenticated
- Persistent auth: Store tokens in localStorage

### API Endpoints (Backend)
- POST /auth/signup - Create user account
- POST /auth/login - Authenticate and return tokens
- POST /auth/refresh - Refresh access token
- GET /auth/me - Get current user info

## Type Definitions
Use the existing types in:
- `frontend/src/types/user.ts` (User, AuthTokens, LoginRequest, SignupRequest)
- `backend/app/schemas/user_schemas.py` (matching Pydantic schemas)

## Reference Documentation
- Technical specs: `docs/design/Technical-Specs.md` (Session 1 section)
- PRD: `docs/design/GIL-Platform-PRD-BMAD.md` (Authentication section)

## Success Criteria
✅ Landing page renders with proper styling
✅ Signup creates user in database
✅ Login returns valid JWT tokens
✅ Protected routes redirect unauthenticated users
✅ Zustand store manages auth state
✅ Forms validate input (Zod)
✅ Mobile responsive design
✅ Unit tests for auth service
✅ Component tests for forms

Please review the repository structure and ask any clarifying questions before we begin.
```

#### Testing Checklist
- [ ] Signup creates user in database
- [ ] Login returns valid tokens
- [ ] Invalid credentials show error
- [ ] Password validation works (min 8 chars)
- [ ] Protected routes redirect when not logged in
- [ ] Token refresh works before expiry
- [ ] Logout clears auth state
- [ ] Mobile responsive design works

---

### Session 2: Assessment Interface

**Duration:** 3-4 hours
**Dependencies:** Type definitions (already complete)
**Status:** Can use mock data

#### Goals
- Case presentation component
- Differential diagnosis entry (drag-drop ranked list)
- BTS dual-slider assessment (optional for MVP)
- Confidence level selection
- Timer for tracking time spent
- Submit assessment

#### Files to Create

**Frontend:**
```
frontend/src/
├── pages/
│   └── AssessmentPage.tsx        # Main assessment page
├── components/
│   └── assessment/
│       ├── CasePresentation.tsx  # Display case details
│       ├── DifferentialEntry.tsx # Drag-drop diagnosis list
│       ├── DiagnosisInput.tsx    # Search/add diagnosis
│       ├── ConfidenceSelector.tsx # High/Medium/Low
│       ├── BTSSliders.tsx        # Own + peer prediction
│       ├── ProgressTimer.tsx     # Track time spent
│       └── AssessmentControls.tsx # Submit/Skip buttons
├── hooks/
│   └── useAssessment.ts          # Assessment state hook
└── store/
    └── assessmentStore.ts        # Assessment Zustand store
```

#### Context for Claude Code Web

```markdown
# Session 2: Assessment Interface

I'm building the clinical assessment interface for the GIL Platform.

## Tech Stack
- React 18 + TypeScript + Tailwind CSS
- DnD Kit for drag-and-drop
- Zustand for state
- React Hook Form for submission

## Key Requirements

### Case Presentation
- Display patient demographics (age, sex, location)
- Present chief complaint and clinical presentation
- Show vital signs if available
- Display lab results if available
- Mobile-optimized layout

### Differential Diagnosis Entry
- Drag-and-drop ranked list (most likely → least likely)
- Search to add diagnoses (autocomplete)
- Confidence level per diagnosis (High/Medium/Low)
- Flag critical "not-to-miss" diagnoses
- Support 3-10 diagnoses
- Visual ranking indicators (1, 2, 3...)

### BTS Assessment (Optional for MVP)
- Dual slider system:
  - Slider 1: Own assessment (0-100 scale)
  - Slider 2: Peer prediction (what others will say)
- Clear labels and instructions
- Optional reasoning text field

### Timer & Controls
- Track time spent (display in MM:SS)
- Submit button (validates ≥3 diagnoses)
- Skip button (for testing)
- Confirmation before submit

## Mock Data
For development, use this mock case:

\`\`\`typescript
const mockCase: ClinicalCase = {
  id: "case-001",
  content: {
    presentation: "A 45-year-old male presents to the emergency department with sudden onset severe chest pain...",
    demographics: { age: 45, sex: "M", location: "Urban Kenya" },
    vitals: {
      temperature: 37.2,
      heartRate: 110,
      bloodPressure: "140/90",
      respiratoryRate: 22,
      oxygenSaturation: 96
    }
  },
  parameters: { difficulty: 0.5, discrimination: 1.2 },
  domain: "cardiology",
  difficulty: 0.5,
  isActive: true,
  createdAt: new Date().toISOString()
}
\`\`\`

## Type Definitions
- `frontend/src/types/case.ts` - ClinicalCase, DifferentialDiagnosis, DiagnosisEntry
- `frontend/src/types/response.ts` - BTSData, SubmitAssessmentRequest

## Reference Documentation
- Technical specs: `docs/design/Technical-Specs.md` (Session 3 section)
- Unified spec: `docs/design/Unified-Prototype-Spec.md` (Assessment interface)
- Prototype: `prototypes/clinician-onboarding-app.tsx` (lines 400-600)

## Success Criteria
✅ Case displays with all details
✅ Diagnoses can be added via search
✅ Drag-drop reordering works smoothly
✅ Confidence levels selectable
✅ Critical flags toggleable
✅ Timer tracks elapsed time
✅ Submit validates ≥3 diagnoses
✅ BTS sliders work (optional)
✅ Mobile responsive
✅ Component tests pass

Please review the mock data structure and ask questions before starting.
```

#### Testing Checklist
- [ ] Case renders with all details
- [ ] Search adds diagnoses to list
- [ ] Drag-drop reordering works
- [ ] Cannot submit with <3 diagnoses
- [ ] Confidence levels save correctly
- [ ] Timer tracks time accurately
- [ ] BTS sliders constrained to 0-100
- [ ] Mobile layout works

---

### Session 3: IRT Engine (Backend)

**Duration:** 2-3 hours
**Dependencies:** None (pure algorithm)
**Status:** Can develop independently with unit tests

#### Goals
- IRT ability estimation (theta)
- Adaptive case selection (CAT)
- Standard error calculation
- Scoring differential diagnosis responses
- Update competence profiles

#### Files to Create

**Backend:**
```
backend/app/
├── services/
│   ├── irt_engine.py          # Core IRT algorithms
│   ├── case_router.py         # Adaptive case selection
│   └── scoring_service.py     # Differential scoring
└── tests/
    ├── test_irt_engine.py     # Unit tests
    └── test_scoring_service.py
```

#### Context for Claude Code Web

```markdown
# Session 3: IRT Engine (Backend)

I'm building the Item Response Theory (IRT) engine for adaptive clinical assessment.

## Tech Stack
- Python 3.11+
- NumPy, SciPy for numerical computations
- FastAPI for integration (later)
- pytest for testing

## Key Requirements

### IRT Fundamentals
- **Model**: 3-parameter logistic (3PL)
  - Difficulty (b): Item difficulty parameter
  - Discrimination (a): How well item differentiates ability
  - Guessing (c): Probability of correct guess
- **Ability (θ)**: Clinician competence (-3 to +3 scale)
- **Standard Error**: Precision of ability estimate

### Core Functions

1. **`estimate_theta(responses, item_params)`**
   - Maximum likelihood estimation (MLE)
   - Input: List of responses (correct/incorrect) + item parameters
   - Output: Theta estimate, standard error

2. **`select_next_item(theta, item_pool, administered_items)`**
   - Computerized Adaptive Testing (CAT)
   - Select item with maximum information at current theta
   - Avoid re-administering items

3. **`calculate_information(theta, item_params)`**
   - Fisher information for precision
   - Used to estimate standard error

4. **`score_differential(user_diff, reference_diff)`**
   - Score user's differential diagnosis vs expert reference
   - Weighted scoring: Rank correlation + critical diagnoses
   - Output: Score 0-100

### IRT Formulas

**Probability of correct response (3PL):**
```
P(θ) = c + (1-c) / (1 + exp(-a*(θ-b)))
```

**Information function:**
```
I(θ) = a² * (P(θ) - c)² * (1 - P(θ)) / ((1 - c)² * P(θ))
```

**Standard Error:**
```
SE(θ) = 1 / sqrt(Σ I(θ))
```

### Parameters from Settings
- `IRT_MIN_ITEMS` = 3
- `IRT_MAX_ITEMS` = 10
- `IRT_TARGET_SE` = 0.35
- `IRT_INITIAL_THETA` = 0.0

## Reference Documentation
- Technical specs: `docs/design/Technical-Specs.md` (Session 6: IRT Engine)
- PRD: `docs/design/GIL-Platform-PRD-BMAD.md` (IRT methodology section)
- Research: Academic papers on IRT in medical education

## Success Criteria
✅ Theta estimation accurate (test with known items)
✅ CAT selects items at appropriate difficulty
✅ Information function correct
✅ Standard error decreases with more items
✅ Differential scoring matches expert judgment
✅ Unit tests cover edge cases
✅ Performance optimized (NumPy vectorization)

Please implement the core IRT algorithms with comprehensive unit tests.
```

#### Testing Checklist
- [ ] Theta estimation converges
- [ ] CAT selects appropriate items
- [ ] Information function correct
- [ ] SE decreases with more items
- [ ] Handles empty responses
- [ ] Handles perfect scores
- [ ] Performance acceptable (<100ms)

---

### Session 4: Dashboard & Visualizations

**Duration:** 2-3 hours
**Dependencies:** Competence profile types (already complete)
**Status:** Can use mock data

#### Goals
- Competence profile visualization
- Multidimensional radar chart
- Peer comparison percentiles
- Badge/achievement display
- Progress tracking
- Session history

#### Files to Create

**Frontend:**
```
frontend/src/
├── pages/
│   └── DashboardPage.tsx          # Main dashboard
├── components/
│   └── dashboard/
│       ├── CompetenceProfile.tsx  # Main profile card
│       ├── CompetenceVectorChart.tsx # Radar chart
│       ├── PeerComparison.tsx     # Percentile display
│       ├── BadgeDisplay.tsx       # Achievements
│       ├── ProgressChart.tsx      # Theta over time
│       └── SessionHistory.tsx     # Recent assessments
└── hooks/
    └── useDashboard.ts            # Dashboard data hook
```

#### Context for Claude Code Web

```markdown
# Session 4: Dashboard & Visualizations

I'm building the competence dashboard with visualizations for the GIL Platform.

## Tech Stack
- React 18 + TypeScript + Tailwind CSS
- Recharts for visualizations
- Zustand for state

## Key Requirements

### Competence Profile Card
- Display overall competence level (θ) with interpretation
- Current level: Medical Student, Resident, Junior, Senior, Expert
- Standard error (precision indicator)
- Total assessments completed
- Domains assessed (cardiology, neurology, etc.)

### Multidimensional Radar Chart
- Radar chart with competence across domains
- 5-6 domains max on one chart
- Color-coded by proficiency
- Interactive tooltips with details
- Comparison to peer average (optional)

### Peer Comparison
- Percentile ranking (0-100)
- Visual percentile bar
- "You scored better than X% of clinicians"
- Breakdown by domain

### Badges & Achievements
- Display unlocked achievements
- Progress bars for in-progress achievements
- Culturally appropriate names (Swahili for Kibera)
- Icons with visual appeal

### Progress Over Time
- Line chart: Theta vs assessment number
- Show standard error bands
- Domain-specific progress
- Recent trend (improving/stable)

### Session History
- Last 10 assessments
- Case name, domain, score, date
- Click to view detailed feedback

## Mock Data

\`\`\`typescript
const mockCompetence: CompetenceProfile[] = [
  { domain: "cardiology", theta: 0.8, standardError: 0.3, numAssessments: 12 },
  { domain: "neurology", theta: 0.2, standardError: 0.5, numAssessments: 5 },
  { domain: "respiratory", theta: -0.3, standardError: 0.6, numAssessments: 3 }
]

const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Steps",
    nameSwahili: "Hatua za Kwanza",
    description: "Complete your first assessment",
    icon: "🎯",
    unlockedAt: "2025-11-10"
  },
  {
    id: "2",
    name: "Community Builder",
    nameSwahili: "Mwenye Kujenga Jamii",
    description: "Contribute 50 assessments to Kibera knowledge",
    icon: "🏘️",
    progress: { current: 12, target: 50 }
  }
]
\`\`\`

## Type Definitions
- `frontend/src/types/user.ts` - CompetenceProfile
- `frontend/src/types/community.ts` - Achievement

## Reference Documentation
- Technical specs: `docs/design/Technical-Specs.md` (Session 7: Dashboard)
- Unified spec: `docs/design/Unified-Prototype-Spec.md` (Dashboard screen)
- Prototype: `prototypes/clinician-onboarding-app.tsx` (Dashboard component)

## Success Criteria
✅ Competence profile displays correctly
✅ Radar chart renders for multiple domains
✅ Peer comparison shows percentile
✅ Badges display with progress
✅ Progress chart shows theta over time
✅ Session history lists recent assessments
✅ All charts responsive on mobile
✅ Loading states handled gracefully

Please build the dashboard with Recharts visualizations and mock data support.
```

#### Testing Checklist
- [ ] Profile card displays theta correctly
- [ ] Radar chart renders 3+ domains
- [ ] Percentile calculation correct
- [ ] Achievements display with icons
- [ ] Progress chart shows trend
- [ ] Session history loads
- [ ] Charts responsive on mobile
- [ ] Handles empty data gracefully

---

### Session 5: Community Features (Kibera Map)

**Duration:** 3-4 hours
**Dependencies:** Community types (already complete)
**Status:** Adapt existing prototype

#### Goals
- Interactive Kibera map with progressive reveal
- Region coverage visualization
- Team progress statistics
- Individual contribution tracking
- Real-time activity feed
- Achievement unlocks based on community goals

#### Files to Create

**Frontend:**
```
frontend/src/
├── pages/
│   └── CommunityPage.tsx        # Main community page
├── components/
│   └── community/
│       ├── KiberaMap.tsx        # SVG interactive map
│       ├── RegionCard.tsx       # Region detail card
│       ├── CommunityStats.tsx   # Team statistics
│       ├── ActivityFeed.tsx     # Recent contributions
│       └── TeamProgress.tsx     # Overall progress bar
└── hooks/
    └── useCommunityStats.ts     # Community data hook
```

**Backend:**
```
backend/app/
├── api/routes/
│   └── community.py             # Community endpoints
└── services/
    └── community_service.py     # Community stats logic
```

#### Context for Claude Code Web

```markdown
# Session 5: Community Features (Kibera Map)

I'm building the community gamification features, centered on the Kibera map visualization.

## Tech Stack
- React 18 + TypeScript + Tailwind CSS
- SVG for map visualization
- Zustand for state
- FastAPI for backend

## Key Requirements

### Kibera Map Visualization
- **SVG-based map** of Kibera regions (12-15 regions)
- **Progressive reveal**: Regions unlock as team contributes assessments
- **Color-coded status**:
  - Unexplored (0-29%): Gray, minimal detail
  - Emerging (30-59%): Yellow/orange, pulsing animation
  - Partial (60-84%): Blue, good detail
  - Revealed (85-100%): Green, full detail, glowing effect
- **Interactive**: Click region → show details
- **Responsive**: Works on mobile

### Region Details
- Region name
- Coverage percentage
- Total assessments needed vs completed
- Top contributors
- Recent activity in this region

### Team Statistics
- Total cases completed
- Regions fully revealed (85%+)
- Global coverage percentage
- Growth trend (cases/week)

### Activity Feed
- Real-time stream of contributions
- "Dr. X just contributed to Region Y"
- User avatars (initials)
- Timestamp (relative, e.g., "2 hours ago")

### Individual Contribution Tracking
- Your total contributions
- Regions you've contributed to
- Your impact on team progress
- Personal milestones

## Mock Data

\`\`\`typescript
const mockRegions: KiberaRegion[] = [
  {
    id: "gatwekera",
    name: "Gatwekera",
    coverage: 92,
    totalAssessments: 150,
    position: { x: 100, y: 100 },
    status: "revealed"
  },
  {
    id: "kambi-muru",
    name: "Kambi Muru",
    coverage: 45,
    totalAssessments: 68,
    position: { x: 200, y: 150 },
    status: "emerging"
  },
  // ... more regions
]

const mockTeamProgress: TeamProgress = {
  totalCases: 2347,
  regionsRevealed: 5,
  totalRegions: 12,
  globalCoverage: 67,
  recentActivity: [
    {
      userId: "user-1",
      userName: "Dr. Sarah Chen",
      region: "Gatwekera",
      timestamp: "2025-11-17T10:30:00Z"
    }
  ]
}
\`\`\`

## Type Definitions
- `frontend/src/types/community.ts` - KiberaRegion, CommunityStats, TeamProgress

## Reference Documentation
- Unified spec: `docs/design/Unified-Prototype-Spec.md` (Kibera map section)
- Prototype: `prototypes/kibera-health-community-map.tsx` (complete reference)
- PRD: `docs/design/GIL-Platform-PRD-BMAD.md` (Community engagement)

## Success Criteria
✅ Map renders with all regions
✅ Progressive reveal works (color changes)
✅ Click region shows details
✅ Team stats display correctly
✅ Activity feed updates
✅ Individual contributions tracked
✅ Animations smooth (pulsing for emerging)
✅ Mobile responsive
✅ Performance good with real-time updates

Please adapt the existing prototype code and enhance with backend integration.
```

#### Testing Checklist
- [ ] Map renders all regions
- [ ] Coverage colors correct
- [ ] Click shows region details
- [ ] Team stats accurate
- [ ] Activity feed displays
- [ ] Contributions tracked per user
- [ ] Animations smooth
- [ ] Mobile layout works

---

### Session 6: Integration & Testing

**Duration:** 4-6 hours
**Dependencies:** All previous sessions
**Status:** Final integration phase

#### Goals
- Connect frontend to backend APIs
- Replace mock data with real API calls
- End-to-end testing
- Error handling and loading states
- Performance optimization
- Deployment preparation

#### Tasks

1. **API Integration**
   - Replace all mock data with API calls
   - Implement error boundaries
   - Add loading states
   - Handle network errors gracefully

2. **State Management Consolidation**
   - Ensure Zustand stores are consistent
   - Implement optimistic updates
   - Add cache invalidation

3. **Testing**
   - E2E tests with Playwright/Cypress
   - Integration tests for critical flows
   - Performance testing
   - Accessibility audit

4. **Polish**
   - Loading skeletons
   - Error messages
   - Toast notifications
   - Animations and transitions

5. **Deployment**
   - Environment configuration
   - Database migrations
   - CI/CD pipeline verification
   - Production build optimization

#### Context for Claude Code Web

```markdown
# Session 6: Integration & Testing

I'm integrating all components and preparing for deployment.

## Key Tasks

### 1. API Integration
Replace all mock data with real API calls:
- Auth: Already integrated (Session 1)
- Assessment: Connect to `POST /assessments/submit`
- Dashboard: Connect to `GET /users/me/competence`
- Community: Connect to `GET /community/stats`

### 2. Error Handling
- Network errors → Retry with exponential backoff
- Validation errors → Display field-specific messages
- Auth errors → Redirect to login
- Server errors → Show friendly error page

### 3. Loading States
- Skeleton loaders for cards
- Spinner for API calls
- Progress bars for uploads
- Optimistic UI updates

### 4. E2E Testing
Critical user flows:
- Signup → Profile setup → First assessment → Dashboard
- Login → Assessment → Submit → Feedback → Next assessment
- Community map interaction → View stats

### 5. Performance
- Code splitting (React.lazy)
- Image optimization
- Bundle size < 500KB
- First contentful paint < 2s
- Time to interactive < 3s

## Testing Checklist
- [ ] Signup flow works end-to-end
- [ ] Login persists across page refresh
- [ ] Assessment submission successful
- [ ] Dashboard loads real data
- [ ] Community map updates
- [ ] Errors handled gracefully
- [ ] Loading states smooth
- [ ] Mobile experience polished
- [ ] Accessibility score >90
- [ ] Performance meets targets

Please review all integration points and conduct thorough testing.
```

---

## Integration Strategy

### Incremental Integration Approach

**Week 1: Foundations**
1. Complete Session 1 (Auth)
2. Test auth flow end-to-end
3. Deploy to staging

**Week 2: Core Features**
1. Complete Session 2 (Assessment)
2. Complete Session 3 (IRT Engine)
3. Integrate assessment → IRT scoring
4. Test with 5-10 real cases

**Week 3: Visualization**
1. Complete Session 4 (Dashboard)
2. Connect dashboard to real competence data
3. Test competence profile updates

**Week 4: Community & Polish**
1. Complete Session 5 (Community)
2. Complete Session 6 (Integration)
3. Full E2E testing
4. Deploy to production

### Integration Points

```typescript
// frontend/src/lib/api-client.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Attempt token refresh
      // If successful, retry request
      // If failed, redirect to login
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

---

## Testing & Quality Assurance

### Testing Strategy

**Unit Tests** (Each session):
- Component rendering
- Function logic
- State management

**Integration Tests** (Session 6):
- API endpoints
- Database operations
- Service interactions

**E2E Tests** (Session 6):
- User journeys
- Critical paths
- Error scenarios

**Performance Tests**:
- Load time
- API response time
- Database query optimization

### Quality Checklist

#### Code Quality
- [ ] TypeScript strict mode enabled
- [ ] No `any` types in production code
- [ ] ESLint passing with no warnings
- [ ] Prettier formatted
- [ ] All tests passing

#### UX/UI
- [ ] Mobile responsive (tested on 3 screen sizes)
- [ ] Accessibility score >90 (Lighthouse)
- [ ] Loading states for all async operations
- [ ] Error states with clear messages
- [ ] Keyboard navigation works

#### Performance
- [ ] Bundle size <500KB (gzipped)
- [ ] First contentful paint <2s
- [ ] Time to interactive <3s
- [ ] Lighthouse performance score >90

#### Security
- [ ] No secrets in code
- [ ] HTTPS enforced
- [ ] CORS configured correctly
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (React auto-escapes)

---

## Deployment

### Environment Setup

**Development:**
```bash
# Frontend
VITE_API_URL=http://localhost:8000
VITE_ENVIRONMENT=development

# Backend
DATABASE_URL=postgresql://gil_user:gil_password@localhost:5432/gil_platform
SECRET_KEY=dev-secret-key
DEBUG=true
```

**Staging:**
```bash
# Frontend
VITE_API_URL=https://api-staging.gilplatform.org
VITE_ENVIRONMENT=staging

# Backend
DATABASE_URL=postgresql://user:pass@staging-db.amazonaws.com:5432/gil_platform_staging
SECRET_KEY=<strong-secret-key>
DEBUG=false
```

**Production:**
```bash
# Frontend
VITE_API_URL=https://api.gilplatform.org
VITE_ENVIRONMENT=production

# Backend
DATABASE_URL=postgresql://user:pass@prod-db.amazonaws.com:5432/gil_platform
SECRET_KEY=<strong-secret-key>
DEBUG=false
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Frontend built (`npm run build`)
- [ ] Backend dependencies installed
- [ ] SSL certificates configured
- [ ] CDN configured for static assets
- [ ] Monitoring enabled (logs, errors, metrics)
- [ ] Backup strategy implemented
- [ ] Rollback plan documented

---

## Tips for Success

### For Claude Code Web Sessions

1. **Start with context**: Always paste relevant docs and explain the session goal clearly

2. **Ask for clarification**: If Claude asks questions, answer them thoroughly

3. **Iterate incrementally**: Build → Test → Refine in small cycles

4. **Review generated code**: Check for:
   - Type safety
   - Error handling
   - Edge cases
   - Performance

5. **Download frequently**: Save progress to avoid losing work

### Common Pitfalls to Avoid

❌ **Don't**: Start coding without reviewing type definitions
✅ **Do**: Review `frontend/src/types/` and `backend/app/schemas/` first

❌ **Don't**: Skip testing until the end
✅ **Do**: Write tests as you build components

❌ **Don't**: Hardcode values (API URLs, secrets)
✅ **Do**: Use environment variables

❌ **Don't**: Ignore mobile responsiveness
✅ **Do**: Test on mobile throughout development

❌ **Don't**: Over-engineer early
✅ **Do**: Build MVP first, enhance later

### Getting Help

- **Documentation**: See `docs/design/` folder
- **Prototypes**: See `prototypes/` for reference implementations
- **Type Definitions**: See `frontend/src/types/` and `backend/app/schemas/`
- **Examples**: Review existing code in repository

---

## Appendix

### Useful Commands

```bash
# Frontend
cd frontend
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Production build
npm test                # Run tests
npm run lint            # Lint code

# Backend
cd backend
python3 -m venv venv    # Create virtual environment
source venv/bin/activate # Activate (Mac/Linux)
pip install -r requirements.txt
uvicorn app.main:app --reload  # Start dev server
pytest                  # Run tests
black app/              # Format code

# Database
docker-compose up postgres  # Start PostgreSQL
./scripts/seed-database.sh  # Initialize schema
cd backend && alembic upgrade head  # Run migrations

# Full stack
docker-compose up       # Start all services
./scripts/dev-setup.sh  # Start dev servers (no Docker)
```

### Key Files Reference

**Type Definitions:**
- `frontend/src/types/user.ts`
- `frontend/src/types/case.ts`
- `frontend/src/types/response.ts`
- `frontend/src/types/community.ts`
- `backend/app/schemas/user_schemas.py`
- `backend/app/schemas/case_schemas.py`
- `backend/app/schemas/response_schemas.py`

**Configuration:**
- `frontend/package.json` - Dependencies
- `frontend/tsconfig.json` - TypeScript config
- `frontend/vite.config.ts` - Build config
- `frontend/tailwind.config.js` - Styling
- `backend/requirements.txt` - Python dependencies
- `backend/pyproject.toml` - Python tools config
- `backend/app/core/config.py` - App settings

**Documentation:**
- `docs/design/GIL-Platform-PRD-BMAD.md` - Complete PRD
- `docs/design/Technical-Specs.md` - Technical guide
- `docs/design/Unified-Prototype-Spec.md` - UI/UX specs
- `docs/research/Peer-Prediction-Mechanisms.md` - BTS research

---

**Good luck building the GIL Platform! 🚀**

For questions or issues, refer to the comprehensive documentation in the `docs/` folder or review the prototype implementations in `prototypes/`.
