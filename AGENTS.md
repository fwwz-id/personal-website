# Repository Guidelines

## Project Structure & Module Organization (Next.js)
- `app/` uses the Next.js App Router (layouts, pages, loading states).
- `src/components/` is for reusable UI; prefer feature folders and colocate small helpers.
- `src/lib/` and `src/hooks/` hold shared utilities and custom hooks (keep them pure and typed).
- `src/providers/` wires global context; update `app/providers.tsx` when adding app-wide providers.
- Static assets live in `public/`.

## Build, Test, and Development Commands
- Setup: `bun install` to install dependencies.
- Dev server: `bun run dev` (Next.js dev server).
- Production build: `bun run build` (emits `.next/`).
- Start: `bun run start` (serve production build).
- Lint: `bun run lint` runs ESLint per `eslint.config.js`.

## Coding Style & Naming Conventions
- Use TypeScript React function components; prefer named exports for shared modules.
- 2-space indentation; `camelCase` for variables/functions; `PascalCase` for components and filenames (e.g., `Navigation.tsx`).
- Tailwind classes stay in `className`; extract reusable variants with `class-variance-authority` under `src/lib/`.
- Update design tokens in `src/index.css` (Tailwind v4 + CSS variables) when introducing new theme values.
- Run lint before pushing.

## Testing Guidelines
- No automated tests yet; manually verify key flows on `bun run dev` and validate prerender output before merging.
- If adding tests, use Vitest + React Testing Library; name files `*.test.tsx` in `src/__tests__/` or next to components.

## Deployment (Vercel)
- Framework preset: Next.js
- Install Command: `bun install`
- Build Command: `bun run build`
- Output Directory: automatic (`.next`, managed by Vercel)
- Static generation: App Router pages with no dynamic data are pre-rendered automatically; routes using `generateStaticParams` are SSG.

## Commit & Pull Request Guidelines
- Use concise, imperative subjects: `<type>: <summary>` (e.g., `feat: add contact carousel`).
- PRs must describe scope, impacted routes/components, linked issues, and any config changes (env vars, Tailwind tokens, prerender settings). Include screenshots for visual changes.
