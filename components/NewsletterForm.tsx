'use client';

import { useState } from 'react';
import b from '@/styles/blog.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string) || '';

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again in a bit.');
        return;
      }

      setStatus('success');
      setMessage("You're subscribed — check your inbox for a confirmation.");
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Network error. Try again in a bit.');
    }
  };

  return (
    <form className={b.newsletter} onSubmit={handleSubscribe}>
      <div>
        <div className={b.newsletterTitle}>Get new posts by email</div>
        <div className={b.newsletterSub}>One email when something new goes up. No drip campaign, no filler.</div>
        {message && (
          <div
            role="status"
            className={b.newsletterMsg}
            style={{ color: status === 'error' ? 'var(--pink)' : 'var(--green)' }}
          >
            {message}
          </div>
        )}
      </div>
      <div className={b.newsletterForm}>
        <input
          name="email"
          type="email"
          required
          disabled={status === 'submitting'}
          className={b.newsletterInput}
          placeholder="you@email.com"
          aria-label="Email address"
        />
        <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
}
