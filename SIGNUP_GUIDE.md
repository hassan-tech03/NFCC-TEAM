# Sign Up & Admin Setup Guide

## Quick Start (5 Minutes)

### Step 1: Run the Auth Schema (2 min)

1. Go to your Supabase project
2. Click **SQL Editor** → **New Query**
3. Copy the entire content from `supabase-auth-schema.sql`
4. Click **Run** (Ctrl+Enter)

This will:
- ✅ Create admin_users table
- ✅ Set up Row Level Security
- ✅ Auto-make first user an admin!

### Step 2: Enable Email Auth (1 min)

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Scroll down to **Email Auth** settings:
   - ✅ Enable email confirmations: **OFF** (for easier testing)
   - Or keep it ON if you want email verification

### Step 3: Sign Up! (2 min)

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/admin-login

3. Click **"Sign Up"** tab

4. Enter:
   - Email: your-email@example.com
   - Password: (at least 6 characters)
   - Confirm Password: (same password)

5. Click **"Create Account"**

6. Success! You can now **Sign In**

### Step 4: Verify You're Admin (1 min)

1. Sign in with your credentials
2. Go to http://localhost:3000/players
3. You should see the **"Add Player"** button! 🎉

## How It Works

### First User = Auto Admin
The system automatically makes the **first person who signs up** an admin!

```sql
-- This trigger runs after signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_add_first_admin();
```

### Add More Admins Later

To add more admins, run this SQL in Supabase:

```sql
INSERT INTO admin_users (email)
VALUES ('another-admin@example.com');
```

Then that person can sign up with that email.

## Features

### Sign Up Page
- ✅ Beautiful tabbed interface (Sign In / Sign Up)
- ✅ Email validation
- ✅ Password confirmation
- ✅ Password strength check (min 6 chars)
- ✅ Success/error messages
- ✅ Auto-switch to Sign In after signup

### Security
- ✅ Passwords hashed by Supabase
- ✅ JWT tokens for sessions
- ✅ Row Level Security on database
- ✅ Only admins can add/edit/delete

## Troubleshooting

### "Email not confirmed"
**Solution**: Disable email confirmations in Supabase:
- Authentication → Providers → Email Auth
- Turn OFF "Enable email confirmations"

### "Add Player" button not showing
**Solution**: Check if you're in admin_users table:
```sql
-- In Supabase SQL Editor
SELECT * FROM admin_users;
```

If not there, add yourself:
```sql
INSERT INTO admin_users (email)
VALUES ('your-email@example.com');
```

### Can't sign up
**Solution**: 
1. Check Supabase is configured in `.env.local`
2. Check Email auth is enabled
3. Check browser console for errors

### Password too short
**Solution**: Use at least 6 characters

## Email Confirmation (Optional)

If you want email verification:

1. **Enable in Supabase**:
   - Authentication → Providers → Email Auth
   - ✅ Enable email confirmations

2. **Configure Email Template**:
   - Authentication → Email Templates
   - Customize "Confirm signup" template

3. **Set Site URL**:
   - Authentication → URL Configuration
   - Site URL: `http://localhost:3000`

4. **Users must click link in email** before they can sign in

## Production Setup

When deploying:

1. **Update Site URL** in Supabase:
   - `https://your-site.vercel.app`

2. **Enable Email Confirmations** (recommended)

3. **Configure Custom SMTP** (optional):
   - Use your own email service
   - Better deliverability

## Testing

### Test Flow:
1. Sign up with email/password
2. Check you're in admin_users table
3. Sign in
4. Go to /players
5. See "Add Player" button
6. Add a player
7. Success! 🎉

### Test Multiple Users:
1. Sign up user 1 (becomes admin)
2. Sign up user 2 (NOT admin)
3. User 1 can add players
4. User 2 cannot add players

## Summary

✅ **Sign Up**: http://localhost:3000/admin-login (Sign Up tab)
✅ **Sign In**: http://localhost:3000/admin-login (Sign In tab)
✅ **First user = Auto admin**
✅ **Add more admins via SQL**
✅ **Secure & easy!**

Your cricket team website now has user signup! 🏏🎉
