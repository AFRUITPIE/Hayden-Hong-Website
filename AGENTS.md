# Hayden Hong's Website

Hayden Hong’s website built with Next.js (App Router) and the Nextra framework (https://nextra.site/) using MDX. Deployed on Vercel. Routes and content live under `app/`, reusable UI in `components/`, static assets in `public/`, and E2E tests in `tests/`.

## Build & Commands

- Install dependencies: `bun install`
- Lint/format: `bun run lint`, `bun run format`
- Run all tests: `bun run test`

## Code Style

- TypeScript + React; Tailwind CSS utility-first styling
- Prettier enforced via Husky + lint-staged; follow Prettier defaults
- Naming: PascalCase components, camelCase variables/functions, kebab-case route folders/files
- Avoid `@ts-ignore`/`@ts-expect-error`; prefer proper types

## Testing

- E2E: Playwright (`tests/*.spec.ts`)
- Server auto-started by Playwright config at `:3000`
- Run locally before PR: `bun run test`
- Only add tests for critical functionality

## Architecture

- Framework: Next.js App Router + Nextra (docs theme, MDX)
- Styling: Tailwind CSS
- Config: `eslint.config.mjs`, `tsconfig.json`, `next.config.ts`, `playwright.config.ts`

## Git Workflow

- Pre-commit: Husky runs Prettier + ESLint on staged files; fix issues before committing
- PRs: CI runs Playwright (see `.github/workflows/test.yml`); include clear descriptions of changes
- Branch naming: `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`

## Configuration

When changing behavior or adding options, keep configs in sync:

1. Update `next.config.ts` and `vercel.json` as needed
2. Document any new env vars in README
3. Adjust tests in `tests/` if routes or UX change
