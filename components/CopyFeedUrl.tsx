'use client';

import { useState } from 'react';
import s from '@/styles/rss.module.css';

export default function CopyFeedUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" className={s.copyBtn} onClick={handleCopy}>
      {copied ? '✓ Copied' : '⧉ Copy'}
    </button>
  );
}
