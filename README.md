# LearnFlow — Student Dashboard

A futuristic, dark-mode learning dashboard built for the Frontend Intern Challenge. Features a Bento Grid layout, live Supabase data fetching via Server Components, Framer Motion animations, and full responsive design across desktop, tablet, and mobile.

**Live Demo**: [learning-dashboard-psi.vercel.app](https://learning-dashboard-psi.vercel.app)

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/PrashantBhalerao/learning-dashboard
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

---

## Architecture & Design Decisions

### Server / Client Component Split

The data-fetching layer is entirely server-side:

- `app/dashboard/page.tsx` — **Server Component** that calls `fetchCourses()` via the Supabase JS client. This runs at request time on the server, keeping credentials out of the browser bundle entirely.
- `lib/supabase.ts` — A server-only factory that creates a plain `@supabase/supabase-js` client. No cookies or session handling needed since this is a read-only public dashboard.
- All interactive UI (sidebar collapse, animations, hover states, mobile nav) lives in **Client Components** marked with `"use client"`. These are kept as leaf nodes in the tree to minimize the client bundle.

### Suspense & Loading States

`<Suspense fallback={<DashboardSkeleton />}>` wraps the async `DashboardContent` server component. The skeleton uses a CSS shimmer animation (gradient sweep) that matches the exact dimensions of the real cards — so when content loads there is zero layout shift. Framer Motion is not used for skeletons on purpose; pure CSS keeps the loading state lightweight.

### Animation Strategy

Every animation is implemented with Framer Motion and follows the zero-layout-shift rule — only `transform` (scale, translateY) and `opacity` are animated, never positional or dimensional properties.

- **Staggered entrance** — `motion` container with `staggerChildren: 0.07` fans tiles in sequentially after data loads
- **Card hover** — `whileHover={{ scale: 1.025, y: -2 }}` with `type: "spring", stiffness: 300, damping: 20` for natural spring physics
- **Sidebar active pill** — `layoutId="sidebar-pill"` on the highlight background so Framer Motion automatically interpolates position as the active item changes
- **Progress bars** — Animate from 0% → fetched value on mount using a custom `[0.16, 1, 0.3, 1]` cubic-bezier easing with a slight delay so the bar is visible before animating
- **Activity grid** — Each cell has a staggered `scale` + `opacity` entrance based on its week and day index
- **Streak flame** — Continuous `scale` + `rotate` loop using `repeat: Infinity` to draw attention without being distracting

### Graceful Error Handling

If Supabase environment variables are missing or the database query fails for any reason, `fetchCourses()` silently catches the error and returns `MOCK_COURSES` from `lib/mock-data.ts`. The dashboard always renders meaningful content — reviewers and users never see a blank screen or error page.

### Responsive Breakpoints

| Viewport | Sidebar | Grid |
|---|---|---|
| `> 1024px` | Full width (256px) with labels and badges | 4-column Bento grid |
| `768–1024px` | Collapsed to icons only (68px), labels hidden via CSS | 2-column grid |
| `< 768px` | Hidden entirely, replaced by fixed bottom navigation bar | Single column stack |

---

## Project Structure

```
app/
  layout.tsx                 # Root layout — fonts, metadata
  page.tsx                   # Redirects to /dashboard
  dashboard/
    layout.tsx               # Shell: sidebar + header + mobile nav
    page.tsx                 # Server Component — fetches courses, Suspense boundary

components/
  Sidebar.tsx                # Collapsible nav with layoutId active pill (client)
  MobileNav.tsx              # Fixed bottom nav for mobile (client)
  HeroTile.tsx               # Greeting + streak + stats row (client)
  CourseCard.tsx             # Dynamic icon, progress bar, spring hover (client)
  ActivityTile.tsx           # GitHub-style contribution graph (client)
  BentoGrid.tsx              # Staggered grid wrapper (client)
  ProgressBar.tsx            # 0 → value animated bar (client)
  Skeletons.tsx              # Shimmer loading states (client)
  IconResolver.ts            # Maps icon_name string → Lucide component

lib/
  supabase.ts                # Server-side Supabase client factory
  mock-data.ts               # Fallback courses + generated activity data

types/
  index.ts                   # Course, ActivityDay, StudentProfile interfaces

supabase-setup.sql           # Run this in Supabase SQL Editor to set up the table
.env.example                 # Documents required environment variables
```

---

## Deployment

```bash
# Verify build passes locally
npm run build

# Deploy to Vercel
npx vercel --prod
```

Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your Vercel project's Environment Variables settings before deploying.

---

## Challenges

**Framer Motion TypeScript strict types** — Variant transition objects require `type: "spring" as const` rather than a plain string to satisfy TypeScript's strict inference. Without `as const`, the compiler rejects the value because it widens `"spring"` to `string`, which doesn't match the union type Framer Motion expects. This was a non-obvious fix that required reading the library's type definitions.

**Supabase in Server Components** — Keeping the Supabase client strictly server-side required care. The `createServerClient()` factory in `lib/supabase.ts` must never be imported into any `"use client"` file, otherwise Next.js includes it in the browser bundle and exposes the environment variable. The solution was to keep all data fetching in the `page.tsx` Server Component and pass data down as props to client components.

**Zero layout shifts with complex animations** — The progress bar presented the trickiest constraint. Animating `width` from 0 to the target value causes layout recalculations. The fix was to wrap the bar in a fixed-height container and animate only the inner element's `width` as a percentage string — which browsers handle with compositing rather than layout.

**Responsive Bento Grid** — Getting the grid to reflow correctly across all three breakpoints without JavaScript required CSS-only `grid-template-columns` overrides at each media query. The challenge was ensuring `gridColumn: "span 4"` on the hero and activity tiles collapsed gracefully to `span 2` on tablet and `span 1` on mobile without any JS-based resizing logic.