-- Add season field to previous_matches table
-- Run this in Supabase SQL Editor

-- Add season_id column to previous_matches table
ALTER TABLE previous_matches 
ADD COLUMN IF NOT EXISTS season_id UUID REFERENCES seasons(id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_previous_matches_season ON previous_matches(season_id);

-- Update existing matches to use current season (2025-26)
UPDATE previous_matches 
SET season_id = (SELECT id FROM seasons WHERE name = '2025-26' LIMIT 1)
WHERE season_id IS NULL;

-- Verify the update
SELECT 
  pm.title,
  pm.opponent,
  pm.match_date,
  s.name as season_name
FROM previous_matches pm
LEFT JOIN seasons s ON pm.season_id = s.id
ORDER BY pm.match_date DESC
LIMIT 10;
