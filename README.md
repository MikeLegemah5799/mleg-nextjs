# Michael Legemah — Portfolio

Personal portfolio site for Michael Legemah, Principal AI Engineer, live at [mleg.tech](https://mleg.tech). Built with Next.js 14 (App Router) and TypeScript, styled with a custom **Monokai Pro Vibrant** design system in CSS Modules — no UI framework, no Tailwind.

## Stack

- **[Next.js 14](https://nextjs.org/)** — App Router, client components
- **[React 18](https://react.dev/)** + **TypeScript**
- **CSS Modules** — hand-built design system, dark theme, CSS variables
- **IBM Plex Mono / Outfit / Raleway** — Google Fonts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # next lint
```

## Project Structure

```
app/
  layout.tsx          # Root layout — metadata, fonts, favicon
  page.tsx             # Home — hero, expertise, project preview, testimonials, CTA
  about/page.tsx        # About — bio timeline, focus areas
  projects/page.tsx     # Projects — full case-study grid with category filter
  contact/page.tsx      # Contact

components/
  Navbar.tsx           # Sticky nav with mobile hamburger + drawer
  Footer.tsx
  CustomCursor.tsx      # Custom cursor (desktop only, respects pointer media query)
  useReveal.ts          # IntersectionObserver scroll-reveal hook

styles/
  globals.css           # CSS variables, reset, shared classes (nav, footer, buttons)
  home.module.css
  about.module.css
  projects.module.css
  contact.module.css
```

## Pages

- **Home** — hero intro, animated client marquee, areas of expertise, featured project preview, testimonials, and a closing CTA.
- **About** — a timeline bio from early programming curiosity through to Principal AI Engineer, plus focus-area pills.
- **Projects** — the full portfolio grid (`PROJECTS` array in `app/projects/page.tsx`), covering personal builds (SpaceWatch, Crypto Intelligence Dashboard) and enterprise engagements (US Space Force, Northrop Grumman, JPMorgan Chase, Mayo Clinic, and more), with a live category filter.
- **Contact** — ways to get in touch.

## Design System

A dark, Monokai Pro Vibrant–inspired palette defined as CSS variables in `styles/globals.css`:

| Variable | Hex | Use |
|---|---|---|
| `--yellow` | `#ffd866` | Primary accent, CTAs |
| `--pink` | `#ff6188` | Keywords, enterprise |
| `--cyan` | `#78dce8` | Tech/code, links |
| `--orange` | `#fc9867` | Gradients, hover |
| `--green` | `#a9dc76` | Availability, AI stack |
| `--purple` | `#ab9df2` | Variables, design |
| `--bg` | `#2d2a2e` | Page background |
| `--bg-deep` | `#221f22` | Sections, nav |

### Key Features

- Custom cursor with smooth ring lag (desktop only)
- Scroll-reveal animations with staggered children
- Mobile hamburger nav with animated drawer
- Live category filter on the Projects page
- Syntax-highlighted terminal widget on the homepage hero
- Animated client-logo marquee
- Fully responsive, tested 320px → 1440px+
- Semantic HTML with accessible nav/aria attributes

### Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Full 3-col grids, hero split layout |
| `768–1024px` | 2-col grids, reduced padding |
| `< 768px` | Mobile nav (hamburger), single column, hero terminal hidden |
| `< 480px` | Tightened spacing, stacked CTAs, word-break on email |

## Deployment

The site is deployed on [Vercel](https://vercel.com/). Pushing to `main` triggers a production deploy; every other branch/PR gets a preview deployment.

## Contact

[michaellegemah@gmail.com](mailto:michaellegemah@gmail.com) · [mleg.tech](https://mleg.tech)
