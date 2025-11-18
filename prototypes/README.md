# GIL Platform Prototypes

This directory contains reference prototype implementations developed during the design phase.

## Files

### `clinician-onboarding-app.tsx`
Complete React prototype demonstrating the clinician onboarding and assessment flow:
- Profile setup wizard
- IRT-based adaptive assessment
- Differential diagnosis entry interface
- Immediate feedback with peer comparison
- Competence profiling dashboard

**Purpose**: Reference implementation for assessment components and state management patterns.

### `kibera-health-community-map.tsx`
Interactive community map visualization prototype:
- Progressive reveal gamification
- Community-driven data collection visualization
- Individual and team contribution tracking
- Mobile-optimized design

**Purpose**: Reference for community engagement features and map visualization.

## Usage in Development

These prototypes serve as:

1. **Component extraction source**: Extract specific components (e.g., DifferentialEntry, KiberaMap) for the production app
2. **UX reference**: Demonstrate interaction patterns and user flows
3. **State management guide**: Show how to structure assessment state and community data
4. **Design patterns**: Illustrate successful UI/UX approaches from user testing

## Important Notes

- These are **reference implementations**, not production code
- Extract and refactor components as needed for the main application
- The unified specification in `docs/design/Unified-Prototype-Spec.md` consolidates features from these prototypes
- Production code should follow the architecture in `docs/design/Technical-Specs.md`
