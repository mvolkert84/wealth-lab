import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module13-data.js'),cs=read('academy-academic/module13-core.js'),css=read('academy-academic/module13-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM13Data,ids=['L13.S1','L13.S2','L13.S3','L13.S4'];
assert.equal(d.schema,'wealth-lab-m13-academic-v1');assert.equal(d.taxYear,2026);
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
 const rendered=e.WealthLabAcademicM13Markup(id);
 assert.ok(rendered.includes(id+'.A'+lesson.sections.length));
 assert.ok(rendered.includes('Independent chapter assessment'));
 assert.ok(rendered.includes('Authoritative research sources'));
 assert.equal((rendered.match(/data-m13-lab=/g)||[]).length,5);
 assert.ok(lesson.assessment.answerKey.length>=5);
}
assert.equal(sections,33);assert.equal(questions,66);assert.ok(words>=6000);
assert.equal(d.capstone.tasks.length,20);assert.ok(d.capstone.answers.length>=14&&d.capstone.sources.length>=7);
assert.ok(e.WealthLabAcademicM13Markup('L13.S4').includes('Module 13 cumulative'));
assert.ok(e.WealthLabAcademicM13Markup('L1.S1').includes('unavailable'));
assert.ok(html.includes("||m.id==='M13')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM13Markup?.(s.id)'));
assert.ok(html.includes('WealthLabAcademicM13Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(!cs.includes('localStorage'));
for(const f of ['module13-data.js','module13-core.js','module13-academic.css']){assert.ok(html.includes(f+'?v=3.0.0'));assert.ok(sw.includes(f+'?v=3.0.0'));}
assert.ok(sw.includes('m13-v3'));assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('dataset.m12'));
const fixture=[
['coverage',{mortgage:220000,support:250000,education:30000,final:10000,resources:40000},{gross:510000,gap:470000}],
['human',{support:30000,years:20,rate:3},{factor:(1-1.03**(-20))/.03,pv:30000*(1-1.03**(-20))/.03}],
['disability',{essentials:2700,waiting:3,benefit:1900,reserve:6000},{waitingGap:8100,cashShort:2100,ongoing:800}],
['termdiff',{term:35,permanent:250,rate:6,years:20},{difference:215,invested:51600,fv:215*((1.005**240-1)/.005)}],
['premiums',{monthly:500,term:35,permanent:250},{termLeft:465,permLeft:250,annualDelta:2580}],
['loan',{principal:15000,rate:7,years:5,death:250000},{yearOne:1050,debt:15000*1.07**5,netDeath:250000-15000*1.07**5}],
['surrender',{value:60000,basis:40000,loan:35000,rate:22},{netCash:25000,gain:20000,tax:4400}],
['lapse',{principal:30000,rate:8,years:5,surrender:42000},{debt:30000*1.08**5,cushion:42000-30000*1.08**5,coverage:100*30000*1.08**5/42000}],
['premiumHome',{budget:500,premium:400,months:48,target:15000},{monthly:100,saved:4800,short:10200}],
['policyTax',{proceeds:60000,basis:40000,low:12,high:22},{gain:20000,lowTax:2400,highTax:4400}],
['home',{value:300000,debt:200000,cost:6},{grossEquity:100000,saleCost:18000,net:82000}],
['tenancy',{value:300000,share:50,debt:40000},{shareGross:150000,shareNet:110000}],
['trust',{house:300000,mortgage:200000,funded:0},{controlled:0,equity:100000,unfunded:300000}],
['beneficiary',{ira:120000,life:300000,stale:120000},{total:420000,atRisk:120000,percent:120000/420000*100}],
['carry',{taxins:4800,repairs:3000,utilities:1800,years:2,cash:8000},{annual:9600,required:19200,shortfall:11200}],
['exclusion',{estate:15400000},{federal:15000000,ct:15000000,excess:400000,ctSimple:48000}],
['gift',{gift:29000},{annual:19000,covered:19000,excess:10000}],
['basis',{basis:150000,death:300000,sale:310000},{inheritedGain:10000,giftGain:160000,difference:150000}],
['estateLiquidity',{tax:4800,repair:3000,utility:1800,years:2,cash:8000},{annual:9600,reserve:19200,shortfall:11200}],
['estateNet',{home:300000,broker:40000,ira:60000,cash:10000,mortgage:200000},{gross:410000,debt:200000,net:210000}]
];
for(const [id,v,expected] of fixture){
 assert.ok(e.WealthLabAcademicM13Valid(id,v),'Invalid default: '+id);
 const actual=e.WealthLabAcademicM13Calculate(id,v);
 for(const [k,want] of Object.entries(expected))assert.ok(Number.isFinite(actual[k])&&Math.abs(actual[k]-want)<.03,id+'.'+k+' expected '+want+' got '+actual[k]);
}
assert.ok(!e.WealthLabAcademicM13Valid('trust',{house:300000,mortgage:200000,funded:2}));
assert.ok(!e.WealthLabAcademicM13Valid('loan',{principal:15000,rate:150,years:5,death:250000}));
assert.ok(!e.WealthLabAcademicM13Valid('home',{value:300000,debt:295000,cost:6}));
console.log('Module 13 academic verified: 4 lessons, '+sections+' sections, '+questions+' questions, '+words+' explanatory words, '+fixture.length+' numeric labs, 0 fails.');
