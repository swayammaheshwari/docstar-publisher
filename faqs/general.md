---
title: General
description: Answers to common questions about what Docstar Publisher is and how it works.
head:
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is Docstar Publisher?","acceptedAnswer":{"@type":"Answer","text":"An open-source template that turns Markdown and OpenAPI files into a static documentation site, built with VitePress."}},{"@type":"Question","name":"Is it free to use?","acceptedAnswer":{"@type":"Answer","text":"Yes. It is released under the MIT License and hosting on GitHub Pages is free for public repositories."}},{"@type":"Question","name":"Do I need to know how to code?","acceptedAnswer":{"@type":"Answer","text":"No. You write Markdown files. The sidebar, navigation and API pages are generated for you."}},{"@type":"Question","name":"What sections does the site include?","acceptedAnswer":{"@type":"Answer","text":"Docs, Blog, API, Changelog and FAQs."}}]}'
---

# General

## What is Docstar Publisher?

An open-source template that turns Markdown and OpenAPI files into a static documentation site, built with [VitePress](https://vitepress.dev). You write content, push to GitHub, and the site is published for you.

## Is it free to use?

Yes. It is released under the MIT License, and GitHub Pages hosting is free for public repositories.

## Do I need to know how to code?

No. You write Markdown files. The sidebar, top navigation and API reference pages are generated from your folders.

## What sections does the site include?

| Section | Folder | What it is for |
| --- | --- | --- |
| Docs | `docs/` | Guides and reference written in Markdown |
| Blog | `blog/` | Posts with tags and an RSS feed |
| API | `api-hub/` | Reference generated from OpenAPI specs |
| Changelog | `changelog/` | Release notes |
| FAQs | `faqs/` | Questions and answers |

## How do I add or remove a section?

Add a folder with a `layout.json` at the top level, or delete the folder to remove it. See [Writing Docs](/docs/writing-docs) for the full `layout.json` reference.
