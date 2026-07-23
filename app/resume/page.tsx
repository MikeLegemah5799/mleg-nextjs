import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import s from '@/styles/resume.module.css';

export const metadata = {
  title: 'Résumé',
};

const PILLS = [
  { label: '12+ yrs shipping', cls: s.pillG },
  { label: 'AWS', cls: s.pillC },
  { label: 'Mayo Clinic', cls: s.pillPk },
  { label: 'MBTA · OMNY · BART', cls: s.pillO },
  { label: 'DoD Secret Clearance', cls: s.pillY },
];

const EXPERIENCE = [
  {
    active: true,
    role: 'Software Development Engineer IV', type: 'Contract', date: '10/25 — present',
    company: 'Amazon Web Services', location: 'New York, NY', color: 'var(--yellow)',
    bullets: [
      'Architected and deployed agentic AI workflows on AWS Bedrock, SageMaker, Lambda, AppSync, DynamoDB, and OpenSearch, automating complex multi-step enterprise processes at scale.',
      'Designed LLM-as-a-tester and LLM-as-a-judge evaluation pipelines (Anthropic, OpenAI, NovaPro) into CI/CD, catching regressions and enforcing quality gates before deploy.',
      'Delivered a production contact-center web app in React, TypeScript, Tailwind, and Python with WCAG-aligned accessibility at enterprise scale.',
    ],
  },
  {
    role: 'Senior Software Engineer', type: 'Contract', date: '1/25 — 10/25',
    company: 'About Objects', location: 'Gaithersburg, MD (Remote)', color: 'var(--purple)',
    bullets: [
      'Built LLM-driven RAG pipelines and LangGraph agents on AWS Bedrock to automate document-extraction workflows in a regulated clinical-trial product.',
      'Led a modular React/Next.js platform (TypeScript, Redux Toolkit, Tailwind) and HIPAA-compliant Node.js/Fastify/DynamoDB APIs.',
    ],
  },
  {
    role: 'Senior Front-End Engineer', type: 'Contract', date: '4/24 — 1/25',
    company: 'Apex Systems', location: 'Pittsburgh, PA (Remote)', color: 'var(--cyan)',
    bullets: [
      'Shipped end-to-end features in React, TypeScript, Redux, Tailwind, and Material UI, partnering closely with UX and product.',
      'Modernized service communication, migrating legacy REST to gRPC and GraphQL for better cross-service performance.',
    ],
  },
  {
    role: 'Software Engineer IV', date: '4/22 — 4/24',
    company: 'Zivaro', location: 'Denver, CO (Remote)', color: 'var(--pink)',
    bullets: [
      'Engineered React/Next.js apps for mission-critical aerospace and defense platforms with high test coverage (Jest, Playwright, Cypress).',
      'Defined microservice boundaries and API-gateway strategy with FastAPI and Python for better fault isolation.',
    ],
  },
  {
    role: 'Senior Front-End Engineer', date: '10/20 — 10/21',
    company: 'Reflexions Data', location: 'New York, NY', color: 'var(--cyan)',
    bullets: [
      'Led six engineers on high-availability platforms for MBTA, OMNY, and BART, driving an 80% revenue increase through full-stack ownership.',
    ],
  },
  {
    role: 'Senior Front-End Engineer', type: 'Contract', date: '2/19 — 10/20',
    company: 'Mondo', location: 'New York, NY', color: 'var(--purple)',
    bullets: [
      'Built a Storybook-driven React/Vue component library for Mayo Clinic and modernized legacy front-ends into cloud-native AWS services.',
    ],
  },
  {
    role: 'Front-End & Web Engineering Roles', date: '1/13 — 11/18',
    company: 'Various Companies', location: 'New York, NY', color: 'var(--cyan)',
    bullets: [
      'Delivered e-commerce platforms (React, Node.js, MySQL, payments) driving $3M+ revenue, and revamped AKC.org for higher conversion.',
    ],
  },
];

const SKILLS = [
  {
    label: 'AI-First Tooling', color: 'var(--cyan)',
    tags: ['Claude Code', 'Cursor', 'RAG', 'LangGraph', 'AWS Bedrock', 'LLM-as-a-Judge', 'DeepEval'],
  },
  {
    label: 'Frontend', color: 'var(--green)',
    tags: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind', 'Storybook', 'WCAG · ARIA'],
  },
  {
    label: 'Backend · Infra', color: 'var(--orange)',
    tags: ['Node.js', 'FastAPI', 'gRPC', 'AWS', 'Kubernetes', 'Terraform', 'PostgreSQL', 'Kafka'],
  },
];

const LINKS = [
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/MikeLegemah5799' },
  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/michaellegemah' },
  { icon: '🌐', label: 'mleg.tech', href: 'https://mleg.tech' },
];

export default function Resume() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* HERO */}
        <div className={s.hero}>
          <div className={s.orb1} />
          <div className={s.orb2} />
          <div className={s.heroTop}>
            <div>
              <div className="section-label">Curriculum Vitae</div>
              <h1 className={s.heroName}>Michael Legemah</h1>
              <p className={s.heroRole}>Principal AI Engineer</p>
              <p className={s.heroMeta}>New York, NY · michaellegemah@gmail.com · 516-273-1611</p>
            </div>
            <a href="/resume.pdf" download className={`btn-primary ${s.downloadBtn}`}>
              ⬇ Download résumé (PDF)
            </a>
          </div>
          <div className={s.pills}>
            {PILLS.map(({ label, cls }) => (
              <span key={label} className={`${s.pill} ${cls}`}>{label}</span>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className={s.body}>
          {/* EXPERIENCE */}
          <section>
            <div className={s.sideLabel}>Experience</div>
            <div className={s.timeline}>
              {EXPERIENCE.map(({ active, role, type, date, company, location, color, bullets }) => (
                <div key={role + date} className={s.tlItem}>
                  <div className={`${s.tlDot} ${active ? s.tlDotActive : ''}`} />
                  <div className={s.tlHead}>
                    <div className={s.tlRole}>
                      {role}{type ? <span className={s.tlType}> · {type}</span> : null}
                    </div>
                    <div className={s.tlDate}>{date}</div>
                  </div>
                  <div className={s.tlCompany}>
                    <span style={{ color }}>{company}</span>
                    <span style={{ color: 'var(--muted)' }}> · {location}</span>
                  </div>
                  <ul className={s.tlBullets}>
                    {bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className={s.sidebar}>
            <div>
              <div className={s.sideLabel}>Skills</div>
              {SKILLS.map(({ label, color, tags }) => (
                <div key={label} className={s.skillGroup}>
                  <div className={s.skillCat} style={{ color }}>{label}</div>
                  <div className={s.skillRow}>
                    {tags.map((t) => <span key={t} className={s.stag}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <div className={s.clearance}>
              <div className={s.clearanceIcon}>🛡️</div>
              <div>
                <div className={s.clearanceTitle}>DoD Secret Clearance</div>
                <div className={s.clearanceSub}>US Department of Defense</div>
              </div>
            </div>

            <div>
              <div className={s.sideLabel}>Links</div>
              <div className={s.links}>
                {LINKS.map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={s.linkRow}>
                    <span className={s.linkIcon}>{icon}</span>{label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* FOOTER CTA */}
        <div className={s.footerCta}>
          <p className={s.footerCtaText}>Prefer the one-pager? Grab the full résumé.</p>
          <a href="/resume.pdf" download className="btn-outline">⬇ Download résumé</a>
        </div>
      </main>

      <Footer />
    </>
  );
}
