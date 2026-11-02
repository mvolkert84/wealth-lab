import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module11-data.js'),cs=read('academy-academic/module11-core.js'),css=read('academy-academic/module11-academic.css');
new Script(ds);new Script(cs);
const vm={document:{addEventListener(){},querySelectorAll(){return [];}},console};vm.window=vm;
runInNewContext(ds,vm);runInNewContext(cs,vm);
const data=vm.WealthLabAcademicM11Data;
const ids=['L11.S1','L11.S2','L11.S3','L11.S4'];
assert.equal(data.schema,'wealth-lab-m11-academic-v1');
assert.equal(data.taxYear,2026);
assert.deepEqual(Array.from(data.lessonIds),ids);
let parts=0,problems=0,words=0;
for(const [i,id] of ids.entries()){
 const lesson=data.lessons[i];assert.equal(lesson.id,id);
 assert.ok(lesson.sections.length>=7);
 assert.ok(lesson.sourceRefs.length>=6);
 assert.ok(lesson.sourceRefs.every(x=>x.length===2&&x[1].startsWith('https://')));
 for(const s of lesson.sections){
  parts++;assert.ok(s.title.length>10);
  assert.ok(s.body.length>=3 && s.body.every(p=>p.length>180));
  words+=s.body.join(' ').split(/\s+/).length;
  assert.ok(s.worked.length>=4);
  assert.ok(s.practice.length>=2 && s.practice.every(q=>q[0].length>10 && q[1].length>90));
  problems+=s.practice.length;
 }
 const chapter=vm.WealthLabAcademicM11Markup(id);
 assert.ok(chapter.includes(id+'.A'+lesson.sections.length));
 assert.ok(chapter.includes('Independent chapter assessment'));
 assert.ok(chapter.includes('Authoritative research sources'));
 assert.equal((chapter.match(/data-m11-lab=/g)||[]).length,4);
 assert.ok(lesson.assessment.rubric.length>=4 && lesson.assessment.answerKey.length>=4);
}
assert.ok(parts>=30 && problems>=60 && words>=6000);
assert.ok(data.capstone.tasks.length>=16);
assert.ok(data.capstone.answers.length>=16);
assert.ok(data.capstone.sources.length>=5);
assert.ok(vm.WealthLabAcademicM11Markup('L11.S4').includes('Module 11 cumulative'));
assert.ok(vm.WealthLabAcademicM11Markup('L9.S4').includes('unavailable'));
assert.ok(html.includes("||m.id==='M11'||m.id==='M12'||m.id==='M13')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes("WealthLabAcademicM11Markup?.(s.id)"));
assert.ok(html.includes("WealthLabAcademicM11Init?.()"));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(!cs.includes('localStorage'));
for(const f of ['module11-data.js','module11-core.js','module11-academic.css']){
 assert.ok(html.includes(f+'?v=3.0.0'));
 assert.ok(sw.includes(f+'?v=3.0.0'));
}
assert.ok(sw.includes('m11-v3'));
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('dataset.m4'));
const values=[
['flow',{wages:85000,interest:1000,qualified:1500,gain:4000,adjustments:0,deduction:16100,withholding:13000},{agi:91500,taxable:75400,ordinary:69900,total:10915,refund:2085}],
['pay',{gross:90000,pretax:6000,withholding:10000,fica:6426,other:1500},{box1:84000,deposit:66074}],
['settlement',{tax:8000,withheld:9250,estimated:0,refundable:0},{paid:9250,refund:1250,due:0}],
['credits',{taxable:70000,deduction:1000,credit:1000},{before:10112,deductionSavings:220,afterCredit:8892}],
['brackets',{taxable:70000},{tax:10112,marginal:22,average:100*10112/70000,next1000:220}],
['joint',{agi:92000,deduction:32200},{taxable:59800,tax:6680,effective:100*6680/92000,marginal:12}],
['stack',{ordinary:46000,gain:7000},{zero:3450,fifteen:3550,twenty:0,gainTax:532.5}],
['phaseout',{additional:1000,rate:22,creditLost:100},{incomeTax:220,totalCost:320,effective:32}],
['taxlot',{shares:100,buy:50,sell:80,fees:25},{proceeds:7975,basis:5000,gain:2975}],
['reinvest',{shares:100,basis:5000,dividend:300,purchase:50,sale:60},{newShares:6,combined:106,newBasis:5300,saleGain:1060}],
['lotchoice',{proceeds:8000,low:4000,high:7000,rate:15},{gainLow:4000,gainHigh:1000,taxLow:600,taxHigh:150,difference:450}],
['niit',{magi:212000,net:8000,threshold:200000},{excess:12000,base:8000,niit:304}],
['wash',{original:10000,sale:7000,replacement:7500,later:11000},{loss:3000,current:0,newBasis:10500,futureGain:500}],
['loss',{loss:8000,capgain:0,limit:3000},{offset:0,ordinaryDeduct:3000,carry:5000}],
['ct',{base:90000,extra:1000},{initial:3550,additional:45,marginal:4.5}],
['pv',{deferred:450,years:5,discount:4,costs:0},{pvFuture:450/1.04**5,timing:450-450/1.04**5,net:450-450/1.04**5}]
];
for(const [id,inputs,expected] of values){
 assert.ok(vm.WealthLabAcademicM11Valid(id,inputs),id+' defaults invalid');
 const actual=vm.WealthLabAcademicM11Calculate(id,inputs);
 for(const [k,v] of Object.entries(expected))assert.ok(Number.isFinite(actual[k])&&Math.abs(actual[k]-v)<.02,id+'.'+k+' got '+actual[k]+' wanted '+v);
}
assert.ok(!vm.WealthLabAcademicM11Valid('flow',{wages:100,interest:0,qualified:0,gain:0,adjustments:200,deduction:0,withholding:0}));
assert.ok(!vm.WealthLabAcademicM11Valid('wash',{original:7000,sale:10000,replacement:7000,later:10000}));
console.log('Module 11 academic: '+ids.length+' lessons; '+parts+' sections; '+problems+' applied exercises; '+words+' explanation words; '+values.length+' numeric lab cases; 0 failures.');
