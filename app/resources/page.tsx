import type { Metadata } from 'next';
import ResourcesClient from '@/components/ResourcesClient';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Working code, checklists, and decision templates for teams shipping AI in production — built from real reliability problems, not generic advice.',
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
