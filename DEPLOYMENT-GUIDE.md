# 🚀 Deploy Your Cricket Website for FREE

## ✅ What You'll Get (100% Free):

- **Frontend:** Vercel (Free tier - perfect for this)
- **Database:** Supabase (Free tier - 500MB database, 2GB bandwidth)
- **Custom Domain:** Optional (you can add later)
- **SSL Certificate:** Automatic and free
- **Unlimited Deployments:** Every git push auto-deploys

---

## 📋 Prerequisites

1. ✅ GitHub account (free)
2. ✅ Vercel account (free - sign up with GitHub)
3. ✅ Supabase account (you already have this)

---

## 🎯 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

#### 1.1 Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `cricket-team-website` (or any name)
3. Make it **Public** or **Private** (your choice)
4. **Don't** initialize with README (you already have code)
5. Click **"Create repository"**

#### 1.2 Push Your Code

Open terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Cricket team website"

# Add GitHub remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy to Vercel

#### 2.1 Sign Up for Vercel

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

#### 2.2 Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your `cricket-team-website` repository
3. Click **"Import"**

#### 2.3 Configure Project

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `./` (leave as is)

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `.next` (auto-filled)

#### 2.4 Add Environment Variables

Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fkfcqevytnbzoxabliur.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrZmNxZXZ5dG5iem94YWJsaXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MDQ1ODEsImV4cCI6MjA3OTI4MDU4MX0.l07-hjJ3tZUFtpwmL9A26x1yn3VHyjl9hm8PAmiphpE` |

*(Copy these from your `.env.local` file)*

#### 2.5 Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://cricket-team-website.vercel.app`

---

### Step 3: Update Supabase Settings (Important!)

#### 3.1 Add Vercel URL to Supabase

1. Go to Supabase Dashboard
2. Click your project
3. Go to **Settings** → **API**
4. Scroll to **"Site URL"**
5. Add your Vercel URL: `https://your-project.vercel.app`

#### 3.2 Add to Redirect URLs

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Add to **Redirect URLs:**
   - `https://your-project.vercel.app/**`
   - `https://your-project.vercel.app/admin-login`

---

## 🎉 You're Live!

Your website is now live at: `https://your-project.vercel.app`

### What Works:
- ✅ All pages (Home, Players, Matches, Results, Stats)
- ✅ Admin login and authentication
- ✅ Database operations (add/edit/delete)
- ✅ Season statistics tracking
- ✅ Automatic SSL (HTTPS)
- ✅ Fast global CDN

---

## 🔄 How to Update Your Website

Every time you make changes:

```bash
# Make your changes in code
# Then:
git add .
git commit -m "Updated player stats"
git push

# Vercel automatically deploys! (takes 1-2 minutes)
```

---

## 💰 Cost Breakdown

| Service | Free Tier Limits | Cost |
|---------|------------------|------|
| **Vercel** | 100GB bandwidth/month, Unlimited sites | **$0** |
| **Supabase** | 500MB database, 2GB bandwidth, 50,000 monthly active users | **$0** |
| **Total** | More than enough for a cricket team website | **$0** |

---

## 🌐 Add Custom Domain (Optional)

### If you have a domain (like nfcc.com):

1. In Vercel Dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your domain
4. Follow DNS instructions
5. Done! Your site will be at `https://nfcc.com`

### Don't have a domain?

- Use the free Vercel URL: `https://your-project.vercel.app`
- Or buy a domain later ($10-15/year from Namecheap, GoDaddy, etc.)

---

## 🐛 Troubleshooting

### Build Failed?

Check the build logs in Vercel. Common issues:
- Missing environment variables
- TypeScript errors (run `npm run build` locally first)

### Can't Login?

- Make sure you added Vercel URL to Supabase redirect URLs
- Check that environment variables are set correctly

### Database Not Working?

- Verify Supabase credentials in Vercel environment variables
- Check Supabase dashboard for any errors

---

## 📊 Monitor Your Site

### Vercel Dashboard:
- View deployment history
- Check analytics (page views, performance)
- See build logs

### Supabase Dashboard:
- Monitor database usage
- Check API requests
- View authentication logs

---

## 🎯 Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Add your team's players and matches
3. ✅ Share the URL with your team
4. ✅ Set up custom domain (optional)
5. ✅ Add more admins if needed

---

## 🆘 Need Help?

If deployment fails, check:
1. Build logs in Vercel
2. Environment variables are correct
3. Supabase is accessible
4. No TypeScript errors locally

---

**Your website will be live in under 10 minutes!** 🚀

Free forever, fast, and professional. Perfect for your cricket team! 🏏
