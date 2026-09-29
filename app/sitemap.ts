import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { PROJECTS } from '@/data/projects';
import { SITE_URL } from '@/lib/seo';

// Indexable static routes with a rough priority. Download/thank-you pages are noindex and omitted.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/resources', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/resume', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/speaking', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/job-match', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/rss', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/agent-orchestration-patterns', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/langgraph-patterns', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/observability', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/quorel', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/rag-decision-template', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/rag-reference-pipeline', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/reliability-audit', priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts[0] ? new Date(posts[0].date) : undefined;

  const staticRoutes = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    // Only blog-driven pages have a meaningful modification date.
    lastModified: path === '' || path === '/blog' ? latestPost : undefined,
    changeFrequency,
    priority,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = PROJECTS.filter((p) => p.featured).map((p) => ({
    url: `${SITE_URL}/projects/${p.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
