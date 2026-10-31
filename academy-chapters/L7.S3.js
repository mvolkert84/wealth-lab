/* Wealth Lab Academy · Textbook expansion: L7.S3 · Time Value of Money */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>
({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const src="https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam";
WealthLabRegisterDeepChapter({
 id:"L7.S3",title:"The Time Value of Money: Discounting, Compounding, Annuities and NPV",
 sources:[src,"https://www.investor.gov/introduction-investing","https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/"],
 parts:[
 P("Why a dollar today differs from a dollar tomorrow",
 "Time has a financial price: cash available sooner can be saved, invested, used to avoid debt or kept as protection.",
 [
 "Receiving $1,000 today and receiving $1,000 a year from now are not economically identical. Money in hand offers the option to earn interest, pay an expensive bill, or remain available for an emergency. Delaying a payment also introduces inflation, counterparty risk and uncertainty about what the money will buy.",
 "Present value turns a future cash amount into an equivalent amount today using an assumed discount rate. For one year, present value equals future value divided by one plus the rate. A $1,000 payment due next year discounted at 5% has a present value of about $952.38. It is a valuation model, not a promise that 5% is available.",
 "A discount rate should reflect the decision: a risk-free benchmark is inappropriate when the payer may default. Higher required returns produce lower present values, while lower required returns produce higher values. This connects personal financial choices to mortgages, bonds, business valuation and retirement planning."
 ],
 [["Future payment in one year","$1,000"],["Assumed annual discount rate","5%"],["Present value","$1,000 ÷ 1.05 = $952.38"]],
 "Do not confuse a hypothetical discount rate with an investment's guaranteed return; risk and timing determine what rate is reasonable.",
 "Choose between $950 today and $1,000 next year. Explain how your access to cash, borrowing costs and uncertainty could alter the answer.",
 [["Present value","Value today of money arriving later, discounted at a selected rate."],["Discount rate","Required rate used to translate future cash flows into today's dollars."]],
 [Q("At a 5% annual discount rate, about how much is $1,000 due in one year worth today?",["$1,050","$1,000","$952.38","$900"],2,"Divide $1,000 by 1.05."),
  Q("What usually happens to a fixed future payment's present value when the discount rate rises?",["It rises","It falls","It never changes","It becomes a liability"],1,"A larger discount factor reduces today's equivalent value.")],
 ["Analyst method","Match the discount rate to the risk, currency and timing of the cash flow. Comparing raw amounts at different dates creates false bargains.","CFA Institute · Quantitative Methods",src]),
 P("Compounding: growth on prior growth",
 "Compounding rewards time but amplifies assumed rates; more years can matter more than a slightly larger deposit.",
 [
 "With compound interest, earnings remain invested and can themselves produce earnings in future periods. The future-value formula for one initial deposit is principal multiplied by one plus the rate to the number of compounding periods. In a savings account the quoted terms matter; in equities the rate is uncertain and annual results can vary wildly.",
 "For an illustrative $5,000 invested for ten years with an exactly constant 6% annual return, future value is $5,000 × 1.06 to the tenth power, or roughly $8,954.24. Only $3,954.24 of this is modeled growth. No fees, taxes or inflation are included, and an investment earning 6% on average is not guaranteed to follow this smooth path.",
 "Compounding also works against borrowers. If debt interest is added to a balance and not paid, future interest can be charged on prior interest. Comparing the compounding rules of a savings product, a loan and an investment makes the actual economic trade-off visible."
 ],
 [["Starting principal","$5,000"],["Modeled annual return and horizon","6% × 10 years"],["Modeled ending value","$8,954.24"]],
 "Average arithmetic returns and compound annual growth rates are different, especially when there are losses between good years.",
 "Recalculate the $5,000 example with 3% and 9% assumptions. Explain why range-based planning is safer than assuming one fixed investment return.",
 [["Future value","Amount an investment would grow to under given rate and timing assumptions."],["Compounding period","Time interval after which growth is credited or measured."]],
 [Q("Which formula describes annual compounding on one deposit?",["Principal × rate × years","Principal × (1 + rate)^years","Principal ÷ years","Rate ÷ principal"],1,"Future value multiplies principal by the growth factor for each period."),
  Q("What is excluded from a simple constant-return projection?",["The time horizon","The initial deposit","Actual market volatility, fees and taxes","The stated modeled rate"],2,"Smooth projections are learning tools, not realistic market paths.")],
 ["Risk analyst","Run lower and negative-return scenarios alongside optimistic projections. A single attractive future value is not a risk analysis.","SEC Investor.gov · Introduction to Investing","https://www.investor.gov/introduction-investing"]),
 P("Annuities: adding money repeatedly",
 "A recurring payment creates a different growth pattern from one lump sum; contribution timing and rate frequency matter.",
 [
 "An ordinary annuity is a sequence of equal payments made at the end of each period. It is a mathematical cash-flow pattern, not necessarily an insurance product. The future value of monthly deposits uses the monthly rate and the number of monthly payments. Deposits at the beginning of each month create an annuity due, which grows slightly more because each deposit is invested sooner.",
 "Suppose $250 is deposited at the end of every month for ten years and the modeled annual rate is 6% compounded monthly. The monthly rate is 0.5%; after 120 payments the future value is about $40,969.84. Total cash contributed is $30,000. Roughly $10,969.84 is hypothetical growth before fees, taxes and inflation.",
 "For a real household, the contribution schedule must survive rent, groceries, emergencies and possible income interruptions. Automatic investing can help consistency, but a model is useful only if the contribution is affordable across a full financial year—not simply on the day a paycheck arrives."
 ],
 [["Monthly contribution","$250 × 120 = $30,000"],["Assumed monthly growth rate","6% ÷ 12 = 0.5%"],["Illustrative future value","$40,969.84"]],
 "An annuity calculation assumes equal payments and a steady rate. Investments rarely deliver perfectly stable monthly returns.",
 "Compare $250 a month for ten years with investing $30,000 on day one. Which has more time in the market, and what liquidity sacrifice does that comparison hide?",
 [["Ordinary annuity","Equal payments at the end of each interval."],["Annuity due","Equal payments at the beginning of each interval."]],
 [Q("Ten years of $250 monthly deposits adds up to how much contributed?",["$3,000","$25,000","$30,000","$40,000"],2,"$250 × 12 × 10 = $30,000 before investment growth."),
  Q("Why is an annuity-due value generally higher than an otherwise identical ordinary annuity?",["Payments are larger","Payments occur earlier","The interest rate is automatically higher","There are no fees"],1,"Each beginning-of-period payment has an additional period to grow.")],
 ["Financial planner","Model real contribution dates, paycheck timing and emergency reserves before using an annuity formula as a savings target.","CFPB · Your Money Your Goals","https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/"]),
 P("Discounting multiple payments",
 "A series of future payments is worth the sum of each payment's present value, not merely the sum of their face values.",
 [
 "When payments arrive in different years, discount each amount separately to the same valuation date. The present value of three annual $1,200 payments discounted at 8% is the sum of $1,200/1.08, $1,200/1.08² and $1,200/1.08³, totaling approximately $3,092.52. Simply adding the future payments gives $3,600 but ignores time.",
 "The same logic underlies fixed-rate bonds, loan amortization, rental investment analysis and the discounted cash-flow model used for company valuation. Payment growth, irregular payment dates, residual value and risk can all change the outcome. When cash flows change sign, document each inflow and outflow rather than hiding them in one total.",
 "Discounting is not magic wealth creation. It is a method of comparing amounts occurring at different dates. If the assumed cash flows or required return are wrong, the present-value figure can look precise while being economically misleading."
 ],
 [["Year-one cash flow present value","$1,111.11"],["Year-two cash flow present value","$1,028.81"],["Year-three cash flow present value","$952.60; total ≈ $3,092.52"]],
 "A precise present value does not mean the payment will occur; default, vacancies and expenses may reduce future cash flows.",
 "Estimate the present value of a promised $2,000 payment in two years at 4%, then identify who bears the risk of nonpayment.",
 [["Cash-flow schedule","A dated sequence of expected inflows and outflows."],["Discounted cash flow","Valuation method summing the present values of projected cash flows."]],
 [Q("At a positive discount rate, how does the PV of $3,600 paid over future years usually compare with $3,600 today?",["Always equal","Usually less","Always greater","Impossible to calculate in any case"],1,"Positive discounting reduces the present value of later payments."),
  Q("Why discount each payment by its own number of periods?",["Later payments have been delayed longer","It makes all payments tax-free","It cancels volatility","It changes the nominal cash amount"],0,"A year-three payment is farther away than a year-one payment.")],
 ["Valuation analyst","Show the entire dated cash-flow table, assumptions and discount rate before presenting a total present value.","CFA Institute · Quantitative Methods",src]),
 P("APR, APY and inflation-adjusted return",
 "Advertised rates can use different conventions; comparing apples with apples requires an effective rate and real purchasing power.",
 [
 "A nominal annual rate with monthly compounding does not equal its effective annual yield. An account quoting a 12% nominal annual rate compounded monthly has a 1% periodic rate and an effective annual yield of about 12.68%. APY captures this compounding effect in deposit examples; loan APR generally follows product-specific disclosure rules and may include certain fees.",
 "For real return, use the exact relationship: one plus the nominal return, divided by one plus inflation, minus one. A 6% nominal gain alongside 3% inflation produces roughly 2.91% real growth. Subtracting 3% from 6% gives 3%, a useful approximation but not the exact answer.",
 "Rates also need a risk and tax context. A high-yield product may have penalties, no deposit insurance, credit risk or limits; an investment forecast is not a savings-account quote. Compare the after-tax, after-fee effective return with the relevant inflation and liquidity needs."
 ],
 [["Nominal annual rate compounded monthly","12%"],["Effective annual yield","(1.01)^12 − 1 ≈ 12.68%"],["Real gain with 6% return and 3% inflation","1.06 ÷ 1.03 − 1 ≈ 2.91%"]],
 "APR and APY have different disclosure conventions; do not mechanically treat every listed APR as an investment yield.",
 "Find two deposit product disclosures and identify how often interest compounds, withdrawal restrictions and whether the offered rate can change.",
 [["APY","Annual percentage yield that reflects the effects of deposit compounding."],["Real return","Change in purchasing power after accounting for inflation."]],
 [Q("A 12% nominal rate compounded monthly produces an effective annual rate of approximately:",["1%","12%","12.68%","24%"],2,"Monthly 1% compounding yields (1.01)^12 − 1 ≈ 12.68%."),
  Q("A 6% nominal return with 3% inflation produces an exact real gain closest to:",["9%","6%","3.00%","2.91%"],3,"(1.06 ÷ 1.03) − 1 ≈ 2.91%.")],
 ["Rate comparison","Compare effective annual rates, fees, taxes, liquidity and credit risk on the same dates instead of choosing the largest advertised percentage.","SEC Investor.gov · Investing basics","https://www.investor.gov/introduction-investing"]),
 P("Net present value and opportunity cost",
 "A project creates modeled economic value only when discounted benefits exceed what must be committed today.",
 [
 "Net present value (NPV) subtracts initial costs from the present value of all future net cash flows. Imagine paying $10,000 now for a project promising three annual payments of $4,200. At a 10% required annual return, the present value of those payments is approximately $10,444.78, so NPV is roughly positive $444.78 before any omitted costs or taxes.",
 "The positive model depends entirely on the payments arriving as expected and the 10% hurdle matching the project's risk. Delayed collections, maintenance, unplanned taxes or an exit loss can erase the apparent advantage. Compare investments using scenarios, not one convenient forecast.",
 "Opportunity cost is what you give up by choosing one use of funds over another. A household might earn a modeled return on an investment but still make a poor choice if it cannot meet near-term obligations or carries high-cost debt. A finance professional separates attractive math from affordable implementation."
 ],
 [["Initial outlay today","−$10,000"],["Present value of three $4,200 receipts at 10%","≈ $10,444.78"],["Modeled net present value","≈ +$444.78"]],
 "Positive modeled NPV does not justify borrowing against critical reserves or ignoring downside outcomes.",
 "Prepare a three-case NPV table using on-time receipts, 20% lower receipts and a one-year delay. State what could cause each case.",
 [["Net present value","Present value of future net cash flows minus the initial outlay."],["Opportunity cost","Value of the best alternative use of money, time or capacity."]],
 [Q("A project's PV of benefits is $10,445 and initial cost is $10,000. What is NPV?",["−$445","+$445","+$10,445","$0"],1,"$10,445 minus $10,000 is positive $445."),
  Q("What is the best interpretation of a positive forecast NPV?",["A guaranteed profit","A reliable market price","A conditional result under stated cash flows and discount rate","A tax exemption"],2,"The decision still depends on credible cash flows, risk and available liquidity.")],
 ["Investment committee","Present base, downside and severe downside cases; a high modeled return that fails under ordinary stress is not robust.","CFA Institute · Quantitative Methods",src])
 ],
 caseStudy:{title:"Pay down debt or invest the cash?",scenario:"A learner can apply $250 monthly to a 20% APR credit-card balance or to a diversified investment modeled at 6% a year. They also have no emergency fund. Compare effective borrowing cost, uncertain investment return, contribution timing and the need for liquid reserves before choosing.",
  steps:[["Annual card interest assumption","20% APR (balance/rules affect actual cost)"],["Illustrative investment return","6% nominal, uncertain and before costs"],["Simple annual-rate difference","20% − 6% = 14 percentage points"],["Liquidity condition","Set aside enough to avoid repeatedly borrowing for emergencies"]],
  decision:"Explain why the investment's uncertain 6% projection cannot be compared as if it were guaranteed against the card's contractual borrowing cost. Draft a practical order of operations and describe what changes if an employer retirement match is available."},
 finalChecks:[
  Q("What is the FV of $1,000 at a fixed annual 10% after two years?",["$1,100","$1,200","$1,210","$1,020"],2,"$1,000 × 1.1² = $1,210."),
  Q("Which assumption changes discounted value without changing the stated future payment?",["The discount rate","The spelling of the asset name","The number of decimal places in a report","A past unrelated purchase"],0,"Present value changes when the required return or timing changes."),
  Q("Which project is most likely to require rejection despite a positive spreadsheet NPV?",["One with reliable inflows and affordable costs","One that relies on uncertain cash to pay next week's essentials","One with documented fees","One showing alternative cases"],1,"Affordability and downside risk matter; the spreadsheet outcome is not sufficient.")
 ]
});
})();
