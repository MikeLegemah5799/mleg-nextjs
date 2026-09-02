'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import { LOGO_URL } from '@/lib/constants';
import s from '@/styles/agent-orchestration-patterns.module.css';

const CHECKOUT_URL = 'https://buy.stripe.com/aFaeV6cQNcVu5OB4ISf7i03';

const PATTERNS = [
  { n: '01', accent: 'cyan', name: 'Supervisor / Worker', desc: 'one router, several specialists' },
  { n: '02', accent: 'green', name: 'Sequential Handoff', desc: 'a linear pipeline of specialists' },
  { n: '03', accent: 'orange', name: 'Parallel Fan-Out / Fan-In', desc: 'split the work, merge the results' },
  { n: '04', accent: 'pink', name: 'Human-in-the-Loop Approval Gate', desc: 'pause before anything irreversible' },
  {
    n: '05',
    accent: 'cyan',
    name: 'Deterministic-First Escalation',
    desc: 'cheap checks first, model calls only when needed',
    target: true,
  },
];

const WHEN_TO_USE = [
  'Most inputs are actually easy to classify correctly with simple, explainable logic.',
  "Cost or latency budget can't tolerate a model call on every single request.",
  'Confident decisions need to be auditable without pointing at an opaque model output.',
];

const WHERE_IT_BREAKS = [
  'Deterministic rules calibrated once quietly drift out of sync with real traffic as it changes.',
  'No timeout policy on the judge call turns "escalate when ambiguous" into "hang when ambiguous."',
  'Treating the fallback (fail-open vs. fail-closed) as a technical detail instead of a real product decision.',
];

const WHO_ITS_FOR = [
  {
    accent: 'cyan',
    text: (
      <>
        <strong>
          You&apos;re designing a multi-agent system and want to pick a coordination
          pattern on purpose
        </strong>{' '}
        — not default into whichever one the first tutorial you read happened to use.
      </>
    ),
  },
  {
    accent: 'pink',
    text: (
      <>
        <strong>You already shipped agents and something&apos;s breaking at a seam</strong>{' '}
        — a handoff nobody defined, a routing decision nobody&apos;s confident in, a
        review step that stalls silently.
      </>
    ),
  },
  {
    accent: 'green',
    text: (
      <>
        <strong>
          You&apos;re reviewing someone else&apos;s agentic architecture and need a
          fast way to name what pattern it&apos;s actually using
        </strong>{' '}
        — and whether that was a deliberate choice.
      </>
    ),
  },
];

export default function AgentOrchestrationPatternsClient() {
  const whoRef = useReveal();
  const patternsRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <div className={s.wrap}>
        {/* ── LOCAL HEADER ── */}
        <header className={s.header}>
          <nav className={s.headerNav}>
            <a href="#who">Who it&apos;s for</a>
            <a href="#patterns">The five patterns</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <main>
          {/* ── HERO ── */}
          <section className={s.hero}>
            <div className={s.heroLeft}>
              <div className={s.eyebrow}>{'// AI RELIABILITY · ORCHESTRATION REFERENCE'}</div>
              <h1 className={s.heroTitle}>Five Ways Multi-Agent Systems Actually Fail</h1>
              <p className={s.heroDesc}>
                A diagram-forward reference for the coordination patterns behind most
                production agentic systems — when to use each one, and{' '}
                <strong>
                  the specific way each one tends to break once it&apos;s carrying real
                  traffic.
                </strong>
              </p>
              <div className={s.heroCtaRow}>
                <a className={s.btnPrimary} href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Get the Reference — $49
                </a>
                <div className={s.instantNote}>Instant PDF download</div>
                <div className={s.trustLine}>
                  <span>Secure checkout via Stripe</span>
                  <span>Instant download</span>
                  <span>No spam — ever</span>
                </div>
              </div>
            </div>

            <div className={s.heroRight}>
              <div className={s.pdfCard}>
                <div className={s.pdfCardEyebrow}>Pattern 5 of 5</div>
                <div className={s.pdfPatternHead}>
                  <span className={s.pdfPatternNum}>05</span>
                  <h2 className={s.pdfPatternTitle}>Deterministic-First Escalation</h2>
                </div>
                <p className={s.pdfPatternDesc}>
                  Cheap, explainable checks try to resolve a request with high
                  confidence first. Only the genuinely ambiguous middle escalates to a
                  model call — keeping the common case fast, cheap, and auditable.
                </p>

                <div className={s.diagram}>
                  <span className={s.diagramNode}>Request</span>
                  <span className={s.diagramArrow}>↓</span>
                  <span className={`${s.diagramNode} ${s.diagramNodeCheck}`}>Deterministic Check</span>
                  <span className={s.diagramSplit}>
                    <span className={s.diagramArrowLeft}>↙</span>
                    <span className={s.diagramArrowRight}>↘</span>
                  </span>
                  <div className={s.diagramRow}>
                    <span className={`${s.diagramNode} ${s.diagramNodeGreen}`}>Confident Verdict</span>
                    <span className={`${s.diagramNode} ${s.diagramNodeDark}`}>
                      Judge Call
                      <span className={s.diagramNodeSub}>ambiguous case</span>
                    </span>
                  </div>
                </div>

                <div className={s.pdfColumns}>
                  <div className={s.pdfColumn}>
                    <div className={s.pdfColumnLabel}>When to use this</div>
                    <ul className={s.pdfList}>
                      {WHEN_TO_USE.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={s.pdfColumn}>
                    <div className={s.pdfColumnLabel}>Where it breaks</div>
                    <ul className={s.pdfList}>
                      {WHERE_IT_BREAKS.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={s.pdfInPractice}>
                  <span className={s.pdfInPracticeLabel}>In practice</span>
                  <span className={s.pdfInPracticeText}>
                    This is Sentinel&apos;s actual architecture — <code>flag_injection</code>{' '}
                    and <code>check_groundedness</code> both use exactly this escalation
                    ladder. See <Link href="/sentinel">Sentinel</Link> for the working code.
                  </span>
                </div>

                <div className={s.pdfFootRow}>
                  <span>Agent Orchestration Patterns</span>
                  <span>mleg.tech</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── WHO IT'S FOR ── */}
          <div className={s.lightSection} id="who">
            <div className={s.lightInner}>
              <div className={s.label}>{'// who this is for'}</div>
              <h2 className={s.title}>Built for the team past the single-agent demo.</h2>

              <div className={s.whoGrid} ref={whoRef}>
                {WHO_ITS_FOR.map((item, i) => (
                  <div className={`${s.whoCard} ${s[item.accent]}`} key={i}>
                    <p className={s.whoText}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── WHY THIS EXISTS ── */}
          <div className={s.whySection}>
            <div className={s.whyInner}>
              <div className={s.label}>{'// why this exists'}</div>
              <p className={s.whyStatement}>
                Most agentic systems don&apos;t fail because a single agent reasoned
                poorly. <span className={s.whyHighlight}>They fail at the seams</span> —
                the handoff, the routing decision, the approval gate nobody actually
                built.
              </p>
            </div>
          </div>

          {/* ── THE FIVE PATTERNS ── */}
          <div className={s.lightSection} id="patterns">
            <div className={s.lightInner}>
              <div className={s.label}>{'// the five patterns'}</div>
              <h2 className={s.title}>
                Each one gets a diagram, when to use it, and where it breaks.
              </h2>

              <div className={s.patternsList} ref={patternsRef}>
                {PATTERNS.map((p) => (
                  <div
                    className={`${s.patternRow} ${s[p.accent]} ${p.target ? s.patternRowTarget : ''}`}
                    key={p.n}
                  >
                    <span className={s.patternRowNum}>{p.n}</span>
                    <span className={s.patternRowText}>
                      <strong>{p.name}</strong> — {p.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ABOUT + FINAL CTA ── */}
          <div className={s.aboutSection} id="about">
            <div className={s.aboutInner}>
              <div className={s.aboutRow}>
                <div className={s.avatar}>
                  <Image src={LOGO_URL} alt="Michael Legemah" width={42} height={42} />
                </div>
                <p className={s.bioText}>
                  <strong>Michael Legemah</strong>{' '}
                  is a Principal AI Engineer who has spent
                  over a decade building production systems for AWS, the U.S. Army, and
                  U.S. Space Force — the last several years focused specifically on
                  agentic AI, RAG pipelines, and the evaluation infrastructure that
                  keeps them honest. Pattern five in this reference is the actual
                  architecture behind Sentinel, his own free eval-as-MCP-server tool —
                  not a diagram borrowed from someone else&apos;s writeup.
                </p>
              </div>

              <hr className={s.aboutDivider} />

              <div className={s.finalCta}>
                <p className={s.finalCtaTagline}>
                  Five patterns. Five diagrams. The failure modes a demo won&apos;t show
                  you.
                </p>
                <a className={s.btnPrimary} href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Get the Reference — $49
                </a>
                <div className={s.finalTrustLine}>
                  <span>Secure checkout via Stripe</span>
                  <span>Instant download</span>
                  <span>No spam — ever</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className={s.footer}>
          <div className={s.footerCopy}>Agent Orchestration Patterns — built by Michael Legemah</div>
          <div className={s.footerMark}>mleg.tech</div>
        </footer>
      </div>
    </>
  );
}
