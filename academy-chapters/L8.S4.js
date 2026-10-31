/* Wealth Lab Academy · Deep textbook L8.S4 · Dividends, Buybacks and Returns */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const sec="https://www.investor.gov/introduction-investing",edgar="https://www.sec.gov/edgar/search/",fund="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/fund-distributions-investor-bulletin";
WealthLabRegisterDeepChapter({id:"L8.S4",title:"Dividends, Buybacks and Shareholder Return: Measuring the Full Outcome",
 sources:[sec,edgar,fund],
 parts:[
 P("Total shareholder return combines price and cash",
 "An investor earns or loses money through both changes in market price and cash distributions, not through price alone.",
 [
 "Dividend income is a distribution from company resources under the terms established by its board and applicable legal restrictions. Common-stock dividends are discretionary; they can be lowered, suspended or never paid. A share's quoted price does not account for every payment received over the holding period.",
 "Suppose an investor pays $100 per share, receives $3 in dividends during the year and sells at $105. The simple holding-period total return is ($105 − $100 + $3) / $100, or 8%, ignoring trading fees and taxes. Counting the price move alone would give 5%, understating that year's economic outcome.",
 "Timing matters when cash flows occur during a measurement period. Reinvested dividends buy additional shares at changing prices, so longer-horizon time-weighted returns and investor cash-flow returns can differ. Use the right return method and specify whether returns are gross or net of fees and taxes."
 ],
 [["Beginning share price","$100"],["Ending price and cash dividend","$105 + $3"],["Simple holding-period return","($105 − $100 + $3) ÷ $100 = 8%"]],
 "A dividend does not constitute free money on top of unchanged company value; ex-dividend prices often adjust for the distribution.",
 "Calculate the one-year return of a $50 share that ends at $47 and pays a $2 dividend, including the sign of the total return.",
 [["Total shareholder return","Change in share value plus distributions, expressed relative to investment cost."],["Holding-period return","Return measured across a specified ownership interval."]],
 [Q("$100 share rises to $105 and pays $3. Simple total return equals:",["3%","5%","8%","108%"],2,"(105 − 100 + 3)/100 = 8%."),
 Q("If a dividend-paying stock's price falls, investment return is necessarily positive:",["True","False","Only for large firms","Only if reinvested"],1,"Cash received may be smaller than the capital loss.")],
 ["Equity performance","Include capital gain, dividends, exact dates, taxes and costs in every shareholder-return comparison.","SEC Investor.gov · Investing basics",sec]),
 P("Dividend yield versus sustainable distribution",
 "A high quoted yield can reflect both strong cash payouts and deteriorating market expectations.",
 [
 "Dividend yield divides annualized per-share distributions by the current price. If a stock pays $2 a year and trades at $40, the yield is 5%. The ratio can increase because the dividend rose, or simply because the stock price collapsed; those stories have different investment implications.",
 "Dividend payout ratio often compares cash dividends to accounting earnings. Free-cash-flow coverage provides another perspective because accounting profits need not be available cash. A company paying $120 million in dividends from $100 million of sustainable annual free cash flow may have to borrow, draw reserves or reduce the payment.",
 "Management can choose dividends for mature businesses with limited attractive reinvestment opportunities; rapidly growing firms may retain cash instead. Neither choice automatically makes a stock superior. Compare expected cash flow, capital needs, debt and the shareholder's own tax and liquidity circumstances."
 ],
 [["Annual dividend per share","$2"],["Current share price","$40"],["Current indicated dividend yield","$2 ÷ $40 = 5%"]],
 "A quoted dividend yield derived from past payments is not a promise of future distributions.",
 "Compare two businesses with a 6% indicated yield, one funding dividends from free cash flow and one borrowing to keep payments unchanged.",
 [["Dividend yield","Annualized cash dividends divided by market price."],["Payout ratio","Distributions as a fraction of defined earnings or cash flow."]],
 [Q("A $2 annual dividend on a $40 stock represents a yield of:",["2%","5%","20%","50%"],1,"$2/$40 = 5%."),
 Q("Why may a rapidly rising dividend yield be a warning?",["The share price may have fallen sharply","A higher yield guarantees growth","All cash payouts are insured","Companies must pay dividends"],0,"A collapsing share price can mechanically raise the indicated yield.")],
 ["Cash-flow analyst","Assess coverage with normalized cash generation, capital expenditures, debt maturities and payout commitments.","SEC EDGAR · Annual reports",edgar]),
 P("Share repurchases, dilution and per-share economics",
 "A company repurchase can reduce shares outstanding, but only if net issuance and the price paid are considered.",
 [
 "A buyback uses corporate cash to acquire shares, potentially lowering outstanding shares and increasing existing owners' percentage claims. When a company has valuable reinvestment projects, spending cash on buybacks has an opportunity cost. Repurchases at excessive prices can destroy value despite increasing earnings per share.",
 "Suppose a business has $100 million net income and 20 million shares, producing $5 EPS. If it repurchases two million shares, leaves income unchanged and uses the smaller 18 million denominator, simplified EPS rises to about $5.56. This mechanical increase does not prove the firm produced more profit or improved return on invested capital.",
 "Employee stock grants, new financing, option exercises and convertible securities may offset shares purchased. Evaluate net diluted share-count change over several years alongside repurchase price, corporate debt, cash balances and management's stated capital-allocation strategy."
 ],
 [["Net earnings held constant","$100 million"],["Before repurchase diluted shares","20m; EPS $5"],["After net 2m share reduction","18m; simplified EPS ≈ $5.56"]],
 "A buyback financed with expensive borrowing may increase EPS while worsening balance-sheet risk.",
 "Analyze a company whose share count fell 5% while debt rose 25%. Decide which additional data are needed to judge the repurchase.",
 [["Share repurchase","Company acquisition of its outstanding stock."],["Net dilution","Change in fully diluted shares after issuance and buybacks."]],
 [Q("$100m income over 18m shares yields EPS closest to:",["$5.00","$5.56","$18.00","$100.00"],1,"100/18 ≈ $5.56."),
 Q("Buybacks automatically produce more company-wide operating profit:",["True","False","Only when paid in cash","Only under a special dividend"],1,"Share count can fall while aggregate earnings remain unchanged.")],
 ["Capital allocation","Track diluted share count and buyback prices against alternative uses of company cash.","SEC EDGAR · Repurchase disclosures",edgar]),
 P("Reinvestment and return on capital",
 "The key economic question is how effectively retained cash can be reinvested rather than distributed.",
 [
 "Companies allocate generated cash among operating investment, debt reduction, acquisitions, dividends and buybacks. Return on invested capital attempts to assess operating profit relative to invested resources. A business earning a high incremental return on credible expansion may create more value by retaining cash than distributing it immediately.",
 "If a company invests an additional $10 million and generates $1.5 million recurring after-tax operating profit, its simple incremental return is 15%. That return should be compared with risk, required cost of capital, reinvestment needs and whether the gain can be sustained without crowding out other obligations.",
 "Investors should not confuse accounting EPS growth with wealth creation. Management can increase EPS by shrinking the denominator, but capital used in buybacks may have higher-value alternatives. Build a decision tree comparing project NPV, debt, repurchase valuation and after-tax distribution effects."
 ],
 [["Additional business investment","$10 million"],["Illustrative incremental annual operating profit after tax","$1.5 million"],["Simple incremental return","$1.5m ÷ $10m = 15%"]],
 "Simple after-tax operating return omits duration, risk and cost-of-capital assumptions; it is not by itself a project NPV.",
 "Compare spending $10 million on debt reduction, a 15% investment project, or buybacks at an assumed high valuation.",
 [["ROIC","Return on invested capital, defined using consistent operating-profit and invested-capital measures."],["Cost of capital","Required return demanded by providers of debt and equity financing."]],
 [Q("$1.5m after-tax incremental operating profit from $10m investment implies simple return:",["1.5%","10%","15%","150%"],2,"1.5/10 = 0.15 = 15%."),
 Q("What makes a buyback potentially poor capital allocation?",["Shares are purchased at excessive value relative to alternatives","The company reports its actions","It has a prospectus","The share count changes"],0,"Overpayment or better foregone projects can destroy economic value.")],
 ["Corporate finance","Compare credible project NPVs and long-run capital needs before treating buybacks as evidence of management quality.","SEC Investor.gov · Equities",sec]),
 P("Fund distributions, tax location and reinvestment",
 "Dividend handling matters to cash flow, but reinvestment changes holdings rather than creating a free extra return.",
 [
 "Mutual funds and ETFs may distribute dividends, interest or realized gains. Different distribution types have different possible US tax treatment, and investors can sometimes elect automatic reinvestment. Reinvestment purchases fund shares using distribution cash instead of delivering it to an external account.",
 "Suppose a fund distributes $100 when each reinvested share costs $25. Automatic reinvestment buys four additional shares before any fees or fractional-share conventions. The value of the original holding ordinarily adjusts for the distribution, so the investor did not receive an unexplained $100 gain.",
 "A learner needing cash to pay bills may prefer taking distributions as cash, while another saving long term may prefer reinvestment for convenience. Tax-efficient location and qualified-dividend rules should be analyzed based on the specific fund, holding period and account rather than a generic claim that every dividend is taxed equally."
 ],
 [["Illustrative distribution","$100"],["Reinvestment share price","$25"],["Additional shares purchased","$100 ÷ $25 = 4"]],
 "Reinvested distributions in taxable accounts can still create reportable income even if cash never reaches checking.",
 "Compare cash distribution and reinvestment for a near-term house saver and a long-term retirement investor, considering timing and taxes.",
 [["Reinvestment","Using distributed cash to acquire more fund or company shares."],["Qualified dividend","Dividend meeting applicable US tax and holding-period conditions for specific rates."]],
 [Q("$100 reinvested at $25/share purchases:",["1 share","2 shares","4 shares","25 shares"],2,"100/25 = 4 shares."),
 Q("Automatic reinvestment in a taxable account always avoids tax on distributions:",["True","False","Only in December","Only for ETFs"],1,"Tax may arise even when distributions buy additional shares.")],
 ["Tax-aware investing","Review a fund's distribution policy and account type instead of optimizing solely for a high headline yield.","SEC Investor Bulletin · Fund Distributions",fund]),
 P("Construct a shareholder return and payout memo",
 "Evaluating distributions requires shareholder returns, cash coverage, balance-sheet condition and opportunity costs together.",
 [
 "A professional review should start with a clean timeline of share purchases, prices, dividends and repurchases. Calculate actual investor holding-period outcomes and distinguish those from company-wide operating returns or management's statements about shareholder value.",
 "If a $100 stock declines to $92 and pays $4 over a year, simple total return is negative 4%. A yield-hunting investor reporting only the 4% payout ignores the $8 share-price loss. If the investor sells, taxes and trading costs may affect the realized outcome further.",
 "Write a short capital-allocation assessment documenting recurring cash generation, debt, investments, payouts, diluted shares and governance incentives. Describe what would make an attractive dividend or buyback policy unsustainable before investing concentrated household money."
 ],
 [["Beginning price","$100"],["Ending price and cash payout","$92 + $4"],["Simple total return","($92 − $100 + $4)/$100 = −4%"]],
 "A dividend policy is neither a guarantee of capital preservation nor a substitute for a comprehensive return calculation.",
 "Write a one-page comparison of a company reinvesting most earnings versus a mature business distributing most cash; explain each plausible advantage and risk.",
 [["Capital-allocation policy","Management's approach to choosing uses of internal and externally raised capital."],["Shareholder yield","A measure combining selected payouts such as dividends and net repurchases, subject to definition."]],
 [Q("Stock bought at $100, sold at $92 and paid $4 dividends: simple return equals:",["+4%","−4%","−8%","+8%"],1,"(92 − 100 + 4)/100 = −4%."),
 Q("A strong dividend research memo should include:",["Only yield","Cash-flow coverage, debt, price and total return","Only quarterly headlines","A guarantee of distributions"],1,"Sustainability depends on company cash and obligations.")],
 ["Investment committee","Judge total shareholder return and capital allocation across a full cycle, not only an indicated yield.","SEC EDGAR · Annual reports",edgar])
 ],
 caseStudy:{title:"A 10% dividend yield: income bargain or warning sign?",
 scenario:"Company A pays a $4 annual dividend on a $40 stock but operating free cash flow is deteriorating. Company B pays a $1 dividend on a $40 stock, maintains substantial reserves and reinvests in profitable projects. A learner needs both near-term rent reserves and eventual retirement growth.",
 steps:[["Company A indicated yield","$4 ÷ $40 = 10%"],["Company B indicated yield","$1 ÷ $40 = 2.5%"],["Missing sustainability evidence","FCF coverage, debt maturity, dividend policy"],["Appropriateness check","Income needs and principal risk, not yield alone"]],
 decision:"Create a total-return and payout-sustainability comparison, and explain why neither equity dividend should replace money reserved for next month's housing obligations."},
 finalChecks:[
 Q("Buy $100, sell $105 and receive $3 dividend: simple total return:",["5%","8%","3%","105%"],1,"(105 − 100 + 3)/100 = 8%."),
 Q("A share repurchase reduces denominator while total income stays flat. EPS may:",["Rise","Necessarily fall","Become debt","Become tax exempt"],0,"EPS is profit divided by share count."),
 Q("A high dividend yield is sufficient proof a stock is safe:",["True","False","Only for funds","Only during falling rates"],1,"A high yield may reflect a falling price or unsustainable payout.")
 ]
});
})();
