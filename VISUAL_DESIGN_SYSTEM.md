# Wealth Lab visual design system · v6.0

**Locked direction: October 31, 2026.**

The application uses a **Deep Emerald / Rich Gold** professional editorial design across Home, Learn (all four subviews), the shared Lesson Reader, Tools/calculators, Notebook, More, and State Explorer.

## Canonical palette
- Emerald 950 / app background: `#031915`
- Emerald 900 / deep surfaces: `#05231D`
- Emerald 850 / cards: `#0A3027`
- Emerald 800 / raised surfaces: `#0E3A2F`
- Emerald 700 / affirmative: `#145141`
- Rich Gold 500: `#C9A24D`
- Rich Gold 400: `#D8B668`
- Soft Gold 300: `#E7C987`
- Warm Cream: `#F4EBDC`
- Muted Cream: `#D9D0C2`
- Sage Text: `#B7C7BE`
- Border Green: `#355A4A`

## Typography
Editorial page/section/card titles: Georgia/serif. Body, labels, controls, supporting text: Inter/system-ui/sans-serif. One consistent hierarchy: hero titles ~30–41px, section headings 21–27px, card titles ~15–20px, body ~15px, eyebrow/metadata 10–12px with modest letterspacing. Prioritize readable mobile typography and wrapping instead of shrinking content to fit.

## Media and card standards
- Heroes should show their original photographic subjects clearly, with subdued directional text overlays, *no glow* or blur filters.
- Preserve the user-approved Notebook fountain-pen hero in `assets/notebook-approved-hero.webp`.
- Landscape lesson-list thumbnails are square 68×68 CSS px on typical phones (60×60 on narrow phones). Featured lesson images are 4:3 (108×81), with consistent 12px radii. Topic/category tiles use a uniform crop *within their role*. Notebook category books are 1.26:1.
- The Learn contact sheet currently used by the 20 thumbnails remains mapped to each existing subject; do not alter its atlas positioning casually. Higher-resolution replacements are a later asset change if original images are available.
- All cards use coordinated deep-emerald surfaces, quiet green borders, consistent spacing, and rich-gold interactive accents. Gold is selective; ordinary body text stays cream/sage.

## Technical ownership
- `visual-polish-v1.css` is the shared visual foundation and **must be loaded after** all page-specific CSS in `index.html`.
- Page stylesheets maintain their page-specific geometry and content. Shared accents and typography go in the polish layer to avoid divergence.
- The PWA `sw.js` precaches the polish layer; bump cache and versioned style URL for any future design change.
- The lesson reader stays a single shared renderer for all existing and future sections, per `LESSON_DESIGN_STANDARD.md`.
- Do not reset `wealthlab-state-v1` or modify saved learning progress, bookmarks, lesson notes, notebook notes, or backup schemas as part of visual changes.

## Review checklist
Test Home / Learn Overview / All Lessons / By Topic / My Learning / L1.S1 / L8.S2 / Tools library / calculator results / Notebook / More / State Explorer on phone widths of 360–430px and a wider display. Confirm consistent colors, legible hierarchy, correct subject crops, visible imagery, functioning tabs, and no horizontal overflow. Check separately in the installed PWA to rule out stale service-worker resources.
