'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/rag-reference-pipeline.module.css';

const GITHUB_URL = 'https://github.com/MikeLegemah5799/rag-reference-pipeline';
const CHECKOUT_URL = 'https://buy.stripe.com/cNi3co9EB5t2a4R2AKf7i04';

const DECISIONS_IMPLEMENTED = [
  { num: '01', label: 'chunking', value: 'structure-aware', accent: 'dcCyan' },
  { num: '02', label: 'embedding', value: 'provider-agnostic', accent: 'dcCyan' },
  { num: '04', label: 'retrieval', value: 'hybrid + RRF', accent: 'dcGreen' },
  { num: '07', label: 'groundedness', value: 'negation-aware', accent: 'dcGreen' },
];

const DECISIONS_TABLE = [
  { num: '1', label: 'Chunking', choice: 'Structure-aware — header-first, size-limited fallback' },
  { num: '2', label: 'Embedding', choice: 'Provider-agnostic interface, offline stub by default' },
  { num: '3', label: 'Vector store', choice: 'In-memory by default, pgvector interface included' },
  { num: '4', label: 'Retrieval', choice: 'Hybrid — dense + BM25, fused with reciprocal rank fusion' },
  { num: '6', label: 'Context assembly', choice: 'Ranked concatenation, explicit seam for your own logic' },
  { num: '7', label: 'Groundedness', choice: 'Negation-aware citation checking, ported from Sentinel' },
];

const STATS = [
  { num: '27', label: 'tests, all exercising real logic — including the exact negation regression case' },
  { num: '0', label: 'API keys required to run the test suite offline' },
  { num: '6', label: 'of 9 template decisions implemented as real, running code' },
];

export default function RagPipelineClient() {
  const statRef = useReveal();
  const pricingRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <div className={s.wrap}>
        {/* ── LOCAL HEADER ── */}
        <header className={s.header}>
          <nav className={s.headerNav}>
            <a href="#decisions">The decisions</a>
            <a href="#pricing">Pricing</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </header>

        <main>
          {/* ── HERO ── */}
          <section className={s.hero}>
            <div className={s.heroLeft}>
              <div className={s.eyebrow}>{'// AI RELIABILITY · RAG REFERENCE IMPLEMENTATION'}</div>
              <h1 className={s.heroTitle}>The RAG Decisions, Actually Implemented</h1>
              <p className={s.heroDesc}>
                A tested RAG pipeline built from the nine decisions in the RAG Architecture
                Decision Template — not another generic boilerplate with the usual defaults
                left unexamined. Free to clone and run against your own documents.
              </p>
              <div className={s.heroCtas}>
                <a className={s.btnPrimary} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  Clone the free tier
                </a>
                <Link className={s.btnOutline} href="/rag-decision-template">
                  Read the decisions first
                </Link>
              </div>
            </div>

            <div className={s.heroRight}>
              <div className={s.decisionsCard}>
                <span className={s.dcHead}>{'// decisions, implemented'}</span>
                <div className={s.dcList}>
                  {DECISIONS_IMPLEMENTED.map((d) => (
                    <div className={s.dcRow} key={d.num}>
                      <span className={s.dcLabel}><span className={s.dcNum}>{d.num}</span>{d.label}</span>
                      <span className={`${s.dcValue} ${s[d.accent]}`}>{d.value}</span>
                    </div>
                  ))}
                </div>
                <div className={s.dcTestsRow}>
                  <span className={s.dcLabel}>tests</span>
                  <span className={`${s.dcValue} ${s.dcGreen}`}>27 passing</span>
                </div>
                <hr className={s.dcDivider} />
                <span className={s.dcNote}>
                  Same negation-aware groundedness algorithm as Sentinel, ported directly —
                  not reinvented. Zero API key required to run the test suite.
                </span>
              </div>
            </div>
          </section>

          {/* ── WHY THIS ISN'T ANOTHER RAG BOILERPLATE ── */}
          <section className={s.section} id="decisions">
            <div className={s.label}>{"// why this isn't another RAG boilerplate"}</div>
            <h2 className={s.title}>
              Every choice here traces back to a numbered decision, not a default nobody
              examined.
            </h2>
            <p className={s.sub}>
              Most starter repos make five decisions without looking at any of them, because
              looking at them is the actual hard part. This one doesn&apos;t.
            </p>

            <div className={s.tableWrap}>
              <div className={s.tableHead}>
                <span>Decision</span>
                <span>Choice made here</span>
              </div>
              {DECISIONS_TABLE.map((d) => (
                <div className={s.tableRow} key={d.num}>
                  <span className={s.tableDecision}>{d.num}. {d.label}</span>
                  <span className={s.tableChoice}>{d.choice}</span>
                </div>
              ))}
            </div>

            <div className={s.statRow} ref={statRef}>
              {STATS.map((st) => (
                <div className={s.statCard} key={st.label}>
                  <div className={s.statNum}>{st.num}</div>
                  <div className={s.statLabel}>{st.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PRICING ── */}
          <div className={s.sectionAlt} id="pricing">
            <div className={s.sectionAltInner}>
              <div className={s.label}>{'// pricing'}</div>
              <h2 className={s.title}>Start free. Pay when it&apos;s carrying real traffic.</h2>
              <p className={s.sub}>
                Same model as Sentinel — the free tier is the actual pipeline, not a crippled
                trial. Clone it, run it against your own documents, decide if the decisions
                fit before you owe anything.
              </p>

              <div className={s.pricingGrid} ref={pricingRef}>
                <div className={s.priceCard}>
                  <div className={s.priceEyebrow}>FREE — EVALUATION LICENSE</div>
                  <div className={s.priceTitle}>Clone &amp; Run</div>
                  <div className={s.priceValue}>$0</div>
                  <p className={s.priceDesc}>
                    Full source, all six implemented decisions, offline stub embedder —
                    everything you need to prove the pattern works before you commit to
                    anything.
                  </p>
                  <ul className={s.priceList}>
                    <li>Structure-aware chunking + hybrid retrieval</li>
                    <li>Negation-aware groundedness checking</li>
                    <li>FastAPI app + 27 passing tests</li>
                    <li>Zero API key required to run tests</li>
                    <li>In-memory vector store</li>
                    <li className={s.priceListMuted}>Not licensed for production traffic</li>
                  </ul>
                  <a className={`${s.btnOutline} ${s.priceCta}`} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    Clone on GitHub
                  </a>
                </div>

                <div className={`${s.priceCard} ${s.priceCardFeatured}`}>
                  <div className={`${s.priceEyebrow} ${s.priceEyebrowCyan}`}>COMMERCIAL LICENSE</div>
                  <div className={s.priceTitle}>Production</div>
                  <div className={s.priceValue}>$149 <span>one-time</span></div>
                  <p className={s.priceDesc}>
                    Everything you need to put this pipeline in front of real documents and
                    real queries, plus guidance for the two production-scale swaps.
                  </p>
                  <ul className={s.priceList}>
                    <li>Everything in Clone &amp; Run</li>
                    <li>License to run in production</li>
                    <li>Walkthrough: wiring a real embedding provider</li>
                    <li>Walkthrough: migrating to pgvector</li>
                    <li>Email support for integration questions</li>
                  </ul>
                  <Link className={`${s.btnPrimary} ${s.priceCta}`} href={CHECKOUT_URL}>
                    Get the license
                  </Link>
                </div>

                <div className={s.priceCard}>
                  <div className={s.priceEyebrow}>DONE WITH YOU</div>
                  <div className={s.priceTitle}>Built for Your Stack</div>
                  <div className={s.priceValue}>From $1,500</div>
                  <p className={s.priceDesc}>
                    The gaps that are genuinely specific to your environment, closed by hand
                    instead of self-serve.
                  </p>
                  <ul className={s.priceList}>
                    <li>Real embedding provider wired to your model</li>
                    <li>pgvector migration against your actual schema</li>
                    <li>Query transformation, if your eval set shows you need it</li>
                    <li>Retrieval tuning against your own documents</li>
                    <li>Architecture review of your broader RAG system</li>
                  </ul>
                  <Link className={`${s.btnOutline} ${s.priceCta}`} href="/contact">
                    Start a conversation
                  </Link>
                </div>
              </div>

              <p className={s.pricingCaption}>
                <span className={s.capCyan}>clone &amp; run</span> proves the decisions work
                on your own documents → <span className={s.capYellow}>production</span> gets
                you shipped fast on your own infra →{' '}
                <span className={s.capPurple}>built for your stack</span>{' '}
                closes what&apos;s genuinely yours to solve, not generic to productize.
              </p>
            </div>
          </div>

          {/* ── FINAL CTA ── */}
          <section className={s.ctaSection}>
            <div className={s.label}>{'// the actual question'}</div>
            <h2 className={s.ctaTitle}>
              If your RAG system is already misbehaving and nobody remembers why chunking was
              set up that way —
            </h2>
            <p className={s.ctaSub}>
              it&apos;s not whether the decisions were made. It&apos;s whether they were made
              on purpose, and written down anywhere.
            </p>
            <div className={s.ctaCtas}>
              <a className={s.btnPrimary} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                Clone the free tier
              </a>
              <Link className={s.btnOutline} href="/rag-decision-template">
                Read the Decision Template
              </Link>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer className={s.footer}>
          <div className={s.footerCopy}>RAG Reference Pipeline — built by Michael Legemah</div>
          <a className={s.footerLink} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </>
  );
}
