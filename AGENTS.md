# AGENTS.md

## Purpose
This repository is a Next.js 14 + TypeScript application for musculoskeletal radiology content. Keep changes focused, reviewable, and safe for deployment through GitHub/Vercel.

## Environment setup
Use Node.js 20 when available.

Install dependencies with:

```bash
npm ci
```

The application uses Supabase. Never commit credentials or real environment values. Use the variables documented in `.env.local.example`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

If credentials are unavailable, continue with code-only work that does not require authenticated Supabase calls.

## Commands
Development:

```bash
npm run dev
```

Before considering a code change complete, run the relevant checks:

```bash
npm run lint
npm run build
```

If one cannot run because an external credential or service is unavailable, report that explicitly instead of inventing a successful result.

## Project conventions
- App Router code lives under `app/`.
- Reusable UI components live under `components/`.
- Shared utilities and data live under `lib/`.
- Preserve the existing TypeScript and Next.js architecture unless the task requires a structural change.
- Prefer small, targeted changes over broad rewrites.
- Do not introduce new dependencies unless they materially simplify the requested change.
- Keep responsive behavior in mind for desktop and mobile.
- Do not expose secrets in source files, logs, screenshots, commits, or pull requests.

## Git workflow
- Work on a task branch rather than directly on `main`.
- Summarize changed files and validation performed.
- Do not merge to `main` unless explicitly requested.
- When appropriate, leave the result ready for a pull request.

## Data safety
This project may discuss medical imaging concepts, but Codex Cloud must not be given protected health information (PHI), identifiable patient data, or clinical records. Use de-identified or synthetic examples only.
