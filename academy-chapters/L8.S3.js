/* Wealth Lab Academy · Textbook expansion: L8.S3 · Valuing a Stock */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const cfa="https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam";
const sec="https://www.investor.gov/introduction-investing";
WealthLabRegisterDeepChapter({
 id:"L8.S3",title:"Valuing a Stock: Earnings, Cash Flow, Enterprise Value and Judgment",
 sources:[cfa,sec,"https://www.sec.gov/edgar/search/"],
 parts:[
 P("What exactly are you paying for?",
 "A stock price is a quote for an ownership claim; a company's enterprise value describes the entire operating business.",
 [
 "A share is a residual claim on a company's economic value, not a coupon promising a guaranteed payout. Owners receive what remains after creditors and other senior claims. A stock can be a wonderful business and a poor investment at an excessive price; a struggling business can also be dangerous despite an apparently cheap multiple.",
 "Market capitalization is share price multiplied by shares outstanding. Enterprise value is approximately equity market value plus interest-bearing debt minus excess cash, with additional adjustments in complex cases. This helps investors compare businesses with different financing structures rather than treating their equity prices as equal measures of operating size.",
 "Imagine a company worth $800 million in market equity with $300 million debt and $100 million cash. Its simplified enterprise value is $1.0 billion. The debt matters because a buyer acquires the operation along with financing obligations; the cash may partly offset the total claim."
 ],
 [["Equity market capitalization","$800 million"],["Add debt, subtract cash","+$300 million − $100 million"],["Simplified enterprise value","$1.0 billion"]],
 "Cash may be required for daily operations, and enterprise value formulas may need minority interest, leases or preferred stock adjustments.",
 "Explain why two companies trading for $40 per share can have very different total values. Include shares outstanding and net debt.",
 [["Market capitalization","Share price multiplied by shares outstanding."],["Enterprise value","Approximate value of the operating business across debt and equity claims."]],
 [Q("Company shares trade at $20 with 10 million shares outstanding. Market capitalization equals:",["$20 million","$200 million","$2 billion","$10 million"],1,"$20 per share × 10 million shares = $200 million."),
  Q("What increases simplified enterprise value when equity value is unchanged?",["More excess cash","Less financial debt","More debt","Fewer shares with an offsetting higher share price"],2,"EV approximately equals equity value plus debt minus cash.")],
 ["Equity analyst","Read the latest SEC filings for share-count changes, convertible securities and borrowing obligations before calculating valuation multiples.","SEC EDGAR · Company filings","https://www.sec.gov/edgar/search/"]),
 P("Earnings and price-to-earnings multiples",
 "P/E is a fast comparison tool, but its interpretation depends on earnings quality, growth, cyclicality and accounting choices.",
 [
 "Earnings per share (EPS) divides profit attributable to common shareholders by weighted-average shares, usually with separate basic and diluted numbers. A $60 stock with $5 trailing EPS trades at a price-to-earnings multiple of 12. The multiple is not a 12% return; it says investors pay twelve dollars per reported dollar of annual earnings.",
 "Trailing earnings reflect history, while forward multiples depend on analysts' estimates. A low P/E can reflect genuine undervaluation, a temporary peak in cyclical earnings or deteriorating prospects. A high P/E may reflect high expected growth but leaves more room for disappointment.",
 "Compare the same accounting period and treatment of one-time items before ranking peers. Different capital structures, tax rates and share buybacks can make identical business operations report different EPS. A multiple without context is a starting question, not an investment recommendation."
 ],
 [["Stock price","$60"],["Trailing diluted EPS","$5"],["Trailing P/E","$60 ÷ $5 = 12×"]],
 "P/E is undefined or unhelpful when earnings are negative, and it does not measure debt or the cash required to maintain operations.",
 "Compare a business with P/E 8× to one at 24×. Write three plausible explanations besides 'one is cheap.'",
 [["Diluted EPS","Earnings per share after considering potentially dilutive claims."],["P/E multiple","Current share price divided by earnings per share over a consistent period."]],
 [Q("A stock at $60 with $5 diluted EPS has a P/E of:",["5×","12×","30×","60×"],1,"$60 divided by $5 equals 12 times earnings."),
  Q("Why might a low P/E not mean a bargain?",["Earnings may be temporarily inflated","It proves strong cash flow","Debt is irrelevant","It guarantees price appreciation"],0,"Cyclical or fragile profits may make the ratio misleading.")],
 ["Research discipline","Reconcile reported earnings to the income statement, cash flow and share count before applying a headline multiple.","CFA Institute · Equity Investments",cfa]),
 P("Free cash flow and reinvestment",
 "Reported profit and cash available to owners differ; reinvestment and working capital can consume much of accounting earnings.",
 [
 "Free cash flow to the firm is commonly derived from operating profit after taxes plus noncash charges minus capital investment and additional working capital, with details depending on the accounting framework. A simplified cash-flow-statement shortcut is cash from operations minus capital expenditures, often called free cash flow to equity before certain financing adjustments.",
 "If operating cash flow is $200 million but purchases of property and equipment are $70 million, the simplified free cash flow is $130 million. That figure is not automatically distributable: upcoming debt payments, working-capital needs, deferred investment and unusual cash movements may require adjustments.",
 "The reason investors focus on cash is practical. Shareholders cannot spend an accounting profit line; the enterprise must eventually generate cash after sustaining competitive operations. A company with low earnings but heavy required reinvestment may fail to deliver an attractive investor return."
 ],
 [["Operating cash flow","$200 million"],["Cash capital expenditure","−$70 million"],["Simplified free cash flow","$130 million"]],
 "Different analysts define free cash flow differently. Always state the formula and whether the result belongs to equity holders or all capital providers.",
 "Build a bridge from net income to operating cash flow for a sample company using depreciation and changes in receivables.",
 [["Capital expenditure (capex)","Cash spent buying or improving long-lived productive assets."],["Free cash flow","Cash generated after specified capital investment, based on an explicitly defined method."]],
 [Q("Operating cash flow is $200 million and capex is $70 million. Simplified FCF equals:",["$270 million","$130 million","$70 million","$200 million"],1,"Subtract capital expenditures from cash from operations."),
  Q("Why is FCF not always safe to pay entirely as a dividend?",["Every company owes zero taxes","Future needs and debt obligations may absorb cash","Cash and income are identical","Shareholders legally receive all cash"],1,"Businesses must maintain operations, liquidity and contractual obligations.")],
 ["Accounting analyst","Read operating-cash-flow adjustments and cash capex directly; question large noncash profits or consistently rising receivables.","SEC EDGAR · 10-K financial statements","https://www.sec.gov/edgar/search/"]),
 P("Discounted cash flow and terminal value",
 "Discounted cash flow values the cash a business may generate, but a terminal-value assumption often dominates the result.",
 [
 "A discounted cash-flow model forecasts owner-relevant cash flows and discounts them using a rate reflecting the risk of those claims. Equity cash flows and firm cash flows require different discount-rate concepts; applying a firm's weighted-average cost of capital directly to equity cash flows would mismatch the claim and rate.",
 "For a simple asset returning $100 at the end of each of the next three years and resale proceeds of $1,300 at year three, discounting at 10% gives approximately $1,225.39 today. The year-three amount includes that year's $100 operating receipt plus $1,300 sale proceeds.",
 "In real stock valuation, future cash flows may be highly uncertain. A terminal value estimates what lies beyond an explicit forecast window; if assumptions about long-run growth or exit multiples are generous, a spreadsheet can manufacture the answer the analyst wanted. Discipline requires showing a range."
 ],
 [["Annual end-of-year cash receipts","$100 for years 1, 2, 3"],["Year-three resale proceeds","$1,300"],["Modeled PV at 10%","≈ $1,225.39"]],
 "Do not discount unlevered firm cash flows at the shareholder's required return or assume terminal growth can exceed the economy forever.",
 "Create pessimistic, baseline and optimistic cash-flow projections. Change both the discount rate and terminal value.",
 [["Discounted cash flow (DCF)","Valuation by adding present values of forecast cash flows."],["Terminal value","Estimated value of cash flows after the detailed forecast period."]],
 [Q("A DCF valuation mainly depends on:",["The stock's logo","Future cash flows, discount rate and terminal assumptions","The original IPO date alone","Only last week's price"],1,"DCF derives value from discounted expectations about the future."),
  Q("Why can an overly optimistic terminal value be dangerous?",["It decreases all valuations","It can dominate total modeled value","It removes the need for cash-flow forecasts","It guarantees an exit buyer"],1,"A distant terminal estimate may drive a large share of the DCF result.")],
 ["Valuation committee","Separate assumptions that come from published filings from your own estimates; disclose which forecast parameters explain most of the valuation.","CFA Institute · Equity Investments",cfa]),
 P("Sensitivity, uncertainty and a margin of safety",
 "A single target price is less informative than a valuation range showing what must go right.",
 [
 "Small changes in assumptions can cause a large change in a valuation. If a perpetual cash flow of $100 begins next year, a 10% required return and zero growth imply $1,000. With a 5% perpetual growth assumption and the same required return, the simple Gordon-growth formula implies $2,000, subject to cash-flow definitions and sustainability.",
 "The growth perpetuity equation is cash flow next year divided by required return minus growth. It only makes mathematical sense when the required return exceeds long-term growth and both are applied consistently. Small differences between the two inputs can create fragile results.",
 "A margin of safety means demanding a price below a defensible central valuation to allow for errors. It does not guarantee protection against poor business economics, fraud or a permanent decline. Set conditions that would invalidate your original thesis before you invest."
 ],
 [["Next-year cash flow","$100"],["PV at 10% discount and 0% growth","$1,000"],["PV at 10% discount and 5% perpetuity growth","$2,000"]],
 "Do not assign a perpetual growth rate equal to or above the required return. The simple formula fails in that case.",
 "Build a matrix with discount rates of 9%, 10% and 11%, and terminal growth of 2%, 3% and 4%; explain the spread without pretending the model is exact.",
 [["Sensitivity analysis","Testing how model results change when assumptions move."],["Margin of safety","Difference between an estimated value and purchase price that may help cushion errors."]],
 [Q("For a simple growing perpetuity, what mathematical condition is required?",["Growth exceeds required return","Growth equals required return","Required return exceeds growth","Both must be zero"],2,"The denominator required return minus growth must remain positive."),
  Q("If DCF value doubles when an assumed long-term growth rate rises modestly, the model is:",["Insensitive to assumptions","Highly sensitive to assumptions","Guaranteed accurate","Unrelated to growth"],1,"That sensitivity should be disclosed and stress-tested.")],
 ["Investment analyst","Do not reverse-engineer a discount rate or perpetuity growth solely to match the current stock quote. Challenge the thesis with adverse assumptions.","CFA Institute · Equity Investments",cfa]),
 P("Write a defensible investment research memo",
 "A valuation decision combines business quality, forecasts, balance-sheet risk, competition, price and an explicit reason you might be wrong.",
 [
 "A serious stock review begins with the business model and competitive position, then walks through profitability, cash conversion, capital requirements and financing structure. Read risk factors and management discussion in public filings; do not equate a polished investor presentation with audited proof of future performance.",
 "A concise valuation memo should specify the current quote, ownership structure, assumptions, fair-value range, potential catalysts and identifiable reasons the valuation might fail. Compare an investment with the alternatives of holding cash, diversified funds or paying down debt; the best individual stock is not always the best household decision.",
 "Treat market prices as a source of information rather than an oracle or an enemy. Even accurate estimates may take years to be reflected in the quote; transaction costs, taxes and concentration risk can absorb expected gains. Develop research habits rather than trying to guess tomorrow's price."
 ],
 [["Forecast base case per-share value","Hypothetical $55"],["Illustrative market price","$50"],["Modeled valuation gap","($55 − $50) ÷ $55 ≈ 9.1% below estimate"]],
 "A price below one analyst's estimated value is not proof of undervaluation; valuation is a range of uncertain outcomes.",
 "Choose a real public-company 10-K, identify its revenue engine, debt, operating cash flow and dilution, then write a one-page buy / wait / avoid memorandum.",
 [["Investment thesis","Evidence-based explanation of why an asset might produce an attractive risk-adjusted return."],["Catalyst","An event that could change the market's assessment of an asset."]],
 [Q("Which belongs in a professional stock-valuation memo?",["Only the current share price","Assumptions, risks, valuation range and what would invalidate the thesis","Guaranteed future gains","A social-media popularity score"],1,"Decision usefulness requires transparent assumptions and downside analysis."),
  Q("A stock is $50 and your estimated value is $55. What is the best conclusion?",["Buy immediately and with leverage","It must rise to $55 tomorrow","It is potentially interesting but requires stress testing and diversification review","No further analysis is allowed"],2,"A modest modeled valuation gap can vanish under forecast error, fees or taxes.")],
 ["Research governance","Maintain an investment decision journal, note opposing evidence and review forecast errors. This guards against the common habit of editing assumptions after seeing a market outcome.","SEC Investor.gov · Research and risk",sec])
 ],
 caseStudy:{title:"Valuation committee: two competing companies",
 scenario:"Company A trades at $60 with diluted EPS of $5 and strong operating cash conversion. Company B trades at $25 with EPS of $2.50 but high debt and large recurring capex. A buyer has $5,000 available and no emergency savings. Compare valuation ratios and financial resilience, then decide whether individual stocks are even an appropriate first allocation.",
 steps:[["Company A trailing P/E","$60 ÷ $5 = 12×"],["Company B trailing P/E","$25 ÷ $2.50 = 10×"],["Simple multiple comparison","B looks cheaper on P/E alone"],["Required next analysis","Debt maturities, cash flow, capital expenditure, reserves and diversification"]],
 decision:"Write a memo that distinguishes a stock's apparent cheapness from balance-sheet and liquidity risk. Include why a diversified investment or cash reserve may be more suitable than either concentrated position."},
 finalChecks:[
 Q("Market cap equals $500 million, debt $150 million and cash $50 million. Simplified EV equals:",["$300 million","$500 million","$600 million","$700 million"],2,"$500m + $150m − $50m = $600m."),
 Q("A company with strong accounting profit but negative cash from operations may have:",["An accounting/cash conversion issue worth investigating","A guaranteed buy signal","No balance sheet","No working-capital risk"],0,"Earnings quality requires comparison with cash-flow evidence."),
 Q("What is the strongest defense against an overly precise stock target price?",["One optimistic growth rate","A scenario range, disclosed assumptions and independent corroboration","Using an unverified social post","Ignoring dilution"],1,"Valuation range and evidence reduce false precision.")
 ]
});
})();
