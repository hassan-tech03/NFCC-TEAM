# Cricket Team Website - Setup Guide

## ✅ What You Have

A complete cricket team website with:
- Home, About, Contact pages (working with dummy data)
- Players, Matches, News pages (placeholders)
- Supabase integration ready
- Clean codebase

## 🚀 Quick Start (2 Options)

### Option 1: Run with Dummy Data (Immediate)

```bash
npm run dev
```

Visit http://localhost:3000 - Site works immediately!

### Option 2: Set Up Supabase (5 Minutes)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Sign up → New Project
   - Wait for creation (~2 min)

2. **Get Credentials**
   - Settings → API
   - Copy Project URL and anon key

3. **Update Environment**
   ```bash
   # Edit .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

4. **Create Database**
   - SQL Editor → New Query
   - Copy/paste from `supabase-schema.sql`
   - Run it

5. **Test**
   ```bash
   npm run dev
   ```

## 📦 What's Included

### Sample Data (in schema)
- 3 Players (John Smith, Mike Johnson, David Brown)
- 1 Upcoming Match (vs City Stars)
- 2 Previous Matches (Won vs Eagles CC, Won vs Warriors XI)
- 3 News Articles

### Database Tables
- `settings` - Team info
- `players` - Squad members
- `matches` - Upcoming games
- `previous_matches` - Results
- `news` - Articles

## 📝 Adding Content

### Via Supabase Dashboard
1. Table Editor → Select table
2. Insert row → Fill data → Save

### Via SQL
```sql
INSERT INTO players (name, slug, role, age)
VALUES ('New Player', 'new-player', 'batsman', 25);
```

## 🎨 Customization

### Team Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: { 600: '#your-color' }
}
```

### Team Name
Will auto-update from database once Supabase is set up.

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

## 📚 Files

- `src/lib/supabase.client.ts` - Database connection
- `src/lib/supabase.queries.ts` - All queries
- `supabase-schema.sql` - Complete schema
- `SUPABASE_SETUP_QUICK.md` - Detailed guide
- `SUPABASE_MIGRATION_GUIDE.md` - Full documentation

## ✅ Status

- ✅ Supabase integrated
- ✅ Dummy data working
- ✅ Build successful
- ✅ No errors
- ✅ Ready to deploy

## 🆘 Need Help?

Check:
1. `SUPABASE_SETUP_QUICK.md` - Quick setup
2. `SUPABASE_MIGRATION_GUIDE.md` - Detailed guide
3. `README.md` - Project overview

Your cricket team website is ready! 🏏
