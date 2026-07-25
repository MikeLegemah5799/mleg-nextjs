import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Michael Legemah — Principal AI Engineer available for AI engineering projects, consulting engagements, and fractional principal engineer roles.',
};

export default function ContactPage() {
  return <ContactClient />;
}
