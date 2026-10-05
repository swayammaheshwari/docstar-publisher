# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this project is

**Docstar Publisher** is an open-source (MIT) template for publishing documentation. Users write Markdown files in `docs/`, preview them live locally, and push to GitHub, where a GitHub Actions workflow builds a static site with [VitePress](https://vitepress.dev) and deploys it to GitHub Pages.

It is meant to be forked / used as a template. Keep it simple, dependency-light, and free of project-specific content.

## Layout

```
docs/                     All site content (Markdown)
  index.md                Home page (hero)
  guide/*.md              Guide pages
  public/                 Static assets (served from site root)
  .vitepress/config.mts   Site config (title, nav, search, base path)
  .vitepress/sidebar.mts  Auto-generates sidebar from docs/ folder tree
.github/workflows/deploy.yml   Build + deploy to GitHub Pages
```

## Commands

- `npm install` — install deps
- `npm run dev` — live preview with hot reload
- `npm run build` — production build to `docs/.vitepress/dist`
- `npm run preview` — serve the production build locally

## Conventions

- Adding a doc = adding a `.md` file under `docs/`. **Do not** hand-edit the sidebar; it is generated from the folder tree. Page title = frontmatter `title:` or first `# H1`.
- One H1 per page. Use `-` bullets, fenced code blocks with a language.
- Link between pages with absolute-from-docs paths without extension: `/guide/deploying`.
- Static images go in `docs/public/`.
- The deploy base path comes from env `DOCS_BASE` (workflow sets `/<repo-name>/`); never hard-code a base path in Markdown links or config.
- Never commit `node_modules/` or `docs/.vitepress/dist/` or `docs/.vitepress/cache/`.
- Verify changes with `npm run build` before finishing; broken internal links fail the build.

## Deploying

Push to `main`. One-time: repo **Settings → Pages → Source: GitHub Actions**. Do not push, tag, or change repo settings unless the user asks.

## Don'ts

- Don't add heavy frameworks or a custom renderer; VitePress is the engine.
- Don't add secrets, analytics, or tracking.
- Don't change the license.
