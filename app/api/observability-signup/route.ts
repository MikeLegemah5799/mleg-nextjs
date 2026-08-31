import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { readFile } from 'fs/promises';
import path from 'path';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OWNER_EMAIL = 'michaellegemah@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'mleg.tech <onboarding@resend.dev>';
const PDF_PATH = path.join(process.cwd(), 'public', 'downloads', 'AI-Observability-Maturity-Model.pdf');

export async function POST(request: Request) {
  let firstName: unknown;
  let email: unknown;
  try {
    ({ first_name: firstName, email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  const name = typeof firstName === 'string' ? firstName.trim().slice(0, 100) : '';

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Signups are temporarily unavailable.' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const pdf = await readFile(PDF_PATH);

    const notify = resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: 'New Observability Maturity Model lead',
      text: `${name ? `${name} <${email}>` : email} just requested the AI Observability Maturity Model.`,
    });

    const confirm = resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your AI Observability Maturity Model',
      text: `${name ? `Hi ${name},\n\n` : ''}Here's your copy of the AI Observability Maturity Model, attached as a PDF.\n\nNo spam, no drip campaign — just this.`,
      attachments: [
        {
          filename: 'AI-Observability-Maturity-Model.pdf',
          content: pdf,
        },
      ],
    });

    const [notifyResult, confirmResult] = await Promise.all([notify, confirm]);

    if (notifyResult.error || confirmResult.error) {
      console.error('Resend error:', notifyResult.error || confirmResult.error);
      return NextResponse.json({ error: 'Could not complete the signup. Try again in a bit.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Observability signup route failed:', err);
    return NextResponse.json({ error: 'Could not complete the signup. Try again in a bit.' }, { status: 500 });
  }
}
