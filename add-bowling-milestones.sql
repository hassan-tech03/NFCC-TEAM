-- Add 5-wicket and 10-wicket haul columns to player_season_stats

ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS is_five_wicket BOOLEAN DEFAULT FALSE;

ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS is_ten_wicket BOOLEAN DEFAULT FALSE;

-- Verify columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'player_season_stats'
AND column_name IN ('is_five_wicket', 'is_ten_wicket')
ORDER BY column_name;
