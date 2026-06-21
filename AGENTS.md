<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FlowCart — agent primer

## Commands

| Action | Command |
|---|---|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Lint all | `pnpm biome check .` |
| Lint + fix | `pnpm biome check --write .` |
| Typecheck | `npx tsc --noEmit` |

Staged files are linted on commit via husky + `lint-staged` (runs `biome check --write`).

## Toolchain

- **pnpm** (not npm/yarn). Lockfile is `pnpm-lock.yaml`.
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss` in `postcss.config.mjs`. No `tailwind.config.*` file.
- **Biome** (v2) — replaces ESLint + Prettier. Single `biome.json` at root. Excludes `*.config.*` files and `.next/`.
- **TypeScript strict** — includes `noUnusedLocals`, `noUnusedParameters`, `exactOptionalPropertyTypes`.
- **Path alias**: `@/*` → `./src/*`.
- **shadcn Nova** preset (`components.json` style: `radix-nova`). Use `npx shadcn@latest add <component>` to add more.

## Architecture

- **No real backend** — all data is mock, served via TanStack Query hooks with simulated delays (600–800ms). No API routes, no database.
- **State**: Zustand v5 (cart + wishlist persisted to `localStorage`, ui + quick-view ephemeral). TanStack Query v5 for async data.
- **GSAP** is centralized through `src/lib/gsap.ts` (plugins registered once); import from there, never from `gsap` directly.
- All animations respect `prefers-reduced-motion` via `useReducedMotion()` hook.

## Testing

**There is no test framework** — no Jest, Vitest, Playwright, or Cypress in dependencies. Do not attempt `pnpm test`.

## Conventions

- **Quotes**: single quotes (Biome enforced).
- **Semicolons**: always.
- **Trailing commas**: always (where valid).
- **Indent**: 2 spaces.
- **Line width**: 100.
- **Imports**: organized on save (Biome `organizeImports`).
- **No `.env` files** are tracked. No env variables needed for dev.

## Deployment

Vercel — `pnpm build` produces the output. No Docker, no custom server.
