'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LOGO_URL } from '@/lib/constants';
import s from '@/styles/agent-orchestration-patterns-download.module.css';

const PDF_URL = '/downloads/Agent-Orchestration-Patterns.pdf';

export default function AgentOrchestrationPatternsDownloadClient() {
  return (
    <div className={s.wrap}>
      <header className={s.header}>
        <Link href="/" className={s.logo}>
          <Image src={LOGO_URL} alt="mleg.tech" width={24} height={24} />
          <span className={s.logoText}>mleg.tech</span>
        </Link>
      </header>

      <main className={s.main}>
        <section className={s.confirm}>
          <div className={s.checkRing}>
            <svg className={s.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className={s.eyebrow}>{'// payment confirmed'}</div>
          <h1 className={s.confirmTitle}>You&apos;re in. Here&apos;s your download.</h1>
          <p className={s.confirmDesc}>
            Your copy of Agent Orchestration Patterns is ready. Click below to
            download the PDF — it&apos;s yours to keep, print, and use with your team.
          </p>
          <a className={s.btnPrimary} href={PDF_URL} download="Agent-Orchestration-Patterns.pdf">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <polyline points="7 11 12 16 17 11" />
              <path d="M5 20h14" />
            </svg>
            Download the Reference (PDF)
          </a>
          <div className={s.hint}>Bookmark this page in case you need it again.</div>
        </section>

        <hr className={s.divider} />

        <section>
          <div className={s.secondaryLabel}>{'// while you\'ve got five minutes'}</div>

          <div className={s.card}>
            <div className={s.cardEyebrow}>Sentinel — an eval-as-MCP-server trust layer</div>
            <h2 className={s.cardTitle}>See pattern five — deterministic-first escalation — as working code</h2>
            <p className={s.cardDesc}>
              A deterministic-first, judge-escalated scoring layer that catches
              fabricated citations and prompt-injection compliance before a response
              ships — the exact escalation ladder from this reference, running for
              real. Free to clone and run against your own agent.
            </p>
            <Link className={s.cardLink} href="/sentinel">mleg.tech/sentinel</Link>
          </div>

          <p className={s.note}>
            Once you&apos;ve mapped your own system onto these five patterns, if the
            seam that&apos;s breaking turns out to be one nobody on the team can agree
            how to fix, that&apos;s usually a design-review gap, not a code-review one —
            the most common reason I get brought in directly. If that ends up being
            where you land, <Link href="/contact">reach out</Link>.
          </p>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerText}>Michael Legemah · Principal AI Engineer · mleg.tech</div>
      </footer>
    </div>
  );
}
