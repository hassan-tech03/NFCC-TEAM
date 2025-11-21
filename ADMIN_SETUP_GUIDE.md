# Admin Authentication Setup Guide

## How Admin Authentication Works

Your cricket team website now has a secure admin system:

1. **Supabase Auth** - Handles user authentication
2. **Admin Users Table** - Tracks who is an admin
3. **Row Level Security** - Only admins can add/edit/delete content
4. **Everyone else** - Can only view content

## Setup Steps (10 Minutes)

### Step 1: Enable Email Auth in Supabase (2 min)

1. Go to your Supabase project dashboard
2. Click **Authentication** → **Providers**
3. Make sure **Email** is enabled
4. Scroll down to **Email Templates** (optional customization)

### Step 2: Run the Auth Schema (2 min)

1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Copy the entire content from `supabase-auth-schema.sql`
4. **IMPORTANT**: Change this line:
   ```sql
   INSERT INTO admin_users (email)
   VALUES ('your-admin-email@example.com')
   ```
   Replace `your-admin-email@example.com` with YOUR actual email
5. Click **Run** or press Ctrl+Enter

### Step 3: Create Your Admin Account (3 min)

1. Go to **Authentication** → **Users** in Supabase
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: Same email you used in Step 2
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click **Create user**

### Step 4: Test Admin Login (2 min)

1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000/admin-login
3. Login with your email and password
4. Go to http://localhost:3000/players
5. You should see the **"Add Player"** button! 🎉

### Step 5: Add More Admins (Optional)

To add more admin users:

```sql
-- In Supabase SQL Editor
INSERT INTO admin_users (email)
VALUES ('another-admin@example.com');
```

Then create that user in Authentication → Users.

## How to Use

### As Admin:
1. Login at `/admin-login`
2. Go to `/players`
3. Click **"Add Player"** button
4. Fill in the form
5. Submit - Player is added!

### As Regular User:
- Can view all players
- Cannot see "Add Player" button
- Cannot add/edit/delete

## Features

### Beautiful Squad Page
- ✅ Modern gradient design
- ✅ Responsive grid layout
- ✅ Filter by role (Batsman, Bowler, etc.)
- ✅ Player cards with photos
- ✅ Jersey numbers
- ✅ Stats display
- ✅ Smooth animations

### Admin Features
- ✅ Add Player button (admin only)
- ✅ Beautiful modal form
- ✅ Edit/Delete options (admin only)
- ✅ Secure authentication
- ✅ Row-level security

## Security Features

### Row Level Security (RLS)
- ✅ Everyone can READ players
- ✅ Only admins can CREATE players
- ✅ Only admins can UPDATE players
- ✅ Only admins can DELETE players

### Authentication
- ✅ Secure password hashing
- ✅ JWT tokens
- ✅ Session management
- ✅ Email verification (optional)

## Troubleshooting

### "Add Player" button not showing
- Make sure you're logged in
- Check your email is in `admin_users` table
- Try logging out and back in

### Can't login
- Check email/password are correct
- Make sure user exists in Authentication → Users
- Make sure "Auto Confirm User" was checked

### Error adding player
- Check you're logged in as admin
- Check RLS policies are set up correctly
- Check browser console for errors

## Database Schema

### admin_users table
```sql
- id (UUID)
- user_id (UUID) - References auth.users
- email (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Row Level Security Policies
- `Anyone can view players` - SELECT for everyone
- `Only admins can insert players` - INSERT for admins only
- `Only admins can update players` - UPDATE for admins only
- `Only admins can delete players` - DELETE for admins only

## Next Steps

1. ✅ Set up authentication
2. ✅ Add your admin email
3. ✅ Create admin user
4. ✅ Test login
5. ✅ Add players
6. 📸 Upload player photos (coming next!)
7. 🎨 Customize design
8. 🚀 Deploy to production

## Production Deployment

When deploying:

1. **Add Environment Variables** in Vercel/Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Update CORS** in Supabase:
   - Add your production domain
   - Example: `https://your-site.vercel.app`

3. **Email Settings** (optional):
   - Configure custom email templates
   - Set up custom SMTP (optional)

## Support

Need help?
- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- Supabase RLS Docs: https://supabase.com/docs/guides/auth/row-level-security

Your cricket team website now has secure admin features! 🏏🔒
