'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useReveal } from '@/components/useReveal';
import s from '@/styles/about.module.css';

const FOCUS_PILLS = [
  { label: 'AI Engineering', cls: s.fpY },
  { label: 'LLM Architecture', cls: s.fpC },
  { label: 'Web Development', cls: s.fpG },
  { label: 'Content Strategy & CMS', cls: s.fpP },
  { label: 'Accessibility', cls: s.fpPk },
  { label: 'Mentorship', cls: s.fpO },
  { label: 'Cyber Security', cls: s.fpY },
  { label: 'User Experience', cls: s.fpC },
];

const TIMELINE = [
  {
    color: 'var(--yellow)', date: 'Mid 1980s — Early 1990s · The Curiosity',
    title: 'Where It All Started',
    body: `As a kid, I was always fascinated by tech and science — always wanting to know how video games worked. In 3rd grade, a computer class introduced me to the Logo programming language. Moving the Turtle cursor on screen sparked something that never switched off: a voracious appetite for understanding how software could bring imagination to life.`,
  },
  {
    color: 'var(--cyan)', date: 'Early 1990s — Late 1990s · The Growth',
    title: 'BASIC, Pascal & Apple IIe',
    body: `In junior high, my fascination with programming deepened on the Apple IIe and Apple IIgs. I transitioned from Logo to BASIC, PASCAL, and Fortran — each language expanding my toolkit. Creating loops that produced mesmerizing patterns taught me the power of iteration and logic — concepts that would prove invaluable for decades to come.`,
  },
  {
    color: 'var(--green)', date: 'Early 2000s — 2010 · Programming on the Internet',
    title: 'HTML, CSS, JavaScript — The Web Era',
    body: `Insatiable curiosity led me to web development. Armed with programming books and a thirst for knowledge, I taught myself HTML, CSS, and JavaScript. From crafting my first basic web page to writing functions that responded to user interactions — the web felt like a canvas with no limits.`,
  },
  {
    color: 'var(--purple)', date: '2010s — 2020s · The Professional Grind',
    title: 'WordPress, PHP & the Enterprise',
    body: `I mastered WordPress, PHP, and full-stack development through platforms like Treehouse and FreeCodeCamp. Secured my first tech industry role, then kept climbing — working with JP Morgan, Mayo Clinic, Northrop Grumman, Estée Lauder, and dozens more. Each project built confidence and proficiency that no textbook could replicate.`,
  },
  {
    color: 'var(--pink)', date: '2020s — Now · The AI Era',
    title: 'Principal AI Engineer',
    body: `The emergence of large language models and the AI revolution drew me in completely. I've gone deep on LLM architecture, RAG systems, agentic workflows, and AI product engineering. Today I operate at the intersection of deep technical expertise and strategic leadership — building the intelligent systems that will define the next decade.`,
  },
];

export default function About() {
  const stackRef = useReveal();
  const timelineRef = useReveal(0.04);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* HERO */}
        <div className={s.aboutHero}>
          <div className={s.orb1} />
          <div className={s.orb2} />
          <div className={s.heroInner}>
            <div className="section-label">About Me</div>
            <h1 className={s.heroTitle}>
              So Who Is<br />
              <em className={s.heroTitleEm}>Michael Legemah?</em>
            </h1>
            <p className={s.heroDesc}>
              I&apos;m a <strong>Principal AI Engineer</strong> with a front-end bias and over 10 years of
              professional experience — spanning financial services, healthcare, defense, and consumer brands.
              I&apos;ve evolved from building pixel-perfect interfaces to architecting production AI systems that
              actually ship and scale.
            </p>
          </div>
        </div>

        {/* FOCUS BAR */}
        <div className={s.focusBar}>
          <span className={s.focusLabel}>Focus:</span>
          {FOCUS_PILLS.map(({ label, cls }) => (
            <span key={label} className={`${s.focusPill} ${cls}`}>{label}</span>
          ))}
        </div>

        {/* TECH STACK */}
        <section className={s.stackSection}>
          <div className="section-label">Technology</div>
          <h2 className="section-title">Technologies I Work With</h2>

          <div className={`${s.stackGrid} reveal`} ref={stackRef}>
            {/* AI / ML */}
            <div className={`${s.stackCard} ${s.catAi}`}>
              <div className={s.stackCat}>AI &amp; Machine Learning</div>
              <div className={s.stackSub}>Frameworks &amp; Libraries</div>
              <div className={s.stackRow}>
                {['LangChain', 'LlamaIndex', 'Hugging Face', 'OpenAI SDK'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>LLM Models</div>
              <div className={s.stackRow}>
                {['Claude', 'GPT', 'Gemini', 'Llama', 'Mistral', 'Nova Pro'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Vector Databases</div>
              <div className={s.stackRow}>
                {['Pinecone', 'Chroma', 'Weaviate', 'Faiss'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Diffusion Models</div>
              <div className={s.stackRow}>
                {['Stable Diffusion', 'DALL-E', 'Midjourney', 'Firefly'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
            </div>

            {/* FRONT END */}
            <div className={`${s.stackCard} ${s.catFe}`}>
              <div className={s.stackCat}>Front End</div>
              <div className={s.stackSub}>Languages</div>
              <div className={s.stackRow}>
                {['JavaScript', 'TypeScript', 'HTML', 'CSS'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Frameworks</div>
              <div className={s.stackRow}>
                {['Next.js', 'React', 'Angular', 'Vue', 'Svelte'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Libraries &amp; Tooling</div>
              <div className={s.stackRow}>
                {['Framer Motion', 'GSAP', 'HighCharts', 'Tailwind', 'Bootstrap'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Mobile</div>
              <div className={s.stackRow}>
                {['React Native', 'PWA'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
            </div>

            {/* BACK END */}
            <div className={`${s.stackCard} ${s.catBe}`}>
              <div className={s.stackCat}>Back End</div>
              <div className={s.stackSub}>Languages</div>
              <div className={s.stackRow}>
                {['Python', 'PHP', 'Lua', 'Solidity', 'C#'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Frameworks</div>
              <div className={s.stackRow}>
                {['FastAPI', 'Django', 'Flask', 'Laravel', 'Express', '.NET'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>APIs &amp; Runtime</div>
              <div className={s.stackRow}>
                {['GraphQL', 'REST', 'Node', 'Deno'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
            </div>

            {/* DATABASES */}
            <div className={`${s.stackCard} ${s.catDb}`}>
              <div className={s.stackCat}>Databases</div>
              <div className={s.stackSub}>Relational</div>
              <div className={s.stackRow}>
                {['PostgreSQL', 'MySQL', 'MariaDB', 'AuroraDB'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>NoSQL &amp; Cache</div>
              <div className={s.stackRow}>
                {['MongoDB', 'Firestore', 'Redis', 'Memcached'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
            </div>

            {/* CLOUD */}
            <div className={`${s.stackCard} ${s.catCl}`}>
              <div className={s.stackCat}>Cloud &amp; DevOps</div>
              <div className={s.stackSub}>Platforms</div>
              <div className={s.stackRow}>
                {['AWS', 'GCP', 'Azure', 'Vercel'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Tools</div>
              <div className={s.stackRow}>
                {['Docker', 'Linux', 'RabbitMQ', 'OpenSSL', 'Keycloak'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Analytics</div>
              <div className={s.stackRow}>
                {['Google Analytics', 'GTM', 'Jupyter'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
            </div>

            {/* CMS */}
            <div className={`${s.stackCard} ${s.catCm}`}>
              <div className={s.stackCat}>CMS &amp; E-Commerce</div>
              <div className={s.stackSub}>Platforms</div>
              <div className={s.stackRow}>
                {['WordPress', 'Shopify', 'Drupal', 'AEM', 'Expression Engine'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
              <div className={s.stackSub}>Templating</div>
              <div className={s.stackRow}>
                {['Liquid', 'Twig', 'Handlebars'].map(t => <span key={t} className={s.stag}>{t}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className={s.timelineSection}>
          <div className="section-label">My Story</div>
          <h2 className="section-title">The Journey That<br />Built the Engineer</h2>
          <div className={`${s.timeline} reveal`} ref={timelineRef}>
            {TIMELINE.map(({ color, date, title, body }) => (
              <div key={title} className={s.tlItem}>
                <div className={s.tlDot} style={{ background: color }} />
                <div className={s.tlDate} style={{ color }}>{date}</div>
                <h3 className={s.tlTitle}>{title}</h3>
                <p className={s.tlBody}>{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
