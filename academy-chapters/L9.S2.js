/* Wealth Lab Academy · Deep textbook L9.S2 · Cash, CDs and Treasury securities */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const fdic="https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance";
const bills="https://www.treasurydirect.gov/marketable-securities/treasury-bills/";
const tax="https://www.treasurydirect.gov/marketable-securities/tax-forms-and-withholding/";
WealthLabRegisterDeepChapter({id:"L9.S2",title:"Savings, CDs and Treasuries: Safety, Liquidity, Yield and Taxes",
 sources:[fdic,bills,tax],
 parts:[
 P("Cash is a function, not a single product",
 "Checking, savings, money-market deposit accounts and marketable securities can all support cash goals but differ in protection and access.",
 [
 "A checking account prioritizes payments and everyday transfers; a savings account usually holds funds that are not required for immediate transactions. A money-market deposit account is a bank deposit product, while a money-market mutual fund is an investment fund. The shared words do not imply identical legal or insurance treatment.",
 "A household may keep $1,200 for upcoming rent, $800 for bills and $2,000 for emergencies. Total accessible funds are $4,000, but not all $4,000 is genuinely available for discretionary investing. A cash plan allocates the balance to dated obligations before treating it as surplus.",
 "Product comparisons need more than a quoted APY: check minimum balance, service charges, transfer availability, rate variability and how quickly funds can reach the bill-paying account. Liquidity becomes especially valuable when paychecks arrive after a due date."
 ],
 [["Accessible bank balance","$4,000"],["Scheduled rent and other near-term bills","$1,200 + $800 = $2,000"],["Remaining cash before emergency reserve","$2,000"]],
 "A savings account balance is not automatically safe-to-invest money; upcoming bills and emergency needs must be deducted first.",
 "Build a dated cash reserve ladder covering the next 45 days, separate from optional investments.",
 [["Cash buffer","Accessible dollars reserved to meet near-term obligations."],["Liquidity","Ease and speed of converting holdings to usable money without unacceptable loss."]],
 [Q("$4,000 cash minus $2,000 of scheduled payments leaves:",["$6,000","$4,000","$2,000","$0"],2,"$4,000 − $2,000 = $2,000 before reserving emergencies."),
 Q("A bank money-market deposit account and a money-market mutual fund are:",["Always legally identical","Different products with different protections","Both guaranteed by the FDIC in every account","Both corporate stocks"],1,"One is a qualifying deposit; the other is an investment fund.")],
 ["Household cash manager","Label every cash dollar by purpose and required date before comparing yields.","FDIC · Understanding Deposit Insurance",fdic]),
 P("FDIC insurance: the ownership-category calculation",
 "Deposit insurance is based on depositor, insured bank and account ownership category—not a $250,000 cap per account name.",
 [
 "The standard FDIC deposit insurance amount is $250,000 per depositor per FDIC-insured bank for each ownership category, subject to detailed eligibility rules. Eligible deposit products include checking accounts, savings accounts, money-market deposit accounts and CDs. Ownership categories are separate only where legal and titling requirements are met.",
 "If an individual holds $180,000 in a single-owner savings account and $120,000 in a single-owner CD at the same insured bank, those amounts aggregate to $300,000 within that category. With the usual $250,000 limit, the simplified excess is $50,000, assuming no special rules alter the ownership calculation.",
 "Stocks, bond holdings, mutual funds, annuities and life insurance are not bank deposits insured by the FDIC even if a bank sells or custodies them. Deposit insurance is different from securities-custody safeguards. Verify the bank's insured status and use official estimators for complicated joint or trust arrangements."
 ],
 [["Single-owner savings at one bank","$180,000"],["Single-owner CD at the same bank","$120,000"],["Combined balance; simplified uninsured excess","$300,000 total; $50,000 over standard cap"]],
 "Moving cash between two accounts at the same bank in the same ownership category does not double standard FDIC coverage.",
 "Compare a single owner with separate banks to a joint and trust-account structure; identify where an official FDIC estimator is needed.",
 [["Ownership category","Legal account ownership form used in deposit-coverage rules."],["Insured bank","Financial institution whose eligible deposits have FDIC protection."]],
 [Q("Single-owner savings $180k and CD $120k at one insured bank, usual category cap $250k. Simplified excess is:",["$0","$50,000","$120,000","$300,000"],1,"$300,000 aggregate minus $250,000 standard limit = $50,000."),
 Q("A mutual fund purchased through a bank is automatically FDIC-insured:",["True","False","Only if it holds stocks","Only above $250,000"],1,"Investment products are not FDIC-insured deposits.")],
 ["Deposit safety","Calculate coverage by actual insured bank and ownership category, including all qualifying accounts; seek official estimates for complex titling.","FDIC · Deposit Insurance",fdic]),
 P("APY, compound interest and variable deposit rates",
 "The effective annual yield of a deposit can differ from its nominal rate, but credited interest is not the same as market investment returns.",
 [
 "Annual percentage yield (APY) generally expresses the compound annual return of a deposit under its disclosure assumptions. If a hypothetical deposit yields 4% APY for one year, $5,000 becomes about $5,200 before taxes and assuming its terms remain as modeled. A variable-rate account may adjust during the year, so an initial quote may not apply for twelve months.",
 "Banks may compound daily, monthly or under other disclosed rules. Advertised bonuses, minimum balance requirements and fees can change effective results for a particular household. Comparison shopping should use the same dollar amount, holding period, tax assumptions and ability to access money.",
 "If inflation averages 3% while the after-fee nominal yield is 4%, the exact real gain is about 0.97% before income tax. Rate shopping may improve results but cannot eliminate the tradeoff between purchasing power, guaranteed principal under applicable insurance and flexibility."
 ],
 [["Illustrative initial deposit","$5,000"],["Assumed constant one-year APY","4%"],["Illustrative one-year value","$5,200 before tax and account costs"]],
 "Do not extrapolate today's variable APY throughout a multi-year plan without an explicit assumption and downside scenario.",
 "Compare two savings accounts with the same APY but different minimum-balance and monthly fee rules.",
 [["APY","Annual percentage yield expressing deposit interest on a compound annual basis."],["Variable deposit rate","Interest rate that may change according to account terms."]],
 [Q("$5,000 at 4% annual yield for one year produces:",["$20 interest","$200 interest","$2,000 interest","$5,000 interest"],1,"$5,000 × .04 = $200."),
 Q("A variable savings APY quoted today is:",["A multiyear guaranteed return","A rate that can change according to terms","A securities-market forecast","A tax-exempt promise"],1,"Variable-rate terms may permit rate changes.")],
 ["Rate comparison","Model fees and realistic balance timing rather than multiplying the advertised APY by an arbitrary future period.","FDIC · Deposit Accounts",fdic]),
 P("Certificates of deposit: the price of locking money",
 "CDs may offer a fixed term and yield but accessing funds early can incur a penalty or require special product terms.",
 [
 "A bank certificate of deposit generally commits money for a specified term and may offer a fixed or variable rate. Early-withdrawal penalties, minimum opening deposits and renewal rules affect the realized return. A higher posted yield is not automatically preferable when the money might be needed unexpectedly.",
 "A hypothetical $10,000 CD earns 4% for one year and charges a penalty equal to three months of simple interest if withdrawn under assumed terms. The annual interest would be $400; three months' simple interest on $10,000 at 4% is $100. Actual penalties, accrued interest and product rules may be very different.",
 "A CD ladder can stagger maturity dates so only part of the savings is locked at any given time. This may reduce refinancing and access risks, but it also means some funds earn lower or higher rates as products mature and roll over."
 ],
 [["Hypothetical CD principal","$10,000"],["Modeled annual interest at 4%","$400"],["Illustrative three-month simple-interest penalty","$100 (actual contract may differ)"]],
 "Early-withdrawal penalties can consume interest and sometimes principal under particular terms; read the exact disclosure.",
 "Design a simple three-CD ladder for a $9,000 planned expense over three dates and state how an emergency would be funded.",
 [["CD maturity","Contractual date the time deposit becomes due under the agreement."],["Early-withdrawal penalty","Contractual charge or loss for taking funds out before maturity."]],
 [Q("Three months of simple interest at 4% on $10,000 equals:",["$10","$100","$400","$1,000"],1,"10,000 × .04 × 3/12 = $100."),
 Q("What is a practical purpose of a CD ladder?",["Guarantee maximum return","Spread maturity dates and access to funds","Avoid reading terms","Eliminate inflation"],1,"Staggered maturities can align with spending needs.")],
 ["Deposits analyst","List maturity, withdrawal cost, renewal rules and insurer status beside the rate.","FDIC · Deposit Insurance",fdic]),
 P("Treasury bills, notes and savings bonds",
 "US Treasury products have distinct maturity, payment, tradability and redemption rules despite their common government issuer.",
 [
 "A Treasury bill normally sells at a discount or par and pays face value at maturity; its economic interest is the difference between purchase price and face value. Treasury notes generally pay fixed interest every six months. Marketable Treasury securities can be held to maturity or sold before maturity, with sale-price risk.",
 "Suppose a Treasury bill is purchased for $9,850 and matures at $10,000. The dollar interest at maturity is $150, a holding-period gain of about 1.5228% on the purchase price before tax. To calculate an annualized yield, the exact holding days and quotation convention are required; this example is not an annual rate.",
 "Series I and EE savings bonds are distinct from marketable Treasuries and have redemption and interest rules that need separate reading. Savings bonds cannot simply be sold on the secondary market in the same way as a Treasury bill. Use the specific security's official terms."
 ],
 [["Treasury bill purchase price","$9,850"],["Face value paid at maturity","$10,000"],["Dollar interest and holding-period yield","$150; $150/$9,850 ≈ 1.523%"]],
 "A Treasury bill's holding-period gain should not be presented as an APY without adjusting for maturity and yield convention.",
 "Find the differences between a 13-week bill, a two-year note and an I savings bond using their official terms.",
 [["Treasury bill","Short-term marketable government security commonly issued at a discount."],["Holding-period return","Gain relative to capital committed during an explicitly defined period."]],
 [Q("A bill bought at $9,850 paying $10,000 at maturity earns:",["$15","$150","$850","$10,000"],1,"$10,000 − $9,850 = $150."),
 Q("A Treasury bill and a Series I savings bond have identical transferability and redemption:",["True","False","Only on issue day","Only for institutions"],1,"Savings bonds have distinct holding and redemption restrictions.")],
 ["Fixed-income cash desk","Match Treasury maturity dates to actual payment needs; check marketable versus savings-bond rules before purchase.","TreasuryDirect · Treasury bills",bills]),
 P("Tax-adjusted comparisons and a down-payment reserve",
 "Tax treatment and access to principal can change product rankings more than small differences in nominal yield.",
 [
 "Interest on US Treasury marketable securities is subject to federal taxation but generally exempt from state and local income tax, while ordinary bank interest can be subject to both depending on tax circumstances. A simple after-tax yield model should state the applicable tax rates, and avoid treating all deductions as automatic.",
 "If one deposit pays a hypothetical 4.5% taxable interest yield and combined relevant tax assumptions total 25% of that interest, the simplistic after-tax rate is 3.375%. A Treasury earning 4.2% with a hypothetical 22% federal tax and no state tax yields 3.276%. These are teaching comparisons, not live rates or a full personal tax return.",
 "Money needed for a house closing in eighteen months should prioritize capital stability, liquidity and reliable maturity matching. Keep the down payment distinct from emergency reserves and closing costs. A small advertised yield premium rarely compensates for a product that blocks cash when it is urgently needed."
 ],
 [["Bank hypothetical after-tax yield","4.5% × (1 − .25) = 3.375%"],["Treasury hypothetical after-tax yield","4.2% × (1 − .22) = 3.276%"],["Other comparison variables","Liquidity, maturity date, penalties, tax eligibility"]],
 "A simplistic tax rate multiplication ignores specific tax categories, state rules and personal circumstances; verify with official guidance.",
 "Build a dated table for $12,000 needed in 18 months comparing insured deposits, a maturing Treasury and a CD with penalties.",
 [["After-tax yield","Economic yield remaining after a stated set of taxes on investment income."],["Maturity matching","Selecting asset due dates aligned to expected spending dates."]],
 [Q("A 4.5% rate taxed at a hypothetical 25% of interest yields simple after-tax rate of:",["1.125%","3.375%","4.5%","25%"],1,"4.5% × .75 = 3.375%."),
 Q("Which is the stronger default criterion for a known near-term down payment?",["Maximum speculative return","Access to principal on time with appropriate safety","No consideration of insurance","A volatile asset with higher forecast"],1,"Near-term liabilities require reliability and access.")],
 ["Treasury and tax researcher","Verify official tax treatment and product-specific access, using assumptions instead of fake current yields.","TreasuryDirect · Tax treatment",tax])
 ],
 caseStudy:{title:"Choose a home down-payment holding account",
 scenario:"A Connecticut household expects to need $18,000 in 15 months. It has no separate emergency reserve and receives offers for a variable-rate online savings account, a 12-month insured CD, a marketable Treasury bill and an investment fund falsely advertised as 'FDIC-protected cash'. Evaluate where funds can be available and what legal protections exist.",
 steps:[["Known future need","$18,000 in 15 months"],["Deposit insurance test","Bank insured; depositor, bank and ownership category verified"],["Liquidity test","Cash timing, penalty, maturity and settlement"],["Investment-fund warning","Mutual funds are not covered by FDIC deposit insurance"]],
 decision:"Write a recommendation with a separate emergency buffer, a maturity-and-liquidity schedule, and an explanation of why the investment fund's marketing statement needs correction."},
 finalChecks:[
 Q("Standard FDIC insurance is generally calculated by:",["Each account statement separately","Depositor, insured bank and ownership category","The highest quoted APY","The bank's stock ticker"],1,"Eligible balances aggregate within ownership categories at the same insured bank."),
 Q("A Treasury bill purchased for $9,850 and redeemed at $10,000 earns what dollar interest?",["$150","$850","$9,850","$10,000"],0,"Face value minus purchase price = $150."),
 Q("A home fund needed in a year should generally prioritize:",["High volatility","Liquidity and matching scheduled obligations","An unverified guaranteed investment","Unlimited leverage"],1,"Reliable access to principal is central to near-term needs.")
 ]
});
})();
