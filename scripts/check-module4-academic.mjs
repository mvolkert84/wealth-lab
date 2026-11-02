import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),ds=read('academy-academic/module4-data.js'),cs=read('academy-academic/module4-core.js'),css=read('academy-academic/module4-academic.css');
new Script(ds);new Script(cs);
const e={document:{addEventListener(){},querySelectorAll(){return[];}},console};e.window=e;
runInNewContext(ds,e);runInNewContext(cs,e);
const d=e.WealthLabAcademicM4Data,ids=['L4.S1','L4.S2','L4.S3'];
assert.equal(d.schema,'wealth-lab-m4-academic-v1');
assert.deepEqual(Array.from(d.lessonIds),ids);
let parts=0,words=0,problems=0;
for(let i=0;i<ids.length;i++){
 const l=d.lessons[i];assert.equal(l.id,ids[i]);
 assert.ok(l.sections.length>=8);
 assert.ok(l.prerequisites.length>=3&&l.objectives.length>=4);
 assert.ok(l.sourceRefs.length>=5&&l.sourceRefs.every(x=>x[1].startsWith('https://')));
 for(let j=0;j<l.sections.length;j++){
  const s=l.sections[j];parts++;
  assert.ok(s.body.length>=3);
  assert.ok(s.body.every(p=>p.length>=175),'Section must teach a substantive mechanism: '+l.id+'.A'+(j+1));
  assert.ok(s.worked.length>=4&&s.practice.length===2);
  assert.ok(s.practice.every(p=>p[0].length>20&&p[1].length>65));
  words+=s.body.join(' ').trim().split(/\s+/).length;problems+=s.practice.length;
 }
 const page=e.WealthLabAcademicM4Markup(l.id);
 assert.ok(page.includes(l.id+'.A1')&&page.includes(l.id+'.A8'));
 assert.ok(page.includes('Written')||page.includes('Independent chapter assessment'));
 assert.equal((page.match(/data-m4-lab=/g)||[]).length,3);
 assert.ok(page.includes('data-m4-check'));
 assert.ok(page.includes('Authoritative research sources'));
}
assert.equal(parts,24);
assert.equal(problems,48);
assert.ok(words>=6000);
assert.ok(e.WealthLabAcademicM4Markup('L2.S1').includes('unavailable'));
assert.ok(html.includes("(m.id==='M1'||m.id==='M2'||m.id==='M3'||m.id==='M4')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('window.WealthLabAcademicM4Markup?.(s.id)'));
assert.ok(html.includes('window.WealthLabAcademicM4Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
for(const id of ids)assert.ok(html.includes('src="./academy-chapters/'+id+'-edition2.js?v=2.0.0"'));
for(const file of ['module4-data.js','module4-core.js','module4-academic.css']){
 assert.ok(html.includes('./academy-academic/'+file+'?v=3.0.0'));
 assert.ok(sw.includes("'./academy-academic/"+file+"?v=3.0.0'"));
}
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!cs.includes('localStorage'),'New numerical models must not mutate legacy stored state');
assert.ok(d.capstone.tasks.length>=9&&d.capstone.answers.length>=9&&d.capstone.references.length>=5);
const c=e.WealthLabAcademicM4Calculate;
const near=(a,b,t=.035)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t,'Expected '+b+', got '+a);
let q=c('stock',{buy:100,sell:108,shares:50,dividend:3,fees:20});near(q.gain,530);near(q.return,10.6);near(q.dividendCash,150);
q=c('dividend',{div:2,discount:9,growth:3,shock:1});near(q.value,33.333333);near(q.stressed,28.5714286);
q=c('bond',{face:1000,years:3,yieldA:4,yieldB:5});near(q.priceA,888.9963587);near(q.priceB,863.8375985);
q=c('portfolio',{capital:10000,weight:60,stockReturn:12,bondReturn:-3,stockVol:20,bondVol:6,correlation:.2});
near(q.portfolioReturn,6);near(q.volatility,12.6996063);near(q.endingStockWeight,63.3962264);near(q.sellStocks,360);
q=c('drawdown',{balance:40000,loss:40});near(q.remaining,24000);near(q.recover,66.66667);
q=c('savings',{monthly:250,years:20,gross:6,fee:0,inflation:3});near(q.contrib,60000);near(q.future,115510.22379);near(q.real,115510.22379/Math.pow(1.03,20));
q=c('taxChoice',{gross:1000,currentTax:20,futureTax:20,factor:2});near(q.trad,1600);near(q.roth,1600);near(q.difference,0);
q=c('taxLots',{shares:20,sale:100,basisA:50,basisB:80});near(q.gainA,1000);near(q.gainB,400);near(q.delta,600);
q=c('iraHome',{gross:10000,tax:22,extra:0,years:20,growth:6});near(q.incomeTax,2200);near(q.net,7800);near(q.opportunity,10000*Math.pow(1.06,20));
assert.ok(!e.WealthLabAcademicM4Valid('dividend',{div:2,discount:3,growth:3,shock:1}),'Unsafe Gordon model assumptions must fail validation');
assert.ok(!e.WealthLabAcademicM4Valid('portfolio',{capital:10000,weight:60,stockReturn:10,bondReturn:2,stockVol:20,bondVol:6,correlation:1.5}),'Invalid correlation not accepted');
console.log('PASS: Module 4 '+parts+' extended sections, '+problems+' written problems and '+words+' academic prose words.');
console.log('PASS: All 9 investment models; stock returns, DCF, bonds, covariance, rebalance, drawdown, savings, Roth/traditional and taxable lot/IRA math.');
console.log('PASS: M1–M4 original lesson IDs and learning state; approved reader design; offline PWA; cumulative assessment.');
