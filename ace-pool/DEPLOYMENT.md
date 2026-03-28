# Ace Pool — Deployment Guide
**Stack: Next.js · Tailwind · Framer Motion · Vercel Hobby · Resend Free · GitHub Free**
**Monthly cost at launch: $0**

---

## Architecture Overview

```
User visits acepool.com
       │
       ▼
Cloudflare (free CDN + DDoS protection)
       │
       ▼
Vercel Hobby (free hosting, Next.js, SSL)
       │
       ├─ Static pages served from edge (fast)
       ├─ /api/contact   → validates + sends email via Resend
       └─ /api/appointment → validates + sends email via Resend

No AI. No OpenAI. No token billing. No usage-based costs.
Chat widget is 100% client-side: hardcoded Q&A, zero API calls.
```

---

## What Was Removed (vs. earlier AI version)

| Removed | Why |
|---------|-----|
| `openai` npm package | No AI API |
| `src/app/api/chat/route.ts` | No server-side AI route |
| `OPENAI_API_KEY` env var | No OpenAI account needed |

Everything else is identical and fully intact.

---

## Prerequisites — Create These Free Accounts

| Service | Free Tier | Purpose |
|---------|-----------|---------|
| [GitHub](https://github.com) | Free | Source control |
| [Vercel](https://vercel.com) | Hobby (free) | Hosting + deploys |
| [Resend](https://resend.com) | 3,000 emails/month free | Contact form emails |
| [Cloudflare](https://cloudflare.com) | Free | DNS + CDN + DDoS |
| [Upstash](https://upstash.com) | 10k requests/day free | Rate limiting (optional) |

**Total: $0/month**

---

## Step 1 — Local Setup

```bash
# Unzip and install
cd ace-pool
npm install

# Set up environment
cp .env.example .env.local
# Open .env.local and fill in RESEND_API_KEY and email addresses

# Run locally
npm run dev
# Visit http://localhost:3000
```

### Minimum required vars for .env.local

```
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=contactacepool@gmail.com
CONTACT_EMAIL_FROM=onboarding@resend.dev   ← use this until domain verified
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 2 — Add Real Photos

Drop pool photos into `public/images/`. Required filenames:

| Filename | Section | Notes |
|----------|---------|-------|
| `hero-pool.jpg` | Hero background | Any clean pool. Rendered at 25% brightness — imperfect photos work fine. |
| `about-pool.jpg` | About section | Pool or team photo |
| `gallery-1.jpg` | Gallery (featured, tall) | Best shot |
| `gallery-2.jpg` | Gallery | Equipment or close-up |
| `gallery-3.jpg` | Gallery | Wide pool |
| `gallery-4.jpg` | Gallery | Spa or feature |
| `gallery-5.jpg` | Gallery | Equipment/pump |
| `gallery-6.jpg` | Gallery (featured, tall) | Lit or nighttime pool |
| `og-image.jpg` | Social share | 1200×630px |

**Tip:** Keep each image under 500KB. Run through [Squoosh](https://squoosh.app) (free) before uploading.

---

## Step 3 — Resend Setup

1. Go to [resend.com](https://resend.com) → Create free account
2. **Domains** → Add `acepool.com`
3. Follow DNS verification steps (add records at your domain registrar)
4. Once verified: set `CONTACT_EMAIL_FROM=noreply@acepool.com`
5. Before verification: use `CONTACT_EMAIL_FROM=onboarding@resend.dev` for testing

---

## Step 4 — Deploy to Vercel

### Option A: GitHub (recommended — enables auto-deploys on push)

```bash
git init
git add .
git commit -m "Ace Pool — production build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ace-pool.git
git push -u origin main
```

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Add environment variables (copy from `.env.local`)
5. Click **Deploy** — live in ~90 seconds

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

---

## Step 5 — Cloudflare DNS Setup

1. Go to [cloudflare.com](https://cloudflare.com) → Add site → enter `acepool.com`
2. Select **Free plan**
3. Update nameservers at your domain registrar to Cloudflare's
4. In Cloudflare DNS, add:
   - `A` record: `acepool.com` → Vercel IP (shown in Vercel domain settings)
   - `CNAME` record: `www` → `cname.vercel-dns.com`
5. In Vercel → **Settings → Domains** → Add `acepool.com` and `www.acepool.com`
6. SSL auto-provisions via Vercel

Benefits of Cloudflare free:
- Global CDN (faster loads everywhere)
- DDoS protection
- Free SSL backup
- Analytics (basic)

---

## Step 6 — Post-Deploy Verification

Run this checklist after every deploy:

### Functionality
- [ ] Homepage loads at `https://acepool.com`
- [ ] Mobile layout correct (test on real phone)
- [ ] Navbar scroll/sticky behavior works
- [ ] Mobile menu opens, links scroll correctly
- [ ] Mobile sticky CTA bar appears after scrolling
- [ ] All section anchors work (Services, About, Gallery, etc.)
- [ ] Gallery lightbox opens and closes
- [ ] FAQ accordion opens/closes with animation

### Chat Assistant (no API — verify client-side only)
- [ ] Chat button appears and opens
- [ ] Welcome message shows
- [ ] All 6 root menu options work
- [ ] Each answer displays correctly
- [ ] "Back" button returns to root and clears history
- [ ] "Call" buttons trigger phone dialer
- [ ] "Request service" buttons scroll to contact form
- [ ] No network requests made when using chat (check DevTools → Network)

### Contact Form
- [ ] Contact form validation works (try submitting empty)
- [ ] Valid submission → Ki Mo receives notification email
- [ ] Valid submission → customer receives auto-reply
- [ ] Success state shows after submit

### Appointment Form
- [ ] Toggle to "Schedule Service" tab
- [ ] Date/time fields appear
- [ ] Past dates are blocked
- [ ] Submit → Ki Mo receives PENDING appointment email
- [ ] Submit → customer receives pending confirmation email

### SEO & Technical
- [ ] `https://acepool.com/sitemap.xml` loads
- [ ] `https://acepool.com/robots.txt` loads
- [ ] 404 page looks branded (`/nonexistent`)
- [ ] Privacy Policy page loads at `/privacy`
- [ ] Terms page loads at `/terms`
- [ ] Open Graph preview: [opengraph.xyz](https://opengraph.xyz)
- [ ] Security headers: [securityheaders.com](https://securityheaders.com) → target A
- [ ] PageSpeed: [pagespeed.web.dev](https://pagespeed.web.dev) → target 90+ mobile

---

## ⚡ Launch Checklist

### Before going live
- [ ] Real pool photos in `public/images/`
- [ ] `og-image.jpg` created (1200×630)
- [ ] Favicon files present (`favicon.ico`, `icon-192.png`, `apple-touch-icon.png`)
- [ ] Resend domain verified → using real `noreply@acepool.com`
- [ ] All env vars set in Vercel dashboard (not just `.env.local`)
- [ ] Cloudflare DNS propagated (check at [dnschecker.org](https://dnschecker.org))
- [ ] SSL green padlock in Chrome, Safari, Firefox, mobile
- [ ] Test live contact form → email arrives at `contactacepool@gmail.com`
- [ ] Test live appointment form → pending email arrives
- [ ] Test chat widget on mobile phone
- [ ] Phone number `818-442-1763` correct everywhere
- [ ] Email `contactacepool@gmail.com` correct everywhere
- [ ] Run Lighthouse → 90+ across all categories
- [ ] Check accessibility with [Wave](https://wave.webaim.org)

### Day-of launch
- [ ] Send URL to Ki Mo for final review
- [ ] Test full flow on iPhone and Android
- [ ] Watch Vercel logs for first hour
- [ ] Confirm first real form submission arrives in inbox

---

## 🗺️ Post-Launch Roadmap

### Month 1 — Visibility
- Set up **Google Business Profile** → link to site (free, major local SEO boost)
- Submit sitemap in **Google Search Console** (free)
- Add **Google Analytics 4** (`NEXT_PUBLIC_GA_ID` in Vercel env vars)
- Claim **Yelp** and **Nextdoor** listings

### Month 2–3 — SEO Content
- Add service landing pages (`/services/pool-cleaning`, `/services/heater-repair`)
  — each page targets local search terms
- Write 2–3 short articles: "How often should I clean my pool?" etc.
- Add real before/after photos to gallery

### Month 3–6 — Features (all free or one-time cost)
- **SMS notifications** via Twilio when forms arrive
  (Twilio free trial → ~$1/month after)
- **Google Calendar integration** in appointment route
  for real availability checking (free Google API)
- **Seasonal banner component** for promotions
  (just a new component, no external service)

### 6+ Months — Growth
- Spanish-language version (significant SFV audience)
- Customer portal (magic-link login via Resend — no auth SaaS needed)
- Referral program landing page
- Video testimonials section

---

## Cost Tracking

| Service | Plan | Monthly Cost |
|---------|------|-------------|
| Vercel | Hobby | **$0** |
| GitHub | Free | **$0** |
| Resend | Free (3k emails/mo) | **$0** |
| Cloudflare | Free | **$0** |
| Upstash Redis | Free (10k req/day) | **$0** |
| OpenAI | **Not used** | **$0** |
| **Total** | | **$0/month** |

Domain registration (~$12/year via Namecheap or Google Domains) is the only hard cost.

---

## Maintenance

- **Update chat answers**: Edit the `NODES` object in `src/components/ChatWidget.tsx` → push to GitHub → Vercel auto-deploys
- **Update contact info**: Search for `818-442-1763` and `contactacepool@gmail.com` across the codebase
- **Add photos**: Drop files into `public/images/` → push to GitHub
- **Security**: Run `npm audit` monthly. Update `next`, `resend`, and `zod` when patches release.
- **Rotate Resend key**: Every 6–12 months in Vercel dashboard → Environment Variables

---

## Emergency Recovery

If something breaks on Vercel:
1. Go to Vercel Dashboard → your project → **Deployments**
2. Find the last working deployment
3. Click **⋯ → Redeploy**

Instant rollback. No downtime risk.
