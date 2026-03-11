# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (starts on localhost:3000, hot reloads)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint with next/core-web-vitals + next/typescript)
- **Start production:** `npm run start`

## Architecture

Single-page portfolio site for Shivani Rupnawar built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

### Routing & Entry Point

Uses the App Router. `app/page.tsx` renders `<Portfolio />` — the entire site is a single client component.

### Key Component: `components/Portfolio.tsx`

This is the monolithic main component (~1100 lines). It contains all sections inline: navbar, hero, about, skills, experience, projects, contact, and footer. It manages:
- **Dark mode** via `useState` + class strategy (not system preference)
- **Scroll animations** via `IntersectionObserver` tracking section visibility
- **Skills data** defined as inline objects with embedded SVG icons and `<img>` tags for some (Redux, Express, REST API, PostgreSQL, MySQL icons from `/public/`)

### Puzzle Components

- `components/PortfolioStyledPuzzle.tsx` — **Active.** GSAP-animated 4-piece SVG puzzle in the About section showing soft skills (Problem Solver, Team Player, Quick Learner, Communicator). Uses cyan/blue theme matching the portfolio.
- `components/FourPiecePuzzle.tsx` — **Unused.** Earlier version with purple theme and `<style jsx>`. Imported in Portfolio.tsx but commented out.

### Styling

- Tailwind CSS 4 via `@tailwindcss/postcss` plugin (not the older `tailwindcss` PostCSS plugin)
- `tailwind.config.ts` defines a custom `float` keyframe animation and enables class-based dark mode
- `globals.css` uses `@import "tailwindcss"` (v4 syntax) plus legacy `@tailwind` directives
- Some components use `<style jsx>` for scoped CSS (FourPiecePuzzle, Portfolio footer animation)

### Path Alias

`@/*` maps to the project root (configured in tsconfig.json). Use `@/components/...` for imports.

### Placeholder Content

Several sections still have template content that needs real data:
- Experience section: company names, roles, achievements are all placeholder
- Projects section: 4 placeholder cards with emoji thumbnails
- Contact: email, GitHub, LinkedIn URLs are all `#` or `example.com`
- Resume download links point to `/path-to-your-resume.pdf` instead of `/Shivani_Rupnawar.pdf`
- `layout.tsx` metadata still says "Your Name" in title/description/OG tags
