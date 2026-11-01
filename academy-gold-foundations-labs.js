/* Wealth Lab · Three private interactive gold-edition calculation labs.
   L1.S2: paycheck timing; L1.S3: compound deposit model; L1.S4: installment debt.
   Values remain in page inputs only. These fictional models are not advice. */
(function(){
"use strict";
const defs={
"L1.S2":{
title:"Paycheck timing and bill calendar",desc:"Model the first bill before payday and the month-end balance. This is deliberately a small calendar: other spending is assumed to occur after the first paycheck and any other dates must be checked separately.",
fields:[["opening","Opening bank cash",500],["rent","Rent due",1200],["rentday","Rent due day (1–31)",3],["payday","First payday (1–31)",10],["pay1","First net paycheck",1400],["pay2","Second net paycheck",1400],["other","Remaining monthly spending",1400]],
metrics:[["close","Modeled month-end cash"],["early","Cash before next paycheck / rent"],["gap","Immediate rent funding shortfall"]],
questions:[["q1","Enter the modeled month-end cash"],["q2","Enter the rent shortfall before the first payday"],["q3","Enter cash immediately after rent and before payday (it may be negative)"]]
},
"L1.S3":{
title:"Compound growth and contribution lab",desc:"Use a smooth nominal annual return as a hypothetical mathematical assumption, not a guarantee of any investment. Contributions occur at each month's end, and fees are approximated as an annual reduction to return.",
fields:[["initial","Initial balance",5000],["monthly","Monthly deposit",250],["annual","Assumed nominal annual rate (%)",6],["years","Years",20],["fees","Annual fee drag in percentage points",0.5],["inflation","Inflation assumption (%)",3]],
metrics:[["deposits","Total principal contributed"],["gross","Modeled ending balance before fee drag"],["net","Modeled balance after fee drag"],["real","After-fee ending balance in today's dollars"]],
questions:[["q1","Enter total dollars contributed (including initial balance)"],["q2","Enter modeled ending balance after fee drag (nearest dollar accepted)"],["q3","Enter after-fee balance in today's purchasing power (nearest dollar accepted)"]]
},
"L1.S4":{
title:"Installment loan amortization lab",desc:"This calculates a fixed-rate, equal-payment loan with no origination charges, insurance, taxes, rate changes or early repayment. An actual credit agreement and APR may include other costs.",
fields:[["principal","Amount borrowed",12000],["apr","Nominal annual interest rate (%)",6],["months","Number of monthly payments",24],["cash","Monthly take-home income",2800]],
metrics:[["payment","Modeled monthly loan payment"],["firstInterest","First month's interest"],["firstPrincipal","First payment principal reduction"],["totalInterest","Total scheduled interest"],["share","Payment as share of take-home income"]],
questions:[["q1","Enter first-month interest (nearest cent accepted)"],["q2","Enter first payment's principal reduction (nearest cent accepted)"],["q3","Enter total scheduled interest (nearest dollar accepted)"]]
}
};
const esc=x=>String(x).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const usd=n=>Number.isFinite(n)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n):"—";
const fmt=(name,value)=>name==="share"?(Number.isFinite(value)?value.toFixed(1)+"%":"—"):usd(value);
function inputHtml(id,[name,label,value]){
 const days=name.endsWith("day"),integer=days||name==="years"||name==="months";
 return '<label class="wlg-field"><span>'+esc(label)+'</span><span class="wlg-money-input"><input type="number" min="0" inputmode="decimal" step="'+(integer?"1":"0.01")+'" data-wlg2-input="'+name+'" value="'+value+'" aria-label="'+esc(label)+'"></span></label>';
}
window.WealthLabGoldLabV2Markup=function(s){
 const id=s?.id,d=defs[id];
 if(!d)return "";
 return '<section class="wlg-lab" aria-label="Gold standard interactive finance workbook"><div class="wlg-label">INDEPENDENT NUMERICAL WORKBOOK · '+esc(id)+'</div><h3>'+esc(d.title)+'</h3><p class="wlg-intro">'+esc(d.desc)+'</p><div class="wlg-worksheet" data-wlg2="'+id+'">'+
 '<details class="wlg-details" open><summary>01 · Change the scenario assumptions</summary><div class="wlg-grid">'+d.fields.map(x=>inputHtml(id,x)).join('')+'</div></details>'+
 '<details class="wlg-details" open><summary>02 · Inspect the modeled outcomes</summary><div class="wlg-metrics" aria-live="polite">'+d.metrics.map(([name,label])=>'<div><span>'+esc(label)+'</span><strong data-wlg2-output="'+name+'">—</strong></div>').join('')+'</div><p class="wlg-caution" data-wlg2-caution></p></details>'+
 '<details class="wlg-details"><summary>03 · Solve three calculations yourself</summary><div class="wlg-challenges">'+d.questions.map(([name,label])=>'<label>'+esc(label)+'<input type="number" inputmode="decimal" step="0.01" data-wlg2-answer="'+name+'" placeholder="Enter a number without $"></label>').join('')+
 '<button class="wlg-check" type="button" data-wlg2-check>Check my calculations</button><div class="wlg-feedback" data-wlg2-feedback aria-live="polite" role="status">Enter your own answers and check the reasoning.</div></div></details>'+
 '<div class="wlg-footer"><button class="wlg-reset" type="button" data-wlg2-reset>Restore demo values</button><span>Inputs never leave this page or change your course mastery.</span></div></div></section>';
};
function numbers(root){
 const v={};let valid=true;const d=defs[root.dataset.wlg2];
 for(const [key] of d.fields){const x=root.querySelector('[data-wlg2-input="'+key+'"]');const val=x?.value?.trim()===""?NaN:Number(x.value);v[key]=val;if(!Number.isFinite(val)||val<0)valid=false;}
 if(d===defs["L1.S2"]&&(v.rentday<1||v.rentday>31||v.payday<1||v.payday>31||!Number.isInteger(v.rentday)||!Number.isInteger(v.payday)))valid=false;
 if(d===defs["L1.S3"]&&(v.years>70||v.years<0||v.annual>100||v.fees>100||v.inflation>100))valid=false;
 if(d===defs["L1.S4"]&&(v.months<1||v.months>600||!Number.isInteger(v.months)||v.apr>100))valid=false;
 return {v,valid};
}
function model(root){
 const id=root.dataset.wlg2, {v,valid}=numbers(root);let out={},targets=[],message="";
 if(valid&&id==="L1.S2"){
  const before=v.rentday<v.payday?v.opening-v.rent:v.opening+v.pay1-v.rent;
  const gap=Math.max(0,-before);
  out={close:v.opening+v.pay1+v.pay2-v.rent-v.other,early:before,gap};
  targets=[out.close,gap,before];
  message=v.rentday<v.payday?"Rent is assumed due before the first paycheck. An insufficient balance means the household must solve timing before the due date.":"Rent is modeled after the first paycheck; verify that exact deposits clear before the rent payment and that other bills do not precede it.";
 }else if(valid&&id==="L1.S3"){
  const n=v.years*12,r=v.annual/1200,rf=(v.annual-v.fees)/1200;
  const depositFV=(rate)=>Math.abs(rate)<1e-10?v.monthly*n:v.monthly*(Math.pow(1+rate,n)-1)/rate;
  const fv=(rate)=>v.initial*Math.pow(1+rate,n)+depositFV(rate);
  if(rf<=-1/12)message="This combination creates an unrealistic negative modeled monthly factor. Choose a less extreme rate.";
  else{
   const gross=fv(r),net=fv(rf),real=net/Math.pow(1+v.inflation/100,v.years);
   out={deposits:v.initial+n*v.monthly,gross,net,real};targets=[out.deposits,out.net,out.real];
   message="Constant-rate model only: no taxes, variable market losses, skipped contributions or account-specific fees beyond the approximate fee drag.";
  }
 }else if(valid&&id==="L1.S4"){
  const r=v.apr/1200,n=v.months;
  const payment=r===0?v.principal/n:v.principal*r/(1-Math.pow(1+r,-n));
  const firstInterest=v.principal*r,firstPrincipal=payment-firstInterest;
  const totalInterest=payment*n-v.principal;
  out={payment,firstInterest,firstPrincipal,totalInterest,share:v.cash?payment/v.cash*100:NaN};
  targets=[firstInterest,firstPrincipal,totalInterest];
  message="Payment and interest estimates assume the stated rate is the periodic interest basis and there are no fees. Actual APR and amortization may differ.";
 }
 for(const el of root.querySelectorAll("[data-wlg2-output]"))el.textContent=fmt(el.dataset.wlg2Output,out[el.dataset.wlg2Output]);
 const caution=root.querySelector("[data-wlg2-caution]");
 if(caution)caution.textContent=valid?message:"Enter valid, nonnegative numbers and realistic period values to run the model.";
 return {valid:valid&&targets.every(Number.isFinite),out,targets,message};
}
function check(root){
 const {valid,targets}=model(root),feedback=root.querySelector("[data-wlg2-feedback]");
 if(!valid){if(feedback)feedback.textContent="Fix the input assumptions before checking.";return;}
 let correct=0;const parts=[];
 for(let i=0;i<3;i++){
  const el=root.querySelector('[data-wlg2-answer="q'+(i+1)+'"]'),value=el?.value?.trim();
  const expected=targets[i];
  const tolerance=i===0&&root.dataset.wlg2==="L1.S3"?0.01:root.dataset.wlg2==="L1.S2"?0.01:i>0&&root.dataset.wlg2==="L1.S3"?1.01:i===2&&root.dataset.wlg2==="L1.S4"?1.01:.02;
  const pass=value!==""&&Number.isFinite(Number(value))&&Math.abs(Number(value)-expected)<=tolerance;
  if(pass)correct++;
  parts.push((pass?"Correct":"Review")+" #"+(i+1)+": model value "+usd(expected)+".");
 }
 if(feedback)feedback.textContent=correct+"/3 correct. "+parts.join(" ")+" Refer to the textbook formula and input assumptions; the workbook is not a formal credential assessment.";
}
document.addEventListener("input",e=>{const root=e.target?.closest?.("[data-wlg2]");if(root&&e.target.matches("[data-wlg2-input]"))model(root)});
document.addEventListener("click",e=>{
 const b=e.target?.closest?.("[data-wlg2-check],[data-wlg2-reset]");if(!b)return;
 const root=b.closest("[data-wlg2]");if(!root)return;
 if(b.hasAttribute("data-wlg2-check"))check(root);
 else{
  for(const [name,,value] of defs[root.dataset.wlg2].fields)root.querySelector('[data-wlg2-input="'+name+'"]').value=value;
  for(const input of root.querySelectorAll("[data-wlg2-answer]"))input.value="";
  const feedback=root.querySelector("[data-wlg2-feedback]");
  if(feedback)feedback.textContent="Example reset. Solve the calculations before checking.";
  model(root);
 }
});
const observer=new MutationObserver(()=>{
 for(const root of document.querySelectorAll("[data-wlg2]")){
  if(root.dataset.wlg2Ready)return;
  root.dataset.wlg2Ready="yes";model(root);
 }
});
if(document.documentElement)observer.observe(document.documentElement,{childList:true,subtree:true});
})();