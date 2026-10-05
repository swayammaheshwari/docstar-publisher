import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { autoSidebar } from './sidebar.mts'

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Set DOCS_BASE=/<repo-name>/ when deploying to https://<user>.github.io/<repo-name>/
const base = process.env.DOCS_BASE ?? '/'
// Set DOCS_REPO=<user>/<repo> to enable the "Edit this page" link and GitHub icon.
const repo = process.env.DOCS_REPO ?? 'swayammaheshwari/docstar-publisher'

export default defineConfig({
  title: 'Docstar Publisher',
  description: 'Write docs in Markdown. Publish them to GitHub Pages.',
  base,
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide/getting-started' }],
    sidebar: autoSidebar(docsRoot),
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: `https://github.com/${repo}` }],
    editLink: {
      pattern: `https://github.com/${repo}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    footer: { message: 'Released under the MIT License.' },
  },
})
