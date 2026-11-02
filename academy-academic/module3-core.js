/* Wealth Lab · Module 3 Academic reader and five independent calculation labs · 2026-11-01.
   Read-only instructional content; does not write to browser storage; preserves all original lesson state. */
(function(){
"use strict";
const data=window.WealthLabAcademicM3Data;
if(!data||data.schema!=="wealth-lab-m3-academic-v1")throw Error("Academic Module 3 data contract missing.");
const entries=Object.fromEntries(data.lessons.map(x=>[x.id,x]));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=v=>Number.isFinite(v)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(v):"Invalid model";
const num=v=>Number.isFinite(v)?v.toFixed(2):"Invalid model";
const percentage=v=>Number.isFinite(v)?v.toFixed(2)+"%":"Invalid model";
const pmt=(p,r,n)=>n>0&&p>=0&&r>=0?(r===0?p/n:p*r/(-Math.expm1(-n*Math.log1p(r)))):NaN;
const balance=(p,r,n,k)=>{if(!(n>0&&p>=0&&r>=0&&k>=0&&k<=n))return NaN;const a=pmt(p,r,n);return r===0?Math.max(0,p-k*a):Math.max(0,p*Math.pow(1+r,k)-a*(Math.expm1(k*Math.log1p(r))/r));};
const LABS={"L3.S1":{"name":"Trust assets, debt and year-end reconciliation","about":"Economic trust ledger, not Form 1041 taxable income. Model opening asset value, liens, income, gains, expenses and beneficiary distributions without double-counting equity.","fields":[["house","Property fair value ($)",260000],["mortgage","First mortgage ($)",220000],["second","Subordinate lien ($)",12000],["openingCash","Opening cash ($)",30000],["investments","Opening investments ($)",70000],["income","Cash income ($)",2000],["appreciation","Unrealized investment change ($)",4000],["fees","Trust and legal costs ($)",1200],["distributions","Beneficiary distributions ($)",5000],["salePct","Hypothetical sale costs (%)",6]],"out":[["equity","Gross home equity","money"],["sale","Net property sale proceeds","money"],["cashEnd","Closing trust cash","money"],["trustAssets","Closing trust financial assets","money"],["trustDelta","Trust financial-asset change","money"]],"check":["equity","cashEnd","trustAssets"]},"L3.S2":{"name":"Gift versus inherited basis and administration cost","about":"Two conditional tax-basis scenarios. The difference is modeled realized gain, NOT guaranteed tax saved. A completed transfer to certain trusts may not receive a death-time basis adjustment.","fields":[["basis","Donor adjusted basis ($)",100000],["deathValue","Qualifying inheritance basis ($)",300000],["sale","Sale price ($)",310000],["trustAssets","Beginning trust corpus ($)",300000],["feePct","Annual fee of beginning corpus (%)",0.8],["fixedFees","Other annual fees ($)",1200],["years","Years of costs",10]],"out":[["giftGain","Simple gift gain","money"],["inheritGain","Simple inherited gain","money"],["gainDiff","Difference in gain","money"],["annualFees","Annual first-year modeled cost","money"],["simpleFees","Simple years × annual costs","money"]],"check":["giftGain","inheritGain","annualFees"]},"L3.S3":{"name":"Inherited home sale and education-funding runway","about":"Illustrative inheritance liquidity and child education future value. Annual trust fee occurs at year end. Investment returns are not forecasts, and legal ownership is not determined here.","fields":[["home","Estimated home sale value ($)",260000],["first","First mortgage payoff ($)",220000],["second","Other secured payoff ($)",12000],["selling","Sale costs (%)",6],["education","Current education goal ($)",30000],["inflation","Education inflation assumption (%)",3],["fund","Starting education fund ($)",15000],["growth","Annual return assumption (%)",5],["years","Years until education",8],["fee","Year-end annual administration cost ($)",500]],"out":[["equity","Gross home equity","money"],["proceeds","Modeled sale proceeds","money"],["eduFuture","Nominal education target","money"],["fundNet","Fund after modeled fees","money"],["gap","Projected education gap","money"],["coverage","Funded percent","percentage"]],"check":["proceeds","fundNet","gap"]}};
function calculate(id,v){const o={};
 if(id==="L3.S1"){o.equity=v.house-v.mortgage-v.second;o.sale=v.house*(1-v.salePct/100)-v.mortgage-v.second;o.cashEnd=v.openingCash+v.income-v.fees-v.distributions;o.trustAssets=o.cashEnd+v.investments+v.appreciation;o.trustDelta=o.trustAssets-v.openingCash-v.investments;}
 if(id==="L3.S2"){o.giftGain=v.sale-v.basis;o.inheritGain=v.sale-v.deathValue;o.gainDiff=o.giftGain-o.inheritGain;o.annualFees=v.trustAssets*v.feePct/100+v.fixedFees;o.simpleFees=o.annualFees*v.years;}
 if(id==="L3.S3"){o.equity=v.home-v.first-v.second;o.proceeds=v.home*(1-v.selling/100)-v.first-v.second;o.eduFuture=v.education*Math.pow(1+v.inflation/100,v.years);const r=v.growth/100;let fv=v.fund*Math.pow(1+r,v.years);const feeFV=r===0?v.fee*v.years:v.fee*Math.expm1(v.years*Math.log1p(r))/r;o.fundNet=fv-feeFV;o.gap=o.eduFuture-o.fundNet;o.coverage=o.eduFuture>0?100*o.fundNet/o.eduFuture:NaN;}
 return o;
}
function valid(id,v){
 if(Object.values(v).some(x=>!Number.isFinite(x)))return false;
 if(id==="L3.S1")return v.house>=0&&v.mortgage>=0&&v.second>=0&&v.openingCash>=0&&v.investments>=0&&v.income>=0&&v.fees>=0&&v.distributions>=0&&v.salePct>=0&&v.salePct<100;
 if(id==="L3.S2")return v.basis>=0&&v.deathValue>=0&&v.sale>=0&&v.trustAssets>=0&&v.feePct>=0&&v.feePct<=100&&v.fixedFees>=0&&v.years>=0&&v.years<=100;
 if(id==="L3.S3")return v.home>=0&&v.first>=0&&v.second>=0&&v.selling>=0&&v.selling<100&&v.education>0&&v.inflation>-100&&v.inflation<=50&&v.fund>=0&&v.growth>-100&&v.growth<=50&&v.years>=0&&v.years<=80&&v.fee>=0;
 return false;
}
function labMarkup(id){
 const L=LABS[id];if(!L)return"";
 return '<div class="lab wl-m3-lab" data-m3-lab="'+esc(id)+'"><div class="eyebrow">INTERACTIVE · PRIVATE NUMERICAL LAB</div><h3>'+esc(L.name)+'</h3><p>'+esc(L.about)+'</p><div class="controls">'+L.fields.map(([name,label,value])=>'<label>'+esc(label)+'<input type="number" inputmode="decimal" step="any" data-m3-input="'+esc(name)+'" value="'+value+'"></label>').join('')+'</div><div class="results">'+L.out.map(([key,title,fmt])=>'<div class="metric"><span>'+esc(title)+'</span><b data-m3-output="'+esc(key)+'"></b></div>').join('')+'</div><p class="wl-m3-warning" data-m3-warning></p><details class="wl-m3-selfcheck"><summary>Independent calculation check · solve before revealing</summary><p>Using your current inputs, calculate these outputs by hand or in a spreadsheet, enter them, then check. Use dollars as numbers, not currency symbols.</p>'+L.check.map((key,i)=>'<label>Answer '+(i+1)+': '+esc(L.out.find(x=>x[0]===key)?.[1]||key)+'<input data-m3-answer="'+esc(key)+'" type="number" step="any" inputmode="decimal" placeholder="Your computed value"></label>').join('')+'<button type="button" data-m3-check="yes" class="secondary">Check my calculations</button><p role="status" data-m3-feedback></p></details></div>';
}
function exerciseMarkup(list){return '<div class="wl-m3-exercises"><h3>Independent problems and answer explanations</h3>'+list.map((x,i)=>'<details><summary>Problem '+(i+1)+': '+esc(x[0])+'</summary><p>'+esc(x[1])+'</p></details>').join('')+'</div>';}
function chapterMarkup(id){
 const L=entries[id];if(!L)return '<div class="article">Academic chapter unavailable for this lesson.</div>';
 const content=L.sections.map((s,i)=>'<section class="wl-m3-section" id="'+esc(id)+'.A'+(i+1)+'"><div class="part-label">Academic section · '+esc(id)+'.A'+(i+1)+'</div><h2>'+esc(s.title)+'</h2>'+s.body.map(x=>'<p>'+esc(x)+'</p>').join('')+'<div class="wl-m3-worked"><h3>Worked financial analysis</h3><ol>'+s.worked.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></div>'+exerciseMarkup(s.practice)+'</section>').join('');
 const sources='<section class="wl-m3-sources"><h2>Primary sources and research literacy</h2><p>Source review date: November 1, 2026. Dates and legal terms must be reverified before real financial transactions. Hypothetical loan rates are not offers.</p><ul>'+L.sourceRefs.map(([title,url])=>'<li><a target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">'+esc(title)+'</a></li>').join('')+'</ul></section>';
 const exam='<section class="wl-m3-assessment"><h2>Written and numerical chapter assessment</h2><h3>'+esc(L.assessment.title)+'</h3><p>'+esc(L.assessment.prompt)+'</p><h3>Evaluation rubric</h3><ul>'+L.assessment.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><p>Self-check answers are instructional; a formally graded written submission would require an independent reviewer.</p></section>';
 const cap=data.capstone;
 const capstone=id==="L3.S3"?'<details class="wl-m3-capstone"><summary>Module 3 · Comprehensive cumulative case and detailed solution</summary><h2>'+esc(cap.title)+'</h2><p>'+esc(cap.intro)+'</p><h3>Facts</h3><ol>'+cap.scenario.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><h3>Required independent deliverables</h3><ol>'+cap.tasks.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><details><summary>Show worked solution after trying</summary><ol>'+cap.answer.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details><h3>Scoring</h3><ul>'+cap.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></details>':"";
 return '<div class="article wl-academic wl-m3-academic"><p class="wl-acad-kicker">TRUSTS &amp; INHERITANCE · UNIVERSITY-STYLE STUDY</p><h1>'+esc(L.title)+'</h1><p class="wl-acad-explain">'+esc(L.subtitle)+'</p><p class="wl-acad-explain">Academic expansion added to the original lesson, not a replacement. Existing saved work remains in the Learn, Try It and Notes tabs.</p><details class="wl-m3-toc"><summary>Learning objectives and chapter map · '+L.sections.length+' extended sections</summary><h3>Prerequisites</h3><ul>'+L.prerequisites.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><h3>Learning outcomes</h3><ol>'+L.objectives.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>'+L.sections.map((s,i)=>'<p><a href="#'+esc(id)+'.A'+(i+1)+'">'+esc(id)+'.A'+(i+1)+' · '+esc(s.title)+'</a></p>').join('')+'</details>'+content+labMarkup(id)+exam+sources+capstone+'<p class="wl-acad-foot">Independent university-style self-study, not an accredited course or professional legal, tax or lending advice. The lab saves no inputs and does not change existing progress.</p></div>';
}
function update(root){
 const id=root.dataset.m2Lab,def=LABS[id];if(!def)return;
 let v={};for(const el of root.querySelectorAll("[data-m3-input]"))v[el.dataset.m2Input]=Number(el.value);
 const ok=[...root.querySelectorAll("[data-m3-input]")].every(el=>el.value.trim()!=="")&&valid(id,v);
 const out=ok?calculate(id,v):{};
 for(const el of root.querySelectorAll("[data-m3-output]")){
  const item=def.out.find(row=>row[0]===el.dataset.m2Output);
  const value=out[el.dataset.m2Output];
  el.textContent=!ok?"Check inputs":item?.[2]==="percentage"?percentage(value):item?.[2]==="number"?num(value):money(value);
 }
 const w=root.querySelector("[data-m3-warning]");
 if(w)w.textContent=ok?"Hypothetical mathematics only; actual lender, insurer, tax and CHFA conditions must be verified.":"Use valid, finite input values with correct units; do not interpret an invalid result as a valid offer.";
 return {ok,out};
}
function check(root){
 const r=update(root),def=LABS[root.dataset.m2Lab];if(!r.ok)return;
 let score=0,details=[];
 for(const key of def.check){
  const el=root.querySelector('[data-m3-answer="'+key+'"]'),expected=r.out[key];
  const given=el?.value?.trim()===""?NaN:Number(el.value);
  const pass=Number.isFinite(given)&&Number.isFinite(expected)&&Math.abs(given-expected)<=0.03;
  if(pass)score++;
  details.push((pass?"Correct":"Review")+" "+key+": "+num(expected));
 }
 const feedback=root.querySelector("[data-m3-feedback]");
 if(feedback)feedback.textContent=score+"/"+def.check.length+" correct. "+details.join("; ")+".";
}
document.addEventListener("input",event=>{
 const root=event.target?.closest?.(".wl-m3-lab");
 if(root&&event.target.matches("[data-m3-input]"))update(root);
});
document.addEventListener("click",event=>{
 const button=event.target?.closest?.("[data-m3-check]");
 if(button){const root=button.closest(".wl-m3-lab");if(root)check(root);}
});
window.WealthLabAcademicM3Calculate=calculate;
window.WealthLabAcademicM3ValidateInputs=valid;
window.WealthLabAcademicM3Markup=chapterMarkup;
window.WealthLabAcademicM3Init=function(){for(const el of document.querySelectorAll(".wl-m3-lab"))update(el);};
})();
