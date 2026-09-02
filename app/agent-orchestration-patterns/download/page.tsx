import type { Metadata } from 'next';
import AgentOrchestrationPatternsDownloadClient from '@/components/AgentOrchestrationPatternsDownloadClient';

export const metadata: Metadata = {
  title: 'Your Download',
  description: 'Download Agent Orchestration Patterns.',
  robots: { index: false, follow: false },
};

export default function AgentOrchestrationPatternsDownloadPage() {
  return <AgentOrchestrationPatternsDownloadClient />;
}
