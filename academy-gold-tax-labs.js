/* Wealth Lab v6.9 · Taxes and Advanced Strategies independent numerical workbooks
 * Fictional data only; no network calls, persistence or personal tax determinations.
 */
(function(){
"use strict";
const books={
"L6.S1":{title:"Taxes, deductions and home-sale arithmetic",intro:"Estimate a simple deductible expense effect and a property sale's cash versus gain. This model assumes the expense qualifies and a constant marginal tax rate; real eligibility, tax brackets, home exclusion and itemization differ.",
fields:[["deduction","Assumed eligible additional deduction",1000],["rate","Hypothetical applicable marginal rate (%)",22],["credit","Assumed eligible nonrefundable credit",0],["liability","Tax liability before credit",2500],["price","Home sale price",300000],["sell","Qualifying selling costs",18000],["basis","Adjusted home tax basis",220000],["mortgage","Total secured payoff at closing",150000]],
metrics:[["taxSaving","Simplified marginal deduction effect"],["creditUsed","Nonrefundable credit actually usable"],["netCost","Net cost of the deducted expense"],["closingCash","Simplified sale cash after payoff"],["saleGain","Simplified home gain before exclusion"]],
qs:["Tax reduction attributable to the eligible deduction","Closing cash after selling costs and secured payoff","Home sale gain before any statutory exclusion"]},
"L6.S2":{title:"Trust, home equity and insurance-loan downside",intro:"Model debts alongside the value of a home, and track compounding on a policy loan. A trust name does not change these numeric obligations. This worksheet cannot determine actual mortgage rules, trust tax status or insurer contract guarantees.",
fields:[["home","Home value before market stress",250000],["fall","Hypothetical home value decline (%)",10],["first","First mortgage balance",150000],["second","Assistance or other secured lien",20000],["loan","Policy loan principal",10000],["rate","Illustrative policy loan interest (%)",6],["years","Years interest compounds unpaid",2],["benefit","Contract death benefit before policy debt",100000]],
metrics:[["houseAfter","Stressed home value"],["homeEquity","Home equity after liens and stress"],["policyDebt","Policy borrowing after modeled interest"],["deathNet","Simple death benefit net of policy debt"],["combined","Home equity minus separate policy loan"]],
qs:["Stressed house equity after both property liens","Policy loan balance after compounded interest","House equity minus outstanding policy debt"]}
};
const money=n=>Number.isFinite(n)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n):"—";
const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
window.WealthLabTaxStrategyLabMarkup=function(s){
 const id=s?.id,d=books[id];if(!d)return"";
 return '<section class="wlg-lab" aria-label="Tax and legal strategy independent workbook"><div class="wlg-label">TAX & STRATEGY PRACTICE · '+id+'</div><h3>'+escape(d.title)+'</h3><p class="wlg-intro">'+escape(d.intro)+'</p><div class="wlg-worksheet" data-wlt="'+id+'">'+
 '<details open class="wlg-details"><summary>01 · Set your hypothetical amounts</summary><div class="wlg-grid">'+d.fields.map(([k,label,v])=>'<label class="wlg-field"><span>'+escape(label)+'</span><span class="wlg-money-input"><input type="number" step="0.01" inputmode="decimal" data-wlt-field="'+k+'" aria-label="'+escape(label)+'" value="'+v+'"></span></label>').join("")+'</div></details>'+
 '<details open class="wlg-details"><summary>02 · Work through the numbers</summary><div class="wlg-metrics" aria-live="polite">'+d.metrics.map(([k,label])=>'<div><span>'+escape(label)+'</span><strong data-wlt-output="'+k+'">—</strong></div>').join("")+'</div><p class="wlg-caution" data-wlt-warning></p></details>'+
 '<details class="wlg-details"><summary>03 · Solve independently</summary><div class="wlg-challenges">'+d.qs.map((q,i)=>'<label>'+(i+1)+'. '+escape(q)+'<input type="number" inputmode="decimal" step="0.01" data-wlt-answer="'+i+'" placeholder="Dollar answer"></label>').join("")+'<button type="button" class="wlg-check" data-wlt-check>Check my calculations</button><div class="wlg-feedback" role="status" aria-live="polite" data-wlt-feedback>Work through the equation yourself; checking is local and unsaved.</div></div></details>'+
 '<div class="wlg-footer"><button type="button" class="wlg-reset" data-wlt-reset>Restore example values</button><span>This calculator is educational, not an income-tax return or legal opinion.</span></div></div></section>';
};
function compute(root){
 const d=books[root.dataset.wlt],v={};let valid=true;
 for(const[k]of d.fields){const el=root.querySelector('[data-wlt-field="'+k+'"]'),raw=el?.value?.trim()||"",n=raw===""?NaN:Number(raw);v[k]=n;if(!Number.isFinite(n)||n<0)valid=false}
 if(root.dataset.wlt==="L6.S1"&&(v.rate>100||v.sell>v.price||v.credit>1e8))valid=false;
 if(root.dataset.wlt==="L6.S2"&&(v.fall>100||v.rate>100||v.years>80||v.loan>1e9))valid=false;
 let out={},answers=[],warning="";
 if(valid&&root.dataset.wlt==="L6.S1"){
  const taxSaving=v.deduction*v.rate/100,creditUsed=Math.min(v.liability,v.credit);
  const closingCash=v.price-v.sell-v.mortgage,saleGain=v.price-v.sell-v.basis;
  out={taxSaving,creditUsed,netCost:v.deduction-taxSaving,closingCash,saleGain};
  answers=[taxSaving,closingCash,saleGain];
  warning="Eligibility, brackets, existing itemization, credits and any home-sale exclusion require actual IRS rules. Home loan payoff changes cash, not gain basis directly.";
 }else if(valid&&root.dataset.wlt==="L6.S2"){
  const houseAfter=v.home*(1-v.fall/100),homeEquity=houseAfter-v.first-v.second;
  const policyDebt=v.loan*Math.pow(1+v.rate/100,v.years),deathNet=Math.max(0,v.benefit-policyDebt);
  out={houseAfter,homeEquity,policyDebt,deathNet,combined:homeEquity-policyDebt};
  answers=[homeEquity,policyDebt,out.combined];
  warning="An insurer's actual benefit, credited values, policy lapse, taxes, lien priority and property transfer rights depend on signed documents. Loans remain liabilities.";
 }
 for(const e of root.querySelectorAll("[data-wlt-output]"))e.textContent=money(out[e.dataset.wltOutput]);
 const w=root.querySelector("[data-wlt-warning]");
 if(w)w.textContent=valid?warning:"Use nonnegative, finite values. Percentages cannot exceed 100 and compounding years must be within the illustrated bounds.";
 return{valid:valid&&answers.every(Number.isFinite),answers};
}
function check(root){const{valid,answers}=compute(root),b=root.querySelector("[data-wlt-feedback]");if(!b)return;if(!valid){b.textContent="Correct model inputs first.";return;}
 let score=0;const result=answers.map((n,i)=>{const raw=root.querySelector('[data-wlt-answer="'+i+'"]')?.value?.trim()||"";const correct=raw!==""&&Number.isFinite(Number(raw))&&Math.abs(Number(raw)-n)<=1.01;if(correct)score++;return(correct?"Correct":"Review")+" #"+(i+1)+": "+money(n)+".";});b.textContent=score+" of 3 correct. "+result.join(" ")+" Actual taxes and policy benefits are not determined by this model.";
}
document.addEventListener("input",e=>{const root=e.target?.closest?.("[data-wlt]");if(root&&e.target.matches("[data-wlt-field]"))compute(root)});
document.addEventListener("click",e=>{const b=e.target?.closest?.("[data-wlt-check],[data-wlt-reset]");if(!b)return;const root=b.closest("[data-wlt]");if(!root)return;
 if(b.hasAttribute("data-wlt-check"))check(root);else{for(const[k,,n]of books[root.dataset.wlt].fields)root.querySelector('[data-wlt-field="'+k+'"]').value=n;for(const el of root.querySelectorAll("[data-wlt-answer]"))el.value="";root.querySelector("[data-wlt-feedback]").textContent="Examples reset. Solve the questions before checking.";compute(root);}
});
const observer=new MutationObserver(()=>{for(const root of document.querySelectorAll("[data-wlt]"))if(!root.dataset.wltReady){root.dataset.wltReady="yes";compute(root)}});
if(document.documentElement)observer.observe(document.documentElement,{childList:true,subtree:true});
})();