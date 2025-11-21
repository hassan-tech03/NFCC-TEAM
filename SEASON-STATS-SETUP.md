# Season Statistics Setup Guide

## Step 1: Run the Database Schema

You need to run the SQL schema in your Supabase database to create the necessary tables.

### How to run the schema:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and Paste the Schema**
   - Open the file: `supabase-season-stats-schema.sql`
   - Copy ALL the contents
   - Paste into the SQL Editor

4. **Run the Query**
   - Click "Run" button (or press Ctrl/Cmd + Enter)
   - You should see "Success. No rows returned"

## Step 2: Verify Tables Created

After running the schema, verify the tables exist:

1. Go to "Table Editor" in Supabase
2. You should see two new tables:
   - `seasons`
   - `player_season_stats`

## Step 3: Check Default Season

The schema automatically creates a default season "2025-26". To verify:

1. In Table Editor, click on `seasons` table
2. You should see one row with:
   - name: "2025-26"
   - is_current: true
   - start_date: 2025-01-01
   - end_date: null (because it's ongoing)

## Troubleshooting

### Error: "relation 'seasons' does not exist"
- You haven't run the schema yet
- Run the SQL from `supabase-season-stats-schema.sql`

### Error: "permission denied"
- Make sure you're logged in as admin
- Check that your email is in the `admin_users` table

### Can't add season
- Check browser console (F12) for error messages
- The page will now show an alert with the error
- Make sure the schema was run successfully

### Season not appearing in dropdown
- Refresh the page after adding a season
- Check if the season was actually created in the database

## Features

Once set up, you can:
- ✅ Add/manage multiple seasons
- ✅ Mark one season as "current"
- ✅ Track player stats for each match
- ✅ View totals and summaries
- ✅ Edit stats inline (click any cell)
- ✅ Export data (coming soon)
