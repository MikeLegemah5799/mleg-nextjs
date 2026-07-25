import { ImageResponse } from 'next/og';
import { LOGO_URL } from '@/lib/constants';

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = 'image/png';
export const ogImageAlt = 'Michael Legemah — Principal AI Engineer';

const NAV_LINKS = ['ABOUT', 'PROJECTS', 'BLOG', 'RESUME', 'CONTACT'];

const PILLS = [
  { label: 'AWS Bedrock', color: '#a9dc76' },
  { label: 'LangGraph', color: '#78dce8' },
  { label: 'RAG', color: '#ab9df2' },
  { label: 'LLM Eval', color: '#ffd866' },
];

async function loadFont(weight: 400 | 700) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Outfit:wght@${weight}&display=swap`,
    { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } },
  ).then((r) => r.text());
  const url = css.match(/src: url\((https:\/\/[^)]+)\)/)?.[1];
  if (!url) throw new Error('Could not resolve Outfit font URL from Google Fonts CSS');
  return fetch(url).then((r) => r.arrayBuffer());
}

export async function generateOgImage() {
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #221f22 0%, #2d2a2e 60%, #241f2c 100%)',
          fontFamily: 'Outfit',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', position: 'absolute', top: -160, right: 20, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,220,232,0.16) 0%, rgba(120,220,232,0) 70%)' }} />
        <div style={{ display: 'flex', position: 'absolute', bottom: -160, left: 220, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(171,157,242,0.14) 0%, rgba(171,157,242,0) 70%)' }} />

        {/* NAV */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 56px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={LOGO_URL} width={34} height={34} style={{ borderRadius: 8 }} />
            <span style={{ color: '#fcfcfa', fontSize: 17, fontWeight: 700 }}>Michael Legemah</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                display: 'flex', fontSize: 12, letterSpacing: '2px', color: '#241f22', background: '#ffd866',
                padding: '7px 14px', borderRadius: 5, fontWeight: 700,
              }}
            >
              HOME
            </span>
            {NAV_LINKS.map((l) => (
              <span key={l} style={{ display: 'flex', fontSize: 12, letterSpacing: '2px', color: '#78dce8', padding: '7px 14px', fontWeight: 400 }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, padding: '0 56px', flex: 1 }}>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 160, height: 160, borderRadius: '50%', padding: 4,
              backgroundImage: 'linear-gradient(135deg,#78dce8,#a9dc76)',
            }}
          >
            <img src={LOGO_URL} width={152} height={152} style={{ borderRadius: '50%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 700 }}>
            <span style={{ display: 'flex', color: '#fcfcfa', fontSize: 58, fontWeight: 700, lineHeight: 1 }}>Michael Legemah</span>
            <span style={{ display: 'flex', color: '#ffd866', fontSize: 27, fontWeight: 700 }}>Principal AI Engineer</span>
            <span style={{ display: 'flex', color: '#c1b8c8', fontSize: 19, lineHeight: 1.5, fontWeight: 400 }}>
              Building agentic AI systems, RAG pipelines, and eval infrastructure that ship — on AWS, in production, at scale.
            </span>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              {PILLS.map(({ label, color }) => (
                <span
                  key={label}
                  style={{
                    display: 'flex', fontSize: 15, color, border: `1px solid ${color}55`, background: `${color}1a`,
                    padding: '7px 16px', borderRadius: 8, fontWeight: 400,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 56px 40px' }}>
          <span style={{ display: 'flex', color: '#7e6f8d', fontSize: 17, fontWeight: 700 }}>mleg.tech</span>
        </div>
      </div>
    ),
    {
      width: ogImageSize.width,
      height: ogImageSize.height,
      fonts: [
        { name: 'Outfit', data: regular, weight: 400, style: 'normal' },
        { name: 'Outfit', data: bold, weight: 700, style: 'normal' },
      ],
    },
  );
}
