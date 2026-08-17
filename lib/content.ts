import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import type { Root, RootContent } from "mdast";

const CONTENT_DIR = path.join(process.cwd(), "content/docs");

export type Page = {
  /** Route segments, empty for the site root. */
  slugs: string[];
  /** Route path, e.g. `/` or `/work-experience/amazon`. */
  url: string;
  /** Path relative to `content/docs`, e.g. `work-experience/amazon/index.mdx`. */
  file: string;
  title: string;
  description?: string;
};

export type TreeNode =
  | { type: "page"; title: string; url: string }
  | { type: "folder"; title: string; url?: string; children: TreeNode[] };

export type TocEntry = { title: string; url: string; depth: number };

type Meta = { title?: string; pages?: string[] };

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMdx);

function readMeta(dirAbs: string): Meta {
  const metaPath = path.join(dirAbs, "meta.json");
  if (!fs.existsSync(metaPath)) return {};

  return JSON.parse(fs.readFileSync(metaPath, "utf8")) as Meta;
}

function toUrl(slugs: string[]): string {
  return slugs.length === 0 ? "/" : `/${slugs.join("/")}`;
}

function readPage(fileAbs: string, slugs: string[]): Page {
  const { data } = matter(fs.readFileSync(fileAbs, "utf8"));

  return {
    slugs,
    url: toUrl(slugs),
    file: path.relative(CONTENT_DIR, fileAbs),
    title:
      typeof data.title === "string"
        ? data.title
        : (slugs.at(-1) ?? "Untitled"),
    description:
      typeof data.description === "string" ? data.description : undefined,
  };
}

function collectPages(dirAbs: string, slugs: string[], pages: Page[]): void {
  for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    const entryAbs = path.join(dirAbs, entry.name);

    if (entry.isDirectory()) {
      collectPages(entryAbs, [...slugs, entry.name], pages);
    } else if (entry.name.endsWith(".mdx")) {
      const name = entry.name.slice(0, -".mdx".length);
      pages.push(
        readPage(entryAbs, name === "index" ? slugs : [...slugs, name]),
      );
    }
  }
}

// `content/docs` only changes on disk, so a rebuilt module cache is enough in dev.
let pageCache: Page[] | undefined;

export function getPages(): Page[] {
  if (process.env.NODE_ENV === "production" && pageCache) return pageCache;

  const pages: Page[] = [];
  collectPages(CONTENT_DIR, [], pages);
  pageCache = pages;

  return pages;
}

export function getPage(slugs: string[] = []): Page | undefined {
  const url = toUrl(slugs);

  return getPages().find((page) => page.url === url);
}

/**
 * Orders directory entries by the `pages` array in `meta.json`, falling back to
 * alphabetical for anything the array doesn't mention.
 */
function orderNames(names: string[], order: string[] | undefined): string[] {
  const remaining = new Set(names);
  const ordered: string[] = [];

  for (const name of order ?? []) {
    if (remaining.delete(name)) ordered.push(name);
  }

  return [...ordered, ...[...remaining].sort()];
}

function buildTree(dirAbs: string, slugs: string[]): TreeNode[] {
  const meta = readMeta(dirAbs);
  const names = new Set<string>();

  for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    if (entry.isDirectory()) names.add(entry.name);
    else if (entry.name.endsWith(".mdx"))
      names.add(entry.name.slice(0, -".mdx".length));
  }

  // Outside the root, `index.mdx` is the folder's own page rather than a child entry.
  if (slugs.length > 0) names.delete("index");

  return orderNames([...names], meta.pages).flatMap<TreeNode>((name) => {
    const childSlugs = name === "index" ? slugs : [...slugs, name];
    const childAbs = path.join(dirAbs, name);

    if (fs.existsSync(childAbs) && fs.statSync(childAbs).isDirectory()) {
      const indexPage = getPage(childSlugs);

      return {
        type: "folder",
        title: readMeta(childAbs).title ?? indexPage?.title ?? name,
        url: indexPage?.url,
        children: buildTree(childAbs, childSlugs),
      };
    }

    const page = getPage(childSlugs);

    return page ? [{ type: "page", title: page.title, url: page.url }] : [];
  });
}

export function getPageTree(): TreeNode[] {
  return buildTree(CONTENT_DIR, []);
}

function parse(page: Page): Root {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, page.file), "utf8");

  return processor.parse(matter(raw).content);
}

/** Concatenates the text content of a node, ignoring JSX attributes. */
function textOf(node: RootContent | Root): string {
  if ("value" in node && typeof node.value === "string") {
    return node.type === "mdxjsEsm" ? "" : node.value;
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child) => textOf(child as RootContent)).join("");
  }

  return "";
}

/**
 * Headings written as markdown. Headings authored as raw JSX (`<h3>` inside
 * `<Step>`) are skipped, matching what `rehype-slug` assigns IDs to.
 */
export function getToc(page: Page): TocEntry[] {
  const slugger = new GithubSlugger();

  return parse(page).children.flatMap<TocEntry>((node) => {
    if (node.type !== "heading" || node.depth < 2 || node.depth > 3) return [];

    const title = textOf(node).trim();
    if (!title) return [];

    return [{ title, url: `#${slugger.slug(title)}`, depth: node.depth }];
  });
}

/** Markdown-ish plain text, used for `llms-full.txt` and the search index. */
export function getPlainText(page: Page): string {
  const blocks: string[] = [];

  const walk = (nodes: RootContent[]): void => {
    for (const node of nodes) {
      switch (node.type) {
        case "mdxjsEsm":
          break;
        case "heading":
          blocks.push(`${"#".repeat(node.depth)} ${textOf(node).trim()}`);
          break;
        case "code":
          blocks.push(`\`\`\`${node.lang ?? ""}\n${node.value}\n\`\`\``);
          break;
        case "paragraph":
        case "blockquote":
        case "table":
          blocks.push(textOf(node).trim());
          break;
        case "list":
          for (const item of node.children) {
            blocks.push(`- ${textOf(item).trim().replace(/\s+/g, " ")}`);
          }
          break;
        default:
          // Descend through JSX wrappers such as <Callout> and <Steps>.
          if ("children" in node && Array.isArray(node.children)) {
            walk(node.children as RootContent[]);
          }
      }
    }
  };

  walk(parse(page).children);

  return blocks.filter(Boolean).join("\n\n");
}

export function getPageImage(page: Page) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/${segments.join("/")}`,
  };
}

export function getLLMText(page: Page): string {
  return `# ${page.title}\n\n${getPlainText(page)}`;
}
