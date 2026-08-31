import type { Metadata } from 'next';
import ReliabilityAuditClient from '@/components/ReliabilityAuditClient';

export const metadata: Metadata = {
  title: 'The 50-Point AI Reliability Audit',
  description: 'A 50-point self-assessment checklist for teams shipping agents, RAG, and AI copilots — built to surface the exact reliability gaps that traditional testing and APM can\'t see, before they become a production incident.',
};

export default function ReliabilityAuditPage() {
  return <ReliabilityAuditClient />;
}
