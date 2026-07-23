'use client';

import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import s from '@/styles/blog.module.css';

const CATEGORY_COLORS: Record<string, string> = {
  'Agentic AI': 'var(--pink)',
  'RAG': 'var(--cyan)',
  'Eval & testing': 'var(--green)',
  'AWS': 'var(--orange)',
  'Career': 'var(--purple)',
};

const CATEGORIES = ['All posts', 'Agentic AI', 'RAG', 'Eval & testing', 'AWS', 'Career'];

const FEATURED = {
  category: 'Agentic AI',
  title: 'What Actually Breaks When You Put LangGraph Agents in Production',
  desc: 'Reducer bugs, state bloat, and the deep-merge fix that took a full day to trace — lessons from running multi-agent workflows on AWS Bedrock at scale.',
  date: 'Jun 14, 2026', readTime: '9 min read',
};

const POSTS = [
  {
    category: 'RAG',
    title: 'Chunking Strategy Matters More Than Your Embedding Model',
    desc: 'Why fixed-size chunking quietly tanks retrieval quality, and what content-hash dedup buys you at scale.',
    date: 'Jun 2, 2026', readTime: '6 min',
  },
  {
    category: 'Eval & testing',
    title: 'LLM-as-a-Judge: Building Quality Gates Into CI/CD',
    desc: 'How an eval pipeline caught stale-context regressions before they reached production, and what it cost to build.',
    date: 'May 21, 2026', readTime: '8 min',
  },
  {
    category: 'AWS',
    title: 'Bedrock + AppSync: A GraphQL Front Door for Agentic Workflows',
    desc: 'Decoupling frontend from backend on multi-step AI processes without losing type safety or introducing polling.',
    date: 'May 9, 2026', readTime: '7 min',
  },
  {
    category: 'Agentic AI',
    title: 'Claude Code as a Force Multiplier, Not a Replacement',
    desc: 'What actually changes on a team\'s velocity and review process once AI-assisted engineering is the default, not the exception.',
    date: 'Apr 28, 2026', readTime: '5 min',
  },
  {
    category: 'Career',
    title: 'From Front-End to Principal AI Engineer: What Actually Transferred',
    desc: 'A decade of component-driven thinking turned out to be surprisingly good prep for orchestrating agents.',
    date: 'Apr 12, 2026', readTime: '10 min',
  },
  {
    category: 'RAG',
    title: 'Multi-Tenant Vector Isolation: Namespaces Aren\'t Enough',
    desc: 'Why structural IAM scoping matters more than an application-layer tenant filter when the stakes are a data leak.',
    date: 'Mar 30, 2026', readTime: '6 min',
  },
];

const PAGE_COUNT = 3;

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All posts');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      const matchesFilter = activeFilter === 'All posts' || p.category === activeFilter;
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  const showFeatured = activeFilter === 'All posts' && !query.trim()
    && FEATURED.title.toLowerCase().includes(query.trim().toLowerCase());

  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (new FormData(e.currentTarget).get('email') as string) || '';
    window.location.href = `mailto:michaellegemah@gmail.com?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent(`Please subscribe: ${email}`)}`;
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
          <div className={s.heroTop}>
            <div>
              <div className="section-label" style={{ color: 'var(--cyan)' }}>Writing</div>
              <h1 className={s.heroTitle}>Notes on building AI systems that ship.</h1>
              <p className={s.heroSub}>
                Agentic architecture, RAG, eval-driven development, and what actually breaks in production —
                written from inside the build, not after a demo.
              </p>
            </div>
            <div className={s.heroTools}>
              <div className={s.searchBox}>
                <span className={s.searchIcon}>🔍</span>
                <input
                  className={s.searchInput}
                  placeholder="Search posts…"
                  value={query}
                  onChange={handleSearch}
                  aria-label="Search posts"
                />
              </div>
              <a
                href="/rss.xml"
                className={s.rssBtn}
              >
                📡 RSS
              </a>
            </div>
          </div>

          <div className={s.filterBar}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`${s.filterBtn}${activeFilter === cat ? ` ${s.filterBtnOn}` : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className={s.main}>
          {showFeatured && (
            <div className={s.featured}>
              <div className={s.featuredBody}>
                <div className={s.featuredTop}>
                  <span className={s.featuredBadge}>Featured</span>
                  <span className={s.featuredCat}>{FEATURED.category}</span>
                </div>
                <h2 className={s.featuredTitle}>{FEATURED.title}</h2>
                <p className={s.featuredDesc}>{FEATURED.desc}</p>
                <div className={s.featuredMeta}>{FEATURED.date} · {FEATURED.readTime}</div>
              </div>
              <div className={s.featuredVis}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="2.4" />
                  <circle cx="6" cy="18" r="2.4" />
                  <circle cx="18" cy="12" r="2.4" />
                  <path d="M6 8.4V15.6" />
                  <path d="M8.2 7.2 15.8 10.8" />
                  <path d="M8.2 16.8 15.8 13.2" />
                </svg>
              </div>
            </div>
          )}

          <div className={s.recentLabel}>Recent Posts</div>

          {filtered.length > 0 && page === 1 ? (
            <div className={s.postGrid}>
              {filtered.map(({ category, title, desc, date, readTime }) => (
                <div key={title} className={s.postCard}>
                  <div className={s.postCat} style={{ color: CATEGORY_COLORS[category] }}>{category}</div>
                  <h3 className={s.postTitle}>{title}</h3>
                  <p className={s.postDesc}>{desc}</p>
                  <div className={s.postMeta}>{date} · {readTime}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={s.emptyState}>
              {filtered.length === 0 ? 'No posts match that search or filter.' : 'More posts coming soon.'}
            </div>
          )}

          <div className={s.pagination}>
            <button
              className={s.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            {Array.from({ length: PAGE_COUNT }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`${s.pageBtn}${page === n ? ` ${s.pageBtnOn}` : ''}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className={s.pageBtn}
              onClick={() => setPage((p) => Math.min(PAGE_COUNT, p + 1))}
              disabled={page === PAGE_COUNT}
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          <form className={s.newsletter} onSubmit={handleSubscribe}>
            <div>
              <div className={s.newsletterTitle}>Get new posts by email</div>
              <div className={s.newsletterSub}>One email when something new goes up. No drip campaign, no filler.</div>
            </div>
            <div className={s.newsletterForm}>
              <input
                name="email"
                type="email"
                required
                className={s.newsletterInput}
                placeholder="you@email.com"
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </div>
          </form>
        </div>

        {/* FOOTER BAR */}
        <div className={s.footerBar}>
          <span>mleg.tech — writing on AI systems, shipped and unglamorous.</span>
          <a href="/rss.xml">📡 RSS feed</a>
        </div>
      </main>

      <Footer />
    </>
  );
}
