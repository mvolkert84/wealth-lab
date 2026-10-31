/* Wealth Lab Academy · Deep textbook expansion L9.S1: Bonds and Yield */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const sec="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/what-are";
const cfa="https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/interest-rate-risk-and-return";
WealthLabRegisterDeepChapter({
 id:"L9.S1",title:"Bonds and Yield: Pricing, Duration, Credit and Portfolio Use",
 sources:[sec,cfa,"https://www.investor.gov/introduction-investing"],
 parts:[
 P("Bonds are contracts, not guaranteed bank accounts",
 "A bond usually promises contract-defined interest and principal payments, subject to the issuer's ability and willingness to pay.",
 [
 "Buying a plain bond is lending money to an issuer such as a government, municipality or business. Its contract specifies the face value, coupon, maturity and special provisions. A $1,000 face-value bond with a 4% annual coupon generally pays $40 a year, often in two $20 installments, and returns face value at maturity if the issuer meets its obligations.",
 "The holder may buy or sell the bond between issuance and maturity. Its market price can rise above or fall below face value as prevailing interest rates, credit quality, liquidity and contract options change. Even a bond expected to repay its principal can create a loss if it must be sold when prices are depressed.",
 "Treasuries, corporate bonds, agency securities and municipal bonds differ in credit backing, tax treatment and tradeability. A bond is not equivalent to an insured bank deposit. Before comparing yields, identify exactly whose promise you hold and what could interrupt the promised cash flow."
 ],
 [["Face value","$1,000"],["Annual coupon rate","4%"],["Annual contractual coupon","$40"]],
 "A coupon payment is not a guarantee of full investment return; price paid, default risk and early redemption can change results.",
 "Compare a Treasury, corporate bond, municipal bond and bank CD. Identify the legal claim, issuer, principal protection and liquidity terms of each.",
 [["Face value","Contract amount normally due at scheduled maturity if the issuer performs."],["Coupon","Contractual periodic interest payment, usually quoted as a percentage of face value."]],
 [Q("A $1,000 face-value bond with a 4% annual coupon ordinarily pays how much interest per year?",["$4","$20","$40","$400"],2,"0.04 × $1,000 = $40 annually."),
  Q("If you must sell a bond before maturity, what can happen?",["You always receive face value","The market price can be below purchase price","You receive bank deposit insurance","The coupon automatically doubles"],1,"Selling before maturity exposes the holder to changing market price.")],
 ["Fixed-income analyst","Start with the bond's indenture, maturity, issuer, seniority and embedded options before comparing quoted yields.","SEC Investor.gov · Corporate bonds",sec]),
 P("Coupon rate, current yield and yield to maturity",
 "Three commonly quoted bond percentages answer different questions; yield to maturity requires the price and full cash-flow schedule.",
 [
 "Coupon rate is annual promised interest divided by face value. Current yield divides the annual coupon by the actual market price. For a $1,000-face bond that pays $40 annually and trades for $950, the coupon rate remains 4% while current yield is about 4.21%. Neither ratio alone captures the gain if the investor receives $1,000 at maturity.",
 "Yield to maturity is the discount rate that equates the current price with all scheduled coupon and principal payments assuming they are paid in full. Its calculation is sensitive to timing, compounding convention and contract terms. Reinvesting coupons at that same yield is an additional assumption when projecting a realized compound return.",
 "For a rough five-year illustration, a 4% coupon bond purchased at $950 has an approximate yield of ($40 plus $10 annualized discount recovery) divided by a $975 average bond value, or about 5.13%. Actual yield to maturity needs the full bond-price equation, not just this shortcut."
 ],
 [["Coupon rate","$40 ÷ $1,000 = 4%"],["Current yield at $950 price","$40 ÷ $950 ≈ 4.21%"],["Approx. yield-to-maturity shortcut (5 years)","($40 + $10) ÷ $975 ≈ 5.13%"]],
 "Current yield excludes price changes and maturity repayment effects. The approximation shown is not an exact YTM calculation.",
 "Find one real bond quotation and annotate coupon, clean price, accrued interest, yield measure and whether a call provision exists.",
 [["Current yield","Annual coupon divided by the current price."],["Yield to maturity","Discount rate matching bond price to scheduled cash flows under stated assumptions."]],
 [Q("An annual $40 coupon on a bond trading at $950 gives current yield closest to:",["4.00%","4.21%","9.50%","5.50%"],1,"$40 divided by $950 is about 4.21%."),
  Q("Which bond measure includes the price paid and repayment at maturity?",["Coupon rate only","Current yield only","Yield to maturity","Face value percentage only"],2,"YTM accounts for all scheduled coupons and principal at the purchase price.")],
 ["Bond trader","Read whether a quote uses yield to maturity, yield to call or yield to worst; these can diverge sharply for callable bonds.","CFA Institute · Interest Rate Risk and Return",cfa]),
 P("The price-yield seesaw",
 "For a fixed-rate bond, rising market yields generally push its price down; falling yields push the price up.",
 [
 "A previously issued 3% coupon bond becomes less attractive when comparable newly issued bonds offer 5%, so buyers normally demand a discounted price. If comparable new bonds offer 2%, the existing higher coupon may command a premium. This inverse price-yield relationship describes fixed contractual cash flows; credit changes can move bond values independently of benchmark interest rates.",
 "The price of a zero-coupon $1,000 payment due in five years at a 5% discount rate is roughly $783.53. The investor buys a promise to receive $1,000 later, not a stream of annual coupons. If the required yield rises after purchase, the market price of that same payment falls.",
 "A household using long-term bonds for next month's rent could be forced to sell at a poor time. Matching investment maturities and liquid reserves to spending dates is therefore as important as the headline yield. Interest-rate risk does not disappear just because an instrument is labeled fixed income."
 ],
 [["Five-year face-value payment","$1,000"],["Assumed discount yield","5% annually"],["Simplified zero-coupon price","$1,000 ÷ 1.05^5 ≈ $783.53"]],
 "The inverse rate/price relationship assumes other risks do not change. Credit deterioration can cause losses even while government yields fall.",
 "Explain why a fixed-rate bond with 15 years remaining usually reacts more strongly to a rate move than a similar bond with one year remaining.",
 [["Zero-coupon bond","Bond that makes no regular coupon payments and is generally sold at a discount to face value."],["Interest-rate risk","Exposure to changes in a bond's market value when yields change."]],
 [Q("When comparable market yields rise, an outstanding fixed-rate bond's price usually:",["Rises","Falls","Must remain at par","Becomes tax free"],1,"Investors demand a price discount on older fixed coupons."),
  Q("A five-year zero-coupon payment worth $1,000 discounted at 5% has PV closest to:",["$1,000","$950","$783.53","$500"],2,"Divide $1,000 by 1.05 to the fifth power.")],
 ["Fixed-income planner","Match bond maturities and liquidity to dated liabilities; the long bond with the highest quoted yield may be unsuitable for near-term spending.","SEC Investor.gov · Bond prices and yield",sec]),
 P("Duration: turning rate exposure into a rough number",
 "Duration estimates bond price sensitivity to yield changes, while convexity explains why the estimate is imperfect.",
 [
 "Macaulay duration is a weighted-average time to the bond's cash receipts; modified duration converts that timing into an approximate percentage price response to a small change in yields. A bond with modified duration 4 has a first-order price sensitivity of about minus 4% for a one-percentage-point yield increase.",
 "This approximation assumes a small parallel rate move and stable credit characteristics. A 1% point change is a large enough move that curvature, or convexity, can matter. Embedded calls or mortgage prepayments can cause effective duration to change as interest rates move.",
 "A bond fund reports portfolio duration because securities inside it vary; it is not a guaranteed maturity date. The investor should know whether the intended role is emergency liquidity, predictable short-term spending, medium-term stability or long-term diversification, since each demands different sensitivity."
 ],
 [["Illustrative modified duration","4 years"],["Yield increase","+1 percentage point"],["First-order estimated price change","≈ −4% before convexity and credit effects"]],
 "Duration is not a promise that a bond will lose exactly 4%; it is a local approximation under specific market assumptions.",
 "Run rate-shock scenarios of minus 0.5%, plus 0.5%, and plus 2% for two illustrative bond funds with durations 2 and 8.",
 [["Modified duration","Approximate percentage price sensitivity to a small yield change."],["Convexity","Curvature of bond price as yields change, beyond the linear duration approximation."]],
 [Q("Modified duration 4 and a small +1 percentage-point yield shock imply price movement approximately:",["+4%","−4%","0%","+1%"],1,"The first-order estimate is minus duration multiplied by yield change."),
  Q("Why does a duration estimate become less precise for large rate moves?",["Coupons disappear","Convexity and optionality matter","All issuers default simultaneously","Duration is only a stock ratio"],1,"Bond price-yield relationships have curvature and sometimes changing options.")],
 ["Risk analyst","Translate duration into a dollar stress estimate so a learner can see the possible mark-to-market loss alongside any yield pickup.","CFA Institute · Interest Rate Risk and Return",cfa]),
 P("Credit spreads, default risk and bond structure",
 "A yield premium is compensation for risks, not free money; promised income can fail to arrive.",
 [
 "Credit spread is the extra yield above a comparison benchmark of similar maturity and currency, often associated with default, liquidity and other risk differences. A corporate bond yielding 6% when a comparable Treasury yields 4% has an illustrative spread of two percentage points, or 200 basis points.",
 "A higher spread can signal greater uncertainty about repayment or weaker liquidity; it does not prove the issuer will fail. Credit ratings are opinions, and ratings can change. Reading the issuer's debt maturities, coverage ratios, cash flows and covenants is more informative than assuming an investment-grade label eliminates risk.",
 "Seniority matters during distress. Secured senior claims may recover more than subordinated claims, though recovery varies and cannot be guaranteed. A callable bond may be redeemed when refinancing is favorable to the issuer, depriving the investor of a high coupon just when reinvestment yields are lower."
 ],
 [["Comparable Treasury yield","4%"],["Corporate yield","6%"],["Illustrative credit spread","2 percentage points = 200 basis points"]],
 "Never treat a spread as guaranteed extra realized return. Defaults, downgrades and bid-ask costs can overwhelm that yield premium.",
 "Describe how you would evaluate two bonds with equal maturity and a 200-basis-point difference in yields.",
 [["Credit spread","Yield premium over a reference rate, reflecting various issuer and market risks."],["Callable bond","Bond the issuer may redeem before scheduled maturity under contract terms."]],
 [Q("A corporate bond yields 6% and a comparable Treasury 4%. The spread is:",["20 basis points","200 basis points","600 basis points","2 basis points"],1,"Two percentage points equal 200 basis points."),
  Q("Who normally benefits when an issuer calls a high-coupon bond after market rates fall?",["Only the original investor","Usually the issuer, which may refinance more cheaply","Every lender equally","The bond's coupon automatically increases"],1,"The call provision gives the issuer an option that can impose reinvestment risk on the bondholder.")],
 ["Credit analyst","Study the debt maturity ladder and cash coverage; a bond's risk depends on ability to repay, not the attractiveness of its coupon.","SEC Investor.gov · Corporate bonds",sec]),
 P("Bond allocation, ladders, taxes and real outcomes",
 "A useful fixed-income allocation balances purpose, maturity, tax treatment, credit risk, fees and access to cash.",
 [
 "An individual bond held to contractual maturity may return face value if the issuer performs, but interim market prices fluctuate and reinvestment risk remains. A diversified bond fund continuously holds many securities and has no single principal repayment date for an investor's shares. Both can play a stabilizing role, but they are different vehicles.",
 "A bond ladder divides purchases among maturity dates to spread refinancing risk and create known expected cash receipts. It does not make all issuers risk-free. Taxes also change comparisons: if a hypothetical municipal yield of 5% is fully exempt from a 24% federal marginal tax, its simple taxable-equivalent yield is 5% ÷ 0.76 ≈ 6.58%, ignoring state tax and other restrictions.",
 "The best instrument for money needed next month is usually assessed differently than fixed-income investments for a decade away. Evaluate accessible cash first, then select instruments based on matched goals, loss tolerance and after-tax returns rather than yield alone."
 ],
 [["Municipal tax-exempt yield (hypothetical)","5%"],["Assumed federal marginal tax rate","24%"],["Simple federal taxable-equivalent yield","5% ÷ (1 − .24) ≈ 6.58%"]],
 "Municipal tax exemption is issue- and investor-specific; the simplified taxable-equivalent calculation omits state tax, AMT, eligibility and investment risk.",
 "Create a three-rung bond ladder for hypothetical spending goals one, three and five years away. Explain reinvestment and default risks.",
 [["Bond ladder","Portfolio with securities due at staggered future dates."],["Taxable-equivalent yield","Taxable yield needed to match an exempt yield given specified tax assumptions."]],
 [Q("A 5% fully federal tax-exempt yield and 24% marginal rate imply simple taxable-equivalent yield closest to:",["3.8%","5.0%","6.58%","24%"],2,"Divide 5% by 1 minus .24."),
  Q("Which is most accurate about a bond fund?",["Every share matures at one known par date","It has no interest-rate exposure","It holds a changing portfolio without one guaranteed investor repayment date","It cannot diversify issuers"],2,"A fund's holdings and share value change over time.")],
 ["Portfolio manager","Define each bond sleeve's job: short-term liquidity, spending-date matching or broad diversification. Measure after-tax risk rather than maximized stated yield.","CFA Institute · Fixed income",cfa])
 ],
 caseStudy:{title:"A down-payment reserve versus a yield-chasing bond",
 scenario:"A household expects to buy a Connecticut home in eighteen months. It considers an insured short-term deposit, Treasury maturities matching its cash need, a long-term bond fund with duration 7 and a high-yield corporate bond. Assume a 1-percentage-point unexpected rate increase and evaluate whether the extra yield compensates for loss and access risks.",
 steps:[["Short-term objective","Home down payment required in ~18 months"],["Illustrative long-bond duration","7 years"],["Approximate +1% yield shock on long bond fund","About −7% price effect before convexity and spread moves"],["Decision priority","Protect needed principal and liquidity rather than maximize coupon"]],
 decision:"Write a cash-management recommendation separating insured deposits/Treasury liquidity from long-duration or credit-risk investments. State the risks and assumptions of each path."},
 finalChecks:[
 Q("The coupon rate of a bond changes when its resale price falls:",["True for every bond","False for a normal fixed-rate coupon bond","Only for government bonds","Only if the bond has no maturity"],1,"A fixed contract coupon is based on stated terms, while market yield changes with price."),
 Q("Which generally exposes a fixed-rate bond to greater price sensitivity?",["Longer duration","Lower duration","Shorter maturity with identical features","More insured cash"],0,"Longer duration indicates larger approximate sensitivity to a small yield shock."),
 Q("The appropriate first goal for money needed for a near-term down payment is:",["Highest nominal yield regardless of risk","Maximum leverage","Preservation, liquidity and maturity matching","An unhedged high-yield bond"],2,"Spending dates and the ability to access needed principal dominate yield chasing.")
 ]
});
})();
