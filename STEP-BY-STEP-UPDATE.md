# Step-by-Step: Update Club Name and Logo

## 🎯 You Must Update the Database First!

The app pulls the name and logo from your Supabase database. You need to update it there.

### Step 1: Open Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Click on your cricket team project
3. Click **"SQL Editor"** in the left sidebar (looks like a document icon)

### Step 2: Create New Query

1. Click the **"New query"** button (top right)
2. You'll see an empty SQL editor

### Step 3: Copy and Paste This SQL

```sql
-- Update team name and logo
UPDATE settings 
SET 
  team_name = 'New Friends Cricket Club',
  team_logo_url = 'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg',
  updated_at = NOW();

-- Verify the update worked
SELECT team_name, team_logo_url FROM settings;
```

### Step 4: Run the Query

1. Click the **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
2. You should see:
   - "Success" message
   - A result showing: `New Friends Cricket Club` and the logo URL

### Step 5: Verify in Table Editor

1. Click **"Table Editor"** in the left sidebar
2. Click on the **"settings"** table
3. You should see:
   - **team_name:** New Friends Cricket Club
   - **team_logo_url:** https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg

### Step 6: Refresh Your Website

1. Go back to your website
2. **Hard refresh:** 
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R
3. The name and logo should now be updated!

---

## ❓ Still Not Working?

### Check 1: Is the settings table empty?

Run this in SQL Editor:
```sql
SELECT * FROM settings;
```

If it returns no rows, run this:
```sql
INSERT INTO settings (team_name, tagline, description, contact_email, team_logo_url)
VALUES (
  'New Friends Cricket Club',
  'Excellence in Cricket',
  'A passionate cricket team dedicated to excellence both on and off the field.',
  'info@nfcc.com',
  'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg'
);
```

### Check 2: Is your dev server running?

If you're running `npm run dev`, restart it:
1. Stop the server (Ctrl+C)
2. Start it again: `npm run dev`
3. Refresh the browser

### Check 3: Clear browser cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

---

## 📸 What You Should See After Update

- **Header:** Your logo image (circular) + "New Friends Cricket Club"
- **Footer:** "New Friends Cricket Club" 
- **Browser Tab:** "New Friends Cricket Club - Official Website"
- **Home Page:** "New Friends Cricket Club" in the hero section
