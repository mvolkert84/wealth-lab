/* Wealth Lab Academy · L1.S1 gold-standard textbook · Edition 2.0
   Enhances the six existing parts without reordering them or resetting answers;
   appends six advanced parts with their own practice keys and references.
   Authored as plain-language finance instruction, not financial advice.
*/
(function(){
"use strict";
const id="L1.S1", t=TEXTBOOK[id];
if(!t || t.pages.length!==6) throw Error("Expected six original Wealth Equation parts");
const Q=(q,options,answer,why)=>({q,options,answer,why});
const I="https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/figure-out-your-finances";
const G="https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/define-your-goals";
const C="https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/";
const A="https://www.investor.gov/introduction-investing";
const extended=[
[
 "A personal balance sheet has a measurement date. You cannot add last January's checking balance to today's retirement value and call the result current wealth. On the same date, estimate each asset's fair market or reasonably realizable value, record each debt's outstanding balance, and subtract. A balance sheet describes a point in time; monthly income and spending describe activity during a period. Mixing the two can create apparent wealth that was never available.",
 "Think of three distinct questions: How much money passed through my household this month? What resources and obligations exist today? And what cash is actually accessible before specific bills are due? Monthly income answers the first question only partially, because it does not reveal expenses. Net worth answers the second. A dated cash forecast answers the third. A financially healthy plan needs all three, and the numbers must be reconciled rather than treated as competing definitions of success.",
 "A higher paycheck is an opportunity, not a guarantee of higher wealth. If take-home pay is $4,000 and all $4,000 is spent on ordinary consumption, the household has not accumulated new net assets from that period. If $400 remains as cash with no new liability, net worth rises by $400, ignoring valuation changes and other activity. If money is merely transferred from checking to savings, net worth does not increase—the same asset has moved between accounts.",
 "For rigorous analysis, write the identity Assets = Liabilities + Net Worth. It is an equation, not an investment trick. If you know two components, the third follows. After listing assets and liabilities, revisit the result for omitted bills, duplicate account entries, jointly owned property, and debts held outside banking apps. Financial statements are estimates informed by evidence; their credibility depends on the quality and date of each input."
],
[
 "For each asset, distinguish purchase cost, market value, and cash you could realistically obtain after selling costs. A used vehicle bought for $22,000 might now be worth $14,000. The original purchase price is historical information, not today's economic asset value. Similarly, an online estimate of a house is not the same as a binding cash offer. If reliable value is uncertain, use a documented range rather than an invented precise figure.",
 "A liability is an obligation you still owe, not the amount of unused borrowing capacity offered to you. A credit card with a $1,000 limit and a $300 balance creates a $300 debt; the unused $700 limit is neither an asset nor income. A lease, a co-signed obligation, deferred taxes, and medical balances can complicate the picture. The personal net-worth snapshot should use obligations that actually exist, and the accompanying risk notes can include contingent or uncertain commitments.",
 "Secured debt is backed by specified collateral. If a vehicle's estimated sale value is $14,000 while its loan payoff is $17,000, the related equity is negative $3,000. You may have to contribute money to sell or refinance that vehicle. If the car sells for less than the estimate or you owe early-payoff charges, the actual gap can be larger. Ownership of a physical object does not automatically mean that object contributes positively to personal net worth.",
 "An emergency balance-sheet review should flag assets that cannot be sold quickly, restrictions on retirement accounts, taxes due on some withdrawals, and property ownership disputes. These factors do not necessarily remove the asset from net worth, but they reduce its usefulness for an imminent bill. The right document has both an economic value column and a liquidity/risk note, rather than pretending one number captures both."
],
[
 "Begin the home purchase by separating price, down payment, mortgage proceeds and transaction costs. A $250,000 house with a $12,500 down payment and no other financing adjustments requires a $237,500 starting mortgage. The buyer exchanges cash for an ownership claim, while taking on a secured liability. The house's value and mortgage are both entered on the post-closing balance sheet; the full $250,000 purchase price is not the buyer's equity.",
 "Now distinguish funds paid toward the home's purchase price from costs paid to complete the transaction. A hypothetical buyer starting with $25,000 cash, paying $12,500 down and $7,500 in transaction costs, leaves closing with $5,000 liquid cash. Under a simplified assumption that the house's fair value remains $250,000 and those costs have no recoverable asset value, the buyer's net worth drops from $25,000 to $17,500. The $12,500 down payment was converted to equity; the $7,500 cost was consumed.",
 "This calculation does not say buying property is inherently bad. Homeownership can provide housing services, stability, potential appreciation and principal repayment over time. But those benefits are not instant cash profit, and taxes, insurance, maintenance and opportunity costs matter. Actual closings may include prepaid expenses, seller concessions, financed fees, escrow assets and other adjustments that require a more detailed balance sheet.",
 "Stress test the leverage: if the $250,000 home's estimated value later declines 10% to $225,000 while the mortgage still owes $237,500, the home's equity becomes negative $12,500 before selling expenses. The $12,500 starting equity disappeared and another $12,500 of debt exceeds the property's market value. This is why a home purchase needs both enough cash to close and the ability to withstand bad market or household outcomes."
],
[
 "Liquidity is the ability to meet obligations in cash when they actually come due without an unacceptable loss. A household could own a $300,000 home but have only $400 in checking, with a $1,200 rent or mortgage payment due tomorrow. Net worth cannot be spent at a checkout counter. Converting a property or retirement claim to cash can require time, approval, taxes, financing, and possibly a forced sale at a discount.",
 "A monthly budget can conceal a cash-timing failure. Suppose net pay totals $4,200 in a month and expenses total $3,700. The monthly surplus is $500. But if rent of $1,400 is due on the fifth, opening cash is $200, and the first $2,100 paycheck arrives on the fifteenth, there is a $1,200 gap before income arrives. A genuinely useful forecast places every inflow and required outflow on its actual date.",
 "An emergency fund is not only a target balance; it is a reserve protected from ordinary planned expenses. A $3,000 reserve can cover one $3,000 repair or many smaller shocks, but if it is also being counted as the down payment, the same dollars are double assigned. List cash reserved for near-term bills, cash reserved for unexpected needs and cash genuinely available for longer-term investing separately.",
 "A short-term runway measure divides accessible uncommitted cash by an estimated monthly essential spending rate. With $2,400 truly accessible after paying obligations and essentials of $1,200 per month, illustrative runway is two months. The result is a planning approximation: spending may not be evenly distributed, interest and fees can change, and some emergencies arrive before an entire month has elapsed."
],
[
 "Net worth changes for different reasons, and separating them prevents false conclusions. Spending $400 in existing cash to pay $400 of loan principal reduces assets and liabilities by the same amount, leaving net worth unchanged at that moment. A $40 interest charge paid in cash, by contrast, reduces an asset without reducing principal, so it lowers net worth by $40 if nothing else changes.",
 "Borrowing $10,000 and depositing it into checking increases cash by $10,000 and a loan balance by $10,000. It does not increase net worth. Similarly, buying a $2,000 computer with $2,000 cash converts one asset into another; immediate net worth may be unchanged if the computer could actually resell for $2,000. Its resale value may fall rapidly, which is why purchase price and market value must be distinguished.",
 "If a home's estimated market value rises $30,000 while debt remains fixed, an economic balance sheet can show $30,000 more equity. That is an unrealized valuation change, not $30,000 in the owner's bank account. It may reverse, require selling costs, or be costly to access through borrowing. If the owner takes a $20,000 equity loan, the new cash is matched by $20,000 new debt and adds no immediate net worth.",
 "A useful reconciliation states: ending net worth equals beginning net worth plus unspent income minus consumption and other expenses plus investment and asset valuation changes, adjusted for other relevant events. Do not count debt principal reduction again as new wealth if the cash used to repay it already appears as a reduction in assets. This is the personal-finance equivalent of making the accounting equation balance."
],
[
 "Generational wealth is more than leaving a valuable object to someone else. An inherited house can carry property taxes, insurance, repairs, utility bills, liens and mortgage payments. A beneficiary who cannot fund these obligations may have to sell under pressure. The inheritance plan should specify not just who receives an asset, but also how and whether they can afford to maintain it.",
 "Legal title, beneficial interests, creditor claims, taxes and liquidity are different planning questions. Some trusts help manage when and how property passes to beneficiaries, but a trust does not magically erase a home's mortgage or guarantee protection from every creditor. Real estate transfers also involve deeds, recording, insurance and sometimes lender or tax considerations. The law and documents determine the result.",
 "Beneficiary designations on life insurance and retirement accounts can interact with wills and trusts in unexpected ways. A broad plan identifies owners, beneficiaries, any co-owners, outstanding obligations and the source of cash to pay transition costs. A policy's death benefit should not be counted as a current liquid household asset simply because someone expects the benefit in the future; its value depends on the insured event and the policy's enforceable terms.",
 "An estate plan is successful when intended people receive workable choices rather than an expensive obligation. A family might establish a realistic upkeep reserve, maintain insurance, document important financial records and arrange professional legal advice where needed. It should also specify alternative outcomes, including a forced sale, disability of an owner or insufficient funds. The financial and legal sides must be developed together."
]
];
for(let i=0;i<6;i++)t.pages[i].paragraphs.push(...extended[i]);
t.pages[0].pitfall="Income, net worth and safe-to-spend are different measurements. Transferring savings between accounts or taking a loan does not create new personal wealth.";
t.pages[1].exercise="Estimate a realistic resale price for a used car, subtract its lender payoff, and explain why unused credit limits and historical purchase prices do not improve current net worth.";
t.pages[2].exercise="Build the full pre-closing and post-closing balance sheets for the $250,000 home purchase. Check that both statements reconcile and separately identify cash costs and the mortgage liability.";
t.pages[3].pitfall="A positive monthly budget does not prove the rent can be paid on time. Use dated income deposits and bill due dates; borrowing to conceal a shortfall can add more financial risk.";
t.pages[4].exercise="Prepare a transaction bridge for a $400 payment of $360 principal plus $40 interest, a $200 transfer between cash accounts, and a new $5,000 loan deposited into checking.";
t.pages[5].pitfall="A beneficiary may inherit a valuable property without the funds to maintain it. A trust does not automatically eliminate the property mortgage, ownership expenses or tax obligations."
t.pages[1].example=[["Vehicle estimated sale value","$14,000"],["Vehicle loan payoff","$17,000"],["Vehicle equity","$14,000 − $17,000 = −$3,000"],["Credit line","$1,000 limit − $300 owed: only $300 is a liability; unused credit is not an asset"]];
t.pages[4].example=[["Loan principal payment from existing cash","Assets −$400; liabilities −$400; net-worth change $0"],["Interest charge paid in cash","Assets −$40; liabilities unchanged; net-worth change −$40"],["New loan deposited in checking","Assets +$10,000; liabilities +$10,000; net-worth change $0"]];
t.pages[5].example=[["Inherited home value","$250,000"],["Ongoing monthly property expenses (hypothetical)","$700"],["One-year carrying-cost reserve","$700 × 12 = $8,400; not including major repairs"]];
const P=(heading,concept,paragraphs,example,pitfall,exercise)=>({heading,concept,paragraphs,example,pitfall,exercise});

const more=[
 P("Build the opening statement and check every claim",
 "A defendable net-worth statement begins with evidence, a valuation date, and an explicit definition of each asset and debt.",
 [
 "Open a blank financial statement and write its date at the top. List checking, savings, investment account values, vehicle resale estimates, property values and other meaningful assets. For liabilities, list mortgages, vehicle loans, credit-card balances and enforceable personal obligations. Every asset should appear once, and the debt secured by that asset should still appear separately. Mixing net equity and gross asset values in different rows creates double counting.",
 "Suppose a household has $5,000 checking, $2,000 savings, $13,000 retirement assets, and a car worth $11,000. Its listed assets total $31,000. It owes $8,000 on the car and $3,500 on credit cards, for liabilities of $11,500. Net worth is $19,500, but readily accessible bank cash is only $7,000 before reserved expenses. A retirement account balance may not be accessible on demand without tax or other consequences.",
 "An estimate of a vehicle's value should reference a realistic sale range, condition and date. A property's estimate may need a professional opinion if a major financing or estate decision depends on the value. Credit balances should use available dated statements plus known pending activity. Place a warning beside uncertain figures rather than silently treating them as objective truth.",
 "Reconcile the totals by checking that $31,000 assets equals $11,500 liabilities plus $19,500 equity. The algebra matters because it catches obvious addition errors and provides a foundation for explaining each transaction. A balance sheet is not a credit score, affordability approval or bank account. It is a carefully labeled statement of current financial position."
 ],[["Assets","$5,000 + $2,000 + $13,000 + $11,000 = $31,000"],["Liabilities","$8,000 + $3,500 = $11,500"],["Net worth and liquid bank cash","$19,500 net worth; $7,000 bank cash"]],"Do not add vehicle equity of $3,000 and the vehicle's full $11,000 value as two separate assets.","Rebuild the statement without looking at the answer: list every asset, list every debt, then perform the accounting-identity check."),
 P("A dated two-paycheck cash-flow worksheet",
 "A monthly surplus does not prove the household can pay a bill before the next paycheck.",
 [
 "Create a cash calendar with an opening balance and a row for every dated expense or income deposit. If the beginning cash balance is $500 and a $1,200 rent payment must clear on the fifth, the calendar shows negative $700 before counting any later paycheck. A monthly total that is positive can coexist with that early deficit because timing, not just amount, controls liquidity.",
 "Assume $2,000 arrives on the tenth and another $2,000 on the twenty-fourth. During the month there are $1,200 rent, $250 electricity, $500 groceries, $300 transport and $400 other necessary expenses. Total expenses are $2,650, net pay totals $4,000 and the calendar's end balance is $500 + $4,000 − $2,650 = $1,850, assuming every expense is paid once and no other transactions occur.",
 "The end balance looks healthy, but the rent on the fifth still cannot be paid using a tenth-of-month paycheck that has not arrived. A responsible plan might alter the payment timing by agreement, redirect funds from a prior paycheck, reduce discretionary spending, or build a dedicated reserve before investing more. It should not treat an available credit limit as if the money were earned income.",
 "A calendar should distinguish actual posted income, projected future deposits and transfers between the household's accounts. A transfer from checking to savings is neither new household income nor consumption: the cash has simply moved. Recording both sides as income and spending can make a cash-flow report misleading without changing overall wealth."
 ],[["Opening cash","$500"],["Pay received this month","$2,000 + $2,000 = $4,000"],["Required spending","$1,200 + $250 + $500 + $300 + $400 = $2,650"],["Closing cash","$500 + $4,000 − $2,650 = $1,850"],["Rent due before first paycheck","$1,200 − $500 = $700 temporary cash gap"]],"Calendar calculations assume expense dates and payroll deposits occur as modeled; actual availability may vary.","Reorder the same transactions by date. Identify the exact day cash would go negative and write a non-borrowing solution."),
 P("Transactions: distinguish consumption, principal and transfers",
 "Every financial transaction changes some combination of assets, liabilities and net worth; classify it before declaring a gain.",
 [
 "When wages of $1,000 reach checking and no associated debt arises, the bank asset increases by $1,000 and net worth rises by $1,000 before additional expenses. Spending $300 on groceries lowers cash and net worth by $300. Moving $200 into savings reduces checking by $200 but increases savings by $200, so the total assets and net worth stay the same.",
 "Paying $400 toward a loan consists of potentially two components: principal and interest. If $360 reduces principal and $40 is interest, cash declines $400, the debt falls $360, and net worth declines $40 at that moment. Debt payoff helps future finances because it reduces financing obligations and future interest, but the principal payment itself is not an additional increase in net worth on top of the cash already surrendered.",
 "Borrowing $5,000 increases cash and debt by $5,000, producing no immediate increase in net worth. Investing those proceeds in an asset initially valued at $5,000 changes the composition of assets but not total net worth. The investment could later appreciate or fall, while the debt remains due under contract. This is why borrowing creates leverage and risk rather than free purchasing power.",
 "You can build a transaction bridge with columns for cash change, noncash asset change, debt change and net-worth change. Each row should satisfy change in net worth equals change in total assets minus change in liabilities. If the bridge does not reconcile, check whether an expense, loan payment or transfer was recorded twice."
 ],[["Loan payment","$400 total cash out"],["Principal component","$360 liability reduction"],["Interest component","$40 expense"],["Net-worth change from payment alone","−$400 − (−$360) = −$40"]],"Do not claim that principal repayment creates new wealth without accounting for the cash used; this double-counts the improvement.","Classify four events—deposit paycheck, save by transfer, pay loan principal, take a loan—and compute each event's net-worth change."),
 P("Home leverage, market values and a sale under stress",
 "Equity is a residual amount and may turn negative with relatively small changes in property value.",
 [
 "Leverage compares the size of an asset with the owner's contribution. A $250,000 home financed with a $237,500 mortgage has a 95% starting loan-to-value ratio and only 5% starting equity before fees. A 5% decline in the home's value removes the original $12,500 equity, assuming the loan principal has not fallen. A 10% decline produces a $225,000 estimated home value and negative $12,500 equity.",
 "Net proceeds from a sale differ from the home's estimated market value. Suppose a home could sell for $225,000 but the transaction costs were 6% of sale price. Modeled selling costs would be $13,500, leaving $211,500 before loan payoff. Paying off $237,500 would leave a $26,000 shortfall, assuming no other liens, costs or lender concessions. Those costs do not mean every sale has exactly a 6% fee; the rate is deliberately hypothetical.",
 "Mortgage equity is not the same as withdrawable cash. Refinancing or a home-equity loan may require sufficient equity, credit, income, lender approval and costs. New debt taken against the home must be reflected as a liability. Also distinguish residence affordability from an investment analysis: an owner obtains housing services while also taking financial risk.",
 "A practical stress test compares at least a stable market, a moderate decline, a large decline and a sale scenario. Record the outstanding mortgage at the scenario date, not only the original amount, and check taxes, maintenance and homeowner insurance separately. Home appreciation is uncertain, and the ability to stay in the property can matter more than an estimated sale value."
 ],[["Starting house value / debt","$250,000 / $237,500"],["Value after −10%","$225,000; equity −$12,500"],["Illustrative sale cost at 6%","$225,000 × .06 = $13,500"],["Net after sale costs and loan payoff","$225,000 − $13,500 − $237,500 = −$26,000"]],"A current appraisal is not sale proceeds; transaction costs and outstanding liens can worsen the cash outcome.","Recalculate home equity if the mortgage has declined to $232,000 and the sale price is $235,000 with 5% selling costs."),
 P("Cash reserves and deciding what is truly available",
 "Money allocated to a fixed obligation is not simultaneously available for speculation, emergencies or a down payment.",
 [
 "A family may have $9,000 in bank cash, but it might also owe $2,400 in bills over the next two weeks and need an emergency reserve. Subtracting $2,400 scheduled obligations leaves $6,600 of cash that is not yet earmarked for those bills. If the family chooses to protect a $4,000 emergency reserve, only $2,600 remains potentially flexible before any other required spending.",
 "A three-month reserve target depends on the definition of essential expenses. If essential monthly spending is $2,000, three months is $6,000. That target is not a universal rule or immediate requirement for every household; unstable income, medical needs, deductibles and family responsibilities can make larger reserves prudent. Avoid borrowing money merely to report a large bank balance, because borrowed funds come with matching debt and future payments.",
 "A liquidity ratio can be computed as accessible cash divided by essential monthly expenses. Using $4,000 truly accessible and $2,000 monthly essentials gives a two-month simple runway. If $2,000 is already committed to upcoming bills, however, the available reserve may support less than one month. Always align the numerator's meaning with the denominator's meaning.",
 "It may be financially sensible to pay expensive debt, keep accessible reserves or invest in long-term assets, but those decisions compete for the same dollars. A responsible decision is made after calculating due dates, interest costs, ability to withstand losses and the return assumptions. There is no risk-free strategy that converts unused credit into recurring cash flow without obligations."
 ],[["Total bank cash","$9,000"],["Near-term committed bills","$2,400"],["Protected emergency reserve","$4,000"],["Illustrative unassigned cash","$9,000 − $2,400 − $4,000 = $2,600"]],"A reserve is only protective if it is not quietly assigned to several other goals at the same time.","Create three distinct envelopes: bills due within 30 days, emergency funds and money eligible for long-horizon risk."),
 P("A rigorous personal finance decision memo",
 "Finish the chapter by connecting the accounting identity, dated cash and realistic uncertainty into an evidence-based recommendation.",
 [
 "Professional-level financial thinking begins with a clear objective and the constraints that cannot be violated. A first-time buyer may want a home, a stable emergency fund and a future inheritance plan. Write down the desired purchase date, cash available, recurring obligations, net-worth statement, reliable income and risk tolerance. A projected investment return or future property appreciation should not fill a known cash gap.",
 "Next, compare alternatives using the same dates and definitions: continue saving, buy a less expensive property, postpone the purchase, reduce existing debt, or seek eligible assistance after verifying current program rules. For each scenario, estimate how opening cash, new debt, net worth and near-term liquidity change. Separate assumptions you control from those you merely hope will occur.",
 "The decision memo should document where information came from. Bank balances are supported by statements; loan payoff balances by lender records; home values by dated estimates or appraisals; taxes and closing charges by specific quotes. A transparent calculation that says 'we do not yet know' is better than a precise but unsupported figure.",
 "Finally, state the downside scenario and the action it would require. What happens if income is interrupted, the house needs a costly repair, an account becomes inaccessible or property prices decline? The conclusion should say what decision is affordable, what risk remains, and what additional evidence could change the recommendation. That is the difference between reciting a formula and using finance responsibly."
 ],[["Opening cash for home case","$25,000"],["Home price, initial mortgage","$250,000 and $237,500"],["Down payment and costs","$12,500 and $7,500"],["Immediate remaining cash and home equity","$5,000 cash; $12,500 equity; $17,500 net worth"]],"A legally valid or mathematically possible transaction can still be unaffordable given cash timing and risk.","Prepare a 300-word decision memo: balance sheet, first 60 days of cash, upside case, downside case, three alternatives and a final recommendation.")
];
t.pages.push(...more);
const addedTerms=[
 [["Valuation date","Date at which every asset and liability is measured."],["Gross asset","The asset's total value before deducting a related loan."],["Net equity","Asset's market value less the debt secured by it."]],
 [["Cash calendar","Schedule of dated cash receipts, required outflows and resulting balances."],["Timing gap","Cash deficit caused by payment obligations arriving before usable income."]],
 [["Principal","Part of a loan payment reducing the balance owed."],["Interest expense","Financing cost that generally does not reduce original principal."],["Transaction bridge","A reconciliation of asset and liability movements to net worth."]],
 [["Loan-to-value ratio","Secured loan principal divided by collateral market value."],["Net sale proceeds","Selling price less transaction charges and secured payoff obligations."]],
 [["Committed cash","Funds already reserved to meet known obligations."],["Liquidity runway","Available cash divided by spending needs over a comparable period."]],
 [["Decision memo","Recommendation supported by evidence, calculations and explicit uncertainties."],["Sensitivity analysis","Recalculation under changed assumptions to reveal decision risks."]]
];
const addedChecks=[
 [Q("Assets are $31,000 and debts total $11,500. Net worth equals:",["$42,500","$19,500","$31,000","$11,500"],1,"$31,000 assets minus $11,500 liabilities equals $19,500."),
  Q("Which practice makes a net-worth calculation more defensible?",["Use original purchase prices for every asset","Record all values at the same date and document estimates","Count the car and car equity as separate assets","Treat credit limits as savings"],1,"Consistent valuation dates and no duplicate assets are essential.")],
 [Q("Cash begins at $500; $1,200 rent is due before the first paycheck. Immediate shortage equals:",["$1,700","$700","$500","$0"],1,"$1,200 due minus $500 available creates a $700 gap."),
  Q("Moving $200 from checking to savings is:",["$200 new income","$200 debt reduction","An internal asset transfer with no net-worth change","A new investment gain"],2,"One cash asset decreases as another increases by the same amount.")],
 [Q("Paying $400 including $360 principal and $40 interest changes net worth by:",["+$360","$0","−$40","−$400"],2,"Cash falls $400; debt falls $360; net worth declines $40."),
  Q("Taking a new $5,000 loan deposited in cash immediately changes net worth by:",["+$5,000","−$5,000","$0","+$10,000"],2,"Assets and liabilities each increase by $5,000.")],
 [Q("House price $225,000, selling costs $13,500, mortgage $237,500. Net cash from sale is:",["+$12,500","−$26,000","−$12,500","+$211,500"],1,"$225,000 less $13,500 costs and $237,500 debt leaves a $26,000 gap."),
  Q("Home equity with value $225,000 and debt $237,500 equals:",["+$12,500","$0","−$12,500","+$237,500"],2,"Market value minus secured debt is negative $12,500.")],
 [Q("$9,000 cash minus $2,400 committed bills and $4,000 reserve leaves:",["$6,600","$2,600","$4,000","$9,000"],1,"$9,000 − $2,400 − $4,000 = $2,600."),
  Q("A $6,000 three-month reserve target implies monthly essential expenses of:",["$500","$1,000","$2,000","$18,000"],2,"$6,000 divided by three months equals $2,000 per month.")],
 [Q("Which is the strongest basis for a mortgage purchase recommendation?",["The property must always appreciate","Cash, debt, due dates, risks and multiple supported scenarios","The seller's asking price alone","Unused credit card limits"],1,"Affordability and downside resilience require more than a price or forecast."),
  Q("Which change should trigger a new affordability analysis?",["A home inspection revealing a large repair obligation","A new app accent color","An unrelated stock ticker","A different font in the syllabus"],0,"Major changes to real obligations affect financing and reserve decisions.")]
];
const notes=[
 ["Household accounting","Keep the date and valuation source for each entry; a beautifully formatted statement with duplicate assets is still wrong.","SEC Investor.gov · Figure Out Your Finances",I],
 ["Cash-flow planning","A dated cash calendar can reveal a deficit even when total monthly income exceeds monthly expenses.","CFPB · Your Money, Your Goals",C],
 ["Loan reconciliation","Split principal from interest when interpreting changes in debt, cash and personal wealth.","SEC Investor.gov · Personal Finance",I],
 ["Mortgage risk","Account for both property-price changes and realistic selling costs before assuming equity can be withdrawn.","SEC Investor.gov · Goals and Risk",G],
 ["Reserve policy","Protect committed bills and liquid emergency funds before allocating dollars to long-term risk.","SEC Investor.gov · Introduction to Investing",A],
 ["Professional memo","State facts, assumptions, alternatives and credible downside scenarios in language an ordinary household can verify.","SEC Investor.gov · Define Your Goals",G]
];
PART_CHECKS[id].push(...addedChecks);
PART_TERMS[id].push(...addedTerms);
PRACTITIONER_NOTES[id].push(...notes);
TEXTBOOK_CHECKS[id].push(
 Q("A $400 loan payment comprises $360 principal and $40 interest. Net-worth change from this payment alone:",["+$360","−$40","$0","−$400"],1,"Cash is down $400 and debt down $360: net worth is down $40."),
 Q("A $250,000 house with $237,500 mortgage falls to $225,000 in market value. Its equity before sale costs is:",["$25,000","$12,500","−$12,500","$0"],2,"$225,000 minus $237,500 equals negative $12,500."),
 Q("Which is NOT a current personal asset?",["Savings deposit","Retirement account value","Unused credit-card borrowing limit","A resale-value car"],2,"Available credit is borrowing capacity and becomes debt if used."),
 Q("A household has positive monthly cash flow but cannot pay rent before payday. The immediate issue is:",["Missing property appreciation","Timing and accessible liquidity","Unrealized dividends","No investment forecast"],1,"Date-specific cash obligations can produce a shortage even with positive monthly totals.")
);
const oldSources=t.sources; t.sources=[I,G,C,A,...oldSources.filter(x=>!([I,G,C,A].includes(x)))];
const originalCase=CASE_FILES[id];
CASE_FILES[id]={
 title:"Household financial audit: ready for a Connecticut home?",
 scenario:"A fictional household begins with $25,000 in checking/savings, no other assets or debts for this isolated exercise, and considers a $250,000 property financed by a $237,500 mortgage. Closing costs of $7,500 are paid in cash, in addition to the $12,500 down payment. After closing, housing and other essentials are projected to be $3,800 per month against $4,000 take-home income. The home may require a $3,000 repair. This case intentionally isolates transaction mechanics; real purchases include additional balances, escrow, moving costs and lender conditions.",
 steps:[
 ["Before purchase balance sheet","Cash $25,000; debt $0; net worth $25,000"],
 ["At closing cash paid","$12,500 down + $7,500 closing charges = $20,000"],
 ["After purchase balance sheet","House $250,000 + cash $5,000 − mortgage $237,500 = $17,500 net worth"],
 ["Closing-cost wealth effect","$25,000 opening wealth − $7,500 costs = $17,500 remaining wealth"],
 ["Monthly cash margin after purchase","$4,000 net income − $3,800 essentials = $200 monthly"],
 ["Repair affordability stress","$3,000 repair equals 15 months of the stated $200 margin, absent other cash"],
 ["10% property decline scenario","House $225,000 − loan $237,500 = −$12,500 home equity"],
 ["6% hypothetical sale-cost scenario","$225,000 × .06 = $13,500 transaction costs; gross-sale net of loan and selling costs is −$26,000"]
 ],
 decision:"Deliver a brief financial advisory memo: separate the buyer's cash, mortgage debt, net worth and monthly liquidity. Compare buying now with saving longer or buying less property. Explain how closing costs, repair risk and a home-value decline alter the recommendation. Do not imply this transaction automatically qualifies for a mortgage or a particular assistance program."
};
window.WealthLabGoldEdition={
 id,edition:"2.0",oldParts:6,addedParts:more.length,parts:t.pages.length,
 legacyQuestionCount:12,addedPartQuestions:addedChecks.reduce((n,a)=>n+a.length,0),
 oldFinalQuestionCount:3,addedFinalQuestions:4,originalCase,
 sources:t.sources
};
})();
