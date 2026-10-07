# Writing Docs

## Files and folders

- Every `.md` file under `docs/` becomes a page. The site has three top-level folders, `docs/`, `blog/` and `api-hub/`, each with a `layout.json`.
- Folders become sidebar groups; names are title-cased (`api-reference` → *Api Reference*).
- Page titles come from frontmatter `title:` or the first `# Heading`.
- Files sort alphabetically; prefix with numbers (`01-intro.md`) to control order.

## Folder types with `layout.json`

Put a `layout.json` in a folder to say how it is treated:

```json
{ "type": "docs | blog | api", "title": "Display name", "order": 1, "nav": true, "collapsed": false, "link": "/docs/intro", "spec": "openapi.yml" }
```

All fields except `type` are optional. Without a `layout.json` a folder is `docs`, unless it contains OpenAPI YAML, in which case it is `api`. Top-level folders with a `layout.json` get a top-nav entry (`"nav": false` hides it); `order` sorts sidebar and nav entries.

### `docs`

Plain Markdown pages, as described above.

### `api`

Drop an OpenAPI 3 / Swagger `.yml` or `.yaml` file into the folder. Pages are generated per tag into `_api/` (gitignored) with parameters, request/response schemas and examples. Add `"spec": "file.yml"` to use just one file. Regular `.md` files in the folder still appear as normal pages.

### `blog`

Each `.md` file is a post:

```md
---
title: My Post
date: 2026-10-01
author: Jane
tags: [announcement]
description: Shown in the post list and RSS.
---
```

An index (newest first) and tag pages are generated, and an `rss.xml` is written next to the blog at build time. Set `DOCS_SITE=https://<user>.github.io` for absolute RSS links. A hand-written `index.md` replaces the generated one.

## Frontmatter

```md
---
title: My Page
description: Shown in search results and link previews.
---
```

## Links and images

Use absolute-from-docs links like `[Deploying](/docs/deploying)`. Put images in `public/` at the repo root and reference them as `/image.png`.

## Code blocks

Fenced blocks get syntax highlighting:

````md
```ts
console.log('hello')
```
````

## Containers

```md
::: tip
Helpful hint.
:::
```

More: the [VitePress Markdown docs](https://vitepress.dev/guide/markdown).
