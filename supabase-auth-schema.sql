-- Add this to your existing schema or run separately

-- Create admin_users table to track who is admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE email = user_email
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically add first user as admin
CREATE OR REPLACE FUNCTION auto_add_first_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is the first user, make them admin
  IF NOT EXISTS (SELECT 1 FROM admin_users) THEN
    INSERT INTO admin_users (user_id, email)
    VALUES (NEW.id, NEW.email);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run after user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_add_first_admin();

-- Optional: Manually add admin emails (if you want specific admins)
-- Uncomment and change the email below:
-- INSERT INTO admin_users (email)
-- VALUES ('your-admin-email@example.com')
-- ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security on players table
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read players
CREATE POLICY "Anyone can view players"
  ON players FOR SELECT
  USING (true);

-- Policy: Only admins can insert players
CREATE POLICY "Only admins can insert players"
  ON players FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Policy: Only admins can update players
CREATE POLICY "Only admins can update players"
  ON players FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Policy: Only admins can delete players
CREATE POLICY "Only admins can delete players"
  ON players FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Apply same policies to other tables
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE previous_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Matches policies
CREATE POLICY "Anyone can view matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Only admins can manage matches" ON matches FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Previous matches policies
CREATE POLICY "Anyone can view previous matches" ON previous_matches FOR SELECT USING (true);
CREATE POLICY "Only admins can manage previous matches" ON previous_matches FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- News policies
CREATE POLICY "Anyone can view news" ON news FOR SELECT USING (true);
CREATE POLICY "Only admins can manage news" ON news FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Settings policies
CREATE POLICY "Anyone can view settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Only admins can manage settings" ON settings FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
);
