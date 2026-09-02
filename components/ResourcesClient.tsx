'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/resources.module.css';

const RESOURCES = [
  {
    accent: 'cyan',
    label: 'Eval & Reliability',
    title: 'The 50-Point AI Reliability Audit',
    desc: 'A working self-assessment checklist across eight categories — evaluation, guardrails, grounding, observability, and more — for teams that want to find their own gaps before a customer does.',
    price: '$49',
    format: 'PDF',
    href: '/reliability-audit',
  },
  {
    accent: 'green',
    label: 'RAG',
    title: 'The RAG Architecture Decision Template',
    desc: 'Nine architecture decisions that determine whether a retrieval pipeline actually works — chunking, embedding, retrieval strategy, and more — each with tradeoffs and a place to record your call.',
    price: '$59',
    format: 'PDF',
    href: '/rag-decision-template',
  },
  {
    accent: 'purple',
    label: 'Orchestration',
    title: 'Agent Orchestration Patterns',
    desc: 'Five multi-agent coordination patterns — supervisor/worker, sequential handoff, and more — each with a diagram, when to use it, and the specific way it tends to break in production.',
    price: '$49',
    format: 'PDF',
    href: '/agent-orchestration-patterns',
  },
  {
    accent: 'orange',
    label: 'Observability',
    title: 'The AI Observability Maturity Model',
    desc: 'Five levels, from no visibility into what your AI actually said, to a closed loop that catches quality drift before a customer does. Find your level in one page.',
    price: 'FREE',
    format: 'PDF',
    href: '/observability',
    free: true,
  },
];

export default function ResourcesClient() {
  const gridRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <div className={s.wrap}>
        <main>
          {/* ── HERO ── */}
          <section className={s.hero}>
            <div className={s.heroInner}>
              <div className={s.eyebrow}>{'// FREE & PAID RESOURCES'}</div>
              <h1 className={s.heroTitle}>
                Tools and references for teams shipping AI in production
              </h1>
              <p className={s.heroDesc}>
                Working code, checklists, and decision templates — built from the same
                reliability problems solved directly inside real production systems,
                not written as generic advice. Start with what&apos;s free; go deeper
                where it&apos;s worth paying for.
              </p>
            </div>
          </section>

          {/* ── RESOURCES ── */}
          <div className={s.lightSection}>
            <div className={s.lightInner}>
              {/* ── FEATURED: SENTINEL ── */}
              <Link href="/sentinel" className={s.featured}>
                <div className={s.featuredTop}>
                  <div className={s.featuredLabel}>{'// free, open source'}</div>
                  <span className={s.featuredBadge}>Free repo</span>
                </div>
                <h2 className={s.featuredTitle}>Sentinel — an eval-as-MCP-server trust layer</h2>
                <p className={s.featuredDesc}>
                  A deterministic-first, judge-escalated scoring layer that catches
                  fabricated citations and prompt-injection compliance before a
                  response ships. Free to clone and run against your own agent —
                  commercial license available for production use.
                </p>
                <span className={s.featuredLink}>View on mleg.tech →</span>
              </Link>

              {/* ── FEATURED: RAG REFERENCE PIPELINE ── */}
              <Link href="/rag-reference-pipeline" className={s.featured}>
                <div className={s.featuredTop}>
                  <div className={s.featuredLabel}>{'// free, open source'}</div>
                  <span className={s.featuredBadge}>Free repo</span>
                </div>
                <h2 className={s.featuredTitle}>The RAG Reference Pipeline</h2>
                <p className={s.featuredDesc}>
                  A tested RAG pipeline built from the nine decisions in the RAG
                  Architecture Decision Template — structure-aware chunking, hybrid
                  retrieval, and the same negation-aware groundedness check as
                  Sentinel. Free to clone and run against your own documents —
                  commercial license available for production use.
                </p>
                <span className={s.featuredLink}>View on mleg.tech →</span>
              </Link>

              {/* ── RESOURCE GRID ── */}
              <div className={s.grid} ref={gridRef}>
                {RESOURCES.map((r) => (
                  <Link href={r.href} className={`${s.card} ${s[r.accent]}`} key={r.href}>
                    <div className={s.cardLabel}>{r.label}</div>
                    <h3 className={s.cardTitle}>{r.title}</h3>
                    <p className={s.cardDesc}>{r.desc}</p>
                    <div className={s.cardFoot}>
                      <span className={r.free ? s.cardPriceFree : s.cardPrice}>
                        {r.price} · {r.format}
                      </span>
                      <span className={s.cardLink}>Get it →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className={s.footer}>
          <div className={s.footerCopy}>Resources — built by Michael Legemah</div>
          <div className={s.footerMark}>mleg.tech</div>
        </footer>
      </div>
    </>
  );
}
