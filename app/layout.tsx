import type { Metadata } from 'next';
import { LOGO_URL } from '@/lib/constants';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mleg.tech'),
  title: {
    default: 'Michael Legemah — Principal AI Engineer',
    template: '%s — Michael Legemah',
  },
  description: 'Principal AI Engineer specializing in LLM architecture, RAG systems, and AI product engineering. 10+ years building for AWS, AstraZeneca, US Space Force, and more.',
  openGraph: {
    title: 'Michael Legemah — Principal AI Engineer',
    description: 'LLM architecture, RAG systems, and AI product engineering.',
    url: 'https://mleg.tech',
    siteName: 'Michael Legemah Portfolio',
    images: [{ url: LOGO_URL }],
  },
  twitter: {
    card: 'summary',
    title: 'Michael Legemah — Principal AI Engineer',
    description: 'LLM architecture, RAG systems, and AI product engineering.',
    images: [LOGO_URL],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Outfit:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
