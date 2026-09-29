import type { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/services', {
  title: 'Services',
  description: 'Fractional and contract AI engineering from a Principal Engineer with active DoD Secret clearance — agentic system builds, eval & reliability audits, and embedded capacity.',
});

export default function ServicesPage() {
  return <ServicesClient />;
}
