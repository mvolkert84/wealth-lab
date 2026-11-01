/* Wealth Lab M4 Investing Gold numeracy labs · Local-only model; no storage */
(function(){
"use strict";
const defs={
"L4.S1":{title:"Ownership, return and fund exposure",description:"Compute a hypothetical stock trade and the weight of a position in an account. The model treats dividends as cash received, excludes personal taxes and assumes no reinvestment.",
fields:[["buy","Share purchase price",100],["sell","Share sale price",108],["shares","Shares held",50],["dividend","Cash dividends per share",3],["buyFee","Total purchase fees",0],["sellFee","Total sale fees",0],["other","Value of other investments",10000]],
metrics:[["invested","Purchase basis including fee"],["gain","Sale and dividend proceeds less purchase and fees"],["returnPct","Simple holding-period total return"],["position","Position's value at sale price"],["weight","Position weight of current total"]],
questions:["Calculate total cash profit or loss on the stock trade","Calculate purchase basis including fee","Calculate total return as a percent (not a decimal)"]},
"L4.S2":{title:"Risk, goals and portfolio shocks",description:"Compare a short-term cash goal to a stock loss scenario, then estimate a weighted portfolio shock. Negative return inputs are valid, and the scenario is not a probability forecast.",
fields:[["goal","Cash required soon",6000],["invested","Amount exposed to stock shock",6000],["decline","Stock decline before deadline (%)",25],["stocks","Portfolio stock weight (%)",60],["bonds","Portfolio bond weight (%)",30],["stockReturn","Portfolio stock return (%)",-25],["bondReturn","Bond return (%)",3],["cashReturn","Cash return (%)",0],["portfolio","Portfolio opening value",20000]],
metrics:[["future","Exposed balance after stock decline"],["shortfall","Goal funding shortage"],["weight","Weighted portfolio total return"],["ending","Portfolio ending value"]],
questions:["Calculate cash remaining after the stock decline","Calculate goal-funding shortfall","Calculate the weighted portfolio return in percent (negative allowed)"]},
"L4.S3":{title:"Traditional and Roth — equal cash sacrifice",description:"Simplified educational comparison: traditional contribution uses current tax relief to match the same after-tax household cost as a Roth contribution. Qualified Roth distribution assumed; real tax brackets, eligibility, fees and law may differ.",
fields:[["sacrifice","After-tax cash available to sacrifice today",800],["currentTax","Hypothetical current marginal rate (%)",20],["futureTax","Hypothetical tax rate on traditional distribution (%)",20],["growth","Hypothetical lifetime growth multiple",2],["annual","Additional yearly traditional-plus-Roth deposits",0]],
metrics:[["traditional","Modeled pre-tax contribution"],["roth","Modeled Roth contribution"],["tradEnd","Traditional after-tax balance at withdrawal"],["rothEnd","Qualified Roth balance at withdrawal"],["difference","Roth less traditional after-tax outcome"]],
questions:["Calculate pre-tax traditional contribution for equal present cost","Calculate traditional after-tax withdrawal proceeds","Calculate qualified Roth withdrawal proceeds"]}
};
const fmtCurrency=n=>Number.isFinite(n)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n):"—";
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function resultFormat(key,val){if(["returnPct","weight"].includes(key))return Number.isFinite(val)?val.toFixed(2)+"%":"—";return fmtCurrency(val)}
window.WealthLabInvestingLabMarkup=function(s){
 const id=s?.id,d=defs[id];if(!d)return "";
 return '<section class="wlg-lab" aria-label="Investing independent numerical workbook"><div class="wlg-label">INVESTING PRACTICE LAB · '+id+'</div><h3>'+esc(d.title)+'</h3><p class="wlg-intro">'+esc(d.description)+'</p><div class="wlg-worksheet" data-wli="'+id+'">'+
 '<details open class="wlg-details"><summary>01 · Change the assumptions</summary><div class="wlg-grid">'+d.fields.map(([key,label,value])=>'<label class="wlg-field"><span>'+esc(label)+'</span><span class="wlg-money-input"><input type="number" inputmode="decimal" step="0.01" data-wli-field="'+key+'" value="'+value+'" aria-label="'+esc(label)+'"></span></label>').join('')+'</div></details>'+
 '<details open class="wlg-details"><summary>02 · Follow the financial calculation</summary><div class="wlg-metrics" aria-live="polite">'+d.metrics.map(([key,label])=>'<div><span>'+esc(label)+'</span><strong data-wli-output="'+key+'">—</strong></div>').join('')+'</div><p class="wlg-caution" data-wli-warning></p></details>'+
 '<details class="wlg-details"><summary>03 · Solve independently</summary><div class="wlg-challenges">'+d.questions.map((q,i)=>'<label>'+(i+1)+'. '+esc(q)+'<input type="number" inputmode="decimal" step="0.01" data-wli-answer="'+i+'" placeholder="Enter your result"></label>').join('')+'<button type="button" class="wlg-check" data-wli-check>Check my calculations</button><div class="wlg-feedback" role="status" aria-live="polite" data-wli-feedback>Numbers are fictional; complete the exercises before checking.</div></div></details>'+
 '<div class="wlg-footer"><button class="wlg-reset" type="button" data-wli-reset>Restore example numbers</button><span>No input values are stored or submitted.</span></div></div></section>';
};
function input(root){const d=defs[root.dataset.wli],v={};let valid=true;
 for(const [key]of d.fields){const e=root.querySelector('[data-wli-field="'+key+'"]');const raw=e?.value?.trim()||"";const n=raw===""?NaN:Number(raw);v[key]=n;if(!Number.isFinite(n))valid=false}
 if(root.dataset.wli==="L4.S1"&&(v.buy<=0||v.sell<0||v.shares<=0||v.dividend<0||v.buyFee<0||v.sellFee<0||v.other<0))valid=false;
 if(root.dataset.wli==="L4.S2"&&(v.goal<0||v.invested<0||v.portfolio<=0||v.decline<0||v.decline>100||v.stocks<0||v.bonds<0||v.stocks+v.bonds>100||[v.stockReturn,v.bondReturn,v.cashReturn].some(x=>x< -100||x>200)))valid=false;
 if(root.dataset.wli==="L4.S3"&&(v.sacrifice<0||v.growth<0||v.currentTax<0||v.currentTax>=100||v.futureTax<0||v.futureTax>100||v.annual<0))valid=false;
 return{valid,v};
}
function calculate(root){const{valid,v}=input(root);let out={},targets=[],note="";
 if(valid&&root.dataset.wli==="L4.S1"){
 const invested=v.shares*v.buy+v.buyFee,gain=v.shares*(v.sell-v.buy+v.dividend)-v.buyFee-v.sellFee,position=v.shares*v.sell;
 out={invested,gain,returnPct:invested>0?gain/invested*100:NaN,position,weight:position+v.other>0?position/(position+v.other)*100:NaN};
 targets=[gain,invested,out.returnPct];
 note="Share price and dividends are uncertain. This model excludes tax, dividend reinvestment and settlement timing; a return from a stock is not insured.";
 }else if(valid&&root.dataset.wli==="L4.S2"){
 const future=v.invested*(1-v.decline/100),shortfall=Math.max(0,v.goal-future),cashW=100-v.stocks-v.bonds;
 const weight=(v.stocks*v.stockReturn+v.bonds*v.bondReturn+cashW*v.cashReturn)/100;
 out={future,shortfall,weight,ending:v.portfolio*(1+weight/100)};
 targets=[future,shortfall,weight];
 note=shortfall>0?"The modeled market decline creates a funding shortfall of "+fmtCurrency(shortfall)+". A long-run average cannot guarantee recovery before the payment date.":"This scenario alone does not prove the goal is safe. Test a deeper decline, possible withdrawal fees and income disruptions.";
 }else if(valid&&root.dataset.wli==="L4.S3"){
 const trad=v.sacrifice/(1-v.currentTax/100),roth=v.sacrifice,tradEnd=trad*v.growth*(1-v.futureTax/100),rothEnd=roth*v.growth;
 out={traditional:trad,roth,tradEnd,rothEnd,difference:rothEnd-tradEnd};targets=[trad,tradEnd,rothEnd];
 note="This simple equal-cost model does not confirm contribution eligibility, the IRS tax-year limit, deduction, Roth distribution qualification, employer match or actual future tax treatment.";
 }
 for(const e of root.querySelectorAll('[data-wli-output]'))e.textContent=resultFormat(e.dataset.wliOutput,out[e.dataset.wliOutput]);
 const warn=root.querySelector('[data-wli-warning]');if(warn)warn.textContent=valid?note:"Enter valid numbers. Portfolio weights cannot total more than 100%, annual return stress cannot be below −100%, and tax rates must be physically meaningful.";
 return{valid:valid&&targets.every(Number.isFinite),targets};
}
function check(root){const {valid,targets}=calculate(root),box=root.querySelector('[data-wli-feedback]');if(!box)return;
 if(!valid){box.textContent="Fix the inputs before checking.";return}
 let correct=0;const reports=targets.map((n,i)=>{const txt=root.querySelector('[data-wli-answer="'+i+'"]')?.value?.trim()||"";const pass=txt!==""&&Number.isFinite(Number(txt))&&Math.abs(Number(txt)-n)<=0.03;if(pass)correct++;return(pass?"Correct":"Review")+" #"+(i+1)+": "+(["L4.S1","L4.S2"].includes(root.dataset.wli)&&i===2?n.toFixed(2)+"%":fmtCurrency(n))+"."});
 box.textContent=correct+" of 3 correct. "+reports.join(" ")+" Continue into the reading to understand why this calculation may not be a suitable investment decision.";
}
document.addEventListener("input",e=>{const root=e.target?.closest?.('[data-wli]');if(root&&e.target.matches('[data-wli-field]'))calculate(root)});
document.addEventListener("click",e=>{const b=e.target?.closest?.('[data-wli-check],[data-wli-reset]');if(!b)return;const root=b.closest('[data-wli]');if(!root)return;
 if(b.hasAttribute('data-wli-check'))check(root);
 else{for(const[k,,n]of defs[root.dataset.wli].fields)root.querySelector('[data-wli-field="'+k+'"]').value=n;
 for(const e of root.querySelectorAll('[data-wli-answer]'))e.value="";
 const box=root.querySelector('[data-wli-feedback]');if(box)box.textContent="Example restored. Recalculate the three results before checking.";calculate(root);}
});
const obs=new MutationObserver(()=>{for(const root of document.querySelectorAll('[data-wli]'))if(!root.dataset.wliReady){root.dataset.wliReady="yes";calculate(root)}});
if(document.documentElement)obs.observe(document.documentElement,{childList:true,subtree:true});
})();