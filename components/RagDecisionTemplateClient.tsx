'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import { LOGO_URL } from '@/lib/constants';
import s from '@/styles/rag-decision-template.module.css';

const CHECKOUT_URL = 'https://buy.stripe.com/4gMbIU2c9aNm90Nb7gf7i02';

const DECISION_PREVIEW = [
  {
    num: '1',
    title: 'Chunking Strategy',
    desc: "How you split source documents determines what's even possible to retrieve later. Get this wrong and no amount of embedding-model quality fixes it downstream.",
    options: [
      { label: 'Fixed-size (e.g. 512 tokens, with overlap)', text: 'simple and predictable, but cuts across semantic boundaries — a sentence can end right before the section explaining it.' },
      { label: 'Recursive / structure-aware (split on headers, then size limit)', text: 'preserves logical units; more implementation work, meaningfully better retrieval precision.' },
      { label: 'Semantic (group by embedding-similarity shifts)', text: 'highest fidelity to meaning, highest compute cost to build and maintain the index.' },
      { label: 'Document-native (one chunk per clause/section/row)', text: "best for already-structured documents — contracts, tickets, tabular data; doesn't generalize to prose." },
    ],
    heuristic: "Default to recursive/structure-aware unless your source documents are already highly structured — then chunk along their native structure instead of imposing an artificial one.",
  },
  {
    num: '2',
    title: 'Embedding Model Choice',
    desc: "The embedding model defines the geometry your entire retrieval system operates in. Swapping it later means re-indexing everything — it isn't a config change.",
    options: [
      { label: 'General-purpose commercial (OpenAI, Voyage)', text: 'strong baseline, zero lock-in to run, ongoing per-query cost at scale.' },
      { label: 'Open-weight, self-hosted (BGE, E5, GTE)', text: 'no per-query cost at scale, but you own serving infrastructure and latency.' },
      { label: 'Domain-tuned / fine-tuned', text: 'best retrieval for specialized vocabulary (legal, medical, internal jargon) — but needs labeled data and retraining discipline.' },
      { label: 'Multilingual', text: "required for multi-language corpora — an easy detail to miss until it's a launch blocker." },
    ],
    heuristic: "Default to a strong general-purpose commercial embedding unless a labeled eval set already shows domain-tuned outperforming on your domain. Don't fine-tune before you can measure the lift.",
  },
];

const WHO_ITS_FOR = [
  {
    accent: 'cyan',
    text: (
      <>
        <strong>
          You&apos;re about to build a RAG pipeline and don&apos;t want the chunking
          strategy decided by whatever the first tutorial you read happened to use.
        </strong>{' '}
        These decisions compound — get them wrong early and no model swap fixes it
        later.
      </>
    ),
  },
  {
    accent: 'pink',
    text: (
      <>
        <strong>
          You already shipped RAG and answers are occasionally wrong in a way nobody
          can quite explain.
        </strong>{' '}
        Most of the time the cause is one of these nine decisions, made by default,
        never revisited.
      </>
    ),
  },
  {
    accent: 'green',
    text: (
      <>
        <strong>
          You&apos;re inheriting someone else&apos;s retrieval pipeline and need to
          understand what was actually decided
        </strong>{' '}
        — not guess from the code, but see the tradeoffs and reasoning laid out in one
        place.
      </>
    ),
  },
];

const DECISIONS = [
  { accent: 'catCyan', label: 'Chunking Strategy' },
  { accent: 'catCyan', label: 'Embedding Model Choice' },
  { accent: 'catOrange', label: 'Vector Store / Index' },
  { accent: 'catOrange', label: 'Retrieval Strategy' },
  { accent: 'catYellow', label: 'Query Transformation' },
  { accent: 'catYellow', label: 'Context Assembly' },
  { accent: 'catCyan', label: 'Groundedness / Citation Verification' },
  { accent: 'catCyan', label: 'Freshness & Re-indexing' },
];

export default function RagDecisionTemplateClient() {
  const whoRef = useReveal();
  const decisionRef = useReveal();

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
              <div className={s.eyebrow}>{'// AI RELIABILITY · DECISION TEMPLATE'}</div>
              <h1 className={s.heroTitle}>
                Nine Decisions That Make or Break Your RAG Pipeline
              </h1>
              <p className={s.heroDesc}>
                A working template for the architecture decisions most teams make by
                accident in week one — chunking, embedding, retrieval strategy — and
                never revisit.{' '}
                <strong>
                  Each decision includes real tradeoffs, a heuristic, and a place to
                  record your call.
                </strong>
              </p>
              <div className={s.heroCtaRow}>
                <a className={s.btnPrimary} href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Get the Template — $59
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
                  <span className={s.pdfNum}>Decisions 1–2 of 9</span>
                </div>
                <div className={s.pdfList}>
                  {DECISION_PREVIEW.map((d) => (
                    <div className={s.pdfDecision} key={d.num}>
                      <div className={s.pdfDecisionHead}>
                        <span className={s.pdfDecisionNum}>{d.num}</span>
                        <span className={s.pdfDecisionTitle}>{d.title}</span>
                      </div>
                      <p className={s.pdfDecisionDesc}>{d.desc}</p>
                      <ul className={s.pdfOptions}>
                        {d.options.map((o) => (
                          <li className={s.pdfOption} key={o.label}>
                            <strong>{o.label}:</strong> {o.text}
                          </li>
                        ))}
                      </ul>
                      <div className={s.pdfHeuristic}>
                        <span className={s.pdfHeuristicLabel}>Heuristic</span>
                        <span className={s.pdfHeuristicText}>{d.heuristic}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={s.pdfFootRow}>
                  <span>The RAG Architecture Decision Template</span>
                  <span>mleg.tech</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── WHO IT'S FOR ── */}
          <div className={s.lightSection} id="who">
            <div className={s.lightInner}>
              <div className={s.label}>{'// who this is for'}</div>
              <h2 className={s.title}>
                Built for the team about to write retrieval code — or the one that
                already did.
              </h2>

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
                Most RAG systems don&apos;t fail because of the model.{' '}
                <span className={s.whyHighlight}>
                  They fail because of nine decisions made in the first week
                </span>{' '}
                — and never written down, so nobody can tell you why they were made
                that way.
              </p>
            </div>
          </div>

          {/* ── WHAT'S INSIDE ── */}
          <div className={s.lightSection} id="whats-inside">
            <div className={s.lightInner}>
              <div className={s.label}>{'// what\'s inside'}</div>
              <h2 className={s.title}>Nine decisions. Real tradeoffs. A place to record your call.</h2>

              <div className={s.decisionGrid} ref={decisionRef}>
                {DECISIONS.map((d, i) => (
                  <div className={s.decisionCard} key={d.label}>
                    <span className={`${s.decisionNum} ${s[d.accent]}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={s.decisionLabel}>{d.label}</span>
                  </div>
                ))}
              </div>

              <p className={s.moreNote}>
                Plus decision nine — evaluation — and a closing note on how the nine
                decisions interact.
              </p>
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
                  keeps them honest. This template comes from the same
                  retrieval-architecture decisions he&apos;s made and revisited
                  directly inside real production systems, not from a summary of
                  someone else&apos;s blog posts.
                </p>
              </div>

              <hr className={s.aboutDivider} />

              <div className={s.finalCta}>
                <p className={s.finalCtaTagline}>
                  Nine decisions. One sitting. A documented reason for every one of
                  them.
                </p>
                <a className={s.btnPrimary} href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Get the Template — $59
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
          <div className={s.footerCopy}>The RAG Architecture Decision Template — built by Michael Legemah</div>
          <div className={s.footerMark}>mleg.tech</div>
        </footer>
      </div>
    </>
  );
}
