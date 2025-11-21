# Quick Supabase Setup (5 Minutes) ⚡

## ✅ What's Done

- Supabase client installed
- Database schema created
- Query functions ready
- Dummy data included (works without setup!)

## 🚀 Quick Start

### 1. Create Supabase Project (2 min)
- Go to https://supabase.com
- Sign up → New Project
- Wait for it to be created

### 2. Get Credentials (1 min)
- Settings → API
- Copy **Project URL** and **anon key**

### 3. Update .env.local (30 sec)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### 4. Create Tables (1 min)
- SQL Editor → New Query
- Copy/paste from `supabase-schema.sql`
- Run it

### 5. Test (30 sec)
```bash
npm run dev
```

Visit http://localhost:3000 - Done! 🎉

## 📊 What You Get

**Sample Data Included:**
- 3 Players (John Smith, Mike Johnson, David Brown)
- 1 Upcoming Match (vs City Stars)
- 2 Previous Matches (Won vs Eagles CC, Won vs Warriors XI)
- 3 News Articles

**Database Tables:**
- settings (team info)
- players (squad)
- matches (upcoming)
- previous_matches (results)
- news (articles)
- Storage buckets for images

## 📝 Adding Data

### Via Supabase Dashboard
1. Go to Table Editor
2. Select table
3. Click "Insert row"
4. Fill in data
5. Save

### Via SQL
```sql
-- Add a player
INSERT INTO players (name, slug, role, age, jersey_number)
VALUES ('New Player', 'new-player', 'batsman', 25, 12);
```

## 🎨 Upload Images

1. Storage → Create bucket (make it public)
2. Upload files
3. Copy public URL
4. Use URL in database

## 🔧 Files Created

- `src/lib/supabase.client.ts` - Supabase connection
- `src/lib/supabase.queries.ts` - All database queries
- `supabase-schema.sql` - Database schema + sample data
- `.env.local` - Environment variables

## 📚 Full Guide

See `SUPABASE_MIGRATION_GUIDE.md` for detailed instructions.

## ⚡ Your Site Works Now!

Even without Supabase setup, your site shows dummy data.
Once you set up Supabase, real data will replace it automatically!

Happy cricket! 🏏
