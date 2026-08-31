'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import { LOGO_URL } from '@/lib/constants';
import s from '@/styles/reliability-audit.module.css';

const CHECKOUT_URL = 'https://buy.stripe.com/dRm28k1855t2ccZdfof7i01';

const CHECKLIST_PREVIEW = [
  {
    main: 'You have a labeled eval set, not just anecdotal examples.',
    sub: 'A collection of real or representative inputs with known-good expected behavior, versioned like code.',
  },
  {
    main: 'Eval runs are part of your CI pipeline, not a manual pre-launch ritual.',
    sub: 'If evals only run when someone remembers to run them, they will eventually not run.',
  },
  {
    main: 'You test against adversarial and edge-case inputs, not just happy-path examples.',
    sub: 'Malformed input, contradictory context, and off-topic requests all belong in your eval set.',
  },
  {
    main: 'LLM-as-judge scoring, where used, has been validated against human judgment.',
    sub: "A judge model that hasn't been checked against real human ratings is an unverified assumption, not a metric.",
  },
  {
    main: 'You have regression tests for previously-fixed failure modes.',
    sub: 'A bug that was fixed once and never turned into a test case is a bug that will recur silently.',
  },
  {
    main: 'Eval scores are tracked over time, not just checked at a single point.',
    sub: 'A model or prompt change that quietly degrades quality months later is invisible without a trend line.',
  },
  {
    main: "Someone other than the system's builder has reviewed the eval set for blind spots.",
    sub: "The person who built the system is the worst-positioned person to notice what it's not being tested for.",
  },
];

const WHO_ITS_FOR = [
  {
    accent: 'cyan',
    text: (
      <>
        <strong>You&apos;ve shipped an LLM feature and have a nagging feeling you don&apos;t
          actually know where it&apos;s fragile.</strong>{' '}
        The demo worked. Production is a different question, and nobody&apos;s answered it yet.
      </>
    ),
  },
  {
    accent: 'pink',
    text: (
      <>
        <strong>You found out about an AI failure from a customer, a Slack screenshot, or
          a support ticket — not from your own monitoring.</strong>{' '}
        If that&apos;s happened once, it will happen again in the same blind spot.
      </>
    ),
  },
  {
    accent: 'green',
    text: (
      <>
        <strong>You&apos;re about to ship an agent, RAG pipeline, or AI copilot and want a
          real gap-check before launch</strong>{' '}
        — not a checklist that stops at &quot;did we write a good system prompt.&quot;
      </>
    ),
  },
];

const CATEGORIES = [
  {
    accent: 'catCyan',
    label: 'Evaluation & Testing',
    desc: 'Whether your eval set actually catches adversarial input, or only ever sees the happy path your demo used.',
  },
  {
    accent: 'catPink',
    label: 'Guardrails & Safety',
    desc: 'The fail-open-vs-fail-closed decision most teams never make on purpose, and what happens the first time it matters.',
  },
  {
    accent: 'catGreen',
    label: 'Grounding & Retrieval',
    desc: "The exact citation-checking bug that makes a system confidently cite a fact a document explicitly says doesn't exist.",
  },
  {
    accent: 'catOrange',
    label: 'Observability & Monitoring',
    desc: 'Why "the request succeeded" and "the answer was right" are different metrics, and why most dashboards only track the first one.',
  },
];

export default function ReliabilityAuditClient() {
  const whoRef = useReveal();
  const categoryRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <div className={s.wrap}>
        {/* ── LOCAL HEADER ── */}
        <header className={s.header}>
          <nav className={s.headerNav}>
            <a href="#who">Who it&apos;s for</a>
            <a href="#whats-inside">What&apos;s inside</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <main>
          {/* ── HERO ── */}
          <section className={s.hero}>
            <div className={s.heroLeft}>
              <div className={s.eyebrow}>{'// AI RELIABILITY · SELF-ASSESSMENT CHECKLIST'}</div>
              <h1 className={s.heroTitle}>
                Find Your AI&apos;s Failure Points Before Your Users Do
              </h1>
              <p className={s.heroDesc}>
                A 50-point self-assessment checklist for teams shipping agents, RAG, and AI
                copilots — built to surface the exact reliability gaps that traditional
                testing and APM can&apos;t see, before they become a production incident.
              </p>
              <div className={s.heroCtaRow}>
                <a className={s.btnPrimary} href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Get the Checklist — $49
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
                <div className={s.pdfHeadRow}>
                  <span className={s.pdfNum}>01</span>
                  <span className={s.pdfHeadTitle}>Evaluation &amp; Testing</span>
                </div>
                <div className={s.pdfList}>
                  {CHECKLIST_PREVIEW.map((item) => (
                    <div className={s.pdfItem} key={item.main}>
                      <span className={s.pdfCheckbox} />
                      <div className={s.pdfItemText}>
                        <div className={s.pdfItemMain}>{item.main}</div>
                        <div className={s.pdfItemSub}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={s.pdfFootRow}>
                  <span>The 50-Point AI Reliability Audit</span>
                  <span>mleg.tech · 01 / Evaluation &amp; Testing</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── WHO IT'S FOR ── */}
          <div className={s.lightSection} id="who">
            <div className={s.lightInner}>
              <div className={s.label}>{'// who this is for'}</div>
              <h2 className={s.title}>
                Built for the team that already shipped, not the one still planning.
              </h2>

              <div className={s.whoGrid} ref={whoRef}>
                {WHO_ITS_FOR.map((item, i) => (
                  <div className={`${s.whoCard} ${s[item.accent]}`} key={i}>
                    <p className={s.whoText}>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* ── WHAT'S INSIDE ── */}
              <div className={s.whatsInside} id="whats-inside">
                <div className={s.label}>{'// what\'s inside'}</div>
                <h2 className={s.title}>Fifty checks. Eight categories. Zero fluff.</h2>

                <div className={s.categoryGrid} ref={categoryRef}>
                  {CATEGORIES.map((c) => (
                    <div className={s.categoryCard} key={c.label}>
                      <div className={`${s.categoryLabel} ${s[c.accent]}`}>{c.label}</div>
                      <p className={s.categoryDesc}>{c.desc}</p>
                    </div>
                  ))}
                </div>

                <p className={s.moreNote}>
                  Plus four more categories covering prompt/model management,
                  human-in-the-loop escalation, deployment, and incident response.
                </p>
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
                  U.S. Space Force. The last several years focused specifically on agentic
                  AI, RAG pipelines, and the evaluation infrastructure that keeps them
                  honest. This checklist comes directly from failures he&apos;s diagnosed
                  and fixed inside real production systems, not from a summary of someone
                  else&apos;s blog posts.
                </p>
              </div>

              <hr className={s.aboutDivider} />

              <div className={s.finalCta}>
                <p className={s.finalCtaTagline}>
                  Fifty checks. One afternoon. A concrete list of what to fix first.
                </p>
                <a className={s.btnPrimary} href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Get the Checklist — $49
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
          <div className={s.footerCopy}>The 50-Point AI Reliability Audit — built by Michael Legemah</div>
          <div className={s.footerMark}>mleg.tech</div>
        </footer>
      </div>
    </>
  );
}
