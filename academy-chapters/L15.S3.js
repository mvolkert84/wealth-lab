/* Wealth Lab Academy · Deep textbook L15.S3: Debt, Carry and Arbitrage Claims */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const sec="https://www.sec.gov/investor/pubs/margin.htm";
const cfpb="https://www.consumerfinance.gov/owning-a-home/";
const inv="https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-brokerage-accounts";
WealthLabRegisterDeepChapter({
 id:"L15.S3",title:"Debt, Leverage and Arbitrage Claims: How Capital Is Structured—And Where It Breaks",
 sources:[sec,inv,cfpb],
 parts:[
 P("Distinguish using capital from creating wealth",
 "Borrowing increases the amount of assets you control, but borrowed money is balanced by a liability.",
 [
 "A bank advance, mortgage, policy loan or brokerage margin loan may place spendable money in your account, but the amount borrowed is not new personal net worth. An asset increases and a liability also increases. A debt-funded purchase can create value only if the acquired asset performs sufficiently well after financing costs, taxes, risk and transaction expenses.",
 "For example, a $100,000 property purchased with $20,000 equity and an $80,000 loan has $20,000 starting equity before closing costs. If its value rises 10% to $110,000 and debt remains $80,000, equity rises to $30,000, which is a 50% gain on the initial cash. If the value falls 10% to $90,000, equity falls to $10,000, a 50% loss.",
 "Real estate also has taxes, insurance, repair costs, selling expenses and interest, so the simplified leverage return omits significant economic costs. Leverage magnifies the change in equity; it does not guarantee the underlying investment earns enough to justify the debt."
 ],
 [["Starting property value / mortgage","$100,000 / $80,000"],["After +10% property price move","$30,000 equity vs $20,000 initial"],["After −10% property price move","$10,000 equity vs $20,000 initial"]],
 "The numbers ignore all costs and assume debt is unchanged. Actual negative equity is possible if losses exceed initial equity.",
 "Recalculate the example with a 25% decline and estimate the debt remaining after a hypothetical sale before transaction costs.",
 [["Financial leverage","Use of borrowing to increase gross exposure relative to contributed equity."],["Loan-to-value (LTV)","Outstanding secured debt divided by the collateral's value."]],
 [Q("A $100k asset financed with $80k of debt has starting equity of:",["$80,000","$100,000","$20,000","$180,000"],2,"Asset value less debt is $20,000."),
  Q("If collateral falls from $100k to $90k with debt still $80k, equity becomes:",["$10,000","$90,000","$80,000","$20,000"],0,"$90,000 minus $80,000 equals $10,000.")],
 ["Balance-sheet analyst","Show asset value, gross debt, interest and net worth separately. Never call credit availability income or an emergency fund.","SEC · Margin investing",sec]),
 P("The cost-of-capital spread is not risk-free profit",
 "Borrowing at one rate to invest at a higher expected rate exposes you to mismatched risks, taxes and bad timing.",
 [
 "A simple carry trade borrows money and holds an asset whose income or expected return exceeds the financing rate. If an investor borrows $50,000 at 6% and earns a hypothetical 8% on an investment in one year, gross investment return is $4,000 while contractual borrowing interest is $3,000. That leaves a modeled $1,000 before all taxes, fees and principal risk.",
 "Now stress the same transaction. If the asset instead falls by 20%, its $50,000 purchase value declines to $40,000. The borrower still owes $50,000 principal plus interest. The apparent 2-point return spread did not protect the original equity from loss.",
 "Interest-rate and duration mismatches can also create losses. Floating-rate financing can become more expensive while an illiquid investment produces no cash; temporary pricing dislocations may last longer than a borrower can stay solvent. Professional analysis compares the worst credible cash deficit, not only the hoped-for positive spread."
 ],
 [["Borrowed capital","$50,000"],["Assumed investment return at 8%","+$4,000"],["Contractual 6% annual loan interest","−$3,000; $1,000 modeled pre-cost spread"]],
 "An expected investment return is not contractually owed to you, whereas debt interest and principal generally remain enforceable.",
 "Model an adverse 20% asset loss and a two-percentage-point rise in borrowing costs. Identify how the plan would meet loan payments without selling at a loss.",
 [["Carry","Economic income/return from holding an asset after financing costs, under stated assumptions."],["Spread","Difference between two rates or yields; not a guarantee of realized gain."]],
 [Q("Borrow $50k at 6% and earn a hypothetical 8% before all costs. The nominal annual gross spread dollars are:",["$1,000","$3,000","$4,000","$50,000"],0,"8% of $50k less 6% of $50k equals $1,000."),
  Q("If the purchased asset loses 20% but the loan balance remains, the borrower's debt:",["Falls automatically with asset price","Is still owed under the loan contract","Is canceled by a brokerage firm","Always becomes tax-free"],1,"Assets and debts move independently unless contractual rules say otherwise.")],
 ["Treasury/risk team","Model rates, taxes, collateral values and cash flow together. The weakest scenario can determine whether a carry strategy survives.","SEC · Margin borrowing and risk",sec]),
 P("Real estate and home equity as collateral",
 "Putting a home behind a loan may reduce its interest rate but increases the consequences of nonpayment.",
 [
 "Home equity is the home value minus mortgage and other secured liens. A HELOC is usually a revolving home-secured line with product-specific draws, rates, repayment phases and fees. A cash-out refinance can replace a first mortgage with a larger loan, with the homeowner receiving some proceeds and taking on additional obligations.",
 "Borrowing $30,000 against home equity to invest does not make the $30,000 free. If the portfolio declines, the home-secured debt remains and payments can endanger the home. The financing arrangement may change lender underwriting, cash reserves, insurance or future borrowing options.",
 "Compare total interest costs and amortization, not only the monthly payment. Stretching debt across a longer term may lower a payment while increasing total interest. Any claimed tax deduction for home-equity borrowing is limited by applicable tax rules and use of proceeds and should not be assumed."
 ],
 [["Home value, hypothetical","$250,000"],["Existing mortgage","$190,000"],["Home equity before new borrowing","$60,000 (not spendable cash)"]],
 "Refinancing may replace a favorable older rate, trigger closing costs or shift unsecured debts onto collateral you could lose.",
 "Create a comparison of no new loan, a HELOC and cash-out refinancing with the same financing amount, including variable-rate and closing-cost scenarios.",
 [["HELOC","Home equity line of credit; a loan secured by a residence with specified terms."],["Cash-out refinance","Refinancing a mortgage for more than the prior balance to receive cash proceeds."]],
 [Q("A $250k home with $190k secured mortgage debt has equity of:",["$190,000","$250,000","$60,000","$440,000"],2,"$250,000 minus $190,000 equals $60,000."),
  Q("Why is moving credit-card debt onto home collateral a serious change?",["It always erases principal","Nonpayment can now place the home at risk","The rate must remain fixed forever","The debt becomes income"],1,"The asset securing the loan changes the consequence of default.")],
 ["Mortgage planner","Recalculate lifetime interest, cash-to-close, liens, rate sensitivity and payment shock—not just the initial monthly payment.","CFPB · Buying a house",cfpb]),
 P("Margin debt, forced liquidation and liquidity spirals",
 "Brokerage leverage may be called or liquidated during a decline, so an investor cannot assume unlimited time for recovery.",
 [
 "Margin accounts allow qualifying investors to borrow from brokers using eligible securities as collateral. Loan agreements and margin requirements govern interest, maintenance and the broker's right to sell assets. Unlike a typical fully paid cash account, an investor may be required to deposit additional funds quickly during falling prices.",
 "Suppose securities worth $16,000 are financed with $8,000 of investor equity and $8,000 of borrowed funds. A decline to $12,000 leaves $4,000 equity, or 33.3% of the account's value, before interest. If the broker requires 40% maintenance, equity of $4,800 would be required and the account is $800 short of that requirement.",
 "A broker may liquidate positions without prior notice under applicable contracts and rules. Forced selling after a loss can lock in damage before a recovery occurs. The investor should consider potential maximum losses, required cash on very short notice and the possibility of owing more than the original contribution."
 ],
 [["Post-decline securities value","$12,000"],["Borrowed balance","$8,000; investor equity $4,000"],["40% maintenance requirement","$4,800 equity; $800 requirement shortfall"]],
 "A broker can impose house requirements above regulatory minima and may change them; never assume a margin call gives a fixed grace period.",
 "Compute maintenance equity requirements at 25%, 30% and 40%, then explain why financing itself cannot protect the position.",
 [["Maintenance margin","Minimum required investor equity relative to margined securities under applicable rules."],["Forced liquidation","Broker-initiated sale of assets to address a collateral or margin shortfall."]],
 [Q("$12k in securities minus an $8k margin loan leaves equity of:",["$12,000","$8,000","$4,000","$20,000"],2,"$12,000 minus $8,000 is $4,000."),
  Q("A broker with a shortfall may:",["Always wait until the customer's preferred date","Sell securities under account terms without advance notice","Waive all loan interest","Guarantee market recovery"],1,"Margin agreements can allow forced sales to protect the lender.")],
 ["Brokerage compliance","Understand the exact maintenance, liquidation and house-margin provisions before using leverage.","SEC · Margin borrowing and risk",sec]),
 P("Taxes, contract structure and apparent arbitrage",
 "Many advertised 'arbitrage' strategies are leveraged directional bets after costs and tax rules are included.",
 [
 "True arbitrage is a strategy that seeks to lock in price differences through offsetting positions; in reality there can still be execution, settlement, financing or counterparty risk. Buying stocks with a policy loan because modeled returns exceed loan rates is better described as a leveraged investment, not riskless arbitrage.",
 "Tax treatment depends on the asset, account, ownership structure and permissible use of proceeds. Suppose a taxable investment earns 8%, and 22% is paid on that specific return in a simplified model: the after-tax figure is 6.24%. If deductible treatment is unavailable and loan interest costs 7%, the net rate spread becomes minus 0.76 percentage points before fees. Real tax law may differ substantially.",
 "Capital structures using trusts, corporations, property financing or insurance contracts can solve genuine problems but also introduce legal costs and ongoing administrative responsibilities. The relevant question is whether after-tax, risk-adjusted value exceeds a simpler alternative using the same total household resources."
 ],
 [["Illustrative gross investment return","8%"],["Assumed tax on this return","22% of 8% → modeled 6.24% after tax"],["Loan rate not assumed deductible","7%; modeled net spread −0.76 percentage points"]],
 "The tax assumption is a teaching simplification and not an assertion that all investment returns or borrowing are taxed or deductible this way.",
 "Build an after-tax spread model with three loan rates and two tax treatments. Identify what you would have to verify before relying on it.",
 [["Arbitrage","An attempt to exploit differing prices for economically offsetting exposures."],["After-tax spread","Difference in economic returns and financing costs after modeled applicable taxes."]],
 [Q("8% gross return reduced by an assumed 22% tax on that return gives simplified net return of:",["8.00%","6.24%","22.00%","−14.00%"],1,"8% × (1 − .22) = 6.24%."),
  Q("Borrowing to buy volatile equities at a lower stated interest rate is best described as:",["Guaranteed riskless arbitrage","A leveraged investment exposed to market and financing risk","An insured deposit","An automatic tax exemption"],1,"The asset return is uncertain while the debt is a binding obligation.")],
 ["Tax and legal diligence","Write out each source of financing, asset ownership and potentially taxable event. Validate tax deductions with a qualified adviser rather than a promotion.","SEC Investor.gov · Brokerage accounts",inv]),
 P("The difference between lawful financial engineering and market manipulation",
 "Learning how capital moves is valuable; deceptive practices that distort prices or mislead other investors are not acceptable wealth strategies.",
 [
 "Legitimate financial engineering includes structuring debt maturities, hedging unwanted risks, financing productive assets, matching cash flows and legally minimizing costs and taxes. Banks and companies create contracts to manage funding and risk, but such structures must satisfy disclosures, contracts, regulatory constraints and economic realities.",
 "Market manipulation is different: schemes such as coordinated false promotional claims, wash trading or intentionally misleading trades can distort apparent prices or volume. Insider trading and fraudulent representations can also violate securities laws. A student of finance should learn to identify red flags and avoid participating, not treat deception as an advanced investment skill.",
 "A robust wealth strategy is explainable without concealed assumptions. Ask who benefits, who bears downside losses, what risks cannot be hedged, what is guaranteed by contract and whether the opportunity depends on another person's misunderstanding. Favor transparency, liquidity and resilience over secret 'money hacks.'"
 ],
 [["Lawful structure","Risk-managed financing, disclosed terms and credible cash flows"],["Unacceptable conduct","False representations or artificial market activity"],["Analyst decision","Verify contracts, incentives, risk and applicable law"]],
 "If a strategy requires guaranteed returns from volatile assets, hidden conflicts or misleading trades, it is not sound financial planning.",
 "Review a hypothetical social-media stock promotion claiming a 300% guaranteed gain. List the disclosures and evidence needed to evaluate whether it is misleading.",
 [["Financial engineering","Designing contracts and capital structures to transfer, fund or manage financial risks."],["Market manipulation","Prohibited conduct intended to distort market prices or trading signals deceptively."]],
 [Q("Which is an example of legitimate financial engineering?",["Publishing fake volume to lure buyers","Matching a business loan's maturity to predictable cash receipts","Hiding leverage from lenders","Falsifying financial statements"],1,"Matching funding obligations to cash flows is a legitimate risk-management activity."),
  Q("A claim that a volatile investment guarantees a large return with no risk should be treated as:",["Reliable valuation evidence","An immediate borrowing opportunity","A red flag requiring independent verification","Proof of tax-exempt income"],2,"Guaranteed profit claims are inconsistent with ordinary investment risk and can indicate deception.")],
 ["Ethics committee","Document sources, conflicts, incentives and counterparty risks. Reject a scheme if its profitability depends on misleading market participants.","SEC · Investor protections",sec])
 ],
 caseStudy:{title:"Borrowing at 7% to invest at an expected 9%",
 scenario:"A promoter tells a household with a $250,000 home and limited emergency savings to borrow $30,000 at a 7% variable rate against its home because an investment is expected to return 9%. The promoter excludes taxes, fees, possible price falls and the loan's effect on the mortgage. Assess the proposal as an independent financial adviser.",
 steps:[["Modeled expected investment gain","$30,000 × 9% = $2,700"],["One-year contractual loan interest at 7%","$30,000 × 7% = $2,100"],["Apparent gross interest spread","+ $600 before tax, costs or losses"],["If investment loses 20% instead","Asset declines $6,000 and debt remains owed"]],
 decision:"Prepare a recommendation memo identifying the true financing contract, household cash requirements, stress scenarios, downside collateral consequences and why the expected spread may not justify the risk."},
 finalChecks:[
 Q("Borrow $30k at 7%, earn hypothetical 9%. Modeled annual gross dollar spread before all costs is:",["$600","$2,100","$2,700","$30,000"],0,"$2,700 − $2,100 = $600, subject to actual outcomes."),
 Q("Which is a critical risk of borrowing against a primary residence for speculative investments?",["No downside exposure","Potential loss of the home after unaffordable secured debt","Elimination of interest","Automatic growth of equity"],1,"Home-secured debt can endanger shelter when payments cannot be met."),
 Q("Which claim signals a need to investigate possible manipulation or fraud?",["Forecast returns may be negative","Market prices fluctuate","The return is guaranteed with no risk and relies on hidden special access","The security has published filings"],2,"Claims of guaranteed profits and secret advantages demand skepticism.")
 ]
});
})();
