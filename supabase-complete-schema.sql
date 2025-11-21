-- ============================================
-- COMPLETE CRICKET TEAM DATABASE SCHEMA
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_name VARCHAR(255) NOT NULL,
  tagline TEXT,
  description TEXT,
  contact_email VARCHAR(255),
  team_logo_url TEXT,
  hero_banner_url TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Players Table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  photo_url TEXT,
  role VARCHAR(50) NOT NULL CHECK (role IN ('batsman', 'bowler', 'all-rounder', 'wicket-keeper')),
  batting_style VARCHAR(50) CHECK (batting_style IN ('right-hand', 'left-hand')),
  bowling_style VARCHAR(50),
  age INTEGER,
  jersey_number INTEGER,
  bio TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches Table (Upcoming)
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  opponent VARCHAR(255) NOT NULL,
  opponent_logo_url TEXT,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue VARCHAR(255) NOT NULL,
  match_type VARCHAR(50) NOT NULL CHECK (match_type IN ('T20', 'ODI', 'Test')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match Squad Junction Table
CREATE TABLE IF NOT EXISTS match_squad (
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  PRIMARY KEY (match_id, player_id)
);

-- Previous Matches Table (Results)
CREATE TABLE IF NOT EXISTS previous_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  opponent VARCHAR(255) NOT NULL,
  opponent_logo_url TEXT,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue VARCHAR(255) NOT NULL,
  match_type VARCHAR(50) NOT NULL CHECK (match_type IN ('T20', 'ODI', 'Test')),
  result VARCHAR(50) NOT NULL CHECK (result IN ('won', 'lost', 'draw', 'tie')),
  our_score VARCHAR(100) NOT NULL,
  opponent_score VARCHAR(100) NOT NULL,
  man_of_match_id UUID REFERENCES players(id),
  summary TEXT,
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Top Performers Table
CREATE TABLE IF NOT EXISTS top_performers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES previous_matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  performance TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  cover_image_url TEXT,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) CHECK (category IN ('match-report', 'team-news', 'player-spotlight', 'announcement')),
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SEASON STATISTICS TABLES (NEW)
-- ============================================

-- Seasons Table
CREATE TABLE IF NOT EXISTS seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player Season Statistics Table
CREATE TABLE IF NOT EXISTS player_season_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  match_number INTEGER NOT NULL,
  match_date DATE,
  opponent VARCHAR(255),
  runs INTEGER DEFAULT 0,
  balls_played INTEGER DEFAULT 0,
  is_fifty BOOLEAN DEFAULT FALSE,
  is_hundred BOOLEAN DEFAULT FALSE,
  not_out BOOLEAN DEFAULT FALSE,
  wickets INTEGER DEFAULT 0,
  overs_bowled NUMERIC(4,1) DEFAULT 0,
  runs_conceded INTEGER DEFAULT 0,
  catches INTEGER DEFAULT 0,
  runouts INTEGER DEFAULT 0,
  stumpings INTEGER DEFAULT 0,
  catches_dropped INTEGER DEFAULT 0,
  stumpings_missed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(season_id, player_id, match_number)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Players indexes
CREATE INDEX IF NOT EXISTS idx_players_slug ON players(slug);
CREATE INDEX IF NOT EXISTS idx_players_role ON players(role);
CREATE INDEX IF NOT EXISTS idx_players_featured ON players(is_featured);

-- Matches indexes
CREATE INDEX IF NOT EXISTS idx_matches_slug ON matches(slug);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(match_date);

-- Previous matches indexes
CREATE INDEX IF NOT EXISTS idx_previous_matches_slug ON previous_matches(slug);
CREATE INDEX IF NOT EXISTS idx_previous_matches_date ON previous_matches(match_date);

-- News indexes
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(is_featured);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at);

-- Admin users indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Season stats indexes
CREATE INDEX IF NOT EXISTS idx_player_season_stats_season ON player_season_stats(season_id);
CREATE INDEX IF NOT EXISTS idx_player_season_stats_player ON player_season_stats(player_id);
CREATE INDEX IF NOT EXISTS idx_player_season_stats_match ON player_season_stats(match_number);
CREATE INDEX IF NOT EXISTS idx_seasons_current ON seasons(is_current);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE previous_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_season_stats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view players" ON players;
DROP POLICY IF EXISTS "Only admins can insert players" ON players;
DROP POLICY IF EXISTS "Only admins can update players" ON players;
DROP POLICY IF EXISTS "Only admins can delete players" ON players;
DROP POLICY IF EXISTS "Anyone can view matches" ON matches;
DROP POLICY IF EXISTS "Only admins can manage matches" ON matches;
DROP POLICY IF EXISTS "Anyone can view previous matches" ON previous_matches;
DROP POLICY IF EXISTS "Only admins can manage previous matches" ON previous_matches;
DROP POLICY IF EXISTS "Anyone can view news" ON news;
DROP POLICY IF EXISTS "Only admins can manage news" ON news;
DROP POLICY IF EXISTS "Anyone can view settings" ON settings;
DROP POLICY IF EXISTS "Only admins can manage settings" ON settings;
DROP POLICY IF EXISTS "Anyone can view seasons" ON seasons;
DROP POLICY IF EXISTS "Only admins can manage seasons" ON seasons;
DROP POLICY IF EXISTS "Anyone can view player season stats" ON player_season_stats;
DROP POLICY IF EXISTS "Only admins can manage player season stats" ON player_season_stats;

-- Players policies
CREATE POLICY "Anyone can view players" ON players 
FOR SELECT USING (true);

CREATE POLICY "Only admins can insert players" ON players 
FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Only admins can update players" ON players 
FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Only admins can delete players" ON players 
FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Matches policies
CREATE POLICY "Anyone can view matches" ON matches 
FOR SELECT USING (true);

CREATE POLICY "Only admins can manage matches" ON matches 
FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Previous matches policies
CREATE POLICY "Anyone can view previous matches" ON previous_matches 
FOR SELECT USING (true);

CREATE POLICY "Only admins can manage previous matches" ON previous_matches 
FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- News policies
CREATE POLICY "Anyone can view news" ON news 
FOR SELECT USING (true);

CREATE POLICY "Only admins can manage news" ON news 
FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Settings policies
CREATE POLICY "Anyone can view settings" ON settings 
FOR SELECT USING (true);

CREATE POLICY "Only admins can manage settings" ON settings 
FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Seasons policies
CREATE POLICY "Anyone can view seasons" ON seasons 
FOR SELECT USING (true);

CREATE POLICY "Only admins can manage seasons" ON seasons 
FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Player season stats policies
CREATE POLICY "Anyone can view player season stats" ON player_season_stats 
FOR SELECT USING (true);

CREATE POLICY "Only admins can manage player season stats" ON player_season_stats 
FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- ============================================
-- DEFAULT DATA
-- ============================================

-- Insert default settings (if not exists)
INSERT INTO settings (team_name, tagline, description, contact_email, team_logo_url)
VALUES (
  'New Friends Cricket Club',
  'Excellence in Cricket',
  'A passionate cricket team dedicated to excellence both on and off the field.',
  'info@nfcc.com',
  'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg'
)
ON CONFLICT DO NOTHING;

-- Add your admin email (CHANGE THIS TO YOUR EMAIL)
INSERT INTO admin_users (email)
VALUES ('hassan.shahid031998@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Insert current season (2025-26) - end_date is NULL since it's ongoing
INSERT INTO seasons (name, start_date, end_date, is_current)
VALUES ('2025-26', '2025-01-01', NULL, true)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if admin is set up
SELECT 'Admin user configured:' as status, email FROM admin_users;

-- Check if current season exists
SELECT 'Current season:' as status, name, start_date, 
       CASE WHEN end_date IS NULL THEN 'Ongoing' ELSE end_date::text END as end_date
FROM seasons WHERE is_current = true;

-- Count existing data
SELECT 
  'Data Summary' as info,
  (SELECT COUNT(*) FROM players) as total_players,
  (SELECT COUNT(*) FROM matches) as upcoming_matches,
  (SELECT COUNT(*) FROM previous_matches) as match_results,
  (SELECT COUNT(*) FROM seasons) as total_seasons;
