#!/bin/bash
# Seed database with initial schema and data

set -e

echo "🌱 Seeding GIL Platform database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    # Try to load from backend/.env
    if [ -f backend/.env ]; then
        export $(grep -v '^#' backend/.env | xargs)
    else
        echo "⚠️  DATABASE_URL not set. Please set it or create backend/.env"
        exit 1
    fi
fi

echo "📋 Running schema creation..."
psql $DATABASE_URL -f database/schema.sql

echo ""
echo "✅ Database seeded successfully!"
echo ""
echo "Next steps:"
echo "  1. Run Alembic migrations: cd backend && alembic upgrade head"
echo "  2. (Optional) Add seed data to database/seeds/"
