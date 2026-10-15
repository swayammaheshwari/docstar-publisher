---
title: Publishing
description: Answers to common questions about previewing, building and deploying your site.
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I preview my site locally?","acceptedAnswer":{"@type":"Answer","text":"Run npm install, then npm run dev. The site hot-reloads as you edit files."}},{"@type":"Question","name":"How do I publish to GitHub Pages?","acceptedAnswer":{"@type":"Answer","text":"Set Settings, Pages, Source to GitHub Actions once, then push to main. The bundled workflow builds and deploys the site."}},{"@type":"Question","name":"Why does my build fail with a dead link error?","acceptedAnswer":{"@type":"Answer","text":"VitePress fails the build when an internal link points to a page that does not exist. Fix the link path or add the missing page."}},{"@type":"Question","name":"Can I use a custom domain?","acceptedAnswer":{"@type":"Answer","text":"Yes. Add a CNAME file to public/ and set the custom domain in your repository Pages settings."}}]}'
---

# Publishing

## How do I preview my site locally?

```bash
npm install
npm run dev
```

The site hot-reloads as you edit files.

## How do I publish to GitHub Pages?

1. In your repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. You only do this once.
2. Push to `main`.

The bundled workflow builds the site and deploys it. See [Deploying](/docs/deploying) for details.

## Why does my build fail with a dead link error?

VitePress fails the build when an internal link points to a page that does not exist. Fix the link path or add the missing page. Links use paths without an extension, such as `/docs/deploying`.

## Can I use a custom domain?

Yes. Add a `CNAME` file containing your domain to `public/`, then set the custom domain under **Settings → Pages**.
