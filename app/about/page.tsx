import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'From the Logo turtle to Principal AI Engineer — 10+ years of full-stack and AI engineering across financial services, healthcare, defense, and consumer brands.',
};

export default function AboutPage() {
  return <AboutClient />;
}
