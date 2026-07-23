import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import s from '@/styles/not-found.module.css';

export const metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        <section className={s.hero}>
          <div className={s.orbPink} />
          <div className={s.orbCyan} />
          <div className={s.orbGreen} />

          <div className={s.badge}>
            <span className={s.badgeDot} />
            HTTP 404 · Route Not Found
          </div>

          <h1 className={s.code}>404</h1>

          <div className={s.terminal}>
            <div className={s.terminalBar}>
              <div className={`${s.tdot} ${s.tdotR}`} />
              <div className={`${s.tdot} ${s.tdotY}`} />
              <div className={`${s.tdot} ${s.tdotG}`} />
            </div>
            <div className={s.terminalBody}>
              <span className={s.tl}><span className={s.prompt}>$</span>curl mleg.tech/this-page</span>
              <span className={`${s.tl} ${s.errLine}`}>✗ 404 Not Found <span className={s.comment}>// route does not exist in this build</span></span>
              <span className={s.tl}><span className={s.prompt}>$</span><span className={s.suggest}>suggest --nearest-route</span></span>
            </div>
          </div>

          <h2 className={s.title}>This page didn&apos;t ship.</h2>
          <p className={s.sub}>
            The route you&apos;re looking for either moved, never existed, or is still sitting in a feature branch. Let&apos;s get you back on track.
          </p>

          <div className={s.ctas}>
            <Link href="/" className="btn-primary">🏠 Back to Home</Link>
            <Link href="/projects" className="btn-outline">View Projects →</Link>
          </div>

          <div className={s.quickLinks}>
            <Link href="/projects">📁 Projects</Link>
            <Link href="/about">👤 About</Link>
            <Link href="/contact">✉️ Contact</Link>
          </div>

          <p className={s.reportLine}>
            Error code: 404 — if this feels wrong, it probably is.{' '}
            <a href="mailto:michaellegemah@gmail.com">Report it →</a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
