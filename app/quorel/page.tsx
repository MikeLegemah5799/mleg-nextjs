import type { Metadata } from 'next';
import SentinelClient from '@/components/SentinelClient';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/quorel', {
  title: 'Quorel — Eval-as-MCP-Server',
  description: 'An MCP server that scores agent responses mid-turn, before a response ships, not after. Catches fabricated citations and prompt-injection compliance with a deterministic-first, judge-escalated pipeline.',
});

export default function SentinelPage() {
  return <SentinelClient />;
}
