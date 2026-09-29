import type { Metadata } from 'next';

export const SITE_URL = 'https://mleg.tech';
export const SITE_NAME = 'Michael Legemah Portfolio';
export const AUTHOR_NAME = 'Michael Legemah';
export const SOCIAL_LINKS = [
  'https://github.com/MikeLegemah5799',
  'https://linkedin.com/in/michaellegemah',
];

export function absoluteUrl(path = '') {
  return `${SITE_URL}${path}`;
}

type PageMeta = Omit<Metadata, 'alternates'> & { title: string; description: string };

/** Page metadata with canonical URL plus matching Open Graph and Twitter tags. */
export function pageMetadata(path: string, meta: PageMeta, type: 'website' | 'article' = 'website'): Metadata {
  const { title, description, ...rest } = meta;
  return {
    ...rest,
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      locale: 'en_US',
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
