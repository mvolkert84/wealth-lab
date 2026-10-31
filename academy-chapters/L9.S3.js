/* Wealth Lab Academy · Deep textbook L9.S3 · ETFs, Mutual Funds and Indexes */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const sec="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/characteristics-mutual-funds-exchange-traded-funds";
const fees="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/mutual-fund-and-etf-fees-and-expenses-investor-bulletin";
const distributions="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/fund-distributions-investor-bulletin";
WealthLabRegisterDeepChapter({id:"L9.S3",title:"ETFs, Mutual Funds and Indexes: Ownership, Tracking, Costs and Tax Efficiency",
 sources:[sec,fees,distributions],
 parts:[
 P("What you own when you buy a fund",
 "A fund share represents an interest in a pooled investment vehicle, not a direct separately titled holding in every underlying company.",
 [
 "An investment fund collects investors' capital and holds assets under a stated strategy. Mutual funds and exchange-traded funds can invest in stocks, bonds or other permitted instruments. Investors own fund shares while the fund owns and manages its underlying portfolio, subject to legal structure.",
 "An index seeks to measure the performance of a specified market segment using eligibility and weighting rules. A tracker fund seeks to replicate or approximate that index. The index itself is a calculation and usually cannot be purchased directly; fees, trading and portfolio methods create differences between the benchmark and the fund.",
 "A diversified fund can reduce single-company risk, but one fund does not eliminate market risk, tax obligations or the potential of a large decline. Review the prospectus for what it actually holds, not simply the words growth, income, diversified or broad market."
 ],
 [["Hypothetical fund total assets","$100 million"],["Illustrative shares outstanding","5 million"],["Simple net asset value","$100m ÷ 5m = $20 per share"]],
 "An index name does not guarantee fund holdings, costs or performance; an index-tracking fund can still lose considerable value.",
 "Choose one equity index and describe its constituent-selection method, weighting scheme and major concentration risks.",
 [["Net asset value (NAV)","Fund assets minus liabilities divided by outstanding fund shares."],["Index","Rule-based statistical measure of a market or asset group."]],
 [Q("$100m net assets divided by five million shares gives NAV of:",["$5","$20","$100","$500"],1,"100 million / 5 million = $20."),
 Q("Buying an index fund guarantees the benchmark's return without fees:",["True","False","Only when stocks rise","Only for retirement accounts"],1,"Fees and implementation create tracking differences.")],
 ["Fund analyst","Read index methodology and prospectus holdings before judging how diversified a fund actually is.","SEC Investor.gov · Funds",sec]),
 P("How mutual-fund pricing differs from ETF trading",
 "Traditional mutual funds generally transact at an end-of-day NAV; ETFs trade intraday at market prices.",
 [
 "Many mutual funds calculate NAV once each trading day and execute subscriptions or redemptions at the next calculated price under applicable rules. ETFs ordinarily have intraday secondary-market prices that can fluctuate relative to NAV, with bid-ask spreads and potentially brokerage commissions.",
 "Suppose an ETF has underlying NAV of $50 per share while buyers offer $50.10 and sellers bid $49.90. The quoted spread is $0.20, or 0.4% of $50. An investor buying at the ask and immediately selling at the bid would lose approximately $0.20 per share before commissions and any price movement.",
 "Creation/redemption mechanisms involving authorized participants can help ETF prices track portfolio values, but do not perfectly eliminate premiums, discounts or liquidity problems, particularly in volatile or thin markets. A learner should distinguish fund liquidity from liquidity of the underlying assets."
 ],
 [["ETF indicative net asset value","$50.00"],["Best bid and ask","$49.90 / $50.10"],["Bid-ask spread","$0.20 = 0.40% of $50"]],
 "An ETF's last traded price is not always the current realizable sale price, particularly during illiquid conditions.",
 "Compare how a purchase order is priced for a traditional mutual fund and an ETF late in the trading day.",
 [["Bid-ask spread","Difference between the quoted buying and selling prices of a security."],["ETF premium/discount","Difference between ETF market price and estimated or reported portfolio NAV."]],
 [Q("$50.10 ask minus $49.90 bid equals a spread of:",["$0.02","$0.20","$2.00","$20.00"],1,"50.10 − 49.90 = 0.20."),
 Q("Most traditional open-end mutual funds execute an order at:",["Any intraday exchange price","A calculated NAV under fund rules","A guaranteed midpoint of ETF spreads","The original IPO price"],1,"They typically price at a daily NAV rather than exchange trades.")],
 ["Trading operations","Check spreads, premium/discount history and market hours when executing ETF trades.","SEC Investor.gov · ETFs and funds",sec]),
 P("Index selection, weighting and concentrated exposure",
 "A low-cost fund is useful only if its underlying index matches the investor's goals and risk capacity.",
 [
 "Market-capitalization-weighted indices give larger companies a higher weight as their market value rises, while equal-weighted and factor-based indices follow different allocation rules. A broad index can therefore be dominated by a small set of very large issuers even while holding hundreds of securities.",
 "If a hypothetical fund owns Company A at 20%, B at 15%, and all remaining companies at 65%, the top two companies create 35% exposure. Holding another fund with the same two companies does not automatically diversify them away. Examine the overlap of underlying holdings across funds.",
 "Sector, country, currency, duration and credit exposures matter as well. A fund-of-funds can be useful but may layer expenses or duplicate holdings. Investors should describe the actual economic exposures, not merely count ticker symbols in their accounts."
 ],
 [["Company A fund weight","20%"],["Company B fund weight","15%"],["Combined top-two exposure","35%"]],
 "Holding many stocks or multiple funds does not ensure diversification when exposures are highly concentrated or correlated.",
 "Compare two index methodologies using top-ten company weights and sector concentration and explain the trade-off.",
 [["Capitalization weighting","Index weighting based on each constituent's market value."],["Holdings overlap","Assets owned in common across multiple funds or portfolios."]],
 [Q("Top two fund holdings at 20% and 15% together represent:",["5%","20%","35%","65%"],2,"20 + 15 = 35% of the fund."),
 Q("Owning two funds with highly overlapping holdings:",["Guarantees diversification","May leave considerable concentration","Eliminates volatility","Avoids every fee"],1,"Overlap can replicate the same risk positions.")],
 ["Portfolio construction","Aggregate holdings across accounts before evaluating diversification.","SEC Investor.gov · Fund holdings",sec]),
 P("Expense ratios, trading costs and long-term drag",
 "A fund's quoted expense ratio is a recurring economic cost, but trading costs and taxes also affect realized outcomes.",
 [
 "The annual expense ratio generally reflects certain ongoing fund operating expenses as a percentage of average net assets. A $20,000 fund holding with a hypothetical 0.50% annual expense ratio corresponds to approximately $100 of expense per year at a constant balance, usually reflected in fund performance rather than a separate bill.",
 "The cost compounds over long periods. Assuming a $10,000 initial investment and gross return of exactly 6% each year for 20 years, ending value is around $32,071. At a simplified 5.5% return after a 0.5-point annual expense difference, it is about $29,177, a gap near $2,894. These are smooth hypothetical forecasts, not market results.",
 "Expense ratio does not necessarily capture every spread, market impact, sales load, commission, account charge or tax effect. When two funds track the same benchmark, investigate tracking differences and all-in costs rather than choosing based on one advertised fee."
 ],
 [["Illustrative holding and expense ratio","$20,000 at 0.50%"],["Annual cost at fixed balance","≈ $100"],["20-year illustrative gross vs net ending values","$32,071 vs $29,177; difference ≈ $2,894"]],
 "Fund returns are not smooth or guaranteed, and adding the expense ratio mechanically to reported net returns may double-count fees.",
 "Compare a hypothetical 0.05% and 0.70% annual expense ratio on the same initial amount and estimate the 25-year difference using a calculator.",
 [["Expense ratio","Fund annual operating expenses as a percentage of fund assets, as defined in disclosures."],["Tracking difference","Gap between a fund's actual return and its benchmark over a comparable period."]],
 [Q("$20,000 multiplied by 0.50% equals an approximate annual expense of:",["$10","$50","$100","$1,000"],2,"$20,000 × 0.005 = $100."),
 Q("Which may add to the total cost beyond a quoted expense ratio?",["Bid-ask spread and taxes","The fund's color theme","Ticker length","The index's name alone"],0,"Trading expenses, spreads and taxes can affect realized returns.")],
 ["Investment-cost audit","Compare all-in costs and tracking difference over comparable dates before attributing any return gap to manager skill.","SEC Investor.gov · Fees and Expenses",fees]),
 P("Distributions, turnover and tax efficiency",
 "A fund can distribute taxable gains even when the investor did not sell the fund shares.",
 [
 "Funds may pass through dividend income, interest or realized capital gains. Taxable-account investors can face reportable distributions even if they automatically reinvest them. The nature, timing and tax treatment depend on the fund and applicable law, not just the owner's decision to take cash.",
 "Suppose a fund distributes $600 to an investor in a taxable account and the amount is reinvested at $30 per share. The investor receives 20 additional shares, while tax treatment of the distribution must still be considered. The value transferred to new shares should not be confused with free profit created by reinvestment.",
 "Some ETF structures have mechanisms that can limit certain capital-gain distributions, but ETFs are not universally tax-free, and fixed-income or specialized ETF distributions may be substantial. A low-turnover strategy, account location and particular security holdings all affect tax efficiency."
 ],
 [["Illustrative fund distribution","$600"],["Reinvestment price","$30 per share"],["Additional shares acquired","20; tax treatment must still be reviewed"]],
 "Reinvesting distributions does not automatically cancel current tax obligations in a taxable account.",
 "Find a fund prospectus and last year's distribution notice and identify what types of income were reported.",
 [["Turnover","Frequency with which fund holdings are bought and sold over a period."],["Capital-gain distribution","Fund payment associated with realized gains under applicable accounting/tax rules."]],
 [Q("$600 fund distribution reinvested at $30 per share purchases:",["2 shares","20 shares","30 shares","600 shares"],1,"600/30 = 20 shares."),
 Q("A fund distribution reinvested inside a taxable account:",["Always avoids tax","May still create taxable income","Is always a loan","Must be paid in cash"],1,"Reinvestment changes how proceeds are used, not necessarily whether income is reportable.")],
 ["Tax-sensitive fund review","Use published prospectus and tax information; distinguish qualified dividends, ordinary interest and gains.","SEC Investor Bulletin · Fund Distributions",distributions]),
 P("Choose the fund that meets the job",
 "A responsible fund decision weighs exposure, cost, liquidity, account treatment, time horizon and realistic alternatives.",
 [
 "For a young investor with decades until retirement, a broad diversified stock fund may be reasonable as part of a written investment plan, provided the investor can absorb substantial declines. A household saving for an imminent home purchase should separately evaluate safer liquid instruments rather than assuming every index fund is appropriate.",
 "Document the objective, benchmark, top exposures, fee schedule, trading spread, tax account, tracking history and liquidity of underlying securities. Concentrated thematic funds may have appealing names but can fail to deliver the diversified behavior a beginner expects.",
 "No fund selection removes the need for cash reserves, sustainable contributions or an appropriate asset allocation. The right analysis evaluates both how a fund behaves in a portfolio and how the person would cope during a severe but plausible downside scenario."
 ],
 [["Illustrative retirement horizon","25 years"],["Illustrative home purchase horizon","18 months"],["Decision distinction","Long-horizon risk budget differs from short-term cash need"]],
 "Do not use recent winning fund performance as a stand-alone signal of future outperformance.",
 "Write a fund due-diligence worksheet covering five metrics, a worst-case scenario and the purpose of the fund within a household plan.",
 [["Investment mandate","Documented objective, assets and constraints guiding a fund."],["Suitability","Fit between an investment's risk and a particular investor's goals and constraints."]],
 [Q("Which factor is most directly relevant to selecting a diversified fund?",["Underlying exposure and total cost","Length of ticker","Recent influencer attention","Guaranteed future return"],0,"Holdings and costs drive much of long-term behavior."),
 Q("An index fund should automatically hold a home down payment needed in six months:",["Yes","No, time horizon and loss capacity matter","Only if its price rose last year","Only if it has many holdings"],1,"Even broad stock funds can suffer sharp near-term losses.")],
 ["Investment policy","Match funds to dated goals, risk capacity, costs and taxes; document why each holding is needed.","SEC Investor.gov · Mutual Funds and ETFs",sec])
 ],
 caseStudy:{title:"Two funds for one long-term goal",
 scenario:"An investor has $5,000 to invest over 20 years and considers a broad index ETF with 0.07% annual expenses and a thematic fund with 0.85% annual expenses. Both have uncertain future returns; the thematic fund also holds large concentrated weights. The same household needs $10,000 for housing expenses within a year.",
 steps:[["Hypothetical ETF expense at $5,000","$5,000 × 0.07% ≈ $3.50 per year initially"],["Hypothetical thematic fund expense at $5,000","$5,000 × 0.85% ≈ $42.50 initially"],["Approximate annual fee difference at initial balance","$39, before trading costs and changing balances"],["Crucial separate need","$10,000 housing cash should not depend on risky fund prices"]],
 decision:"Develop a portfolio memorandum that separates the housing reserve, long-term allocation, fund concentration and all-in cost differences. Avoid claiming guaranteed performance advantage."},
 finalChecks:[
 Q("A mutual fund generally buys/redeems at:",["A next-calculated NAV under its rules","An ETF's intraday bid","A guaranteed initial offering price","An FDIC insured par value"],0,"Traditional mutual funds commonly transact at NAV."),
 Q("A $20k fund balance at 0.5% annual expenses implies approximate annual expenses of:",["$10","$100","$1,000","$5,000"],1,"20,000 × .005 = 100."),
 Q("Owning multiple equity funds always eliminates concentration risk:",["True","False","Only in IRAs","Only when expense ratios match"],1,"Holdings overlap and market correlation still matter.")
 ]
});
})();
