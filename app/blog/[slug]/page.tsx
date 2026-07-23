import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import PostActions from '@/components/PostActions';
import NewsletterForm from '@/components/NewsletterForm';
import { mdxComponents } from '@/components/BlogMDXComponents';
import { getAllPosts, getPostBySlug, getRelatedPosts, CATEGORY_COLORS } from '@/lib/blog';
import s from '@/styles/blog-post.module.css';
import b from '@/styles/blog.module.css';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

function postExists(slug: string) {
  return fs.existsSync(path.join(process.cwd(), 'content/blog', `${slug}.mdx`));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!postExists(params.slug)) return { title: 'Post not found' };
  const post = getPostBySlug(params.slug);
  return { title: post.title, description: post.desc };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!postExists(params.slug)) notFound();

  const post = getPostBySlug(params.slug);
  const related = getRelatedPosts(params.slug);
  const catColor = CATEGORY_COLORS[post.category] ?? 'var(--soft)';

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        <div className={s.top}>
          <Link href="/blog" className={s.backLink}>← Back to blog</Link>
        </div>

        <article>
          <header className={s.header}>
            <div className={s.headerTop}>
              <span className={s.catBadge} style={{ color: 'var(--bg-deep)', background: catColor }}>{post.category}</span>
              <span className={s.postMeta}>{formatDate(post.date)} · {post.readTime} read</span>
            </div>
            <h1 className={s.title}>{post.title}</h1>
            <p className={s.subtitle}>{post.desc}</p>

            <div className={s.authorRow}>
              <div className={s.authorLeft}>
                <div className={s.avatar} />
                <div>
                  <div className={s.authorName}>Michael Legemah</div>
                  <div className={s.authorRole}>Principal AI Engineer</div>
                </div>
              </div>
              <PostActions title={post.title} />
            </div>
          </header>

          <div className={s.heroVis}>
            <div className={s.heroVisInner}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="2.4" />
                <circle cx="6" cy="18" r="2.4" />
                <circle cx="18" cy="12" r="2.4" />
                <path d="M6 8.4V15.6" />
                <path d="M8.2 7.2 15.8 10.8" />
                <path d="M8.2 16.8 15.8 13.2" />
              </svg>
            </div>
          </div>

          <div className={s.prose}>
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <div className={s.tagsRow}>
            {post.tags.map((t) => <span key={t} className={s.tag}>{t}</span>)}
          </div>

          <div className={s.authorBio}>
            <div className={s.authorBioInner}>
              <div className={s.authorBioAvatar} />
              <div>
                <div className={s.authorBioName}>Michael Legemah</div>
                <p className={s.authorBioText}>
                  Principal AI Engineer building agentic systems, RAG pipelines, and eval infrastructure on AWS.
                  Currently at AWS, previously shipping AI features into regulated clinical-trial and healthcare platforms.
                </p>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className={s.related}>
              <div className={s.moreLabel}>More on this</div>
              <div className={s.relatedGrid}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className={s.relatedCard}>
                    <div className={s.relatedCat} style={{ color: CATEGORY_COLORS[r.category] ?? 'var(--soft)' }}>{r.category}</div>
                    <div className={s.relatedTitle}>{r.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className={s.newsletterWrap}>
            <NewsletterForm />
          </div>
        </article>

        <div className={b.footerBar} style={{ paddingLeft: 60, paddingRight: 60 }}>
          <span>mleg.tech — writing on AI systems, shipped and unglamorous.</span>
          <Link href="/rss">📡 RSS feed</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
