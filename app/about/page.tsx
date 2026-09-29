import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/about', {
  title: 'About',
  description: 'From the Logo turtle to Principal AI Engineer — 10+ years of full-stack and AI engineering across financial services, healthcare, defense, and consumer brands.',
});

export default function AboutPage() {
  return <AboutClient />;
}
