# Deploying the Thank-You / Download Page

Target route: `mleg.tech/reliability-audit/download`
Reference files: `reliability-audit-thankyou.html` (mockup source), `reliability-audit-thankyou-mockup.png` (visual reference)

This doc covers what to change going from the standalone mockup to a real page in your Next.js site, and the one Stripe step to do afterward.

---

## 1. Don't copy the mockup's fonts or logo as-is

The mockup HTML embeds Poppins and IBM Plex Mono as base64 `@font-face` data, and the logo the same way. **That was a workaround specific to the sandbox I built it in** (no CDN access, no local Raleway) — it is not how this should ship on your actual site.

On mleg.tech itself:

- **Use your site's existing Raleway setup**, not the Poppins substitute. The mockup used Poppins only because Raleway wasn't available in that environment — your real site already has the correct font. Swap every `font-family: 'Display'` reference to whatever your existing Raleway class/variable is.
- **Use your existing IBM Plex Mono setup** the same way, in place of the mockup's embedded `'Mono'` font-face.
- **Reference the logo from your `public/` folder** (e.g. `/logo.png` or wherever your nav logo already lives) instead of the base64 data URI in the mockup. You already have this logo in use elsewhere on the site — reuse that same file, don't re-export a new copy.

Net effect: strip out the five `@font-face` blocks and the base64 logo `src`, and point everything at assets your site already has. The visual design (colors, spacing, layout) is otherwise ready to use as-is.

---

## 2. Where the page lives

If your site uses the Next.js App Router (consistent with the rest of your stack):

```
app/reliability-audit/download/page.tsx
```

If it's Pages Router:

```
pages/reliability-audit/download.tsx
```

This should be a simple static page — no data fetching needed, no dynamic params. Convert the mockup's HTML/CSS into JSX + your existing Tailwind setup (or keep it as scoped CSS if that's more consistent with how the rest of mleg.tech is built — match whatever pattern your other pages already use, don't introduce a third styling approach).

---

## 3. Fix the email claim before shipping

The mockup currently says:

> "A copy is also on its way to your email — check there if you ever lose this page."

**This is not true yet.** You don't have automated email delivery set up. Before deploying, do one of:

- **Remove or soften the line** (e.g. "Bookmark this page in case you need it again" instead), or
- **Actually wire up email delivery** first (Stripe's built-in receipt customization, or a simple automation), so the claim is accurate.

Shipping a false claim on a receipt-style page is a small but real trust cost — fix this before it goes live, not after.

---

## 4. The download button

The button already points at the real, live file:

```
https://www.mleg.tech/downloads/50-Point-AI-Reliability-Audit.pdf
```

No change needed here — confirm this URL still resolves correctly once the page is deployed (same check as before: visit it directly, confirm it opens/downloads).

---

## 5. Test before connecting Stripe to it

Once the page is deployed:

1. Visit `mleg.tech/reliability-audit/download` directly and confirm:
   - Logo and fonts render correctly (using your real site assets, not the mockup's embedded ones)
   - The download button actually downloads the PDF
   - The Sentinel box and consulting line links (`mleg.tech/sentinel`, `mleg.tech/contact`) both resolve
2. Check mobile rendering — the mockup was designed at a single width; confirm it holds up narrow (this is a simple centered single-column layout, so it should be low-risk, but check spacing on the CTA box and the button doesn't wrap awkwardly).

---

## 6. Point the Payment Link here instead of the raw PDF

Right now, the live Payment Link's `after_completion.redirect.url` points directly at the PDF file. Once this page is live and tested, that should change to point here instead — so buyers land on this page (with the download button, the Sentinel mention, and the consulting line) rather than having the PDF just open with no context.

**When you're ready, tell me the confirmed live URL and I'll update the Payment Link's redirect** — same single API call as before, just swapping the target URL from the raw PDF to `mleg.tech/reliability-audit/download`.

---

## Summary checklist

- [ ] Swap embedded Poppins/Mono fonts for your site's real Raleway/IBM Plex Mono setup
- [ ] Swap the base64 logo for your existing `public/` logo asset
- [ ] Build the page at `app/reliability-audit/download/page.tsx` (or Pages Router equivalent)
- [ ] Fix or remove the "also on its way to your email" line
- [ ] Deploy and test the page directly (desktop + mobile)
- [ ] Confirm the PDF download button still resolves
- [ ] Tell me the confirmed live page URL so I can update the Payment Link's redirect
