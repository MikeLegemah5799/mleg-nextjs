'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import s from '@/styles/speaking.module.css';

const STATS = [
  { value: '14', label: 'Talks Given', color: 'var(--yellow)' },
  { value: '2,400+', label: 'Engineers Reached', color: 'var(--text)' },
  { value: '12+', label: 'Yrs Shipping AI/Full-Stack', color: 'var(--cyan)' },
  { value: '45min', label: 'Typical Format', color: 'var(--pink)' },
];

const TOPICS = [
  {
    icon: '🔀', bg: 'rgba(252,152,103,0.15)', color: 'var(--orange)',
    title: 'Multi-Agent Systems in Production',
    desc: 'Orchestrating LangGraph agents on AWS Bedrock — state, reducers, and the failure modes nobody warns you about.',
    meta: 'Intermediate–Advanced · 30–45 min',
  },
  {
    icon: '⚖️', bg: 'rgba(120,220,232,0.15)', color: 'var(--cyan)',
    title: 'LLM-as-a-Judge: Eval-Driven AI Dev',
    desc: 'Building automated quality gates into CI/CD so AI-generated code and outputs get caught before they ship.',
    meta: 'All levels · 30–45 min',
  },
  {
    icon: '🔎', bg: 'rgba(169,220,118,0.15)', color: 'var(--green)',
    title: 'RAG That Survives Contact With Users',
    desc: 'Lessons from regulated, high-traffic RAG pipelines — chunking, retrieval quality, and hallucination guardrails.',
    meta: 'Intermediate · 30–45 min',
  },
  {
    icon: '</>', bg: 'rgba(255,97,136,0.15)', color: 'var(--pink)',
    title: 'AI-Assisted Engineering at Scale',
    desc: 'What changes on a team when Claude Code and Cursor become default tooling — velocity, review, and risk.',
    meta: 'All levels · 20–40 min',
  },
  {
    icon: '🛡️', bg: 'rgba(171,157,242,0.15)', color: 'var(--purple)',
    title: 'Shipping AI in Regulated Industries',
    desc: 'HIPAA-aware GenAI features and defense-grade platforms — what compliance actually constrains in practice.',
    meta: 'Intermediate · 30–45 min',
  },
];

const EXPECT = [
  { icon: '🕐', text: 'Reply within 2 business days, even if the date doesn\'t work.' },
  { icon: '📍', text: 'Based in New York, NY — open to travel for in-person events.' },
  { icon: '💲', text: 'Free for community meetups and internal eng talks; standard rate for conferences.' },
];

const PAST_STAGES = [
  { title: 'NYC AI Engineers Meetup', quote: '"Multi-Agent Systems in Production"', date: 'Mar \'26' },
  { title: 'AWS re:Invent — Builder Session', quote: '"LLM-as-a-Judge in CI/CD"', date: 'Dec \'25' },
  { title: 'Internal Eng All-Hands, About Objects', quote: '"RAG That Survives Contact With Users"', date: 'Aug \'25' },
];

const TOPIC_OPTIONS = [
  'Multi-Agent Systems in Production',
  'LLM-as-a-Judge: Eval-Driven AI Dev',
  'RAG That Survives Contact With Users',
  'AI-Assisted Engineering at Scale',
  'Shipping AI in Regulated Industries',
  'Something else — describe below',
];

export default function Speaking() {
  const [form, setForm] = useState({
    name: '', email: '', event: '', date: '', format: 'In-person / Virtual',
    topic: '', notes: '',
  });

  const update = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Speaking request: ${form.event || 'New event'}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Event: ${form.event}`,
      `Date: ${form.date}`,
      `Format: ${form.format}`,
      `Topic of interest: ${form.topic}`,
      '',
      form.notes,
    ].join('\n');
    window.location.href = `mailto:michaellegemah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* HERO */}
        <div className={s.hero}>
          <div className={s.orb1} />
          <div className={s.orb2} />
          <div className={s.heroGrid}>
            <div>
              <div className="section-label">Speaking &amp; Conferences</div>
              <h1 className={s.heroTitle}>Talks on shipping AI that actually works in production.</h1>
              <p className={s.heroSub}>
                I speak to engineering teams and conferences about agentic systems, RAG architecture, and eval-driven
                development — grounded in what&apos;s actually shipped, not slideware.
              </p>
              <div className={s.heroCtas}>
                <a href="#book" className="btn-primary">📅 Check availability</a>
                <a href="mailto:michaellegemah@gmail.com?subject=Speaker%20one-sheet%20request" className="btn-outline">📄 Speaker one-sheet</a>
              </div>
            </div>

            <div className={s.profileCard}>
              <div className={s.profileTop}>
                <div className={s.avatar} />
                <div>
                  <div className={s.profileName}>Michael Legemah</div>
                  <div className={s.profileRole}>Principal AI Engineer</div>
                </div>
              </div>
              <div className={s.statGrid}>
                {STATS.map(({ value, label, color }) => (
                  <div key={label} className={s.statBox}>
                    <div className={s.statValue} style={{ color }}>{value}</div>
                    <div className={s.statLabel}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TALK TOPICS */}
        <section className={s.topicsSection}>
          <div className="section-label" style={{ color: 'var(--yellow)' }}>Talk Topics</div>
          <div className={s.topicsGrid}>
            {TOPICS.map(({ icon, bg, color, title, desc, meta }) => (
              <div key={title} className={s.topicCard}>
                <div className={s.topicIcon} style={{ background: bg, color }}>{icon}</div>
                <h3 className={s.topicTitle}>{title}</h3>
                <p className={s.topicDesc}>{desc}</p>
                <div className={s.topicMeta}>{meta}</div>
              </div>
            ))}
            <div className={`${s.topicCard} ${s.topicCardGhost}`}>
              <div className={s.topicIcon} style={{ background: 'var(--bg-deep)', color: 'var(--muted)' }}>💬</div>
              <h3 className={s.topicTitle}>Have something specific in mind?</h3>
              <p className={s.topicDesc}>Happy to tailor a talk to your event&apos;s theme or audience level — just ask.</p>
            </div>
          </div>
        </section>

        {/* BOOK MICHAEL */}
        <section id="book" className={s.bookSection}>
          <div className="section-label" style={{ color: 'var(--yellow)' }}>Book Michael</div>
          <div className={s.bookGrid}>
            <form className={s.formCard} onSubmit={handleSubmit}>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label className={s.fieldLabel} htmlFor="name">Name</label>
                  <input id="name" className={s.input} placeholder="Jane Rivera" value={form.name} onChange={update('name')} required />
                </div>
                <div className={s.field}>
                  <label className={s.fieldLabel} htmlFor="email">Email</label>
                  <input id="email" type="email" className={s.input} placeholder="jane@conf.io" value={form.email} onChange={update('email')} required />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.fieldLabel} htmlFor="event">Event / Conference name</label>
                <input id="event" className={s.input} placeholder="e.g. QCon NYC, internal eng offsite" value={form.event} onChange={update('event')} />
              </div>

              <div className={s.formRow}>
                <div className={s.field}>
                  <label className={s.fieldLabel} htmlFor="date">Event date</label>
                  <input id="date" type="date" className={s.input} value={form.date} onChange={update('date')} />
                </div>
                <div className={s.field}>
                  <label className={s.fieldLabel} htmlFor="format">Format</label>
                  <select id="format" className={s.select} value={form.format} onChange={update('format')}>
                    <option>In-person / Virtual</option>
                    <option>In-person only</option>
                    <option>Virtual only</option>
                  </select>
                </div>
              </div>

              <div className={s.field}>
                <label className={s.fieldLabel} htmlFor="topic">Topic of interest</label>
                <select id="topic" className={s.select} value={form.topic} onChange={update('topic')}>
                  <option value="">Choose a topic or describe your own</option>
                  {TOPIC_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className={s.field}>
                <label className={s.fieldLabel} htmlFor="notes">Anything else?</label>
                <textarea id="notes" className={s.textarea} placeholder="Audience size, theme, AV constraints, budget for travel…" value={form.notes} onChange={update('notes')} />
              </div>

              <button type="submit" className={`btn-primary ${s.submitBtn}`}>➤ Send request</button>
            </form>

            <div className={s.sideStack}>
              <div className={s.sideCard}>
                <div className={s.sideLabel} style={{ color: 'var(--green)' }}>What To Expect</div>
                <div className={s.expectList}>
                  {EXPECT.map(({ icon, text }) => (
                    <div key={text} className={s.expectRow}>
                      <span className={s.expectIcon}>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={s.sideCard}>
                <div className={s.sideLabel} style={{ color: 'var(--cyan)' }}>Past Stages</div>
                <div className={s.pastList}>
                  {PAST_STAGES.map(({ title, quote, date }) => (
                    <div key={title} className={s.pastItem}>
                      <div>
                        <div className={s.pastTitle}>{title}</div>
                        <div className={s.pastQuote}>{quote}</div>
                      </div>
                      <div className={s.pastDate}>{date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <div className={s.footerCta}>
          <p className={s.footerCtaText}>Prefer email? Reach out directly and I&apos;ll follow up fast.</p>
          <a href="mailto:michaellegemah@gmail.com" className="btn-outline">✉ michaellegemah@gmail.com</a>
        </div>
      </main>

      <Footer />
    </>
  );
}
