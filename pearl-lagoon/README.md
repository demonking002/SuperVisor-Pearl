# Supervisor Pearl HQ 🐾

A community-run "guardian HQ" site for $PEARL, starring Pearl — a real-life
viral watermelon cat — reimagined in community fiction as a mascot who
patrols Robinhood Chain and shares what she notices.

**This is fan/community storytelling. Supervisor Pearl HQ is not affiliated
with, endorsed by, or operated by Robinhood.** Nothing on the site is
official security monitoring or financial advice.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** for styling and theming (dark/light)
- **Framer Motion** for UI motion and transitions
- **Matter.js** for the physics-based watermelon patch
- Canvas-based animated ocean with ripple effects on click/move
- Live token stats via the **DexScreener API** (auto-refreshes every 30s)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                 Next.js App Router pages, layout, SEO (sitemap/robots), globals.css
components/          All UI + interactive pieces (Ocean, WatermelonField, GuardianDashboard...)
hooks/               useTheme, useRipple, useMediaQuery, useDexScreenerData, usePopTracker, useKonamiCode
lib/                 constants.ts (site copy/config) and utils.ts
public/              Real Pearl badge/logo assets, favicons, OG image, web manifest
```

## Features

- Cinematic hero: animated ocean, clouds, birds, fish, floating watermelon
  patch (Matter.js physics — click to pop, roll away, and splash), subtle
  mouse-move ripples
- Real Pearl photo badge used across the navbar, footer, loading screen,
  Guardian Dashboard, and easter eggs (`components/Logo.tsx` and
  `components/PearlPortrait.tsx` are the two swap points if the art ever
  changes — drop a new `public/logo.png` / `public/pearl-badge.png` and
  everything updates automatically)
- **Guardian Dashboard**: two live panels (Market Overview, Chain Watch)
  backed by real DexScreener data, plus honestly-labeled "Coming Soon"
  panels for Daily Reports, Launch Monitor, Graduation Tracker, Big
  Winners, Rug Alerts, and Exploit Watch — these need a connected data
  source before they can show real numbers; see `lib/constants.ts`
  (`GUARDIAN_PANELS`)
- Loading screen with animated Pearl badge, percentage counter, and a
  procedurally generated ocean-ambience toggle (no audio file needed)
- Custom watermelon cursor (desktop, motion-safe only)
- Easter eggs: pet Pearl 7x for a secret, watermelon-pop milestones at
  10/50/100/250 (with a watermelon rain at 100), and the Konami code for a
  hidden "Guardian Override" reveal
- Dark / light theme toggle with persisted preference
- Fully responsive, keyboard-focus visible, respects `prefers-reduced-motion`
- SEO: metadata, JSON-LD structured data, Open Graph/Twitter cards (real
  generated image at `public/og-image.png`), sitemap.xml, robots.txt, web
  manifest

## Still needs real content

`lib/constants.ts` intentionally ships with **empty arrays** (not fake
placeholder text) for:

- `STORY_CHAPTERS` — Pearl's real origin story
- `ROADMAP` — the real island-by-island roadmap
- `FAQS` — the real questions or the team wants answered

Each section (`Story.tsx`, `Roadmap.tsx`, `FAQ.tsx`) renders an honest
"awaiting content" state until these are filled in, so nothing fake ships
to production.

## Customization

Edit `lib/constants.ts` to update the contract address, socials, roadmap
copy, FAQ, and dashboard panel copy — everything is centralized there.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
