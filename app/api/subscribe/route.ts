import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OWNER_EMAIL = 'michaellegemah@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'mleg.tech <onboarding@resend.dev>';

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Subscriptions are temporarily unavailable.' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Notify Michael so the new subscriber can be added to whatever list he's actually mailing from.
    const notify = resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: 'New blog subscriber',
      text: `${email} just subscribed to new posts on mleg.tech.`,
    });

    // Confirm to the subscriber that it worked.
    const confirm = resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're subscribed to mleg.tech",
      text: 'Thanks for subscribing — you\'ll get an email when a new post goes up on mleg.tech. No drip campaign, no filler.',
    });

    const [notifyResult, confirmResult] = await Promise.all([notify, confirm]);

    if (notifyResult.error || confirmResult.error) {
      console.error('Resend error:', notifyResult.error || confirmResult.error);
      return NextResponse.json({ error: 'Could not complete the subscription. Try again in a bit.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Subscribe route failed:', err);
    return NextResponse.json({ error: 'Could not complete the subscription. Try again in a bit.' }, { status: 500 });
  }
}
