'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/projects.module.css';

type Project = {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  desc: string;
  stack: string;
  siteUrl?: string;
  codeUrl?: string;
  emoji?: string;
  featured?: boolean;
  wide?: boolean;
  accent: string;
  category: string[];
};

const PROJECTS: Project[] = [
  {
    id: 'crypto', featured: true, accent: s.accY,
    title: 'Crypto Intelligence Dashboard',
    tag: 'AI · Data Visualization · Real-time', tagColor: 'var(--yellow)',
    desc: 'An AI-augmented crypto analytics platform fusing real-time market data with LLM-powered insights. Features natural language querying, anomaly detection, and fuzzy search across thousands of assets — turning market noise into actionable intelligence.',
    stack: 'React · HighChartsJS · CryptoCompare API · Styled Components · Fuzzy Search',
    codeUrl: 'https://github.com/MikeLegemah5799/cryptocurrency-dashboard',
    category: ['AI / ML', 'Full-Stack'],
  },
  {
    id: 'portfolio', accent: s.accP,
    title: 'Michael Legemah Portfolio',
    tag: 'Design System · Next.js · Tailwind', tagColor: 'var(--purple)',
    desc: 'Designed, wireframed, and built my own portfolio from scratch. User stories, design system, and code — all mine.',
    stack: 'React · Next.js · Tailwind',
    siteUrl: 'https://mleg.tech/',
    codeUrl: 'https://github.com/MikeLegemah5799/mleg-portfolio',
    emoji: '🖥️',
    category: ['Full-Stack'],
  },
  {
    id: 'omny', wide: true, accent: s.accC,
    title: 'OMNY Platform',
    tag: 'Full-Stack · SSR · GraphQL · CMS', tagColor: 'var(--cyan)',
    desc: 'Led SSR component architecture and CMS integration for a high-traffic editorial platform. Built scalable content infrastructure handling complex editorial workflows at production scale. Worked on the CMS in the Laravel framework.',
    stack: 'React · Laravel · PHP · GraphQL · MySQL · JavaScript · SASS',
    siteUrl: 'https://omny.info/',
    emoji: '🌆',
    category: ['Full-Stack', 'Enterprise'],
  },
  {
    id: 'northrop', accent: s.accG,
    title: 'Northrop Grumman',
    tag: 'Enterprise · Defense · Component Lib', tagColor: 'var(--green)',
    desc: 'Led a team building customizable Gutenberg component library for a Fortune 500 defense contractor\'s global web presence.',
    stack: 'WordPress · PHP · React · Bootstrap · MySQL',
    siteUrl: 'https://www.northropgrumman.com/',
    emoji: '🛡️',
    category: ['Enterprise', 'Full-Stack'],
  },
  {
    id: 'bronzeville', accent: s.accO,
    title: 'Bronzeville Lakefront',
    tag: 'Civic · Full-Stack · WordPress', tagColor: 'var(--orange)',
    desc: 'Full-stack development partnership on a community-forward urban development site. Leveraged WordPress as CMS with performance-first engineering.',
    stack: 'WordPress · PHP · Foundation · MySQL · JavaScript',
    siteUrl: 'https://bronzevillelakefront.com/',
    emoji: '🏙️',
    category: ['Full-Stack'],
  },
  {
    id: 'mayo', accent: s.accPk,
    title: 'Mayo Clinic',
    tag: 'Healthcare · Design System · Storybook', tagColor: 'var(--pink)',
    desc: 'Built UI components using Angular and Vue for one of the world\'s top medical institutions. Created a full pattern library in Storybook.',
    stack: 'Angular · Vue · JavaScript · SASS · Storybook',
    siteUrl: 'https://www.mayoclinic.org/',
    emoji: '🏥',
    category: ['Enterprise', 'Full-Stack'],
  },
  {
    id: 'jpmc', accent: s.accY,
    title: 'JP Morgan Chase & Co.',
    tag: 'Finance · Enterprise · AEM', tagColor: 'var(--yellow)',
    desc: 'Built and updated UI components using ES6 JavaScript and SASS for one of the world\'s largest financial institutions. Leveraged Adobe Experience Manager as CMS.',
    stack: 'AEM · JavaScript · SASS',
    siteUrl: 'https://www.jpmorganchase.com/',
    emoji: '🏦',
    category: ['Enterprise'],
  },
  {
    id: 'mini', accent: s.accC,
    title: 'MINI USA',
    tag: 'Automotive · AEM · Angular', tagColor: 'var(--cyan)',
    desc: 'Built and updated UI components using Angular for MINI\'s US digital experience. Leveraged Adobe Experience Manager as CMS.',
    stack: 'AEM · Angular · JavaScript · CSS · Oracle',
    siteUrl: 'https://www.miniusa.com/',
    emoji: '🚗',
    category: ['Enterprise', 'Full-Stack'],
  },
  {
    id: 'akc', accent: s.accG,
    title: 'American Kennel Club',
    tag: 'Non-profit · WordPress · Redesign', tagColor: 'var(--green)',
    desc: 'Worked with a team to build and redesign the AKC website, leveraging WordPress as CMS and Pantheon for managed hosting.',
    stack: 'WordPress · Pantheon · JavaScript · SASS · MySQL',
    siteUrl: 'https://www.akc.org/',
    emoji: '🐾',
    category: ['Full-Stack'],
  },
  {
    id: 'flexatron', accent: s.accP,
    title: 'Flexatron TV',
    tag: 'E-Commerce · Shopify · Streaming', tagColor: 'var(--purple)',
    desc: 'Built and redesigned the site leveraging Shopify as CMS and e-commerce solution, integrating JW Player for streaming.',
    stack: 'Shopify · JW Player · JavaScript · SASS · Liquid',
    siteUrl: 'https://flexatron.tv/',
    emoji: '📺',
    category: ['E-Commerce', 'Full-Stack'],
  },
  {
    id: 'firstpen', accent: s.accO,
    title: 'First And Pen',
    tag: 'Media · WordPress · Full-Stack', tagColor: 'var(--orange)',
    desc: 'Partnered with the CEO on site build, design, and ad campaigns. Full-stack development using WordPress as CMS.',
    stack: 'WordPress · PHP · HTML · MySQL · JavaScript · SASS',
    siteUrl: 'https://firstandpen.com/',
    emoji: '✍️',
    category: ['Full-Stack'],
  },
  {
    id: 'shadow', accent: s.accPk,
    title: 'The Shadow League',
    tag: 'Sports Media · AWS · WordPress', tagColor: 'var(--pink)',
    desc: 'Built and redesigned the site, handled ad campaigns, and managed AWS deployments for a leading sports culture publication.',
    stack: 'WordPress · PHP · MySQL · JavaScript · AWS',
    siteUrl: 'https://theshadowleague.com/',
    emoji: '🏆',
    category: ['Full-Stack'],
  },
  {
    id: 'jdrf', accent: s.accY,
    title: 'JDRF',
    tag: 'Healthcare · Non-profit · WordPress', tagColor: 'var(--yellow)',
    desc: 'Worked with a team to create the Juvenile Diabetes Research Foundation website in WordPress CMS, building fundraising and awareness features.',
    stack: 'WordPress · PHP · jQuery · Bootstrap · MySQL',
    siteUrl: 'https://www.jdrf.org/',
    emoji: '🎗️',
    category: ['Full-Stack'],
  },
];

const FILTERS = ['All', 'AI / ML', 'Enterprise', 'Full-Stack', 'E-Commerce'];

export default function Projects() {
  const gridRef = useReveal(0.04);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = PROJECTS.filter(p =>
    activeFilter === 'All' || p.category.includes(activeFilter)
  );

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* PAGE HEADER */}
        <div className={s.pageHeader}>
          <div className={s.orb1} />
          <div className={s.orb2} />
          <div className={s.phInner}>
            <div className="section-label project-label" style={{ color: 'var(--cyan)' }}>
              Portfolio
            </div>
            <h1 className="section-title">
              A Collection of<br />
              Projects I&apos;m <em className={s.phTitleEm}>Proud Of</em>
            </h1>
            <p className="section-sub">
              From AI systems and enterprise platforms to civic tech and e-commerce — here&apos;s how I&apos;ve spent the last decade building.
            </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className={s.filterBar}>
          <span className={s.filterLabel}>Filter:</span>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`${s.filterBtn}${activeFilter === f ? ` ${s.filterBtnOn}` : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className={s.projectsMain}>
          <div className={`${s.projGrid} reveal`} ref={gridRef}>
            {filtered.map((p) => {
              const isFeatured = p.featured && activeFilter === 'All';
              const isWide = p.wide && activeFilter === 'All';
              const cardCls = [s.projCard, p.accent, isFeatured ? s.heroCard : isWide ? s.wideCard : ''].filter(Boolean).join(' ');
              const visCls = [s.projVis, isFeatured ? s.heroCardVis : isWide ? s.wideCardVis : ''].filter(Boolean).join(' ');

              return (
                <div key={p.id} className={cardCls}>
                  {isFeatured ? (
                    <div className={visCls} style={{ background: 'linear-gradient(135deg,var(--bg-deep),#1c1830)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em' }}>AI-AUGMENTED ANALYTICS</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 34, background: 'linear-gradient(120deg,var(--yellow),var(--orange))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Crypto Intelligence</div>
                      <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                        <span>▲ Real-time</span><span>◎ Inference</span><span>↗ NLQ</span>
                      </div>
                    </div>
                  ) : (
                    <div className={visCls}>{p.emoji}</div>
                  )}

                  <div className={s.projBody}>
                    <div className={s.projTag} style={{ color: p.tagColor }}>{p.tag}</div>
                    <h3 className={s.projTitle}>{p.title}</h3>
                    <p className={s.projDesc}>{p.desc}</p>
                    <div className={s.projFooter}>
                      <div className={s.projLinks}>
                        {p.siteUrl && <a href={p.siteUrl} className={s.plPrimary} target="_blank" rel="noopener noreferrer">View Site →</a>}
                        {p.codeUrl && <a href={p.codeUrl} className={isFeatured ? s.plPrimary : s.plGhost} target="_blank" rel="noopener noreferrer">View Code →</a>}
                        {!p.siteUrl && !p.codeUrl && <span className={s.plGhost}>Code Private</span>}
                      </div>
                      <div className={s.projStack}>{p.stack}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
