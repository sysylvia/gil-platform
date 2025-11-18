# GIL Platform - Product Requirements Document (BMAD Framework)
**Version:** 2.0
**Date:** 2025-11-17
**Project:** Global Intelligence Layer (GIL) for Responsible Clinical AI
**Framework:** BMAD (Business, Market, Architecture, Design)

---

## Executive Summary

The Global Intelligence Layer (GIL) Platform is a comprehensive system for recruiting, onboarding, assessing, and engaging clinicians worldwide to contribute their expertise to responsible clinical AI development. The platform combines adaptive clinical competence profiling, peer prediction mechanisms for ground-truth-free assessment, and gamified community engagement to create a scalable, evidence-based approach to clinical AI validation.

### Core Value Proposition
Enable clinical AI systems that work **with** clinicians, not against them, by building the most comprehensive, validated dataset of clinical expertise and judgment across diverse practice settings globally.

---

## B - BUSINESS REQUIREMENTS

### 1. Business Goals & Objectives

#### Primary Objectives
1. **Recruit 10,000+ clinicians** across diverse specialties and geographic regions within 12 months
2. **Build validated competence profiles** for intelligent case routing and AI model validation
3. **Create sustainable engagement** through gamification, community features, and professional development value
4. **Generate high-quality training data** for responsible clinical AI systems
5. **Establish CollectiveGood** as the premier platform for clinician-AI collaboration

#### Success Metrics
- **Recruitment**: 1,000 clinicians onboarded in first 3 months, 10,000 in 12 months
- **Engagement**: 60%+ monthly active users, 15+ cases completed per clinician monthly
- **Quality**: Inter-rater reliability >0.85, assessment validity >0.8
- **Retention**: 90%+ clinician retention at 6 months
- **Platform NPS**: >50

### 2. Business Model & Revenue

#### Phase 1 (Months 1-6): Community Building
- **Strategy**: Free platform access for early adopters
- **Value Exchange**: Professional development + CME credits for clinical contribution
- **Investment Focus**: Platform development, clinician recruitment, data quality

#### Phase 2 (Months 7-18): Enterprise Validation Services
- **Primary Revenue**: AI companies pay for validated clinical assessment of their models
- **Secondary Revenue**: Healthcare institutions pay for competence profiling and benchmarking
- **Pricing**: $5K-50K per validation project based on scope and clinician expertise required

#### Phase 3 (18+ months): Platform Ecosystem
- **Marketplace**: Connect clinicians with research opportunities, clinical trials, expert consultation
- **Enterprise SaaS**: Annual licenses for continuous AI model monitoring and validation
- **Data Products**: Anonymized clinical reasoning patterns and expertise benchmarks

### 3. Target Users & Personas

#### Primary Persona: Dr. Sarah Chen - Emergency Medicine Physician
- **Demographics**: 8 years experience, board-certified, urban teaching hospital
- **Motivations**: Professional development, staying current, contributing to responsible AI
- **Pain Points**: Limited time, skeptical of AI replacing clinicians, wants meaningful CME
- **Goals**: Build reputation, influence AI development, earn CME credits
- **Tech Comfort**: High - uses EHR, clinical decision support, medical apps daily

#### Secondary Persona: Dr. James Ochieng - Rural Clinic Physician (LMIC)
- **Demographics**: 5 years experience, Kibera community clinic, Kenya
- **Motivations**: Improve patient outcomes, connect with global medical community
- **Pain Points**: Resource constraints, limited access to continuing education, connectivity issues
- **Goals**: Professional recognition, learn from peers, contribute local expertise
- **Tech Comfort**: Medium - uses mobile phone extensively, intermittent internet

#### Tertiary Persona: Dr. Maria Rodriguez - Academic Hospitalist
- **Demographics**: 15 years experience, Associate Professor, academic medical center
- **Motivations**: Teaching, research, advancing medical knowledge
- **Pain Points**: Overwhelming clinical + academic workload, publish-or-perish pressure
- **Goals**: Research publications, demonstrate thought leadership, mentor trainees
- **Tech Comfort**: High - experienced with research platforms, EMR, teaching tools

### 4. Competitive Landscape

#### Direct Competitors
1. **Figure 1** - Clinical case sharing platform
   - Strength: Large clinician network, mobile-first
   - Weakness: No systematic competence profiling, limited AI focus

2. **Sermo** - Physician social network
   - Strength: Established community, pharma market research revenue
   - Weakness: Not AI-focused, no adaptive assessment

3. **NEJM Knowledge+** - Medical knowledge assessment
   - Strength: Brand prestige, CME accredited
   - Weakness: Static assessments, not AI-validation focused

#### Competitive Advantages
1. **Adaptive IRT-based profiling**: Only platform using psychometric science for competence assessment
2. **Peer prediction mechanisms**: Novel approach to ground-truth-free validation in clinical settings
3. **Global + LMIC focus**: Designed for diverse practice settings, not just high-income countries
4. **Community-driven**: Gamification and social features drive engagement beyond transactional participation
5. **Responsible AI mission**: Aligns with clinician values - AI as complement, not replacement

---

## M - MARKET REQUIREMENTS

### 1. Market Opportunity

#### Total Addressable Market (TAM)
- **Global physicians**: 10 million+ worldwide
- **Clinical AI market**: $20B+ by 2028 (CAGR 38%)
- **Medical education/CME market**: $9B+ annually

#### Serviceable Addressable Market (SAM)
- **English-speaking physicians**: 3 million+
- **Digitally active clinicians**: 2 million+
- **AI-interested/early-adopter clinicians**: 500K+

#### Serviceable Obtainable Market (SOM) - 3 Year Target
- **Year 1**: 10,000 active clinicians (0.5% of SAM)
- **Year 2**: 50,000 active clinicians (2.5% of SAM)
- **Year 3**: 150,000 active clinicians (7.5% of SAM)

### 2. Market Segmentation

#### Geographic Segments
1. **North America** (40% focus)
   - US, Canada
   - High tech adoption, CME requirements, AI interest

2. **Europe** (25% focus)
   - UK, Germany, France, Netherlands
   - Strong healthcare systems, GDPR-compliant

3. **LMICs** (20% focus)
   - Kenya, India, Philippines, Nigeria
   - High mobile penetration, underserved by existing platforms
   - Critical for global AI equity

4. **Asia-Pacific** (15% focus)
   - Australia, Singapore, Japan
   - Tech-forward, English proficiency varies

#### Specialty Segments (Initial Focus)
1. **Emergency Medicine** (Priority 1)
   - Pattern recognition specialists
   - High-acuity decision-making
   - Strong diagnostic reasoning skills

2. **Internal Medicine** (Priority 1)
   - Broad differential diagnosis expertise
   - Complex medical decision-making

3. **Family Medicine** (Priority 2)
   - Diverse patient populations
   - Community practice insights

4. **Radiology, Pathology** (Priority 3)
   - Image interpretation experts
   - Already familiar with AI augmentation

### 3. Market Trends & Timing

#### Favorable Trends
1. **Clinical AI Adoption Accelerating**: ChatGPT medical demos sparked massive interest
2. **AI Regulation Increasing**: EU AI Act, FDA guidelines require clinical validation
3. **Clinician AI Skepticism**: Trust gap creates opportunity for responsible approach
4. **Remote Work Normalization**: Clinicians comfortable with digital professional activities
5. **CME Digital Shift**: 70%+ of CME now online, physicians seek flexible learning

#### Timing Advantages
- **First-mover**: No established platform for systematic clinical AI validation at scale
- **Regulatory Window**: Before heavy-handed regulation makes data collection harder
- **AI Hype Cycle**: Peak interest in clinical AI creates clinician engagement opportunity

---

## A - ARCHITECTURE REQUIREMENTS

### 1. System Architecture Overview

#### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     CDN / Edge Network                        │
│              (CloudFlare, Global Distribution)                │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Frontend Layer (React PWA)                  │
│  ┌────────────┬──────────────┬──────────────┬─────────────┐ │
│  │  Landing & │  Onboarding  │  Assessment  │  Dashboard  │ │
│  │  Signup    │  & Profile   │  Interface   │  & Reports  │ │
│  └────────────┴──────────────┴──────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway (FastAPI)                       │
│  ┌────────────┬──────────────┬──────────────┬─────────────┐ │
│  │ Auth &     │  IRT Engine  │  Gamification│  Analytics  │ │
│  │ User Mgmt  │  & Scoring   │  & Community │  & Reporting│ │
│  └────────────┴──────────────┴──────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Service Layer (Python)                      │
│  ┌──────────────┬────────────────┬──────────────────────┐   │
│  │ IRT/CAT      │ Peer Prediction│ Case Routing Engine  │   │
│  │ Algorithms   │ Mechanisms     │ (ML-based matching)  │   │
│  ├──────────────┼────────────────┼──────────────────────┤   │
│  │ Differential │ Semantic       │ Competence Vector    │   │
│  │ Scoring      │ Matching (NLP) │ Updates (Bayesian)   │   │
│  └──────────────┴────────────────┴──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                               │
│  ┌────────────┬──────────────┬──────────────┬─────────────┐ │
│  │ PostgreSQL │  Redis       │  Vector DB   │  S3/R2      │ │
│  │ (Primary)  │  (Cache/RT)  │  (Embeddings)│  (Files)    │ │
│  └────────────┴──────────────┴──────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2. Technical Stack

#### Frontend
- **Framework**: React 18+ with TypeScript
- **State Management**: Zustand (lightweight, simple API)
- **UI Components**: Tailwind CSS + Headless UI
- **Data Visualization**: D3.js, Recharts
- **PWA**: Workbox for offline support
- **Mobile**: Responsive-first design, iOS/Android web app capable
- **Form Management**: React Hook Form + Zod validation

#### Backend
- **API Framework**: FastAPI (Python 3.11+)
- **Authentication**: JWT tokens, OAuth2, refresh token rotation
- **Background Tasks**: Celery + Redis
- **WebSockets**: FastAPI WebSockets for real-time features
- **Testing**: Pytest, Hypothesis for property testing

#### Machine Learning & Algorithms
- **IRT Implementation**: Custom Python (NumPy, SciPy)
- **NLP/Semantic Matching**: sentence-transformers, FAISS
- **Peer Prediction**: Custom RBTS and Correlated Agreement implementations
- **ML Framework**: PyTorch (for future deep learning features)

#### Data Storage
- **Primary Database**: PostgreSQL 15+ with TimescaleDB extension
- **Caching**: Redis 7+ (sessions, real-time data)
- **Vector Search**: Weaviate or Pinecone (diagnosis embeddings)
- **Object Storage**: Cloudflare R2 or AWS S3 (images, exports)
- **Message Queue**: Kafka or RabbitMQ (event streaming)

#### Infrastructure
- **Hosting**: AWS or GCP (multi-region for low latency)
- **CDN**: Cloudflare (global edge network)
- **Monitoring**: DataDog or New Relic (APM, logs, traces)
- **Error Tracking**: Sentry
- **Analytics**: Mixpanel (product) + PostHog (self-hosted option)

### 3. Data Architecture

#### Core Data Models

##### User Profile
```python
{
  "user_id": "uuid",
  "email": "string",
  "profile": {
    "first_name": "string",
    "last_name": "string",
    "specialty": "string",
    "sub_specialties": ["string"],
    "years_experience": "string",
    "board_certified": "boolean",
    "current_role": "string",
    "institution": "string",
    "country": "string",
    "practice_setting": "string",
    "languages": ["string"]
  },
  "competence_profile": {
    "theta": "float",  # Overall ability
    "se": "float",     # Standard error
    "competence_vector": [float],  # Multidimensional
    "uncertainty_matrix": [[float]],  # Covariance
    "last_updated": "timestamp",
    "drift_parameter": "float"
  },
  "engagement_metrics": {
    "cases_completed": "int",
    "streak_current": "int",
    "streak_best": "int",
    "badges_earned": ["string"],
    "points_total": "int",
    "rank_percentile": "float"
  },
  "created_at": "timestamp",
  "last_active": "timestamp"
}
```

##### Clinical Case
```python
{
  "case_id": "uuid",
  "content": {
    "presentation": "string",
    "demographics": {object},
    "vital_signs": {object},
    "labs": {object},
    "imaging": {object},
    "history": "string"
  },
  "reference_differential": {
    "diagnoses": [{
      "name": "string",
      "likelihood": "float",
      "not_to_miss": "boolean"
    }],
    "expert_consensus": "object"
  },
  "parameters": {
    "difficulty": "float",       # IRT b parameter
    "discrimination": "float",    # IRT a parameter
    "skill_vector": [float],      # Multidimensional
    "specialty": "string",
    "clinical_area": "string",
    "complexity": "string",
    "practice_setting": "string"  # For LMIC matching
  },
  "metadata": {
    "source": "string",
    "expert_id": "uuid",
    "validation_status": "string",
    "times_used": "int",
    "avg_time_to_complete": "float"
  }
}
```

##### Assessment Response
```python
{
  "response_id": "uuid",
  "user_id": "uuid",
  "case_id": "uuid",
  "submitted_differential": [{
    "rank": "int",
    "diagnosis": "string",
    "confidence": "string",
    "not_to_miss": "boolean"
  }],
  "scores": {
    "overall": "float",
    "inclusion": "float",
    "ranking": "float",
    "critical_diagnosis": "float",
    "confidence_calibration": "float",
    "efficiency": "float"
  },
  "peer_comparison": {
    "percentile": "float",
    "peer_group_id": "uuid",
    "common_diagnoses": [{object}]
  },
  "response_time_seconds": "float",
  "theta_before": "float",
  "theta_after": "float",
  "submitted_at": "timestamp"
}
```

### 4. Security & Compliance

#### Data Security
- **Encryption at Rest**: AES-256 for all PII and PHI
- **Encryption in Transit**: TLS 1.3+ for all connections
- **Data Isolation**: Multi-tenant architecture with row-level security
- **PHI Handling**: All clinical cases de-identified per HIPAA Safe Harbor method
- **Access Control**: Role-based access control (RBAC) + attribute-based (ABAC)

#### Compliance Requirements
- **HIPAA**: De-identification, business associate agreements, audit trails
- **GDPR**: Right to erasure, data portability, consent management
- **ISO 27001**: Information security management framework
- **SOC 2 Type II**: Security, availability, confidentiality controls

#### Privacy & Ethics
- **Informed Consent**: Clear explanation of data usage, AI training purposes
- **Anonymization**: Clinical cases stripped of all 18 HIPAA identifiers
- **Data Retention**: User profiles retained while active + 7 years; cases indefinitely (de-identified)
- **Right to Withdraw**: Users can delete account and opt out of data usage

---

## D - DESIGN REQUIREMENTS

### 1. User Experience Design Principles

#### Core UX Principles
1. **Progressive Disclosure**: Don't overwhelm - reveal complexity gradually
2. **Immediate Value**: Provide actionable insights after first assessment
3. **Friction Reduction**: <30 seconds to file any new document, minimize clicks
4. **Cultural Sensitivity**: Adapt UI/UX for LMIC settings (low bandwidth, mobile-first)
5. **Gamification with Purpose**: Make it fun, but don't trivialize clinical expertise

### 2. Key User Flows

#### Flow 1: New User Onboarding → First Assessment
```
Landing Page
  → Sign Up (Email + Password)
  → Profile Setup (Specialty, Experience, Role)
  → Assessment Introduction (10 min, adaptive, builds profile)
  → [Case 1] Clinical Vignette Presentation
  → Differential Diagnosis Entry (drag-rank, confidence, critical flags)
  → Immediate Feedback (score, peer comparison, reference differential)
  → [Repeat for 3-8 cases until confidence threshold met]
  → Competence Profile Dashboard (strengths, growth areas, peer percentile)
  → Next Steps (available cases, community map)
```

**Success Criteria**:
- 80%+ completion rate from signup → first assessment started
- <15 minutes median time to complete onboarding flow
- <10% drop-off between assessment intro and first case

#### Flow 2: Returning User → Case Assessment Session
```
Login
  → Dashboard (profile overview, available cases, community activity)
  → Select Assessment Type (differential diagnosis, peer prediction, case validation)
  → [For each case]:
     - Case presentation
     - Response entry (optimized based on assessment type)
     - Immediate feedback
  → Session Complete (updated profile, new badges, community contribution)
  → Next Actions (continue, view map, check leaderboard)
```

**Success Criteria**:
- 60%+ of users complete 3+ cases per session
- <5% abandonment mid-case
- 70%+ return within 7 days

#### Flow 3: LMIC Clinician → Community Map Contribution
```
[Mobile Device, Intermittent Connectivity]
Login
  → Community Map View (shows Kibera neighborhoods, progress, own contributions)
  → Select Available Case (matched to practice setting)
  → Case Presentation (optimized for mobile, image compression)
  → Slider Assessment (typical/atypical for my clinic)
  → Offline-capable submission (queued if no connection)
  → [When back online] Sync + see updated community map
  → Personal Impact Stats (neighborhoods revealed, cases assessed, rank)
```

**Success Criteria**:
- Works on 3G connections (<500ms latency tolerance)
- <100KB per case load (compressed)
- 100% offline assessment capability
- 90%+ successful sync when reconnected

### 3. UI Component Specifications

#### Differential Diagnosis Entry Interface
**Requirements**:
- Free-text entry with autocomplete (diagnosis suggestions from structured vocab)
- Drag-and-drop ranking (smooth animations, mobile-friendly)
- Confidence dropdown (High/Medium/Low) for each diagnosis
- "Not-to-miss" flag button (orange alert icon)
- Add/remove diagnosis easily (minimum 1, recommended 3-6)
- Visual hierarchy: rank number → diagnosis name → confidence → critical flag

**Accessibility**:
- Keyboard-only navigation support
- Screen reader compatible (ARIA labels)
- High contrast mode option
- Minimum touch target 44x44px (mobile)

#### Feedback & Peer Comparison Display
**Components**:
1. **Overall Score Ring**: Circular progress indicator showing percentage score
2. **Component Breakdown**: Bar charts for inclusion, ranking, critical diagnosis, calibration, efficiency
3. **Peer Percentile Bar**: Horizontal bar showing user position vs peer distribution
4. **Common Peer Diagnoses**: List of diagnoses with % of peers who included them
5. **Reference Differential**: Side-by-side comparison with expert consensus
6. **Missed Critical Diagnoses**: Highlighted alert if user missed not-to-miss conditions

**Design Pattern**:
- Green/positive for correct/strong performance
- Orange for cautions (missed critical items)
- Blue for informational (peer comparisons)
- Avoid red/punitive framing - focus on learning

#### Community Map Visualization (LMIC Feature)
**Requirements**:
- SVG-based interactive map of practice area (e.g., Kibera neighborhoods)
- Progressive reveal: areas "light up" as community completes assessments
- Color coding: Gray (unexplored) → Yellow (emerging) → Blue (partial) → Green (revealed)
- User avatar placement showing personal location/contribution area
- Click/tap areas for detailed stats
- Real-time activity feed (recent assessments by peers)
- Personal contribution tracking (areas helped reveal, cases completed)

**Mobile Optimization**:
- Pinch-to-zoom support
- Optimized SVG (aggressive simplification for low-end devices)
- Fallback PNG images if SVG rendering fails
- Progressive loading (skeleton screens)

### 4. Visual Design System

#### Color Palette (Accessible, WCAG 2.1 AA+)

**Brand Colors**:
- **Primary Blue**: `#2563EB` (buttons, links, emphasis)
- **Primary Blue Dark**: `#1E40AF` (hover states)
- **Primary Blue Light**: `#DBEAFE` (backgrounds, highlights)

**Semantic Colors**:
- **Success Green**: `#10B981` (correct answers, positive feedback)
- **Warning Orange**: `#F59E0B` (critical diagnoses, caution items)
- **Error Red**: `#EF4444` (used sparingly, serious errors only)
- **Info Blue**: `#3B82F6` (peer comparison, informational)

**Neutral Grays**:
- **Gray 900**: `#111827` (primary text)
- **Gray 600**: `#4B5563` (secondary text)
- **Gray 200**: `#E5E7EB` (borders, dividers)
- **Gray 50**: `#F9FAFB` (backgrounds)

**CollectiveGood Brand (if custom branding)**:
- Pull from `https://www.collectivegood.io/` styleguide
- Maintain brand consistency while prioritizing usability

#### Typography
- **Headings**: Inter or System Font Stack (performance)
  - H1: 36px/44px (landing, major sections)
  - H2: 30px/38px (page titles)
  - H3: 24px/32px (section headers)
  - H4: 20px/28px (sub-sections)
- **Body**: 16px/24px (optimal readability on all devices)
- **Small**: 14px/20px (captions, meta info)
- **Mono**: JetBrains Mono for code/technical data

#### Spacing & Layout
- **Base Unit**: 4px (all spacing multiplies of 4px)
- **Container Max Width**: 1280px (large screens)
- **Content Max Width**: 720px (reading, forms)
- **Mobile Breakpoints**:
  - xs: 320px
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

### 5. Responsive & Mobile Design

#### Mobile-First Strategy
- **Design for 320px width first** (smallest common device)
- **Progressive enhancement** for larger screens
- **Touch-optimized**: 44x44px minimum touch targets
- **Thumb-friendly**: Primary actions in bottom third on mobile

#### PWA Features
- **Install Prompt**: "Add to Home Screen" for frequent users
- **Offline Mode**: Cache last viewed cases, queue responses
- **Push Notifications**: New cases available, streak reminders
- **App Icon & Splash Screen**: Branded experience

#### Performance Targets
- **First Contentful Paint**: <1.5s on 3G
- **Time to Interactive**: <3.5s on 3G
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All green (LCP <2.5s, FID <100ms, CLS <0.1)

### 6. Gamification & Engagement Design

#### Badge System
**Achievement Badges**:
- Clinical Debut (first assessment)
- Diagnostic Detective (5-case streak)
- Diagnostic Expert (20 cases completed)
- Critical Eye (90%+ critical diagnosis capture rate)
- Global Contributor (LMIC community map participation)
- Peer Reviewer (provide feedback on 10 cases)
- Master Diagnostician (top 10% in specialty)

**Visual Design**:
- Illustrated icons (friendly, professional)
- Metallic progression: Bronze → Silver → Gold → Platinum
- Animation on unlock (celebration, confetti)

#### Leaderboards
**Segments**:
- Global (all users)
- Specialty-specific
- Experience level cohort
- Geographic region
- Weekly/monthly/all-time

**Privacy Options**:
- Opt-in public display (default: anonymous ranking)
- Username vs real name option
- Can hide from leaderboards entirely

#### Streak Tracking
- Current streak (days with ≥1 assessment)
- Best streak (personal record)
- Streak freeze (1 per month, protect streak if miss 1 day)
- Visual flame icon (grows with streak length)

#### Community Features
- **Activity Feed**: Real-time updates of peer assessments (anonymized)
- **Case Comments**: Optional discussion threads on interesting cases
- **Follow Experts**: Option to follow high-performing users
- **Challenges**: Weekly themed challenges (e.g., "Rare Disease Week")

---

## Technical Specifications for Claude Code Web Development

### Development Approach

#### Phase 1: MVP Core (Weeks 1-6)
**Deliverables**:
- Landing page + signup/login flow
- Profile setup wizard
- Basic differential diagnosis assessment (3 hardcoded cases)
- Simple IRT implementation (single dimension)
- Immediate feedback page (score + reference differential)
- Basic dashboard (competence profile visualization)

**Tech Stack**:
- **Frontend**: React + TypeScript + Tailwind CSS
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Backend**: FastAPI (Python) or Next.js API routes (Node)
- **Database**: PostgreSQL (Supabase for rapid setup)
- **Deployment**: Vercel or Cloudflare Pages

#### Phase 2: Advanced Features (Weeks 7-12)
**Additions**:
- Full IRT/CAT adaptive algorithm
- Multidimensional competence vectors
- Semantic matching for diagnosis variations
- Peer comparison and percentile rankings
- Badge and gamification system
- Expanded case bank (30+ cases across specialties)

#### Phase 3: Community & Scale (Weeks 13-20)
**Additions**:
- Community map visualization
- Peer prediction mechanisms (RBTS)
- Offline PWA support
- LMIC-optimized mobile experience
- Real-time activity feeds
- Analytics dashboard for admins

### File Structure (Recommended)
```
gil-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── assessment/
│   │   │   │   ├── DifferentialEntry.tsx
│   │   │   │   ├── CasePresentation.tsx
│   │   │   │   ├── FeedbackDisplay.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── CompetenceProfile.tsx
│   │   │   │   ├── PeerComparison.tsx
│   │   │   │   ├── BadgeDisplay.tsx
│   │   │   ├── community/
│   │   │   │   ├── CommunityMap.tsx
│   │   │   │   ├── ActivityFeed.tsx
│   │   │   ├── onboarding/
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   ├── ProfileSetup.tsx
│   │   │   │   ├── AssessmentIntro.tsx
│   │   │   ├── common/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   ├── irt-engine.ts
│   │   │   ├── scoring.ts
│   │   │   ├── api-client.ts
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   ├── assessments.py
│   │   │   │   ├── cases.py
│   │   │   │   ├── analytics.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── case.py
│   │   │   ├── response.py
│   │   │   ├── competence.py
│   │   ├── services/
│   │   │   ├── irt_engine.py
│   │   │   ├── peer_prediction.py
│   │   │   ├── case_router.py
│   │   │   ├── scoring_service.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   ├── database.py
│   │   └── main.py
│   ├── tests/
│   └── requirements.txt
├── database/
│   ├── migrations/
│   └── seeds/
└── docs/
    ├── api/
    └── architecture/
```

### Key Implementation Notes

#### IRT Engine (Critical Component)
```python
# backend/app/services/irt_engine.py
class IRTEngine:
    """
    Item Response Theory adaptive testing engine
    Implements 2PL IRT with multidimensional extension
    """

    def select_next_case(self, theta: float, cases_available: List[Case]) -> Case:
        """
        Select case that maximizes information at current theta
        Fisher Information: I(θ) = a² * P(θ) * Q(θ)
        """
        max_info = -inf
        selected_case = None

        for case in cases_available:
            info = self.item_information(theta, case.difficulty, case.discrimination)
            if info > max_info:
                max_info = info
                selected_case = case

        return selected_case

    def update_theta(self, responses: List[Response]) -> Tuple[float, float]:
        """
        Maximum Likelihood Estimation of ability parameter
        Returns: (theta_estimate, standard_error)
        """
        # Newton-Raphson or Expected A Posteriori (EAP)
        # Implementation details...

    def should_stop(self, theta: float, se: float, n_items: int) -> bool:
        """
        Stopping rule: minimum items, maximum items, or SE threshold
        """
        return (se <= TARGET_SE) or (n_items >= MAX_ITEMS)
```

#### Differential Scoring Logic
```typescript
// frontend/src/lib/scoring.ts
interface DifferentialScore {
  overall: number;
  components: {
    inclusion: number;    // Did they include correct diagnoses?
    ranking: number;      // Were they ranked correctly?
    critical: number;     // Did they catch not-to-miss diagnoses?
    calibration: number;  // Was confidence aligned with correctness?
    efficiency: number;   // Concise differential (not too long)?
  };
}

function scoreDifferential(
  submitted: Diagnosis[],
  reference: ReferenceDifferential
): DifferentialScore {
  // Semantic matching with fuzzy string comparison
  // Weight by rank (top diagnoses matter more)
  // Extra credit for critical diagnosis identification
  // Confidence calibration scoring
  // Return detailed breakdown for feedback
}
```

---

## Appendices

### A. Glossary

- **IRT (Item Response Theory)**: Psychometric framework modeling relationship between ability and item difficulty
- **CAT (Computerized Adaptive Testing)**: Dynamic test that adapts difficulty based on responses
- **RBTS (Robust Bayesian Truth Serum)**: Peer prediction mechanism for eliciting truthful subjective responses
- **Differential Diagnosis**: List of possible diagnoses ranked by likelihood
- **Not-to-Miss Diagnosis**: Critical condition that, if missed, could lead to serious harm
- **Competence Vector**: Multidimensional representation of clinical expertise across domains
- **Peer Prediction**: Mechanism to assess accuracy of subjective judgments without ground truth

### B. Research References

1. **IRT in Medical Education**: Downing, S. M. (2003). Item response theory: applications of modern test theory in medical education. *Medical Education*, 37(8), 739-745.

2. **Peer Prediction Mechanisms**: Radanovic, G., & Faltings, B. (2014). A robust Bayesian truth serum for non-binary signals. *AAAI Conference on Artificial Intelligence*.

3. **Clinical Competence Assessment**: Epstein, R. M., & Hundert, E. M. (2002). Defining and assessing professional competence. *JAMA*, 287(2), 226-235.

4. **LMIC Healthcare Technology**: Aranda-Jan, C. B., Mohutsiwa-Dibe, N., & Loukanova, S. (2014). Systematic review on what works, what does not work and why of implementation of mobile health (mHealth) projects in Africa. *BMC Public Health*, 14(1), 188.

### C. Next Steps & Roadmap

#### Immediate Next Actions (This Week)
1. **Finalize UI Design**: Create high-fidelity mockups in Figma for all key screens
2. **Set Up Development Environment**: Initialize React + FastAPI repos, configure CI/CD
3. **Build Landing Page MVP**: Deploy simple signup page to validate recruitment messaging
4. **Create Case Bank**: Curate initial 10 high-quality cases with expert consensus differentials

#### 30-Day Milestones
- **Week 1-2**: Landing page + signup live, recruitment campaign launched
- **Week 3-4**: Onboarding flow + basic assessment (5 cases) functional
- **Week 5-6**: Dashboard with competence profile, first 50 clinicians onboarded

#### 90-Day Milestones
- **Month 2**: Full IRT adaptive engine, 30+ cases, peer comparison features
- **Month 3**: Community map (LMIC), offline PWA, gamification, 500 clinicians

#### 6-Month Goals
- **10,000 clinicians** actively using platform
- **Validated competence profiles** for intelligent case routing
- **First enterprise customer** (AI company validation contract)
- **Academic publication** on peer prediction in clinical settings

---

**Document Control**
**Owner**: Product Team, CollectiveGood
**Last Updated**: 2025-11-17
**Next Review**: 2025-12-17
**Status**: Draft for Implementation
