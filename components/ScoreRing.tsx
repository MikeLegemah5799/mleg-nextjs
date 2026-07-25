'use client';

import { useEffect, useRef } from 'react';

const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface ScoreRingProps {
  score: number;
  color: string;
}

export function ScoreRing({ score, color }: ScoreRingProps) {
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const pct = Math.max(0, Math.min(100, score));
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * pct) / 100;
    const frame = requestAnimationFrame(() => {
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(offset);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <svg width={140} height={140} viewBox="0 0 140 140" role="img" aria-label={`${Math.round(score)} percent match`}>
      <circle cx={70} cy={70} r={RADIUS} fill="none" stroke="var(--bg-card)" strokeWidth={12} />
      <circle
        ref={ringRef}
        cx={70}
        cy={70}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE}
        transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease' }}
      />
      <text x={70} y={65} textAnchor="middle" fontSize={30} fontWeight={700} fill="var(--text)">
        {Math.round(score)}%
      </text>
      <text x={70} y={86} textAnchor="middle" fontSize={11} fill="var(--muted)">
        match
      </text>
    </svg>
  );
}
