/* Wealth Lab · Three Gold mortgage practice workbooks.
  Uses hypothetical numbers only and saves no financial inputs. */
(function(){
"use strict";
const lessons={
"L2.S1":{title:"Compare two mortgage offers",description:"Model the same property and down payment with different loan rates, then compare monthly principal and interest, upfront points, and cash left after closing. Rates are hypothetical, not lender offers.",fields:[["price","Property purchase price",250000],["down","Down payment",12500],["rateA","Offer A note rate (%)",6.5],["rateB","Offer B note rate (%)",6.25],["points","Offer B points paid upfront",2375],["costs","Other buyer closing cash",7500],["cash","Cash before closing",30000],["years","Loan years",30]],metrics:[["loan","Starting mortgage principal"],["paymentA","Offer A monthly P&I"],["paymentB","Offer B monthly P&I"],["diff","Monthly difference in P&I"],["cashLeft","Cash remaining with Offer B"],["breakEven","Simple point break-even in months"]],questions:["Calculate the starting mortgage principal","Calculate cash remaining with Offer B, after points","Calculate Offer A monthly principal-and-interest (nearest dollar)"]},
"L2.S2":{title:"Down payment, closing and reserve decisions",description:"This calculator is not a CHFA eligibility or reservation checker. Optional hypothetical assistance is treated as a separate repayable second loan, not an unconditional grant.",fields:[["cash","Cash available before purchase",30000],["price","Purchase price",250000],["downPct","Own-cash down payment (%)",5],["costs","Buyer-paid closing costs",7500],["assistance","Hypothetical separate assistance loan",0],["reserve","Desired protected bank reserve",8000],["repair","Immediate possible repair",3000]],metrics:[["down","Cash down payment"],["loan","First mortgage before optional other financing"],["cashLeft","Bank cash immediately after closing"],["second","Separate assistance debt"],["afterRepair","Cash after immediate repair"],["reserveGap","Shortfall below chosen protected reserve"]],questions:["Calculate cash down payment","Calculate bank cash immediately after closing","Calculate cash after repair, before reserving cash"]},
"L2.S3":{title:"Mortgage payment and escrow anatomy",description:"Model an equal-payment fixed mortgage with hypothetical note interest. Property tax, insurance and maintenance are separate cash costs, not principal. Actual rates, escrow and fees differ by agreement.",fields:[["principal","Mortgage principal",237500],["rate","Note rate (%)",6.5],["years","Amortization years",30],["tax","Monthly property-tax reserve",525],["insurance","Homeowners insurance/month",150],["mi","Mortgage insurance/month",95],["maintenance","Maintenance allocation/month",210],["cash","Household monthly take-home pay",3600]],metrics:[["pi","Monthly principal and interest"],["interest","First month's interest"],["principalPaid","First month's principal reduction"],["lender","Modeled lender-related payment"],["allin","Housing including maintenance"],["leftover","Remaining take-home before other essentials"]],questions:["Calculate month-one interest (nearest dollar)","Calculate principal paid in first month (nearest dollar)","Calculate full housing allocation including maintenance (nearest dollar)"]}
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>Number.isFinite(n)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n):"—";
const fmt=(id,k,n)=>k==="breakEven"?(Number.isFinite(n)?n.toFixed(1)+" months":"—"):money(n);
const payment=(L,pct,years)=>{
 const r=pct/1200,n=years*12;
 if(!(n>0)||!Number.isFinite(L)||!Number.isFinite(r))return NaN;
 if(r===0)return L/n;
 return L*r/(1-Math.pow(1+r,-n));
};
window.WealthLabMortgageLabMarkup=function(s){
 const id=s?.id,d=lessons[id];if(!d)return "";
 return '<section class="wlg-lab" aria-label="Interactive mortgage calculation workbook"><div class="wlg-label">MORTGAGE NUMERICAL WORKBOOK · '+id+'</div><h3>'+esc(d.title)+'</h3><p class="wlg-intro">'+esc(d.description)+'</p><div class="wlg-worksheet" data-wlm="'+id+'">'+
 '<details open class="wlg-details"><summary>01 · Adjust the assumptions</summary><div class="wlg-grid">'+d.fields.map(([key,label,value])=>'<label class="wlg-field"><span>'+esc(label)+'</span><span class="wlg-money-input"><input type="number" min="0" step="0.01" inputmode="decimal" data-wlm-field="'+key+'" value="'+value+'" aria-label="'+esc(label)+'"></span></label>').join('')+'</div></details>'+
 '<details open class="wlg-details"><summary>02 · Follow the financial mechanics</summary><div class="wlg-metrics" aria-live="polite">'+d.metrics.map(([key,label])=>'<div><span>'+esc(label)+'</span><strong data-wlm-output="'+key+'">—</strong></div>').join('')+'</div><p class="wlg-caution" data-wlm-warning></p></details>'+
 '<details class="wlg-details"><summary>03 · Solve the calculations yourself</summary><div class="wlg-challenges">'+d.questions.map((q,i)=>'<label>'+(i+1)+'. '+esc(q)+'<input type="number" step="0.01" inputmode="decimal" data-wlm-answer="'+i+'" placeholder="Enter a number without $"></label>').join('')+'<button type="button" class="wlg-check" data-wlm-check>Check my calculations</button><div class="wlg-feedback" data-wlm-feedback aria-live="polite" role="status">Your independent calculations are not graded toward mastery.</div></div></details>'+
 '<div class="wlg-footer"><button type="button" class="wlg-reset" data-wlm-reset>Restore example values</button><span>No personal numbers are saved or sent.</span></div></div></section>';
};
function get(root){const d=lessons[root.dataset.wlm],v={};let valid=true;
 for(const [key] of d.fields){const el=root.querySelector('[data-wlm-field="'+key+'"]');const raw=el?.value?.trim()||"";const n=raw===""?NaN:Number(raw);v[key]=n;if(!Number.isFinite(n)||n<0)valid=false;}
 if(root.dataset.wlm==="L2.S1"&&(v.down>v.price||v.price<=0||v.years<1||v.years>50||v.rateA>50||v.rateB>50))valid=false;
 if(root.dataset.wlm==="L2.S2"&&(v.price<=0||v.downPct>100||v.assistance>v.price))valid=false;
 if(root.dataset.wlm==="L2.S3"&&(v.principal<=0||v.years<1||v.years>50||v.rate>50))valid=false;
 return {v,valid};
}
function calculate(root){
 const {v,valid}=get(root);let out={},answers=[],warning="";
 if(valid&&root.dataset.wlm==="L2.S1"){
  const L=v.price-v.down,a=payment(L,v.rateA,v.years),b=payment(L,v.rateB,v.years),delta=a-b;
  out={loan:L,paymentA:a,paymentB:b,diff:delta,cashLeft:v.cash-v.down-v.costs-v.points,breakEven:delta>0?v.points/delta:NaN};
  answers=[L,out.cashLeft,a];
  warning=out.cashLeft<0?"Funding warning: this offer needs "+money(-out.cashLeft)+" more cash than the hypothetical starting balance.":delta<=0?"Offer B is not saving monthly P&I under the entered assumptions. A point break-even is not applicable.":"Simple point break-even ignores time value, taxes, fees, selling and refinancing. Compare actual Loan Estimates.";
 }else if(valid&&root.dataset.wlm==="L2.S2"){
  const down=v.price*v.downPct/100,cashLeft=v.cash-down-v.costs+v.assistance;
  out={down,loan:v.price-down,second:v.assistance,cashLeft,afterRepair:cashLeft-v.repair,reserveGap:Math.max(0,v.reserve-(cashLeft-v.repair))};
  answers=[down,cashLeft,out.afterRepair];
  warning=v.assistance>0?"Model assumption: the hypothetical assistance is separate debt, not approved funding or free wealth. Actual programs may restrict its use or affect first-loan sizing.":"No assistance assumed. Compare cash remaining after repairs against your chosen reserve target.";
  if(out.cashLeft<0)warning="Closing cash is insufficient by "+money(-out.cashLeft)+". "+warning;
 }else if(valid&&root.dataset.wlm==="L2.S3"){
  const pi=payment(v.principal,v.rate,v.years),int=v.principal*v.rate/1200,pp=pi-int,lender=pi+v.tax+v.insurance+v.mi,allin=lender+v.maintenance;
  out={pi,interest:int,principalPaid:pp,lender,allin,leftover:v.cash-allin};
  answers=[int,pp,allin];
  warning=out.leftover<0?"The hypothetical housing allocation already exceeds take-home pay, before other living costs.":"Cash left after housing is not discretionary surplus until food, utilities, transport, health and debt are covered.";
 }
 for(const el of root.querySelectorAll("[data-wlm-output]"))el.textContent=fmt(root.dataset.wlm,el.dataset.wlmOutput,out[el.dataset.wlmOutput]);
 const note=root.querySelector("[data-wlm-warning]");if(note)note.textContent=valid?warning:"Enter nonnegative amounts and realistic loan parameters. This worksheet does not make an underwriting or program eligibility decision.";
 return {valid:valid&&answers.every(Number.isFinite),answers};
}
function check(root){
 const {valid,answers}=calculate(root),node=root.querySelector("[data-wlm-feedback]");if(!node)return;
 if(!valid){node.textContent="Correct the assumptions before checking.";return}
 let right=0;
 const result=answers.map((n,i)=>{const value=root.querySelector('[data-wlm-answer="'+i+'"]')?.value?.trim()||"";
 const correct=value!==""&&Number.isFinite(Number(value))&&Math.abs(Number(value)-n)<=(i===2||root.dataset.wlm!=="L2.S2"?1.01:0.02);
 if(correct)right++;
 return (correct?"Correct":"Review")+" #"+(i+1)+": "+money(n)+".";
 });
 node.textContent=right+" of 3 correct. "+result.join(" ")+" Refer to the full worked case and product assumptions for why.";
}
document.addEventListener("input",e=>{const root=e.target?.closest?.("[data-wlm]");if(root&&e.target.matches("[data-wlm-field]"))calculate(root)});
document.addEventListener("click",e=>{
 const b=e.target?.closest?.("[data-wlm-check],[data-wlm-reset]");if(!b)return;
 const root=b.closest("[data-wlm]");if(!root)return;
 if(b.hasAttribute("data-wlm-check"))check(root);
 else{
  for(const [key,,value] of lessons[root.dataset.wlm].fields)root.querySelector('[data-wlm-field="'+key+'"]').value=value;
  for(const el of root.querySelectorAll("[data-wlm-answer]"))el.value="";
  const box=root.querySelector("[data-wlm-feedback]");if(box)box.textContent="Restored the fictional example values; solve calculations again.";
  calculate(root);
 }
});
const observer=new MutationObserver(()=>{for(const root of document.querySelectorAll("[data-wlm]"))if(!root.dataset.wlmReady){root.dataset.wlmReady="yes";calculate(root)}});
if(document.documentElement)observer.observe(document.documentElement,{childList:true,subtree:true});
})();