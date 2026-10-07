import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { blogs, buildRss, generateAll } from './generate.mts'
import { autoSidebar } from './sidebar.mts'

const configFile = fileURLToPath(import.meta.url)
const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Set DOCS_BASE=/<repo-name>/ when deploying to https://<user>.github.io/<repo-name>/
const base = process.env.DOCS_BASE ?? '/'
// Set DOCS_REPO=<user>/<repo> to enable the "Edit this page" link and GitHub icon.
const repo = process.env.DOCS_REPO ?? 'swayammaheshwari/docstar-publisher'
// Set DOCS_SITE=https://<user>.github.io to make RSS links absolute.
const site = process.env.DOCS_SITE ?? ''

const title = 'Docstar Publisher'

// Generates API pages and blog indexes from each folder's layout.json, then builds sidebar + nav.
generateAll(docsRoot)
const { sidebar, nav } = autoSidebar(docsRoot)

export default defineConfig({
  title,
  description: 'Write docs in Markdown. Publish them to GitHub Pages.',
  base,
  cleanUrls: true,
  srcExclude: ['README.md', 'AGENTS.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'node_modules/**'],
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar,
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: `https://github.com/${repo}` }],
    editLink: {
      pattern: `https://github.com/${repo}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    footer: { message: 'Released under the MIT License.' },
  },
  vite: {
    plugins: [
      {
        // Real time: regenerate pages whenever a spec, layout.json or post is added, changed or removed.
        // The config is touched (which makes VitePress restart) only when pages appeared or vanished, so the sidebar and nav stay current.
        name: 'docstar-generate',
        configureServer(server) {
          let timer: NodeJS.Timeout | undefined
          const onChange = (file: string) => {
            if (!file.startsWith(docsRoot) || file.includes(`${path.sep}_api${path.sep}`) || file.includes('node_modules')) return
            if (!/(layout\.json|\.ya?ml|\.md)$/.test(file)) return
            clearTimeout(timer)
            timer = setTimeout(() => {
              try {
                if (generateAll(docsRoot)) fs.utimesSync(configFile, new Date(), new Date()) // VitePress restarts when its config changes
              } catch (err) {
                server.config.logger.error(`docstar: ${(err as Error).message}`)
              }
            }, 100)
          }
          for (const ev of ['add', 'change', 'unlink'] as const) server.watcher.on(ev, onChange)
        },
      },
    ],
  },
  buildEnd(siteConfig) {
    for (const blog of blogs.values()) {
      const out = path.join(siteConfig.outDir, blog.rel, 'rss.xml')
      fs.mkdirSync(path.dirname(out), { recursive: true })
      fs.writeFileSync(out, buildRss(blog, site, base, title))
    }
  },
})
