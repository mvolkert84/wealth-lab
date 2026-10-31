/* Wealth Lab Academy · Deep textbook expansion L10.S1: Asset Allocation and Goal Buckets */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const sec="https://www.investor.gov/introduction-investing";
const cfa="https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam";
WealthLabRegisterDeepChapter({
 id:"L10.S1",title:"Portfolio Allocation: Goal Buckets, Risk Capacity, Correlation and Rebalancing",
 sources:[sec,cfa,"https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/"],
 parts:[
 P("Begin with goals and dated liabilities",
 "Portfolio construction begins with when money will be needed, not with a prediction about next week's best-performing asset.",
 [
 "A family preparing for rent, a possible home down payment, children's needs and retirement does not have one uniform investment horizon. Emergency funds and required near-term payments need accessibility and capital stability. Savings for spending in a few years may need a more conservative allocation than wealth intended to remain invested for multiple decades.",
 "Goal buckets label the function of money instead of claiming that particular accounts physically isolate risk. For example, a checking buffer covers upcoming obligations, a high-liquidity reserve covers surprises, an eighteen-month home fund targets principal preservation, and a long-term retirement portfolio can accept more market fluctuation.",
 "The dollar amount available to invest should be calculated only after essential living obligations, debt costs and realistic reserves. Counting unused credit limits or future projected market gains as cash would confuse household liquidity with borrowing capacity or hypothetical net worth."
 ],
 [["Rent and bill cash","Needed on scheduled due dates"],["Home down-payment bucket","Illustrative 18-month horizon"],["Retirement bucket","Potential decades-long horizon"]],
 "A target investment return cannot repair a cash shortfall occurring before the expected gain arrives.",
 "Map the next 24 months' mandatory expenses alongside a ten-year wealth goal. Label which dollars can absorb a 30% market decline without jeopardizing an obligation.",
 [["Investment horizon","Period until money is expected to be needed."],["Goal bucket","Portfolio designation based on a specific objective, timing and loss capacity."]],
 [Q("Money required for a mortgage closing in six months generally needs priority on:",["Maximum stock volatility","Liquidity and principal preservation","Unsecured leverage","A concentrated speculative bet"],1,"Near-term fixed spending dates leave little time to recover a market loss."),
  Q("Unused credit-card borrowing capacity should be counted as:",["Cash in the emergency fund","Investable net worth","Potential debt, not spendable savings","Guaranteed income"],2,"Available credit is borrowing capacity that creates a liability when used.")],
 ["Household planner","Start with obligations, reserves and goals, then decide which remaining dollars can accept investment risk.","CFPB · Financial toolkit","https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/"]),
 P("Risk tolerance is not the same as risk capacity",
 "Willingness to withstand losses and the financial ability to withstand them are two different constraints.",
 [
 "Risk tolerance describes how much uncertainty an investor emotionally accepts. Risk capacity describes how much loss the investor can financially absorb without failing objectives. A person may enjoy volatile investments but have almost no capacity to lose a planned down payment; another may dislike daily volatility but own a well-funded, long-horizon retirement portfolio.",
 "Portfolio weights express how capital is distributed among assets. An illustrative $10,000 portfolio with 70% stock exposure and 30% bond exposure contains $7,000 in stocks and $3,000 in bonds. The allocation is a risk mix, not a guarantee of returns or a recommendation suitable for everyone.",
 "Concentration should be measured through funds as well as individual holdings. Owning several technology funds may still produce essentially the same underlying stock exposure. The appropriate weights depend on objective, income stability, time horizon, taxes, liquidity and constraints."
 ],
 [["Illustrative portfolio","$10,000"],["Stocks at 70%","$7,000"],["Bonds at 30%","$3,000"]],
 "An age-based percentage alone is not a complete allocation strategy; unusual income risk, home plans and debt can alter risk capacity.",
 "Describe a person with high emotional tolerance but low financial capacity for loss. State how their allocation should reflect the stricter constraint.",
 [["Risk tolerance","Psychological willingness to accept fluctuations and possible losses."],["Risk capacity","Financial ability to absorb losses without derailing goals."]],
 [Q("A 70% stock allocation in a $10,000 portfolio equals:",["$700","$3,000","$7,000","$10,000"],2,"0.70 × $10,000 = $7,000."),
  Q("A homebuyer needs cash within twelve months but enjoys speculative stocks. The binding constraint is most likely:",["Risk capacity","Favorite stock sector","Brokerage app color","Past highest return"],0,"The need to make the closing payment limits how much loss is bearable.")],
 ["Portfolio adviser","Record willingness and ability to take risk separately and explain any gap before deciding the portfolio mix.","SEC Investor.gov · Allocation and diversification",sec]),
 P("Expected returns and downside scenarios",
 "The weighted portfolio return combines component returns, but correlations make loss risk more complex than one average.",
 [
 "A weighted portfolio return sums each asset's return multiplied by its starting portfolio share, ignoring transaction costs and contributions for a simple period. If stocks are 60% of a portfolio and fall 30%, while bonds are 40% and rise 5%, the modeled portfolio return is minus 16%. The bonds cushion the shock but do not erase it.",
 "A hypothetical $10,000 portfolio in that scenario falls to $8,400. An investment with modest expected positive long-term return can still suffer deep short-term losses. Evaluate adverse conditions in dollars against a family's needs rather than only in percentages.",
 "Expected return must also be distinguished from an actual realized return. Historical averages, forward-looking assumptions and optimistic marketing charts use different inputs. A good planning process examines loss severity, liquidity requirements and the likelihood of selling under stress."
 ],
 [["Stock contribution to return","60% × −30% = −18%"],["Bond contribution to return","40% × +5% = +2%"],["Combined illustrative return","−16% (from $10,000 to $8,400)"]],
 "Past diversification patterns can weaken in a crisis; bonds and stocks can both decline under some rate and inflation shocks.",
 "Write a stress test for 60/40 and 80/20 portfolios using stock returns of −30% and bond returns of +5%, then compare the dollar losses.",
 [["Weighted return","Sum of each portfolio weight multiplied by that asset's period return."],["Drawdown","Decline from a prior portfolio high to a later lower value."]],
 [Q("With 60% stocks at −30% and 40% bonds at +5%, the portfolio return is:",["−25%","−16%","+2%","−30%"],1,"0.6 × −30% + 0.4 × 5% = −16%."),
  Q("What does a positive long-run expected return guarantee for the next six months?",["That prices rise","That the downside cannot exceed 5%","Nothing about the short-run outcome","That bonds will always offset stocks"],2,"Expected values do not guarantee realized near-term performance.")],
 ["Risk committee","Show worst-case dollar outcomes and the expenses that must still be paid; percentages alone hide the lived consequences of losses.","CFA Institute · Portfolio Management",cfa]),
 P("Diversification, volatility and correlation",
 "Diversification works when exposures are imperfectly correlated; simply owning more line items is not enough.",
 [
 "Correlation measures the direction and degree to which two assets tend to move together, from minus one through plus one. With identical perfect positive correlation, adding a second holding may provide almost no volatility reduction. Assets with lower correlation can potentially reduce a portfolio's total variance, though relationships change across market regimes.",
 "For a simple two-asset model, portfolio variance combines both weighted asset variances and a covariance term. Assume stocks have 20% volatility, bonds 6%, correlation 0.20, and weights 60% stocks/40% bonds. The modeled portfolio variance is 0.016128 and its standard deviation is approximately 12.70%, less than the simple 14.4% weighted average of standalone volatilities.",
 "That standard deviation is a model statistic, not a maximum loss, especially when future distributions are skewed or volatile. Credit risk, concentration, inflation, currency, fees and the possibility that correlated risks rise simultaneously must still be assessed."
 ],
 [["Stock and bond modeled volatilities","20% and 6%"],["Assumed correlation and weights","0.20; 60%/40%"],["Illustrative portfolio standard deviation","√0.016128 ≈ 12.70%"]],
 "Correlation is estimated from past observations and is not fixed; crisis periods can undermine expected diversification.",
 "Explain how holding two funds with nearly identical stocks can produce weak diversification despite different fund names.",
 [["Correlation","Statistic indicating co-movement of two return series, between −1 and +1."],["Portfolio variance","Expected squared deviation of portfolio returns, incorporating asset weights and covariance."]],
 [Q("Which pair generally offers greater diversification potential?",["Assets correlated +1.0","Assets correlated +0.2","Two identical index funds","One stock held in two accounts"],1,"Lower correlation can reduce combined variability, subject to other exposures."),
  Q("What is the main limitation of historical correlation estimates?",["They are guaranteed by contract","They never change","They can change in new conditions","They eliminate interest-rate risk"],2,"Future correlations can differ markedly from sample history.")],
 ["Quant analyst","Use transparent estimates and scenario tests; standard deviation alone cannot capture all tail, liquidity or sequence risks.","CFA Institute · Portfolio Construction",cfa]),
 P("Rebalancing and disciplined implementation",
 "Rebalancing restores an intended risk mix after prices change; it is not a guarantee that selling winners beats holding them.",
 [
 "Suppose a $10,000 portfolio starts with $6,000 stocks and $4,000 bonds, targeting 60%/40%. If stocks rise 40% and bonds are unchanged, the total becomes $12,400 with stocks worth $8,400, or about 67.7% of assets. To restore 60% stocks, the target stock balance is $7,440; approximately $960 would be shifted away from stocks into bonds.",
 "Rebalancing can be scheduled by time or by allocation thresholds. Contributions and withdrawals may help correct drift without selling, potentially lowering transaction costs and taxable gains. It is a risk-control process rather than a method for timing the market.",
 "Taxes, trading fees, employer account restrictions and bid-ask spreads make frequent rebalancing costly. A disciplined plan specifies a threshold, why it exists, and when to review it. Avoid mechanical trades that create more costs than a modest drift justifies."
 ],
 [["Stocks after 40% gain","$8,400"],["Bonds unchanged","$4,000"],["Stock target after rebalancing","60% × $12,400 = $7,440; shift $960"]],
 "Sales in taxable accounts may realize gains; rebalance across accounts and new contributions where legally and practically appropriate.",
 "Draft a rule for rebalancing annually or if a portfolio weight drifts by five percentage points. Discuss trading costs and tax effects.",
 [["Allocation drift","Deviation of portfolio weights from their intended targets as markets move."],["Rebalancing","Trades or cash flows that restore a planned allocation."]],
 [Q("In the example, how much stock exposure should move to bonds to restore 60/40?",["$0","$480","$960","$2,400"],2,"Current stock $8,400 minus target $7,440 is $960."),
  Q("One advantage of rebalancing with new contributions is:",["Guaranteed extra returns","It may reduce taxable sales and trading costs","It eliminates price risk","It prevents all drawdowns"],1,"Cash inflows can shift weights toward underweighted assets without realizing existing gains.")],
 ["Portfolio operations","Prefer a written process that specifies target ranges, contribution treatment, fees, taxes and who authorizes departures from policy.","CFA Institute · Portfolio Management",cfa]),
 P("Build an investment policy statement",
 "A written investment policy converts vague hopes into enforceable decision rules before markets become emotional.",
 [
 "An investment policy statement (IPS) records objectives, risk constraints, horizons, required liquidity, tax considerations, permitted investments, target allocations and review rules. Even an individual beginner benefits from a one-page version; the purpose is to avoid improvising a new strategy during a market decline.",
 "Separate savings targets from market forecasts. If a learner can contribute $300 per month, the guaranteed input is the contribution only if income actually supports it. The investment outcome depends on returns and costs. The cash emergency bucket should not rely on projected stock gains or borrowing against a policy to fund bills.",
 "Review the IPS when circumstances change materially, such as income instability, a new mortgage, care obligations or a shorter home-purchase horizon. Do not overhaul it merely because the latest financial news is frightening or one stock surged last week."
 ],
 [["Example monthly planned contribution","$300"],["Illustrative twelve-month contributions","$3,600, if actually funded"],["Investment return for future value","Unknown; model scenarios rather than promises"]],
 "An IPS does not replace a realistic budget; contributions that repeatedly require new debt are not sustainable investing.",
 "Write an IPS containing two goals, two risk constraints, a proposed mix, a rebalance trigger and one reason you would revise the plan.",
 [["Investment policy statement","Document setting investment objectives, constraints, governance and review process."],["Risk budget","Degree and kind of risk a strategy can take while still meeting its objectives."]],
 [Q("An investment policy should contain:",["Only hot-stock predictions","Goals, risk constraints, allocation and review rules","A guaranteed return schedule","A ban on all future revisions"],1,"IPS documents the strategy and its conditions."),
  Q("When should a long-term IPS most clearly be reviewed?",["Every time prices dip 1%","When a major household goal or financial constraint changes","Whenever a stranger recommends a stock","Only on an arbitrary fixed birthday"],1,"Material changes to goals or capacity are reasons for policy review.")],
 ["Fiduciary mindset","A suitable portfolio is one a household can live with, finance and maintain under adverse scenarios—not simply the one with the highest forecast CAGR.","SEC Investor.gov · Investing basics",sec])
 ],
 caseStudy:{title:"Connecticut home fund versus long-term wealth",
 scenario:"A household can set aside $300 per month, has inconsistent monthly cash buffers, is considering a home purchase in two years and also wishes to start retirement investing. It has $4,000 accessible cash and $2,000 revolving debt. Build separate liquidity and long-horizon buckets rather than placing every dollar in one stock portfolio.",
 steps:[["Potential annual savings","$300 × 12 = $3,600 if sustained"],["Home horizon","About 24 months: principal and liquidity dominate"],["Retirement horizon","Longer: diversified market exposure can be considered"],["Cash and debt constraints","Verify emergency buffer and borrowing costs before investing aggressively"]],
 decision:"Produce a one-page proposed investment policy including reserve targets, cash flow assumptions, candidate allocation ranges, and the criteria for reconsidering the plan if income or home timing changes."},
 finalChecks:[
 Q("A 60/40 portfolio has stocks down 30% and bonds up 5%. The total period return is:",["−16%","−30%","+5%","−12%"],0,"Weighted return equals −18% plus 2% = −16%."),
 Q("Which best represents risk capacity?",["Enjoying volatile price charts","Ability to absorb financial losses without missing objectives","Following a favorite analyst","Remembering last year's market gains"],1,"Capacity refers to financial consequences, not emotions."),
 Q("Why do allocation targets need periodic review?",["Because asset weights and life conditions change","To guarantee a profit each quarter","To avoid ever holding cash","Because every fund is identical"],0,"Market drift and changing obligations can alter portfolio suitability.")
 ]
});
})();
