/* Wealth Lab · Local Estate and Trust Numeracy Workbook, edition 2.
   Fictional values only. No entries are saved or transmitted. */
(function(){
"use strict";
const defs={
"L3.S1":{title:"Trust assets and real home carrying costs",intro:"A trust does not create money or cancel the home's mortgage. This model shows property equity, spending commitments and one year of upkeep; it does not decide legal ownership or tax treatment.",
fields:[["home","Home market value",250000],["debt","Mortgage principal",150000],["cash","Liquid cash held",10000],["tax","Annual property tax",6300],["insurance","Annual homeowners insurance",1800],["repairs","Annual repair allocation",3000],["payment","Monthly mortgage payment",1100]],
metrics:[["equity","Gross home equity before sale costs"],["assets","Gross house plus bank cash"],["upkeep","Annual ownership cost before mortgage"],["monthly","Monthly outflow including mortgage and upkeep"],["cashrunway","Months cash covers modeled ownership outflow"]],
questions:["Calculate home equity before selling costs","Calculate annual nonmortgage property cost","Calculate monthly ownership outflow including mortgage"]},
"L3.S2":{title:"Compare trust cost and loss of accessible cash",intro:"Legal powers and tax outcomes cannot be calculated by a percentage. This workbook shows only explicit financial costs and liquid reserves, so you can ask a qualified attorney the right questions.",
fields:[["cash","Current accessible bank cash",20000],["asset","Investments considered for trust",80000],["setup","One-time legal/setup cost",3000],["annual","Annual trust administration estimate",300],["years","Planning horizon in years",10],["committed","Cash placed under restricted control",0]],
metrics:[["available","Cash left outside restricted arrangement"],["cost","Total nominal administration/setup cost"],["committed","Illustrative cash under restricted control"],["remaining","Unrestricted cash after nominal costs"]],
questions:["Calculate total setup and nominal administration cost","Calculate unrestricted cash after setup and committed cash","Calculate unrestricted cash after setup, committed cash and total future administration"]},
"L3.S3":{title:"Inherited home: retain or sell?",intro:"This is a financial comparison with hypothetical expenses. It does not determine title, probate, capital-gain tax, lender consent or whether selling the home is legally permitted.",
fields:[["home","Estimated home sale price",250000],["debt","Mortgage payoff",150000],["salePct","Selling costs (% of price)",6],["tax","Annual property taxes",6300],["insurance","Annual insurance",1800],["repair","Annual repair allocation",3000],["mortgagePay","Monthly mortgage payment",1100],["cash","Beneficiary cash available",20000]],
metrics:[["equity","Home gross equity"],["sale","Estimated sale proceeds before other tax/estate claims"],["monthly","Monthly cost to retain home"],["annual","Annual holding cash requirement"],["runway","Months cash covers carrying costs"]],
questions:["Calculate estimated sale proceeds","Calculate yearly holding cash cost","Calculate monthly holding cash cost"]}
};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>Number.isFinite(n)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n):"—";
function markup(id){const d=defs[id];if(!d)return "";
 return '<section class="wlg-lab" aria-label="Estate planning numerical workbook"><div class="wlg-label">INHERITANCE FINANCIAL WORKBOOK · '+id+'</div><h3>'+esc(d.title)+'</h3><p class="wlg-intro">'+esc(d.intro)+'</p><div class="wlg-worksheet" data-wle="'+id+'">'+
 '<details open class="wlg-details"><summary>01 · Edit hypothetical financial assumptions</summary><div class="wlg-grid">'+d.fields.map(([k,label,value])=>'<label class="wlg-field"><span>'+esc(label)+'</span><span class="wlg-money-input"><input type="number" inputmode="decimal" step="0.01" min="0" value="'+value+'" data-wle-field="'+k+'" aria-label="'+esc(label)+'"></span></label>').join("")+'</div></details>'+
 '<details open class="wlg-details"><summary>02 · Follow the balance sheet and cash</summary><div class="wlg-metrics" aria-live="polite">'+d.metrics.map(([k,label])=>'<div><span>'+esc(label)+'</span><strong data-wle-output="'+k+'">—</strong></div>').join("")+'</div><p class="wlg-caution" data-wle-warning></p></details>'+
 '<details class="wlg-details"><summary>03 · Solve independently before checking</summary><div class="wlg-challenges">'+d.questions.map((q,i)=>'<label>'+(i+1)+'. '+esc(q)+'<input type="number" inputmode="decimal" step="0.01" placeholder="Answer in dollars" data-wle-answer="'+i+'"></label>').join('')+
 '<button type="button" class="wlg-check" data-wle-check>Check my calculations</button><div class="wlg-feedback" data-wle-feedback role="status" aria-live="polite">Enter your answers and check the underlying arithmetic.</div></div></details>'+
 '<div class="wlg-footer"><button type="button" class="wlg-reset" data-wle-reset>Restore example amounts</button><span>Values are not saved and do not constitute estate or tax advice.</span></div></div></section>';
}
window.WealthLabEstateLabMarkup=function(s){return markup(s?.id)};
function calculate(root){
 const d=defs[root.dataset.wle],v={};let valid=true;
 for(const [key] of d.fields){const el=root.querySelector('[data-wle-field="'+key+'"]');const raw=el?.value?.trim()||"";const n=raw===""?NaN:Number(raw);v[key]=n;if(!Number.isFinite(n)||n<0)valid=false}
 if(root.dataset.wle==="L3.S2"&&(v.years>100||v.committed>v.cash))valid=false;
 if(root.dataset.wle==="L3.S3"&&v.salePct>100)valid=false;
 let results={},targets=[],warning="";
 if(valid&&root.dataset.wle==="L3.S1"){
  const upkeep=v.tax+v.insurance+v.repairs,monthly=upkeep/12+v.payment;
  results={equity:v.home-v.debt,assets:v.home+v.cash,upkeep,monthly,cashrunway:monthly>0?v.cash/monthly:NaN};
  targets=[results.equity,upkeep,monthly];
  warning="Home equity is not liquid cash. Mortgage debt remains owed and property bills must be paid regardless of the trust's name.";
 }else if(valid&&root.dataset.wle==="L3.S2"){
  const cost=v.setup+v.annual*v.years,available=v.cash-v.committed-v.setup;
  results={available,cost,committed:v.committed,remaining:available-v.annual*v.years};
  targets=[cost,available,results.remaining];
  warning="The trust's legal tax status, creditor rights and retained control are not determined by these arithmetic calculations. Restricted assets may be unavailable to the creator.";
 }else if(valid&&root.dataset.wle==="L3.S3"){
  const equity=v.home-v.debt,sale=v.home-v.debt-v.home*v.salePct/100,annual=v.tax+v.insurance+v.repair+12*v.mortgagePay,monthly=annual/12;
  results={equity,sale,annual,monthly,runway:monthly>0?v.cash/monthly:NaN};
  targets=[sale,annual,monthly];
  warning="Actual sale prices, property tax, legal claims and inheritance tax treatment are unknown. Estate professionals should confirm authority and obligations.";
 }
 for(const node of root.querySelectorAll("[data-wle-output]")){let k=node.dataset.wleOutput,val=results[k];node.textContent=k.includes("runway")?Number.isFinite(val)?val.toFixed(1)+" months":"—":money(val)}
 const msg=root.querySelector("[data-wle-warning]");if(msg)msg.textContent=valid?warning:"Enter valid, nonnegative values; committed cash cannot exceed total personal bank cash and sale costs cannot exceed 100%.";
 return {valid:valid&&targets.every(Number.isFinite),targets};
}
function check(root){const {valid,targets}=calculate(root),box=root.querySelector("[data-wle-feedback]");if(!box)return;
 if(!valid){box.textContent="Correct the model inputs to check answers.";return;}
 let score=0;const texts=targets.map((n,i)=>{const str=root.querySelector('[data-wle-answer="'+i+'"]')?.value?.trim()||"";const correct=str!==""&&Number.isFinite(Number(str))&&Math.abs(Number(str)-n)<1.01;if(correct)score++;return(correct?"Correct":"Review")+" #"+(i+1)+": "+money(n)+".";
 });box.textContent=score+" of 3 correct. "+texts.join(" ")+" Refer to the chapter's worked examples for the method.";
}
document.addEventListener("input",e=>{const root=e.target?.closest?.("[data-wle]");if(root&&e.target.matches("[data-wle-field]"))calculate(root)});
document.addEventListener("click",e=>{const b=e.target?.closest?.("[data-wle-check],[data-wle-reset]");if(!b)return;const root=b.closest("[data-wle]");if(!root)return;
 if(b.hasAttribute("data-wle-check"))check(root);else{
  for(const[k,,value]of defs[root.dataset.wle].fields)root.querySelector('[data-wle-field="'+k+'"]').value=value;
  for(const el of root.querySelectorAll("[data-wle-answer]"))el.value="";
  const box=root.querySelector("[data-wle-feedback]");if(box)box.textContent="Restored fictional values. Solve each calculation before checking.";
  calculate(root);
 }
});
const observer=new MutationObserver(()=>{for(const root of document.querySelectorAll("[data-wle]"))if(!root.dataset.wleReady){root.dataset.wleReady="yes";calculate(root)}});
if(document.documentElement)observer.observe(document.documentElement,{childList:true,subtree:true});
})();