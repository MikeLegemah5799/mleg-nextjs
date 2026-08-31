'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import { LOGO_URL } from '@/lib/constants';
import s from '@/styles/observability.module.css';

const LEVELS = [
  {
    n: '0',
    accent: 'pink',
    name: 'Blind',
    desc: 'AI features run in production with no structured record of what your AI actually said — only generic application logs that were never built for this.',
    inPlace: 'Standard app logs: request timing, HTTP status, error stack traces.',
    gap: 'No record of the actual input/output pair. A bad answer leaves no trace to investigate.',
    listDesc: 'no structured record of what your AI actually said',
  },
  {
    n: '1',
    accent: 'orange',
    name: 'Logged, Not Watched',
    desc: 'Full input/output pairs are captured somewhere, but nobody, and nothing automated, is actually reviewing them.',
    inPlace: 'Prompts and responses are logged and retrievable after the fact, if someone thinks to look.',
    gap: 'Logging without review is an archive, not observability. Drift is invisible until a user reports it.',
    listDesc: "captured, but nobody's reviewing it",
  },
  {
    n: '2',
    accent: 'yellow',
    name: 'Uptime Confused With Correctness',
    desc: "Real dashboards exist. Latency, error rate, cost, throughput. The team believes this counts as AI observability. It doesn't.",
    inPlace: 'Traditional APM fully wired up: alerts on errors, latency percentiles, uptime SLAs tracked.',
    gap: 'A 200 response and a correct response are different things. Nothing here can tell them apart.',
    listDesc: 'APM everywhere, quality nowhere',
  },
  {
    n: '3',
    accent: 'green',
    name: 'Manual Spot-Checks',
    desc: 'A human reviews a sample of outputs on some cadence. It catches real problems — but only the ones that happen to land in the sample.',
    inPlace: 'Scheduled human review, sampled transcripts, a real (if informal) quality bar being applied.',
    gap: "Doesn't scale with volume, and the time between reviews is a fully unmonitored blind spot.",
    listDesc: "real review, but it doesn't scale",
  },
  {
    n: '4',
    accent: 'cyan',
    name: 'Closed-Loop Semantic Monitoring',
    desc: 'Every response, or a statistically real sample is scored automatically for groundedness and safety. Quality drift alerts the same way an error-rate spike would, and a bad output traces back to the exact prompt and model version that produced it.',
    inPlace: null,
    gap: "The gap between 'shipped' and 'shipped correctly' closes to near zero — and closes automatically, not by luck.",
    gapLabel: 'THIS IS THE TARGET',
    listDesc: 'the target state',
    target: true,
  },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

function SignupForm({ id }: { id: string }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/observability-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Something went wrong. Try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={s.formSuccess}>
        <div className={s.formSuccessTitle}>Check your inbox.</div>
        <p className={s.formSuccessDesc}>
          Your copy of the AI Observability Maturity Model is on its way to {email}.
        </p>
        <a className={s.btnPrimary} href="/downloads/AI-Observability-Maturity-Model.pdf" download>
          Download it now
        </a>
      </div>
    );
  }

  return (
    <form className={s.signup} onSubmit={handleSubmit}>
      <input
        id={`${id}-first-name`}
        className={s.input}
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoComplete="given-name"
      />
      <input
        id={`${id}-email`}
        className={s.input}
        type="email"
        placeholder="Work email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <button className={s.btnPrimary} type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Get the Framework — Free'}
      </button>
      {status === 'error' && <div className={s.formError}>{errorMsg}</div>}
      <div className={s.trustLine}>
        <span>One-page PDF</span>
        <span>Sent instantly</span>
        <span>No spam — ever</span>
      </div>
    </form>
  );
}

export default function ObservabilityClient() {
  const levelsRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <div className={s.wrap}>
        {/* ── LOCAL HEADER ── */}
        <header className={s.header}>
          <nav className={s.headerNav}>
            <a href="#five-levels">The five levels</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <main>
          {/* ── HERO ── */}
          <section className={s.hero}>
            <div className={s.heroLeft}>
              <div className={s.eyebrow}>{'// AI RELIABILITY · FREE FRAMEWORK'}</div>
              <h1 className={s.heroTitle}>The AI Observability Maturity Model</h1>
              <p className={s.heroDesc}>
                A free one-page framework for finding out where your AI system actually
                sits. From no visibility at all to a closed loop that catches quality
                drift before a customer does.{' '}
                <strong>Uptime and correctness are different metrics.</strong>{' '}
                Most teams&apos; dashboards only track the first one.
              </p>
              <SignupForm id="hero" />
            </div>

            <div className={s.heroRight}>
              <div className={s.pdfCard}>
                <div className={s.pdfCardHead}>
                  <span className={s.pdfCardEyebrow}>{'// AI RELIABILITY · OBSERVABILITY FRAMEWORK'}</span>
                </div>
                <h2 className={s.pdfCardTitle}>The AI Observability Maturity Model</h2>
                <p className={s.pdfCardDesc}>
                  Five levels, from no visibility into what your AI actually said, to a
                  closed loop that catches quality drift before a customer does. Find
                  your level below.
                </p>

                <div className={s.pdfLevels}>
                  {LEVELS.map((lvl) => (
                    <div
                      className={`${s.pdfLevel} ${s[lvl.accent]} ${lvl.target ? s.pdfLevelTarget : ''}`}
                      key={lvl.n}
                    >
                      <div className={s.pdfLevelHead}>
                        <span className={s.pdfLevelNum}>{lvl.n} / 4</span>
                        <span className={s.pdfLevelName}>{lvl.name}</span>
                      </div>
                      <p className={s.pdfLevelDesc}>{lvl.desc}</p>
                      {lvl.inPlace && (
                        <div className={s.pdfLevelRow}>
                          <span className={s.pdfLevelLabel}>What&apos;s in place</span>
                          <span className={s.pdfLevelText}>{lvl.inPlace}</span>
                        </div>
                      )}
                      <div className={s.pdfLevelRow}>
                        <span className={s.pdfLevelLabel}>{lvl.gapLabel || 'The gap'}</span>
                        <span className={s.pdfLevelText}>{lvl.gap}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={s.pdfCardFoot}>
                  Want to know exactly where your own system sits?{' '}
                  <Link href="/reliability-audit">The 50-Point AI Reliability Audit</Link>{' '}
                  turns this model into 50 concrete, checkable items, or see{' '}
                  <Link href="/sentinel">Sentinel</Link>, a free reference implementation
                  of Level 4.
                </div>
              </div>
            </div>
          </section>

          {/* ── FIND YOUR LEVEL ── */}
          <div className={s.lightSection} id="five-levels">
            <div className={s.lightInner}>
              <div className={s.label}>{'// the five levels'}</div>
              <h2 className={s.title}>Find your level in under a minute.</h2>
              <p className={s.subtitle}>
                Each level maps what&apos;s actually in place against the specific gap
                it leaves. So this isn&apos;t just a framework to admire, it&apos;s a
                place to start.
              </p>

              <div className={s.levelsList} ref={levelsRef}>
                {LEVELS.map((lvl) => (
                  <div
                    className={`${s.levelRow} ${s[lvl.accent]} ${lvl.target ? s.levelRowTarget : ''}`}
                    key={lvl.n}
                  >
                    <span className={s.levelRowNum}>{lvl.n}</span>
                    <span className={s.levelRowText}>
                      <strong>{lvl.name}</strong> — {lvl.listDesc}
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
                  is a Principal AI Engineer who has
                  spent over a decade building production systems for AWS, the U.S.
                  Army, and U.S. Space Force. The last several years focused
                  specifically on agentic AI, RAG pipelines, and the evaluation
                  infrastructure that keeps them honest. This framework comes from the
                  same recurring gap he&apos;s diagnosed across real production systems:
                  traditional APM tells you the request succeeded, never whether the
                  answer was right.
                </p>
              </div>

              <hr className={s.aboutDivider} />

              <div className={s.finalCta}>
                <p className={s.finalCtaTagline}>
                  One page. Five levels. Find out where you actually stand.
                </p>
                <SignupForm id="final" />
              </div>
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className={s.footer}>
          <div className={s.footerCopy}>The AI Observability Maturity Model — built by Michael Legemah</div>
          <div className={s.footerMark}>mleg.tech</div>
        </footer>
      </div>
    </>
  );
}
