import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { PROJECTS } from '@/data/projects';

const BASE_URL = 'https://mleg.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', '/about', '/projects', '/blog', '/resume', '/speaking', '/contact', '/job-match', '/rss',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const caseStudyRoutes = PROJECTS.filter((p) => p.featured).map((p) => ({
    url: `${BASE_URL}/projects/${p.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
