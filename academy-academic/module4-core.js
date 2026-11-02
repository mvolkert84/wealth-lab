/* Wealth Lab · additive Module 4 Academic reader and 9 private investment labs · 2026-11-01 */
(function(){
"use strict";
const data=window.WealthLabAcademicM4Data;
if(!data||data.schema!=="wealth-lab-m4-academic-v1")throw Error("Module 4 Academic source not loaded.");
const byId=Object.fromEntries(data.lessons.map(x=>[x.id,x]));
const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=x=>Number.isFinite(x)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(x):"Invalid model";
const fixed=x=>Number.isFinite(x)?x.toFixed(2):"Invalid model";
const LABS=[{"id":"stock","lesson":"L4.S1","title":"One-period stock total return","explain":"A complete holding-period return includes dividends and fees. Example assumes no dividend reinvestment or taxes.","fields":[["buy","Buy price per share ($)",100],["sell","Sale price per share ($)",108],["shares","Number of shares",50],["dividend","Dividend per share ($)",3],["fees","Total transaction fees ($)",20]],"outputs":[["gain","Dollar economic gain","money"],["return","Gain / starting stock cost (%)","percent"],["dividendCash","Total cash dividends","money"]],"checks":["gain","return"]},{"id":"dividend","lesson":"L4.S1","title":"Constant-growth dividend valuation","explain":"Gordon growth perpetuity: value is only finite for required return greater than growth; a model price is not a market prediction.","fields":[["div","Expected next dividend ($)",2],["discount","Required return (%)",9],["growth","Perpetual dividend growth (%)",3],["shock","Discount-rate stress (percentage points)",1]],"outputs":[["value","Baseline model value","money"],["stressed","Stress model value","money"],["change","Model value change (%)","percent"]],"checks":["value","stressed"]},{"id":"bond","lesson":"L4.S1","title":"Yield shock on a zero-coupon bond","explain":"Discount a known fictional face payment; higher required market yields reduce present value.","fields":[["face","Face value ($)",1000],["years","Years until payment",3],["yieldA","Starting annual yield (%)",4],["yieldB","Stress annual yield (%)",5]],"outputs":[["priceA","Starting theoretical price","money"],["priceB","Stress theoretical price","money"],["priceMove","Price change ($)","money"]],"checks":["priceA","priceB"]},{"id":"portfolio","lesson":"L4.S2","title":"Two-asset return, covariance and rebalance","explain":"Portfolio risk uses correlated volatility, not a weighted sum of volatility. Return and rebalance use initial 60/40-style portfolio values.","fields":[["capital","Starting assets ($)",10000],["weight","Stock allocation (%)",60],["stockReturn","Stock one-period return (%)",12],["bondReturn","Bond one-period return (%)",-3],["stockVol","Annual stock volatility (%)",20],["bondVol","Annual bond volatility (%)",6],["correlation","Return correlation (−1 to 1)",0.2]],"outputs":[["portfolioReturn","Realized portfolio return (%)","percent"],["volatility","Model annual volatility (%)","percent"],["endingStockWeight","Ending equity weight (%)","percent"],["sellStocks","Stock sale to restore target ($)","money"]],"checks":["portfolioReturn","volatility","sellStocks"]},{"id":"drawdown","lesson":"L4.S2","title":"Drawdown and exact nominal recovery","explain":"Recovery is nonlinear; returns cannot be reversed simply by adding the lost percentage.","fields":[["balance","Starting portfolio ($)",40000],["loss","Drop from peak (%)",40]],"outputs":[["remaining","After-loss assets","money"],["lossDollar","Dollar loss","money"],["recover","Gain to recover original (%)","percent"]],"checks":["remaining","recover"]},{"id":"savings","lesson":"L4.S2","title":"Monthly accumulation, fees and purchasing power","explain":"Smooth returns illustrate formulas, not a forecast. Annual nominal gross rate minus assumed annual fee drag is a simplified model.","fields":[["monthly","Month-end contribution ($)",250],["years","Years",20],["gross","Gross annual nominal rate (%)",6],["fee","Annual fee drag (percentage points)",0.1],["inflation","Annual inflation (%)",3]],"outputs":[["contrib","Total contributions","money"],["future","Nominal modeled ending value","money"],["real","Today-dollar purchasing power","money"]],"checks":["future","real"]},{"id":"taxChoice","lesson":"L4.S3","title":"Equal-gross-cost traditional versus Roth","explain":"Assumes deductible traditional contribution and qualified Roth distribution; taxes are flat hypothetical scenario inputs.","fields":[["gross","Gross pay available ($)",1000],["currentTax","Current tax rate (%)",20],["futureTax","Traditional distribution tax (%)",20],["factor","Investment growth factor",2]],"outputs":[["trad","Traditional spendable value","money"],["roth","Roth spendable value","money"],["difference","Roth minus traditional","money"]],"checks":["trad","roth"]},{"id":"taxLots","lesson":"L4.S3","title":"Tax-lot selection and gain classification","explain":"Calculates differences in realized gain only; not a tax liability or guarantee that a lot-selection method is available.","fields":[["shares","Shares sold",20],["sale","Sale price per share ($)",100],["basisA","Earlier lot unit basis ($)",50],["basisB","Later lot unit basis ($)",80]],"outputs":[["gainA","Identified lot A gain","money"],["gainB","Identified lot B gain","money"],["delta","Difference in realized gain","money"]],"checks":["gainA","gainB"]},{"id":"iraHome","lesson":"L4.S3","title":"First-home retirement withdrawal sensitivity","explain":"This is only a tax-impact demonstration. First-home eligibility, Roth ordering, time limits, ordinary income and 10% additional tax exceptions require IRS review.","fields":[["gross","Gross fully taxable IRA distribution ($)",10000],["tax","Illustrative relevant income tax (%)",22],["extra","Hypothetical additional-tax rate (%)",0],["years","Foregone growth years",20],["growth","Hypothetical annual growth (%)",6]],"outputs":[["incomeTax","Modeled ordinary income tax","money"],["net","Net cash after modeled taxes","money"],["opportunity","Hypothetical future value if left invested","money"]],"checks":["net","opportunity"]}];
function calculate(type,v){
 const o={},positive=(n)=>Number.isFinite(n);
 if(type==="stock"){o.dividendCash=v.shares*v.dividend;o.gain=v.shares*(v.sell-v.buy)+o.dividendCash-v.fees;o.return=v.buy*v.shares>0?100*o.gain/(v.buy*v.shares):NaN;}
 if(type==="dividend"){const g=v.growth/100,k=v.discount/100,stress=k+v.shock/100;o.value=k>g?v.div/(k-g):NaN;o.stressed=stress>g?v.div/(stress-g):NaN;o.change=o.value>0?100*(o.stressed/o.value-1):NaN;}
 if(type==="bond"){o.priceA=v.face/Math.pow(1+v.yieldA/100,v.years);o.priceB=v.face/Math.pow(1+v.yieldB/100,v.years);o.priceMove=o.priceB-o.priceA;}
 if(type==="portfolio"){const w=v.weight/100,u=1-w,s=v.stockVol/100,b=v.bondVol/100,c=v.correlation,rs=v.stockReturn/100,rb=v.bondReturn/100;o.portfolioReturn=100*(w*rs+u*rb);const variance=w*w*s*s+u*u*b*b+2*w*u*s*b*c;o.volatility=100*Math.sqrt(Math.max(0,variance));const stocks=v.capital*w*(1+rs),bonds=v.capital*u*(1+rb),total=stocks+bonds;o.endingStockWeight=total>0?100*stocks/total:NaN;o.sellStocks=stocks-w*total;}
 if(type==="drawdown"){o.remaining=v.balance*(1-v.loss/100);o.lossDollar=v.balance-o.remaining;o.recover=o.remaining>0?100*(v.balance/o.remaining-1):NaN;}
 if(type==="savings"){const n=Math.round(v.years*12),r=(v.gross-v.fee)/1200;o.contrib=v.monthly*n;o.future=n>0?(Math.abs(r)<1e-12?v.monthly*n:v.monthly*Math.expm1(n*Math.log1p(r))/r):0;o.real=o.future/Math.pow(1+v.inflation/100,v.years);}
 if(type==="taxChoice"){o.trad=v.gross*v.factor*(1-v.futureTax/100);o.roth=v.gross*(1-v.currentTax/100)*v.factor;o.difference=o.roth-o.trad;}
 if(type==="taxLots"){o.gainA=v.shares*(v.sale-v.basisA);o.gainB=v.shares*(v.sale-v.basisB);o.delta=o.gainA-o.gainB;}
 if(type==="iraHome"){o.incomeTax=v.gross*v.tax/100;o.net=v.gross-o.incomeTax-v.gross*v.extra/100;o.opportunity=v.gross*Math.pow(1+v.growth/100,v.years);}
 return o;
}
function valid(type,v){
 if(Object.values(v).some(x=>!Number.isFinite(x)))return false;
 if(type==="stock")return v.buy>0&&v.sell>=0&&v.shares>0&&v.shares<=1e8&&v.dividend>=0&&v.fees>=0;
 if(type==="dividend")return v.div>0&&v.discount>0&&v.discount<100&&v.growth>=-20&&v.growth<100&&v.shock>=-50&&v.shock<=50&&v.discount>v.growth&&v.discount+v.shock>v.growth;
 if(type==="bond")return v.face>=0&&v.years>0&&v.years<=100&&v.yieldA>-100&&v.yieldB>-100&&v.yieldA<=100&&v.yieldB<=100;
 if(type==="portfolio")return v.capital>0&&v.weight>=0&&v.weight<=100&&v.stockReturn>=-100&&v.bondReturn>=-100&&v.stockVol>=0&&v.bondVol>=0&&v.correlation>=-1&&v.correlation<=1;
 if(type==="drawdown")return v.balance>=0&&v.loss>=0&&v.loss<100;
 if(type==="savings")return v.monthly>=0&&v.years>=0&&v.years<=80&&v.gross>-100&&v.gross<=50&&v.fee>=0&&v.fee<=20&&v.gross-v.fee>-100&&v.inflation>-100&&v.inflation<=50;
 if(type==="taxChoice")return v.gross>=0&&v.currentTax>=0&&v.currentTax<=100&&v.futureTax>=0&&v.futureTax<=100&&v.factor>=0&&v.factor<=100;
 if(type==="taxLots")return v.shares>0&&v.sale>=0&&v.basisA>=0&&v.basisB>=0;
 if(type==="iraHome")return v.gross>=0&&v.tax>=0&&v.extra>=0&&v.tax+v.extra<=100&&v.years>=0&&v.years<=80&&v.growth>-100&&v.growth<=50;
 return false;
}

const labelValue=(x,fmt)=>fmt==="percent"?fixed(x)+"%":fmt==="number"?fixed(x):money(x);
function labMarkup(def){
 return '<div class="lab wl-m4-lab" data-m4-lab="'+esc(def.id)+'"><div class="eyebrow">QUANTITATIVE PRACTICE · PRIVATE INPUTS</div><h3>'+esc(def.title)+'</h3><p>'+esc(def.explain)+'</p><div class="controls">'+def.fields.map(([key,name,value])=>'<label>'+esc(name)+'<input type="number" step="any" inputmode="decimal" data-m4-input="'+esc(key)+'" value="'+value+'"></label>').join('')+'</div><div class="results">'+def.outputs.map(([key,label,fmt])=>'<div class="metric"><span>'+esc(label)+'</span><b data-m4-output="'+esc(key)+'"></b></div>').join('')+'</div><p data-m4-warning class="wl-m4-warning"></p><details class="wl-m4-selfcheck"><summary>Independently calculate and check answers</summary><p>Work the formulas with your own inputs, then type the answers. Percent answers use percentage numbers (for example 12.70, not 0.127). No values are saved.</p>'+def.checks.map(key=>'<label>'+esc(def.outputs.find(x=>x[0]===key)[1])+'<input type="number" step="any" inputmode="decimal" data-m4-answer="'+esc(key)+'" placeholder="Your numerical answer"></label>').join('')+'<button type="button" data-m4-check="yes" class="secondary">Check calculations</button><p role="status" data-m4-feedback></p></details></div>';
}
function sectionMarkup(id,s,i){
 return '<section class="wl-m4-section" id="'+esc(id)+'.A'+(i+1)+'"><div class="part-label">Academic section · '+esc(id)+'.A'+(i+1)+'</div><h2>'+esc(s.title)+'</h2>'+s.body.map(p=>'<p>'+esc(p)+'</p>').join('')+'<div class="wl-m4-worked"><h3>Independent worked model</h3><ol>'+s.worked.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></div><div class="wl-m4-exercises"><h3>Practice and explanation</h3>'+s.practice.map((p,i)=>'<details><summary>Problem '+(i+1)+' · '+esc(p[0])+'</summary><p>'+esc(p[1])+'</p></details>').join('')+'</div></section>';
}
function chapterMarkup(id){
 const l=byId[id];if(!l)return '<div class="article">Module 4 Academic content unavailable for this lesson.</div>';
 const heads='<details class="wl-m4-toc"><summary>Study outcomes, prerequisites and chapter map</summary><h3>Prerequisites</h3><ul>'+l.prerequisites.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><h3>Outcomes</h3><ol>'+l.objectives.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>'+l.sections.map((x,i)=>'<p><a href="#'+esc(id)+'.A'+(i+1)+'">'+esc(id)+'.A'+(i+1)+' · '+esc(x.title)+'</a></p>').join('')+'</details>';
 const models=LABS.filter(x=>x.lesson===id).map(labMarkup).join('');
 const assessment='<section class="wl-m4-assessment"><h2>Independent chapter assessment</h2><h3>'+esc(l.assessment.title)+'</h3><p>'+esc(l.assessment.prompt)+'</p><h3>Grading rubric</h3><ul>'+l.assessment.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><p>Written assignments require independent evaluation; these self-check labs grade numerical steps only.</p></section>';
 const sources='<section class="wl-m4-sources"><h2>Authoritative research sources</h2><p>Tax figures apply to stated 2026 examples; products, rates and laws can change. Verify current filing instructions and prospectuses before acting.</p><ul>'+l.sourceRefs.map(([title,url])=>'<li><a href="'+esc(url)+'" rel="noopener noreferrer" target="_blank">'+esc(title)+'</a></li>').join('')+'</ul></section>';
 const cap=data.capstone;
 const capstone=id==="L4.S3"?'<details class="wl-m4-capstone"><summary>Module 4 cumulative investment-committee capstone · solutions included</summary><h2>'+esc(cap.title)+'</h2><p>'+esc(cap.intro)+'</p><h3>Fictional household facts</h3><ol>'+cap.scenario.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><h3>Required individual deliverables</h3><ol>'+cap.tasks.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><details><summary>Reveal independently worked answer key</summary><ol>'+cap.answers.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></details><h3>Assessment rubric</h3><ul>'+cap.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></details>':"";
 return '<div class="article wl-academic wl-m4-academic"><p class="wl-acad-kicker">INVESTING &amp; GROWTH · ADVANCED ACADEMIC EDITION</p><h1>'+esc(l.title)+'</h1><p class="wl-acad-explain">'+esc(l.subtitle)+'</p><p class="wl-acad-explain">Additive university-style study. Your existing chapter answers and private notes remain in the original Learn, Try It and Notes tabs.</p>'+heads+l.sections.map((s,i)=>sectionMarkup(id,s,i)).join('')+'<section class="wl-m4-models"><h2>Interactive financial modeling laboratory</h2><p>Change assumptions, check calculations independently, and investigate what drives your result. These models do not write to your learning storage.</p>'+models+'</section>'+assessment+sources+capstone+'<p class="wl-acad-foot">Independent finance self-study, not an accredited degree or individual investment or tax advice. Numerical rates are hypothetical unless cited as tax-year legal limits. Neither market returns nor investment outcomes are guaranteed.</p></div>';
}
function update(root){
 const def=LABS.find(x=>x.id===root.dataset.m4Lab);if(!def)return null;
 const v={};for(const e of root.querySelectorAll("[data-m4-input]"))v[e.dataset.m4Input]=Number(e.value);
 const ok=[...root.querySelectorAll("[data-m4-input]")].every(e=>e.value.trim()!=="")&&valid(def.id,v);
 const result=ok?calculate(def.id,v):{};
 for(const e of root.querySelectorAll("[data-m4-output]")){const m=def.outputs.find(x=>x[0]===e.dataset.m4Output);e.textContent=ok?labelValue(result[e.dataset.m4Output],m?.[2]):"Check inputs";}
 const w=root.querySelector("[data-m4-warning]");if(w)w.textContent=ok?"Hypothetical model; not a market forecast, lender quote, tax return or guarantee.":"Enter valid assumptions before interpreting results.";
 return {ok,result,def};
}
function check(root){
 const m=update(root);if(!m||!m.ok)return;
 let n=0,labels=[];
 for(const key of m.def.checks){
  const e=root.querySelector('[data-m4-answer="'+key+'"]');
  const given=e?.value?.trim()===""?NaN:Number(e.value),actual=m.result[key];
  const tol=Math.max(.035,Math.abs(actual)*.000001);
  const right=Number.isFinite(given)&&Number.isFinite(actual)&&Math.abs(given-actual)<=tol;
  if(right)n++;
  labels.push((right?"Correct":"Review")+" "+key+" = "+fixed(actual));
 }
 const f=root.querySelector("[data-m4-feedback]");
 if(f)f.textContent=n+"/"+m.def.checks.length+" correct. "+labels.join("; ");
}
document.addEventListener("input",ev=>{const root=ev.target?.closest?.(".wl-m4-lab");if(root&&ev.target.matches("[data-m4-input]"))update(root);});
document.addEventListener("click",ev=>{const b=ev.target?.closest?.("[data-m4-check]");if(b){const root=b.closest(".wl-m4-lab");if(root)check(root);}});
window.WealthLabAcademicM4Markup=chapterMarkup;
window.WealthLabAcademicM4Init=function(){for(const e of document.querySelectorAll(".wl-m4-lab"))update(e);};
window.WealthLabAcademicM4Calculate=calculate;
window.WealthLabAcademicM4Valid=valid;
})();
