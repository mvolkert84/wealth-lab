/* Wealth Lab Academy · Deep textbook L8.S1 · What a Stock Owns */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const sec="https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks",edgar="https://www.sec.gov/edgar/search/";
WealthLabRegisterDeepChapter({id:"L8.S1",title:"Stock Ownership: Corporate Claims, Dilution, Governance and Investor Rights",
 sources:[sec,edgar,"https://www.investor.gov/introduction-investing"],
 parts:[
 P("What a common share legally represents",
 "Common stock is a residual ownership claim on a corporation, not a direct deed to its buildings or inventory.",
 [
 "A corporation is a distinct legal entity that can own property, enter contracts, employ workers and borrow money. Common shareholders own shares in the entity. They do not individually own a fraction of the company's warehouse that they can take home or sell separately.",
 "A shareholder's residual claim generally comes after contractual claims of creditors in a liquidation, and corporate voting rights depend on share class and governing documents. Buying stock exposes the investor to business results and valuation changes; unlike a typical bond, a common share does not promise a fixed principal repayment date.",
 "If a company has one million common shares outstanding and you hold 1,000, your direct proportion is 0.1% of those shares, ignoring other classes and future dilution. This does not entitle you to withdraw 0.1% of its bank balance; managers and directors control company affairs under law and governance rules."
 ],
 [["Your shares","1,000"],["Company common shares outstanding","1,000,000"],["Simple ownership share","1,000 ÷ 1,000,000 = 0.10%"]],
 "Voting rights, economic preferences and liquidation priorities can differ by security class; do not assume every share is identical.",
 "Look at a public company's annual report and find shares outstanding, classes of stock, and how the board is elected.",
 [["Common equity","Residual corporate ownership claim after senior obligations."],["Residual claim","Claim on value remaining after obligations with higher priority are satisfied."]],
 [Q("You own 1,000 shares of a company with 1,000,000 identical common shares. Your percentage is:",["10%","1%","0.1%","0.01%"],2,"1,000 ÷ 1,000,000 = 0.001, or 0.1%."),
 Q("Common shareholders generally own:",["A personal deed to each corporate asset","A residual claim on the corporate entity","A guaranteed bond repayment","A right to withdraw corporate cash at will"],1,"The company owns its assets; shares are claims on the company.")],
 ["Equity fundamentals","Start with the capitalization table, security class and financial statements before interpreting the quoted price.","SEC Investor.gov · Stocks",sec]),
 P("Outstanding shares, float and market capitalization",
 "Share price means little without share count, and stock float is different from total outstanding shares.",
 [
 "Shares authorized, issued, outstanding and available to trade are different concepts. Authorized shares are a charter ceiling, issued shares have been created, outstanding shares are held outside the company, and float usually excludes certain restricted or closely held stakes. Not every approved share is currently outstanding.",
 "Market capitalization equals market price multiplied by outstanding shares. A $25 share price with 40 million outstanding shares implies $1 billion equity market value. A $250 share price with one million outstanding shares implies $250 million. Ranking the second stock as the larger company because of its higher per-share quote is incorrect.",
 "Stock splits change share count and per-share price without mechanically creating value. In a two-for-one split, 100 shares at $80 become 200 shares at a theoretical $40, leaving a $8,000 position before market movement and other effects."
 ],
 [["Company X market cap","$25 × 40m shares = $1.0bn"],["Company Y market cap","$250 × 1m shares = $250m"],["2-for-1 split on 100 shares at $80","200 shares at theoretical $40; $8,000 total"]],
 "A split can affect trading accessibility and sentiment but should not itself be counted as an investment return.",
 "Compare two stocks with different prices and share counts; calculate equity market value and state what is still missing to value the business.",
 [["Float","Shares generally available for public trading after certain holdings are excluded."],["Stock split","Corporate action changing share units and corresponding per-share price."]],
 [Q("$25 times 40 million outstanding shares implies equity market cap of:",["$100 million","$1 billion","$40 billion","$25 million"],1,"25 × 40,000,000 = 1,000,000,000."),
 Q("A 2-for-1 split of 100 shares at a theoretical $80 changes the position's pre-market-move value to:",["$4,000","$8,000","$16,000","$80,000"],1,"200 shares × $40 = $8,000.")],
 ["Capital markets analyst","Compare diluted shares and equity capitalization, not share price alone.","SEC EDGAR · Filings",edgar]),
 P("Financing and dilution",
 "New equity financing can fund growth but reduce an existing investor's percentage ownership.",
 [
 "A company may raise money by selling new shares rather than borrowing. New investors bring capital to the corporation, but each existing share then represents a smaller percentage of the expanded company. The economic impact depends on issue price and what management does with the proceeds.",
 "Suppose there are 1,000,000 shares and you own 10,000, or 1%. The company issues 250,000 new shares and you do not participate. You still own 10,000 shares, now 0.8% of the 1,250,000 outstanding. Ownership dilution does not automatically prove per-share value declined because the company also received new resources.",
 "Options, convertible bonds and employee stock compensation can introduce potential dilution. Basic EPS uses a narrower share denominator than diluted EPS, which incorporates potentially dilutive instruments using applicable accounting rules. A high-growth business with recurring share issuance needs careful per-share analysis."
 ],
 [["Before issuance","10,000 / 1,000,000 = 1.00%"],["New shares issued","250,000"],["After issuance","10,000 / 1,250,000 = 0.80%"]],
 "Dilution of ownership percentage is not always identical to dilution of economic value; financing terms and proceeds matter.",
 "Write a before-and-after ownership table and evaluate whether new capital could increase profit per share over time.",
 [["Dilution","Reduction of a shareholder's relative ownership or per-share claim when additional shares or equivalents arise."],["Diluted EPS","Per-share earnings metric incorporating potentially dilutive shares under accounting rules."]],
 [Q("10,000 shares out of 1.25 million after new issuance equal:",["0.8%","1.0%","8%","12.5%"],0,"10,000 / 1,250,000 = 0.008."),
 Q("New shares sold for useful growth capital necessarily destroy investor value:",["Always","Never possible","Not necessarily","Only in a split"],2,"Value depends on price received and how proceeds are invested.")],
 ["Corporate finance","Track shares, proceeds and project returns together when evaluating dilution.","SEC Investor.gov · Stocks",sec]),
 P("Governance: boards, voting and incentives",
 "Shareholders delegate oversight to directors, and management incentives can align with or conflict with investor interests.",
 [
 "Corporate boards oversee senior management, capital allocation, strategy and major governance decisions according to applicable law and governing documents. Shareholders may elect directors and vote on specified issues, but a small shareholder usually cannot directly command everyday operations.",
 "Dual-class stock structures can separate voting power from economic ownership. A founder may control many votes with a smaller proportion of economic value, changing accountability. Compensation packages based on stock price or financial metrics can encourage good performance or unintended short-term behavior.",
 "A good owner reads proxy statements for director elections, executive compensation, related-party transactions and shareholder proposals. Governance is not a substitute for profit or cash flow, but weak oversight can turn a promising business into a poor long-term investment."
 ],
 [["Illustrative company ownership","Public investors hold 80% of economic shares"],["Founder voting rights","75% voting control under hypothetical special class"],["Lesson","Economic percentage does not necessarily equal voting control"]],
 "One share does not universally equal one vote across every share class; examine the company's charter and proxy filings.",
 "Compare the governance disclosures of two public companies and identify one possible conflict of interest.",
 [["Proxy statement","Disclosure used in connection with shareholders' voting and annual meeting matters."],["Dual-class shares","Share classes with different voting rights."]],
 [Q("What is the main responsibility of a corporate board?",["Guarantee the share price rises","Oversee management and major governance decisions","Pay every employee directly","Set Federal Reserve policy"],1,"Directors exercise oversight duties under corporate governance."),
 Q("A founder can have a minority economic stake but majority voting control when:",["All shares always vote equally","Dual-class voting rights differ","The company has no charter","Shares split two for one"],1,"Different classes can grant disproportionate voting power.")],
 ["Governance analyst","Review proxy disclosures and ownership classes along with financial reports.","SEC EDGAR · Proxy statements",edgar]),
 P("Common stock, preferred stock and creditors in distress",
 "Claims have different priorities; investors must identify which class receives cash first when a business fails.",
 [
 "A corporation can issue common stock and preferred shares as well as bonds or other borrowing claims. Preferred shares often have contractual dividend and liquidation preferences but may lack the same voting rights as common stock. The exact rights vary considerably by issuance.",
 "In a simplified liquidation, imagine sale proceeds of $900,000, secured claims of $500,000 and other senior debt of $300,000. Only $100,000 remains for any subordinate obligations and equity classes, before expenses and other priority adjustments. Common shareholders could receive nothing if senior claims exhaust the estate.",
 "Investors should not rank a preferred security as safe simply because its name includes preferred. Credit risk, call provisions, dividend deferral rules and legal priority remain central. Compare the actual prospectus and capitalization structure before selecting a claim."
 ],
 [["Illustrative liquidation proceeds","$900,000"],["Senior claims","$500,000 + $300,000"],["Amount before junior claims and costs","$100,000"]],
 "This is a simple teaching illustration, not a description of statutory bankruptcy distribution rules for every company.",
 "Draw a capital stack from secured creditors to common equity and explain why the lowest-priority class requires higher potential reward.",
 [["Preferred stock","Equity class with specified preferences that vary by terms."],["Liquidation priority","Order in which legally valid claims may receive distributions when an entity is wound down."]],
 [Q("$900k proceeds less $800k senior claims leaves:",["$1.7 million","$800,000","$100,000","$0"],2,"900,000 − 800,000 = 100,000."),
 Q("Who usually bears the most residual exposure after creditors?",["Common shareholders","Senior secured lenders","Deposit insurers","Bond trustees"],0,"Common equity is typically at the residual end of the capital stack.")],
 ["Distressed analyst","Read securities' actual rights and obligations rather than relying on labels like common or preferred.","SEC Investor.gov · Stock products",sec]),
 P("Think like a long-term owner, not a ticker watcher",
 "A useful investment thesis links the business model to financial outcomes, governance and a price that allows for errors.",
 [
 "Before purchasing an individual company, identify what customers pay for, how profit becomes cash, whether managers can reinvest at attractive returns, and which debt and dilution risks threaten the claim. Good business prospects are not the same as a fair purchase price.",
 "A household with $2,000 to invest could buy one company or a diversified fund. If a single-stock holding falls 40%, it is worth $1,200; recovering requires a 66.67% gain. Concentration may overwhelm an otherwise reasonable long-term financial plan.",
 "The disciplined approach is to describe a valuation range, portfolio role, downside conditions and what evidence would cause a reassessment. The purpose is not to avoid individual stocks forever but to make the risk and opportunity cost explicit."
 ],
 [["Illustrative single-stock investment","$2,000"],["After a 40% decline","$1,200"],["Gain needed to recover","$800 ÷ $1,200 ≈ 66.67%"]],
 "A seemingly low stock price after a fall does not necessarily mean a bargain, particularly when business economics deteriorate.",
 "Prepare a one-page ownership memorandum using a company annual report, discussing revenue, cash flow, share issuance and risks.",
 [["Investment thesis","Evidence-supported explanation of why an asset may offer attractive risk-adjusted value."],["Concentration risk","Exposure to outsized loss from a small number of correlated positions."]],
 [Q("A $2,000 investment losing 40% is worth:",["$800","$1,200","$1,600","$2,400"],1,"2,000 × 0.60 = 1,200."),
 Q("What is the best first research source for company share-count and governance disclosures?",["Rumors","SEC filings and company proxy materials","A stock logo","An anonymous promise"],1,"Public filings provide structured disclosure with identifiable sources.")],
 ["Investment review","Use original financial and proxy documents and make risk assumptions transparent.","SEC EDGAR · Company filings",edgar])
 ],
 caseStudy:{title:"A cheap-looking company issuing new shares",
 scenario:"A company trades for $8 with ten million shares outstanding and plans to sell an additional five million shares at $8 to fund expansion. An investor owns 10,000 shares. Management claims the business will be worth twice as much in three years but provides no cash-flow evidence.",
 steps:[["Current market capitalization","$8 × 10m = $80m"],["New issue proceeds","$8 × 5m = $40m before fees"],["Ownership before issuance","10,000 / 10m = 0.10%"],["Ownership after issuance","10,000 / 15m ≈ 0.0667%"]],
 decision:"Draft a memo distinguishing market capitalization, new financing proceeds, dilution and the uncertain benefits of the proposed expansion. Ask for the uses of proceeds and profitability assumptions."},
 finalChecks:[
 Q("Shares are an ownership claim on:",["Individual corporate assets transferred into the investor's name","The corporate entity and residual value","A guaranteed Treasury repayment","A bank-insured deposit"],1,"Common stock is a claim on the corporation."),
 Q("Stock price doubles solely due to a two-for-one split:",["True","False","Only for penny stocks","Only when the market is closed"],1,"The split increases shares and theoretically adjusts price inversely."),
 Q("Which changes an existing investor's ownership percentage when they do not buy more shares?",["A new equity issuance","A routine cash dividend alone","Changing the app's chart color","Company headquarters relocation"],0,"New shares enlarge the denominator and dilute relative ownership.")
 ]
});
})();
