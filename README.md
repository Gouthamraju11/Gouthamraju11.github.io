# Goutham Raju — Software Engineering Portfolio

A static, responsive SWE/SDE portfolio built with HTML, CSS, and JavaScript. The root files remain compatible with GitHub Pages; no framework or package installation is required.

## Local preview

Run `python3 -m http.server 8765` and visit `http://localhost:8765`.

## Validate and prepare a Sites preview

Run `python3 scripts/build_static.py` (Python 3 and Node.js required). This checks local asset paths, section anchors, unique IDs, and JavaScript syntax, then stages public files in `dist/`. `.openai/hosting.json` associates the private Sites preview with this checkout. GitHub Pages continues to use the root files.

## Content

- `index.html`: role positioning, professional experience, projects, skills, education, credentials, and contact details.
- `assets/Goutham_Raju_Resume.pdf`: supplied resume, linked from navigation, introduction, and contact section.
- `css/style.css`: responsive layout, dark/light themes, and print styles.
- `js/main.js`: theme preference, mobile navigation, and email composition form.

The contact form opens the visitor's email application; it does not send or store messages. Direct email and professional profile links are also available.

Experience dates and accomplishments were aligned to the supplied resume in September 2026. Existing education and credential details not listed in that resume were retained. Project source links should be added only when the matching repositories are verified; the GitHub profile link is available in the introduction and footer. Existing social image metadata has been retained, but its referenced `assets/images/og-image.png` was not present in the original checkout.
