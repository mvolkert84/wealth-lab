import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module8-data.js'),cs=read('academy-academic/module8-core.js'),css=read('academy-academic/module8-academic.css');
new Script(ds);new Script(cs);
const env={document:{addEventListener(){},querySelectorAll(){return[];}},console};env.window=env;
runInNewContext(ds,env);runInNewContext(cs,env);
const d=env.WealthLabAcademicM8Data,ids=['L8.S1','L8.S2','L8.S3','L8.S4'];
assert.equal(d.schema,'wealth-lab-m8-academic-v1');
assert.deepEqual(Array.from(d.lessonIds),ids);
let n=0,p=0,w=0;
for(const [i,id] of ids.entries()){
 const lesson=d.lessons[i];assert.equal(lesson.id,id);assert.equal(lesson.sections.length,7);
 assert.ok(lesson.sourceRefs.length>=5);
 for(const part of lesson.sections){n++;p+=part.practice.length;w+=part.body.join(' ').split(/\s+/).length;
 assert.equal(part.body.length,4);assert.ok(part.body.every(x=>x.length>=160));
 assert.ok(part.practice.length===2&&part.practice.every(x=>x[1].length>=75));
 assert.ok(part.worked.length>=4);}
 const page=env.WealthLabAcademicM8Markup(id);
 assert.ok(page.includes(id+'.A7')&&page.includes('Independent chapter assessment'));
 assert.equal((page.match(/data-m8-lab=/g)||[]).length,4);
}
assert.equal(n,28);assert.equal(p,56);assert.ok(w>=7500);
assert.ok(html.includes("(m.id==='M1'||m.id==='M2'||m.id==='M3'||m.id==='M4'||m.id==='M5'||m.id==='M6'||m.id==='M7'||m.id==='M8'||m.id==='M9'||m.id==='M10'||m.id==='M11'||m.id==='M12'||m.id==='M13'||m.id==='M14'||m.id==='M15'||m.id==='M16')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('WealthLabAcademicM8Markup?.(s.id)')&&html.includes('WealthLabAcademicM8Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
for(const id of ['L8.S1','L8.S3','L8.S4'])assert.ok(html.includes('academy-chapters/'+id+'.js?v=1.0.0'));
for(const f of ['module8-data.js','module8-core.js','module8-academic.css'])assert.ok(html.includes(f+'?v=3.0.0')&&sw.includes(f+'?v=3.0.0'));
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('localStorage'));
assert.ok(d.capstone.tasks.length>=14&&d.capstone.answers.length>=14);
assert.ok(env.WealthLabAcademicM8Markup('L8.S4').includes('Module 8 cumulative investment-committee capstone'));
const calc=env.WealthLabAcademicM8Calculate;
const fixture=[
['ownership',{shares:1e7,price:40,held:25},{cap:4e8,stake:.00025}],
['dilution',{existing:1e7,newShares:2e6,issuePrice:20,held:1e5},{proceeds:4e7,before:1,after:.833333,dilution:16.666667}],
['enterprise',{equity:4e8,debt:1.5e8,cash:5e7,ebitda:5e7},{ev:5e8,multiple:10}],
['units',{units:1e5,price:50,cost:30,fixed:1.5e6,volumeLoss:10},{sales:5e6,margin:40,operating:5e5,stressed:3e5}],
['income',{sales:1e6,cogs:6e5,opex:2.5e5,interest:3e4,tax:3e4,shares:3e4},{gross:4e5,ebit:1.5e5,net:9e4,eps:3}],
['cashbridge',{net:9e4,da:2e4,ar:3.5e4,inventory:1.5e4,ap:1e4,capex:4.5e4},{cfo:7e4,fcf:2.5e4}],
['liquidity',{currentAssets:3e5,inventory:8e4,currentLiab:2e5,interestDebt:2.5e5,cash:1e5},{current:1.5,quick:1.1,netDebt:1.5e5}],
['quality',{net:2e5,cfo:1.2e5,capex:7e4,dividend:4e4},{gap:8e4,fcf:5e4,payout:80}],
['multiples',{price:60,reported:3,normalized:2.4},{pe:20,normalizedPE:25,earningsYield:5}],
['fcff',{revenue:100,margin:20,tax:25,da:4,capex:9,working:3},{ebit:20,nopat:15,fcff:7}],
['wacc',{equityWeight:60,equityCost:10,debtCost:6,tax:25,cashFlow:10,growth:3},{wacc:7.8,terminal:208.33333}],
['equitybridge',{ev:500,netDebt:150,shares:10,quote:40},{equity:350,perShare:35,premium:14.285714}],
['shareReturn',{start:50,end:54,dividend:1.5},{priceReturn:8,total:11,divYield:3}],
['payout',{net:200,cfo:120,capex:70,dividend:40,fall:50},{fcf:50,earnPayout:20,cashPayout:80,shortfall:-15}],
['repurchase',{shares:10,earnings:100,repurchased:1,buyPrice:40,fairEquity:300},{epsBefore:10,epsAfter:11.111111,fairAfter:28.888889}],
['netShares',{begin:100,retired:5,issued:3},{ending:98,gross:5,net:2}]
];
for(const [name,args,expected] of fixture){
 assert.ok(env.WealthLabAcademicM8Valid(name,args),'invalid model defaults '+name);
 const actual=calc(name,args);
 for(const [k,v] of Object.entries(expected))assert.ok(Number.isFinite(actual[k])&&Math.abs(actual[k]-v)<.08,name+'.'+k+': got '+actual[k]+' expected '+v);
}
assert.ok(!env.WealthLabAcademicM8Valid('wacc',{equityWeight:60,equityCost:3,debtCost:2,tax:25,cashFlow:10,growth:3}));
console.log('PASS Module 8 '+n+' academic sections, '+p+' problems, '+w+' instructional words, 16 independent math models.');
console.log('PASS existing textbooks, stable progress, notes, offline PWA and four Academic lesson views.');
