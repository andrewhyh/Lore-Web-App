# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lore is an AI-powered family archiving platform (pre-alpha). It combines structured genealogy data (family trees) with emotional storytelling (memories/photos) via AI. Currently Phase 1 is complete (auth + dashboard); Phase 2 targets family tree visualization.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Architecture

**Stack:** Next.js 16 (App Router) + TypeScript + Supabase + Tailwind CSS v4 + shadcn/ui (New York theme)

### Routing

Uses Next.js route groups to organize without affecting URL paths:
- `app/(auth)/` — Public auth pages (`/login`, `/signup`)
- `app/(dashboard)/` — Protected pages (redirects to `/login` if unauthenticated)
- `app/auth/` — API routes for OAuth callback and sign-out

### Supabase Auth Pattern (three-client model)

Three separate Supabase client creators, each for a different execution context:
- **`lib/supabase/client.ts`** — Browser client (`createBrowserClient`)
- **`lib/supabase/server.ts`** — Server Component/Route Handler client (uses async `cookies()`)
- **`lib/supabase/middleware.ts`** — Middleware client for session refresh

`middleware.ts` runs on every request (excluding static assets), refreshes sessions, and redirects unauthenticated users away from protected routes.

### Component Conventions

- **Server Components** (default) for layouts and data fetching
- **Client Components** (`'use client'`) for forms, animations, and interactive UI
- UI primitives live in `components/ui/` (shadcn/ui with Radix primitives)
- Animations use Framer Motion

### Styling

- Tailwind CSS v4 with `@theme inline` CSS variable definitions (OKLCH color space)
- `cn()` utility in `lib/utils.ts` (clsx + tailwind-merge) for conditional class merging
- Dark mode via `.dark` class

### Import Aliases

`@/` maps to project root (e.g., `@/lib/supabase/client`, `@/components/ui/button`)

## Planned Architecture (from PRD)

- **Family tree:** React Flow canvas with DAG structure, PostgreSQL Recursive CTEs for traversal
- **AI:** pgvector for semantic search, OpenAI embeddings, auto-tagging via Edge Functions
- **Storage:** Supabase Storage buckets (`avatars`, `memories`)
- **Multi-tenancy:** Communities with RBAC (Owner/Admin/Editor/Member/Viewer) via RLS

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
