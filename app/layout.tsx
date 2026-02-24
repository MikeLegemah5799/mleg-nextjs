import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Michael Legemah — Principal AI Engineer',
    template: '%s — Michael Legemah',
  },
  description: 'Principal AI Engineer specializing in LLM architecture, RAG systems, and AI product engineering. 10+ years building for JP Morgan, Mayo Clinic, Northrop Grumman, and more.',
  openGraph: {
    title: 'Michael Legemah — Principal AI Engineer',
    description: 'LLM architecture, RAG systems, and AI product engineering.',
    url: 'https://mleg.tech',
    siteName: 'Michael Legemah Portfolio',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
