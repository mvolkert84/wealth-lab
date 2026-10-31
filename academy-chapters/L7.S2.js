/* Wealth Lab Academy · Deep textbook L7.S2: Rates, Central Banks & Bonds · 2026-10-31 */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const fed="https://www.federalreserve.gov/monetarypolicy/fomc.htm",ny="https://www.newyorkfed.org/markets/reference-rates/sofr";
const treasury="https://www.treasurydirect.gov/marketable-securities/treasury-bills/";
WealthLabRegisterDeepChapter({id:"L7.S2",title:"Rates, Central Banks and Bonds: Transmission, Yield Curves and Borrowing",
 sources:[fed,ny,treasury],
 parts:[
 P("What a central bank controls—and what it does not",
 "The Federal Reserve influences overnight funding conditions, but does not mechanically set every mortgage or deposit rate.",
 [
 "The Federal Open Market Committee chooses a target range for the federal funds rate as a key monetary policy instrument. In its current operating framework the Federal Reserve uses administered rates and market operations to influence short-term funding conditions. A target range is not a posted rate at which ordinary households can borrow.",
 "Banks price loans using funding costs, credit and collateral risk, loan maturity, expected defaults, operating expenses and competition. Mortgage rates also reflect longer-term Treasury yields and mortgage-market features. A policy rate change can influence the economy in stages, sometimes with a considerable delay.",
 "The Federal Reserve balances its statutory employment and price-stability goals in the face of incomplete and changing data. An investor should separate the committee's decision from market expectations, and distinguish a change in policy from the many forces affecting a household's offered loan rate."
 ],
 [["Illustrative policy change","+0.50 percentage point"],["Illustrative variable-rate loan response","May rise, remain unchanged or adjust later under contract"],["Required analysis","Read loan index, margin, reset timing and caps"]],
 "Do not infer that a half-point policy-rate cut guarantees a half-point lower fixed mortgage rate. Markets may already have anticipated the change.",
 "Trace a policy-rate increase through bank funding, variable credit, household cash flow and business investment, noting each uncertain link.",
 [["Policy rate","Short-term interest rate influenced by central-bank policy."],["Monetary transmission","Channels through which policy affects financing conditions and activity."]],
 [Q("Who sets the US federal-funds target range?",["TreasuryDirect","Federal Open Market Committee","Every commercial bank independently","Individual mortgage lenders"],1,"The FOMC sets the target range."),
  Q("A 0.5-point policy-rate cut guarantees existing 30-year fixed mortgage rates fall exactly 0.5 points:",["True","False","Only for jumbo loans","Only after one day"],1,"Fixed mortgage rates depend on long yields, expectations and mortgage-specific risks.")],
 ["Monetary economist","Read the policy statement and distinguish observed rate changes from market expectations and individual credit terms.","Federal Reserve · FOMC",fed]),
 P("Nominal versus real rates, and who bears inflation risk",
 "A nominal rate measures dollars; a real rate considers purchasing power over the same period.",
 [
 "A depositor earning 4% nominal interest during a year of 3% inflation experiences only about 0.97% growth in purchasing power. The exact Fisher relationship is (1.04/1.03) − 1. A convenient approximate real-rate calculation subtracts inflation, but the approximation is less accurate at larger rates.",
 "Borrowers can benefit from unexpectedly high inflation when they owe fixed nominal repayments, while lenders lose purchasing power, provided the borrower can still pay. Floating-rate contracts and inflation-indexed securities shift these exposures in different ways. Real rates can be negative even when the account shows additional dollars.",
 "For a household planning a home purchase, both types of rate matter: mortgage payments are owed in dollars, while income, insurance, food and property prices affect real affordability. Comparing expected investment growth and future spending requires consistent nominal or inflation-adjusted calculations."
 ],
 [["Annual nominal savings return","4%"],["Inflation assumption","3%"],["Exact real return","1.04 ÷ 1.03 − 1 ≈ 0.97%"]],
 "A rising nominal balance is not proof of increased purchasing power, especially after taxes and account fees.",
 "Explain how unexpectedly high inflation changes the burden of a fixed payment versus an adjustable payment, without assuming wages rise equally.",
 [["Nominal rate","Percentage stated in current money units, before inflation adjustment."],["Real rate","Nominal growth converted to purchasing-power terms."]],
 [Q("4% nominal return with 3% inflation gives an exact real return closest to:",["7%","1.00%","0.97%","4%"],2,"1.04/1.03 − 1 = 0.0097087."),
  Q("Who is particularly exposed when real purchasing power erodes faster than nominal interest?",["A holder of low-yield fixed deposits","An owner of inflation-linked claims only","Everyone in exactly the same way","Nobody"],0,"A nominal fixed deposit may not preserve purchasing power.")],
 ["Financial planner","Make cash-flow plans in nominal dollars, then test long-term goals in inflation-adjusted purchasing power.","Federal Reserve · Monetary policy",fed]),
 P("The yield curve and expectations about future rates",
 "A yield curve plots borrowing yields across maturities; shape alone does not give a flawless recession forecast.",
 [
 "A Treasury yield curve compares comparable government securities at different maturities. A normal upward-sloping curve may reflect higher required yields for longer horizons, expected future rates, term premiums and liquidity factors. An inversion occurs when shorter yields exceed selected longer yields.",
 "Suppose a hypothetical two-year Treasury yields 4.6% while a ten-year Treasury yields 4.1%. The ten-year minus two-year spread is −0.5 percentage point or −50 basis points. That inversion can reflect expectations of future policy easing, term-premium dynamics or changing demand rather than a guaranteed economic contraction.",
 "Yields contain information about discount rates used for bonds, mortgages, business valuations and future borrowing costs. A student should compare the curve at two dates, describe how both level and slope changed, and refrain from treating the slope as a certainty about next year's economy."
 ],
 [["2-year yield (illustrative)","4.6%"],["10-year yield (illustrative)","4.1%"],["10y minus 2y spread","−0.5 percentage point = −50 basis points"]],
 "Different yield-curve definitions use different maturities and measures; an inverted curve is an indicator, not a forecast with certainty.",
 "Draw 3-month, 2-year, 5-year and 10-year yields for two hypothetical dates and explain whether the curve steepened or flattened.",
 [["Yield curve","Relationship between yields and maturities for comparable debt securities."],["Term premium","Extra expected compensation for holding longer-term interest-rate exposure."]],
 [Q("If ten-year yields are 4.1% and two-year yields 4.6%, the 10y–2y spread equals:",["+50 bps","−50 bps","+0.5%","+500 bps"],1,"4.1% minus 4.6% is −0.5 percentage point or −50 bps."),
  Q("A yield-curve inversion proves a recession starts on a particular date:",["True","False","Only for corporations","Only with negative inflation"],1,"It is a probabilistic signal with considerable uncertainty.")],
 ["Fixed-income desk","Compare the yield curve's level, slope and term premium before making duration or financing decisions.","TreasuryDirect · Treasury bills",treasury]),
 P("Rates, bond prices and duration",
 "Long fixed cash flows are more sensitive to discount-rate changes than near-term cash flows.",
 [
 "An outstanding fixed coupon does not automatically change with market rates. Instead, the bond's market price moves so buyers receive a competitive yield. Duration approximates percentage price sensitivity to a small change in yields, and convexity adds the curvature absent from a linear estimate.",
 "For a portfolio with modified duration six, a yield increase of 0.75 percentage point implies a first-order estimated price change of −6 × 0.0075, or −4.5%. This is a rough market-price change, not a change in promised coupons and not a statement about default.",
 "A household buying a home in twelve months may prefer cash or matched short-term maturities over long-duration fixed income. Bond-market math matters because the most attractive quoted coupon may also carry substantial price risk if cash is needed before maturity."
 ],
 [["Modified duration","6"],["Hypothetical yield shock","+0.75 percentage point"],["Approximate bond-price effect","−6 × 0.0075 ≈ −4.5%"]],
 "Duration is a local approximation; credit spreads, convexity, market liquidity and embedded options can cause different outcomes.",
 "Compare a bond fund with duration two to one with duration eight under a +1.0-point rate shock, then explain why actual returns may differ.",
 [["Modified duration","First-order measure of bond price sensitivity to yield."],["Convexity","Curvature that changes the bond price response for larger yield moves."]],
 [Q("Duration six with a +0.75-point rate increase implies an approximate price move of:",["−4.5%","+4.5%","−0.75%","−6%"],0,"−6 × 0.0075 = −0.045."),
  Q("What generally happens to the price of a fixed-rate bond when market yields rise?",["It usually falls","It necessarily increases","It remains at par at every moment","It becomes insured"],0,"Higher required yields lower the price of fixed promised cash flows.")],
 ["Bond risk analyst","Report duration as a dollar stress loss alongside maturity, credit exposures and liquidity requirements.","TreasuryDirect · Marketable securities",treasury]),
 P("Floating rates, benchmark indices and reset risk",
 "An adjustable rate is determined by a contract formula and reset dates—not by general news headlines.",
 [
 "Many variable-rate instruments use an observable index plus a contractual spread, sometimes subject to floors and caps. If an illustrative loan charges an index of 3.5% plus a fixed 2.25-point margin, its current contractual rate is 5.75%, before considering caps or special conditions.",
 "The Secured Overnight Financing Rate (SOFR) is a broad measure of the cost of borrowing cash overnight collateralized by Treasury securities and is one reference benchmark used in financial contracts. Consumer loans may use other indices. A benchmark's publication schedule, look-back periods and reset dates influence actual payments.",
 "Interest-rate ceilings, adjustment frequency and whether unpaid interest is capitalized affect borrower risk. A financing strategy that seems affordable at the opening rate can fail after successive resets, particularly if income does not rise or asset returns disappoint."
 ],
 [["Illustrative reference index","3.50%"],["Contractual margin","+2.25 percentage points"],["Floating contractual rate","5.75% before caps/floors"]],
 "The index and margin must be taken from the actual contract; the current Federal Reserve target is not necessarily your loan's index.",
 "Find a sample adjustable contract, highlight index, margin, reset date, lifetime cap and how the worst-case payment would change.",
 [["Rate index","External published benchmark used in a variable-rate formula."],["Margin","Contractual increment added to the selected benchmark."]],
 [Q("An adjustable loan priced at index 3.5% plus margin 2.25 points has an initial rate of:",["1.25%","3.50%","5.75%","8.00%"],2,"3.50 + 2.25 percentage points = 5.75%."),
  Q("Which is essential before assuming a variable loan stays affordable?",["A favorable sales slogan","Reset dates, caps and stressed payments","The borrower's favorite stock","Last year's CPI alone"],1,"Variable costs can change according to the contract.")],
 ["Treasury analyst","Store benchmark sources and reset rules with each financing decision, and stress a high-rate cash-flow scenario.","NY Fed · SOFR reference",ny]),
 P("Policy choices in a household decision memo",
 "Professional analysis translates rate changes into risks for actual households without treating forecasts as facts.",
 [
 "A rate-sensitive household may have checking accounts, an auto loan, a fixed-rate mortgage, a floating credit card and long-term retirement investments. Each responds to monetary policy differently. The right question is which contractual payments can reset, which assets may reprice and which obligations are due soon.",
 "Consider a $12,000 variable debt balance with a rate increasing from 8% to 10%. If balances remain constant and you use a one-year simple-interest approximation, annual interest rises from $960 to $1,200, an additional $240. Actual revolving-loan interest depends on daily balance rules, repayment and fees.",
 "An analyst should prepare a dated cash-flow schedule for required payments and emergency buffers and a separate investment risk scenario. Interest-rate forecasts belong in an assumptions column, not disguised as guaranteed savings or investment yields."
 ],
 [["Illustrative variable debt","$12,000"],["Interest change","8% to 10%, constant-balance simplification"],["Simple annual interest increase","$1,200 − $960 = $240"]],
 "This is not an amortization schedule; paying principal and daily interest conventions change actual loan costs.",
 "Draft a one-page financial memo describing how higher and lower rates affect a renter's cash, a first-time homebuyer and an investor in long bonds.",
 [["Rate sensitivity","How a payment, value or cash flow changes when interest rates move."],["Stress test","A scenario evaluating financial performance under unfavorable assumptions."]],
 [Q("$12,000 at 10% annual simple interest costs how much per year if principal stays constant?",["$120","$960","$1,200","$12,000"],2,"$12,000 × 0.10 = $1,200."),
  Q("Which is a responsible policy-rate forecast statement?",["Mortgage rates must move one-for-one","All investments gain during rate cuts","Market response is conditional on expectations and risk","The Fed sets every credit-card APR"],2,"Transmission through financial markets is complicated and uncertain.")],
 ["Financial-policy reviewer","Identify observed contract terms, scenarios and assumptions; never promise how a central-bank decision will affect a specific mortgage quote.","Federal Reserve · FOMC",fed])
 ],
 caseStudy:{title:"A household exposed to three different interest rates",
 scenario:"A learner carries $12,000 variable debt, considers a new mortgage, and owns a long-duration bond fund. The hypothetical central bank raises its overnight target 0.5 percentage point. The credit agreement uses a different index and a 2-point margin; mortgage rates and bond yields have no guaranteed one-for-one response.",
 steps:[["Variable debt illustration","$12,000 × 0.5% ≈ $60 annual simple-interest increase if index rises equally"],["Mortgage underwriting","Request dated quotes; do not map FOMC change directly to mortgage APR"],["Bond duration illustration","Duration 6, +0.5-point yield shock ≈ −3% price"],["Cash protection","Identify exact due dates and liquid funds"]],
 decision:"Write a financial note separating contractual rate rules from market expectations, and recommend stress tests for the debt, mortgage and bond holdings."},
 finalChecks:[
 Q("The policy rate is set by the FOMC, but a 30-year fixed mortgage is priced using:",["Only the policy target","Long-term market yields and mortgage-specific risk factors","Only CPI every month","A guaranteed 1-for-1 formula"],1,"Mortgage pricing is linked to longer rates, credit and mortgage-specific factors."),
 Q("If nominal growth is 4% and inflation is 3%, exact real growth is approximately:",["7%","4%","0.97%","3%"],2,"1.04/1.03 − 1 ≈ 0.97%."),
 Q("A 0.75-point yield shock applied to duration six implies approximately:",["+4.5%","−4.5%","+6%","No change"],1,"Modified duration approximation is −6 × 0.0075.")
 ]
});
})();
