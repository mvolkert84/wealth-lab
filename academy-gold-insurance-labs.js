/* Wealth Lab v6.8 · insurance and family protection numerical workbooks
   Fictional examples, local-only and never saved or sent. */
(function(){
"use strict";
const defs={
"L5.S1":{
 title:"Life coverage, premium cash and policy-loan risk",
 description:"Compare illustrative term and permanent premium cash commitments. Capitalize loan interest annually under a simplified hypothetical contract. These values are not an insurer illustration or an actual tax assessment.",
 fields:[["termPremium","Monthly term life premium",30],["permanentPremium","Monthly permanent life premium",250],["years","Comparison horizon in years",10],["loan","Hypothetical existing policy loan",10000],["rate","Hypothetical annual policy loan interest (%)",6],["loanYears","Loan interest capitalization years",2],["deathBenefit","Illustrative policy death benefit",100000]],
 metrics:[["termCost","Total scheduled term premiums"],["permCost","Total scheduled permanent premiums"],["premiumDifference","Extra permanent premium cash used"],["loanBalance","Outstanding policy debt after interest"],["netDeath","Simplified death benefit less policy debt"]],
 questions:["Calculate the total additional permanent premiums over the comparison period","Calculate the policy loan balance after capitalized interest","Calculate the death benefit reduced by the modeled policy loan"]
},
"L5.S2":{
 title:"Storm damage, flood gap and lost wage stress test",
 description:"This is a hypothetical combined shock. Wind and flood are assumed to be distinct losses. Wind is assumed covered and the special wind deductible applies; flood coverage is a separately entered building limit, not actual policy eligibility.",
 fields:[["dwelling","Dwelling insured value",300000],["windPercent","Special wind deductible percent of insured value",2],["windLoss","Covered wind repair cost",20000],["floodLoss","Qualifying flood damage",30000],["floodLimit","Separate flood coverage limit (0 = uninsured)",0],["floodDeductible","Flood policy deductible",2000],["wages","Monthly take-home income lost",3000],["waitingMonths","Months before qualifying disability benefits",3],["cash","Accessible emergency cash",10000]],
 metrics:[["windDeductible","Applicable wind deductible dollars"],["windOwner","Owner's portion of wind claim"],["windInsurer","Modeled wind insurer payment"],["floodOwner","Owner's flood damage after modeled separate coverage"],["incomeGap","Income lost before benefit starts"],["immediateCash","Combined owner funding shock"],["reserveGap","Cash shortfall against available savings"]],
 questions:["Calculate wind deductible (percentage of dwelling amount)","Calculate total lost income during the disability waiting period","Calculate combined household funding shock, including uninsured flood"]
}
};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=x=>Number.isFinite(x)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(x):"—";
window.WealthLabInsuranceLabMarkup=function(s){
 const id=s?.id,d=defs[id];if(!d)return "";
 return '<section class="wlg-lab" aria-label="Insurance risk numerical workbook"><div class="wlg-label">INSURANCE FINANCIAL WORKBOOK · '+id+'</div><h3>'+esc(d.title)+'</h3><p class="wlg-intro">'+esc(d.description)+'</p><div class="wlg-worksheet" data-wlp="'+id+'">'+
 '<details open class="wlg-details"><summary>01 · Adjust the assumed amounts</summary><div class="wlg-grid">'+d.fields.map(([k,label,n])=>'<label class="wlg-field"><span>'+esc(label)+'</span><span class="wlg-money-input"><input type="number" inputmode="decimal" step="0.01" value="'+n+'" data-wlp-field="'+k+'" aria-label="'+esc(label)+'"></span></label>').join("")+'</div></details>'+
 '<details open class="wlg-details"><summary>02 · Calculate the protection and shortfall</summary><div class="wlg-metrics" aria-live="polite">'+d.metrics.map(([k,label])=>'<div><span>'+esc(label)+'</span><strong data-wlp-output="'+k+'">—</strong></div>').join("")+'</div><p class="wlg-caution" data-wlp-warning></p></details>'+
 '<details class="wlg-details"><summary>03 · Solve the questions yourself</summary><div class="wlg-challenges">'+d.questions.map((q,i)=>'<label>'+(i+1)+'. '+esc(q)+'<input type="number" inputmode="decimal" step="0.01" placeholder="Answer in dollars" data-wlp-answer="'+i+'"></label>').join("")+
 '<button type="button" class="wlg-check" data-wlp-check>Check my calculations</button><div class="wlg-feedback" role="status" aria-live="polite" data-wlp-feedback>Enter your own calculations first. Exercises are not graded toward saved mastery.</div></div></details>'+
 '<div class="wlg-footer"><button type="button" class="wlg-reset" data-wlp-reset>Restore fictional figures</button><span>Personal inputs are neither saved nor transmitted.</span></div></div></section>';
};
function read(root){
 const d=defs[root.dataset.wlp],v={};let valid=true;
 for(const [k]of d.fields){const el=root.querySelector('[data-wlp-field="'+k+'"]');const raw=el?.value?.trim()||"";const n=raw===""?NaN:Number(raw);v[k]=n;if(!Number.isFinite(n)||n<0)valid=false;}
 if(root.dataset.wlp==="L5.S1"&&(v.years>80||v.loanYears>80||v.rate>100||v.loan>v.deathBenefit*10))valid=false;
 if(root.dataset.wlp==="L5.S2"&&(v.windPercent>100||v.waitingMonths>120))valid=false;
 return{v,valid};
}
function calculate(root){
 const{v,valid}=read(root);let out={},targets=[],note="";
 if(valid&&root.dataset.wlp==="L5.S1"){
  const termCost=v.termPremium*12*v.years,permCost=v.permanentPremium*12*v.years;
  const loanBalance=v.loan*Math.pow(1+v.rate/100,v.loanYears);
  out={termCost,permCost,premiumDifference:permCost-termCost,loanBalance,netDeath:Math.max(0,v.deathBenefit-loanBalance)};
  targets=[out.premiumDifference,loanBalance,out.netDeath];
  note="Simple modeled death benefit is reduced by loan debt, never increased by cash value automatically. Actual policy loan rates, credited values, taxes, charges and guarantees may differ.";
 }else if(valid&&root.dataset.wlp==="L5.S2"){
  const special=v.dwelling*v.windPercent/100;
  const windOwner=Math.min(v.windLoss,special);
  const windInsurer=Math.max(0,v.windLoss-windOwner);
  const floodInsurer=v.floodLimit>0?Math.min(v.floodLimit,Math.max(0,v.floodLoss-v.floodDeductible)):0;
  const floodOwner=v.floodLoss-floodInsurer;
  const incomeGap=v.wages*v.waitingMonths;
  const immediateCash=windOwner+floodOwner+incomeGap;
  out={windDeductible:special,windOwner,windInsurer,floodOwner,incomeGap,immediateCash,reserveGap:Math.max(0,immediateCash-v.cash)};
  targets=[special,incomeGap,immediateCash];
  note=v.floodLimit===0?"No separate flood protection is assumed. Standard homeowners insurance ordinarily excludes flood; verify any real contract.":"The flood limit is a modeled qualified building limit. Actual claims have eligibility, separate deductibles, exclusions, waiting periods and coverage classifications.";
 }
 for(const el of root.querySelectorAll("[data-wlp-output]"))el.textContent=money(out[el.dataset.wlpOutput]);
 const warn=root.querySelector("[data-wlp-warning]");
 if(warn)warn.textContent=valid?note:"Enter nonnegative, finite values. Percentage and term fields must be within realistic input ranges; no actual insurer coverage is decided here.";
 return{valid:valid&&targets.every(Number.isFinite),targets};
}
function check(root){
 const box=root.querySelector("[data-wlp-feedback]"),{valid,targets}=calculate(root);if(!box)return;
 if(!valid){box.textContent="Correct the model assumptions before checking.";return;}
 let score=0;const reports=targets.map((n,i)=>{const raw=root.querySelector('[data-wlp-answer="'+i+'"]')?.value?.trim()||"";
 const correct=raw!==""&&Number.isFinite(Number(raw))&&Math.abs(Number(raw)-n)<=1.01;if(correct)score++;
 return(correct?"Correct":"Review")+" #"+(i+1)+": "+money(n)+".";
 });
 box.textContent=score+" of 3 correct. "+reports.join(" ")+" Actual policy benefits still require contract and eligibility review.";
}
document.addEventListener("input",e=>{
 const root=e.target?.closest?.("[data-wlp]");if(root&&e.target.matches("[data-wlp-field]"))calculate(root);
});
document.addEventListener("click",e=>{
 const b=e.target?.closest?.("[data-wlp-check],[data-wlp-reset]");if(!b)return;
 const root=b.closest("[data-wlp]");if(!root)return;
 if(b.hasAttribute("data-wlp-check"))check(root);
 else{
  for(const[k,,value]of defs[root.dataset.wlp].fields)root.querySelector('[data-wlp-field="'+k+'"]').value=value;
  for(const el of root.querySelectorAll("[data-wlp-answer]"))el.value="";
  const box=root.querySelector("[data-wlp-feedback]");if(box)box.textContent="The original fictional figures were restored. Solve the questions again.";
  calculate(root);
 }
});
const observer=new MutationObserver(()=>{for(const root of document.querySelectorAll("[data-wlp]"))if(!root.dataset.wlpReady){root.dataset.wlpReady="yes";calculate(root)}});
if(document.documentElement)observer.observe(document.documentElement,{childList:true,subtree:true});
})();