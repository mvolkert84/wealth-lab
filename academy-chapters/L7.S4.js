/* Wealth Lab Academy · Deep textbook L7.S4 · Economics and indicators */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const bls="https://www.bls.gov/cpi/",bea="https://www.bea.gov/data/gdp/gross-domestic-product";
const fred="https://fred.stlouisfed.org/",jobs="https://www.bls.gov/news.release/empsit.toc.htm";
WealthLabRegisterDeepChapter({id:"L7.S4",title:"Economic Indicators and Business Cycles: Reading Data Without False Certainty",
 sources:[bls,bea,jobs,fred],
 parts:[
 P("Measure the economy instead of guessing its direction",
 "An economic indicator captures a defined aspect of the economy, usually imperfectly and subject to future revision.",
 [
 "Gross domestic product estimates the value of final goods and services produced in an economy. Inflation indices measure price changes; payroll and unemployment reports describe different dimensions of the labor market. These statistics answer separate questions, so using just one headline to predict household prosperity is a mistake.",
 "Economists distinguish a level from a growth rate and nominal values from inflation-adjusted real values. If nominal GDP rises from $1,000 billion to $1,060 billion while the price level rises 3%, approximate real growth is 1.06/1.03 minus one, or about 2.91%. The dollar increase alone exaggerates the gain in actual production.",
 "Each release has a publication date, a measurement window, seasonal adjustments, sampling methods and later revisions. When comparing policy or market outcomes, verify that the data were actually available at the date of the decision instead of treating revised information as foresight."
 ],
 [["Nominal GDP index change","1,000 → 1,060 = +6%"],["Illustrative price-level change","+3%"],["Exact real growth","1.06 ÷ 1.03 − 1 ≈ 2.91%"]],
 "GDP and income measures may later be revised; avoid describing a single preliminary estimate as exact or permanent.",
 "Choose an official monthly or quarterly release and record its observation period, publication date and whether it is seasonally adjusted.",
 [["GDP","Value of final goods and services produced domestically during a period."],["Real GDP","GDP adjusted for changes in prices."]],
 [Q("Nominal GDP grows 6% and prices rise 3%. Approximate exact real growth is:",["9%","6%","3.00%","2.91%"],3,"1.06 ÷ 1.03 − 1 ≈ 2.91%."),
 Q("Which feature makes an initial economic release uncertain?",["It uses numbers","Estimates can be revised and sampling has limitations","It has a publication date","It is issued by a statistical agency"],1,"Initial economic data are estimates and can change.")],
 ["Economic researcher","Keep a data-vintage log when testing a forecast. Later revisions are not information someone possessed at the original decision date.","BEA · GDP data",bea]),
 P("Inflation: price indices and personal experience",
 "The consumer price index tracks a defined basket and cannot reproduce every household's exact cost increase.",
 [
 "The Consumer Price Index measures change over time in prices paid for a representative basket of consumer goods and services. Headline CPI includes food and energy; core CPI excludes those categories to reveal some underlying patterns. Neither is an exact measure of the cost structure faced by one particular family.",
 "Suppose a household spends $1,500 on housing, $500 on groceries and $300 on transportation. If these costs rise by 4%, 2% and 10% respectively, annualized increases on the given monthly base would be $60, $10 and $30 per month. The household's monthly inflation pressure is $100 on $2,300, or about 4.35%, under this deliberately limited basket.",
 "Economists may use seasonally adjusted month-over-month changes or unadjusted year-over-year comparisons; mixing these can create a false trend. Also distinguish disinflation, meaning prices rise more slowly, from deflation, meaning the general price level falls."
 ],
 [["Monthly basket before changes","$1,500 + $500 + $300 = $2,300"],["Combined monthly cost increase","$60 + $10 + $30 = $100"],["Basket-specific inflation","$100 ÷ $2,300 ≈ 4.35%"]],
 "An average inflation figure need not match a family with unusually high rent, medical expenses or transportation costs.",
 "Build a five-category personal expense basket, calculate actual price changes and compare with the published CPI measurement.",
 [["Disinflation","A decline in the rate of inflation while prices may continue rising."],["Core inflation","Inflation measure excluding selected volatile categories such as food and energy."]],
 [Q("A $2,300 monthly basket rises by $100. Its specific inflation rate is:",["2.3%","4.35%","10%","$100%"],1,"100 / 2,300 ≈ 4.35%."),
 Q("Disinflation means:",["Prices must be falling","Inflation is slowing, even if prices rise","The currency disappears","Wages are necessarily declining"],1,"A lower positive inflation rate still implies rising prices.")],
 ["Household economist","Show a personal spending inflation estimate beside official CPI; both offer information, but they answer different questions.","BLS · Consumer Price Index",bls]),
 P("Employment: the same labor market seen through different lenses",
 "Payroll growth, unemployment, participation and wage growth describe overlapping but nonidentical realities.",
 [
 "The unemployment rate counts people without jobs who are actively seeking and available for work under the survey definition. Labor-force participation looks at people employed or seeking work relative to the civilian noninstitutional population. Payroll job counts use another survey and may count more than one job held by a worker.",
 "If 95 people are employed, five are unemployed and ten additional adults are outside the labor force, unemployment is five divided by the 100-person labor force, or 5%. Participation is the 100-person labor force divided by 110, or about 90.9%. These fictional counts demonstrate why falling unemployment does not necessarily imply everyone found work.",
 "Nominal wage growth must be compared with inflation to understand purchasing power. A 3% nominal raise alongside a 5% price increase is approximately a 1.90% real wage decline using the exact ratio 1.03/1.05 minus one. Regional and industry conditions can differ sharply from national averages."
 ],
 [["Employed / unemployed / outside labor force","95 / 5 / 10"],["Unemployment rate","5 ÷ (95 + 5) = 5%"],["Labor-force participation","100 ÷ 110 ≈ 90.9%"]],
 "Job growth and labor-force participation are not direct proxies for household take-home pay or job security.",
 "Explain how a lower unemployment rate could coincide with lower participation and why that distinction matters for workers.",
 [["Labor force","Employed individuals plus unemployed people actively seeking work under survey rules."],["Participation rate","Labor force divided by the relevant civilian population."]],
 [Q("Five unemployed out of a labor force of 100 implies unemployment of:",["5%","10%","95%","50%"],0,"Five divided by 100 equals 5%."),
 Q("Employment and payroll counts are identical across all methods:",["True","False","Only after inflation","Only during recessions"],1,"They come from different samples and definitions.")],
 ["Labor-market analyst","Use multiple indicators and revisions; never equate one national headline with the conditions of a particular industry or town.","BLS · Employment Situation",jobs]),
 P("Leading, coincident and lagging indicators",
 "Some indicators help frame what may come next, but no single series reliably predicts every turning point.",
 [
 "Analysts distinguish leading indicators that may move before broad activity, coincident measures that track activity and lagging series that move after conditions change. Examples can include new orders, production and past-due credit payments. The classifications are simplified; the timing varies by episode.",
 "Imagine new orders dropping 10% while production has not yet changed and unemployment remains low. This may signal softer future demand, but companies could be drawing down inventories or responding to a temporary seasonal change. Inferring a recession from one month's new-orders data is premature.",
 "A probability-based forecast should combine signals with their history, uncertainty and alternative explanations. Confirmation bias can lead observers to emphasize only the data that support a preferred stock or political outlook. Maintain a forecast log and compare predictions with what actually happened."
 ],
 [["Illustrative new orders","100 → 90 = −10%"],["Current production reading","No change in hypothetical example"],["Unemployment","Not yet changed; no guaranteed future outcome"]],
 "Leading does not mean certain: false alarms and changing economic relationships are common.",
 "Choose three indicators and describe a coherent growth, inflation and credit scenario under which they would give conflicting signals.",
 [["Leading indicator","Metric that can move before broader activity under some conditions."],["Forecast revision","Change to an outlook when evidence or model assumptions change."]],
 [Q("A new-orders index falls from 100 to 90. Change is:",["−10%","+10%","−90%","+90%"],0,"(90 − 100)/100 = −10%."),
 Q("An isolated weak leading indicator guarantees a recession:",["True","False","Only after a rate cut","Only for bonds"],1,"It is one imperfect signal and may reverse.")],
 ["Macro strategist","Use scenario probabilities and record evidence against your base case, not just confirmations.","FRED · Economic data series",fred]),
 P("Economic cycles, investment outcomes and timing risk",
 "Expansion and contraction affect earnings, credit and risk appetite, but markets often anticipate changes before they appear in official data.",
 [
 "A business cycle describes broad changes in production, employment, income and other activity. Stock prices reflect expected future profits and required returns, not just today's GDP. A market may recover while economic headlines are still poor, or fall during an apparently strong economy because expectations change.",
 "Suppose an investor deposits $10,000 and loses 25%, leaving $7,500. Recovering to the original balance requires a gain of $2,500 on $7,500, or 33.33%, not 25%. This asymmetric recovery math makes short-term market timing and forced selling especially dangerous for near-term cash needs.",
 "A diversified long-horizon plan may be more robust than repeated bets on recession predictions, though risk is never eliminated. The practical defense is to separate money required for upcoming obligations from assets exposed to business-cycle volatility."
 ],
 [["Initial investment","$10,000"],["After a 25% loss","$7,500"],["Gain required to recover","$2,500 ÷ $7,500 ≈ 33.33%"]],
 "Forecasting the cycle correctly does not guarantee trading profits, because prices may already reflect the forecast.",
 "Describe why the same recession prediction could favor cash for a house fund but not necessarily an immediate full liquidation of retirement investments.",
 [["Business cycle","Fluctuation of overall economic activity around longer-term trends."],["Recovery return","Percentage gain needed to recoup a prior decline from a reduced base."]],
 [Q("Following a 25% portfolio decline, what percentage gain recovers the original value?",["25%","33.33%","50%","75%"],1,"One divided by 0.75 minus one ≈ 33.33%."),
 Q("Why might stocks rise despite weak current GDP?",["Stock prices always follow today's GDP exactly","Investors may anticipate improving future conditions","GDP is irrelevant to all companies","Shares have guaranteed prices"],1,"Markets discount expectations about the future.")],
 ["Portfolio strategist","Do not confuse macroeconomic insight with a reliable short-term market-timing strategy.","FRED · Economic data",fred]),
 P("Create a balanced economic briefing",
 "A financial analyst should explain what the indicators mean, what remains unknown and which real decisions they inform.",
 [
 "A disciplined economic brief combines a small set of indicators with units, dates, source and methods. It should identify which series describe prices, activity, employment, credit and financial conditions, and separate observed releases from opinions about future outcomes.",
 "Consider a household whose wages rise 2% while a personal cost basket rises 5%. Exact real purchasing power changes by 1.02/1.05 minus one, or about minus 2.86%. That matters to a practical savings plan more directly than an abstract statement that national output rose last quarter.",
 "For investing, describe plausible scenarios rather than one precise economic target. A good memo might compare the effects of persistently high inflation, slower growth and stable conditions on variable debt, fixed bonds, diversified equities and a future down payment, documenting where results are uncertain."
 ],
 [["Illustrative nominal pay increase","+2%"],["Illustrative personal costs increase","+5%"],["Real purchasing-power change","1.02 ÷ 1.05 − 1 ≈ −2.86%"]],
 "Do not use old inflation or labor statistics without publication dates, and never present a forecast as a reported fact.",
 "Write a 250-word economic briefing using two BLS series and one BEA series. Give the source, observation date, uncertainty and household implications.",
 [["Data vintage","The set of reported values available at a specific historical time."],["Scenario analysis","Comparison of outcomes under multiple plausible sets of assumptions."]],
 [Q("Wages grow 2% while prices rise 5%. Exact real wage growth is closest to:",["+7%","+3%","−2.86%","+2%"],2,"1.02/1.05 − 1 = −0.02857."),
 Q("A good economic briefing should separate:",["Observed data from forecasts","Federal data from all math","Bank deposits from money","All stock markets from earnings"],0,"Source dates and assumptions make an analysis reproducible.")],
 ["Research supervisor","Use official data releases with dates and definitions, explain revisions and document every modeled assumption.","BEA · GDP",bea])
 ],
 caseStudy:{title:"A household facing higher prices and uncertain growth",
 scenario:"A Connecticut family has nominal income up 2% over the year while its own expense basket grew 5%. It is also saving for a home and holds a volatile investment account. The economy shows mixed payroll, inflation and GDP signals. Construct a household and investment response that does not depend on predicting next quarter's recession.",
 steps:[["Nominal income change","+2%"],["Personal expense inflation","+5%"],["Approximate real income pressure","1.02/1.05 − 1 ≈ −2.86%"],["Risk-management priority","Protect near-term obligations; diversify long-term exposure"]],
 decision:"Write a dated memo documenting the difference between observed inflation, personal costs, and a forecast; include a cash-flow adjustment and a reason not to sell all investments based on one headline."},
 finalChecks:[
 Q("Nominal GDP grows 6% while overall prices rise 3%. Exact real growth is about:",["2.91%","6%","9%","−3%"],0,"Divide 1.06 by 1.03 and subtract one."),
 Q("Which best describes disinflation?",["Prices rising more slowly","Prices always falling","Wages falling","Interest rates fixed at zero"],0,"The inflation rate declines, possibly remaining above zero."),
 Q("Why does a finance researcher record observation dates and data vintages?",["For decorative charts","Because later revisions were not known at the forecast date","To guarantee a recession forecast","Because source methods never change"],1,"Information available at decision time differs from later revisions.")
 ]
});
})();
