# SAMARTH RYAN EDWARD
### Builder. Not just backend. Frontend. AI. Everything.

> *"I want to do everything. AI. Fullstack. Games. Tools. All of it."*

Personal portfolio — built as a broadsheet newspaper.  
Live at **[edwardsamarth.vercel.app](https://edwardsamarth.vercel.app)**

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, fully static) |
| Styling | Plain CSS — no Tailwind, no UI libs |
| Fonts | Playfair Display · Syne · Courier Prime |
| Analytics | Vercel Analytics |
| Deploy | Vercel |

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
app/
  page.tsx          # entire site — one page
  layout.tsx        # metadata, viewport, analytics
  newspaper.css     # all styles
public/
  images/
    pro.jpeg        # portrait
    prosq.jpeg      # favicon / OG image
    Samarth Ryan Edward CV.pdf
```

---

## Features

- 3-column broadsheet grid on desktop, single-column on mobile
- Custom blinking-caret cursor (desktop only)
- Name scramble animation on click
- Themed scrollbar — red on paper, ink on hover
- Yellow `#FCE502` text selection
- Fully static — prerendered at build time, zero server cost
- 5.45 kB page · 92.7 kB first load JS

---

*© 2026 Samarth Ryan Edward · All Left Reserved*
