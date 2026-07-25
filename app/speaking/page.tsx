import type { Metadata } from 'next';
import SpeakingClient from '@/components/SpeakingClient';

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Talks on shipping AI that actually works in production — Michael Legemah speaks to engineering teams and conferences about agentic systems, RAG architecture, and eval-driven development.',
};

export default function SpeakingPage() {
  return <SpeakingClient />;
}
