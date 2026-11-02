import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module15-data.js'),cs=read('academy-academic/module15-core.js'),css=read('academy-academic/module15-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM15Data,ids=['L15.S1','L15.S2','L15.S3','L15.S4'];
assert.equal(d.schema,'wealth-lab-m15-academic-v1');assert.equal(d.taxYear,2026);
assert.deepEqual(Array.from(d.lessonIds),ids);
let sections=0,questions=0,words=0;
for(const [i,id] of ids.entries()){
 const lesson=d.lessons[i];assert.equal(lesson.id,id);
 assert.ok(lesson.sections.length>=8&&lesson.sections.length<=10);
 assert.ok(lesson.sourceRefs.length>=8);assert.ok(lesson.sourceRefs.every(x=>x[1].startsWith('https://')));
 for(const part of lesson.sections){sections++;assert.equal(part.body.length,3);
  assert.ok(part.body.every(p=>p.length>=175));
  words+=part.body.join(' ').split(/\s+/).length;
  assert.ok(part.worked.length>=4);
  assert.equal(part.practice.length,2);
  assert.ok(part.practice.every(q=>q[1].length>=45));
  questions+=part.practice.length;
 }
 const rendered=e.WealthLabAcademicM15Markup(id);
 assert.ok(rendered.includes(id+'.A'+lesson.sections.length));
 assert.ok(rendered.includes('Independent chapter assessment'));
 assert.ok(rendered.includes('Authoritative research sources'));
 assert.equal((rendered.match(/data-m15-lab=/g)||[]).length,5);
 assert.ok(lesson.assessment.answerKey.length>=5);
}
assert.equal(sections,32);assert.equal(questions,64);assert.ok(words>=5700);
assert.equal(d.capstone.tasks.length,20);assert.ok(d.capstone.answers.length>=14&&d.capstone.sources.length>=7);
assert.ok(e.WealthLabAcademicM15Markup('L15.S4').includes('Module 15 cumulative'));
assert.ok(e.WealthLabAcademicM15Markup('L1.S1').includes('unavailable'));
assert.ok(html.includes("||m.id==='M15')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM15Markup?.(s.id)'));
assert.ok(html.includes('WealthLabAcademicM15Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(!cs.includes('localStorage'));
for(const f of ['module15-data.js','module15-core.js','module15-academic.css']){assert.ok(html.includes(f+'?v=3.0.0'));assert.ok(sw.includes(f+'?v=3.0.0'));}
assert.ok(sw.includes('m15-v3'));assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('dataset.m12'));
const fixture=[["pnl",{"sales":150000,"direct":90000,"overhead":40000},{"gross":60000,"gm":40,"op":20000,"om":13.333333333333334}],["unit",{"price":120,"material":42,"other":8,"labor":25,"fixed":900,"discount":15},{"contrib":45,"margin":37.5,"breakEven":20,"discountContrib":27,"discountBreak":34}],["cashbridge",{"profit":20000,"depreciation":4000,"ar":9000,"inventory":6000,"ap":3000},{"working":12000,"cash":12000}],["runway",{"cash":15000,"operating":7000,"tax":2000,"repair":3000,"floor":5000},{"ending":3000,"gap":2000,"safe":0}],["valuation",{"benefit":50000,"labor":40000,"multiple":3,"debt":0},{"normalized":10000,"enterprise":30000,"equity":30000}],["ctfees",{"years":2},{"formation":120,"reports":160,"total":280}],["guarantee",{"loan":50000,"recovery":32000},{"deficiency":18000,"ownerRisk":18000}],["reasonable",{"pool":100000,"salary":65000},{"grossWages":65000,"prePayroll":35000}],["qbi",{"qbi":40000,"marginal":12},{"deduction":8000,"saving":960,"single":201750,"joint":403500}],["partners",{"profit":60000,"owners":2,"distribution":10000},{"allocated":30000,"gap":20000}],["spread",{"borrow":50000,"loan":8,"return":5},{"cost":4000,"gross":2500,"net":-1500}],["cashout",{"home":300000,"mortgage":200000,"loan":30000},{"initial":100000,"after":70000,"cash":30000,"netChange":0}],["margin",{"securities":12000,"loan":8000,"maintenance":40},{"equity":4000,"required":4800,"shortfall":800}],["amort",{"principal":50000,"rate":8,"years":5},{"payment":1013.8197144206928,"interestOnly":333.3333333333333,"balloon":50000}],["policy",{"principal":15000,"rate":7,"years":5,"budget":500,"premium":400,"months":48},{"debt":21038.275960500006,"left":100,"housing":4800}],["horizon",{"monthly":375,"home":250,"months":24},{"retire":125,"houseTotal":6000,"retireTotal":3000}],["expected",{"start":10000,"up":20,"down":10,"severe":40,"pUp":60,"pDown":30},{"pSevere":10,"expected":5,"expectedValue":10500,"severeValue":6000}],["labor",{"profit":8000,"hours":400,"rate":20},{"laborCost":8000,"normalized":0}],["score",{"liq":9,"safe":9,"grow":3,"tax":5,"labor":9},{"score":7.7}],["fv",{"monthly":250,"rate":4,"months":24},{"contributed":6000,"future":6235.721936929966,"growth":235.72193692996643}]];
for(const [id,v,expected] of fixture){
 assert.ok(e.WealthLabAcademicM15Valid(id,v),'Invalid default: '+id);
 const actual=e.WealthLabAcademicM15Calculate(id,v);
 for(const [k,want] of Object.entries(expected))assert.ok(Number.isFinite(actual[k])&&Math.abs(actual[k]-want)<.03,id+'.'+k+' expected '+want+' got '+actual[k]);
}
assert.ok(!e.WealthLabAcademicM15Valid('unit',{price:120,material:100,other:8,labor:25,fixed:900,discount:15}));
assert.ok(!e.WealthLabAcademicM15Valid('margin',{securities:12000,loan:8000,maintenance:120}));
assert.ok(!e.WealthLabAcademicM15Valid('expected',{start:10000,up:20,down:10,severe:40,pUp:70,pDown:40}));
const stressed=e.WealthLabAcademicM15Calculate('spread',{borrow:50000,loan:8,return:0});
assert.equal(stressed.net,-4000);
console.log('Module 15 academic verified: 4 lessons, '+sections+' sections, '+questions+' exercises, '+words+' reading words, '+fixture.length+' numerical labs; 0 failures.');
