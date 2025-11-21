# 🚀 Start Here - Sign Up & Add Players!

## Quick Setup (5 Minutes)

### 1. Run SQL (2 min)
```
Supabase → SQL Editor → New Query
Copy: supabase-auth-schema.sql
Run it!
```

### 2. Enable Email Auth (1 min)
```
Supabase → Authentication → Providers
✅ Enable Email
```

### 3. Sign Up! (2 min)
```bash
npm run dev
```

Go to: http://localhost:3000/admin-login
- Click **"Sign Up"** tab
- Enter email & password
- Create account!

### 4. Test (1 min)
- Sign in with your credentials
- Go to: http://localhost:3000/players
- See **"Add Player"** button! 🎉

## What You Got

### Beautiful Sign Up/Sign In Page
- ✅ Tabbed interface (Sign In / Sign Up)
- ✅ Email & password validation
- ✅ Password confirmation
- ✅ Success/error messages
- ✅ Modern gradient design

### Auto Admin
- ✅ **First user who signs up = Admin automatically!**
- ✅ No manual SQL needed for first user
- ✅ Add more admins later via SQL

### Squad Management
- ✅ Beautiful responsive squad page
- ✅ Filter by role
- ✅ Add Player button (admin only)
- ✅ Modal form with all fields
- ✅ Edit/Delete options

## URLs

- **Sign Up/Login**: http://localhost:3000/admin-login
- **Squad Page**: http://localhost:3000/players
- **Home**: http://localhost:3000

## How It Works

```
1. You sign up → Account created
2. System checks: "Is this the first user?"
3. If YES → Auto-added to admin_users table
4. You sign in → System checks admin_users
5. You're admin → See "Add Player" button!
```

## Add More Admins

Run this SQL in Supabase:
```sql
INSERT INTO admin_users (email)
VALUES ('another-admin@example.com');
```

## Features

### For Admins:
- ✅ Add players via beautiful form
- ✅ Edit player details
- ✅ Delete players
- ✅ Upload photos (coming soon)

### For Everyone:
- ✅ View all players
- ✅ Filter by role
- ✅ See stats
- ✅ Responsive design

## Files

- `src/app/admin-login/page.tsx` - Sign up/login page
- `src/app/players/page.tsx` - Squad management
- `src/lib/supabase.auth.ts` - Auth functions
- `supabase-auth-schema.sql` - Database setup
- `SIGNUP_GUIDE.md` - Detailed guide

## Troubleshooting

**"Add Player" not showing?**
- Make sure you signed up (not just created user in Supabase)
- Check admin_users table has your email
- Try logging out and back in

**Can't sign up?**
- Check Supabase URL/Key in .env.local
- Check Email auth is enabled
- Check browser console for errors

**Email confirmation required?**
- Disable it: Authentication → Providers → Email Auth
- Turn OFF "Enable email confirmations"

## Next Steps

1. ✅ Sign up
2. ✅ Add players
3. 📸 Upload player photos
4. 📊 Edit player stats
5. 🎨 Customize design
6. 🚀 Deploy!

Your cricket team website is ready! 🏏✨

**Start by going to:** http://localhost:3000/admin-login
