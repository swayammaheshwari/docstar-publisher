import fs from 'node:fs'
import path from 'node:path'
import { apiItems, blogs, type Item } from './generate.mts'
import { readLayout } from './layout.mts'

type NavItem = { text: string; link: string; order?: number }

const titleCase = (s: string) =>
  s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

function pageTitle(file: string, fallback: string): string {
  const src = fs.readFileSync(file, 'utf8')
  const fm = src.match(/^---\n[\s\S]*?\ntitle:\s*(.+)\n[\s\S]*?---/)
  if (fm) return fm[1].trim().replace(/^["']|["']$/g, '')
  const h1 = src.match(/^#\s+(.+)$/m)
  return h1 ? h1[1].trim() : titleCase(fallback)
}

const firstLink = (items: Item[]): string | undefined => {
  for (const i of items) {
    const l = i.link ?? (i.items && firstLink(i.items))
    if (l) return l
  }
}

type Entry = { item: Item; order?: number; name: string }

/** Folder-level items for a blog: posts newest-first, then tags. */
function blogItems(dir: string, root: string): Item[] {
  const blog = blogs.get(dir)!
  const rel = path.relative(root, dir).replace(/\\/g, '/')
  return [
    ...blog.posts.map((p) => ({ text: p.title, link: p.link })),
    { text: 'Tags', link: `/${rel}/tags/` },
  ]
}

function scan(dir: string, root: string, nav: NavItem[]): Item[] {
  const layout = readLayout(dir)
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith('.') && !['public', '_api', 'node_modules'].includes(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

  const found: Entry[] = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (layout.type === 'blog') continue // posts and tags are listed by blogItems
      const childLayout = readLayout(full)
      if (dir === root && !childLayout.explicit) continue // only folders with a layout.json are part of the site
      const children = scan(full, root, nav)
      if (!children.length) continue
      const rel = path.relative(root, full).replace(/\\/g, '/')
      const group: Item = { text: childLayout.title ?? titleCase(e.name), items: children }
      if (childLayout.type === 'blog' && fs.existsSync(path.join(full, 'index.md'))) group.link = `/${rel}/`
      if (childLayout.collapsed !== undefined) group.collapsed = childLayout.collapsed
      found.push({ item: group, order: childLayout.order, name: e.name })
      if (dir === root && childLayout.explicit && childLayout.nav !== false) {
        const link = childLayout.link ?? group.link ?? firstLink(children)
        if (link) nav.push({ text: group.text, link, order: childLayout.order })
      }
    } else if (e.name.endsWith('.md') && dir !== root) {
      if (layout.type === 'blog') continue
      const rel = path.relative(root, full).replace(/\\/g, '/').replace(/\.md$/, '')
      const link = rel.endsWith('/index') ? rel.slice(0, -5) : rel
      found.push({ item: { text: pageTitle(full, path.basename(e.name, '.md')), link: '/' + link }, name: e.name })
    }
  }

  const items = found
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
    .map((f) => f.item)
  if (layout.type === 'blog' && blogs.has(dir)) return blogItems(dir, root)
  if (layout.type === 'api' && apiItems.has(dir)) return [...items, ...apiItems.get(dir)!]
  return items
}

/** Builds the sidebar and top nav from the top-level folders that have a `layout.json`. Run `generateAll` first. */
export function autoSidebar(root: string): { sidebar: Item[]; nav: { text: string; link: string }[] } {
  const nav: NavItem[] = []
  const sidebar = scan(root, root, nav)
  nav.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
  return { sidebar, nav: nav.map(({ text, link }) => ({ text, link })) }
}
