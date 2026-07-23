import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { PROJECTS } from '@/data/projects';
import { CASE_STUDIES } from '@/data/caseStudies';
import s from '@/styles/case-study.module.css';

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.featured).map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = CASE_STUDIES[params.slug];
  return { title: cs ? `${cs.title} — Case Study` : 'Case Study' };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.id === params.slug);
  const cs = CASE_STUDIES[params.slug];

  if (!project || !project.featured || !cs) {
    notFound();
  }

  const statColors = ['var(--yellow)', 'var(--text)', 'var(--cyan)'];

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* BREADCRUMB */}
        <div className={s.breadcrumb}>
          <Link href="/projects">Projects</Link>
          <span>›</span>
          <span className={s.breadcrumbCurrent}>{cs.breadcrumbLabel}</span>
        </div>

        {/* HEADER */}
        <div className={s.header}>
          <div className={s.orb1} />
          <div className={s.orb2} />
          <div className={s.headerInner}>
            <div>
              <div className={s.eyebrow}>{cs.eyebrow}</div>
              <h1 className={s.title}>{cs.title}</h1>
              <p className={s.subtitle}>{cs.subtitle}</p>
              <div className={s.techPills}>
                {cs.techPills.map(({ label, color }) => (
                  <span key={label} className={s.techPill} style={{ color }}>{label}</span>
                ))}
              </div>
            </div>

            <div className={s.metaBox}>
              <div className={s.metaRow}>
                <div className={s.metaLabel}>Role</div>
                <div className={s.metaValue}>{cs.meta.role}</div>
              </div>
              <div className={s.metaRow}>
                <div className={s.metaLabel}>Domain</div>
                <div className={s.metaValue}>{cs.meta.domain}</div>
              </div>
              <div className={s.metaRow}>
                <div className={s.metaLabel}>Primary Services</div>
                <div className={s.metaValue}>{cs.meta.primaryServices}</div>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className={s.body}>
          {/* 01 PROBLEM */}
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionNum}>01</span>
              <h2 className={s.sectionTitle}>The problem &amp; requirements</h2>
            </div>
            <div className={s.reqGrid}>
              <div className={s.reqCard}>
                <div className={`${s.reqLabel} ${s.reqLabelFn}`}>Functional</div>
                <ul className={s.reqList}>
                  {cs.problem.functional.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className={s.reqCard}>
                <div className={`${s.reqLabel} ${s.reqLabelNf}`}>Non-functional</div>
                <ul className={s.reqList}>
                  {cs.problem.nonFunctional.map(({ label, text }) => (
                    <li key={label}><strong>{label}:</strong> {text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 02 SCALE */}
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionNum}>02</span>
              <h2 className={s.sectionTitle}>Scale &amp; constraints</h2>
            </div>
            <p className={s.scaleIntro}>{cs.scale.intro}</p>
            <div className={s.statGrid}>
              {cs.scale.stats.map(({ value, label }, i) => (
                <div key={value} className={s.statCard}>
                  <div className={s.statValue} style={{ color: statColors[i % statColors.length] }}>{value}</div>
                  <div className={s.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 03 API DESIGN */}
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionNum}>03</span>
              <h2 className={s.sectionTitle}>API design</h2>
            </div>
            <div className={s.apiBlock}>
              {cs.api.map(({ signature, desc }) => (
                <div key={signature} className={s.apiRow}>
                  <div className={s.apiSig}>{signature}</div>
                  {desc && <div className={s.apiDesc}>{desc}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* 04 DATA MODEL */}
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionNum}>04</span>
              <h2 className={s.sectionTitle}>Data model</h2>
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr><th>Entity</th><th>Key fields</th></tr>
                </thead>
                <tbody>
                  {cs.dataModel.rows.map(({ entity, fields }) => (
                    <tr key={entity}>
                      <td className={s.tdEntity}>{entity}</td>
                      <td className={s.tdFields}>{fields}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={s.modelNote}>
              <code>{cs.dataModel.note.code}</code> {cs.dataModel.note.text}
            </p>
          </section>

          {/* 05 ARCHITECTURE */}
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionNum}>05</span>
              <h2 className={s.sectionTitle}>Architecture</h2>
            </div>
            <p className={s.archIntro}>{cs.architecture.intro}</p>
            <div className={s.diagram}>
              <div className={s.diagRow}>
                <div className={s.diagBox}>
                  <div className={s.diagIcon}>⇧</div>
                  <div className={s.diagLabel}>{cs.architecture.sources.label}</div>
                  <div className={s.diagSub}>{cs.architecture.sources.sub}</div>
                </div>
                <div className={s.diagArrow}>→</div>
                <div className={`${s.diagBox} ${s.diagBoxOrch}`}>
                  <div className={s.diagIcon}>◈</div>
                  <div className={s.diagLabel}>{cs.architecture.orchestrator.label}</div>
                  <div className={s.diagSub}>{cs.architecture.orchestrator.sub}</div>
                </div>
              </div>

              <div className={s.diagRow}>
                {cs.architecture.stages.map(({ label, sub }, i) => (
                  <div key={label} className={s.diagBox}>
                    <div className={s.diagIcon}>{['⇄', '✂', '⬡', '⇩'][i % 4]}</div>
                    <div className={s.diagLabel}>{label}</div>
                    <div className={s.diagSub}>{sub}</div>
                  </div>
                ))}
              </div>

              <div className={s.diagDownArrow}>↓</div>
              <div className={s.diagStorageLabel}>{cs.architecture.storageLabel}</div>

              <div className={s.diagRow} style={{ marginBottom: 0 }}>
                {cs.architecture.storage.map(({ label, sub }, i) => (
                  <div key={label} className={s.diagBox}>
                    <div className={s.diagIcon}>{i === 0 ? '▲' : '▦'}</div>
                    <div className={s.diagLabel}>{label}</div>
                    <div className={s.diagSub}>{sub}</div>
                  </div>
                ))}
              </div>

              <div className={s.diagTags}>
                {cs.architecture.tags.map((t) => <span key={t} className={s.diagTag}>{t}</span>)}
              </div>
            </div>
            <p className={s.archCaption}>{cs.architecture.caption}</p>
          </section>

          {/* 06 DECISIONS */}
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionNum}>06</span>
              <h2 className={s.sectionTitle}>Key decisions &amp; trade-offs</h2>
            </div>
            <div className={s.decisionList}>
              {cs.decisions.map(({ color, label, text }) => (
                <div key={label} className={s.decisionCard} style={{ borderLeftColor: color }}>
                  <strong style={{ color }}>{label}</strong> {text}
                </div>
              ))}
            </div>
          </section>

          {/* SUMMARY */}
          <div className={s.summaryBar}>
            <div>
              <div className={s.summaryLabel}>System</div>
              <div className={s.summaryValue}>{cs.summary.system}</div>
            </div>
            <div>
              <div className={s.summaryLabel}>Primary services</div>
              <div className={s.summaryValue}>{cs.summary.primaryServices}</div>
            </div>
            <div>
              <div className={s.summaryLabel}>Status</div>
              <div className={s.summaryValue}>{cs.summary.status}</div>
            </div>
            <div>
              <div className={s.summaryLabel}>Type</div>
              <div className={s.summaryValue}>{cs.summary.type}</div>
            </div>
          </div>

          {/* FOOTER CTA */}
          <div className={s.footerCta}>
            <p className={s.footerCtaText}>Interested in the architecture behind this or another project?</p>
            <div className={s.footerCtaBtns}>
              <Link href="/projects" className="btn-outline">← Back to projects</Link>
              <Link href="/contact" className="btn-primary">✉ Get in touch</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
