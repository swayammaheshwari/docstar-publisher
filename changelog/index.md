---
title: Changelog
description: Release notes for Docstar Publisher. All notable changes, newest first.
---

# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

::: tip How to add a release
Add a new `## [x.y.z] - YYYY-MM-DD` section directly under `## [Unreleased]`, grouped under `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed` and `Security`. Omit empty groups.
:::

## [Unreleased]

### Added

- Nothing yet.

## [1.1.0] - 2026-10-15

### Added

- `changelog/` section for release notes in the Keep a Changelog format.
- `faqs/` section for grouped questions and answers.
- New `changelog` and `faq` folder types for `layout.json`.
- Redesigned home page that lists every section the template provides.

### Changed

- Top navigation now includes Changelog and FAQs.

## [1.0.0] - 2026-10-01

### Added

- Initial release.
- `docs/` section: Markdown pages with an auto-generated sidebar and local search.
- `blog/` section: posts with frontmatter, tag pages and an RSS feed.
- API section: OpenAPI 3 / Swagger specs rendered as reference pages.
- GitHub Actions workflow that builds the site and deploys it to GitHub Pages.

[Unreleased]: https://github.com/swayammaheshwari/docstar-publisher/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/swayammaheshwari/docstar-publisher/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/swayammaheshwari/docstar-publisher/releases/tag/v1.0.0
