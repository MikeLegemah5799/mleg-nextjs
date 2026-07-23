'use client';

import { useState } from 'react';
import s from '@/styles/blog-post.module.css';

export default function PostActions({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the share sheet — nothing to do
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    window.alert('Link copied to clipboard');
  };

  return (
    <div className={s.authorActions}>
      <button type="button" className={s.iconBtn} onClick={handleShare} aria-label="Share this post">
        ⤴
      </button>
      <button
        type="button"
        className={s.iconBtn}
        onClick={() => setSaved((v) => !v)}
        aria-label={saved ? 'Remove bookmark' : 'Bookmark this post'}
        style={saved ? { color: 'var(--yellow)', borderColor: 'rgba(255,216,102,0.35)' } : undefined}
      >
        {saved ? '★' : '☆'}
      </button>
    </div>
  );
}
