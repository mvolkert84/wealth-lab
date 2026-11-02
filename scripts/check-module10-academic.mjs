import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module10-data.js'),cs=read('academy-academic/module10-core.js'),css=read('academy-academic/module10-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM10Data,ids=['L10.S1','L10.S2','L10.S3','L10.S4'];
assert.equal(d.schema,'wealth-lab-m10-academic-v1');
assert.deepEqual(Array.from(d.lessonIds),ids);
let sections=0,words=0,problems=0;
for(const [i,id] of ids.entries()){
 const lesson=d.lessons[i];assert.equal(lesson.id,id);assert.equal(lesson.sections.length,7);
 assert.ok(lesson.sourceRefs.length>=5&&lesson.sourceRefs.every(x=>x[1].startsWith('https://')));
 for(const s of lesson.sections){sections++;words+=s.body.join(' ').split(/\s+/).length;problems+=s.practice.length;
  assert.equal(s.body.length,4);assert.ok(s.body.every(x=>x.length>250));
  assert.ok(s.practice.length===2&&s.practice.every(x=>x[1].length>90));
  assert.ok(s.worked.length>=4);}
 const page=e.WealthLabAcademicM10Markup(id);
 assert.ok(page.includes(id+'.A7')&&page.includes('Independent chapter assessment'));
 assert.equal((page.match(/data-m10-lab=/g)||[]).length,4);
 assert.ok(page.includes('Authoritative research sources'));
}
assert.equal(sections,28);assert.equal(problems,56);assert.ok(words>=7500);
assert.ok(e.WealthLabAcademicM10Markup('L9.S4').includes('unavailable'));
assert.ok(html.includes("(m.id==='M1'||m.id==='M2'||m.id==='M3'||m.id==='M4'||m.id==='M5'||m.id==='M6'||m.id==='M7'||m.id==='M8'||m.id==='M9'||m.id==='M10'||m.id==='M11')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM10Markup?.(s.id)')&&html.includes('WealthLabAcademicM10Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(html.includes('academy-chapters/L10.S1.js?v=1.0.0'));
for(const f of ['module10-data.js','module10-core.js','module10-academic.css'])assert.ok(html.includes(f+'?v=3.0.0')&&sw.includes(f+'?v=3.0.0'));
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('localStorage'));
assert.ok(d.capstone.tasks.length>=14&&d.capstone.answers.length>=14&&d.capstone.sources.length>=5);
assert.ok(e.WealthLabAcademicM10Markup('L10.S4').includes('Module 10 cumulative investment-policy committee capstone'));
const fixture=[
['allocation',{value:40000,stocks:70,bonds:20},{equity:28000,fixed:8000,cash:4000,stockStress:29800}],
['buckets',{cash:18000,emergency:6000,home:12000,repair:2500},{surplus:0,after:15500,gap:2500}],
['goal',{target:20000,existing:12000,months:24,affordable:250},{required:333.333333,forecast:18000,shortfall:2000,funded:60}],
['sequence',{start:100000,loss:30,withdrawal:10000,recovery:30},{afterShock:70000,afterWithdrawal:60000,afterRecovery:78000}],
['covariance',{stockWeight:60,stockVol:20,bondVol:8,correlation:.25,stockReturn:7,bondReturn:3},{cov:.004,variance:.017344,volatility:100*Math.sqrt(.017344),expected:5.4}],
['regimes',{equity:60,growthStock:8,growthBond:3,recessionStock:-35,recessionBond:5,inflationStock:-25,inflationBond:-12},{growth:6,recession:-19,inflation:-19.8}],
['concentration',{portfolio:20000,issuerWeight:35,issuerDrop:60,fundA:10000,fundB:10000,overlapA:40,overlapB:60},{issuerLoss:4200,lossPct:21,overlap:50}],
['var',{expected:5,vol:15,rf:2,value:20000,z:1.645},{sharpe:.2,lower:-19.675,loss:3935}],
['drift',{stock:8000,bond:4000,target:60,band:5},{current:66.666667,drift:6.666667,sell:800,trigger:1}],
['contribute',{stock:8000,bond:4000,target:60,monthly:250},{add:1333.333333,months:6,post:60}],
['taxtrade',{proceeds:800,basis:500,rate:15,spread:.2},{gain:300,tax:45,trade:1.6,net:753.4}],
['shockRebalance',{stock:12000,bond:8000,stockReturn:-30,bondReturn:5,stockTarget:60},{newStock:8400,newBond:8400,weight:50,buy:1680}],
['ipsmix',{value:40000,stockWeight:60,bondWeight:30,stockFall:35,bondFall:8},{stocks:24000,bonds:12000,cash:4000,stressed:30640,loss:23.4}],
['floor',{floor:6000,current:4500,monthly:250},{deficit:1500,months:6}],
['twr',{start:10000,before:11000,deposit:9000,end:18000},{first:10,second:-10,linked:-1}],
['fee',{initial:40000,gross:6,fees:1,years:20},{grossEnd:40000*Math.pow(1.06,20),netEnd:40000*Math.pow(1.05,20),drag:40000*(Math.pow(1.06,20)-Math.pow(1.05,20))}]
];
for(const [name,args,expected] of fixture){
 assert.ok(e.WealthLabAcademicM10Valid(name,args),'Invalid default '+name);
 const actual=e.WealthLabAcademicM10Calculate(name,args);
 for(const [key,v] of Object.entries(expected))assert.ok(Number.isFinite(actual[key])&&Math.abs(actual[key]-v)<.1,name+'.'+key+' expected '+v+' got '+actual[key]);
}
assert.ok(!e.WealthLabAcademicM10Valid('covariance',{stockWeight:60,stockVol:20,bondVol:8,correlation:2,stockReturn:7,bondReturn:3}));
assert.ok(!e.WealthLabAcademicM10Valid('contribute',{stock:8000,bond:4000,target:60,monthly:0}));
assert.ok(!e.WealthLabAcademicM10Valid('ipsmix',{value:40000,stockWeight:80,bondWeight:30,stockFall:35,bondFall:8}));
console.log('PASS M10: '+sections+' risk/IPS academic sections, '+problems+' independent written problems, '+words+' explanatory words.');
console.log('PASS 16 models: goals, risk, covariance, volatility, VaR, drift, tax, stress, policy and time-weighted performance.');
console.log('PASS original course, earlier modules, progress state, capstone and offline PWA.');
