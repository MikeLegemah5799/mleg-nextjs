'use client';

import { useState } from 'react';
import {
  IconSparkles,
  IconClipboard,
  IconAlertCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconQuote,
  IconLoader2,
  IconMail,
  IconDownload,
} from '@tabler/icons-react';
import { ScoreRing } from './ScoreRing';
import type { JobMatchResult } from '@/lib/job-match';
import styles from '@/styles/JobMatchAnalyzer.module.css';

const MIN_LENGTH = 40;

function scoreColorVar(score: number): string {
  if (score >= 80) return 'var(--green)';
  if (score >= 60) return 'var(--yellow)';
  return 'var(--pink)';
}

function verdict(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'Strong fit', color: 'var(--green)' };
  if (score >= 70) return { label: 'Good fit', color: 'var(--green)' };
  if (score >= 50) return { label: 'Partial fit', color: 'var(--yellow)' };
  return { label: 'Limited fit', color: 'var(--pink)' };
}

export function JobMatchAnalyzer() {
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JobMatchResult | null>(null);

  async function handleAnalyze() {
    setError(null);

    if (jd.trim().length < MIN_LENGTH) {
      setError('Paste a full job description (at least a few sentences) for an accurate read.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jd }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong analyzing this job description.');
      }

      setResult(data as JobMatchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>For recruiters &amp; hiring managers</div>
        <h1 className={styles.h1}>
          Paste a job description.
          <br />
          See the match instantly.
        </h1>
        <p className={styles.sub}>
          No forms, no back-and-forth, drop in the JD and get a skill-by-skill breakdown against my
          actual experience, generated in seconds.
        </p>
      </div>

      <div className={styles.inputPanel}>
        <div className={styles.inputCard}>
          <div className={styles.inputHead}>
            <label htmlFor="jd-input" className={styles.label}>
              Job description
            </label>
            <span className={styles.hint}>
              <IconClipboard size={14} /> Paste from clipboard supported
            </span>
          </div>
          <textarea
            id="jd-input"
            className={styles.textarea}
            placeholder="Paste the job description here — title, responsibilities, required skills, etc."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          <div className={styles.inputFoot}>
            <span className={styles.charCount}>{jd.length} characters</span>
            <button className={styles.btnPrimary} onClick={handleAnalyze} disabled={loading}>
              {loading ? <IconLoader2 size={16} className={styles.spin} /> : <IconSparkles size={16} />}
              {loading ? 'Analyzing…' : 'Analyze match'}
            </button>
          </div>
          {error && (
            <div className={styles.errorMsg}>
              <IconAlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className={styles.stateBox}>
          <div className={styles.spinnerLg} />
          <p className={styles.stateText}>Reading the role and comparing it against the résumé…</p>
        </div>
      )}

      {result && !loading && (
        <div className={styles.results}>
          <div>
            <div className={styles.scoreCard}>
              <ScoreRing score={result.overall_score} color={scoreColorVar(result.overall_score)} />
              <p
                className={styles.scoreVerdict}
                style={{ color: verdict(result.overall_score).color }}
              >
                {verdict(result.overall_score).label}
              </p>
              <p className={styles.scoreDesc}>{result.summary}</p>
            </div>

            <div className={styles.breakdownCard}>
              <p className={styles.panelTitleSm}>Breakdown</p>
              {result.breakdown.map((b) => (
                <div className={styles.barRow} key={b.label}>
                  <div className={styles.barLabel}>
                    <span>{b.label}</span>
                    <span style={{ color: scoreColorVar(b.score), fontWeight: 600 }}>{b.score}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${b.score}%`, background: scoreColorVar(b.score) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className={styles.panel}>
              <p className={styles.panelTitle} style={{ color: 'var(--green)' }}>
                <IconCircleCheck size={16} /> Matched requirements
              </p>
              <div className={styles.tagWrap}>
                {result.matched.map((m) => (
                  <span className={styles.tagMatch} key={m}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {result.gaps?.length > 0 && (
              <div className={styles.panel}>
                <p className={styles.panelTitle} style={{ color: 'var(--yellow)' }}>
                  <IconAlertTriangle size={16} /> Partial / not explicit
                </p>
                {result.gaps.map((g) => (
                  <div className={styles.gapRow} key={g.requirement}>
                    <span className={styles.gapName}>{g.requirement}</span>
                    <span className={styles.gapNote}>{g.note}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.panel}>
              <p className={styles.panelTitle} style={{ color: 'var(--cyan)' }}>
                <IconQuote size={16} /> Supporting evidence from résumé
              </p>
              {result.evidence.map((e) => (
                <div className={styles.evidenceItem} key={e.bullet}>
                  <p className={styles.evidenceQuote}>{e.bullet}</p>
                  <p className={styles.evidenceSource}>{e.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.footNote}>
          Analysis generated from résumé content — verify specifics in conversation.
        </span>
        <div className={styles.footActions}>
          <a className={styles.btnGhost} href="mailto:michaellegemah@gmail.com">
            <IconMail size={15} /> Contact Michael
          </a>
          <a className={styles.btnPrimary} href="/Michael_Legemah_Master_Resume.pdf" download="Michael_Legemah_Master_Resume.pdf">
            <IconDownload size={15} /> Download résumé
          </a>
        </div>
      </div>
    </section>
  );
}
