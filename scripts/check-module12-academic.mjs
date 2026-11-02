import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module12-data.js'),cs=read('academy-academic/module12-core.js'),css=read('academy-academic/module12-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM12Data,ids=['L12.S1','L12.S2','L12.S3','L12.S4'];
assert.equal(d.schema,'wealth-lab-m12-academic-v1');assert.equal(d.taxYear,2026);
assert.deepEqual(Array.from(d.lessonIds),ids);
let sections=0,questions=0,words=0;
for(const [i,id] of ids.entries()){
 const lesson=d.lessons[i];assert.equal(lesson.id,id);assert.equal(lesson.sections.length,9);
 assert.ok(lesson.sourceRefs.length>=8);assert.ok(lesson.sourceRefs.every(x=>x[1].startsWith('https://')));
 for(const part of lesson.sections){
  sections++;assert.ok(part.body.length>=3);
  assert.ok(part.body.every(p=>p.length>220));
  words+=part.body.join(' ').split(/\s+/).length;
  assert.ok(part.worked.length>=4);
  assert.equal(part.practice.length,2);
  assert.ok(part.practice.every(q=>q[1].length>80));
  questions+=part.practice.length;
 }
 const rendered=e.WealthLabAcademicM12Markup(id);
 assert.ok(rendered.includes(id+'.A9'));
 assert.ok(rendered.includes('Independent chapter assessment'));
 assert.ok(rendered.includes('Authoritative research sources'));
 assert.equal((rendered.match(/data-m12-lab=/g)||[]).length,5);
 assert.ok(lesson.assessment.answerKey.length>=5);
}
assert.equal(sections,36);assert.equal(questions,72);assert.ok(words>=7000);
assert.equal(d.capstone.tasks.length,20);assert.ok(d.capstone.answers.length>=20&&d.capstone.sources.length>=5);
assert.ok(e.WealthLabAcademicM12Markup('L12.S4').includes('Module 12 cumulative'));
assert.ok(e.WealthLabAcademicM12Markup('L1.S1').includes('unavailable'));
assert.ok(html.includes("||m.id==='M12'||m.id==='M13'||m.id==='M14'||m.id==='M15'||m.id==='M16')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM12Markup?.(s.id)'));
assert.ok(html.includes('WealthLabAcademicM12Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(!cs.includes('localStorage'));
for(const f of ['module12-data.js','module12-core.js','module12-academic.css']){assert.ok(html.includes(f+'?v=3.0.0'));assert.ok(sw.includes(f+'?v=3.0.0'));}
assert.ok(sw.includes('m12-v3'));
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('dataset.m11'));
const fixtures=[
['match',{salary:60000,deferral:6,max:6,rate:50},{employee:3600,employer:1800,monthly:300,total:5400}],
['paymatch',{salary:60000,periods:24,deferral:6,match:50,missed:6},{pay:2500,employee:150,employer:75,received:1350,lost:450}],
['vest',{employee:12000,employer:8000,percent:40},{ownedEmployee:12000,ownedEmployer:3200,owned:15200,forfeit:4800}],
['limits',{age:42,existing:3000,comp:60000},{standard:24500,catchup:0,maximum:24500,remaining:21500}],
['fees',{initial:40000,gross:6,low:.1,high:1.1,years:20},{lowBalance:40000*1.059**20,highBalance:40000*1.049**20,difference:40000*(1.059**20-1.049**20)}],
['equal',{afterCost:3000,now:22,later:12,growth:6,years:20},{traditional:3000/.78,roth:3000,rothEnd:3000*1.06**20,tradNet:3000/.78*1.06**20*.88,difference:(3000/.78*.88-3000)*1.06**20}],
['ira',{age:42,comp:50000,already:2500},{statutory:7500,permitted:7500,remaining:5000}],
['prorata',{aggregate:100000,basis:10000,converted:10000,rate:22},{ratio:10,nontaxable:1000,taxable:9000,tax:1980}],
['conversion',{conversion:20000,current:12,later:24},{currentTax:2400,alternateTax:4800,delta:2400}],
['location',{balance:10000,yield:4,rate:22},{interest:400,tax:88,net:312}],
['pia',{aime:4000},{lower:1157.4,middle:868.48,upper:0,pia:2025.88}],
['claim',{pia:2000},{a62:1400,a67:2000,a70:2480,breakeven:70+8*1400/1080}],
['earnings',{wages:33400,benefit:9600},{limit:24480,excess:8920,withheld:4460,received:5140}],
['combined',{benefits:22000,other:20000},{combined:31000,firstTier:3000,fraction:100*3000/22000}],
['floor',{essential:42000,ssa:26400,pension:3600,discretionary:6000},{floor:30000,essentialGap:12000,totalGap:18000}],
['sequence',{initial:100000,fall:30,gain:30,withdraw:10000},{lossFirst:78000,gainFirst:84000,difference:6000,noDraw:91000}],
['withdraw',{start:600000,rate:4,current:450000,inflation:3},{initial:24000,currentPct:100*24000/450000,fixedReal:24720,currentBalanceFour:18000}],
['inflation',{spending:24000,inflation:3,years:2,nominal:6},{future:25461.6,real:100*(1.06/1.03-1),growth:1461.6}],
['rmd',{balance:400000,divisor:26.5,rate:22},{rmd:400000/26.5,tax:400000/26.5*.22,cash:400000/26.5*.78}],
['shock',{start:200000,stockWeight:60,stockLoss:35,bondLoss:5,withdraw:8000,inflation:5},{afterShock:154000,afterDraw:146000,next:8400,rate:100*8400/146000}]
];
for(const [id,v,expected] of fixtures){
 assert.ok(e.WealthLabAcademicM12Valid(id,v),'Invalid default: '+id);
 const actual=e.WealthLabAcademicM12Calculate(id,v);
 for(const [k,want] of Object.entries(expected))assert.ok(Number.isFinite(actual[k])&&Math.abs(actual[k]-want)<.02,id+'.'+k+' expected '+want+' got '+actual[k]);
}
assert.ok(!e.WealthLabAcademicM12Valid('prorata',{aggregate:100000,basis:200000,converted:10000,rate:22}));
assert.ok(!e.WealthLabAcademicM12Valid('shock',{start:100,stockWeight:100,stockLoss:90,bondLoss:5,withdraw:50,inflation:5}));
console.log('Module 12 academic verified: '+ids.length+' lessons, '+sections+' sections, '+questions+' exercises, '+words+' instructional words, '+fixtures.length+' numerical tests, 0 fails.');
