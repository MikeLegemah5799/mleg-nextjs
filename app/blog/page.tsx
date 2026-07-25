import BlogIndexClient from '@/components/BlogIndexClient';
import { getAllPosts, getFeaturedPost } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Writing on agentic AI, RAG pipelines, and eval-driven development from Michael Legemah, Principal AI Engineer — shipped and unglamorous.',
};

export default function Blog() {
  const featured = getFeaturedPost();
  const posts = getAllPosts().filter((p) => !p.featured);

  return <BlogIndexClient featured={featured} posts={posts} />;
}
