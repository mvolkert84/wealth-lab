import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module5-data.js'),cs=read('academy-academic/module5-core.js'),css=read('academy-academic/module5-academic.css');
new Script(ds);new Script(cs);
const env={document:{addEventListener(){},querySelectorAll(){return[];}},console};env.window=env;
runInNewContext(ds,env);runInNewContext(cs,env);
const d=env.WealthLabAcademicM5Data,ids=['L5.S1','L5.S2'];
assert.equal(d.schema,'wealth-lab-m5-academic-v1');
assert.deepEqual(Array.from(d.lessonIds),ids);
let parts=0,words=0,problems=0;
for(let i=0;i<2;i++){
 const l=d.lessons[i];assert.equal(l.id,ids[i]);
 assert.ok(l.sections.length>=8&&l.objectives.length>=4&&l.prerequisites.length>=3);
 assert.ok(l.sourceRefs.length>=5&&l.sourceRefs.every(x=>x[1].startsWith('https://')));
 for(let j=0;j<l.sections.length;j++){
  const sec=l.sections[j];parts++;assert.ok(sec.body.length>=4);
  assert.ok(sec.body.every(p=>p.length>120),'Instruction must explain a mechanism');
  assert.ok(sec.worked.length>=4&&sec.practice.length===2);
  assert.ok(sec.practice.every(p=>p[0].length>20&&p[1].length>55));
  words+=sec.body.join(' ').split(/\s+/).length;problems+=sec.practice.length;
 }
 const page=env.WealthLabAcademicM5Markup(l.id);
 assert.ok(page.includes(l.id+'.A1')&&page.includes(l.id+'.A'+l.sections.length));
 assert.equal((page.match(/data-m5-lab=/g)||[]).length,4);
 assert.ok(page.includes('data-m5-check')&&page.includes('Independent chapter assessment'));
 assert.ok(page.includes('Authoritative research sources'));
}
assert.equal(parts,17);
assert.equal(problems,34);
assert.ok(words>=5100);
assert.ok(env.WealthLabAcademicM5Markup('L1.S1').includes('unavailable'));
assert.ok(html.includes("(m.id==='M1'||m.id==='M2'||m.id==='M3'||m.id==='M4'||m.id==='M5'||m.id==='M6'||m.id==='M7'||m.id==='M8'||m.id==='M9'||m.id==='M10'||m.id==='M11')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('window.WealthLabAcademicM5Markup?.(s.id)'));
assert.ok(html.includes('window.WealthLabAcademicM5Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
for(const id of ids)assert.ok(html.includes('src="./academy-chapters/'+id+'-edition2.js?v=2.0.0"'));
for(const file of ['module5-data.js','module5-core.js','module5-academic.css']){
 assert.ok(html.includes('./academy-academic/'+file+'?v=3.0.0'));
 assert.ok(sw.includes("'./academy-academic/"+file+"?v=3.0.0'"));
}
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('localStorage'),'New labs must not write stored learning state');
assert.ok(d.capstone.tasks.length>=10&&d.capstone.answers.length>=10);
const c=env.WealthLabAcademicM5Calculate,near=(a,b,t=.04)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t,'Expected '+b+', got '+a);
let q=c('coverage',{annual:20000,years:10,rate:4,mortgage:100000,immediate:15000,assets:40000});
near(q.pv,162217.91559);near(q.need,237217.91559);
q=c('premium',{term:30,permanent:250,years:10,savingRate:4});
near(q.termCost,3600);near(q.permCost,30000);near(q.difference,220);near(q.future,32394.95704);
q=c('policyLoan',{loan:12000,rate:7,years:5,death:100000,value:25000});
near(q.balance,16830.62077);near(q.deathNet,83169.37923);near(q.equity,8169.37923);
q=c('surrender',{gross:30000,loan:18000,basis:22000,tax:22});
near(q.cash,12000);near(q.gain,8000);near(q.taxDue,1760);
q=c('property',{rebuild:320000,limit:250000,deductible:2500});near(q.paid,247500);near(q.unfunded,72500);
q=c('flood',{building:90000,buildingLimit:250000,buildingDed:2000,contents:15000,contentsLimit:100000,contentsDed:1000});
near(q.buildingPaid,88000);near(q.contentsPaid,14000);near(q.reimbursed,102000);near(q.retained,3000);
q=c('disability',{essentials:3200,earnings:4000,wait:3,percent:60,postMonths:12});
near(q.bridge,9600);near(q.benefit,2400);near(q.gap,800);near(q.retained,19200);
q=c('protection',{claim:350000,primary:100000,care:6000,careMonths:24,careWait:3,careBenefit:4000,housing:1500,tax:480,hazard:150,flood:100,mortgageIns:100,repairs:220});
near(q.excess,250000);near(q.careRetained,60000);near(q.housingTotal,2550);
assert.ok(!env.WealthLabAcademicM5Valid('coverage',{annual:20000,years:10,rate:-1,mortgage:0,immediate:0,assets:0}));
assert.ok(!env.WealthLabAcademicM5Valid('flood',{building:-100,buildingLimit:250000,buildingDed:2000,contents:0,contentsLimit:0,contentsDed:0}));
console.log('PASS Module 5: '+parts+' academic insurance sections, '+problems+' independent questions, '+words+' explanatory words.');
console.log('PASS 8 risk models: life need, premium opportunity, loans, surrender, dwelling loss, flood, disability, liability and long-term care.');
console.log('PASS Reader, PWA offline cache, original stable IDs, progress and prior academic module compatibility.');
