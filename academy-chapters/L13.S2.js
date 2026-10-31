/* Wealth Lab Academy · Deep textbook L13.S2: Life Insurance and Policy Loans */
(function(){
const Q=(q,options,answer,why)=>({q,options,answer,why});
const P=(heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight)=>({heading,concept,paragraphs,example,pitfall,exercise,terms,checks,insight});
const naic="https://content.naic.org/consumer/life-insurance.htm";
const ny="https://www.dfs.ny.gov/faqs/consumer_faqs/life_insurance?page=2";
WealthLabRegisterDeepChapter({
 id:"L13.S2",title:"Permanent Life Insurance and Policy Loans: Cash Value, Taxes, Trusts and Trade-Offs",
 sources:[naic,ny,"https://content.naic.org/insurance-topics/life-insurance"],
 parts:[
 P("Start with the protection need, not the borrowing pitch",
 "Life insurance first transfers the financial risk of death; permanent cash value is an added contractual feature with costs.",
 [
 "Term insurance generally provides coverage for a specified period with no accumulating cash value. Permanent forms—including whole life and certain universal life products—may provide lifelong coverage if premiums and policy terms are maintained. The premiums often support insurance costs, expenses and a cash-value component, but products differ substantially.",
 "Someone deciding how to protect a child or partner should estimate income replacement, outstanding debts, care costs and existing resources before choosing a product. A policy's advertised borrowing feature does not prove that it provides affordable protection or that it is the fastest route to a home down payment.",
 "Insurance illustrations should distinguish guaranteed cash values and death benefits from non-guaranteed dividends, index credits or assumptions. A flexible-premium universal-life plan may require additional funding if experience is unfavorable. A low initial premium is not automatically affordable for decades."
 ],
 [["Example insurance need","$250,000 assumed family obligation"],["Existing resources available to survivors","$50,000"],["Simplified protection gap","$200,000 before additional adjustments"]],
 "Do not confuse 'permanent' with 'cannot lapse'; missed premiums, policy expenses and loans may jeopardize coverage.",
 "List every financial obligation survivors would face and compare term and permanent quotes for the same appropriate face amount.",
 [["Term insurance","Protection for a stated duration, generally without cash accumulation."],["Permanent insurance","Insurance designed to continue while contractual conditions and required funding are met."]],
 [Q("The primary purpose of life insurance is to:",["Guarantee a home down payment","Transfer financial consequences of death","Provide an FDIC-insured savings account","Eliminate taxes automatically"],1,"Life insurance is first a death-risk protection contract."),
  Q("Which part of a policy illustration needs special caution?",["The insurer's contact details","Non-guaranteed dividends and projected cash values","The named insured","The issue date"],1,"Projected nonguaranteed values may not occur.")],
 ["Insurance planner","Estimate protection needs before choosing between term and permanent products; the least expensive premium today may not be the best lifetime fit.","NAIC · Life Insurance Consumer Guide",naic]),
 P("How premiums turn into cash value",
 "Premium dollars are not instantly available dollar-for-dollar; insurance charges and other costs affect the surrender value.",
 [
 "A cash-value policy's premium is not equivalent to a savings deposit. Insurance charges, administrative expenses, commissions, rider costs and product design influence how the value grows. Whole life policies often disclose guaranteed tables; universal life contracts vary widely and may separate policy account value, surrender value and accumulated premiums.",
 "For a purely hypothetical illustration, $350 a month for ten years totals $42,000 in premium payments. If a specific sample illustration projected $30,000 of available surrender value at that time, it would be wrong to describe the policy as holding $42,000 of ready cash. A different product could show a very different result.",
 "Cash value, loan value, surrender value and face amount must be read separately. Some policies impose surrender charges; the available loan amount may be less than cash value. Request annual schedules showing guaranteed and nonguaranteed results and the cost of maintaining coverage."
 ],
 [["Hypothetical premium","$350 per month for 120 months"],["Total premium dollars","$42,000"],["Illustrative surrender value after 10 years","$30,000 (not a market quote or actual projection)"]],
 "A policy is not proven profitable or tax efficient merely because its internal cash value increases over time.",
 "Request two competing insurers' guaranteed and non-guaranteed year-by-year illustrations at the same benefit amount and premium budget.",
 [["Cash value","Policy account or contractual accumulation value governed by its terms."],["Surrender value","Amount available if coverage is terminated, after relevant charges and loans."]],
 [Q("At $350 monthly over ten years, total premiums paid equal:",["$3,500","$35,000","$42,000","$30,000"],2,"$350 × 12 × 10 = $42,000."),
  Q("Why might surrender value be less than premiums paid?",["Insurance costs and charges","Every policy has a guaranteed investment return","Premiums are not paid to the insurer","No product has fees"],0,"Coverage costs and policy structure consume part of the funding.")],
 ["Policy analysis","Show premiums, guaranteed cash value, projected cash value, surrender charges and benefit amounts side by side in a year-by-year table.","NAIC · Life Insurance Consumer Guide",naic]),
 P("How borrowing against a policy really works",
 "A policy loan is debt secured by contract value; interest and outstanding balances reduce economic benefits.",
 [
 "A qualifying owner may borrow from an insurer using a policy's accumulated value as collateral, subject to product terms and available loan value. Unlike a bank home mortgage, the insurer's policy loan may have no fixed repayment schedule in some contracts, but interest is still charged and excessive indebtedness can reduce benefits or help cause lapse.",
 "Imagine a $300,000 policy death benefit and a $20,000 outstanding loan at 6% simple interest for one assumed year. If the interest is added, the illustrative outstanding balance becomes $21,200. If no other terms change and death occurs then, a simplified death benefit after the loan would be $278,800, not $300,000 plus the full cash value.",
 "Some policy designs use direct recognition or non-direct recognition when calculating dividends or crediting while loans are outstanding. Such features change contract economics; they do not prove that the borrowed funds are costless, that cash value is untouched for every purpose, or that the investment return exceeds loan interest."
 ],
 [["Stated death benefit","$300,000"],["Loan plus one-year assumed 6% interest","$20,000 + $1,200 = $21,200"],["Illustrative death benefit after loan","$278,800"]],
 "Policy-loan rates may change, interest may compound and accumulated indebtedness can approach cash value. The simplified illustration omits other policy mechanics.",
 "Sketch the three parties—policyholder, insurer and beneficiary—and show where collateral, loan interest and reduced benefit appear.",
 [["Policy loan","Debt advanced by an insurer and secured by policy value under contract terms."],["Direct recognition","Method under which a participating policy may adjust dividends on loan-affected value."]],
 [Q("A $20,000 policy loan at 6% for one simple-interest year produces interest of:",["$120","$600","$1,200","$6,000"],2,"6% of $20,000 is $1,200."),
  Q("How does an outstanding policy loan generally affect death benefits?",["It is usually deducted with interest","It doubles the benefit","It is always ignored","It turns the policy into a bank deposit"],0,"Outstanding loan and interest normally reduce the payable benefit.")],
 ["Insurance auditor","Demand the loan provision, interest schedule and an illustration with the planned borrowing pattern, including worst-case lapse timing.","New York DFS · Policy loans",ny]),
 P("Tax treatment, MEC status and lapse risk",
 "Tax rules depend on product design, basis, policy classification, distributions and whether the policy remains in force.",
 [
 "A non-modified-endowment-contract life policy loan may often avoid immediate federal income taxation while the policy remains qualifying and in force, but there are important exceptions and conditions. A modified endowment contract has special distribution ordering and potential tax consequences; early distributions may carry additional taxes depending on facts.",
 "If a heavily borrowed policy lapses or is surrendered, the outstanding borrowing can create taxable income to the extent the amount realized exceeds applicable investment in the contract—even if the owner does not receive new cash that day. This makes an aggressive 'borrow, never repay' strategy potentially hazardous.",
 "For illustration only, a $10,000 loan compounding at 6% annually without payments would grow to about $13,382 after five years, ignoring any policy-specific credits and charges. A claimed spread between policy crediting and loan cost is not the same as accessible, guaranteed net wealth."
 ],
 [["Initial illustrative policy loan","$10,000"],["Assumed unpaid annual compounding","6% for five years"],["Illustrative balance","≈ $13,382"]],
 "Do not treat policy borrowing as automatically tax-free in every circumstance; loan structure, MEC status and lapse matter.",
 "Locate the contract's modified-endowment status, loan rate rules, premium requirements and a stress illustration after several years of unpaid loan interest.",
 [["Modified endowment contract (MEC)","Life policy subject to special distribution tax treatment after failing statutory premium tests."],["Policy lapse","Termination of insurance when contract funding or other requirements are not met."]],
 [Q("Unpaid $10,000 loan principal compounding 6% for five years is approximately:",["$10,000","$11,000","$13,382","$20,000"],2,"$10,000 × 1.06^5 ≈ $13,382."),
  Q("What is a major potential tax problem with a highly leveraged policy lapse?",["All gains become tax-exempt","Taxable gain can arise without a corresponding cash payment","The loan interest becomes guaranteed zero","The insurer must forgive the debt"],1,"Loan proceeds can be part of a taxable surrender/lapse calculation under applicable rules.")],
 ["Tax reviewer","Have an independent qualified tax professional review MEC status, distributions, basis and lapse scenarios before assuming tax advantages.","NAIC · Life Insurance Consumer Guide",naic]),
 P("Trust ownership is not free asset protection",
 "A trust changes legal control and beneficiary arrangements; it cannot erase liens, premiums, tax law or creditor rights by labeling property differently.",
 [
 "A revocable living trust can help organize an estate and, depending on state law and titling, may avoid probate for assets properly placed within it. Because its creator generally retains control, it often offers limited protection against the creator's creditors and is not automatic estate-tax removal.",
 "An irrevocable life insurance trust may hold a policy for specific planning objectives, but transferred rights and incidents of ownership, gift rules, beneficiary terms and trustee powers must be analyzed. Ownership and control may be intentionally restricted; the arrangement does not imply that a person can freely borrow and retrieve every dollar without consequences.",
 "Putting a home into a trust also does not automatically remove a mortgage, eliminate property taxes, shield the home from all claims, or avoid lender/insurance issues. A Connecticut estate-planning attorney should review deed recording, trust language, beneficiaries, mortgages and any relevant state or federal law."
 ],
 [["Revocable trust","Often flexible control; limited creator-creditor insulation"],["Irrevocable insurance trust","Potential estate objectives with restricted ownership/control"],["Home held in trust","Mortgage, taxes and proper titling still matter"]],
 "Transferring a policy shortly before death, retaining prohibited rights or assuming automatic trust protection can undermine intended tax and estate results.",
 "Draft questions for a Connecticut estate lawyer about title, policy ownership, beneficiary designations, creditors, trustee control and mortgage consent.",
 [["Incidents of ownership","Contract powers such as changing beneficiaries or certain control rights relevant to estate-tax analysis."],["Revocable living trust","Trust generally amendable or revocable by the settlor under its terms."]],
 [Q("Putting an existing mortgage-financed house into a trust automatically:",["Cancels the mortgage","Stops property taxes","Does neither","Guarantees full creditor protection"],2,"Legal ownership arrangements do not automatically eliminate secured debt or taxes."),
  Q("Why can an irrevocable life-insurance trust limit flexibility?",["It necessarily has no beneficiaries","The original owner may surrender control or borrowing rights","No trustee is required","Every policy loan becomes free"],1,"Trust ownership and control rights must align with its purpose and governing law.")],
 ["Estate counsel","Coordinate policy ownership, trust drafting, beneficiaries, tax consequences and title with an attorney; do not rely on sales diagrams.","NAIC · Life Insurance and beneficiaries",naic]),
 P("Compare insurance borrowing with savings, investing and home finance",
 "A serious strategy compares the net outcomes under the same budget, dates, risks and insurance needs.",
 [
 "For a household able to set aside $250–$500 a month, the first question is what the money must accomplish. A home fund needed within a few years generally values certainty and access. A retirement portfolio has a longer horizon. Insurance protection may be essential, but the permanent-policy premiums needed for meaningful cash value can compete with other savings.",
 "Compare at least three designs: adequate term protection plus separate cash/investments; a conservatively funded permanent policy with no planned loan; and a permanent policy with specific borrowing and repayment assumptions. Model premiums, surrender values, death benefits, financing rates, taxes, liquidity, missed payments and what happens under adverse crediting assumptions.",
 "If the purpose is a house purchase, a policy loan is still borrowed money and may affect lender underwriting, collateral and financial resilience. New policies commonly start with limited accessible value. Do not assume that a recent $300 monthly premium stream instantly produces a five-figure down payment."
 ],
 [["Illustrative household savings budget","$250–$500 per month"],["One-year funding range","$3,000–$6,000, if consistently saved"],["Recommended analysis","Compare liquidity, protection, borrowing cost, downside and estate goals"]],
 "A strategy marketed as infinite banking or 'be your own bank' is not exempt from financing costs, insurance expenses or downside risk.",
 "Build a 10-year comparison table for term-plus-investing, permanent insurance without borrowing, and permanent insurance with a loan. Include worst-case lapse effects.",
 [["Opportunity cost","Benefit forgone by using the budget for premiums rather than another objective."],["Policy illustration","Insurer's projection of benefits and values under specified guaranteed and nonguaranteed assumptions."]],
 [Q("$250 monthly accumulated as cash over one year before interest equals:",["$250","$1,500","$3,000","$6,000"],2,"$250 × 12 months = $3,000."),
  Q("What is the most complete way to compare a policy loan to a mortgage or savings strategy?",["Only look at loan interest","Include premiums, cash value, interest, risks, flexibility, death benefit and tax outcomes","Compare the marketing slogans","Count credit as cash"],1,"The full lifetime financial picture determines usefulness.")],
 ["Independent planning","Request in-force and new-policy illustrations, compare three strategies, and verify every tax assumption with qualified independent advisers.","NAIC · Consumer Life Insurance",naic])
 ],
 caseStudy:{title:"Could a new cash-value policy fund a home?",
 scenario:"A household plans to save $350 monthly and hopes to purchase a home in three years while also protecting a child. A hypothetical permanent policy quote requires the same premium, but its early loan value is uncertain and it carries ongoing charges. Term protection plus a dedicated insured home fund is an alternative.",
 steps:[["Cash saved over 36 months before interest","$350 × 36 = $12,600"],["Permanent policy budget","$350 monthly premiums; loan value depends on illustration"],["Potential financing cost","Any actual policy loan carries contractual interest and collateral risk"],["Essential comparison","Coverage needs, accessible down payment, reserves, fees and lapse stress"]],
 decision:"Write a comparison memo, not a sales pitch. Explain why saving $12,600 in a transparent accessible account is different from paying $12,600 in premiums, and identify scenarios in which permanent insurance might nevertheless fit."},
 finalChecks:[
 Q("What is the key financial distinction between a policy loan and withdrawing cash from an ordinary savings account?",["A policy loan is debt secured by policy value","Both are always debt","A policy loan has no interest","Savings withdrawals create insurance benefits"],0,"Borrowing from an insurer creates an outstanding obligation and financing cost."),
 Q("Which is generally correct about cash value and the policy's death benefit?",["Beneficiaries always receive the sum of both","Unpaid loans with interest are normally deducted from benefit","Policy loans cannot affect a lapse","Cash value equals premiums by year one"],1,"The underlying benefit and loan provisions determine the payable amount."),
 Q("Which comparison is most defensible for a new policy intended to fund a home?",["Take sales projections as guaranteed","Compare guaranteed/nonguaranteed values and separate savings alternatives using the same budget","Ignore early cash value","Assume irrevocable trusts allow unrestricted loans"],1,"A realistic strategy is built from the complete contract, alternatives and stress cases.")
 ]
});
})();
