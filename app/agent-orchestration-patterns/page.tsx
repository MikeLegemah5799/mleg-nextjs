import type { Metadata } from 'next';
import AgentOrchestrationPatternsClient from '@/components/AgentOrchestrationPatternsClient';

export const metadata: Metadata = {
  title: 'Agent Orchestration Patterns',
  description: 'A diagram-forward reference for the coordination patterns behind most production agentic systems — when to use each one, and the specific way each one tends to break once it\'s carrying real traffic.',
};

export default function AgentOrchestrationPatternsPage() {
  return <AgentOrchestrationPatternsClient />;
}
