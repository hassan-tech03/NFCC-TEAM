-- Fix settings table by ensuring default settings exist
-- Run this in your Supabase SQL Editor

-- First, check if settings table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM settings LIMIT 1) THEN
    -- Insert default settings if table is empty
    INSERT INTO settings (team_name, tagline, description, contact_email, team_logo_url)
    VALUES (
      'New Friends Cricket Club',
      'Excellence in Cricket',
      'A passionate cricket team dedicated to excellence both on and off the field.',
      'info@nfcc.com',
      'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg'
    );
    RAISE NOTICE 'Default settings inserted successfully';
  ELSE
    RAISE NOTICE 'Settings already exist';
  END IF;
END $$;

-- Verify settings
SELECT * FROM settings;
