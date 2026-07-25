import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { JobMatchAnalyzer } from '@/components/JobMatchAnalyzer';

export const metadata: Metadata = {
  title: 'Job Match',
  description:
    'Paste a job description and get an instant, evidence-backed breakdown of how it matches my experience.',
};

export default function JobMatchPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="page-wrap">
        <JobMatchAnalyzer />
      </main>
      <Footer />
    </>
  );
}
