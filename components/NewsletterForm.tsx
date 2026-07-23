'use client';

import b from '@/styles/blog.module.css';

export default function NewsletterForm() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (new FormData(e.currentTarget).get('email') as string) || '';
    window.location.href = `mailto:michaellegemah@gmail.com?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent(`Please subscribe: ${email}`)}`;
  };

  return (
    <form className={b.newsletter} onSubmit={handleSubscribe}>
      <div>
        <div className={b.newsletterTitle}>Get new posts by email</div>
        <div className={b.newsletterSub}>One email when something new goes up. No drip campaign, no filler.</div>
      </div>
      <div className={b.newsletterForm}>
        <input
          name="email"
          type="email"
          required
          className={b.newsletterInput}
          placeholder="you@email.com"
          aria-label="Email address"
        />
        <button type="submit" className="btn-primary">Subscribe</button>
      </div>
    </form>
  );
}
