/** Academic trust and inheritance conversion regression. No network or saved data. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
function object(name){
 const key='const '+name+'=',start=html.indexOf(key)+key.length;
 assert.ok(start>=key.length,'Missing '+name);
 let level=0,quoted=false,escaped=false;
 for(let i=start;i<html.length;i++){
  const c=html[i];
  if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue}
  if(c==='"'){quoted=true;continue}if(c==='{')level++;if(c==='}'&&--level===0)return JSON.parse(html.slice(start,i+1));
 }
 throw Error('Unbalanced '+name);
}
const ids=['L3.S1','L3.S2','L3.S3'];
const originals=new Set([...html.matchAll(/\bS\(\s*['"](L\d+\.S\d+)['"]/g)].map(m=>m[1]));
for(const id of ids)assert.ok(originals.has(id),id+' must have original existing lesson section');
const registryNames=['TEXTBOOK','PART_CHECKS','PART_TERMS','PRACTITIONER_NOTES','CASE_FILES','TEXTBOOK_CHECKS'];
const c=Object.fromEntries(registryNames.map(name=>[name,object(name)]));
const originalTextbook=c.TEXTBOOK['L3.S2'];
assert.equal(originalTextbook.pages.length,6,'L3.S2 should start with six original reading parts');
assert.equal(c.TEXTBOOK['L3.S1'],undefined,'Short L3.S1 originally does not have a textbook');
assert.equal(c.TEXTBOOK['L3.S3'],undefined,'Short L3.S3 originally does not have a textbook');
const oldS2Titles=originalTextbook.pages.map(p=>p.heading);
const oldS2PartQuestions=c.PART_CHECKS['L3.S2'].map(qs=>qs.map(q=>q.q));
const oldS2Final=c.TEXTBOOK_CHECKS['L3.S2'].map(q=>q.q);
c.ALL_SECTIONS=[...originals].map(id=>({id}));c.window=c;
for(const name of ['academy-gold-standard-core.js','academy-gold-short-converter.js']){
 const js=read(name);new Script(js,{filename:name});runInNewContext(js,c,{filename:name});
}
let wordTotal=0;
for(const id of ids){
 const name='academy-chapters/'+id+'-edition2.js',src=read(name);
 new Script(src,{filename:name});runInNewContext(src,c,{filename:name});
 const book=c.TEXTBOOK[id];
 assert.equal(book.pages.length,12,id+' requires 12 authored parts');
 assert.equal(c.PART_TERMS[id].length,12,id+' needs vocabulary across all parts');
 assert.equal(c.PART_CHECKS[id].length,12,id+' needs part-specific checks');
 assert.equal(c.TEXTBOOK_CHECKS[id].length,id==='L3.S2'?oldS2Final.length+6:6,id+' final question total invalid');
 assert.ok(c.CASE_FILES[id]?.steps?.length>=8,id+' requires multistep professional case');
 assert.ok(book.sources.some(u=>u.includes('ctprobate.gov')),id+' requires official Connecticut law context');
 assert.ok(book.sources.some(u=>u.includes('irs.gov')||u.includes('consumerfinance.gov')),id+' requires federal tax or mortgage guidance');
 let words=0;
 for(const [i,p] of book.pages.entries()){
  assert.ok(Array.isArray(p.paragraphs)&&p.paragraphs.length>=4,id+' part '+(i+1)+' paragraphs incomplete');
  const count=p.paragraphs.join(' ').split(/\s+/).length;words+=count;
  assert.ok(count>=240,id+' part '+(i+1)+' too brief: '+count+' words');
  assert.ok(p.example?.length>=3,id+' part '+(i+1)+' missing meaningful figures');
  assert.ok(p.pitfall?.length>=70,id+' part '+(i+1)+' missing limitation');
  assert.ok(p.exercise?.length>=85,id+' part '+(i+1)+' missing independent exercise');
  assert.equal(c.PART_CHECKS[id][i].length,2,id+' part '+(i+1)+' needs two questions');
  for(const q of c.PART_CHECKS[id][i])assert.ok(q.options.length===4&&q.answer>=0&&q.answer<4,id+' invalid part question');
 }
 assert.ok(words>=4000,id+' must have 4000 instructional words; only '+words);
 wordTotal+=words;
 assert.ok(html.includes('src="./'+name+'?v=2.0.0"'),id+' not loaded in app');
 assert.ok(read('sw.js').includes("'./"+name+"?v=2.0.0'"),id+' not in offline cache');
 console.log('PASS: '+id+' estate gold edition, 12 parts, '+words+' instructional words.');
}
assert.deepEqual(JSON.parse(JSON.stringify(c.TEXTBOOK['L3.S2'].pages.slice(0,6).map(p=>p.heading))),oldS2Titles,'Old L3.S2 headings or order changed');
assert.deepEqual(JSON.parse(JSON.stringify(c.PART_CHECKS['L3.S2'].slice(0,6).map(a=>a.map(q=>q.q)))),oldS2PartQuestions,'Existing L3.S2 part questions changed');
assert.deepEqual(JSON.parse(JSON.stringify(c.TEXTBOOK_CHECKS['L3.S2'].slice(0,oldS2Final.length).map(q=>q.q))),oldS2Final,'Original L3.S2 final answers changed');
assert.ok(html.includes("S('L3.S1','A Trust Is Not a Money Machine'"),'Original short S1 question/source changed');
assert.ok(html.includes("S('L3.S3','Planning for a Daughter'"),'Original short S3 question/source changed');
const lab=read('academy-gold-estate-labs.js');
new Script(lab,{filename:'academy-gold-estate-labs.js'});
const env={document:{addEventListener(){},documentElement:{}},MutationObserver:class{observe(){}}};env.window=env;
runInNewContext(lab,env);
for(const id of ids){
 const markup=env.WealthLabEstateLabMarkup({id});
 assert.ok(markup.includes('data-wle="'+id+'"')&&markup.includes('data-wle-check'),id+' workbook missing');
 assert.ok(markup.includes('data-wle-answer="2"'),id+' workbook lacks numerical free-entry checks');
}
assert.equal(env.WealthLabEstateLabMarkup({id:'L2.S3'}),'','Estate workbook must stay scoped to estate IDs');
assert.ok(!lab.includes('localStorage'),'Estate numeric entries must not persist');
assert.ok(html.includes('WealthLabEstateLabMarkup(s)'),'Examples tab must show estate workbook');
assert.ok(html.includes("const STORE='wealthlab-state-v1'"),'Do not modify previous progress and notes storage');
const sw=read('sw.js');
assert.ok(sw.includes('wealth-lab-v6.8.0-insurance-gold-edition'));
for(const asset of ['./academy-gold-short-converter.js?v=2.0.0','./academy-gold-estate-labs.js?v=2.0.0'])
 assert.ok(sw.includes("'"+asset+"'"),asset+' must be offline precached');
console.log('PASS: Three original M3 lessons expanded/converted, '+wordTotal+' instructional words.');
console.log('PASS: Stable original lesson IDs/questions, 72 part checks, 18 new final checks and offline workbooks.');
