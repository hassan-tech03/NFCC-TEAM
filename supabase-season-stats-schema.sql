-- Season Statistics Schema

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
  is_fifty BOOLEAN DEFAULT FALSE,
  is_hundred BOOLEAN DEFAULT FALSE,
  not_out BOOLEAN DEFAULT FALSE,
  wickets INTEGER DEFAULT 0,
  catches INTEGER DEFAULT 0,
  runouts INTEGER DEFAULT 0,
  stumpings INTEGER DEFAULT 0,
  catches_dropped INTEGER DEFAULT 0,
  stumpings_missed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(season_id, player_id, match_number)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_player_season_stats_season ON player_season_stats(season_id);
CREATE INDEX IF NOT EXISTS idx_player_season_stats_player ON player_season_stats(player_id);
CREATE INDEX IF NOT EXISTS idx_player_season_stats_match ON player_season_stats(match_number);
CREATE INDEX IF NOT EXISTS idx_seasons_current ON seasons(is_current);

-- Insert current season (end_date is NULL since it's ongoing)
INSERT INTO seasons (name, start_date, end_date, is_current)
VALUES ('2025-26', '2025-01-01', NULL, true)
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_season_stats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view seasons" ON seasons;
DROP POLICY IF EXISTS "Only admins can manage seasons" ON seasons;
DROP POLICY IF EXISTS "Anyone can view player season stats" ON player_season_stats;
DROP POLICY IF EXISTS "Only admins can manage player season stats" ON player_season_stats;

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
