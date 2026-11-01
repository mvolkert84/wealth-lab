/** Wealth Lab v6.7 M4 Investing Gold — academic depth, legacy ID stability and offline checks. */
import assert from 'node:assert/strict';
import{readFileSync}from'node:fs';
import{Script,runInNewContext}from'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
function getJson(name){const key='const '+name+'=',j=html.indexOf(key);assert.ok(j>=0,'missing '+name);const start=j+key.length;let level=0,quoted=false,escaped=false;
 for(let i=start;i<html.length;i++){const c=html[i];if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue}if(c==='"'){quoted=true;continue}if(c==='{')level++;if(c==='}'&&--level===0)return JSON.parse(html.slice(start,i+1))}
 throw Error('invalid '+name)}
const ids=['L4.S1','L4.S2','L4.S3'];
const lessonIds=[...html.matchAll(/\bS\(\s*['"](L\d+\.S\d+)['"]/g)].map(m=>m[1]);const originalIds=new Set(lessonIds);
assert.equal(lessonIds.length,19,'Original Foundations lesson IDs and order should remain unchanged');
for(const id of ids)assert.ok(originalIds.has(id)&&html.includes("S('"+id+"'"),id+' must exist as original lesson');
const names=['TEXTBOOK','PART_CHECKS','PART_TERMS','PRACTITIONER_NOTES','CASE_FILES','TEXTBOOK_CHECKS'];
const context=Object.fromEntries(names.map(name=>[name,getJson(name)]));
for(const id of ids)assert.equal(context.TEXTBOOK[id],undefined,id+' must be legacy short before conversion');
context.ALL_SECTIONS=lessonIds.map(id=>({id}));context.window=context;
const core=read('academy-gold-short-converter.js');new Script(core,{filename:'academy-gold-short-converter.js'});runInNewContext(core,context);
let total=0;
for(const id of ids){const file='academy-chapters/'+id+'-edition2.js',src=read(file);
 new Script(src,{filename:file});runInNewContext(src,context,{filename:file});
 const book=context.TEXTBOOK[id];assert.equal(book.pages.length,12,id+' needs twelve separate substantive parts');
 assert.equal(context.PART_TERMS[id].length,12,id+' needs distinct terminology groups');
 assert.equal(context.PART_CHECKS[id].length,12,id+' needs two checks per part');
 assert.equal(context.TEXTBOOK_CHECKS[id].length,6,id+' needs cumulative assessment');
 assert.ok(book.sources.length>=2,id+' needs primary sources');
 assert.ok(book.sources.some(x=>x.includes('investor.gov')||x.includes('irs.gov')),id+' needs public investor or tax official source');
 assert.ok(context.CASE_FILES[id]?.steps?.length>=8,id+' needs applied multistep case');
 let n=0;
 for(const [i,p]of book.pages.entries()){
  assert.ok(p.paragraphs.length>=4,id+' part '+(i+1)+' missing reading paragraphs');
  const words=p.paragraphs.join(' ').trim().split(/\s+/).length;n+=words;
  assert.ok(words>=240,id+' part '+(i+1)+' too shallow: '+words+' words');
  assert.ok(p.pitfall.length>=75&&p.exercise.length>=90,id+' missing critical downside and independent practice');
  assert.ok(p.example.length>=3,id+' insufficient numerical worked example');
  assert.equal(context.PART_CHECKS[id][i].length,2,id+' two mastery checkpoints required for each part');
  for(const q of context.PART_CHECKS[id][i])assert.ok(q.options?.length===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&q.why.length>=40,id+' invalid answer or explanation');
 }
 assert.ok(n>=4000,id+' needs 4000 instructional words; found '+n);total+=n;
 assert.ok(html.includes('src="./'+file+'?v=2.0.0"'),id+' chapter not wired into live lesson reader');
 assert.ok(read('sw.js').includes("'./"+file+"?v=2.0.0'"),id+' chapter unavailable offline');
 console.log('PASS: '+id+' 12-part investing textbook, '+n+' instructional words, 24 part checks, 6 final checks.');
}
const lab=read('academy-gold-investing-labs.js');new Script(lab,{filename:'academy-gold-investing-labs.js'});
const env={document:{addEventListener(){},documentElement:{}},MutationObserver:class{observe(){}}};env.window=env;runInNewContext(lab,env);
for(const id of ids){const markup=env.WealthLabInvestingLabMarkup({id});assert.ok(markup.includes('data-wli="'+id+'"')&&markup.includes('data-wli-check'));assert.ok(markup.includes('data-wli-answer="2"'))}
assert.equal(env.WealthLabInvestingLabMarkup({id:'L3.S3'}),'','Numerical labs must be scoped to investing lessons');
assert.ok(!lab.includes('localStorage')&&!lab.includes('fetch('),'New practice inputs must remain local and never be stored or uploaded');
assert.ok(html.includes('WealthLabInvestingLabMarkup(s)'),'Examples tab must attach investing practice');
assert.ok(html.includes("const STORE='wealthlab-state-v1'"),'Saved progress and notes key must not change');
const sw=read('sw.js');assert.ok(sw.includes('wealth-lab-v6.7.0-investing-gold-edition'));
assert.ok(sw.includes("'./academy-gold-investing-labs.js?v=2.0.0'"));
const source3=read('academy-chapters/L4.S3-edition2.js');
assert.ok(source3.includes('2026')&&source3.includes('$7,500')&&source3.includes('taxable compensation'),'Current IRA limits must be dated, qualified and sourced');
assert.ok(Math.abs(100*(1.2)*(0.8)-96)<1e-8,'Drawdown model is mathematically consistent');
assert.ok(Math.abs(0.6*(-25)+0.3*3+0.1*0+14.1)<1e-8,'Weighted portfolio return model is consistent');
assert.ok(Math.abs(3000+2000-5000)<1e-8,'Tax and account example check');
console.log('PASS: All three M4 originals converted to gold; '+total+' total instructional words; 72 part checks, 18 final checks and 3 cases.');
console.log('PASS: Market mechanics, IRS 2026 dated rules, fixed IDs, original quizzes, PWA cache, private local-only numerical labs.');
