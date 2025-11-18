# GIL Platform

**Global Intelligence Layer** - A comprehensive platform for recruiting, onboarding, assessing, and engaging clinicians worldwide to contribute their expertise to responsible clinical AI development.

## Overview

The GIL Platform combines adaptive clinical competence profiling, peer prediction mechanisms, and gamified community engagement to create a scalable, evidence-based approach to clinical AI validation.

### Core Mission

Enable clinical AI systems that work **with** clinicians, not against them, by building the most comprehensive, validated dataset of clinical expertise and judgment across diverse practice settings globally.

### Key Features

- **Adaptive IRT-based Assessment**: Psychometric profiling of clinical competence using Item Response Theory
- **Differential Diagnosis Entry**: Ranked diagnoses with confidence levels and clinical reasoning
- **Peer Prediction (BTS/RBTS)**: Ground-truth-free validation mechanisms using Bayesian Truth Serum
- **Community Gamification**: Progressive reveal maps (e.g., Kibera healthcare atlas) showing team progress
- **Multidimensional Profiling**: Skill vectors across clinical domains with CAT (Computerized Adaptive Testing)
- **LMIC Focus**: Mobile-optimized, offline-capable design for low-resource settings

## Quick Start

### Prerequisites

- **Node.js 18+** and npm/yarn
- **Python 3.11+**
- **PostgreSQL 15+**
- **Redis 7+** (optional, for caching and sessions)

### Local Development

1. **Clone and setup:**
   ```bash
   git clone https://github.com/collectivegood/gil-platform.git
   cd gil-platform
   ./scripts/setup.sh
   ```

2. **Frontend (React + TypeScript):**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Frontend runs at http://localhost:5173
   ```

3. **Backend (FastAPI + Python):**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   # Backend runs at http://localhost:8000
   ```

4. **Database:**
   ```bash
   # Set up PostgreSQL and run migrations
   ./scripts/seed-database.sh
   ```

5. **Docker (Alternative - All Services):**
   ```bash
   docker-compose up
   ```

## Project Structure

```
gil-platform/
├── frontend/          # React 18 + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities (API client, scoring)
│   │   ├── store/       # Zustand state management
│   │   └── types/       # TypeScript type definitions
│   └── package.json
├── backend/           # FastAPI + Python 3.11+
│   ├── app/
│   │   ├── api/routes/  # API endpoints
│   │   ├── models/      # SQLAlchemy ORM models
│   │   ├── services/    # Business logic (IRT engine, peer prediction)
│   │   ├── core/        # Configuration, database, security
│   │   └── schemas/     # Pydantic validation schemas
│   └── requirements.txt
├── database/          # PostgreSQL schemas and seed data
│   ├── schema.sql
│   └── seeds/
├── docs/              # Comprehensive documentation
│   ├── design/        # PRD, technical specs, unified prototype spec
│   ├── research/      # Peer prediction research
│   └── api/           # API documentation
├── prototypes/        # Reference React implementations
├── scripts/           # Setup and development automation
└── docker-compose.yml
```

## Documentation

- **[Product Requirements (PRD)](docs/design/GIL-Platform-PRD-BMAD.md)** - Comprehensive BMAD framework specification
- **[Technical Specifications](docs/design/Technical-Specs.md)** - Architecture and implementation guide
- **[Unified Prototype Spec](docs/design/Unified-Prototype-Spec.md)** - Complete UI/UX specification
- **[Peer Prediction Research](docs/research/Peer-Prediction-Mechanisms.md)** - BTS/RBTS mechanisms
- **[API Documentation](docs/api/)** - API endpoints and schemas
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions

## Technology Stack

### Frontend
- **React 18+** with TypeScript
- **Tailwind CSS** + Headless UI for styling
- **Zustand** for state management
- **React Hook Form** + Zod for form validation
- **Recharts** / D3.js for data visualization
- **Vite** for build tooling
- **PWA** with Workbox for offline support

### Backend
- **FastAPI** (Python 3.11+) for high-performance API
- **PostgreSQL 15+** with TimescaleDB for time-series data
- **SQLAlchemy** ORM with Alembic migrations
- **Redis 7+** for caching and sessions
- **JWT** authentication with refresh tokens
- **NumPy, SciPy, scikit-learn** for IRT/ML computations

### Infrastructure
- **Docker** + Docker Compose for local development
- **GitHub Actions** for CI/CD
- **AWS** or **GCP** for production hosting (multi-region)
- **Cloudflare** CDN
- **Mixpanel** + **PostHog** for analytics

## Development Workflow

### Parallel Development Sessions

The modular architecture supports parallel Claude Code Web sessions:

1. **Session 1: Landing & Auth** - Authentication, signup, login flows
2. **Session 2: Assessment Interface** - Case presentation, differential entry
3. **Session 3: IRT Engine** - Backend adaptive testing algorithm
4. **Session 4: Dashboard** - Competence visualizations, peer comparisons
5. **Session 5: Community Features** - Kibera map, gamification
6. **Session 6: Integration** - Connect components, E2E testing

See [Technical Specs](docs/design/Technical-Specs.md) for detailed session breakdowns.

### Running Tests

```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && pytest

# All tests
./scripts/run-tests.sh
```

## Success Metrics

### Recruitment & Engagement
- **3 months**: 1,000 clinicians onboarded
- **12 months**: 10,000 active users
- **Monthly active**: 60%+ of registered users
- **Retention**: 90%+ at 6 months

### Quality
- **Inter-rater reliability**: >0.85
- **Assessment validity**: >0.8
- **Critical diagnosis capture**: >90%
- **Platform NPS**: >50

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines, code style, and pull request process.

## License

[To be determined - likely MIT or Apache 2.0]

## Team

- **Project Lead**: Sean Sylvia
- **Organization**: CollectiveGood
- **Website**: https://www.collectivegood.io/

## Contact

For questions or collaboration inquiries, please open an issue or contact the project team.

---

**Status**: Ready for Development (Documentation & Planning Complete)
**Target Launch**: Q2 2026
