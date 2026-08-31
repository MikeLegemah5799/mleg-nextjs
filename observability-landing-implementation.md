# Deploying the Observability Landing Page

Target route: `mleg.tech/observability`
Reference files: `observability-landing.html` (mockup source), `observability-landing-mockup.png` (visual reference)

This page has two things the checklist thank-you page didn't: a form that needs to actually submit somewhere, and a free asset that needs to get delivered automatically after signup. This doc covers both, plus the same font/logo swap from before.

---

## 1. Font and logo swap (same as the thank-you page)

The mockup embeds Poppins and IBM Plex Mono as base64 `@font-face` data, and the logo the same way — a sandbox workaround, not a real design choice.

On your actual site:

- Replace every `font-family: 'Display'` reference with your site's real Raleway setup.
- Replace every `font-family: 'Mono'` reference with your site's real IBM Plex Mono setup.
- Replace the base64 logo `src` (it appears **twice** on this page — once in the nav, once in the About section avatar) with your existing logo asset from `public/`.

Strip the five `@font-face` blocks entirely once you've swapped the references — they're dead weight without the base64 data behind them.

---

## 2. Pick an email service — this decides everything else

The form doesn't submit anywhere yet. Before writing any code, decide which of these you're using, since it changes the integration:

| Option | Best if... | Setup effort |
|---|---|---|
| **ConvertKit / Kit** | You want built-in "send this PDF automatically on signup" automations | Low — mostly dashboard config |
| **Mailchimp** | You already use it, or want broader marketing features later | Low–Medium |
| **Beehiiv** | You're planning to also run a newsletter off the same list | Low |
| **A simple serverless function** (Vercel/Next.js API route) | You want full control and don't want a third-party form dependency | Medium — you write the email-sending code yourself |

**Recommendation given your stack:** since mleg.tech is already Next.js, and you'll want the same pattern for future lead magnets (not just this one), a small API route is the most reusable option — but if you want something working in the next 15 minutes with zero backend code, ConvertKit's hosted forms/automations are the fastest path. Pick based on how much time you want to spend right now versus how reusable you want the system to be.

---

## 3. Option A — ConvertKit / Mailchimp / Beehiiv (no backend code)

1. Create a new form or "landing page opt-in" inside the ESP's dashboard, with fields for first name (optional) and email (required) — matching what's already in the mockup.
2. Set up an **automation**: "when someone joins this form, send them an email containing the PDF" (as an attachment or a link to the file). Most ESPs call this a "welcome sequence" or "incentive email" — this is what actually fulfills the "sent instantly" promise already in the page copy.
3. Upload `AI-Observability-Maturity-Model.pdf` somewhere the automation can attach or link to it — either directly in the ESP's file library (if it supports that) or hosted on your own site the same way the checklist PDF is hosted (`public/downloads/...`).
4. The ESP gives you a form `action` URL and field names. Replace the mockup's `<form>` tag:
   ```html
   <form class="signup" action="YOUR_ESP_FORM_ACTION_URL" method="POST">
   ```
   and make sure the `name` attributes on the inputs match exactly what the ESP expects (check their docs — these vary by provider and are usually shown right in the embed code they generate for you).
5. Test with your own email address before this goes live — confirm the automation actually fires and the PDF actually arrives.

This path requires no custom code, but you're relying entirely on the ESP's automation working correctly — test it for real, don't just assume it fired.

---

## 4. Option B — Next.js API route (custom, more reusable)

If you'd rather own this:

1. Create `app/api/observability-signup/route.ts` (App Router) that:
   - Accepts the POST from the form (`first_name`, `email`)
   - Adds the email to your list (via whichever ESP's API you use — most have a simple REST API for "add subscriber")
   - Sends the PDF, either as an email attachment (via Resend, which — per your existing stack — you already use for LogPact, so this may be the path of least resistance) or an email containing a link to the hosted PDF
2. Change the form to submit via `fetch()` instead of a native form POST, so you can show a success/error state without a full page reload:
   ```js
   async function handleSubmit(e) {
     e.preventDefault();
     const res = await fetch('/api/observability-signup', {
       method: 'POST',
       body: JSON.stringify({ first_name, email }),
       headers: { 'Content-Type': 'application/json' },
     });
     // show success state, or error
   }
   ```
3. Still add the email to a real list somewhere (ConvertKit/Mailchimp API, or even just your own database) — sending the PDF once is not the same as being able to follow up with this person later, which is presumably the actual point of collecting the email.

This is more work up front but becomes the reusable pattern for every future lead magnet, instead of rebuilding ESP-specific form wiring each time.

---

## 5. Either way: the "no spam" and "sent instantly" claims need to be true

The page already promises "Sent instantly" and "No spam — ever" in the trust note under the form. Same principle as the thank-you page's email claim: **don't ship a promise the backend doesn't keep.**

- "Sent instantly" means the automation/API call needs to actually fire synchronously enough that the PDF shows up within a minute or two, not "eventually, whenever you get around to sending it manually."
- "No spam — ever" is a commitment about what you do with the list afterward, not a technical thing to build — but worth deciding now (e.g., don't sell/share the list, keep unsubscribe easy) since it's printed on the page as a promise.

---

## 6. Route placement

```
app/observability/page.tsx
```

(or `pages/observability.tsx` for Pages Router) — convert the mockup's HTML/CSS into JSX + your site's existing styling approach, same as the thank-you page.

---

## 7. Test before linking to it anywhere

1. Submit the form with a real email address you control — confirm:
   - The email actually arrives
   - It arrives within a reasonable time ("instantly" as promised)
   - The PDF attachment or link actually works
2. Try submitting with an invalid/empty email — confirm the browser's native validation (`required` on the email input) actually blocks it, or add your own validation if you removed that.
3. Check the hero preview image and both logo placements render correctly with your real assets, not the mockup's embedded ones.
4. Mobile check — same as the thank-you page, this is mostly a single-column-on-mobile layout so risk is low, but confirm the two-column hero collapses cleanly.

---

## Summary checklist

- [ ] Swap embedded Poppins/Mono fonts for your site's real Raleway/IBM Plex Mono
- [ ] Swap both logo instances (nav + about avatar) for your real `public/` logo asset
- [ ] Choose an email service path: ESP automation (Option A) or custom API route (Option B)
- [ ] Wire the form to actually submit and add the subscriber to a real list
- [ ] Confirm the PDF is actually delivered automatically after signup — test this for real
- [ ] Build the page at `app/observability/page.tsx` (or Pages Router equivalent)
- [ ] Test end-to-end with a real email address before linking to this page anywhere
