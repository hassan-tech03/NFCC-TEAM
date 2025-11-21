-- Cricket Team Website Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Settings Table
CREATE TABLE settings (
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
CREATE TABLE players (
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
CREATE TABLE matches (
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
CREATE TABLE match_squad (
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  PRIMARY KEY (match_id, player_id)
);

-- Previous Matches Table (Results)
CREATE TABLE previous_matches (
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
CREATE TABLE top_performers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES previous_matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  performance TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Table
CREATE TABLE news (
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

-- Create indexes for better performance
CREATE INDEX idx_players_slug ON players(slug);
CREATE INDEX idx_players_role ON players(role);
CREATE INDEX idx_players_featured ON players(is_featured);
CREATE INDEX idx_matches_slug ON matches(slug);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_previous_matches_slug ON previous_matches(slug);
CREATE INDEX idx_previous_matches_date ON previous_matches(match_date);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_featured ON news(is_featured);
CREATE INDEX idx_news_published ON news(published_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_previous_matches_updated_at BEFORE UPDATE ON previous_matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings
INSERT INTO settings (team_name, tagline, description, contact_email)
VALUES (
  'Thunder Cricket Club',
  'Excellence in Cricket',
  'A passionate cricket team dedicated to excellence both on and off the field.',
  'info@thundercricket.com'
);

-- Insert sample players
INSERT INTO players (name, slug, role, batting_style, age, jersey_number, is_featured, stats) VALUES
('John Smith', 'john-smith', 'batsman', 'right-hand', 28, 10, true, '{"matches": 45, "runs": 2340, "wickets": 0, "average": 52.0, "strikeRate": 145.5, "highestScore": 156, "hundreds": 5, "fifties": 12}'),
('Mike Johnson', 'mike-johnson', 'bowler', 'right-hand', 26, 7, true, '{"matches": 42, "runs": 890, "wickets": 65, "average": 18.5, "strikeRate": 85.2, "highestScore": 45, "hundreds": 0, "fifties": 0, "economy": 6.8, "bestBowling": "5/23"}'),
('David Brown', 'david-brown', 'all-rounder', 'left-hand', 30, 8, true, '{"matches": 50, "runs": 1560, "wickets": 38, "average": 35.5, "strikeRate": 125.8, "highestScore": 98, "hundreds": 0, "fifties": 10, "economy": 7.2, "bestBowling": "4/35"}');

-- Insert sample upcoming match
INSERT INTO matches (title, slug, opponent, match_date, venue, match_type, description)
VALUES (
  'League Championship Match',
  'league-championship-match',
  'City Stars',
  NOW() + INTERVAL '7 days',
  'Central Cricket Ground',
  'T20',
  'Important league match against City Stars'
);

-- Insert sample previous matches
INSERT INTO previous_matches (title, slug, opponent, match_date, venue, match_type, result, our_score, opponent_score, summary, highlights)
VALUES
(
  'Quarter Final Victory',
  'quarter-final-victory',
  'Eagles CC',
  NOW() - INTERVAL '5 days',
  'Central Cricket Ground',
  'T20',
  'won',
  '185/7 (20 overs)',
  '178/9 (20 overs)',
  'Thunder Cricket Club secured a thrilling victory in the quarter finals with an outstanding team performance.',
  ARRAY['John Smith scored brilliant 78 runs', 'Mike Johnson took 3 crucial wickets', 'Won by 7 runs']
),
(
  'League Match Win',
  'league-match-win',
  'Warriors XI',
  NOW() - INTERVAL '12 days',
  'Warriors Ground',
  'T20',
  'won',
  '220/6 (20 overs)',
  '215/8 (20 overs)',
  'High-scoring thriller with excellent batting display.',
  ARRAY['Team posted 220 runs', 'David Brown scored 65 runs', 'Close finish with 5-run victory']
);

-- Insert sample news
INSERT INTO news (title, slug, excerpt, content, category, is_featured, published_at)
VALUES
(
  'Team Wins Championship Quarter Final',
  'championship-quarter-final',
  'Thunder Cricket Club secures a thrilling victory in the quarter finals with an outstanding team performance.',
  'Thunder Cricket Club has advanced to the semi-finals after a nail-biting victory against Eagles CC. The match saw exceptional performances from both bat and ball, with John Smith leading the charge with a brilliant 78 runs. Mike Johnson''s bowling spell of 3/28 proved crucial in restricting the opposition.',
  'match-report',
  true,
  NOW() - INTERVAL '3 days'
),
(
  'New Players Join the Squad',
  'new-players-announcement',
  'We are excited to welcome three talented players to our squad for the upcoming season.',
  'Thunder Cricket Club is pleased to announce the addition of three talented cricketers to our squad. These players bring a wealth of experience and will strengthen our team for the upcoming challenges.',
  'team-news',
  true,
  NOW() - INTERVAL '10 days'
),
(
  'Training Camp Schedule Announced',
  'training-camp-schedule',
  'Pre-season training camp dates have been finalized. All players are expected to attend.',
  'The management has announced the dates for the pre-season training camp. The camp will focus on fitness, team building, and tactical preparation for the upcoming season.',
  'announcement',
  true,
  NOW() - INTERVAL '15 days'
);
