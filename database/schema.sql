-- GIL Platform Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    profession VARCHAR(100),
    specialty VARCHAR(100),
    years_experience INTEGER,
    country VARCHAR(100),
    institution VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competence profiles (multidimensional skill vectors)
CREATE TABLE competence_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    domain VARCHAR(100) NOT NULL,
    theta FLOAT DEFAULT 0.0,
    standard_error FLOAT DEFAULT 1.0,
    num_assessments INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, domain)
);

-- Clinical cases
CREATE TABLE clinical_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content JSONB NOT NULL,  -- Demographics, presentation, vitals, etc.
    parameters JSONB NOT NULL,  -- IRT parameters (difficulty, discrimination)
    domain VARCHAR(100),
    difficulty FLOAT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reference differentials (expert consensus)
CREATE TABLE reference_differentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES clinical_cases(id) ON DELETE CASCADE,
    diagnosis_code VARCHAR(50) NOT NULL,
    diagnosis_name VARCHAR(255) NOT NULL,
    rank INTEGER NOT NULL,  -- Expert consensus rank (1 = most likely)
    weight FLOAT DEFAULT 1.0,
    is_critical BOOLEAN DEFAULT FALSE,  -- "Not-to-miss" diagnosis
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(case_id, diagnosis_code)
);

-- Assessment responses
CREATE TABLE assessment_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    case_id UUID REFERENCES clinical_cases(id),
    differential JSONB NOT NULL,  -- User's differential diagnosis list
    bts_data JSONB,  -- Peer prediction data (own assessment + prediction)
    score FLOAT,
    bts_score FLOAT,
    theta_estimate FLOAT,
    is_correct BOOLEAN,
    time_spent INTEGER,  -- Seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community stats (for gamification)
CREATE TABLE community_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region VARCHAR(100) NOT NULL,  -- e.g., "Kibera", "Region A"
    total_assessments INTEGER DEFAULT 0,
    coverage_percentage FLOAT DEFAULT 0.0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(region)
);

-- User contributions (for individual tracking)
CREATE TABLE user_contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    region VARCHAR(100),
    contribution_count INTEGER DEFAULT 0,
    last_contribution TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, region)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_competence_profiles_user_id ON competence_profiles(user_id);
CREATE INDEX idx_competence_profiles_domain ON competence_profiles(domain);
CREATE INDEX idx_clinical_cases_domain ON clinical_cases(domain);
CREATE INDEX idx_clinical_cases_difficulty ON clinical_cases(difficulty);
CREATE INDEX idx_assessment_responses_user_id ON assessment_responses(user_id);
CREATE INDEX idx_assessment_responses_case_id ON assessment_responses(case_id);
CREATE INDEX idx_assessment_responses_created_at ON assessment_responses(created_at);
CREATE INDEX idx_community_stats_region ON community_stats(region);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
