import BlogIndexClient from '@/components/BlogIndexClient';
import { getAllPosts, getFeaturedPost } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
};

export default function Blog() {
  const featured = getFeaturedPost();
  const posts = getAllPosts().filter((p) => !p.featured);

  return <BlogIndexClient featured={featured} posts={posts} />;
}
