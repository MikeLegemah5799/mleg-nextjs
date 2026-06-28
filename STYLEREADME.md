# mleg.tech — Next.js Portfolio Redesign

Michael Legemah's portfolio rebuilt in Next.js 14 with the **Monokai Pro Vibrant** color palette.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (no Tailwind — pure custom design system)
- **Monokai Pro Vibrant** palette

## Project Structure

```
app/
  layout.tsx          ← Root layout with metadata & font loading
  page.tsx            ← Home page
  about/page.tsx      ← About page
  projects/page.tsx   ← Projects page (with live category filter)
  contact/page.tsx    ← Contact page

components/
  Navbar.tsx          ← Sticky nav with mobile hamburger + drawer
  Footer.tsx          ← Footer
  CustomCursor.tsx    ← Yellow dot cursor (desktop only, respects pointer media query)
  useReveal.ts        ← Intersection Observer scroll reveal hook

styles/
  globals.css         ← CSS variables, reset, shared classes (navbar, footer, buttons)
  home.module.css     ← Home page styles
  about.module.css    ← About page styles
  projects.module.css ← Projects page styles
  contact.module.css  ← Contact page styles
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Full 3-col grids, hero split layout |
| `768–1024px` | 2-col grids, reduced padding |
| `< 768px` | Mobile nav (hamburger), single column, hero terminal hidden |
| `< 480px` | Tightened spacing, stacked CTAs, word-break on email |

## Color Palette (Monokai Pro Vibrant)

| Variable | Hex | Use |
|---|---|---|
| `--yellow`  | `#ffd866` | Primary accent, CTAs |
| `--pink`    | `#ff6188` | Keywords, enterprise |
| `--cyan`    | `#78dce8` | Tech/code, links |
| `--orange`  | `#fc9867` | Gradients, hover |
| `--green`   | `#a9dc76` | Availability, AI stack |
| `--purple`  | `#ab9df2` | Variables, design |
| `--bg`      | `#2d2a2e` | Page background |
| `--bg-deep` | `#221f22` | Sections, nav |

## Key Features
- ✅ Custom cursor with smooth ring lag (desktop only)
- ✅ Scroll reveal with staggered children animation
- ✅ Mobile hamburger with animated drawer
- ✅ Live category filter on Projects page
- ✅ Monokai Pro Vibrant syntax-highlighted terminal widget
- ✅ Animated client marquee
- ✅ Fully responsive — tested at 320px → 1440px+
- ✅ Logo loaded from mleg.tech
- ✅ Semantic HTML, accessible nav with aria attributes
