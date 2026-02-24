'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import s from '@/styles/contact.module.css';

const METHOD_CARDS = [
  {
    href: 'mailto:michaellegemah@gmail.com',
    cardCls: s.mcEmail, iconCls: s.iconY, icon: '✉️',
    type: 'Email', value: 'michaellegemah@gmail.com', arrow: '→',
  },
  {
    href: 'tel:5162731611',
    cardCls: s.mcPhone, iconCls: s.iconC, icon: '📱',
    type: 'Phone', value: '516-273-1611', arrow: '→',
  },
  {
    href: 'https://github.com/MikeLegemah5799',
    cardCls: s.mcGh, iconCls: s.iconG, icon: '🐙',
    type: 'GitHub', value: 'MikeLegemah5799', arrow: '↗', external: true,
  },
  {
    href: 'https://linkedin.com/in/michaellegemah',
    cardCls: s.mcLi, iconCls: s.iconP, icon: '💼',
    type: 'LinkedIn', value: '/in/michaellegemah', arrow: '↗', external: true,
  },
];

const CC_LIST = [
  { cls: 'liY',  text: 'LLM Architecture & RAG System Design' },
  { cls: 'liC',  text: 'AI Product Strategy & Engineering' },
  { cls: 'liG',  text: 'Full-Stack Development' },
  { cls: 'liP',  text: 'Technical Leadership & Mentorship' },
  { cls: 'liPk', text: 'AI Consulting & Proof of Concepts' },
];

export default function Contact() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        <div className={s.contactMain}>

          {/* LEFT */}
          <div className={s.contactLeft}>
            <div className={s.g1} />
            <div className={s.g2} />
            <div className={s.clInner}>
              <div className="section-label">Get In Touch</div>
              <h1 className={s.clTitle}>
                Let&apos;s Build Something<br />
                <em className={s.clTitleEm}>Intelligent</em>
              </h1>
              <p className={s.clSub}>
                Whether you&apos;re launching an AI product, scaling an existing system, exploring
                what&apos;s possible, or just want to connect — I&apos;m all ears.
              </p>

              <div className={s.contactMethods}>
                {METHOD_CARDS.map(({ href, cardCls, iconCls, icon, type, value, arrow, external }) => (
                  <a
                    key={type}
                    href={href}
                    className={`${s.methodCard} ${cardCls}`}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className={`${s.methodIcon} ${iconCls}`}>{icon}</div>
                    <div className={s.methodInfo}>
                      <div className={s.methodType}>{type}</div>
                      <div className={s.methodVal}>{value}</div>
                    </div>
                    <div className={s.methodArrow}>{arrow}</div>
                  </a>
                ))}
              </div>

              <div className={s.availBadge}>
                <div className={s.availDot} />
                <div className={s.availText}>
                  <strong>Available for new engagements</strong>
                  <span> — AI Engineering &amp; Consulting</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={s.contactRight}>
            <div className={s.g3} />
            <div className={s.g4} />
            <div className={s.contactCard}>
              <div className={s.ccStatus}>Available for work</div>
              <h2 className={s.ccGreeting}>Hey, let&apos;s work<br />together.</h2>
              <p className={s.ccDesc}>
                I&apos;m currently taking on new AI engineering projects, consulting engagements,
                and fractional principal engineer roles.
              </p>

              <ul className={s.ccList}>
                {CC_LIST.map(({ cls, text }) => (
                  <li key={text} className={(s as Record<string, string>)[cls]}>{text}</li>
                ))}
              </ul>

              <a href="mailto:michaellegemah@gmail.com" className={s.ccCta}>
                Send a Message →
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
