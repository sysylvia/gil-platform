#!/bin/bash
# Setup script for GIL Platform

set -e

echo "🚀 Setting up GIL Platform..."

# Frontend setup
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created frontend/.env from .env.example"
fi
cd ..

# Backend setup
echo ""
echo "🐍 Setting up backend..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Created virtual environment"
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip install -r requirements-dev.txt
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend/.env from .env.example"
fi
cd ..

# Database setup
echo ""
echo "🗄️  Database setup..."
echo "Please ensure PostgreSQL is running and update backend/.env with correct DATABASE_URL"
echo "Then run: ./scripts/seed-database.sh"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update backend/.env and frontend/.env with your configuration"
echo "  2. Start PostgreSQL (or run: docker-compose up postgres)"
echo "  3. Run database migrations: cd backend && alembic upgrade head"
echo "  4. Start development servers: ./scripts/dev-setup.sh"
echo ""
echo "Or use Docker: docker-compose up"
