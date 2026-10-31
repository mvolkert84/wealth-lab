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

## Actual assistance catalog (v1.3 · October 31, 2026)

State Explorer lists **81 named homeownership and down-payment programs** across all **50 states and Washington, DC**. Each program card displays its advertised assistance description, likely repayment structure, key restrictions, status note, and an official housing-agency program URL. The selected state and comparison state persist in the same local storage used in previous releases; this update does not reset progress, quizzes, bookmarks or notes.

The entries are **research references rather than live eligibility or reservation offers**. Some funding rounds may close or reopen. Advertised amounts are ceilings, examples, or program-specific figures, and can require loan pricing trade-offs, second lien repayment, homebuyer education, residency, income and geographic conditions. The app uses a dated Freddie Mac national rate benchmark instead of inventing a state-specific lender quote. Users must verify current availability with the agency and a participating lender.

Research sources: primary state agency pages, [NCSHA](https://www.ncsha.org/housing-help/), and selected adapted descriptions from [DPA Finder Open Data](https://dpafinder.org/data/) made available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Credit to DPA Finder for its compilation and checking of program information. Some listings carry an explicit "agency confirmation needed" label where independently confirmed terms/funds remain uncertain.

## Two-state side-by-side comparison (v1.4)

Select **State A** and **State B** in State Explorer. Both persist in the existing `wealthlab-state-v1` browser storage along with lesson completion, notes and calculator settings. The aligned comparison summary covers housing agencies, catalog program counts, assistance structures, advertised amount caveats, eligibility, mortgage rates and taxes. Two horizontally scrollable columns hold **all named catalog cards** for both states with full source links and payment/transfer cautions. For mobile reading, a collapsible full-width section reproduces both profiles. Swap or clear State B; the single-state view remains available. ChatGPT handoff creates a research request covering both selected states and asks to verify current rates, terms and funding. No real-time eligibility claims are implied.

## Local-area research pilot (v1.5 · October 31, 2026)

State Explorer now includes an **optional collapsed city/county lookup** for State A and, if selected, State B. It does not change the five-tab navigation or show local results until an area is entered. Matching program leads appear in a collapsed local-program panel within each state's existing comparison column, with full details readable on demand. It saves local area names keyed to state code in the existing `wealthlab-state-v1` local storage and supports backup export/import; prior lessons and notes are retained.

The first curated set contains **16 research leads** from municipal and county agencies (Hartford and New Haven, CT; Boston, MA; New York City; Philadelphia; City and County of San Diego; Seattle; Miami-Dade County; Charlotte; Austin; Chicago; Denver). Program pages are official sources. Examples include [HouseHartford](https://www.hartfordct.gov/Government/Departments/DDS/DDS-Services/Homebuyer-Assistance), [New Haven down-payment help](https://www.newhavenct.gov/government/departments-divisions/economic-development-administration/housing-administration-and-development/homebuyers/down-payment-closing-cost-assistance-financing), [Boston ONE+](https://content.boston.gov/departments/housing/boston-home-center/one-boston-homebuyer-program), [NYC HomeFirst](https://www.nyc.gov/site/hpd/services-and-information/homefirst-down-payment-assistance-program.page), [Philly First Home](https://www.phila.gov/services/property-lots-housing/buy-sell-or-rent-a-property/buy-my-first-home/), [San Diego Housing Commission](https://sdhc.org/housing-opportunities/first-time-homebuyers/), [Seattle](https://www.seattle.gov/housing/renters/buy-a-home), [Miami-Dade](https://www.miamidade.gov/global/housing/downpayment-assistance.page), [House Charlotte](https://www.charlottenc.gov/Streets-and-Neighborhoods/Housing/Resources-for-Homeowners-Renters/Homeownership), [Austin](https://www.austintexas.gov/housing/homebuyer-resources), [Chicago](https://chicago.gov/city/en/depts/doh/provdrs/homebuyers.html), and [Denver metroDPA](https://www.denvergov.org/files/assets/public/v/1/housing-stability/documents/second-lien-09.03.24.pdf). Actual assistance, funding, boundaries, income requirements and repayment depend on the agency and purchase location. A location with no current indexed entry is explicitly **"research needed," not "no programs exist"**. Different public pages may disagree about amounts (e.g. New Haven); the app flags inconsistencies for verification. Use a [HUD-approved housing counselor](https://www.consumerfinance.gov/find-a-housing-counselor/) to help research unindexed locations.
