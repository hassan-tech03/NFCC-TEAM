# Supabase Migration Guide 🚀

## What I've Done

Your cricket team website is now using Supabase! Here's what's been set up:

### ✅ Completed

1. **Installed Supabase Client** (`@supabase/supabase-js`)
2. **Created Supabase Client** (`src/lib/supabase.client.ts`)
3. **Created Database Schema** (`supabase-schema.sql`)
4. **Created Query Functions** (`src/lib/supabase.queries.ts`)
5. **Updated Environment Variables** (`.env.local`)

### 📋 What You Need to Do (10 minutes)

## Step 1: Create Supabase Project (3 minutes)

1. Go to https://supabase.com
2. Sign up or login
3. Click "New Project"
4. Fill in:
   - **Name**: Cricket Team Website
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to you
5. Wait for project to be created (~2 minutes)

## Step 2: Get Your Credentials (1 minute)

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Update Environment Variables (1 minute)

Edit `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Create Database Tables (3 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" or press Ctrl+Enter
6. You should see "Success. No rows returned"

This will create:
- ✅ All tables (settings, players, matches, previous_matches, news)
- ✅ Sample data (3 players, 2 matches, 3 news articles)
- ✅ Indexes for performance
- ✅ Triggers for auto-updating timestamps

## Step 5: Set Up Storage (Optional - 2 minutes)

For uploading images:

1. Go to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. Create these buckets:
   - `team-logos` (public)
   - `player-photos` (public)
   - `match-logos` (public)
   - `news-images` (public)
4. Make them public by clicking bucket → Settings → Public bucket: ON

## Step 6: Test Your Setup (1 minute)

```bash
npm run dev
```

Visit http://localhost:3000

You should see:
- ✅ Home page with sample data
- ✅ 3 featured players
- ✅ Upcoming match
- ✅ Recent results
- ✅ Latest news

## Database Schema Overview

### Tables Created

**settings**
- team_name, tagline, description
- contact_email
- team_logo_url, hero_banner_url
- social_links (JSON)

**players**
- name, slug, photo_url
- role (batsman/bowler/all-rounder/wicket-keeper)
- batting_style, bowling_style
- age, jersey_number
- bio, stats (JSON)
- is_featured

**matches** (upcoming)
- title, slug
- opponent, opponent_logo_url
- match_date, venue, match_type
- description

**match_squad** (junction table)
- Links matches to players

**previous_matches** (results)
- All match fields
- result (won/lost/draw/tie)
- our_score, opponent_score
- man_of_match_id
- summary, highlights

**top_performers**
- Links previous matches to players
- performance description

**news**
- title, slug
- cover_image_url
- excerpt, content
- category, is_featured
- published_at

## Sample Data Included

### Players (3)
- John Smith (Batsman) - 45 matches, 2340 runs
- Mike Johnson (Bowler) - 42 matches, 65 wickets
- David Brown (All-rounder) - 50 matches, 1560 runs

### Matches (1 upcoming)
- League Championship Match vs City Stars (in 7 days)

### Previous Matches (2)
- Quarter Final Victory vs Eagles CC (Won)
- League Match Win vs Warriors XI (Won)

### News (3)
- Team Wins Championship Quarter Final
- New Players Join the Squad
- Training Camp Schedule Announced

## Adding More Data

### Add a Player

```sql
INSERT INTO players (name, slug, role, batting_style, age, jersey_number, stats)
VALUES (
  'Player Name',
  'player-name',
  'batsman',
  'right-hand',
  25,
  11,
  '{"matches": 30, "runs": 1200, "wickets": 0, "average": 40.0, "strikeRate": 130.5, "highestScore": 89, "hundreds": 0, "fifties": 8}'
);
```

### Add an Upcoming Match

```sql
INSERT INTO matches (title, slug, opponent, match_date, venue, match_type, description)
VALUES (
  'Semi Final Match',
  'semi-final-match',
  'Thunder Warriors',
  '2025-12-01 14:00:00+00',
  'Stadium Name',
  'T20',
  'Important semi-final match'
);
```

### Add a Match Result

```sql
INSERT INTO previous_matches (
  title, slug, opponent, match_date, venue, match_type,
  result, our_score, opponent_score, summary, highlights
)
VALUES (
  'Final Victory',
  'final-victory',
  'Champions XI',
  '2025-11-20 14:00:00+00',
  'Main Stadium',
  'T20',
  'won',
  '195/6 (20 overs)',
  '188/8 (20 overs)',
  'Thrilling final match with excellent team performance.',
  ARRAY['Won the championship', 'Player X scored 75 runs', 'Player Y took 4 wickets']
);
```

### Add News Article

```sql
INSERT INTO news (title, slug, excerpt, content, category, is_featured)
VALUES (
  'Championship Victory',
  'championship-victory',
  'Team wins the championship in a thrilling final.',
  'Full article content here...',
  'match-report',
  true
);
```

## Uploading Images

### Via Supabase Dashboard

1. Go to **Storage** → Select bucket
2. Click "Upload file"
3. Upload your image
4. Copy the public URL
5. Use that URL in your database

### Via Code (Future Enhancement)

```typescript
import { supabase } from '@/lib/supabase.client'

async function uploadImage(file: File, bucket: string) {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)
  
  if (error) throw error
  
  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl
}
```

## Querying Data

All queries are in `src/lib/supabase.queries.ts`:

- `getSettings()` - Get team settings
- `getPlayers()` - Get all players
- `getFeaturedPlayers()` - Get featured players
- `getPlayerBySlug(slug)` - Get single player
- `getUpcomingMatches()` - Get upcoming matches
- `getNextMatch()` - Get next match
- `getPreviousMatches()` - Get all results
- `getRecentMatches()` - Get recent 3 results
- `getNews()` - Get all news
- `getFeaturedNews()` - Get featured news
- `getStats()` - Get team statistics

## Advantages of Supabase

✅ **PostgreSQL Database** - Powerful relational database
✅ **Real-time Subscriptions** - Live data updates
✅ **Built-in Authentication** - User management (if needed later)
✅ **Storage** - File uploads and management
✅ **Row Level Security** - Fine-grained access control
✅ **Auto-generated APIs** - REST and GraphQL
✅ **Free Tier** - Generous free tier for small projects
✅ **Open Source** - Can self-host if needed

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Run the schema SQL
3. ✅ Update .env.local
4. ✅ Test the website
5. 📝 Add more players, matches, news
6. 📸 Upload team photos
7. 🎨 Customize team settings
8. 🚀 Deploy to production

## Troubleshooting

### "Failed to fetch"
- Check your Supabase URL and anon key in `.env.local`
- Make sure project is created and active

### "relation does not exist"
- You haven't run the schema SQL yet
- Go to SQL Editor and run `supabase-schema.sql`

### Images not showing
- Upload images to Supabase Storage
- Make buckets public
- Use the public URL in database

### No data showing
- Check if sample data was inserted
- Run queries in SQL Editor to verify

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- PostgreSQL Docs: https://www.postgresql.org/docs/

## Summary

✅ **Supabase is set up and ready!**
✅ **Database schema created**
✅ **Sample data included**
✅ **Query functions ready**
✅ **Dummy data fallback included**

Just add your Supabase credentials and you're good to go! 🎉🏏
