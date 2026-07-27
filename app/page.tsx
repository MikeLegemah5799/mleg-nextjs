import HomeClient from '@/components/HomeClient';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return <HomeClient posts={posts} />;
}
