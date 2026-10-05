# Writing Docs

## Files and folders

- Every `.md` file under `docs/` becomes a page.
- Folders become sidebar groups; names are title-cased (`api-reference` → *Api Reference*).
- Page titles come from frontmatter `title:` or the first `# Heading`.
- Files sort alphabetically; prefix with numbers (`01-intro.md`) to control order.

## Frontmatter

```md
---
title: My Page
description: Shown in search results and link previews.
---
```

## Links and images

Use absolute-from-docs links like `[Deploying](/guide/deploying)`. Put images in `docs/public/` and reference them as `/image.png`.

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
