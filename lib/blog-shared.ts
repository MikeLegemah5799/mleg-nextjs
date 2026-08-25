export type PostFrontmatter = {
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  desc: string;
  tags: string[];
  featured?: boolean;
  'meta-og:image'?: string;
};

export type Post = PostFrontmatter & { content: string };

export const CATEGORY_COLORS: Record<string, string> = {
  'Agentic AI': 'var(--pink)',
  'RAG': 'var(--cyan)',
  'Eval & testing': 'var(--green)',
  'AWS': 'var(--orange)',
  'Career': 'var(--purple)',
  'MCP': 'var(--yellow)',
};
