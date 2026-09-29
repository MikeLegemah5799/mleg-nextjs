import type { Metadata } from 'next';
import ResourcesClient from '@/components/ResourcesClient';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/resources', {
  title: 'Resources',
  description: 'Working code, checklists, and decision templates for teams shipping AI in production — built from real reliability problems, not generic advice.',
});

export default function ResourcesPage() {
  return <ResourcesClient />;
}
