/* Wealth Lab · Module 2 Academic reader and five independent calculation labs · 2026-11-01.
   Read-only instructional content; no localStorage writes; preserves all original lesson state. */
(function(){
"use strict";
const data=window.WealthLabAcademicM2Data;
if(!data||data.schema!=="wealth-lab-m2-academic-v1")throw Error("Academic Module 2 data contract missing.");
const entries=Object.fromEntries(data.lessons.map(x=>[x.id,x]));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=v=>Number.isFinite(v)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(v):"Invalid model";
const num=v=>Number.isFinite(v)?v.toFixed(2):"Invalid model";
const percentage=v=>Number.isFinite(v)?v.toFixed(2)+"%":"Invalid model";
const pmt=(p,r,n)=>n>0&&p>=0&&r>=0?(r===0?p/n:p*r/(-Math.expm1(-n*Math.log1p(r)))):NaN;
const balance=(p,r,n,k)=>{if(!(n>0&&p>=0&&r>=0&&k>=0&&k<=n))return NaN;const a=pmt(p,r,n);return r===0?Math.max(0,p-k*a):Math.max(0,p*Math.pow(1+r,k)-a*(Math.expm1(k*Math.log1p(r))/r));};
const LABS={
"L2.S1":{name:"Mortgage payment, LTV and DTI",about:"Fixed-rate level-payment approximation. The DTI uses the housing amount plus other monthly qualifying debt divided by gross income; housing taxes and insurance are estimated separately.",fields:[["price","Home price ($)",250000],["down","Down payment ($)",12500],["rate","Annual note rate (%)",6.5],["years","Term (years)",30],["gross","Gross monthly income ($)",6000],["debt","Other monthly debt ($)",450],["tax","Annual property tax ($)",5831],["ins","Annual home insurance ($)",1800]],out:[["loan","Starting loan","money"],["payment","Monthly P&I","money"],["ltv","Illustrative price LTV","percentage"],["dti","Back-end DTI estimate","percentage"]],check:["loan","payment","dti"]},
"L2.S2":{name:"Cash-to-close and true reserves",about:"Cash is measured before the earnest deposit was paid. Deposit reduces the final settlement wire but not the total committed cash. Calculator excludes contingent credits and other obligations.",fields:[["cash","Liquid cash before deposit ($)",29000],["price","Purchase price ($)",260000],["down","Down payment (%)",5],["cost","Closing expenses + prepaids ($)",8000],["earnest","Earnest money already paid ($)",3000],["repair","Immediate repair ($)",3000],["ess","Monthly essentials ($)",3200]],out:[["uses","Total buyer funds used","money"],["wire","Remaining settlement wire","money"],["left","Post-closing cash before repairs","money"],["runway","After-repair runway (months)","number"]],check:["uses","wire","runway"]},
"L2.S3":{name:"Compare rate and discount points over a holding period",about:"Equal principal, term and rate convention. Five-year comparison includes 60 installments, fees and the full remaining payoff. Does not include common taxes or insurance; a true NPV would discount each cash flow.",fields:[["principal","Principal ($)",237500],["rateA","Offer A note rate (%)",6.5],["rateB","Offer B note rate (%)",6.25],["years","Loan term (years)",30],["months","Months until payoff",60],["points","Offer B upfront points ($)",2375]],out:[["payA","Offer A P&I","money"],["payB","Offer B P&I","money"],["balA","Offer A exit balance","money"],["balB","Offer B exit balance","money"],["benefit","Offer B undiscounted advantage","money"]],check:["payA","balA","benefit"]},
"L2.S4":{name:"Connecticut property tax and escrow shock",about:"Illustrative mill rate, not a named town's current bill. Assumes a 70% assessment ratio and tax based on value × ratio. Confirm actual assessed values, rates and tax districts before planning.",fields:[["value","Assumed market value ($)",245000],["ratio","Assessment ratio (%)",70],["mill","Municipal mills",34],["district","Special district mills",0],["insurance","Annual hazard insurance ($)",1800],["taxRise","Tax increase (%)",12],["insRise","Insurance increase (%)",20]],out:[["assessed","Taxable assessed amount","money"],["tax","Current annual property tax","money"],["current","Current monthly tax + insurance","money"],["next","Next-year projected escrow baseline","money"]],check:["assessed","tax","next"]},
"L2.S5":{name:"Assistance lien, first-mortgage exit and selling costs",about:"Illustrative forgiveness assumes 10% of original assistance loan annually, earned once on each qualifying anniversary. This tool does not determine eligibility, legal payoff, title-transfer status or taxes.",fields:[["mortgage","Initial first mortgage ($)",237500],["rate","Annual note rate (%)",6.5],["years","Mortgage years",30],["elapsed","Years since closing",3],["second","Original assistance loan ($)",20000],["forgive","Annual forgiveness of original (%)",10],["sale","Estimated sale price ($)",230000],["selling","Selling costs (%)",6]],out:[["pay","First-mortgage P&I","money"],["bal","First lien exit payoff (simplified)","money"],["sub","Unforgiven assistance debt","money"],["proceeds","Modeled cash after lien payoffs","money"]],check:["bal","sub","proceeds"]}
};
function calculate(id,v){
 let o={};
 if(id==="L2.S1"){
  const P=v.price-v.down,n=Math.round(v.years*12),r=v.rate/1200;
  o.loan=P;o.payment=pmt(P,r,n);o.ltv=v.price>0?100*P/v.price:NaN;
  const housing=o.payment+(v.tax+v.ins)/12;
  o.dti=v.gross>0?100*(housing+v.debt)/v.gross:NaN;
 }else if(id==="L2.S2"){
  o.uses=v.price*v.down/100+v.cost;o.wire=o.uses-v.earnest;
  o.left=v.cash-o.uses;o.runway=v.ess>0?(o.left-v.repair)/v.ess:NaN;
 }else if(id==="L2.S3"){
  const P=v.principal,n=Math.round(v.years*12),k=Math.round(v.months);
  o.payA=pmt(P,v.rateA/1200,n);o.payB=pmt(P,v.rateB/1200,n);
  o.balA=balance(P,v.rateA/1200,n,k);o.balB=balance(P,v.rateB/1200,n,k);
  o.benefit=(o.payA*k+o.balA)-(o.payB*k+o.balB+v.points);
 }else if(id==="L2.S4"){
  o.assessed=v.value*v.ratio/100;o.tax=o.assessed*(v.mill+v.district)/1000;
  o.current=(o.tax+v.insurance)/12;
  o.next=(o.tax*(1+v.taxRise/100)+v.insurance*(1+v.insRise/100))/12;
 }else if(id==="L2.S5"){
  const n=Math.round(v.years*12),k=Math.round(v.elapsed*12),r=v.rate/1200;
  o.pay=pmt(v.mortgage,r,n);o.bal=balance(v.mortgage,r,n,k);
  o.sub=Math.max(0,v.second*(1-Math.floor(v.elapsed)*v.forgive/100));
  o.proceeds=v.sale*(1-v.selling/100)-o.bal-o.sub;
 }
 return o;
}
function valid(id,v){
 const x=Object.values(v);
 if(x.some(y=>!Number.isFinite(y)))return false;
 if(id==="L2.S1")return v.price>0&&v.down>=0&&v.down<=v.price&&v.years>0&&v.years<=50&&v.rate>=0&&v.rate<=40&&v.gross>0&&v.tax>=0&&v.ins>=0&&v.debt>=0;
 if(id==="L2.S2")return v.cash>=0&&v.price>0&&v.down>=0&&v.down<=100&&v.cost>=0&&v.earnest>=0&&v.earnest<=v.price*v.down/100+v.cost&&v.repair>=0&&v.ess>0;
 if(id==="L2.S3")return v.principal>0&&v.rateA>=0&&v.rateB>=0&&v.rateA<=40&&v.rateB<=40&&v.years>0&&v.years<=50&&v.months>=0&&v.months<=v.years*12&&v.points>=0;
 if(id==="L2.S4")return v.value>=0&&v.ratio>=0&&v.ratio<=100&&v.mill>=0&&v.district>=0&&v.insurance>=0&&v.taxRise>=-100&&v.insRise>=-100;
 if(id==="L2.S5")return v.mortgage>=0&&v.years>0&&v.years<=50&&v.rate>=0&&v.rate<=40&&v.elapsed>=0&&v.elapsed<=v.years&&v.second>=0&&v.forgive>=0&&v.forgive<=100&&v.sale>=0&&v.selling>=0&&v.selling<100;
 return false;
}
function labMarkup(id){
 const L=LABS[id];if(!L)return"";
 return '<div class="lab wl-m2-lab" data-m2-lab="'+esc(id)+'"><div class="eyebrow">INTERACTIVE · PRIVATE NUMERICAL LAB</div><h3>'+esc(L.name)+'</h3><p>'+esc(L.about)+'</p><div class="controls">'+L.fields.map(([name,label,value])=>'<label>'+esc(label)+'<input type="number" inputmode="decimal" step="any" data-m2-input="'+esc(name)+'" value="'+value+'"></label>').join('')+'</div><div class="results">'+L.out.map(([key,title,fmt])=>'<div class="metric"><span>'+esc(title)+'</span><b data-m2-output="'+esc(key)+'"></b></div>').join('')+'</div><p class="wl-m2-warning" data-m2-warning></p><details class="wl-m2-selfcheck"><summary>Independent calculation check · solve before revealing</summary><p>Using your current inputs, calculate these outputs by hand or in a spreadsheet, enter them, then check. Use dollars as numbers, not currency symbols.</p>'+L.check.map((key,i)=>'<label>Answer '+(i+1)+': '+esc(L.out.find(x=>x[0]===key)?.[1]||key)+'<input data-m2-answer="'+esc(key)+'" type="number" step="any" inputmode="decimal" placeholder="Your computed value"></label>').join('')+'<button type="button" data-m2-check="yes" class="secondary">Check my calculations</button><p role="status" data-m2-feedback></p></details></div>';
}
function exerciseMarkup(list){return '<div class="wl-m2-exercises"><h3>Independent problems and answer explanations</h3>'+list.map((x,i)=>'<details><summary>Problem '+(i+1)+': '+esc(x[0])+'</summary><p>'+esc(x[1])+'</p></details>').join('')+'</div>';}
function chapterMarkup(id){
 const L=entries[id];if(!L)return '<div class="article">Academic chapter unavailable for this lesson.</div>';
 const content=L.sections.map((s,i)=>'<section class="wl-m2-section" id="'+esc(id)+'.A'+(i+1)+'"><div class="part-label">Academic section · '+esc(id)+'.A'+(i+1)+'</div><h2>'+esc(s.title)+'</h2>'+s.body.map(x=>'<p>'+esc(x)+'</p>').join('')+'<div class="wl-m2-worked"><h3>Worked financial analysis</h3><ol>'+s.worked.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></div>'+exerciseMarkup(s.practice)+'</section>').join('');
 const sources='<section class="wl-m2-sources"><h2>Primary sources and research literacy</h2><p>Source review date: November 1, 2026. Dates and legal terms must be reverified before real financial transactions. Hypothetical loan rates are not offers.</p><ul>'+L.sourceRefs.map(([title,url])=>'<li><a target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">'+esc(title)+'</a></li>').join('')+'</ul></section>';
 const exam='<section class="wl-m2-assessment"><h2>Written and numerical chapter assessment</h2><h3>'+esc(L.assessment.title)+'</h3><p>'+esc(L.assessment.prompt)+'</p><h3>Evaluation rubric</h3><ul>'+L.assessment.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><p>Self-check answers are instructional; a formally graded written submission would require an independent reviewer.</p></section>';
 const cap=data.capstone;
 const capstone=id==="L2.S5"?'<details class="wl-m2-capstone"><summary>Module 2 · Comprehensive cumulative case and detailed solution</summary><h2>'+esc(cap.title)+'</h2><p>'+esc(cap.intro)+'</p><h3>Facts</h3><ol>'+cap.scenario.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><h3>Required independent deliverables</h3><ol>'+cap.tasks.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><details><summary>Show worked solution after trying</summary><ol>'+cap.answer.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details><h3>Scoring</h3><ul>'+cap.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></details>':"";
 return '<div class="article wl-academic wl-m2-academic"><p class="wl-acad-kicker">MORTGAGES &amp; REAL ESTATE · UNIVERSITY-STYLE STUDY</p><h1>'+esc(L.title)+'</h1><p class="wl-acad-explain">'+esc(L.subtitle)+'</p><p class="wl-acad-explain">Academic expansion added to the original lesson, not a replacement. Existing saved work remains in the Learn, Try It and Notes tabs.</p><details class="wl-m2-toc"><summary>Learning objectives and chapter map · '+L.sections.length+' extended sections</summary><h3>Prerequisites</h3><ul>'+L.prerequisites.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><h3>Learning outcomes</h3><ol>'+L.objectives.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>'+L.sections.map((s,i)=>'<p><a href="#'+esc(id)+'.A'+(i+1)+'">'+esc(id)+'.A'+(i+1)+' · '+esc(s.title)+'</a></p>').join('')+'</details>'+content+labMarkup(id)+exam+sources+capstone+'<p class="wl-acad-foot">Independent university-style self-study, not an accredited course or professional legal, tax or lending advice. The lab saves no inputs and does not change existing progress.</p></div>';
}
function update(root){
 const id=root.dataset.m2Lab,def=LABS[id];if(!def)return;
 let v={};for(const el of root.querySelectorAll("[data-m2-input]"))v[el.dataset.m2Input]=Number(el.value);
 const ok=[...root.querySelectorAll("[data-m2-input]")].every(el=>el.value.trim()!=="")&&valid(id,v);
 const out=ok?calculate(id,v):{};
 for(const el of root.querySelectorAll("[data-m2-output]")){
  const item=def.out.find(row=>row[0]===el.dataset.m2Output);
  const value=out[el.dataset.m2Output];
  el.textContent=!ok?"Check inputs":item?.[2]==="percentage"?percentage(value):item?.[2]==="number"?num(value):money(value);
 }
 const w=root.querySelector("[data-m2-warning]");
 if(w)w.textContent=ok?"Hypothetical mathematics only; actual lender, insurer, tax and CHFA conditions must be verified.":"Use valid, finite input values with correct units; do not interpret an invalid result as a valid offer.";
 return {ok,out};
}
function check(root){
 const r=update(root),def=LABS[root.dataset.m2Lab];if(!r.ok)return;
 let score=0,details=[];
 for(const key of def.check){
  const el=root.querySelector('[data-m2-answer="'+key+'"]'),expected=r.out[key];
  const given=el?.value?.trim()===""?NaN:Number(el.value);
  const pass=Number.isFinite(given)&&Number.isFinite(expected)&&Math.abs(given-expected)<=0.03;
  if(pass)score++;
  details.push((pass?"Correct":"Review")+" "+key+": "+num(expected));
 }
 const feedback=root.querySelector("[data-m2-feedback]");
 if(feedback)feedback.textContent=score+"/"+def.check.length+" correct. "+details.join("; ")+".";
}
document.addEventListener("input",event=>{
 const root=event.target?.closest?.(".wl-m2-lab");
 if(root&&event.target.matches("[data-m2-input]"))update(root);
});
document.addEventListener("click",event=>{
 const button=event.target?.closest?.("[data-m2-check]");
 if(button){const root=button.closest(".wl-m2-lab");if(root)check(root);}
});
window.WealthLabAcademicM2Calculate=calculate;
window.WealthLabAcademicM2ValidateInputs=valid;
window.WealthLabAcademicM2Markup=chapterMarkup;
window.WealthLabAcademicM2Init=function(){for(const el of document.querySelectorAll(".wl-m2-lab"))update(el);};
})();
