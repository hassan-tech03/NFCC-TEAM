# Push Your Code to GitHub

## 🎯 Quick Commands

Run these commands in your terminal (in your project folder):

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit your code
git commit -m "Initial commit - New Friends Cricket Club website"

# 4. Add your GitHub repository as remote
git remote add origin https://github.com/hassan-tech03/NFCC-TEAM.git

# 5. Set main branch
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

## ⚠️ If You Get an Error

### Error: "remote origin already exists"
```bash
# Remove the old remote
git remote remove origin

# Add the new one
git remote add origin https://github.com/hassan-tech03/NFCC-TEAM.git

# Push
git push -u origin main
```

### Error: "Updates were rejected"
```bash
# Force push (only if you're sure)
git push -u origin main --force
```

### Error: "Authentication failed"
You need to authenticate with GitHub. Use one of these:

**Option 1: GitHub CLI (Recommended)**
```bash
gh auth login
```

**Option 2: Personal Access Token**
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select "repo" scope
4. Use token as password when pushing

**Option 3: SSH Key**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub
# Copy the public key
cat ~/.ssh/id_ed25519.pub

# Add it at https://github.com/settings/keys
```

## ✅ Verify It Worked

After pushing, go to:
https://github.com/hassan-tech03/NFCC-TEAM

You should see all your files there!

## 🚀 Next: Deploy to Vercel

Once your code is on GitHub, go to:
https://vercel.com/new

And import your repository!
