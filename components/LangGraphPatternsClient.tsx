'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/langgraph-patterns.module.css';

const GITHUB_URL = 'https://github.com/MikeLegemah5799/langgraph-patterns';
const CHECKOUT_URL = 'https://buy.stripe.com/eVqeV63gd3kU4Kx1wGf7i05';

const PATTERNS_RUNNING = [
  { num: '01', label: 'supervisor/worker', value: 'real routing', accent: 'pcCyan' },
  { num: '04', label: 'human-in-the-loop', value: 'real interrupt()', accent: 'pcPink' },
  { num: '05', label: 'det.-first escalation', value: "Sentinel's algorithm", accent: 'pcPurple' },
];

const PATTERN_CARDS = [
  {
    num: '01',
    accent: 'cyan',
    title: 'Supervisor / Worker',
    desc: (
      <>
        Real conditional routing via a shared decision interface — not a diagram&apos;s
        arrows, an actual <code>add_conditional_edges</code> call deciding where
        execution goes next.
      </>
    ),
  },
  {
    num: '04',
    accent: 'pink',
    title: 'Human-in-the-Loop',
    desc: (
      <>
        Genuine pause-and-resume via LangGraph&apos;s <code>interrupt()</code> and{' '}
        <code>Command(resume=...)</code> — execution actually suspends mid-graph and
        picks back up exactly where it stopped.
      </>
    ),
  },
  {
    num: '05',
    accent: 'purple',
    title: 'Deterministic-First Escalation',
    desc: 'The same negation-aware algorithm as Sentinel, this time as a real conditional edge between the deterministic check and the judge node.',
  },
];

const STATS = [
  { num: '19', label: 'tests, including a real pause/resume verification, not just interface checks' },
  { num: '2', label: 'real bugs found and fixed while building this — see the README' },
  { num: '0', label: 'API keys required to run the test suite offline' },
];

export default function LangGraphPatternsClient() {
  const patternRef = useReveal();
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
            <a href="#patterns">The patterns</a>
            <a href="#pricing">Pricing</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </header>

        <main>
          {/* ── HERO ── */}
          <section className={s.hero}>
            <div className={s.heroLeft}>
              <div className={s.eyebrow}>{'// AI RELIABILITY · LANGGRAPH REFERENCE'}</div>
              <h1 className={s.heroTitle}>Three Orchestration Patterns, Actually Running</h1>
              <p className={s.heroDesc}>
                Real, compiled, tested LangGraph graphs for three of the five patterns in
                Agent Orchestration Patterns — including a genuine pause-and-resume
                approval gate, not a polling loop pretending to be one. Free to clone and
                run.
              </p>
              <div className={s.heroCtas}>
                <a className={s.btnPrimary} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  Clone the free tier
                </a>
                <Link className={s.btnOutline} href="/agent-orchestration-patterns">
                  Read the patterns first
                </Link>
              </div>
            </div>

            <div className={s.heroRight}>
              <div className={s.patternsCard}>
                <span className={s.pcHead}>{'// patterns, running'}</span>
                <div className={s.pcList}>
                  {PATTERNS_RUNNING.map((p) => (
                    <div className={s.pcRow} key={p.num}>
                      <span className={s.pcLabel}><span className={s.pcNum}>{p.num}</span>{p.label}</span>
                      <span className={`${s.pcValue} ${s[p.accent]}`}>{p.value}</span>
                    </div>
                  ))}
                </div>
                <div className={s.pcTestsRow}>
                  <span className={s.pcLabel}>tests</span>
                  <span className={`${s.pcValue} ${s.pcGreen}`}>19 passing</span>
                </div>
                <hr className={s.pcDivider} />
                <span className={s.pcNote}>
                  Same negation-aware escalation ladder as Sentinel and RAG Reference
                  Pipeline — the third implementation of the same regression-tested logic.
                  Zero API key required to run the tests.
                </span>
              </div>
            </div>
          </section>

          {/* ── WHY A DIAGRAM WASN'T ENOUGH ── */}
          <section className={s.section} id="patterns">
            <div className={s.label}>{"// why a diagram wasn't enough"}</div>
            <h2 className={s.title}>
              Some parts of a coordination pattern don&apos;t survive being drawn.
            </h2>
            <p className={s.sub}>
              A diagram can show a supervisor routing to a worker. It can&apos;t show what
              actually happens to a graph&apos;s execution state while it&apos;s paused
              waiting on a human. This pack exists for the parts that only show up when
              the code runs.
            </p>

            <div className={s.patternGrid} ref={patternRef}>
              {PATTERN_CARDS.map((p) => (
                <div className={`${s.patternCard} ${s[p.accent]}`} key={p.num}>
                  <div className={s.patternNum}>{p.num}</div>
                  <div className={s.patternTitle}>{p.title}</div>
                  <p className={s.patternDesc}>{p.desc}</p>
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
                Same model as Sentinel and RAG Reference Pipeline — the free tier is the
                actual patterns, not a crippled trial. Clone it, run it against your own
                use case, decide if it fits before you owe anything.
              </p>

              <div className={s.pricingGrid} ref={pricingRef}>
                <div className={s.priceCard}>
                  <div className={s.priceEyebrow}>FREE — EVALUATION LICENSE</div>
                  <div className={s.priceTitle}>Clone &amp; Run</div>
                  <div className={s.priceValue}>$0</div>
                  <p className={s.priceDesc}>
                    Full source for all three patterns, the shared AgentBrain stub, and 19
                    tests — everything you need to see how these actually run before you
                    commit to anything.
                  </p>
                  <ul className={s.priceList}>
                    <li>Supervisor/Worker with real conditional routing</li>
                    <li>Human-in-the-Loop with real interrupt/resume</li>
                    <li>Deterministic-First Escalation, Sentinel&apos;s algorithm</li>
                    <li>19 passing tests, zero API key required</li>
                    <li className={s.priceListMuted}>Not licensed for production traffic</li>
                  </ul>
                  <a className={`${s.btnOutline} ${s.priceCta}`} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    Clone on GitHub
                  </a>
                </div>

                <div className={`${s.priceCard} ${s.priceCardFeatured}`}>
                  <div className={`${s.priceEyebrow} ${s.priceEyebrowCyan}`}>COMMERCIAL LICENSE</div>
                  <div className={s.priceTitle}>Production</div>
                  <div className={s.priceValue}>$99 <span>one-time</span></div>
                  <p className={s.priceDesc}>
                    Everything you need to put these patterns in front of real traffic,
                    plus guidance for wiring in a real model and a persistent
                    checkpointer.
                  </p>
                  <ul className={s.priceList}>
                    <li>Everything in Clone &amp; Run</li>
                    <li>License to run in production</li>
                    <li>Walkthrough: wiring a real AgentBrain implementation</li>
                    <li>Walkthrough: persistent checkpointer for pattern 4</li>
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
                    The gaps that are genuinely specific to your environment, closed by
                    hand instead of self-serve.
                  </p>
                  <ul className={s.priceList}>
                    <li>Real model wired to your AgentBrain implementation</li>
                    <li>Postgres-backed checkpointer for pattern 4</li>
                    <li>Patterns 2 or 3 built for your specific workflow</li>
                    <li>Combining patterns into one nested graph for your system</li>
                    <li>Architecture review of your broader agentic system</li>
                  </ul>
                  <Link className={`${s.btnOutline} ${s.priceCta}`} href="/contact">
                    Start a conversation
                  </Link>
                </div>
              </div>

              <p className={s.pricingCaption}>
                <span className={s.capCyan}>clone &amp; run</span> proves the patterns work
                for your use case → <span className={s.capYellow}>production</span> gets
                you shipped fast with real infrastructure →{' '}
                <span className={s.capPurple}>built for your stack</span>{' '}
                closes what&apos;s genuinely yours to solve, not generic to productize.
              </p>
            </div>
          </div>

          {/* ── FINAL CTA ── */}
          <section className={s.ctaSection}>
            <div className={s.label}>{'// the actual question'}</div>
            <h2 className={s.ctaTitle}>
              If your multi-agent system is failing at a seam nobody explicitly designed —
            </h2>
            <p className={s.ctaSub}>
              the pattern probably exists already. The question is whether it was chosen
              on purpose, or assembled by accident.
            </p>
            <div className={s.ctaCtas}>
              <a className={s.btnPrimary} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                Clone the free tier
              </a>
              <Link className={s.btnOutline} href="/agent-orchestration-patterns">
                Read Agent Orchestration Patterns
              </Link>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer className={s.footer}>
          <div className={s.footerCopy}>LangGraph Patterns — built by Michael Legemah</div>
          <a className={s.footerLink} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </>
  );
}
