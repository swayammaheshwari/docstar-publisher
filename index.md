---
layout: home
hero:
  name: Docstar Publisher
  text: Your whole docs site, from plain files.
  tagline: Write Markdown and OpenAPI. Get docs, a blog, an API reference, a changelog and FAQs, deployed to GitHub Pages on every push.
  actions:
    - theme: brand
      text: Get started
      link: /docs/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/swayammaheshwari/docstar-publisher
features:
  - icon: 📘
    title: /docs
    details: Guides and reference pages from Markdown files. The sidebar builds itself from your folders.
    link: /docs/getting-started
    linkText: Read the docs
  - icon: ✍️
    title: /blog
    details: Posts with dates, authors and tags. Index, tag pages and an RSS feed are generated for you.
    link: /blog/
    linkText: Read the blog
  - icon: 🔌
    title: /api
    details: Drop in an OpenAPI 3 or Swagger file and get endpoint pages with parameters, schemas and curl examples.
    link: /docs/writing-docs#api
    linkText: How API pages work
  - icon: 🕒
    title: /changelog
    details: Release notes in the Keep a Changelog format with semantic versions, so users see what changed.
    link: /changelog/
    linkText: See the changelog
  - icon: ❓
    title: /faqs
    details: Grouped questions and answers with FAQ structured data, so search engines can show them.
    link: /faqs/general
    linkText: Browse the FAQs
  - icon: 🚀
    title: One-push deploy
    details: A bundled GitHub Actions workflow builds the site and publishes it to GitHub Pages. MIT licensed.
    link: /docs/deploying
    linkText: Deploy your site
---

<div class="home-section">

## Five sections. One repository.

Each section is a top-level folder with a `layout.json`. Add a folder to add a section; delete it to remove one.

| Route | Folder | You write |
| --- | --- | --- |
| `/docs` | `docs/` | Markdown pages |
| `/blog` | `blog/` | Markdown posts with frontmatter |
| `/api` | `api-hub/` | OpenAPI `.yml` files |
| `/changelog` | `changelog/` | Release notes |
| `/faqs` | `faqs/` | Questions and answers |

</div>
