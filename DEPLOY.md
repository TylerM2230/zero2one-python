# Quick Deployment Guide

## Test Locally First

```bash
cd python-zero2one
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## Deploy to GitHub Pages (Recommended)

**Fastest way to get online for free:**

```bash
# 1. Create repo on GitHub (name it: python-zero2one)

# 2. In your terminal:
cd python-zero2one
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/python-zero2one.git
git push -u origin main

# 3. Enable GitHub Pages:
# Go to: Settings → Pages → Source: main branch → Save

# Done! Site live at: https://YOUR_USERNAME.github.io/python-zero2one/
```

## Deploy to Netlify (Easiest - No Command Line)

1. Visit [netlify.com](https://www.netlify.com/)
2. Sign up (free)
3. Drag the `python-zero2one` folder onto the Netlify dashboard
4. Done! You get a live URL instantly

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd python-zero2one
vercel

# Follow prompts - done in 30 seconds!
```

## Other Options

### Cloudflare Pages
1. Connect GitHub repo to Cloudflare Pages
2. Auto-deploys on push
3. Fast global CDN

### Surge.sh
```bash
npm install -g surge
cd python-zero2one
surge
```

### GitHub Codespaces
Already deployed! If viewing in Codespaces, use the "Ports" tab to expose port 8000.

---

**Recommendation**: Use GitHub Pages - it's free, reliable, and integrates with git workflow.
