# Fix Vercel Login Issue

## 🔧 Problem: Can't Sign In on Vercel

Your app is deployed but authentication doesn't work because Supabase doesn't recognize your Vercel URL.

## ✅ Solution: Add Vercel URL to Supabase

### Step 1: Go to Supabase Dashboard

1. Open https://supabase.com/dashboard
2. Select your project (fkfcqevytnbzoxabliur)
3. Click **Authentication** in the left sidebar
4. Click **URL Configuration**

### Step 2: Add Your Vercel URLs

Add these URLs to the **Redirect URLs** section:

```
https://nfcc-team-4eidhzxv8-hassan-tech03s-projects.vercel.app/**
https://nfcc-team-4eidhzxv8-hassan-tech03s-projects.vercel.app/admin-login
https://nfcc-team.vercel.app/**
https://nfcc-team.vercel.app/admin-login
```

*(Add both the preview URL and the production URL)*

### Step 3: Update Site URL

In the same **URL Configuration** page:

1. Find **Site URL** field
2. Set it to: `https://nfcc-team-4eidhzxv8-hassan-tech03s-projects.vercel.app`

### Step 4: Save Changes

Click **Save** at the bottom of the page.

### Step 5: Test Login

1. Go to your Vercel app
2. Go to `/admin-login`
3. Try signing in with: `hassan.shahid031998@gmail.com`
4. It should work now! ✅

---

## 🎯 Get Your Production URL

Your current URL is a preview URL. To get a cleaner production URL:

### In Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Domains**
4. You'll see your production domain (usually `nfcc-team.vercel.app`)
5. Add that to Supabase too!

---

## 🔍 Verify Environment Variables

Make sure these are set in Vercel:

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Environment Variables**
3. Verify these exist:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fkfcqevytnbzoxabliur.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

If missing, add them and **redeploy**.

---

## 🐛 Still Not Working?

### Check Browser Console:

1. Open your Vercel app
2. Press F12 (DevTools)
3. Go to Console tab
4. Try to login
5. Look for error messages

Common errors:
- **"Invalid redirect URL"** → Add URL to Supabase
- **"Invalid API key"** → Check environment variables in Vercel
- **"Network error"** → Check Supabase is accessible

---

## ✅ After Fixing:

Once you add the URLs to Supabase:
- ✅ Login will work
- ✅ Admin features will work
- ✅ All database operations will work

**No need to redeploy** - just update Supabase settings!
