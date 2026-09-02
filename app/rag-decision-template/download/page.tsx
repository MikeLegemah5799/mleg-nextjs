import type { Metadata } from 'next';
import RagDecisionTemplateDownloadClient from '@/components/RagDecisionTemplateDownloadClient';

export const metadata: Metadata = {
  title: 'Your Download',
  description: 'Download The RAG Architecture Decision Template.',
  robots: { index: false, follow: false },
};

export default function RagDecisionTemplateDownloadPage() {
  return <RagDecisionTemplateDownloadClient />;
}
