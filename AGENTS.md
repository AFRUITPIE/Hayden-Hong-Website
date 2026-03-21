# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun dev              # Start development server (localhost:3000)
bun build            # Production build
bun test             # Run Playwright E2E tests (auto-starts dev server)
bun types:check      # Type-check (runs fumadocs-mdx codegen + tsc --noEmit)
```

Playwright runs against `localhost:3000` and starts the dev server automatically.

## Architecture

This is a personal website at [haydenhong.com](https://haydenhong.com) built with **Next.js App Router** and **Fumadocs** — an MDX-based documentation framework used here to structure all site content.

**Content flow:** MDX files in `content/docs/` → processed by `fumadocs-mdx` (configured in `source.config.ts`) → loaded via `lib/source.ts` → rendered through the `(docs)/[[...slug]]/` dynamic route with a Fumadocs UI sidebar layout.

**Key structural pieces:**
- `app/(docs)/` — Route group for all content pages; `layout.tsx` wraps with Fumadocs sidebar
- `app/api/search/` — Full-text search endpoint used by the Fumadocs search UI
- `app/og/` — Open Graph image generation for SEO
- `app/llms-full.txt/` — Serves full site content for LLM context
- `lib/source.ts` — Fumadocs source loader; also exports page image/icon utilities
- `lib/layout.shared.tsx` — Shared layout config (nav links, sidebar tree) consumed by both docs and root layouts
- `components/mdx/` — Custom MDX components (e.g., `mermaid.tsx` for diagram rendering)

**Styling:** Tailwind CSS v4 with the Fumadocs UI preset — no separate `tailwind.config.ts`; configuration is in `postcss.config.mjs` and `app/global.css`.

**Tooling:** Bun as runtime/package manager (version managed via `mise.toml`). Prettier runs automatically on commit via Husky + lint-staged.
