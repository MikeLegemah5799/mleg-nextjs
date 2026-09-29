import type { Metadata } from 'next';
import '../styles/globals.css';
import JsonLd from '@/components/JsonLd';
import { AUTHOR_NAME, SITE_NAME, SITE_URL, SOCIAL_LINKS } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://mleg.tech'),
  title: {
    default: 'Michael Legemah — Principal AI Engineer',
    template: '%s — Michael Legemah',
  },
  description: 'AI Engineer specializing in LLM architecture, RAG systems, and AI product engineering. 10+ years building for AWS, AstraZeneca, US Space Force, and more.',
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  keywords: ['AI engineer', 'LLM', 'RAG', 'agentic AI', 'LangGraph', 'MCP', 'AWS', 'eval-driven development', 'fractional AI engineer'],
  alternates: {
    canonical: '/',
    types: { 'application/atom+xml': [{ url: '/feed.xml', title: 'Michael Legemah — Writing' }] },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title: 'Michael Legemah — Principal AI Engineer',
    description: 'LLM architecture, RAG systems, and AI product engineering.',
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Legemah — Principal AI Engineer',
    description: 'LLM architecture, RAG systems, and AI product engineering.',
    images: ['/twitter-image'],
  },
};

const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: 'Principal AI Engineer',
    description: 'AI Engineer specializing in LLM architecture, RAG systems, and AI product engineering.',
    sameAs: SOCIAL_LINKS,
    knowsAbout: ['Large language models', 'Retrieval-augmented generation', 'Agentic AI', 'LLM evaluation', 'AWS'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Outfit:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <JsonLd data={siteJsonLd} />
        {children}
      </body>
    </html>
  );
}
