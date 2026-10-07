# Docstar Publisher

Write docs in Markdown, see them live, and publish to GitHub Pages with one push. Open source, MIT licensed.

## Quick start

1. Click **Use this template** (or fork), then clone.
2. `npm install`
3. `npm run dev` — live preview at the printed URL.
4. Add `.md` files to `docs/`, posts to `blog/`, or an OpenAPI `.yml` to `api-hub/`. The sidebar builds itself.
5. Push to `main`. In **Settings → Pages**, set **Source** to **GitHub Actions** (one time).

Your docs go live at `https://<user>.github.io/<repo>/`.

## Scripts

| Command           | What it does                  |
| ----------------- | ----------------------------- |
| `npm run dev`     | Live preview with hot reload  |
| `npm run build`   | Build static site to `.vitepress/dist` |
| `npm run preview` | Serve the built site locally  |

## Docs

See [docs/](docs/) — or the live site once deployed. AI agents: read [AGENTS.md](AGENTS.md).

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
