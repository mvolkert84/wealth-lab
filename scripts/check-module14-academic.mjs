import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module13-data.js'),cs=read('academy-academic/module13-core.js'),css=read('academy-academic/module13-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM14Data,ids=['L14.S1','L14.S2','L14.S3','L14.S4'];
assert.equal(d.schema,'wealth-lab-m14-academic-v1');assert.equal(d.taxYear,2026);
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
  assert.ok(part.practice.every(q=>q[1].length>=60));
  questions+=part.practice.length;
 }
 const rendered=e.WealthLabAcademicM14Markup(id);
 assert.ok(rendered.includes(id+'.A'+lesson.sections.length));
 assert.ok(rendered.includes('Independent chapter assessment'));
 assert.ok(rendered.includes('Authoritative research sources'));
 assert.equal((rendered.match(/data-m14-lab=/g)||[]).length,5);
 assert.ok(lesson.assessment.answerKey.length>=5);
}
assert.equal(sections,32);assert.equal(questions,64);assert.ok(words>=5500);
assert.equal(d.capstone.tasks.length,20);assert.ok(d.capstone.answers.length>=14&&d.capstone.sources.length>=7);
assert.ok(e.WealthLabAcademicM14Markup('L14.S4').includes('Module 14 cumulative'));
assert.ok(e.WealthLabAcademicM14Markup('L1.S1').includes('unavailable'));
assert.ok(html.includes("||m.id==='M14')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM14Markup?.(s.id)'));
assert.ok(html.includes('WealthLabAcademicM14Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(!cs.includes('localStorage'));
for(const f of ['module13-data.js','module13-core.js','module13-academic.css']){assert.ok(html.includes(f+'?v=3.0.0'));assert.ok(sw.includes(f+'?v=3.0.0'));}
assert.ok(sw.includes('m14-v3'));assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('dataset.m12'));
const fixture=[["rent",{"units":2,"rent":1400,"vacancy":2,"credit":700},{"gross":33600,"loss":2800,"effective":30100}],["noi",{"effective":30100,"tax":5400,"insurance":1500,"repair":2400,"manage":2400,"utilities":1200},{"expenses":12900,"noi":17200}],["waterfall",{"noi":17200,"debt":15000,"reserve":2000,"capital":4000},{"afterDebt":2200,"afterReserve":200,"free":-3800}],["breakeven",{"expenses":7500,"debt":14000,"reserve":1500,"vacancy":6},{"need":23000,"gross":24468.08510638298,"monthly":2039.0070921985816}],["ctDeposit",{"rent":1800,"age":42,"deposit":3600},{"limit":3600,"annualInterest":17.64,"ownerIncome":0}],["cap",{"noi":12000,"price":200000,"market":7},{"current":6,"value":171428.57142857142,"difference":-28571.42857142858}],["mortgage",{"loan":150000,"rate":7,"years":30},{"monthly":997.9537427687735,"interest":875,"principal":122.95374276877351,"annual":11975.444913225281}],["dscr",{"noi":12000,"annual":11975.45,"loan":150000,"value":200000},{"dscr":1.0020500273476152,"ltv":75,"cash":24.55}],["coc",{"down":50000,"closing":6000,"repair":4000,"noi":12000,"debt":11975.45,"reserve":2000},{"invested":60000,"free":-1975.45,"coc":-3.2924166666666665}],["npv",{"initial":60000,"y1":3000,"y2":70000,"rate":10},{"pv":60578.51239669422,"npv":578.5123966942192}],["replacement",{"roof":15000,"roofYears":5,"hvac":8000,"hvacYears":8,"heater":2000,"heaterYears":5},{"roofYear":3000,"hvacYear":1000,"heaterYear":400,"total":4400}],["turnover",{"rent":1800,"empty":2,"repair":1200,"marketing":400,"utilities":300},{"lost":3600,"cost":1900,"total":5500}],["costshock",{"tax":5400,"taxPct":20,"insurance":1500,"insPct":30,"surplus":2000},{"taxAdd":1080,"insAdd":450,"surplusAfter":470}],["reserve",{"fixed":1200,"months":5,"deductible":2500,"cash":3000},{"floor":8500,"shortfall":5500}],["stress",{"base":3000,"lost":5500,"tax":1530,"roof":9000,"noi":18000,"debt":14000},{"free":-13030,"stressedNOI":10970,"dscr":0.7835714285714286}],["depreciation",{"price":250000,"land":50000,"years":5},{"building":200000,"annual":7272.727272727273,"accumulated":36363.63636363636}],["passive",{"magi":120000,"loss":12000},{"ceiling":15000,"usable":12000,"suspended":0}],["sale",{"price":300000,"costs":18000,"mortgage":170000,"basis":190000},{"cash":112000,"realized":282000,"gain":92000}],["gain1250",{"gain":92000,"depreciation":30000},{"slice":30000,"other":62000,"max":7500}],["exchange",{"gain":92000,"boot":10000},{"identify":45,"receive":180,"taxable":10000,"deferred":82000}]];
for(const [id,v,expected] of fixture){
 assert.ok(e.WealthLabAcademicM14Valid(id,v),'Invalid default: '+id);
 const actual=e.WealthLabAcademicM14Calculate(id,v);
 for(const [k,want] of Object.entries(expected))assert.ok(Number.isFinite(actual[k])&&Math.abs(actual[k]-want)<.03,id+'.'+k+' expected '+want+' got '+actual[k]);
}
assert.ok(!e.WealthLabAcademicM14Valid('ctDeposit',{rent:1800,age:62,deposit:3600}));
assert.ok(!e.WealthLabAcademicM14Valid('mortgage',{loan:150000,rate:7,years:0}));
assert.ok(!e.WealthLabAcademicM14Valid('sale',{price:300000,costs:350000,mortgage:170000,basis:190000}));
const negNOI=e.WealthLabAcademicM14Calculate('noi',{effective:10000,tax:5400,insurance:1500,repair:2400,manage:2400,utilities:1200});
assert.ok(e.WealthLabAcademicM14Valid('noi',{effective:10000,tax:5400,insurance:1500,repair:2400,manage:2400,utilities:1200})&&negNOI.noi<0);
console.log('Module 14 academic verified: 4 lessons, '+sections+' sections, '+questions+' questions, '+words+' explanatory words, '+fixture.length+' numeric labs, 0 fails.');
