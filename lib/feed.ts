import { getAllPosts } from '@/lib/blog';
import type { Post } from '@/lib/blog-shared';

export const SITE_URL = 'https://mleg.tech';
export const FEED_URL = `${SITE_URL}/feed.xml`;
export const FEED_ENTRY_LIMIT = 6;

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function isoDate(date: string) {
  return new Date(`${date}T09:00:00Z`).toISOString();
}

export function getFeedPosts(): Post[] {
  return getAllPosts().slice(0, FEED_ENTRY_LIMIT);
}

function entryXml(post: Post) {
  const link = `${SITE_URL}/blog/${post.slug}`;
  return `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${link}"/>
    <id>${link}</id>
    <published>${isoDate(post.date)}</published>
    <updated>${isoDate(post.date)}</updated>
    <summary>${escapeXml(post.desc)}</summary>
    <category term="${escapeXml(post.category)}"/>
  </entry>`;
}

function feedHeaderXml(posts: Post[]) {
  const updated = posts[0] ? isoDate(posts[0].date) : new Date().toISOString();
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>mleg.tech — Michael Legemah</title>
  <subtitle>Notes on building AI systems that ship.</subtitle>
  <link href="${FEED_URL}" rel="self"/>
  <link href="${SITE_URL}/"/>
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <author>
    <name>Michael Legemah</name>
  </author>`;
}

export function buildFeedXml(posts: Post[] = getFeedPosts()): string {
  return `${feedHeaderXml(posts)}
${posts.map(entryXml).join('\n')}
</feed>
`;
}

/** Header + first entry + a "N more entries" comment, for the human-readable preview. */
export function buildFeedPreviewXml(posts: Post[] = getFeedPosts()): string {
  const [first, ...rest] = posts;
  const entry = first ? entryXml(first) : '';
  const moreComment = rest.length > 0 ? `\n  <!-- ${rest.length} more entries -->` : '';
  return `${feedHeaderXml(posts)}
${entry}${moreComment}
</feed>`;
}
