import type { Metadata } from 'next';
import ProjectsClient from '@/components/ProjectsClient';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/projects', {
  title: 'Projects',
  description: 'Selected engineering projects and case studies from Michael Legemah, Principal AI Engineer — AI systems, enterprise platforms, civic tech, and e-commerce for AWS, As, US Space Force, and more.',
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
