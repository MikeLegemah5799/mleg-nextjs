import type { Metadata } from 'next';
import LangGraphPatternsClient from '@/components/LangGraphPatternsClient';

export const metadata: Metadata = {
  title: 'LangGraph Patterns — Three Orchestration Patterns, Actually Running',
  description: 'Real, compiled, tested LangGraph graphs for three of the five patterns in Agent Orchestration Patterns — supervisor/worker routing, a genuine human-in-the-loop pause-and-resume gate, and deterministic-first escalation. Free to clone and run.',
};

export default function LangGraphPatternsPage() {
  return <LangGraphPatternsClient />;
}
