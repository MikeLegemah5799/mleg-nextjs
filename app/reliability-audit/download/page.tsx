import type { Metadata } from 'next';
import ReliabilityAuditDownloadClient from '@/components/ReliabilityAuditDownloadClient';

export const metadata: Metadata = {
  title: 'Your Download',
  description: 'Download The 50-Point AI Reliability Audit.',
  robots: { index: false, follow: false },
};

export default function ReliabilityAuditDownloadPage() {
  return <ReliabilityAuditDownloadClient />;
}
