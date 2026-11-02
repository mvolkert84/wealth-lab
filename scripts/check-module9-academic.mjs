import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module9-data.js'),cs=read('academy-academic/module9-core.js'),css=read('academy-academic/module9-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM9Data,ids=['L9.S1','L9.S2','L9.S3','L9.S4'];
assert.equal(d.schema,'wealth-lab-m9-academic-v1');
assert.deepEqual(Array.from(d.lessonIds),ids);
let sections=0,words=0,problems=0;
for(const [i,id] of ids.entries()){
 const lesson=d.lessons[i];assert.equal(lesson.id,id);assert.equal(lesson.sections.length,7);
 assert.ok(lesson.sourceRefs.length>=6&&lesson.sourceRefs.every(x=>x[1].startsWith('https://')));
 for(const s of lesson.sections){sections++;words+=s.body.join(' ').split(/\s+/).length;problems+=s.practice.length;
  assert.equal(s.body.length,4);assert.ok(s.body.every(x=>x.length>160));
  assert.ok(s.practice.length===2&&s.practice.every(x=>x[1].length>75));
  assert.ok(s.worked.length>=4);}
 const page=e.WealthLabAcademicM9Markup(id);
 assert.ok(page.includes(id+'.A7')&&page.includes('Independent chapter assessment'));
 assert.equal((page.match(/data-m9-lab=/g)||[]).length,4);
 assert.ok(page.includes('Authoritative research sources'));
}
assert.equal(sections,28);assert.equal(problems,56);assert.ok(words>=7700);
assert.ok(e.WealthLabAcademicM9Markup('L8.S4').includes('unavailable'));
assert.ok(html.includes("(m.id==='M1'||m.id==='M2'||m.id==='M3'||m.id==='M4'||m.id==='M5'||m.id==='M6'||m.id==='M7'||m.id==='M8'||m.id==='M9'||m.id==='M10'||m.id==='M11'||m.id==='M12'||m.id==='M13')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM9Markup?.(s.id)')&&html.includes('WealthLabAcademicM9Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
for(const id of ['L9.S1','L9.S2','L9.S3'])assert.ok(html.includes('academy-chapters/'+id+'.js?v=1.0.0'));
for(const f of ['module9-data.js','module9-core.js','module9-academic.css'])assert.ok(html.includes(f+'?v=3.0.0')&&sw.includes(f+'?v=3.0.0'));
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('localStorage'));
assert.ok(d.capstone.tasks.length>=12&&d.capstone.answers.length>=12);
assert.ok(e.WealthLabAcademicM9Markup('L9.S4').includes('Module 9 cumulative investment-product committee capstone'));
const fixture=[
['bond',{face:1000,coupon:4,years:3,yield:5,buy:950,sell:960},{price:972.76752,currentYield:4.210526,saleReturn:5.2631579}],
['duration',{value:20000,duration:6,basisPoints:75},{pct:-4.5,dollars:-900,end:19100}],
['credit',{corporate:6,treasury:4,principal:10000,defaultRate:3,severity:60},{spreadBps:200,lossRate:1.8,loss:180}],
['taxYield',{taxable:4,exempt:3,taxRate:22},{taxableAfter:3.12,muniEquivalent:3.846154,gap:.12}],
['fdic',{savings:190000,cd:100000,standard:250000},{total:290000,insured:250000,excess:40000}],
['cd',{principal:10000,apy:4,days:90,yearDays:365},{yearInterest:400,penalty:98.630137}],
['bill',{price:9800,face:10000,weeks:26},{interest:200,holding:2.040816,simpleAnnual:4.081632,compoundAnnual:4.12328}],
['realCash',{balance:10000,rate:4,tax:22,inflation:3},{interest:400,taxDue:88,nominal:10312,real:10312/1.03}],
['etfNav',{assets:10000000,liabilities:50000,shares:1000000,etfNAV:100,ask:100.5,bid:99.9},{nav:9.95,premium:.5,spread:.597015}],
['fees',{initial:20000,gross:6,lowFee:.1,highFee:1,years:20},{firstYearGap:180,lowEnd:20000*Math.pow(1.059,20),highEnd:20000*Math.pow(1.05,20)}],
['overlap',{a:10000,b:10000,weightA:40,weightB:60},{exposure:10000,weight:50}],
['leverage',{first:10,second:-9.090909,multiple:2},{indexReturn:0,leveragedReturn:-1.81818}],
['reit',{start:50000,end:43000,distribution:2000},{cashRate:4,total:-10,wealth:45000}],
['ffo',{earnings:20,depreciation:15,gain:5,recurring:10,distribution:25},{ffo:30,affo:20,coverage:80,gap:5}],
['annuity',{premium:100000,monthly:600,account:20000,me:1.25,admin:.15,fund:.8,surrender:10000,penalty:7},{payout:7.2,fee:440,netSurrender:9300}],
['private',{commit:50000,funded:15000,liquid:18000,required:18000,locked:5000},{unfunded:35000,accessible:13000,gap:5000}]
];
for(const [name,args,expected] of fixture){
 assert.ok(e.WealthLabAcademicM9Valid(name,args),'Invalid default '+name);
 const actual=e.WealthLabAcademicM9Calculate(name,args);
 for(const [key,v] of Object.entries(expected))assert.ok(Number.isFinite(actual[key])&&Math.abs(actual[key]-v)<.1,name+'.'+key+' expected '+v+' got '+actual[key]);
}
assert.ok(!e.WealthLabAcademicM9Valid('fdic',{savings:100,cd:100,standard:0}));
assert.ok(!e.WealthLabAcademicM9Valid('taxYield',{taxable:4,exempt:3,taxRate:100}));
console.log('PASS M9 academic: '+sections+' sections; '+problems+' independent written problems; '+words+' instructional words.');
console.log('PASS 16 instrument maths, reader compatibility, offline PWA and original learning state.');
