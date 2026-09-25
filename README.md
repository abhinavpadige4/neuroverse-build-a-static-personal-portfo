# Arjun Mehta — Street Photographer Portfolio

A static personal portfolio landing page for Arjun Mehta, a street photographer based between Mumbai and Berlin.

## Features

- **Hero section** — full-screen background image with headline and CTAs
- **Gallery** — responsive CSS Grid of 9 street photographs with hover overlays and a keyboard-accessible lightbox
- **About** — bio, portrait, and career stats
- **Contact** — validated contact form plus direct contact info and social links
- **Mobile responsive** — Tailwind breakpoints, hamburger menu, fluid layouts
- **Accessible** — semantic HTML, ARIA labels, focus-visible outlines, reduced-motion support

## Stack

- HTML5 (single `index.html`)
- Tailwind CSS via CDN (`https://cdn.tailwindcss.com`)
- Custom CSS in `css/style.css`
- Vanilla JavaScript in `js/main.js`
- Google Fonts: Playfair Display + Inter

## Structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Local preview

Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Deployed to Vercel. Push to `main` to trigger a new deployment.
