# Goutham Raju Kosuru Srinivasa — Portfolio

Personal portfolio website for a Full-Stack Software Engineer targeting roles at top-tier tech companies.

**Live site:** https://gouthamraju11.github.io

## Tech stack

- HTML5 (semantic), CSS3 (custom properties, no frameworks), Vanilla JS (ES6+)
- Google Fonts (Inter)
- No build step — open `index.html` directly or push to GitHub Pages

## Local development

```bash
# Option 1 — just open the file
open index.html

# Option 2 — VS Code Live Server (recommended)
# Install the "Live Server" extension, right-click index.html → "Open with Live Server"

# Option 3 — Python
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages

1. Push to the `master` (or `main`) branch.
2. Go to **Settings → Pages** and set the source to `/ (root)` on your branch.
3. GitHub Pages will serve `index.html` automatically.
4. The `.nojekyll` file ensures GitHub Pages skips Jekyll processing.

## File structure

```
├── index.html          Main page
├── 404.html            Friendly 404 with redirect
├── robots.txt
├── sitemap.xml
├── manifest.json       PWA basics
├── .nojekyll           Disables Jekyll on GitHub Pages
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       └── og-image.png   (generate and add — 1200×630px recommended)
├── css/
│   ├── style.css       Full design system + all sections
│   └── animations.css  Scroll-reveal, transitions
└── js/
    ├── main.js         Nav, theme toggle, contact form
    └── animations.js   IntersectionObserver scroll-reveal
```

## Placeholder links to update

| Item | Location | Action |
|------|----------|--------|
| Project GitHub links | `index.html` — project cards | Replace `https://github.com/Gouthamraju11` with direct repo URLs |
| IRJMETS publication link | Project 3 card | Add the actual publication URL |
| OG image | `assets/images/og-image.png` | Generate a 1200×630px preview image |

## License

MIT
