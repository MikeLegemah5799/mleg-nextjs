import type { Metadata } from 'next';
import RagDecisionTemplateClient from '@/components/RagDecisionTemplateClient';

export const metadata: Metadata = {
  title: 'The RAG Architecture Decision Template',
  description: 'A working template for the nine architecture decisions most teams make by accident in week one — chunking, embedding, retrieval strategy, and more — each with real tradeoffs, a heuristic, and a place to record your call.',
};

export default function RagDecisionTemplatePage() {
  return <RagDecisionTemplateClient />;
}
