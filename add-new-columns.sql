-- ============================================
-- ADD NEW COLUMNS TO EXISTING TABLE
-- Run this if you already have player_season_stats table
-- ============================================

-- Add new columns to player_season_stats table
ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS balls_played INTEGER DEFAULT 0;

ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS overs_bowled NUMERIC(4,1) DEFAULT 0;

ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS runs_conceded INTEGER DEFAULT 0;

-- Verify columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'player_season_stats'
ORDER BY ordinal_position;
