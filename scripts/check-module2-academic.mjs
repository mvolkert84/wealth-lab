import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),sw=read('sw.js'),dsrc=read('academy-academic/module2-data.js'),csrc=read('academy-academic/module2-core.js'),css=read('academy-academic/module2-academic.css');
new Script(dsrc);new Script(csrc);
const env={document:{addEventListener(){},querySelectorAll(){return[];}},console};env.window=env;
runInNewContext(dsrc,env);runInNewContext(csrc,env);
const d=env.WealthLabAcademicM2Data,ids=['L2.S1','L2.S2','L2.S3','L2.S4','L2.S5'];
assert.equal(d.schema,'wealth-lab-m2-academic-v1');assert.deepEqual(Array.from(d.lessonIds),ids);
let parts=0,words=0,problems=0;
for(let i=0;i<5;i++){
 const l=d.lessons[i];assert.equal(l.id,ids[i]);assert.ok(l.sections.length>=5);
 assert.ok(l.prerequisites.length>=3&&l.objectives.length>=4&&l.sourceRefs.length>=4);
 for(let j=0;j<l.sections.length;j++){
  const s=l.sections[j];parts++;assert.equal(s.body.length,4);assert.ok(s.worked.length>=4);assert.equal(s.practice.length,2);
  assert.ok(s.practice.every(a=>a[0].length>20&&a[1].length>45));
  words+=s.body.join(' ').trim().split(/\s+/).length;problems+=2;
 }
 const markup=env.WealthLabAcademicM2Markup(l.id);
 assert.ok(markup.includes(l.id+'.A1')&&markup.includes(l.id+'.A'+l.sections.length));
 assert.ok(markup.includes('data-m2-lab="'+l.id+'"')&&markup.includes('data-m2-check'));
 assert.ok(markup.includes('Written and numerical chapter assessment'));
}
assert.equal(parts,29);assert.equal(problems,58);assert.ok(words>=7800);
assert.ok(html.includes("(m.id==='M1'||m.id==='M2')?['Learn','Examples','Try It','Academic','Notes']"));
assert.ok(html.includes('window.WealthLabAcademicM2Markup?.(s.id)'));
assert.ok(html.includes('window.WealthLabAcademicM2Init?.()'));
assert.ok(html.includes("const STORE='wealthlab-state-v1'"));
assert.ok(html.includes('src="./academy-chapters/L2.S1-edition2.js?v=2.0.0"'));
for(const f of ['module2-data.js','module2-core.js','module2-academic.css']){
 assert.ok(html.includes('./academy-academic/'+f+'?v=3.0.0'));assert.ok(sw.includes("'./academy-academic/"+f+"?v=3.0.0'"));
}
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
assert.ok(!csrc.includes('localStorage'));
const calc=env.WealthLabAcademicM2Calculate;
const near=(x,y,t=.03)=>assert.ok(Number.isFinite(x)&&Math.abs(x-y)<=t,'Expected '+y+' got '+x);
const a=calc('L2.S1',{price:250000,down:12500,rate:6.5,years:30,gross:6000,debt:450,tax:5831,ins:1800});
near(a.loan,237500);near(a.payment,1501.16156);near(a.ltv,95);
const b=calc('L2.S2',{cash:29000,price:260000,down:5,cost:8000,earnest:3000,repair:3000,ess:3200});
near(b.uses,21000);near(b.wire,18000);near(b.left,8000);near(b.runway,1.5625,.001);
const c=calc('L2.S3',{principal:237500,rateA:6.5,rateB:6.25,years:30,months:60,points:2375});
near(c.payA,1501.16156);near(c.payB,1462.32835);near(c.balA,222326.07);near(c.balB,221675.95);near(c.benefit,605.1153);
const tax=calc('L2.S4',{value:245000,ratio:70,mill:34,district:0,insurance:1800,taxRise:12,insRise:20});
near(tax.assessed,171500);near(tax.tax,5831);near(tax.current,635.9167);near(tax.next,724.2267);
const e=calc('L2.S5',{mortgage:237500,rate:6.5,years:30,elapsed:3,second:20000,forgive:10,sale:230000,selling:6});
near(e.pay,1501.16156);near(e.bal,228990.9495);near(e.sub,14000);near(e.proceeds,-26790.9495);
assert.ok(d.capstone.answer.join(' ').includes('26,790.95'));
console.log('PASS Module 2: '+parts+' sections, '+problems+' open-response problems, '+words+' instructional words.');
console.log('PASS Five independent lab models, academic renderer, original IDs, saved storage key, offline PWA.');
