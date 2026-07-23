'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import NewsletterForm from '@/components/NewsletterForm';
import { CATEGORY_COLORS, type Post } from '@/lib/blog-shared';
import s from '@/styles/blog.module.css';

const CATEGORIES = ['All posts', 'Agentic AI', 'RAG', 'Eval & testing', 'AWS', 'Career'];
const PAGE_SIZE = 6;

export default function BlogIndexClient({ featured, posts }: { featured?: Post; posts: Post[] }) {
  const [activeFilter, setActiveFilter] = useState('All posts');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesFilter = activeFilter === 'All posts' || p.category === activeFilter;
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [posts, activeFilter, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pagePosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const showFeatured = !!featured && activeFilter === 'All posts' && !query.trim();

  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
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
              <div className="section-label">Writing</div>
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
              <Link href="/rss" className={s.rssBtn}>📡 RSS</Link>
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
          {showFeatured && featured && (
            <Link href={`/blog/${featured.slug}`} className={s.featured}>
              <div className={s.featuredBody}>
                <div className={s.featuredTop}>
                  <span className={s.featuredBadge}>Featured</span>
                  <span className={s.featuredCat}>{featured.category}</span>
                </div>
                <h2 className={s.featuredTitle}>{featured.title}</h2>
                <p className={s.featuredDesc}>{featured.desc}</p>
                <div className={s.featuredMeta}>{formatDate(featured.date)} · {featured.readTime} read</div>
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
            </Link>
          )}

          <div className={s.recentLabel}>Recent Posts</div>

          {pagePosts.length > 0 ? (
            <div className={s.postGrid}>
              {pagePosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={s.postCard}>
                  <div className={s.postCat} style={{ color: CATEGORY_COLORS[p.category] }}>{p.category}</div>
                  <h3 className={s.postTitle}>{p.title}</h3>
                  <p className={s.postDesc}>{p.desc}</p>
                  <div className={s.postMeta}>{formatDate(p.date)} · {p.readTime}</div>
                </Link>
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
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
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
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          <NewsletterForm />
        </div>

        {/* FOOTER BAR */}
        <div className={s.footerBar}>
          <span>mleg.tech — writing on AI systems, shipped and unglamorous.</span>
          <Link href="/rss">📡 RSS feed</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
