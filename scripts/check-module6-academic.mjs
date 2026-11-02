import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module6-data.js'),cs=read('academy-academic/module6-core.js'),css=read('academy-academic/module6-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM6Data,ids=['L6.S1','L6.S2'];
assert.equal(d.schema,'wealth-lab-m6-academic-v1');
assert.deepEqual(Array.from(d.lessonIds),ids);
let parts=0,words=0,problems=0;
for(let i=0;i<2;i++){
 const l=d.lessons[i];assert.equal(l.id,ids[i]);
 assert.ok(l.sections.length>=10&&l.objectives.length>=4&&l.prerequisites.length>=3);
 assert.ok(l.sourceRefs.length>=8&&l.sourceRefs.every(x=>x[1].startsWith('https://')));
 for(let j=0;j<l.sections.length;j++){
  const sec=l.sections[j];parts++;assert.equal(sec.body.length,4);
  assert.ok(sec.body.every(p=>p.length>=140),'Teaching paragraphs must explain mechanisms: '+l.id+'.A'+(j+1));
  assert.ok(sec.worked.length>=4&&sec.practice.length===2);
  assert.ok(sec.practice.every(p=>p[0].length>25&&p[1].length>=70));
  words+=sec.body.join(' ').trim().split(/\s+/).length;problems+=sec.practice.length;
 }
 const page=e.WealthLabAcademicM6Markup(l.id);
 assert.ok(page.includes(l.id+'.A1')&&page.includes(l.id+'.A10'));
 assert.equal((page.match(/data-m6-lab=/g)||[]).length,5);
 assert.ok(page.includes('data-m6-check')&&page.includes('Independent chapter assessment'));
 assert.ok(page.includes('Authoritative research sources'));
}
assert.equal(parts,20);
assert.equal(problems,40);
assert.ok(words>=6100);
assert.ok(e.WealthLabAcademicM6Markup('L3.S1').includes('unavailable'));
assert.ok(html.includes("(m.id==='M1'||m.id==='M2'||m.id==='M3'||m.id==='M4'||m.id==='M5'||m.id==='M6')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('window.WealthLabAcademicM6Markup?.(s.id)'));
assert.ok(html.includes('window.WealthLabAcademicM6Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
for(const id of ids)assert.ok(html.includes('src="./academy-chapters/'+id+'-edition2.js?v=2.0.0"'));
for(const file of ['module6-data.js','module6-core.js','module6-academic.css']){
 assert.ok(html.includes('./academy-academic/'+file+'?v=3.0.0'));
 assert.ok(sw.includes("'./academy-academic/"+file+"?v=3.0.0'"));
}
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('localStorage'),'The tax labs must not mutate browser progress or notes');
assert.ok(d.capstone.tasks.length>=10&&d.capstone.answers.length>=10);
const c=e.WealthLabAcademicM6Calculate,near=(a,b,t=.045)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t,'Expected '+b+', got '+a);
let q=c('brackets',{income:70000});near(q.tax,10112);near(q.marginal,22);near(q.effective,10112/70000*100);
q=c('deduction',{income:70000,deduction:1000,credit:1000});near(q.baseTax,10112);near(q.dedSavings,220);near(q.creditSavings,1000);near(q.afterBoth,8892);
q=c('itemization',{magi:80000,salt:6000,interest:8000,charity:3000});near(q.saltCap,40400);near(q.allowableSalt,6000);near(q.itemized,17000);near(q.advantage,900);
q=c('payroll',{wages:60000,ctTax:2600,ctWithheld:1500,priorCt:2300});near(q.ss,3720);near(q.medicare,870);near(q.fica,4590);near(q.ctGap,800);
q=c('home',{price:300000,selling:18000,first:230000,second:0,basis:235000});near(q.cash,52000);near(q.amountRealized,282000);near(q.gain,47000);
q=c('loan',{principal:12000,rate:7,years:5,benefit:250000});near(q.loanBalance,16830.6207684);near(q.interest,4830.6207684);near(q.benefitNet,233169.3792316);
q=c('giftBasis',{giftBasis:100000,inheritedBasis:300000,sale:310000});near(q.giftGain,210000);near(q.inheritedGain,10000);near(q.gainDelta,200000);
q=c('policyExit',{gross:30000,loan:18000,basis:22000,rate:22});near(q.cash,12000);near(q.gain,8000);near(q.tax,1760);
q=c('rental',{rent:24000,operating:7000,interest:8000,depreciation:5000,principal:6000});near(q.taxable,4000);near(q.cash,3000);near(q.difference,1000);
q=c('strategy',{capacity:400,term:50,permanent:250,loan:12000,rate:7,years:5});near(q.freeTerm,350);near(q.freePermanent,150);near(q.premiumCost,2400);near(q.debt,16830.6207684);
q=c('brackets',{income:50400});near(q.tax,5800);q=c('brackets',{income:0});near(q.tax,0);
assert.ok(!e.WealthLabAcademicM6Valid('loan',{principal:12000,rate:-7,years:5,benefit:250000}));
assert.ok(!e.WealthLabAcademicM6Valid('policyExit',{gross:2000,loan:3000,basis:2200,rate:22}));
assert.ok(d.capstone.answers.join(' ').includes('$10,112'));
console.log('PASS Module 6: '+parts+' academic sections, '+problems+' written problems, '+words+' instructional words.');
console.log('PASS 10 tax models: 2026 brackets, deductions/credits, SALT, FICA/CT, home-sale cash/gain, loans, basis, surrender, rental and liquidity.');
console.log('PASS Original lesson IDs, M1-M6 Academic readers, saved progress, notes and offline PWA.');
