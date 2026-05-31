# LearnFlow — Student Dashboard

A futuristic, dark-mode learning dashboard built for the Frontend Intern Challenge.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### 1. Clone & Install

```bash
git clone <your-repo>
cd learning-dashboard
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run the contents of `supabase-setup.sql`
3. Copy your project URL and anon key from **Project Settings → API**

### 3. Configure Environment

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

## Architecture & Design Decisions

### Server / Client Component Split

The data-fetching layer is entirely server-side:

- `app/dashboard/page.tsx` — **Server Component** that calls `fetchCourses()` via the Supabase JS client. This runs at request time on the server, keeping credentials out of the browser bundle.
- `lib/supabase.ts` — Creates a plain `@supabase/supabase-js` client for server use. No cookies needed since this is a read-only public dashboard.
- All interactive UI (sidebar collapse, animations, hover states) lives in **Client Components** marked `"use client"`.

### Suspense & Loading States

`<Suspense fallback={<DashboardSkeleton />}>` wraps the async `DashboardContent` component. The skeleton uses Framer Motion's `animate` prop for a pulsing effect without layout shifts.

### Animation Strategy

- **Staggered entrance**: `motion` container with `staggerChildren: 0.08` — tiles fan in sequentially.
- **Card hover**: `whileHover={{ scale: 1.02 }}` with `type: "spring", stiffness: 300, damping: 20` for natural physics.
- **Sidebar active pill**: `layoutId="sidebar-active"` on the background highlight — Framer Motion handles the smooth cross-item transition automatically.
- **Progress bars**: Animate from 0 → target value on mount with a custom cubic-bezier easing.
- **Activity grid cells**: Staggered `scale` + `opacity` entrance based on week/day index.
- **Zero layout shifts**: All animations use `transform` (scale, translateY) and `opacity` only — never `width`, `height`, `top`, or `left`.

### Graceful Error Handling

If Supabase env vars are missing or the query fails, `fetchCourses()` catches the error and returns `MOCK_COURSES` (defined in `lib/mock-data.ts`). The dashboard always renders something meaningful.

### Responsive Breakpoints

| Viewport | Sidebar | Grid |
|----------|---------|------|
| `> 1024px` | Full (240px) with labels | 4-column bento |
| `768–1024px` | Collapsed (64px, icons only) | 4-column bento |
| `< 768px` | Hidden → bottom nav bar | Single column stack |

## Deployment

```bash
# Build check
npm run build

# Deploy to Vercel
npx vercel --prod
```

Add the same env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your Vercel project settings.
