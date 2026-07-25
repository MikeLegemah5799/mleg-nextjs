import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { RESUME_TEXT } from '@/lib/resume-data';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MIN_LENGTH = 40;
const MAX_JD_LENGTH = 6000; // guardrail against pathologically large pastes

const SYSTEM_PROMPT = `You are a résumé-matching assistant. You will be given a candidate's résumé and a job description. Compare them carefully and respond with ONLY a raw JSON object (no markdown fences, no preamble, no commentary) matching exactly this shape:

{
  "overall_score": <integer 0-100, overall fit>,
  "summary": "<one sentence, plain, specific verdict on the fit>",
  "breakdown": [
    {"label": "Core skills", "score": <0-100>},
    {"label": "Experience level", "score": <0-100>},
    {"label": "Domain overlap", "score": <0-100>},
    {"label": "Tooling stack", "score": <0-100>}
  ],
  "matched": ["<short phrase for each requirement from the JD that the résumé clearly satisfies, 5-9 items>"],
  "gaps": [
    {"requirement": "<a JD requirement not clearly met>", "note": "<short, honest, specific explanation of what's missing or partial, referencing the résumé where relevant>"}
  ],
  "evidence": [
    {"bullet": "<a real or lightly condensed bullet point copied from the résumé that supports the match>", "source": "<Title · Company · Dates, pulled from the résumé>"}
  ]
}

Rules:
- Base every claim strictly on the résumé text provided. Do not invent employers, technologies, or metrics not present in the résumé.
- "gaps" should be honest — if the JD asks for something the résumé doesn't clearly show (e.g. a specific certification, people-management title, an unfamiliar tool), say so plainly rather than stretching to claim a match. Include 0-4 gaps; it's fine to have zero if the fit is very strong.
- "evidence" should include 2-4 bullets, quoted or lightly condensed from the résumé, each with an accurate source line.
- Keep "matched" items short (2-5 words each).
- Return ONLY the JSON object, nothing else.`;

function stripFences(text: string): string {
  return text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/, '')
    .replace(/```\s*$/, '')
    .trim();
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'Job match analysis is not configured on this server.' },
      { status: 500 },
    );
  }

  let jobDescription: unknown;
  try {
    const body = await req.json();
    jobDescription = body?.jobDescription;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof jobDescription !== 'string' || jobDescription.trim().length < MIN_LENGTH) {
    return NextResponse.json(
      { error: 'Paste a full job description (at least a few sentences) for an accurate read.' },
      { status: 400 },
    );
  }

  const jd = jobDescription.trim().slice(0, MAX_JD_LENGTH);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `RÉSUMÉ:\n${RESUME_TEXT}\n\nJOB DESCRIPTION:\n${jd}\n\nAnalyze the match and return the JSON object as specified.`,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No analysis was returned. Please try again.' }, { status: 502 });
    }

    const clean = stripFences(textBlock.text);

    let parsed: unknown;
    try {
      parsed = JSON.parse(clean);
    } catch {
      return NextResponse.json(
        { error: 'Could not parse the analysis. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('job-match analysis error:', err);
    return NextResponse.json(
      { error: 'Something went wrong analyzing this job description. Please try again.' },
      { status: 500 },
    );
  }
}
