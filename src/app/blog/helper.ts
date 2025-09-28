import 'server-only';

import { globby } from 'globby';
import path from 'node:path';
import fs from 'node:fs/promises';
import matter from 'gray-matter';

// Types describing blog frontmatter and parsed post
export type BlogFrontmatter = {
  slug: string;
  title: string;
  description: string;
  date: string | Date;
  tags: string[] | string; // tolerates comma-delimited string
  thumbnail?: string;
  author: string;
  readTime: string; // sometimes present
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD (preferred) or original string
  tags: string[];
  thumbnail: string;
  author?: string;
  readTime: string; // normalized; computed if absent
  filepath: string; // Absolute path on disk
};

export type BlogPost = BlogPostMeta & {
  content: string; // MDX content without frontmatter
};

const BLOG_GLOB = 'src/content/blog/**/*.mdx';

function toSlug(filePath: string, fmSlug?: string): string {
  if (fmSlug && fmSlug.trim()) return fmSlug.trim();
  const base = path.basename(filePath, path.extname(filePath));
  return base.replace(/\s+/g, '-');
}

function formatDate(input?: string | Date): string | undefined {
  if (!input) return undefined;
  const raw = String(input).trim().replace(/,+\s*$/, '');
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw; // keep original if unparsable
  // normalize to YYYY-MM-DD in local time
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function computeReadTime(content: string): string {
  const text = content
    // strip code fences
    .replace(/```[\s\S]*?```/g, ' ')
    // strip HTML tags
    .replace(/<[^>]*>/g, ' ')
    // strip markdown artifacts
    .replace(/[#*_>`~\-\[\]\(\)!]/g, ' ');
  const words = (text.match(/\S+/g) || []).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
}

function normalizeTags(tags?: string[] | string): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  // comma or pipe delimited
  return tags
    .split(/[,|]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function inferTitleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function extractDescriptionFromContent(content: string): string | undefined {
  // first non-empty line that looks like paragraph text
  const lines = content.split(/\r?\n/).map((l) => l.trim());
  for (const line of lines) {
    if (!line) continue;
    if (line.startsWith('#')) continue; // skip headings
    // basic cleanup of markdown tokens
    const cleaned = line.replace(/[*_`>]+/g, '').trim();
    if (cleaned) return cleaned.slice(0, 240);
  }
  return undefined;
}

async function parseFile(filePath: string): Promise<BlogPost> {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = (data ?? {}) as BlogFrontmatter;

  const slug = toSlug(filePath, typeof fm.slug === 'string' ? fm.slug : undefined);
  const titleRaw = typeof fm.title === 'string' ? fm.title.trim().replace(/,+\s*$/, '') : undefined;
  const title = titleRaw && titleRaw.length > 0 ? titleRaw : inferTitleFromSlug(slug);
  const description = (typeof fm.description === 'string' ? fm.description.trim() : undefined) ||
    extractDescriptionFromContent(content ?? '') ||
    '';
  const date = formatDate(fm.date) || formatDate(path.basename(filePath, path.extname(filePath)).slice(0, 10)) || '';
  const tags = normalizeTags(fm.tags);
  const thumbnail = fm.thumbnail || 'https://images.unsplash.com/photo-1668681919287-7367677cdc4c?q=80&w=650&auto=format&fit=crop'
  const author = typeof fm.author === 'string' ? fm.author : undefined;
  const readTime = fm.readTime.toString().trim() || computeReadTime(content ?? '');

  return {
    slug,
    title,
    description,
    date,
    tags,
    thumbnail,
    author,
    readTime,
    filepath: path.resolve(filePath),
    content: content ?? '',
  };
}

// List all MDX files under src/content/blog and parse frontmatter
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = await globby(BLOG_GLOB, { gitignore: true });
  const posts = await Promise.all(files.map((f) => parseFile(f)));
  // Sort by date desc if available
  posts.sort((a, b) => {
    const ad = a.date ? new Date(a.date).getTime() : 0;
    const bd = b.date ? new Date(b.date).getTime() : 0;
    return bd - ad;
  });
  return posts;
}

// Only metadata (omit heavy content) for listings
export async function getAllBlogPostsMeta(): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return posts.map(({ content, ...meta }) => meta);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Try direct path first for efficiency
  const directPath = path.posix.join('src/content/blog', `${slug}.mdx`);
  try {
    const stats = await fs.stat(directPath);
    if (stats.isFile()) {
      return parseFile(directPath);
    }
  } catch {
    // ignore and fall back to scanning
    console.warn(`Blog post not found at direct path: ${directPath}`);
  }

  const posts = await getAllBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
