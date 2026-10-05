import fs from 'node:fs'
import path from 'node:path'

type Item = { text: string; link?: string; items?: Item[]; collapsed?: boolean }

const titleCase = (s: string) =>
  s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

function pageTitle(file: string, fallback: string): string {
  const src = fs.readFileSync(file, 'utf8')
  const fm = src.match(/^---\n[\s\S]*?\ntitle:\s*(.+)\n[\s\S]*?---/)
  if (fm) return fm[1].trim().replace(/^["']|["']$/g, '')
  const h1 = src.match(/^#\s+(.+)$/m)
  return h1 ? h1[1].trim() : titleCase(fallback)
}

function scan(dir: string, root: string): Item[] {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith('.') && e.name !== 'public')
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

  const items: Item[] = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      const children = scan(full, root)
      if (children.length) items.push({ text: titleCase(e.name), items: children })
    } else if (e.name.endsWith('.md') && !(dir === root && e.name === 'index.md')) {
      const rel = path.relative(root, full).replace(/\\/g, '/').replace(/\.md$/, '')
      const link = rel.endsWith('/index') ? rel.slice(0, -5) : rel
      items.push({ text: pageTitle(full, path.basename(e.name, '.md')), link: '/' + link })
    }
  }
  return items
}

/** Builds the sidebar from the folder structure of `docs/`. */
export function autoSidebar(root: string): Item[] {
  return scan(root, root)
}
