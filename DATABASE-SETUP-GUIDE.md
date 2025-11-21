# Complete Database Setup Guide

## 🎯 Quick Setup (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your cricket team project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"** button

### Step 2: Run the Complete Schema

1. Open the file: **`supabase-complete-schema.sql`**
2. **Copy EVERYTHING** from that file (Ctrl+A, Ctrl+C)
3. **Paste** into the Supabase SQL Editor
4. Click **"Run"** button (or press Ctrl/Cmd + Enter)
5. Wait for it to complete (should take 2-3 seconds)

### Step 3: Verify Success

After running, you should see at the bottom:
- ✅ "Success. No rows returned" or
- ✅ Results showing your admin email and current season

You should also see output like:
```
Admin user configured: hassan.shahid031998@gmail.com
Current season: 2025-26 (Ongoing)
Data Summary: X players, X matches, X results, 1 season
```

### Step 4: Check Tables Created

1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ `players`
   - ✅ `matches`
   - ✅ `previous_matches`
   - ✅ `seasons` ← NEW
   - ✅ `player_season_stats` ← NEW
   - ✅ `admin_users`
   - ✅ `settings`
   - ✅ `news`

### Step 5: Test the Season Stats Page

1. Go to your website: `/season-stats`
2. You should see:
   - Season dropdown with "2025-26 (Current)"
   - Player dropdown with all your players
3. Click **"Manage Seasons"** to add more seasons

---

## 📊 What This Schema Does

### Preserves All Your Existing Data
- ✅ All players remain intact
- ✅ All matches remain intact
- ✅ All results remain intact
- ✅ All admin users remain intact

### Adds New Season Tracking
- ✅ Create multiple seasons (2024-25, 2025-26, 2026-27, etc.)
- ✅ Mark one season as "current"
- ✅ Track detailed player stats per match per season
- ✅ Keep historical records of all previous seasons

### Season Stats Features
Each player can have stats tracked for:
- Match number (1, 2, 3... up to 25+)
- Date and opponent
- Runs scored
- 50s and 100s (auto-calculated)
- Not outs
- Wickets taken
- Catches, run-outs, stumpings
- Catches dropped, stumpings missed

---

## 🔐 Security

All tables have Row Level Security (RLS) enabled:
- **Everyone** can VIEW all data
- **Only admins** can ADD/EDIT/DELETE data
- Admin is: `hassan.shahid031998@gmail.com`

---

## 🎮 How to Use After Setup

### Add a New Season
1. Go to `/season-stats`
2. Click "Manage Seasons"
3. Click "Add New Season"
4. Enter name (e.g., "2026-27")
5. Set start date
6. Check "Set as current season" if it's ongoing
7. Click "Add Season"

### Track Player Stats
1. Select a season from dropdown
2. Select a player from dropdown
3. Click "Add Match" to add a new match record
4. Click any cell to edit the stats
5. Stats auto-save when you click away

### View Historical Data
- Switch between seasons to see past performance
- Compare player stats across different seasons
- View totals at the bottom of the table

---

## ❓ Troubleshooting

### "relation does not exist" error
- You haven't run the schema yet
- Run `supabase-complete-schema.sql` in SQL Editor

### "permission denied" error
- You're not logged in as admin
- Make sure your email is in the schema (line 337)
- Change it to your email if needed

### Season dropdown is empty
- Refresh the page
- Check if seasons table has data:
  ```sql
  SELECT * FROM seasons;
  ```

### Can't add season
- Check browser console (F12) for errors
- Make sure you're logged in as admin
- Verify the schema ran successfully

---

## 🎉 You're All Set!

Once the schema is running:
1. ✅ All your existing data is safe
2. ✅ Season stats page is ready to use
3. ✅ You can track unlimited seasons
4. ✅ Historical data is preserved forever

Start tracking your 2025-26 season stats now! 🏏
