import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import CopyFeedUrl from '@/components/CopyFeedUrl';
import FeedSourcePreview from '@/components/FeedSourcePreview';
import { CATEGORY_COLORS } from '@/lib/blog-shared';
import { FEED_URL, getFeedPosts, buildFeedPreviewXml } from '@/lib/feed';
import s from '@/styles/rss.module.css';

export const metadata = {
  title: 'RSS Feed',
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default function RssPage() {
  const posts = getFeedPosts();
  const lastUpdated = posts[0] ? formatDate(posts[0].date) : '—';
  const feedProtocolUrl = `feed:${FEED_URL}`;

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        <div className={s.body}>
          <div className={s.urlBar}>
            <div className={s.urlLeft}>
              <span className={s.urlIcon}>📡</span>
              <span>mleg.tech/feed.xml</span>
            </div>
            <CopyFeedUrl url={FEED_URL} />
          </div>

          <div className={s.infoCard}>
            <div className={s.infoIcon}>📡</div>
            <div>
              <div className={s.infoTitle}>This is an RSS feed</div>
              <p className={s.infoSub}>Subscribe to get new posts from mleg.tech in your reader of choice.</p>
              <div className={s.infoBtns}>
                <a href={feedProtocolUrl} className="btn-primary">📡 Subscribe in reader</a>
                <a
                  href={`https://feedly.com/i/subscription/feed/${encodeURIComponent(FEED_URL)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.readerBtn}
                >
                  Feedly
                </a>
                <a href={feedProtocolUrl} className={s.readerBtn}>NetNewsWire</a>
                <a
                  href={`https://www.inoreader.com/?add_feed=${encodeURIComponent(FEED_URL)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.readerBtn}
                >
                  Inoreader
                </a>
              </div>
            </div>
          </div>

          <div className={s.statsBar}>
            <div>
              <div className={s.statLabel}>Format</div>
              <div className={s.statValue}>Atom 1.0</div>
            </div>
            <div>
              <div className={s.statLabel}>Items</div>
              <div className={s.statValue}>{posts.length} entries</div>
            </div>
            <div>
              <div className={s.statLabel}>Last updated</div>
              <div className={s.statValue}>{lastUpdated}</div>
            </div>
            <div>
              <div className={s.statLabel}>Author</div>
              <div className={s.statValue}>Michael Legemah</div>
            </div>
          </div>

          <div className={s.sectionLabel}>Feed Entries</div>
          <div className={s.entryList}>
            {posts.map((p) => (
              <div key={p.slug} className={s.entryCard}>
                <div className={s.entryTop}>
                  <span className={s.entryCat} style={{ color: CATEGORY_COLORS[p.category] }}>{p.category}</span>
                  <span className={s.entryDate}>{formatDate(p.date)}</span>
                </div>
                <div className={s.entryTitle}>{p.title}</div>
                <p className={s.entryDesc}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className={s.sectionLabel}>Raw Feed Source</div>
          <FeedSourcePreview xml={buildFeedPreviewXml(posts)} />

          <div className={s.footerBar}>
            <span>mleg.tech — writing on AI systems, shipped and unglamorous.</span>
            <Link href="/blog" className="btn-outline">← Back to blog</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
