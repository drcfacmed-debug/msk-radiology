# SRIM MSK Radiology — Setup Guide

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Supabase** (auth: email + Google/Facebook/LinkedIn OAuth)

## Quick Start

### 1. Install dependencies
```bash
npm install
# or
pnpm install
```

### 2. Configure Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` → `.env.local`
3. Fill in your Supabase URL and anon key:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_SITE_URL=https://msk-radiology.vercel.app
```

### 3. Configure OAuth providers (optional)
In your Supabase dashboard → Authentication → Providers:
- **Google**: paste your OAuth Client ID + Secret from [console.cloud.google.com](https://console.cloud.google.com)
- **Facebook**: paste your App ID + Secret from [developers.facebook.com](https://developers.facebook.com)
- **LinkedIn**: paste your Client ID + Secret from [linkedin.com/developers](https://www.linkedin.com/developers)

Set redirect URL to: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel
1. Push to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add environment variables (same as `.env.local`)
4. Click **Deploy**

Vercel auto-deploys on every push to `main`/`master`.

## Project structure
```
app/
  layout.tsx          — HTML shell + metadata
  page.tsx            — Home page (server component)
  globals.css         — Design tokens + animations
  auth/callback/      — OAuth redirect handler
components/
  Nav.tsx             — Sticky nav with login, profile panel, reading mode
  Hero.tsx            — Hero + publications ticker
  CasesOfWeek.tsx     — Weekly rotating MSK cases
  Modalities.tsx      — 6 imaging modality cards (links to Radiopaedia)
  Interventional.tsx  — Interventional MSK section
  IaSection.tsx       — AI in MSK — tools + timeline
  MSKGuide.tsx        — Quick reference by anatomical region
  CasesQuiz.tsx       — Interactive diagnostic quiz
  Calls.tsx           — Research calls + Mexican radiology journals
  Congresses.tsx      — 2026–2027 congress calendar
  Magazine.tsx        — Revista SRIM (coming soon)
  About.tsx           — Society mission + pillars
  Footer.tsx          — Links + privacy notice modal
  LoginModal.tsx      — Email + Google/Facebook/LinkedIn auth
  ProfilePanel.tsx    — Slide-out profile: progress, certificates, settings
  PrivacyModal.tsx    — LFPDPPP-compliant privacy notice
  FloatingButton.tsx  — Back-to-top FAB
  ScrollAnimator.tsx  — Intersection Observer scroll-in animations
lib/
  tokens.ts           — Design token constants (colors)
  supabase/           — Client + server Supabase clients
  data/cases.ts       — 12 MSK cases pool (rotates weekly)
  data/quiz.ts        — 5 quiz cases (rotates weekly)
```
