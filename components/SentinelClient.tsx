'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/sentinel.module.css';

const GITHUB_URL = 'https://github.com/MikeLegemah5799/sentinel';
const DEMO_URL = 'https://sentinel-six-ruby.vercel.app/';

const FEATURES = [
  {
    label: 'check_groundedness',
    title: 'Catches citations the context doesn’t actually support',
    desc: 'A document that says "no section 9.2 exists" contains the literal substring "section 9.2." Sentinel scans for negation before it credits a citation — a claim that’s only ever negated counts as unresolved, same bucket as never appearing at all.',
  },
  {
    label: 'flag_injection',
    title: 'Catches the full attack chain, not just the attempt',
    desc: 'An injection attempt living in retrieved context is one signal. The agent’s response actually going along with it is another. Both firing together is a confident block with no judge call needed — either alone is ambiguous and escalates.',
  },
];

const STATS = [
  { num: '2', label: 'metrics fully implemented and tested — not stubs pretending to work' },
  { num: '0', label: 'API keys required to run the full test suite offline' },
  { num: '2', label: 'deploy targets from one handler set — stdio and Streamable HTTP' },
];

export default function SentinelClient() {
  const featureRef = useReveal();
  const statRef = useReveal();
  const pricingRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <div className={s.wrap}>
        {/* ── HEADER ── */}
        <header className={s.header}>
          <nav className={s.headerNav}>
            <a href="#why">Why it exists</a>
            <a href="#pricing">Pricing</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </header>

        <main>
          {/* ── HERO ── */}
          <section className={s.hero}>
            <div className={s.heroLeft}>
              <h1 className={s.heroTitle}>
                A trust layer your agent calls before a response ships.
              </h1>
              <p className={s.heroDesc}>
                Sentinel is an MCP server that scores agent responses mid-turn. Not a
                dashboard someone checks after the damage is done. It catches fabricated
                citations and prompt-injection compliance before either reaches a user.
              </p>
              <div className={s.heroCtas}>
                <a className={s.btnPrimary} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  Clone the free tier
                </a>
                <a className={s.btnOutline} href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Watch the live demo
                </a>
              </div>
            </div>

            <div className={s.heroRight}>
              <div className={s.terminal}>
                <span className={`${s.tl} ${s.tc}`}>{'// escalation ladder — flag_injection'}</span>
                <span className={s.tl}>&nbsp;</span>
                <span className={`${s.tl} ${s.ty}`}>{'▸ deterministic check (regex / pattern)'}</span>
                <span className={s.tl}>
                  {'  ├─ override + compliance both fire → '}<span className={s.tk}>block</span>
                </span>
                <span className={s.tl}>{'  └─ ambiguous → judge call'}</span>
                <span className={s.tl}>
                  {'      ├─ resolves in time → '}<span className={s.tg}>verdict</span>
                </span>
                <span className={s.tl}>{'      └─ times out → tenant policy decides'}</span>
                <hr className={s.terminalDivider} />
                <span className={s.terminalNote}>
                  Confident cases resolve with zero model calls. Only the ambiguous
                  middle escalates, the common case stays fast and auditable.
                </span>
              </div>
            </div>
          </section>

          {/* ── WHY IT EXISTS ── */}
          <section className={s.section} id="why">
            <div className={s.label}>{'// why this exists'}</div>
            <h2 className={s.title}>
              Most eval tooling scores transcripts after the fact. This scores the
              response before it goes out.
            </h2>
            <p className={s.sub}>
              An agent or the orchestrator wrapping it calls a Sentinel tool
              with the response it&apos;s about to send, plus the context it was grounded
              in. Sentinel returns allow, warn, or block. It&apos;s a call in the request
              path, cheap enough in the common case not to be a UX problem.
            </p>

            <div className={s.featureGrid} ref={featureRef}>
              {FEATURES.map((f) => (
                <div key={f.label}>
                  <div className={s.featureLabel}>{f.label}</div>
                  <div className={s.featureTitle}>{f.title}</div>
                  <p className={s.featureDesc}>{f.desc}</p>
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
                The free tier is the actual product, not a crippled trial. Clone it,
                run it against your own agent, decide if the pattern fits before you owe
                anyone anything.
              </p>

              <div className={s.pricingGrid} ref={pricingRef}>
                <div className={s.priceCard}>
                  <div className={s.priceEyebrow}>FREE — EVALUATION LICENSE</div>
                  <div className={s.priceTitle}>Clone &amp; Run</div>
                  <div className={s.priceValue}>$0</div>
                  <p className={s.priceDesc}>
                    Full source, both metrics, offline judge. Everything you need to
                    prove the pattern works before you commit to anything.
                  </p>
                  <ul className={s.priceList}>
                    <li>flag_injection + check_groundedness, fully implemented</li>
                    <li>stdio MCP server (Claude Desktop, Cursor, local dev)</li>
                    <li>Offline judge stub — no API key needed</li>
                    <li>Full test suite + typecheck</li>
                    <li>In-memory policy registry</li>
                    <li className={s.priceListMuted}>Not licensed for production traffic</li>
                  </ul>
                  <a className={`${s.btnOutline} ${s.priceCta}`} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    Clone on GitHub
                  </a>
                </div>

                <div className={`${s.priceCard} ${s.priceCardFeatured}`}>
                  <div className={`${s.priceEyebrow} ${s.priceEyebrowCyan}`}>COMMERCIAL LICENSE</div>
                  <div className={s.priceTitle}>Production</div>
                  <div className={s.priceValue}>$499 <span>one-time</span></div>
                  <p className={s.priceDesc}>
                    Everything you need to put Sentinel in front of real agent traffic,
                    plus a worked example of extending it.
                  </p>
                  <ul className={s.priceList}>
                    <li>Everything in Clone &amp; Run</li>
                    <li>License to run in production</li>
                    <li>Streamable HTTP deploy target + auth pattern</li>
                    <li>End-to-end HTTP smoke test</li>
                    <li>Walkthrough: adding a third metric</li>
                    <li>Email support for integration questions</li>
                  </ul>
                  <Link className={`${s.btnPrimary} ${s.priceCta}`} href="https://buy.stripe.com/4gM7sEg2ZbRqfpbfnwf7i00">
                    Get the License
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
                    <li>Postgres-backed policy registry, built to your schema</li>
                    <li>Real model-backed judge, wired to your provider</li>
                    <li>A custom metric built to your actual failure modes</li>
                    <li>Trust score calibration against your own incident data</li>
                    <li>Architecture review of your agent/orchestrator setup</li>
                  </ul>
                  <Link className={`${s.btnOutline} ${s.priceCta}`} href="/contact">
                    Start a conversation
                  </Link>
                </div>
              </div>

              <p className={s.pricingCaption}>
                <span className={s.capCyan}>clone &amp; run</span> proves the pattern works
                on your own agent → <span className={s.capYellow}>production</span> gets
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
              If your agent touches contracts, customer data, or figures a person will
              act on without double-checking
            </h2>
            <p className={s.ctaSub}>
              it&apos;s not whether you need this layer. It&apos;s whether you find the
              gap from your own testing, or from your customer&apos;s lawyer.
            </p>
            <div className={s.ctaCtas}>
              <a className={s.btnPrimary} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                Clone the free tier
              </a>
              <Link className={s.btnOutline} href="/contact">
                Talk to me about your setup
              </Link>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer className={s.footer}>
          <div className={s.footerCopy}>Sentinel — built by Michael Legemah</div>
          <a className={s.footerLink} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </>
  );
}
