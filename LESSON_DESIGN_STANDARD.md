# Wealth Lab Academy — Universal Lesson Reader Standard

**Status:** Approved and locked for every existing and future lesson.
**Canonical app:** `index.html` (the installed PWA also starts here).
**Styling:** `reader-v1.css`, scoped to `.wl-reader`.
**Last reviewed:** October 31, 2026.

## The contract

All curriculum sections — introductory, advanced, outlined, expanded textbook chapters, and any new section added in the future — MUST be rendered by the shared `reader()` function in `index.html`. Do not create independent legacy `.page` / `.reader-hero` screens, inline paper/ivory reader themes, or a one-off lesson view. The separate `analyst-preview.html` is a preview, **not** the installed application's lesson entry point.

The shared reader automatically supplies:
- Academy photographic hero and brand, back-to-course navigation, section title, subtitle, bookmark, and progress.
- Four functioning modes: **Learn / Examples / Try It / Notes**.
- Professional Dark styling: forest and emerald backgrounds, warm cream lettering, restrained gold accents and readable tables/callouts.
- Textbook pagination and table of contents for lessons with `TEXTBOOK[section.id]`; clean short-form views for lessons without a textbook.
- Examples, practice checks, personal notes, references, and Previous / Next / Complete / Discuss-in-ChatGPT actions.

When adding or extending lessons, place the lesson in the existing `CURRICULUM` or `ACADEMY_MODULES` data, preserve stable section IDs, and (optionally) supply `TEXTBOOK`, `TEXTBOOK_CHECKS`, cases, sources, and supporting data. **Do not copy HTML, duplicate the reader function, or add a separate stylesheet per lesson.** Visual improvements should be made once in `reader-v1.css`, with `.wl-reader` scope where appropriate, so every lesson inherits them.

## Keep learning data safe

Do not rename the `wealthlab-state-v1` local storage key or reset completion, bookmarks, chapter page progress, answers, notes, or saved backup format for a visual-only change. Test new lessons with existing saved learning data. Never clear a learner's storage to force a design refresh.

## Required regression check

Run from the repository root:

```sh
node scripts/check-lesson-reader.mjs
```

This dependency-free guard checks that the currently defined curriculum IDs are unique, every lesson routes through the shared Academy reader, all four tabs remain, both brief and textbook lesson paths are present, the dark-mode styles cover the lesson types, and the PWA precaches the shared stylesheet.

After changes to a lesson, check on a narrow mobile screen:
1. A short-form lesson (e.g. `#L1.S1`) and an advanced chapter (e.g. `#L8.S2`).
2. Learn / Examples / Try It / Notes; navigation, chapter pagination, and readable contrast.
3. Save notes, bookmark and progress, reload, and verify that all persist.
4. Test `index.html`, not the legacy `analyst-preview.html`. For an installed PWA, verify that a newly released `index.html` and CSS have loaded, rather than diagnosing its stale cache as a design regression.

## Release update rule

When shared reader CSS changes, version its stylesheet URL in `index.html` and bump the `CACHE` name in `sw.js`. Keep `./reader-v1.css` and `./index.html` in the service worker precache. Do not let `analyst-preview.html` become the PWA start URL.
