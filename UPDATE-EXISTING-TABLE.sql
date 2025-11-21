-- ============================================
-- UPDATE EXISTING player_season_stats TABLE
-- This adds the missing columns to your table
-- ============================================

-- Add balls_played column
ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS balls_played INTEGER DEFAULT 0;

-- Add overs_bowled column
ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS overs_bowled NUMERIC(4,1) DEFAULT 0;

-- Add runs_conceded column
ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS runs_conceded INTEGER DEFAULT 0;

-- Update any existing rows to have default values
UPDATE player_season_stats 
SET 
  balls_played = COALESCE(balls_played, 0),
  overs_bowled = COALESCE(overs_bowled, 0),
  runs_conceded = COALESCE(runs_conceded, 0)
WHERE balls_played IS NULL 
   OR overs_bowled IS NULL 
   OR runs_conceded IS NULL;

-- Verify the columns exist
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'player_season_stats'
  AND column_name IN ('balls_played', 'overs_bowled', 'runs_conceded')
ORDER BY column_name;

-- Show a sample row to confirm structureokay
SELECT * FROM player_season_stats LIMIT 1;
