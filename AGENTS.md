# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` contains route entries for `vite-plugin-ssr`; keep page-level data loading here.
- `src/components/` is for reusable UI; prefer feature folders and colocate small helpers.
- `src/lib/` and `src/hooks/` hold shared utilities and custom hooks (keep them pure and typed).
- `src/providers/` wires global context; `src/renderer/` maintains SSR glue—update both when adding app-wide providers.
- Put static assets in `public/`; never edit `dist/` (generated).

## Build, Test, and Development Commands
- Setup: `bun install` to install dependencies.
- Dev server: `bun run dev` (Vite with HMR).
- Production build: `bun run build` outputs to `dist/`.
- Preview: `bun run preview` serves the compiled bundle.
- Prerender: `bun run prerender` generates static HTML via `vite-plugin-ssr`.
- Lint: `bun run lint` runs ESLint per `eslint.config.js`.

## Coding Style & Naming Conventions
- Use TypeScript React function components; prefer named exports for shared modules.
- 2-space indentation; `camelCase` for variables/functions; `PascalCase` for components and filenames (e.g., `Navigation.tsx`).
- Tailwind classes stay in `className`; extract reusable variants with `class-variance-authority` under `src/lib/`.
- Update design tokens in `tailwind.config.ts` and base styles in `src/index.css` when introducing new theme values.
- Run lint before pushing.

## Testing Guidelines
- No automated tests yet; manually verify key flows on `bun run dev` and validate prerender output before merging.
- If adding tests, use Vitest + React Testing Library; name files `*.test.tsx` in `src/__tests__/` or next to components.

## Deployment (Vercel)
- Framework preset: Vite (Static Export).
- Install Command: `bun install`.
- Build Command: `bun run build && bun run prerender`.
- Output Directory: `dist/client` (vite-plugin-ssr prerender target).
- For SSR-only routes, use a serverless deployment of `vite-plugin-ssr` instead of prerender; otherwise keep routes static-first.
  
Example `vercel.json` (static):
```
{
  "version": 2,
  "framework": "vite",
  "installCommand": "bun install",
  "buildCommand": "bun run build && bun run prerender",
  "outputDirectory": "dist/client"
}
```

SSR option (only if needed):
- Use `vite-plugin-vercel` to emit `.vercel/output` for SSR.
- Install: `bun add -D vite-plugin-vercel`; then add `vercel()` to `plugins` in `vite.config.ts`.
- Build: `bun run build` (Vercel auto-detects Build Output API v3).

## Commit & Pull Request Guidelines
- Use concise, imperative subjects: `<type>: <summary>` (e.g., `feat: add contact carousel`).
- PRs must describe scope, impacted routes/components, linked issues, and any config changes (env vars, Tailwind tokens, prerender settings). Include screenshots for visual changes.
