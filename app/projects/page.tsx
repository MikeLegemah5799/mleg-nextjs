'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import { PROJECTS } from '@/data/projects';
import s from '@/styles/projects.module.css';

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
              const cardCls = [s.projCard, s[p.accent], isFeatured ? s.heroCard : isWide ? s.wideCard : ''].filter(Boolean).join(' ');
              const visCls = [s.projVis, isFeatured ? s.heroCardVis : isWide ? s.wideCardVis : ''].filter(Boolean).join(' ');

              return (
                <div key={p.id} className={cardCls}>
                  {isFeatured ? (
                    <div className={visCls} style={{ background: 'linear-gradient(135deg,var(--bg-deep),#1c1830)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.tagColor, letterSpacing: '0.1em' }}>{p.tag.toUpperCase()}</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 30, background: 'linear-gradient(120deg,var(--yellow),var(--orange))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{p.title}</div>
                      <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                        {p.highlights?.map((h) => <span key={h}>{h}</span>)}
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
                        {p.featured && <Link href={`/projects/${p.id}`} className={s.plPrimary}>Read Case Study →</Link>}
                        {p.siteUrl && <a href={p.siteUrl} className={isFeatured ? s.plGhost : s.plPrimary} target="_blank" rel="noopener noreferrer">View Site →</a>}
                        {p.codeUrl && <a href={p.codeUrl} className={isFeatured ? s.plGhost : s.plPrimary} target="_blank" rel="noopener noreferrer">View Code →</a>}
                        {!p.siteUrl && !p.codeUrl && !p.featured && <span className={s.plGhost}>Code Private</span>}
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
