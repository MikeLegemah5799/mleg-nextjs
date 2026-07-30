import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter } from '@/lib/blog-shared';

export type { Post, PostFrontmatter } from '@/lib/blog-shared';
export { CATEGORY_COLORS } from '@/lib/blog-shared';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

const WORDS_PER_MINUTE = 200;
const CODE_LINES_PER_MINUTE = 40; // code is scanned, not read word-for-word

function calcReadTime(content: string): string {
  const codeBlocks = content.match(/```[\s\S]*?```/g) ?? [];
  const codeLines = codeBlocks.reduce((sum, block) => sum + block.trim().split('\n').length, 0);

  const prose = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ') // JSX/HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> link text only
    .replace(/[#>*_`~-]/g, ' '); // markdown punctuation

  const wordCount = (prose.match(/\S+/g) ?? []).length;
  const minutes = wordCount / WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE;

  return `${Math.max(1, Math.round(minutes))} min`;
}

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
  return { ...(data as PostFrontmatter), slug, content, readTime: calcReadTime(content) };
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
