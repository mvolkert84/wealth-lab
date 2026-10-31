# Wealth Lab — Professional Dark PWA

A mobile-first financial education experience featuring 19 numbered sections in 6 chapters, mortgage and investing calculators, learning checkpoints, notes, bookmarks, and a ChatGPT discussion handoff.

## GitHub Pages (GitHub Free)

1. If this repository is private, change visibility to **Public** in Settings → General → Danger Zone → Change repository visibility. Only generic educational files are committed here; **never commit exported learner notes or personal financial data**.
2. Go to Settings → Pages → Build and deployment. Select **Deploy from a branch** → **main** → **/(root)** → Save.
3. Once the Pages status reports success, open `https://mvolkert84.github.io/wealth-lab/` in Chrome or Samsung Internet on Android and use the browser menu's **Install app** or **Add to Home screen**.

## Learning and privacy

- All lessons and calculators run client-side. Progress, notes, and bookmarks are stored in browser `localStorage`, not synced.
- Use **More → Export backup** to save learner state; use **Import** to restore it on the same or another device. Avoid including sensitive details in exported files.
- Each lesson has a stable ID (e.g. `L2.S3`). The **Discuss** action copies the section's context for a question in the existing ChatGPT conversation.
- Content is educational and does not constitute a specific legal, tax, mortgage, or insurance recommendation. Verify current rates, rules, and eligibility for real decisions.

Built from the approved Wealth Lab Professional Dark design.

## State Explorer (v1.2)

Visit Home → **Explore states & programs**, Tools → **State programs**, or More → **Select a state**. Coverage includes all 50 states plus Washington, D.C., with official HFA agencies and directory links. National FHA, USDA, VA and conventional loan introductions are linked to primary sources. The Freddie Mac rates displayed are explicitly dated **October 29, 2026** and are a historical *national benchmark*, not live quotes or guaranteed state-specific rates. Real offers, program funding, assistance amounts, county/property tax rules, closing costs and mortgage approval must be verified with the relevant agency or lender. The selected state persists using the existing local save key, preserving lesson progress and notes.
