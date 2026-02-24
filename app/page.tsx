'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/home.module.css';

const EXPERTISE = [
  {
    icon: '🧠', num: '01', title: 'LLM Architecture & RAG',
    desc: 'Designing production-ready RAG pipelines, embedding strategies, and context window optimization for real enterprise workloads.',
    pills: [
      { label: 'Claude', c: 'yellow' }, { label: 'GPT-4', c: 'cyan' },
      { label: 'LangChain', c: 'green' }, { label: 'Pinecone', c: 'purple' },
    ],
  },
  {
    icon: '⚡', num: '02', title: 'AI Product Engineering',
    desc: 'Translating AI capabilities into user-facing products. Rapid prototyping to scalable backends with UX that makes AI feel intuitive.',
    pills: [
      { label: 'Next.js', c: 'pink' }, { label: 'React', c: 'yellow' },
      { label: 'TypeScript', c: 'cyan' },
    ],
  },
  {
    icon: '🔬', num: '03', title: 'Fine-tuning & Evals',
    desc: 'Systematic prompt engineering, RLHF workflows, and evaluation frameworks ensuring AI outputs are reliable and business-aligned.',
    pills: [
      { label: 'LoRA', c: 'green' }, { label: 'PEFT', c: 'orange' }, { label: 'W&B', c: 'purple' },
    ],
  },
  {
    icon: '🏗️', num: '04', title: 'Scalable Infrastructure',
    desc: 'High-performance APIs, microservice architectures, and cloud deployments built to handle AI workloads at scale.',
    pills: [
      { label: 'AWS', c: 'yellow' }, { label: 'GraphQL', c: 'cyan' }, { label: 'Docker', c: 'pink' },
    ],
  },
  {
    icon: '🎯', num: '05', title: 'AI Strategy & Leadership',
    desc: 'Partnering with stakeholders to identify high-leverage AI opportunities and lead engineering teams through ambiguity.',
    pills: [
      { label: 'System Design', c: 'green' }, { label: 'Roadmapping', c: 'purple' },
    ],
  },
  {
    icon: '✨', num: '06', title: 'Agentic Workflows',
    desc: 'Building autonomous agent pipelines, multi-step tool use, and intelligent automation that eliminates bottlenecks.',
    pills: [
      { label: 'Agents', c: 'yellow' }, { label: 'Tool Use', c: 'cyan' }, { label: 'MCP', c: 'orange' },
    ],
  },
];

const CLIENTS = [
  'JP Morgan Chase','Mayo Clinic','Northrop Grumman','Nikon',
  'Estée Lauder','Madison Square Garden','FCB Health','American Kennel Club',
];

const TESTIMONIALS = [
  { initials: 'FD', color: 'var(--yellow)', name: 'Frank Durante', role: 'Internet App Specialist, Nikon', quote: 'One of the most kind, passionate and loyal individuals I have ever worked with. His constant appetite for knowledge keeps him up front in the pack of new technology.' },
  { initials: 'SK', color: 'var(--cyan)',   name: 'Scott Kogos',   role: 'SVP Dir. PM Operations, Doner', quote: 'Joined our team during an incredibly hectic launch. He fit right in and proved to be a huge help — both for assigned work and helping other developers when called upon.' },
  { initials: 'MA', color: 'var(--green)',  name: 'Mo Akram',      role: 'VP of Recruiting, Petfolk', quote: 'Always stayed one step ahead of tech trends. A motivated team player and leader with a keen eye for the bigger picture — a valuable asset to any organization.' },
  { initials: 'TL', color: 'var(--orange)', name: 'Tony Landa',    role: 'VP Dir. of Technology, FCB Health', quote: 'No-drama, smart, and a great problem-solver. Not only did he figure out the system quickly, but his skills proved of great service across multiple aspects of the project.' },
  { initials: 'AG', color: 'var(--purple)', name: 'Alla Gringaus', role: 'Global Web Perf Lead, Estée Lauder', quote: 'Very solid experience with deep expertise in modern frameworks. Adept at creating customer-focused, mobile-responsive UI with UX in mind.' },
  { initials: 'YK', color: 'var(--pink)',   name: 'Yussuf Khan',   role: 'Media Executive & Entrepreneur', quote: 'One of the most patient, knowledgeable, flexible and understanding people I have ever worked with. Because of his talents, I still work with him to this day.' },
];

const PILL_COLORS: Record<string, string> = {
  yellow: 'color:var(--yellow);background:rgba(255,216,102,.1);border:1px solid rgba(255,216,102,.2)',
  cyan:   'color:var(--cyan);background:rgba(120,220,232,.1);border:1px solid rgba(120,220,232,.2)',
  green:  'color:var(--green);background:rgba(169,220,118,.1);border:1px solid rgba(169,220,118,.2)',
  purple: 'color:var(--purple);background:rgba(171,157,242,.1);border:1px solid rgba(171,157,242,.2)',
  pink:   'color:var(--pink);background:rgba(255,97,136,.1);border:1px solid rgba(255,97,136,.2)',
  orange: 'color:var(--orange);background:rgba(252,152,103,.1);border:1px solid rgba(252,152,103,.2)',
};

export default function Home() {
  const expRef  = useReveal();
  const projRef = useReveal();
  const testiRef = useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* ── HERO ── */}
        <section className={s.hero}>
          <div className={s.orbPink} />
          <div className={s.orbCyan} />
          <div className={s.orbYellow} />

          <div className={s.heroLeft}>
            <div className={s.heroBadge}>Principal AI Engineer</div>
            <h1 className={s.heroName}>
              Michael<br />
              <em className={s.heroNameEm}>Legemah</em>
            </h1>
            <p className={s.heroTitle}>
              <span className={s.heroTitleSpan}>LLM Architecture</span> ·{' '}
              <span className={s.heroTitleSpan}>AI Systems</span> · Full-Stack
            </p>
            <p className={s.heroDesc}>
              I build <strong>production-grade AI systems</strong> — from RAG pipelines and LLM
              architecture to AI-native products that scale. Engineering intelligence into experiences
              that matter.
            </p>
            <div className={s.heroCtas}>
              <Link href="/projects" className="btn-primary">View My Work</Link>
              <Link href="/contact" className="btn-ghost">Let&apos;s Connect</Link>
            </div>
            <div className={s.heroStats}>
              <div>
                <div className={`${s.statNum} ${s.y}`}>10+</div>
                <div className={s.statLabel}>Years Engineering</div>
              </div>
              <div>
                <div className={`${s.statNum} ${s.c}`}>15+</div>
                <div className={s.statLabel}>Enterprise Clients</div>
              </div>
              <div>
                <div className={`${s.statNum} ${s.p}`}>∞</div>
                <div className={s.statLabel}>Models Deployed</div>
              </div>
            </div>
          </div>

          <div className={s.heroRight}>
            <div className={s.aiTerminal}>
              <div className={s.terminalBar}>
                <div className={`${s.tdot} ${s.tdotR}`} />
                <div className={`${s.tdot} ${s.tdotY}`} />
                <div className={`${s.tdot} ${s.tdotG}`} />
                <span className={s.terminalTitle}>ml_engineer.py</span>
              </div>
              <div className={s.terminalBody}>
                <span className={s.tl}><span className={s.tc}># Principal AI Engineer</span></span>
                <span className={s.tl}>&nbsp;</span>
                <span className={s.tl}><span className={s.tk}>from</span> <span className={s.ts}>anthropic</span> <span className={s.tk}>import</span> <span className={s.tto}>Anthropic</span></span>
                <span className={s.tl}><span className={s.tk}>from</span> <span className={s.ts}>langchain</span> <span className={s.tk}>import</span> <span className={s.tto}>RAGPipeline</span></span>
                <span className={s.tl}>&nbsp;</span>
                <span className={s.tl}><span className={s.tk}>class</span> <span className={s.tto}>MichaelLegemah</span>:</span>
                <span className={s.tl}>&nbsp;&nbsp;<span className={s.tv}>expertise</span> = [</span>
                <span className={s.tl}>&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.ts}>&quot;LLM Architecture&quot;</span>,</span>
                <span className={s.tl}>&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.ts}>&quot;RAG Systems&quot;</span>,</span>
                <span className={s.tl}>&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.ts}>&quot;AI Product Engineering&quot;</span>,</span>
                <span className={s.tl}>&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.ts}>&quot;Full-Stack Dev&quot;</span>,</span>
                <span className={s.tl}>&nbsp;&nbsp;]</span>
                <span className={s.tl}>&nbsp;</span>
                <span className={s.tl}>&nbsp;&nbsp;<span className={s.tk}>def</span> <span className={s.tf}>build</span>(self, idea) -&gt; <span className={s.tto}>Product</span>:</span>
                <span className={s.tl}>&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.tk}>return</span> <span className={s.tf}>ship</span>(idea, quality=<span className={s.ts}>&quot;high&quot;</span>)</span>
                <span className={s.tl}>&nbsp;</span>
                <span className={s.tl}><span className={s.tcyn}>&gt;&gt;&gt; Available for new projects</span> <span className={s.tcursor} /></span>
              </div>
              <div className={s.aiTags}>
                {[
                  { label: 'Claude API', cls: s.atagY }, { label: 'LangChain', cls: s.atagC },
                  { label: 'OpenAI',    cls: s.atagG }, { label: 'Vector DBs', cls: s.atagP },
                  { label: 'Fine-tuning', cls: s.atagPk }, { label: 'Next.js', cls: s.atagY },
                  { label: 'TypeScript',  cls: s.atagC }, { label: 'RAG',     cls: s.atagG },
                ].map(({ label, cls }) => (
                  <span key={label} className={`${s.atag} ${cls}`}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className={s.marqueeSection}>
          <p className={s.marqueeLabel}>Trusted by teams at</p>
          <div className={s.marqueeWrap}>
            <div className={s.marqueeTrack}>
              {[...CLIENTS, ...CLIENTS].map((name, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  <span className={s.cliName}>{name}</span>
                  <span className={s.cliSep}>&nbsp;·&nbsp;</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── EXPERTISE ── */}
        <section className={s.expertiseSection}>
          <div className="section-label">What I Do</div>
          <h2 className="section-title">AI Engineering<br />at the Principal Level</h2>
          <p className="section-sub">End-to-end ownership of AI systems — from model selection and architecture through deployment and iteration in production.</p>
          <div className={`${s.expGrid} reveal`} ref={expRef}>
            {EXPERTISE.map(({ icon, num, title, desc, pills }) => (
              <div key={num} className={s.expCard}>
                <span className={s.expIcon}>{icon}</span>
                <div className={s.expN}>{num}</div>
                <div className={s.expT}>{title}</div>
                <div className={s.expD}>{desc}</div>
                <div className={s.expPills}>
                  {pills.map(({ label, c }) => (
                    <span key={label} className={s.epill} style={{ ...Object.fromEntries(PILL_COLORS[c].split(';').filter(Boolean).map(p => { const [k, v] = p.split(':'); return [k.trim().replace(/-([a-z])/g, (_: string, g: string) => g.toUpperCase()), v.trim()]; })) }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS PREVIEW ── */}
        <section className={s.projectsSection}>
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">Projects That<br />Ship Intelligence</h2>
          <p className="section-sub">A mix of AI-native builds and enterprise engineering — each one solving a real problem with craft.</p>

          <div className={`${s.projGrid} reveal`} ref={projRef}>
            {/* Featured */}
            <div className={`${s.projCard} ${s.projCardFeatured}`}>
              <div className={`${s.projVis} ${s.projVisFeatured}`} style={{ background: 'linear-gradient(135deg,var(--bg-deep),#1c1830)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em' }}>AI-AUGMENTED ANALYTICS</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 34, background: 'linear-gradient(120deg,var(--yellow),var(--orange))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Crypto Intelligence</div>
                <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                  <span>▲ Real-time</span><span>◎ Inference</span><span>↗ NLQ</span>
                </div>
              </div>
              <div className={s.projBody}>
                <div className={s.projTag}>AI · Data Viz · Real-time</div>
                <h3 className={s.projT}>Crypto Intelligence Dashboard</h3>
                <p className={s.projD}>AI-augmented crypto analytics platform fusing real-time market data with LLM-powered insights. Natural language querying, anomaly detection, and fuzzy search across thousands of assets.</p>
                <div className={s.projLinks}>
                  <a href="https://github.com/MikeLegemah5799/cryptocurrency-dashboard" className={s.projLink} target="_blank" rel="noopener noreferrer">View Code →</a>
                </div>
                <div className={s.projStack}>React · HighCharts · CryptoCompare API · Fuzzy Search</div>
              </div>
            </div>

            <div className={s.projCard}>
              <div className={s.projVis}>🌆</div>
              <div className={s.projBody}>
                <div className={s.projTag}>Full-Stack · SSR · GraphQL</div>
                <h3 className={s.projT}>OMNY Platform</h3>
                <p className={s.projD}>Led SSR component architecture and CMS integration for a high-traffic editorial platform.</p>
                <div className={s.projLinks}><a href="https://omny.info/" className={s.projLink} target="_blank" rel="noopener noreferrer">View Site →</a></div>
                <div className={s.projStack}>React · Laravel · GraphQL · PHP</div>
              </div>
            </div>

            <div className={s.projCard}>
              <div className={s.projVis}>🛡️</div>
              <div className={s.projBody}>
                <div className={s.projTag}>Enterprise · Defense · Components</div>
                <h3 className={s.projT}>Northrop Grumman</h3>
                <p className={s.projD}>Led a team building a customizable Gutenberg component library for a Fortune 500 defense contractor&apos;s global presence.</p>
                <div className={s.projLinks}><a href="https://www.northropgrumman.com/" className={s.projLink} target="_blank" rel="noopener noreferrer">View Site →</a></div>
                <div className={s.projStack}>WordPress · React · PHP · Bootstrap</div>
              </div>
            </div>
          </div>

          <div className={s.viewAllWrap}>
            <Link href="/projects" className="btn-outline">View All Projects →</Link>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className={s.testiSection}>
          <div className="section-label">Social Proof</div>
          <h2 className="section-title">What Leaders Say</h2>
          <p className="section-sub">A track record built on trust, craft, and results — from Fortune 500 to startups.</p>
          <div className={`${s.testiGrid} reveal`} ref={testiRef}>
            {TESTIMONIALS.map(({ initials, color, name, role, quote }) => (
              <div key={initials} className={s.testiCard}>
                <p className={s.testiQ}>{quote}</p>
                <div className={s.testiAuthor}>
                  <div className={s.testiAv} style={{ color }}>{initials}</div>
                  <div>
                    <div className={s.testiName}>{name}</div>
                    <div className={s.testiRole}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={s.ctaSection}>
          <div className={s.ctaInner}>
            <p className={s.ctaPre}>Open to New Engagements</p>
            <h2 className={s.ctaTitle}>Let&apos;s build<br />something <em className={s.ctaTitleEm}>intelligent</em></h2>
            <p className={s.ctaSub}>Whether you&apos;re launching an AI product, scaling an existing system, or just exploring what&apos;s possible — let&apos;s talk.</p>
            <a href="mailto:michaellegemah@gmail.com" className={s.ctaEmail}>michaellegemah@gmail.com</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
