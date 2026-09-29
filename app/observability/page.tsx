import type { Metadata } from 'next';
import ObservabilityClient from '@/components/ObservabilityClient';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/observability', {
  title: 'The AI Observability Maturity Model',
  description: 'A free one-page framework for finding out where your AI system actually sits — from no visibility at all to a closed loop that catches quality drift before a customer does.',
});

export default function ObservabilityPage() {
  return <ObservabilityClient />;
}
