import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter } from '@/lib/blog-shared';

export type { Post, PostFrontmatter } from '@/lib/blog-shared';
export { CATEGORY_COLORS } from '@/lib/blog-shared';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function readSlugs(): string[] {
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getAllPosts(): Post[] {
  return readSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as PostFrontmatter), slug, content };
}

export function getFeaturedPost(): Post | undefined {
  return getAllPosts().find((p) => p.featured);
}

export function getRelatedPosts(slug: string, count = 2): Post[] {
  const current = getPostBySlug(slug);
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
