# Wealth Lab Academy — College-Level Finance Study Roadmap

**Updated:** October 31, 2026 · **Release:** v6.1 textbook depth expansion

## What this is, and isn't

Wealth Lab is an independent US-focused self-study finance program designed to build **college-level depth**, not an accredited college, a degree, a CFP Board Registered Program, or an official CFA course. There is no academic credit, professional designation, investment advisory license, or guarantee of exam readiness. Accreditation and professional qualifications require recognition by the relevant external institution.

Use the published CFP Board financial-planning knowledge topics and CFA Institute investment body of knowledge as benchmarks for **subject coverage**, without copying their proprietary curriculum or treating this app's work as equivalent to their registered training.

External course blueprints:
- https://www.cfp.net/certification-process/education-requirement
- https://www.cfp.net/certification-process/education-requirement/certification-coursework-requirement/what-youll-learn
- https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam
- https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/
- https://www.investor.gov/introduction-investing

## Current verified state

There are **16 courses, 59 stable lessons and 18 full six-part textbook chapters**, with 41 shorter lessons still awaiting expansion. This release adds these six chapter upgrades, using the same stable IDs and Academy reader:

| Lesson | Title / contribution | Core competency |
| --- | --- | --- |
| L7.S3 | Time Value of Money | PV, FV, annuities, APY, real return, NPV, opportunity cost |
| L8.S3 | Valuing a Stock | Enterprise value, P/E, free cash flow, DCF, sensitivity, investment memo |
| L9.S1 | Bonds and Yield | Coupons, YTM, duration, spreads, bond ladders, yield taxes |
| L10.S1 | Asset Allocation and Goal Buckets | Risk capacity, allocations, correlation, rebalancing, investment policy |
| L13.S2 | Permanent Life Insurance and Policy Loans | Protection, guaranteed vs nonguaranteed cash values, loan interest, lapse, trust/tax issues |
| L15.S3 | Debt and Arbitrage Claims | Leverage, carry, HELOCs, margin calls, tax spreads, lawful engineering versus deceptive manipulation |

Each expansion has **six reading parts, three substantive explanatory paragraphs per part, original numerical worked examples, part-specific terminology and practitioner commentary, two interactive part questions, three additional final questions and one professional case study**.

For the six newly expanded lessons this totals **36 parts, 72 part checks, 18 final checks and six case studies**. Existing original section question remains additionally available for each.

The mastery rule remains unchanged: answer all the chapter's part checks and final questions, score at least 80% overall, and get at least 75% correct on chapter-level checks. Reading completion and mastery are separate.

## Curriculum objectives by level

**Level 1 — Financial foundations and quantitative language**

A learner should be able to build a household balance sheet and dated cash-flow forecast; explain credit costs, liquidity, leverage and inflation; calculate compound growth, loan payments, present values, future values, annuities and opportunity cost; and explain which risks matter for a near-term home goal.

**Level 2 — Accounting, capital markets and valuation**

A learner should be able to reconcile income, balance sheet and cash flow; evaluate a business using EPS, free cash flow and enterprise value; discount future cash flows; calculate bond yields, duration and credit spreads; compare stocks/funds/alternative assets; build a diversified policy portfolio; and distinguish model assumptions from observed facts.

**Level 3 — Taxes, legal structures, insurance and wealth transfer**

A learner should be able to distinguish income tax brackets from effective tax rates; compute investment gains and basis with proper assumptions; understand tax-advantaged account tradeoffs, retirement withdrawals, sequence risk, life policy loans and trust ownership; evaluate property operating cash flow and leverage; and calculate financing stress outcomes without relying on false claims of guaranteed profit.

**Level 4 — Professional application and ethical decisions**

A learner should be able to gather trustworthy inputs, identify conflicts of interest, compare planning strategies, document assumptions and sources, present adverse scenarios, justify a recommendation, and produce a comprehensive financial plan supported by calculations and uncertainties.

## Depth expansion queue for existing lessons

### Next wave — investment mechanics and tax/account foundations
Expand the following 12 shorter sections:
1. L7.S2 — Rates, Central Banks & Bonds: monetary policy transmission and yield curves
2. L7.S4 — Economic Indicators and Cycles: CPI, GDP, growth, labor, rates and uncertainty
3. L8.S1 — What a Stock Actually Owns: equity claims, dilution and shareholder rights
4. L8.S4 — Dividends, Buybacks and Returns: total shareholder return and capital allocation
5. L9.S2 — Savings, CDs and Treasuries: safety/availability/insurance distinctions
6. L9.S3 — ETFs, Mutual Funds and Indexes: tracking, fees, tax and fund mechanics
7. L9.S4 — REITs, Annuities and Alternatives: alternatives and hidden liquidity constraints
8. L10.S2 — Diversification and Correlation: deeper covariance and empirical risk
9. L10.S3 — Rebalancing and Costs: expense ratios, bid-ask spreads, taxes and tracking
10. L10.S4 — Building an Investment Policy: implementation and behavioral pitfalls
11. L11.S1 — From Income to Tax: US filing concepts, taxable income and schedules
12. L11.S2 — Marginal vs Effective Tax Rate: bracket calculations and after-tax decisions

### Following wave — applied personal finance and generational wealth
Expand L11.S4, all of M12 (retirement), L13.S1/S3/S4 (insurance and estates), all of M14 (rentals), L15.S1/S2/S4 (business ownership and wealth vehicles), and all of M16 (financial-adviser practice and capstone). Also expand any remaining short foundational sections in M2–M6, keeping existing IDs.

### Additional degree-style subjects not yet covered sufficiently
Once existing lessons have genuine textbook depth, add courses/units only when they bring missing competencies:
- **Statistics and decision science:** probability, sampling, confidence, regressions, scenarios, forecasting error and behavior.
- **Financial and management accounting:** double entry, accruals, working capital, accounting estimates, financial ratios, budgeting and internal controls.
- **Corporate finance:** cost of capital, capital budgeting, WACC, project NPV/IRR, capital structure and dividend policy.
- **Derivatives and hedging:** forwards, futures, options and swaps; payoffs, counterparty risks, Greeks introduction and appropriate hedges.
- **Money, banking and markets:** monetary transmission, credit creation, banking liquidity, yield curves and systemic risk.
- **Research and financial modeling:** source checking, spreadsheet models, scenarios, comparative valuation and investment policy cases.
- **Law, regulation, ethics and behavioral finance:** conflicts, fiduciary duty, solicitation, securities manipulation warnings, investor protection, decision biases.

These are intended for future module additions; **do not present them as already built**.

## Standard of evidence and teaching quality

Each advanced chapter must include clear learning objectives, plain-English foundations, authentic arithmetic, all assumptions stated, at least one downside scenario, a professional or household case, independent source links, two part questions per reading part, three final checks, and a way to discuss the lesson through stable section IDs. Terms are taught beside their relevant parts, not dumped in one enormous glossary.

Use numbers for US and Connecticut examples where useful, but do not invent current tax brackets, mortgage rates or legal eligibility. Date sensitive claims, cite official sources, and distinguish hypotheticals. No misleading representations of guaranteed investment returns or market manipulation tactics.

When evaluating a 'money strategy', compare **capital required, access to liquidity, borrowing cost, after-tax value, ongoing fees, maintenance obligations, downside losses, counterparty risk, legal constraints and household goals**. Explicitly differentiate legal capital structuring from illegal deceptive price manipulation.

## Implementation and regression checks

- Reader: `index.html` and `reader-v1.css`.
- Shared academic chapter loader: `academy-depth-core.js`.
- One independent file per new chapter: `academy-chapters/<section-id>.js`.
- Offline PWA cache: `sw.js` includes every chapter with exact versioned URLs.
- Retain existing `wealthlab-state-v1` and all saved progress, bookmarks and notes.
- Run these checks on every curricular change:
  - `node scripts/check-lesson-reader.mjs`
  - `node scripts/check-visual-system.mjs`
  - `node scripts/check-expanded-chapters.mjs`

The app remains mobile-first with a deep emerald and rich gold visual language.
