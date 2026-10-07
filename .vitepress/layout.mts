import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

export type FolderType = 'docs' | 'blog' | 'api'

export type Layout = {
  type: FolderType
  title?: string
  order?: number
  collapsed?: boolean
  nav?: boolean
  spec?: string
  /** nav link override, e.g. "/guide/getting-started" */
  link?: string
  /** true when a layout.json exists in the folder */
  explicit: boolean
}

const TYPES: FolderType[] = ['docs', 'blog', 'api']

export const isYaml = (name: string) => /\.ya?ml$/i.test(name)

/** Parses a YAML file, returning undefined if it is not valid YAML. */
export function readYaml(file: string): any {
  try {
    return parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return undefined
  }
}

export const isOpenApi = (doc: any) => !!doc && typeof doc === 'object' && !!(doc.openapi || doc.swagger)

/** OpenAPI spec files directly inside `dir` (honours the `spec` option). */
export function specFiles(dir: string, spec?: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && isYaml(e.name) && (!spec || e.name === spec))
    .map((e) => path.join(dir, e.name))
    .filter((f) => isOpenApi(readYaml(f)))
}

/** Reads `<dir>/layout.json`; a folder with only OpenAPI YAML files is treated as `api`. */
export function readLayout(dir: string): Layout {
  const file = path.join(dir, 'layout.json')
  if (fs.existsSync(file)) {
    let raw: any
    try {
      raw = JSON.parse(fs.readFileSync(file, 'utf8'))
    } catch (err) {
      throw new Error(`Invalid JSON in ${file}: ${(err as Error).message}`)
    }
    const type = raw.type ?? 'docs'
    if (!TYPES.includes(type)) {
      throw new Error(`${file}: unknown type "${type}" (expected ${TYPES.join(' | ')})`)
    }
    return { ...raw, type, explicit: true }
  }
  const type: FolderType = specFiles(dir).length ? 'api' : 'docs'
  return { type, explicit: false }
}
