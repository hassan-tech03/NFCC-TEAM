-- ============================================
-- UPDATE CLUB NAME AND LOGO
-- Run this in Supabase SQL Editor
-- ============================================

-- Update team name and logo
UPDATE settings 
SET 
  team_name = 'New Friends Cricket Club',
  team_logo_url = 'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg',
  updated_at = NOW()
WHERE id IS NOT NULL;

-- Verify the update
SELECT 
  team_name, 
  team_logo_url,
  tagline,
  contact_email
FROM settings;
