import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),dataSource=read('academy-academic/module3-data.js'),coreSource=read('academy-academic/module3-core.js'),css=read('academy-academic/module3-academic.css');
new Script(dataSource);new Script(coreSource);
const env={document:{addEventListener(){},querySelectorAll(){return[];}},console};env.window=env;
runInNewContext(dataSource,env);runInNewContext(coreSource,env);
const d=env.WealthLabAcademicM3Data,ids=['L3.S1','L3.S2','L3.S3'];
assert.equal(d.schema,'wealth-lab-m3-academic-v1');
assert.deepEqual(Array.from(d.lessonIds),ids);
let count=0,words=0,open=0;
for(let k=0;k<3;k++){
 const l=d.lessons[k];assert.equal(l.id,ids[k]);
 assert.ok(l.sections.length>=6);
 assert.ok(l.prerequisites.length>=3&&l.objectives.length>=4);
 assert.ok(l.sourceRefs.length>=5&&l.sourceRefs.every(row=>row[1].startsWith('https://')));
 for(let i=0;i<l.sections.length;i++){
  const section=l.sections[i];count++;
  assert.equal(section.body.length,4);
  assert.ok(section.body.every(p=>p.length>=135),'Expository paragraphs must explain a mechanism');
  assert.ok(section.worked.length>=4&&section.practice.length===2);
  assert.ok(section.practice.every(p=>p[0].length>20&&p[1].length>45));
  words+=section.body.join(' ').trim().split(/\s+/).length;open+=section.practice.length;
 }
 const page=env.WealthLabAcademicM3Markup(l.id);
 assert.ok(page.includes(l.id+'.A1')&&page.includes(l.id+'.A'+l.sections.length));
 assert.ok(page.includes('data-m3-lab="'+l.id+'"'));
 assert.ok(page.includes('data-m3-check'));
 assert.ok(page.includes('Written and numerical chapter assessment'));
}
assert.ok(count>=18&&words>=5300&&open>=36);
assert.ok(env.WealthLabAcademicM3Markup('L8.S1').includes('unavailable'));
assert.ok(html.includes("(m.id==='M1'||m.id==='M2'||m.id==='M3')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('window.WealthLabAcademicM3Markup?.(s.id)'));
assert.ok(html.includes('window.WealthLabAcademicM3Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
for(const id of ids)assert.ok(html.includes('src="./academy-chapters/'+id+'-edition2.js?v=2.0.0"'));
for(const file of ['module3-data.js','module3-core.js','module3-academic.css']){
 assert.ok(html.includes('./academy-academic/'+file+'?v=3.0.0'));
 assert.ok(sw.includes("'./academy-academic/"+file+"?v=3.0.0'"));
}
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!coreSource.includes('localStorage'),'Academic worksheets must not access stored progress');
assert.ok(d.capstone.scenario.length>=6&&d.capstone.tasks.length>=6&&d.capstone.answer.length>=6);
const calc=env.WealthLabAcademicM3Calculate;
const near=(a,b,eps=.035)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=eps,'Expected '+b+', got '+a);
const a=calc('L3.S1',{house:260000,mortgage:220000,second:12000,openingCash:30000,investments:70000,income:2000,appreciation:4000,fees:1200,distributions:5000,salePct:6});
near(a.equity,28000);near(a.sale,12400);near(a.cashEnd,25800);near(a.trustAssets,99800);near(a.trustDelta,-200);
const b=calc('L3.S2',{basis:100000,deathValue:300000,sale:310000,trustAssets:300000,feePct:.8,fixedFees:1200,years:10});
near(b.giftGain,210000);near(b.inheritGain,10000);near(b.gainDiff,200000);near(b.annualFees,3600);near(b.simpleFees,36000);
const c=calc('L3.S3',{home:260000,first:220000,second:12000,selling:6,education:30000,inflation:3,fund:15000,growth:5,years:8,fee:500});
near(c.equity,28000);near(c.proceeds,12400);near(c.eduFuture,38003.10244);near(c.fundNet,17387.27722);near(c.gap,20615.82522);near(c.coverage,45.7522573);
assert.ok(d.capstone.answer.join(' ').includes('−$12,040'));
assert.ok(d.capstone.answer.join(' ').includes('$99,800'));
console.log('PASS: Module 3 academic curriculum '+count+' sections, '+words+' body words, '+open+' independent problems.');
console.log('PASS: Trust ledgers, tax basis, asset fee and child education calculations independently verified.');
console.log('PASS: M1-M3 reader compatibility, original IDs, original progress, offline PWA and self-check assessments.');
