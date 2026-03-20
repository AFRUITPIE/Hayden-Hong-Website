# CLAUDE.md — AI Assistant Guide for Hayden-Hong-Website

This file provides context for AI assistants working on this repository.

## Project Overview

Personal portfolio/documentation website for Hayden Hong, built with Next.js App Router and [Fumadocs](https://fumadocs.vercel.app/). Content is authored in MDX and rendered as a documentation-style site. Deployed to Vercel at https://haydenhong.com/.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Content | Fumadocs (core, mdx, ui) + MDX |
| Styling | TailwindCSS v4 via PostCSS |
| Language | TypeScript 5 (strict mode) |
| Package manager | Bun |
| Testing | Playwright (E2E only) |
| Formatting | Prettier |
| Hosting | Vercel |

## Repository Structure

```
/
├── app/                        # Next.js App Router
│   ├── (docs)/                 # Route group for documentation pages
│   │   ├── layout.tsx          # Docs layout with sidebar
│   │   └── [[...slug]]/page.tsx # Catch-all docs page (MDX rendering)
│   ├── api/search/route.ts     # Fumadocs search API
│   ├── og/[...slug]/route.tsx  # Dynamic Open Graph image generation
│   ├── llms-full.txt/route.ts  # LLM context file endpoint
│   ├── layout.tsx              # Root layout (fonts, analytics, providers)
│   └── global.css              # Global styles (TailwindCSS + Fumadocs UI)
├── components/
│   ├── mdx/mermaid.tsx         # Mermaid diagram renderer (theme-aware)
│   ├── animated-initials.tsx   # SVG "HH" navbar animation
│   └── random-greeting.tsx     # Client component with random greetings
├── content/docs/               # MDX content (source of truth for pages)
│   ├── index.mdx               # Home page
│   ├── contact/                # Contact section
│   ├── work-experience/        # Work history
│   ├── projects/               # Projects
│   └── education/              # Education
├── lib/
│   ├── source.ts               # Fumadocs source loader + utilities
│   └── layout.shared.tsx       # Shared layout config (navbar title)
├── public/assets/home/         # Static images
├── tests/                      # Playwright E2E tests
├── source.config.ts            # Fumadocs source configuration
├── next.config.mjs             # Next.js config (MDX via fumadocs-mdx)
├── playwright.config.ts        # Playwright config
├── mise.toml                   # Tool version pinning (Bun, Node)
└── vercel.json                 # Vercel build config
```

## Development Commands

```bash
# Install dependencies
bun install

# Start dev server (http://localhost:3000)
bun dev

# Production build
bun build

# Start production server
bun start

# Type checking (fumadocs-mdx gen + next typegen + tsc)
bun run types:check

# Run E2E tests (starts dev server automatically)
bun test
```

## Content Authoring (MDX)

All site content lives under `content/docs/`. Fumadocs handles routing: each `.mdx` file maps to a URL slug.

### Adding a new page

1. Create `content/docs/<section>/<page>.mdx` with frontmatter:
   ```mdx
   ---
   title: Page Title
   description: Short description for SEO/OG
   ---

   Content here...
   ```

2. Add the page to the section's `meta.json` to control sidebar order:
   ```json
   {
     "title": "Section Title",
     "pages": ["existing-page", "new-page"]
   }
   ```

### Mermaid diagrams

Use fenced code blocks with `mermaid` language tag. The renderer is theme-aware (dark/light).

````mdx
```mermaid
graph TD
  A --> B
```
````

### Images

Import images directly in MDX; Next.js Image optimization is applied automatically.

```mdx
import myImage from "../../public/assets/example.jpg";

<img src={myImage} alt="description" />
```

## TypeScript Conventions

- **Strict mode** is enabled — no implicit `any`, no unchecked nulls.
- Path aliases:
  - `@/*` → project root
  - `fumadocs-mdx:collections/*` → `.source/*` (generated)
- Page types: use `InferPageType<typeof source>` for Fumadocs page type safety.
- Async params in App Router pages use the `Promise<{ slug: string[] }>` pattern:
  ```ts
  export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
  ```

## React / Next.js Conventions

- **Server Components by default.** Add `"use client"` only when the component requires browser APIs, state, or event handlers.
- Interactive components (`random-greeting.tsx`, `mermaid.tsx`) are client components.
- Static params are pre-generated via `generateStaticParams()`.
- Metadata (title, description, OG) is generated via `generateMetadata()`.

## Styling Conventions

- **TailwindCSS v4** — utility classes directly in JSX/TSX.
- No CSS modules; no styled-components.
- Dark/light theme via `next-themes`. The `useTheme()` hook is used in client components where theme-aware rendering is needed (e.g., Mermaid diagrams).
- Fumadocs UI preset styles are imported in `global.css`.

## Testing

Tests are **Playwright E2E only** — no unit or component tests.

```bash
bun test                 # Run all tests (auto-starts dev server)
bunx playwright show-report  # View last test report
```

Test files are in `tests/`:
- `navigation.spec.ts` — sidebar navigation, page loads, heading visibility
- `search.spec.ts` — search modal, result navigation
- `robots.spec.ts` — `/robots.txt` resolution

Write tests using role-based selectors (`getByRole`, `getByText`) over CSS selectors where possible. The dev server starts automatically at `localhost:3000` during test runs.

## Code Formatting

Prettier is the sole formatter. Config is in `.prettierrc` (defaults). Pre-commit hook via Husky runs `lint-staged` to format staged files automatically.

To manually format:
```bash
bunx prettier --write .
```

There is no ESLint config — TypeScript strict mode + Prettier handles quality.

## CI/CD

GitHub Actions workflow (`.github/workflows/test.yml`) runs on every push to `main` and all PRs:
1. Install dependencies (`bun install --frozen-lockfile`)
2. Install Playwright browsers
3. Run `bun test`
4. Upload Playwright report as artifact (7-day retention)

Deployment is automatic via Vercel on merge to `main`. Build command: `bun run build`.

## Key Files to Know

| File | Purpose |
|---|---|
| `source.config.ts` | Fumadocs content pipeline config (collections, plugins) |
| `lib/source.ts` | Fumadocs source loader — exports `source`, `getPageImage`, `getLLMText` |
| `lib/layout.shared.tsx` | Shared navbar/layout config used by docs layout |
| `app/(docs)/[[...slug]]/page.tsx` | Main docs page component — MDX rendering, metadata, static params |
| `app/og/[...slug]/route.tsx` | OG image generation for social sharing |
| `mdx-components.tsx` | MDX component overrides passed to Fumadocs |
| `mise.toml` | Tool version pinning — use `mise install` to get correct Bun/Node versions |

## Gotchas

- **Bun is required** — do not use npm or yarn. `bun install --frozen-lockfile` is used in CI.
- **`postinstall` runs `fumadocs-mdx`** — generates types from MDX content into `.source/`. If types are missing after install, run `bun run types:check`.
- **Next.js App Router params are async** — always `await params` before accessing slug/id in page components.
- **No ESLint** — TypeScript and Prettier are the only code quality tools.
- **TailwindCSS v4** uses PostCSS plugin (`@tailwindcss/postcss`), not the standalone CLI. Config is in `postcss.config.mjs`.
