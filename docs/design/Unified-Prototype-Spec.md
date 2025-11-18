# Kibera Health Assessment - Unified Prototype Specification

**Version**: 1.0 (Unified)
**Date**: 2025-11-17
**Status**: Ready for Implementation
**Base**: v5-session-scoring + bts-peer-prediction + community gamification

---

## Executive Summary

This specification defines the **unified GIL Clinician App prototype** that combines:

1. ✅ **v5's progression system** - polished leveling, session scoring, achievements
2. ✅ **BTS peer prediction** - dual assessment, metacognitive scoring
3. ✅ **Community gamification** - Kibera map visualization, team progress

**Goal**: Create a unique platform balancing individual learning with collective intelligence gathering through peer prediction and community contribution visualization.

---

## Core Features

### 1. Dual Assessment System (BTS)

**User Interface**:
```
┌─────────────────────────────────────┐
│ 🩺 YOUR CLINICAL ASSESSMENT         │
├─────────────────────────────────────┤
│ Based on your experience, how       │
│ typical is this case for Kibera?    │
│                                     │
│ Not typical  [━━━━━●━━━━] Very typical│
│              75%                    │
│                                     │
│ Confidence: ○ High ● Med ○ Low      │
│                                     │
│ Share your reasoning (bonus +5 pts):│
│ [Optional text field]               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 👥 PEER PREDICTION                  │
├─────────────────────────────────────┤
│ What do you think OTHER health      │
│ workers would rate this case?       │
│                                     │
│ Not typical  [━━━━●━━━━━] Very typical│
│              65%                    │
└─────────────────────────────────────┘
```

**Implementation**:
```typescript
interface DualAssessment {
  // User's own clinical judgment
  ownAssessment: number;        // 0-100 slider value
  ownLabel: string;             // "Very typical", "Typical", etc.
  confidence: 'high' | 'medium' | 'low';  // NEW
  reasoning?: string;           // NEW: optional bonus field

  // Prediction of peer responses
  peerPrediction: number;       // 0-100 slider value
  peerLabel: string;            // "Very typical", "Typical", etc.

  // Metadata
  caseId: string;
  timestamp: Date;
  responseTime: number;         // seconds
}
```

---

### 2. BTS Scoring Algorithm

**Four-Component Scoring**:

```typescript
interface BTSScore {
  // Component 1: Information Score (0-10 pts)
  information: number;          // = |own - peer| / 10

  // Component 2: Prediction Score (0-20 pts)
  prediction: number;           // = max(0, 20 - |peer - community|)

  // Component 3: Accuracy Bonus (0-15 pts)
  accuracy: number;             // = isCorrect ? 15 : 0

  // Component 4: Insight Bonus (0-10 pts)
  insight: number;              // = (isCorrect && |own - community| > 15) ? 10 : 0

  // Derived
  total: number;                // = sum of above (max 55)
  predictionError: number;      // = |peer - community|
}

function calculateBTSScore(
  ownResponse: number,
  peerPrediction: number,
  communityAverage: number,
  isCorrect: boolean
): BTSScore {
  const information = Math.abs(ownResponse - peerPrediction) / 10;
  const prediction = Math.max(0, 20 - Math.abs(peerPrediction - communityAverage));
  const accuracy = isCorrect ? 15 : 0;
  const insight = (isCorrect && Math.abs(ownResponse - communityAverage) > 15) ? 10 : 0;

  return {
    information: Math.round(information),
    prediction: Math.round(prediction),
    accuracy,
    insight,
    total: Math.round(information + prediction + accuracy + insight),
    predictionError: Math.abs(peerPrediction - communityAverage),
  };
}
```

---

### 3. Progression System (from v5)

**Experience Levels**:
```typescript
const LEVELS = [
  { name: 'Medical Student', minPoints: 0, nameSwahili: 'Mwanafunzi' },
  { name: 'Intern', minPoints: 50, nameSwahili: 'Mhudumu' },
  { name: 'Resident', minPoints: 150, nameSwahili: 'Msaidizi' },
  { name: 'Specialist', minPoints: 300, nameSwahili: 'Mtaalamu' },
  { name: 'Expert', minPoints: 500, nameSwahili: 'Bingwa' },
  { name: 'Master Clinician', minPoints: 1000, nameSwahili: 'Mkuu wa Kliniki' },
];

interface UserProgression {
  currentLevel: string;
  currentLevelIndex: number;
  totalPoints: number;
  sessionPoints: number;
  pointsToNextLevel: number;
  casesCompleted: number;
  currentStreak: number;
  bestStreak: number;
  accuracy: number;              // percentage
}
```

**Points Calculation**:
```typescript
interface PointsBreakdown {
  // Traditional (v5)
  base: number;                 // Difficulty score (1-10)
  speed: number;                // <30s = +2, <60s = +1
  streak: number;               // Every 3rd: +5, every 5th: +10
  mastery: number;              // 3+ completions: +2

  // BTS
  bts: BTSScore;                // Full BTS breakdown

  // NEW
  confidence: number;           // High confidence + correct = +3
  reasoning: number;            // Shared reasoning = +5

  // Total
  session: number;              // Sum for current session
  lifetime: number;             // Cumulative total
}
```

---

### 4. Achievement System (Merged)

**Combined Achievements** (v5 + BTS):

```typescript
const ACHIEVEMENTS = [
  // From v5
  {
    id: 'first_case',
    name: 'First Steps',
    nameSwahili: 'Hatua za Kwanza',
    description: 'Complete your first case',
    icon: '🎯',
    criteria: { casesCompleted: 1 },
    points: 5,
  },
  {
    id: 'streak_3',
    name: 'On Fire',
    nameSwahili: 'Moto Moto',
    description: 'Achieve a 3-case streak',
    icon: '🔥',
    criteria: { currentStreak: 3 },
    points: 10,
  },
  {
    id: 'level_specialist',
    name: 'Clinical Specialist',
    nameSwahili: 'Mtaalamu wa Kliniki',
    description: 'Reach Specialist level',
    icon: '⭐',
    criteria: { level: 'Specialist' },
    points: 50,
  },

  // From BTS
  {
    id: 'first_bts',
    name: 'Community Insight',
    nameSwahili: 'Ufahamu wa Jamii',
    description: 'Complete your first BTS assessment',
    icon: '🤝',
    criteria: { btsAssessments: 1 },
    points: 5,
  },
  {
    id: 'good_predictor',
    name: 'Peer Predictor',
    nameSwahili: 'Mtabiri wa Wenzangu',
    description: 'Make 3 accurate peer predictions (error ≤10)',
    icon: '🎯',
    criteria: { goodPredictions: 3 },
    points: 15,
  },
  {
    id: 'unique_insights',
    name: 'Unique Perspective',
    nameSwahili: 'Mtazamo wa Kipekee',
    description: 'Provide 5 unique correct insights',
    icon: '💡',
    criteria: { uniqueInsights: 5 },
    points: 20,
  },
  {
    id: 'consensus_builder',
    name: 'Consensus Builder',
    nameSwahili: 'Mjenzi wa Makubaliano',
    description: 'Achieve average BTS score ≥30',
    icon: '🌟',
    criteria: { avgBTSScore: 30 },
    points: 25,
  },

  // NEW: Community
  {
    id: 'area_revealer',
    name: 'Area Explorer',
    nameSwahili: 'Mgundua Maeneo',
    description: 'Help reveal 3 areas on Kibera map',
    icon: '🗺️',
    criteria: { areasRevealed: 3 },
    points: 15,
  },
  {
    id: 'team_contributor',
    name: 'Team Champion',
    nameSwahili: 'Bingwa wa Timu',
    description: 'Contribute 25 assessments to team total',
    icon: '👥',
    criteria: { teamContributions: 25 },
    points: 30,
  },
  {
    id: 'map_master',
    name: 'Map Master',
    nameSwahili: 'Bingwa wa Ramani',
    description: 'Help complete Kibera healthcare atlas',
    icon: '🏆',
    criteria: { allAreasRevealed: true },
    points: 100,
  },
];
```

---

### 5. Community Gamification (NEW)

#### Kibera Map Visualization

**Data Structure**:
```typescript
interface KiberaRegion {
  id: string;
  name: string;
  nameSwahili: string;
  coverage: number;             // 0-100 percentage
  totalAssessments: number;
  lastUpdated: Date;

  // Visual
  position: { x: number, y: number };
  status: 'unexplored' | 'emerging' | 'partial' | 'revealed';
}

const KIBERA_REGIONS: KiberaRegion[] = [
  {
    id: 'olympic',
    name: 'Olympic',
    nameSwahili: 'Olympic',
    coverage: 87,
    totalAssessments: 234,
    position: { x: 20, y: 30 },
    status: 'revealed',
  },
  {
    id: 'laini_saba',
    name: 'Laini Saba',
    nameSwahili: 'Laini Saba',
    coverage: 72,
    totalAssessments: 189,
    position: { x: 60, y: 25 },
    status: 'partial',
  },
  // ... 13 more regions
];
```

**Status Thresholds**:
- **Unexplored** (0-29%): Gray, minimal detail, question marks
- **Emerging** (30-59%): Yellow/orange, some detail, pulsing
- **Partial** (60-84%): Blue, good detail, steady
- **Revealed** (85-100%): Green, full detail, glowing

**Map Component**:
```typescript
interface KiberaMapProps {
  regions: KiberaRegion[];
  userContributions: string[];  // Region IDs user helped reveal
  interactive: boolean;
  onRegionClick?: (region: KiberaRegion) => void;
  highlightRecent?: string;     // Region ID just updated
}

// Visual design
function getRegionColor(coverage: number): string {
  if (coverage >= 85) return '#10B981';  // Green
  if (coverage >= 60) return '#3B82F6';  // Blue
  if (coverage >= 30) return '#F59E0B';  // Yellow
  return '#6B7280';                       // Gray
}

function getRegionOpacity(coverage: number): number {
  return Math.max(0.3, coverage / 100);  // Fade in as coverage increases
}
```

**Animation on Update**:
```typescript
// When user submits assessment
function animateMapUpdate(regionId: string, oldCoverage: number, newCoverage: number) {
  // 1. Pulse region
  pulseRegion(regionId, duration: 1000);

  // 2. Animate coverage bar
  animateProgressBar(oldCoverage, newCoverage, duration: 1500);

  // 3. Show "+1 assessment" popup
  showPopup(regionId, '+1 Assessment', duration: 2000);

  // 4. If crossed threshold (e.g., 60% → 61%)
  if (crossedThreshold(oldCoverage, newCoverage)) {
    celebrate(regionId, newStatus);  // Confetti, badge, etc.
  }

  // 5. Highlight user's contribution glow
  highlightUserContribution(regionId, duration: 3000);
}
```

#### Team Statistics

```typescript
interface CommunityStats {
  totalAssessments: number;
  targetAssessments: number;    // e.g., 5,000
  activeMembers: number;         // Active in last 7 days
  teamAccuracy: number;          // Average accuracy %
  consensusStrength: number;     // Inter-rater agreement

  // Progress
  areasFullyMapped: number;      // Coverage ≥85%
  totalAreas: number;            // 15

  // Recent activity
  recentUpdates: Array<{
    regionName: string;
    action: string;
    time: string;
  }>;
}

// Dashboard display
<CommunityStatsCard stats={communityStats}>
  Total: {stats.totalAssessments} / {stats.targetAssessments}
  Progress: [━━━━━━━━━━────────] {percentage}%
  Active Members: {stats.activeMembers}
  Areas Mapped: {stats.areasFullyMapped} / {stats.totalAreas}
</CommunityStatsCard>
```

#### Individual Team Contribution

```typescript
interface UserContribution {
  totalAssessments: number;
  areasRevealed: string[];       // Region IDs
  uniqueInsights: number;
  goodPredictions: number;
  teamRank: number;              // e.g., #23 out of 156
  percentile: number;            // e.g., 85th percentile
}

// Display
<YourImpactCard contribution={userContribution}>
  📊 Your Team Impact
  ├─ {contribution.totalAssessments} assessments contributed
  ├─ Helped reveal {contribution.areasRevealed.length} areas
  │  ({contribution.areasRevealed.join(', ')})
  ├─ {contribution.uniqueInsights} unique insights shared
  ├─ {contribution.goodPredictions} accurate predictions
  └─ Rank: #{contribution.teamRank} (top {100 - contribution.percentile}%)
</YourImpactCard>
```

---

## Screen-by-Screen Specification

### Screen 1: Instructions

**Layout**:
```
┌─────────────────────────────────────┐
│ Header: CollectiveGood + User Avatar│
├─────────────────────────────────────┤
│ [Progress Bar: 0%]                  │
├─────────────────────────────────────┤
│ YOUR PROGRESS (v5)                  │
│ ┌─────────────────────────────────┐ │
│ │ Level: Resident                 │ │
│ │ Points: 350 / 500 to Specialist │ │
│ │ [━━━━━━━━━━────] 70%            │ │
│ │ Session: 0 pts                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ BTS STATS (BTS)                     │
│ ┌─────────────────────────────────┐ │
│ │ Avg BTS: 32 | Predictions: 8    │ │
│ │ Insights: 3 | Streak: 5         │ │
│ │ [4 Achievement Badges]          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ COMMUNITY PROGRESS (NEW)            │
│ ┌─────────────────────────────────┐ │
│ │ [Mini Kibera Map Preview]       │ │
│ │ 2,347 / 5,000 (47%)             │ │
│ │ 6 / 15 areas fully mapped       │ │
│ │ 156 active members today        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ HOW IT WORKS                        │
│ ┌─────────────────────────────────┐ │
│ │ 1. Your clinical judgment       │ │
│ │ 2. Predict peer responses       │ │
│ │ 3. Build Kibera atlas together  │ │
│ │                                 │ │
│ │ 💡 Earn points for:             │ │
│ │ • Being accurate                │ │
│ │ • Predicting peers well         │ │
│ │ • Having unique insights        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Begin Community Assessment] ───────┤
└─────────────────────────────────────┘
```

**Interaction**:
- Tap "Begin" → Navigate to Case Assessment
- Show badges earned (animated on hover)
- Tap map preview → Navigate to full map view (optional)

---

### Screen 2: Case Assessment

**Layout**:
```
┌─────────────────────────────────────┐
│ Header: Progress (Case 3/6)         │
├─────────────────────────────────────┤
│ [Progress Bar: 50%]                 │
├─────────────────────────────────────┤
│ CASE DETAILS (v5)                   │
│ ┌─────────────────────────────────┐ │
│ │ Case #3: Rose Akoth             │ │
│ │ Difficulty: Easy | Region: Olympic│ │
│ │                                 │ │
│ │ [Demographics Card]             │ │
│ │ Age: 8 months | Sex: Female     │ │
│ │ Caregiver: Mother (19 yrs)      │ │
│ │                                 │ │
│ │ [Chief Complaint Card]          │ │
│ │ "Mtoto ana homa..." (fever...)  │ │
│ │                                 │ │
│ │ [Symptoms List]                 │ │
│ │ • Fever - 3 days                │ │
│ │ • Feeding difficulty            │ │
│ │ • ...                           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ YOUR ASSESSMENT (BTS)               │
│ ┌─────────────────────────────────┐ │
│ │ How typical for Kibera?         │ │
│ │                                 │ │
│ │ Not typical [━━━━━●━━━━] Very   │ │
│ │             75%                 │ │
│ │                                 │ │
│ │ Confidence: ○ High ● Med ○ Low  │ │
│ │                                 │ │
│ │ Why? [Optional +5 pts]          │ │
│ │ [Text field...]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ PEER PREDICTION (BTS)               │
│ ┌─────────────────────────────────┐ │
│ │ What will others say?           │ │
│ │                                 │ │
│ │ Not typical [━━━●━━━━━] Very    │ │
│ │             65%                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Submit Both Assessments] ──────────┤
│ (Disabled until both sliders moved) │
└─────────────────────────────────────┘
```

**Validation**:
```typescript
// Enable submit only when:
const canSubmit = (
  ownSliderMoved &&
  peerSliderMoved &&
  !isSubmitting
);

// Bonus points logic
const bonusPoints = (
  confidence === 'high' && isCorrect ? 3 : 0
) + (
  reasoning && reasoning.length > 20 ? 5 : 0
);
```

---

### Screen 3: Case Reveal

**Layout**:
```
┌─────────────────────────────────────┐
│ 🎯 Assessment Complete!             │
├─────────────────────────────────────┤
│ [Progress Bar: 50%]                 │
├─────────────────────────────────────┤
│ POINTS EARNED (v5)                  │
│ ┌─────────────────────────────────┐ │
│ │ Session: +59 pts                │ │
│ │ ├─ Base: +8 (Easy case)         │ │
│ │ ├─ Speed: +2 (<30s)             │ │
│ │ ├─ Streak: +5 (3rd in row)      │ │
│ │ ├─ Confidence: +3 (high + ✓)    │ │
│ │ └─ Reasoning: +5 (shared)       │ │
│ │                                 │ │
│ │ Total: 350 → 409 pts            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ BTS SCORE (BTS)                     │
│ ┌─────────────────────────────────┐ │
│ │ BTS Score: 44 / 55              │ │
│ │ ├─ Information: +1              │ │
│ │ │   (small difference)          │ │
│ │ ├─ Prediction: +18              │ │
│ │ │   (excellent!)                │ │
│ │ ├─ Accuracy: +15                │ │
│ │ │   (correct)                   │ │
│ │ └─ Insight: +10                 │ │
│ │     (unique + right)            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ PREDICTION ACCURACY (BTS)           │
│ ┌─────────────────────────────────┐ │
│ │ Your Prediction: 65             │ │
│ │ Community Average: 68           │ │
│ │                                 │ │
│ │ [━━━━━━━━━●━━] Prediction       │ │
│ │ [━━━━━━━━━━●━] Community        │ │
│ │                                 │ │
│ │ Error: 3 points ⭐ Great!       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ COMMUNITY IMPACT (NEW)              │
│ ┌─────────────────────────────────┐ │
│ │ [Kibera Map Animation]          │ │
│ │ ⚡ Olympic: 87% → 88% 🎉         │ │
│ │                                 │ │
│ │ Team Total: 2,347 → 2,348       │ │
│ │ Your Contributions: 15 → 16     │ │
│ │                                 │ │
│ │ 💡 You're in top 20%!           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Continue to Next Case] ────────────┤
└─────────────────────────────────────┘
```

**Animation Sequence**:
```typescript
// On screen load
async function playRevealAnimation() {
  await delay(500);
  await animatePointsCounter(0, 59, duration: 1000);

  await delay(300);
  await animateBTSBreakdown(duration: 1500);

  await delay(300);
  await animatePredictionBars(duration: 1000);

  await delay(500);
  await pulseKiberaRegion('olympic', duration: 1000);
  await animateCoverageUpdate(87, 88, duration: 1500);

  if (crossedThreshold(87, 88)) {
    await celebrateThreshold(duration: 2000);
  }
}
```

---

### Screen 4: Session Complete

**Layout**:
```
┌─────────────────────────────────────┐
│ 🎉 Hongera! Session Complete        │
├─────────────────────────────────────┤
│ [Progress Bar: 100%]                │
├─────────────────────────────────────┤
│ SESSION SUMMARY (v5)                │
│ ┌─────────────────────────────────┐ │
│ │ 🎊 LEVEL UP! Specialist!        │ │
│ │                                 │ │
│ │ Points Earned: 342              │ │
│ │ Total Points: 350 → 692         │ │
│ │ Cases Completed: 6              │ │
│ │ Accuracy: 83%                   │ │
│ │ Streak: 5 cases                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ BTS PERFORMANCE (BTS)               │
│ ┌─────────────────────────────────┐ │
│ │ Avg BTS Score: 38.5 (up from 32)│ │
│ │ Good Predictions: 4/6 (67%)     │ │
│ │ Unique Insights: 2              │ │
│ │ Calibration Trend: ↗ Improving  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ TEAM CONTRIBUTION (NEW)             │
│ ┌─────────────────────────────────┐ │
│ │ [Full Kibera Map]               │ │
│ │                                 │ │
│ │ You helped reveal:              │ │
│ │ • Olympic (87% → 91%) 🌟        │ │
│ │ • Laini Saba (65% → 68%)        │ │
│ │                                 │ │
│ │ Team Progress: 2,342 → 2,348    │ │
│ │ Your Total: 10 → 16 🎯          │ │
│ │                                 │ │
│ │ You're #23 in community (top 15%)│ │
│ └─────────────────────────────────┘ │
│                                     │
│ NEW ACHIEVEMENTS                    │
│ ┌─────────────────────────────────┐ │
│ │ 🏆 Unlocked:                    │ │
│ │                                 │ │
│ │ [🎯 Peer Predictor]             │ │
│ │ Made 3+ accurate predictions    │ │
│ │ +15 bonus points                │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Start New Session] ────────────────┤
│ [View Community Map] ───────────────┤
│ [View Full Stats] ──────────────────┤
└─────────────────────────────────────┘
```

**Achievement Popup**:
```
┌─────────────────────────────────┐
│ [Confetti Animation]            │
│                                 │
│ 🎯                              │
│ PEER PREDICTOR                  │
│ Mtabiri wa Wenzangu             │
│                                 │
│ Made 3+ accurate predictions    │
│                                 │
│ +15 bonus points earned!        │
│                                 │
│ [Asante! 🎉] ───────────────────┤
└─────────────────────────────────┘
```

---

## Technical Implementation Details

### State Management

```typescript
// Unified app state
interface AppState {
  // Screens
  currentScreen: 'instructions' | 'case' | 'reveal' | 'complete';

  // Case progression
  currentCaseIndex: number;
  cases: ClinicalCase[];

  // User input
  currentResponse: DualAssessment | null;
  slidersMoved: { own: boolean; peer: boolean };

  // Progression (v5)
  progression: UserProgression;

  // BTS stats
  btsStats: {
    avgBTSScore: number;
    totalBTSScore: number;
    goodPredictions: number;
    uniqueInsights: number;
  };

  // Community (NEW)
  community: {
    stats: CommunityStats;
    regions: KiberaRegion[];
    userContribution: UserContribution;
  };

  // History
  responses: Array<DualAssessment & { btsScore: BTSScore }>;
  achievements: string[];
}

// State updates
function updateState(newResponse: DualAssessment) {
  // Calculate scores
  const btsScore = calculateBTSScore(...);
  const points = calculatePoints(...);

  // Update progression
  updateProgression(points);

  // Update BTS stats
  updateBTSStats(btsScore);

  // Update community
  updateCommunityContribution(newResponse.caseId);

  // Check achievements
  checkAndUnlockAchievements(state);
}
```

### Component Structure

```typescript
// Main app
<KiberaHealthAssessmentUnified>
  {currentScreen === 'instructions' && (
    <InstructionsScreen
      progression={progression}
      btsStats={btsStats}
      communityStats={community.stats}
      onBegin={() => setCurrentScreen('case')}
    />
  )}

  {currentScreen === 'case' && (
    <CaseAssessmentScreen
      case={cases[currentCaseIndex]}
      caseNumber={currentCaseIndex + 1}
      totalCases={cases.length}
      onSubmit={handleSubmit}
    >
      <CaseDetailsCard {...} />
      <DualAssessmentInput
        onOwnChange={setOwnAssessment}
        onPeerChange={setPeerPrediction}
        onConfidenceChange={setConfidence}
        onReasoningChange={setReasoning}
      />
    </CaseAssessmentScreen>
  )}

  {currentScreen === 'reveal' && (
    <RevealScreen
      response={lastResponse}
      btsScore={lastBTSScore}
      pointsEarned={lastPoints}
      communityUpdate={lastCommunityUpdate}
      onContinue={handleContinue}
    >
      <PointsBreakdownCard {...} />
      <BTSScoreCard {...} />
      <PredictionAccuracyViz {...} />
      <KiberaMapUpdate {...} />
    </RevealScreen>
  )}

  {currentScreen === 'complete' && (
    <SessionCompleteScreen
      sessionSummary={sessionSummary}
      btsPerformance={btsPerformance}
      communityContribution={userContribution}
      achievements={newAchievements}
      onNewSession={resetSession}
      onViewMap={() => navigate('map')}
    >
      <SessionSummaryCard {...} />
      <BTSPerformanceCard {...} />
      <KiberaMapFull {...} />
      <AchievementsList {...} />
    </SessionCompleteScreen>
  )}

  {showAchievementPopup && (
    <AchievementPopup
      achievement={newAchievement}
      onClose={() => setShowAchievementPopup(false)}
    />
  )}
</KiberaHealthAssessmentUnified>
```

---

## Development Roadmap

### Phase 1: Core Integration (Week 1)
- ✅ Copy v5 as base
- ⬜ Add dual-slider UI
- ⬜ Integrate BTS scoring
- ⬜ Merge achievements
- ⬜ Test all flows

### Phase 2: Enhancements (Week 2)
- ⬜ Add confidence selector
- ⬜ Add reasoning field
- ⬜ Improve BTS explanations
- ⬜ Add calibration feedback

### Phase 3: Community Features (Week 3-4)
- ⬜ Design Kibera map SVG
- ⬜ Implement map animations
- ⬜ Build team stats dashboard
- ⬜ Add collaborative achievements

### Phase 4: Polish (Week 5)
- ⬜ Full testing
- ⬜ Performance optimization
- ⬜ Accessibility audit
- ⬜ User testing

---

## File Location

**Unified Prototype**: `GIL-Platform/Prototypes/kibera-health-assessment-unified.tsx`

**References**:
- Base: `Archive/v5-session-scoring.tsx`
- BTS: `Reference/bts-peer-prediction.tsx`
- Research: `../Research/Peer-Prediction-Mechanisms.md`

---

**Status**: Ready for Claude Code Web development
**Owner**: Sean Sylvia
**Date**: 2025-11-17
