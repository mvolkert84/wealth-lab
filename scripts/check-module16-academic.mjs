import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module16-data.js'),cs=read('academy-academic/module16-core.js'),css=read('academy-academic/module16-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM16Data,ids=['L16.S1','L16.S2','L16.S3','L16.S4'];
assert.equal(d.schema,'wealth-lab-m16-academic-v1');assert.equal(d.taxYear,2026);
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
 const rendered=e.WealthLabAcademicM16Markup(id);
 assert.ok(rendered.includes(id+'.A'+lesson.sections.length));
 assert.ok(rendered.includes('Independent chapter assessment'));
 assert.ok(rendered.includes('Authoritative research sources'));
 assert.equal((rendered.match(/data-m16-lab=/g)||[]).length,5);
 assert.ok(lesson.assessment.answerKey.length>=5);
}
assert.equal(sections,32);assert.equal(questions,64);assert.ok(words>=5600);
assert.equal(d.capstone.tasks.length,20);assert.ok(d.capstone.answers.length>=14&&d.capstone.sources.length>=7);
assert.ok(e.WealthLabAcademicM16Markup('L16.S4').includes('Module 16 comprehensive financial planning final capstone'));
assert.ok(e.WealthLabAcademicM16Markup('L1.S1').includes('unavailable'));
assert.ok(html.includes("||m.id==='M16')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM16Markup?.(s.id)'));
assert.ok(html.includes('WealthLabAcademicM16Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(!cs.includes('localStorage'));
for(const f of ['module16-data.js','module16-core.js','module16-academic.css']){assert.ok(html.includes(f+'?v=3.0.0'));assert.ok(sw.includes(f+'?v=3.0.0'));}
assert.ok(sw.includes('m16-v3'));assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('dataset.m12'));
const fixture=[["layers",{"assets":200000,"adviser":1,"fund":0.5},{"advisorFee":2000,"fundFee":1000,"combined":3000,"rate":1.5}],["compounding",{"capital":200000,"gross":6,"fee":1.5,"years":20},{"noFee":641427.0944425697,"afterFee":482342.8049674812,"drag":159084.28947508847}],["rollover",{"assets":100000,"plan":0.15,"ira":1.3},{"planCost":150,"iraCost":1300,"difference":1150}],["policyConflict",{"monthly":350,"premium":300,"card":7000,"apr":22},{"left":50,"annualLeft":600,"interest":1540}],["adviserAlternatives",{"assets":200000,"managed":1.5,"other":0.15},{"managedCost":3000,"otherCost":300,"costGap":2700}],["margin",{"income":48000,"spending":42000},{"annual":6000,"monthly":500,"percent":12.5}],["reserve",{"cash":10000,"essential":3500,"target":6},{"months":2.857142857142857,"required":21000,"gap":11000}],["balance",{"cash":10000,"retirement":30000,"vehicle":9000,"card":7000,"carDebt":4000},{"assets":49000,"liabilities":11000,"net":38000}],["house",{"price":250000,"down":5,"closing":7500,"reserve":6000,"cash":10000},{"downCash":12500,"required":26000,"gap":16000}],["goal",{"monthly":500,"emergency":250,"card":150,"retire":100},{"allocated":500,"remaining":0,"savingsYear":3000}],["adviceAccount",{"assets":100000,"rate":1,"trades":100},{"advisory":1000,"transactions":100,"gap":900}],["pitch",{"loan":50000,"borrowing":10,"investment":12},{"interest":5000,"projected":6000,"spread":1000}],["pitchStress",{"loan":50000,"loss":20,"rate":10},{"marketLoss":10000,"interest":5000,"combinedLoss":15000}],["feeDisclosure",{"smaller":100000,"larger":200000,"adviser":1,"fund":0.5},{"smallCost":1500,"largeCost":3000,"difference":1500}],["registration",{"firm":1,"individual":1,"fees":1,"conflicts":0,"record":0},{"checks":3,"missing":2,"percent":60}],["card",{"balance":7000,"apr":22,"payment":500},{"months":17,"interest":1164.3109379477073,"paid":8164.310937947707,"last":164.31093794770615}],["mortgage",{"price":250000,"down":5,"rate":6.5,"years":30},{"principal":237500,"payment":1501.1615557957928,"annual":18013.938669549512}],["homeCarry",{"mortgage":1501.16,"tax":4200,"insurance":1200,"maintenance":3000,"pmi":100,"utilities":2400},{"extras":1000,"monthly":2501.16,"annual":30013.92}],["jobloss",{"cash":10000,"essential":4000,"months":2},{"required":8000,"left":2000,"deficit":0}],["roof",{"reserve":6000,"repair":9000,"other":0},{"required":9000,"left":-3000,"short":3000}]];
for(const [id,v,expected] of fixture){
 assert.ok(e.WealthLabAcademicM16Valid(id,v),'Invalid default: '+id);
 const actual=e.WealthLabAcademicM16Calculate(id,v);
 for(const [k,want] of Object.entries(expected))assert.ok(Number.isFinite(actual[k])&&Math.abs(actual[k]-want)<.03,id+'.'+k+' expected '+want+' got '+actual[k]);
}
assert.ok(!e.WealthLabAcademicM16Valid('registration',{firm:2,individual:1,fees:1,conflicts:1,record:1}));
assert.ok(!e.WealthLabAcademicM16Valid('card',{balance:7000,apr:22,payment:50}));
assert.ok(!e.WealthLabAcademicM16Valid('mortgage',{price:250000,down:100,rate:6.5,years:30}));
assert.ok(!e.WealthLabAcademicM16Valid('goal',{monthly:500,emergency:250,card:250,retire:100}));
const emergency=e.WealthLabAcademicM16Calculate('jobloss',{cash:3000,essential:4000,months:2});
assert.equal(emergency.deficit,5000);
console.log('Module 16 final academic verified: 4 lessons, '+sections+' sections, '+questions+' exercises, '+words+' instructional words, '+fixture.length+' independent numeric labs, 0 failures.');
