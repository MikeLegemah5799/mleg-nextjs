import type { Metadata } from 'next';
import RagPipelineClient from '@/components/RagPipelineClient';

export const metadata: Metadata = {
  title: 'The RAG Reference Pipeline — Decisions, Actually Implemented',
  description: 'A tested RAG pipeline built from the nine decisions in the RAG Architecture Decision Template — structure-aware chunking, hybrid retrieval, and negation-aware groundedness, not another generic boilerplate. Free to clone and run against your own documents.',
};

export default function RagPipelinePage() {
  return <RagPipelineClient />;
}
