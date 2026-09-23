'use client';

import { useState } from 'react';
import s from '@/styles/blog-post.module.css';

const PRICE_PER_M = 0.042;

const fmt = (x: number, d: number) =>
  x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const usd = (x: number) => (x < 1 ? `$${fmt(x, 3)}` : `$${fmt(x, 2)}`);

export function CostCalculator() {
  const [judgments, setJudgments] = useState(5000);
  const [tokens, setTokens] = useState(1500);
  const daily = (judgments * tokens / 1e6) * PRICE_PER_M;

  return (
    <div className={s.calc}>
      <label htmlFor="calc-n">Judgments per day <span>{fmt(judgments, 0)}</span></label>
      <input id="calc-n" type="range" min={100} max={100000} step={100} value={judgments}
        onChange={(e) => setJudgments(+e.target.value)} />
      <label htmlFor="calc-t">Input tokens per judgment <span>{fmt(tokens, 0)}</span></label>
      <input id="calc-t" type="range" min={200} max={8000} step={100} value={tokens}
        onChange={(e) => setTokens(+e.target.value)} />
      <div className={s.calcOut}>
        <div><small>Jev, per day</small><b>{usd(daily)}</b></div>
        <div><small>Jev, per month (30 days)</small><b>{usd(daily * 30)}</b></div>
        <div className={s.calcImplied}><small>Implied judge cost per day at 40x</small><b>{usd(daily * 40)}</b></div>
        <div className={s.calcImplied}><small>Implied judge cost per day at 400x</small><b>{usd(daily * 400)}</b></div>
      </div>
      <p className={s.calcFine}>
        Formula: judgments × tokens ÷ 1,000,000 × $0.042. Output tokens are free. The sliders are illustrative defaults, not real volume.
      </p>
    </div>
  );
}
