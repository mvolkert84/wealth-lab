/* Wealth Lab · additive Module 5 Academic reader and 9 private investment labs · 2026-11-01 */
(function(){
"use strict";
const data=window.WealthLabAcademicM5Data;
if(!data||data.schema!=="wealth-lab-m5-academic-v1")throw Error("Module 5 Academic source not loaded.");
const byId=Object.fromEntries(data.lessons.map(x=>[x.id,x]));
const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=x=>Number.isFinite(x)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(x):"Invalid model";
const fixed=x=>Number.isFinite(x)?x.toFixed(2):"Invalid model";
const LABS=[{"id":"coverage","lesson":"L5.S1","title":"Survivor coverage need with discounted expenses","explain":"Models annual end-of-year support needs at one hypothetical discount rate. This is not a coverage recommendation or underwriting quote.","fields":[["annual","Annual survivor spending gap ($)",20000],["years","Years of survivor support",10],["rate","Discount rate (%)",4],["mortgage","Mortgage-payoff objective ($)",100000],["immediate","Immediate transition expenses ($)",15000],["assets","Unrestricted existing assets ($)",40000]],"outputs":[["pv","PV of annual support needs","money"],["need","Net provisional coverage need","money"]],"checks":["pv","need"]},{"id":"premium","lesson":"L5.S1","title":"Term, permanent premium and savings comparison","explain":"Cash-outlay and annuity arithmetic only. Different insurance guarantees and future coverage must be compared separately.","fields":[["term","Term monthly premium ($)",30],["permanent","Permanent monthly premium ($)",250],["years","Years of premiums",10],["savingRate","Nominal annual saving return (%)",4]],"outputs":[["termCost","Total term premiums","money"],["permCost","Total permanent premiums","money"],["difference","Monthly cash difference","money"],["future","Future value of saved difference","money"]],"checks":["difference","future"]},{"id":"policyLoan","lesson":"L5.S1","title":"Capitalized policy loan and net death benefit","explain":"Simplified annual capitalization only. Real policies use contractual interest, crediting, deductions and possible lapse rules; run an insurer in-force illustration.","fields":[["loan","Original policy loan ($)",12000],["rate","Annual loan interest (%)",7],["years","Years without repayments",5],["death","Hypothetical gross benefit ($)",100000],["value","Hypothetical gross cash value ($)",25000]],"outputs":[["balance","Unpaid policy debt","money"],["deathNet","Benefit less policy debt","money"],["equity","Cash value less debt","money"]],"checks":["balance","deathNet"]},{"id":"surrender","lesson":"L5.S1","title":"Policy surrender and potential taxable gain","explain":"Illustrates loan-offest tax exposure. The actual investment in contract, MEC status, prior withdrawals and 1099-R rules require tax-specific verification.","fields":[["gross","Gross surrender value ($)",30000],["loan","Loan extinguished at surrender ($)",18000],["basis","Adjusted investment in policy ($)",22000],["tax","Hypothetical marginal tax (%)",22]],"outputs":[["cash","Net surrender cash","money"],["gain","Simplified potential gain","money"],["taxDue","Illustrative tax on positive gain","money"]],"checks":["cash","gain"]},{"id":"property","lesson":"L5.S2","title":"Rebuild cost, limit and deductible exposure","explain":"Simplified illustrative claim uses insurer payout = min(covered cost, policy limit) minus deductible. Actual policies may apply deductibles and limits differently.","fields":[["rebuild","Reconstruction cost ($)",320000],["limit","Dwelling coverage limit ($)",250000],["deductible","Deductible ($)",2500]],"outputs":[["paid","Modeled insurer payment","money"],["unfunded","Rebuilding shortfall","money"]],"checks":["paid","unfunded"]},{"id":"flood","lesson":"L5.S2","title":"Flood building and contents coverage","explain":"Assumes separately purchased flood building and contents coverage, all modeled loss eligible, adequate limits and specified deductibles. Typical homeowners coverage excludes flooding.","fields":[["building","Covered flood building loss ($)",90000],["buildingLimit","Building flood limit ($)",250000],["buildingDed","Building deductible ($)",2000],["contents","Covered contents loss ($)",15000],["contentsLimit","Contents flood limit ($)",100000],["contentsDed","Contents deductible ($)",1000]],"outputs":[["buildingPaid","Building payment","money"],["contentsPaid","Contents payment","money"],["reimbursed","Total modeled reimbursement","money"],["retained","Unpaid loss","money"]],"checks":["reimbursed","retained"]},{"id":"disability","lesson":"L5.S2","title":"Disability elimination and income replacement","explain":"Assumes full months of waiting, constant spending and later benefit with no offsets or taxes. SSDI is a different eligibility system.","fields":[["essentials","Monthly essential costs ($)",3200],["earnings","Insured monthly wages ($)",4000],["wait","Whole months before benefits",3],["percent","Percent of earnings replaced (%)",60],["postMonths","Months benefits modeled after waiting",12]],"outputs":[["bridge","Waiting period cash needed","money"],["benefit","Gross monthly benefit","money"],["gap","Monthly shortfall after wait","money"],["retained","Total modeled uncovered costs","money"]],"checks":["bridge","retained"]},{"id":"protection","lesson":"L5.S2","title":"Liability exposure, care needs and housing budget","explain":"Combines three independent risk scenarios, not a single combined insurance policy. Payment, liability and care terms are hypothetical.","fields":[["claim","Third-party covered liability loss ($)",350000],["primary","Primary liability available ($)",100000],["care","Care expense per month ($)",6000],["careMonths","Total care months",24],["careWait","Care benefit waiting months",3],["careBenefit","Monthly LTC benefit ($)",4000],["housing","Monthly P&I ($)",1500],["tax","Monthly property taxes ($)",480],["hazard","Monthly hazard premium ($)",150],["flood","Monthly flood premium ($)",100],["mortgageIns","Monthly mortgage insurance ($)",100],["repairs","Monthly repair fund ($)",220]],"outputs":[["excess","Potential liability excess","money"],["careRetained","Uncovered care cost","money"],["housingTotal","Monthly housing risk budget","money"]],"checks":["excess","careRetained","housingTotal"]}];
function calculate(type,v){
 const o={};
 if(type==="coverage"){let r=v.rate/100;o.pv=r===0?v.annual*v.years:v.annual*(-Math.expm1(-v.years*Math.log1p(r)))/r;o.need=o.pv+v.mortgage+v.immediate-v.assets;}
 if(type==="premium"){const n=v.years*12,r=v.savingRate/1200;o.termCost=v.term*n;o.permCost=v.permanent*n;o.difference=v.permanent-v.term;o.future=n===0?0:Math.abs(r)<1e-12?o.difference*n:o.difference*Math.expm1(n*Math.log1p(r))/r;}
 if(type==="policyLoan"){o.balance=v.loan*Math.pow(1+v.rate/100,v.years);o.deathNet=v.death-o.balance;o.equity=v.value-o.balance;}
 if(type==="surrender"){o.cash=v.gross-v.loan;o.gain=v.gross-v.basis;o.taxDue=Math.max(0,o.gain)*v.tax/100;}
 if(type==="property"){o.paid=Math.max(0,Math.min(v.rebuild,v.limit)-v.deductible);o.unfunded=v.rebuild-o.paid;}
 if(type==="flood"){o.buildingPaid=Math.max(0,Math.min(v.building,v.buildingLimit)-v.buildingDed);o.contentsPaid=Math.max(0,Math.min(v.contents,v.contentsLimit)-v.contentsDed);o.reimbursed=o.buildingPaid+o.contentsPaid;o.retained=v.building+v.contents-o.reimbursed;}
 if(type==="disability"){o.bridge=v.essentials*v.wait;o.benefit=v.earnings*v.percent/100;o.gap=v.essentials-o.benefit;o.retained=o.bridge+Math.max(0,o.gap)*v.postMonths;}
 if(type==="protection"){o.excess=Math.max(0,v.claim-v.primary);o.careRetained=v.care*v.careMonths-Math.min(v.care,v.careBenefit)*Math.max(0,v.careMonths-v.careWait);o.housingTotal=v.housing+v.tax+v.hazard+v.flood+v.mortgageIns+v.repairs;}
 return o;
}
function valid(type,v){
 if(Object.values(v).some(x=>!Number.isFinite(x)))return false;
 if(type==="coverage")return v.annual>=0&&v.years>=0&&v.years<=80&&v.rate>=0&&v.rate<=35&&v.mortgage>=0&&v.immediate>=0&&v.assets>=0;
 if(type==="premium")return v.term>=0&&v.permanent>=v.term&&v.years>=0&&v.years<=80&&v.savingRate>-100&&v.savingRate<=50;
 if(type==="policyLoan")return v.loan>=0&&v.rate>=0&&v.rate<=40&&v.years>=0&&v.years<=80&&v.death>=0&&v.value>=0;
 if(type==="surrender")return v.gross>=0&&v.loan>=0&&v.loan<=v.gross&&v.basis>=0&&v.tax>=0&&v.tax<=60;
 if(type==="property")return v.rebuild>=0&&v.limit>=0&&v.deductible>=0;
 if(type==="flood")return v.building>=0&&v.buildingLimit>=0&&v.buildingDed>=0&&v.contents>=0&&v.contentsLimit>=0&&v.contentsDed>=0;
 if(type==="disability")return v.essentials>=0&&v.earnings>=0&&v.wait>=0&&v.wait<=24&&Number.isInteger(v.wait)&&v.percent>=0&&v.percent<=100&&v.postMonths>=0&&v.postMonths<=120;
 if(type==="protection")return Object.values(v).every(x=>x>=0)&&v.careWait<=v.careMonths&&v.careMonths<=120;
 return false;
}
const labelValue=(x,fmt)=>fmt==="percent"?fixed(x)+"%":fmt==="number"?fixed(x):money(x);
function labMarkup(def){
 return '<div class="lab wl-m5-lab" data-m5-lab="'+esc(def.id)+'"><div class="eyebrow">QUANTITATIVE PRACTICE · PRIVATE INPUTS</div><h3>'+esc(def.title)+'</h3><p>'+esc(def.explain)+'</p><div class="controls">'+def.fields.map(([key,name,value])=>'<label>'+esc(name)+'<input type="number" step="any" inputmode="decimal" data-m5-input="'+esc(key)+'" value="'+value+'"></label>').join('')+'</div><div class="results">'+def.outputs.map(([key,label,fmt])=>'<div class="metric"><span>'+esc(label)+'</span><b data-m5-output="'+esc(key)+'"></b></div>').join('')+'</div><p data-m5-warning class="wl-m5-warning"></p><details class="wl-m5-selfcheck"><summary>Independently calculate and check answers</summary><p>Work the formulas with your own inputs, then type the answers. Percent answers use percentage numbers (for example 12.70, not 0.127). No values are saved.</p>'+def.checks.map(key=>'<label>'+esc(def.outputs.find(x=>x[0]===key)[1])+'<input type="number" step="any" inputmode="decimal" data-m5-answer="'+esc(key)+'" placeholder="Your numerical answer"></label>').join('')+'<button type="button" data-m5-check="yes" class="secondary">Check calculations</button><p role="status" data-m5-feedback></p></details></div>';
}
function sectionMarkup(id,s,i){
 return '<section class="wl-m5-section" id="'+esc(id)+'.A'+(i+1)+'"><div class="part-label">Academic section · '+esc(id)+'.A'+(i+1)+'</div><h2>'+esc(s.title)+'</h2>'+s.body.map(p=>'<p>'+esc(p)+'</p>').join('')+'<div class="wl-m5-worked"><h3>Independent worked model</h3><ol>'+s.worked.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></div><div class="wl-m5-exercises"><h3>Practice and explanation</h3>'+s.practice.map((p,i)=>'<details><summary>Problem '+(i+1)+' · '+esc(p[0])+'</summary><p>'+esc(p[1])+'</p></details>').join('')+'</div></section>';
}
function chapterMarkup(id){
 const l=byId[id];if(!l)return '<div class="article">Module 5 Academic content unavailable for this lesson.</div>';
 const heads='<details class="wl-m5-toc"><summary>Study outcomes, prerequisites and chapter map</summary><h3>Prerequisites</h3><ul>'+l.prerequisites.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><h3>Outcomes</h3><ol>'+l.objectives.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>'+l.sections.map((x,i)=>'<p><a href="#'+esc(id)+'.A'+(i+1)+'">'+esc(id)+'.A'+(i+1)+' · '+esc(x.title)+'</a></p>').join('')+'</details>';
 const models=LABS.filter(x=>x.lesson===id).map(labMarkup).join('');
 const assessment='<section class="wl-m5-assessment"><h2>Independent chapter assessment</h2><h3>'+esc(l.assessment.title)+'</h3><p>'+esc(l.assessment.prompt)+'</p><h3>Grading rubric</h3><ul>'+l.assessment.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><p>Written assignments require independent evaluation; these self-check labs grade numerical steps only.</p></section>';
 const sources='<section class="wl-m5-sources"><h2>Authoritative research sources</h2><p>Tax figures apply to stated 2026 examples; products, rates and laws can change. Verify current filing instructions and prospectuses before acting.</p><ul>'+l.sourceRefs.map(([title,url])=>'<li><a href="'+esc(url)+'" rel="noopener noreferrer" target="_blank">'+esc(title)+'</a></li>').join('')+'</ul></section>';
 const cap=data.capstone;
 const capstone=id==="L5.S2"?'<details class="wl-m5-capstone"><summary>Module 5 cumulative insurance-committee capstone · solutions included</summary><h2>'+esc(cap.title)+'</h2><p>'+esc(cap.intro)+'</p><h3>Fictional household facts</h3><ol>'+cap.scenario.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><h3>Required individual deliverables</h3><ol>'+cap.tasks.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><details><summary>Reveal independently worked answer key</summary><ol>'+cap.answers.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details><h3>Assessment rubric</h3><ul>'+cap.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></details>':"";
 return '<div class="article wl-academic wl-m5-academic"><p class="wl-acad-kicker">INSURANCE &amp; FINANCIAL PROTECTION · ADVANCED ACADEMIC EDITION</p><h1>'+esc(l.title)+'</h1><p class="wl-acad-explain">'+esc(l.subtitle)+'</p>'+heads+l.sections.map((s,i)=>sectionMarkup(id,s,i)).join('')+'<section class="wl-m5-models"><h2>Interactive financial modeling laboratory</h2><p>Change assumptions, check calculations independently, and investigate what drives your result. These models do not write to your learning storage.</p>'+models+'</section>'+assessment+sources+capstone+'<p class="wl-acad-foot">Educational self-study, not college credit or personalized financial advice. Examples are illustrative; verify current rules, costs and risks.</p></div>';
}
function update(root){
 const def=LABS.find(x=>x.id===root.dataset.m5Lab);if(!def)return null;
 const v={};for(const e of root.querySelectorAll("[data-m5-input]"))v[e.dataset.m5Input]=Number(e.value);
 const ok=[...root.querySelectorAll("[data-m5-input]")].every(e=>e.value.trim()!=="")&&valid(def.id,v);
 const result=ok?calculate(def.id,v):{};
 for(const e of root.querySelectorAll("[data-m5-output]")){const m=def.outputs.find(x=>x[0]===e.dataset.m5Output);e.textContent=ok?labelValue(result[e.dataset.m5Output],m?.[2]):"Check inputs";}
 const w=root.querySelector("[data-m5-warning]");if(w)w.textContent=ok?"Illustrative calculation; verify current inputs, product terms and sources.":"Enter valid assumptions before interpreting results.";
 return {ok,result,def};
}
function check(root){
 const m=update(root);if(!m||!m.ok)return;
 let n=0,labels=[];
 for(const key of m.def.checks){
  const e=root.querySelector('[data-m5-answer="'+key+'"]');
  const given=e?.value?.trim()===""?NaN:Number(e.value),actual=m.result[key];
  const tol=Math.max(.035,Math.abs(actual)*.000001);
  const right=Number.isFinite(given)&&Number.isFinite(actual)&&Math.abs(given-actual)<=tol;
  if(right)n++;
  labels.push((right?"Correct":"Review")+" "+key+" = "+fixed(actual));
 }
 const f=root.querySelector("[data-m5-feedback]");
 if(f)f.textContent=n+"/"+m.def.checks.length+" correct. "+labels.join("; ");
}
document.addEventListener("input",ev=>{const root=ev.target?.closest?.(".wl-m5-lab");if(root&&ev.target.matches("[data-m5-input]"))update(root);});
document.addEventListener("click",ev=>{const b=ev.target?.closest?.("[data-m5-check]");if(b){const root=b.closest(".wl-m5-lab");if(root)check(root);}});
window.WealthLabAcademicM5Markup=chapterMarkup;
window.WealthLabAcademicM5Init=function(){for(const e of document.querySelectorAll(".wl-m5-lab"))update(e);};
window.WealthLabAcademicM5Calculate=calculate;
window.WealthLabAcademicM5Valid=valid;
})();
