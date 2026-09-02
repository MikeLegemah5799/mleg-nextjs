'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/services.module.css';

const CLEARED_WITHIN = ['AWS ProServe', 'US Army', 'AI2C', 'US Space Force', 'Hyperion', 'AstraZeneca'];

const ENGAGEMENTS = [
  {
    icon: '🧩', num: '01', title: 'Agentic System Build',
    desc: 'Design and ship a production multi-agent workflow. LangGraph, Bedrock, or your existing stack, for a defined use case, start to finish.',
    scope: '4-8 WEEK FIXED SCOPE',
  },
  {
    icon: '🔎', num: '02', title: 'Eval & Reliability Audit',
    desc: "Assess an existing AI feature's real failure modes, then build the automated eval pipeline, LLM-as-Judge, CI/CD regression gating, to catch them before your customers do.",
    scope: '2-4 WEEK AUDIT + BUILD',
  },
  {
    icon: '⚡', num: '03', title: 'Fractional AI Engineering',
    desc: 'Embedded senior capacity for teams that need this expertise regularly, without a full-time hire, or the six-month ramp-up.',
    scope: 'ONGOING, 2-3 DAYS/WEEK',
  },
  {
    icon: '📊', num: '04', title: 'Eval Infrastructure Build',
    desc: 'Production LLM-as-Judge scoring, guardrails, confidence thresholds, and CI regression gates, built and wired into your pipeline, not prototyped in a notebook. ',
    scope: '3-5 WEEK FIXED SCOPE',
  },
  {
    icon: '📚', num: '05', title: 'RAG Pipeline Build',
    desc: 'Retrieval-augmented generation over your enterprise knowledge base — vector search, chunking strategy, and groundedness checks included, so answers cite what\'s actually true.',
    scope: '4-6 WEEK FIXED SCOPE',
  },
  {
    icon: '📈', num: '06', title: 'AI Observability Setup',
    desc: 'Semantic quality tracking, not just uptime. Drift alerting, per-feature cost tracking, and traceability from a bad output back to the prompt that caused it.',
    scope: '2-3 WEEK BUILD',
  },
];

const STEPS = [
  {
    num: '01', title: 'A short scoping call',
    desc: "30 minutes, what you're trying to ship, what's blocking it, and whether it's a fit.",
  },
  {
    num: '02', title: 'A fixed-scope proposal',
    desc: 'Clear deliverables and timeline, no open-ended hourly billing with no end in sight.',
  },
  {
    num: '03', title: 'Direct execution',
    desc: 'You get the engineer, not an account manager relaying to one. I write the code and design the system.',
  },
];

export default function ServicesClient() {
  const engRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* ── HERO ── */}
        <section className={s.hero}>
          <div className={s.heroLeft}>
            <div className={s.heroBadge}>Open to Fractional &amp; Contract Engagements</div>
            <h1 className={s.heroTitle}>
              Agentic AI systems, shipped by someone<br />
              already cleared to build <em className={s.heroTitleEm}>yours</em>.
            </h1>
            <p className={s.heroDesc}>
              I design and ship production multi-agent systems, RAG pipelines, and the
              evaluation frameworks that make AI behavior measurable {' '}
              <strong>for teams that need this working, not demoed</strong>. Active DoD
              Secret clearance, delivered inside AWS ProServe, US Army, and US Space Force
              programs.
            </p>
            <div className={s.heroCtas}>
              <a href="mailto:michaellegemah@gmail.com" className="btn-primary">Start a Conversation</a>
              <a href="#engagement-types" className="btn-ghost">See Engagement Types</a>
            </div>
            <div className={s.heroStats}>
              <div>
                <div className={s.statNum}>Active</div>
                <div className={s.statLabel}>DoD Secret Clearance</div>
              </div>
              <div>
                <div className={s.statNum}>3</div>
                <div className={s.statLabel}>Engagement Types</div>
              </div>
              <div>
                <div className={s.statNum}>2-3</div>
                <div className={s.statLabel}>Days / Week</div>
              </div>
            </div>
          </div>

          <div className={s.heroRight}>
            <div className={s.terminal}>
              <div className={s.terminalBar}>
                <div className={`${s.tdot} ${s.tdotR}`} />
                <div className={`${s.tdot} ${s.tdotY}`} />
                <div className={`${s.tdot} ${s.tdotG}`} />
                <span className={s.terminalTitle}>engagement.py</span>
              </div>
              <div className={s.terminalBody}>
                <span className={s.tl}><span className={s.tk}>class</span> <span className={s.tto}>FractionalEngagement</span>:</span>
                <span className={s.tl}>&nbsp;&nbsp;<span className={s.tv}>clearance</span> = <span className={s.ts}>&quot;DoD Secret — Active&quot;</span></span>
                <span className={s.tl}>&nbsp;&nbsp;<span className={s.tv}>delivered_at</span> = [<span className={s.ts}>&quot;AWS ProServe&quot;</span>, <span className={s.ts}>&quot;US Army AI2C&quot;</span>, <span className={s.ts}>&quot;US Space Force&quot;</span>]</span>
                <span className={s.tl}>&nbsp;&nbsp;<span className={s.tc}># no ramp-up on your compliance or security posture</span></span>
                <span className={s.tl}>&nbsp;</span>
                <span className={s.tl}>&nbsp;&nbsp;<span className={s.tk}>def</span> <span className={s.tf}>ship</span>(self, problem):</span>
                <span className={s.tl}>&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.tk}>return</span> <span className={s.tf}>agentic_system</span>(measurable=<span className={s.tv}>True</span>, trustworthy=<span className={s.tv}>True</span>)</span>
                <span className={s.tl}>&nbsp;</span>
                <span className={s.tl}><span className={s.tcyn}>&gt;&gt;&gt; available for 2-3 day/week engagements</span><span className={s.tcursor} /></span>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST / CLEARED WITHIN ── */}
        <div className={s.trustSection}>
          <p className={s.trustLabel}>Cleared &amp; Delivered Within</p>
          <div className={s.trustWrap}>
            <div className={s.trustTrack}>
              {[...CLEARED_WITHIN, ...CLEARED_WITHIN].map((name, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  <span className={s.trustName}>{name}</span>
                  <span className={s.trustSep}>&nbsp;·&nbsp;</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── ENGAGEMENT TYPES ── */}
        <section className={s.engSection} id="engagement-types">
          <div className="section-label">Engagement Types</div>
          <h2 className="section-title">Six ways to<br />work together</h2>
          <p className="section-sub">Fixed-scope builds, a focused audit, or ongoing embedded capacity, depending on where you actually are.</p>

          <div className={`${s.engGrid} reveal`} ref={engRef}>
            {ENGAGEMENTS.map(({ icon, num, title, desc, scope }) => (
              <div key={num} className={s.engCard}>
                <div className={s.engTop}>
                  <span className={s.engIcon}>{icon}</span>
                  <span className={s.engNum}>{num}</span>
                </div>
                <div className={s.engTitle}>{title}</div>
                <p className={s.engDesc}>{desc}</p>
                <div className={s.engFoot}>{scope}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT TO EXPECT ── */}
        <section className={s.expectSection}>
          <div className="section-label">How Engagements Work</div>
          <h2 className="section-title">What to expect</h2>

          <div className={s.expectGrid}>
            <div className={s.steps}>
              {STEPS.map(({ num, title, desc }) => (
                <div key={num} className={s.step}>
                  <span className={s.stepNum}>{num}</span>
                  <div>
                    <div className={s.stepTitle}>{title}</div>
                    <p className={s.stepDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={s.callout}>
              <div className={s.calloutLabel}>Clearance-Gated Work</div>
              <p className={s.calloutText}>
                For engagements requiring <strong>active DoD Secret clearance</strong>,
                I&apos;ve already cleared onboarding that typically takes new contractors
                months, meaning I can start substantive work faster than an uncleared
                hire could even begin.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={s.ctaSection}>
          <div className={s.ctaInner}>
            <h2 className={s.ctaTitle}>Let&apos;s ship something <em className={s.ctaTitleEm}>mission-ready</em>.</h2>
            <p className={s.ctaSub}>Whether it&apos;s a defined build, an eval audit, or ongoing embedded capacity. Let&apos;s talk about what you&apos;re trying to ship.</p>
            <a href="mailto:michaellegemah@gmail.com" className={s.ctaEmail}>michaellegemah@gmail.com</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
