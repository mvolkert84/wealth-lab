/** Gold-standard life insurance + property/disability risk textbook CI. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
function object(name){const key='const '+name+'=',k=html.indexOf(key);assert.ok(k>=0,'Missing '+name);const begin=k+key.length;let depth=0,quote=false,escaped=false;
 for(let i=begin;i<html.length;i++){const ch=html[i];if(quote){if(escaped)escaped=false;else if(ch==='\\')escaped=true;else if(ch==='"')quote=false;continue;}if(ch==='"'){quote=true;continue;}if(ch==='{')depth++;if(ch==='}'&&--depth===0)return JSON.parse(html.slice(begin,i+1));}
 throw Error('Missing matching JSON end for '+name);
}
const ids=['L5.S1','L5.S2'];
const found=[...html.matchAll(/\bS\(\s*['"](L\d+\.S\d+)['"]/g)].map(x=>x[1]);
assert.equal(found.length,19,'Maintain 19 original foundational section references');
for(const id of ids)assert.ok(found.includes(id),id+' should retain its original S() definition');
const names=['TEXTBOOK','PART_CHECKS','PART_TERMS','PRACTITIONER_NOTES','CASE_FILES','TEXTBOOK_CHECKS'];
const context=Object.fromEntries(names.map(n=>[n,object(n)]));context.ALL_SECTIONS=found.map(id=>({id}));context.window=context;
for(const id of ids)assert.equal(context.TEXTBOOK[id],undefined,id+' must remain originally short-form before conversion');
for(const file of ['academy-gold-short-converter.js']){const code=read(file);new Script(code,{filename:file});runInNewContext(code,context,{filename:file});}
let total=0;
for(const id of ids){
 const file='academy-chapters/'+id+'-edition2.js',code=read(file);new Script(code,{filename:file});runInNewContext(code,context,{filename:file});
 const book=context.TEXTBOOK[id];assert.equal(book.pages.length,12,id+' needs exactly 12 substantive parts');
 assert.equal(context.PART_CHECKS[id].length,12,id+' needs 12 sets of part checks');
 assert.equal(context.PART_TERMS[id].length,12,id+' needs 12 vocabulary groups');
 assert.equal(context.TEXTBOOK_CHECKS[id].length,6,id+' needs 6 cumulative questions');
 assert.ok(book.sources.length>=3,id+' needs primary official sources');
 assert.ok(context.CASE_FILES[id]?.steps.length>=8,id+' needs a multistep professional decision case');
 let words=0;
 for(const [i,p] of book.pages.entries()){
  const n=p.paragraphs.join(' ').split(/\s+/).length;words+=n;
  assert.ok(p.paragraphs.length>=4&&n>=240,id+' part '+(i+1)+' is too short');
  assert.ok(p.example.length>=3,id+' part '+(i+1)+' numerical example missing');
  assert.ok(p.pitfall.length>=75&&p.exercise.length>=90,id+' part '+(i+1)+' requires critical caution and real exercise');
  assert.equal(context.PART_CHECKS[id][i].length,2,id+' part '+(i+1)+' requires two checks');
  for(const q of context.PART_CHECKS[id][i])assert.ok(q.options?.length===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&q.why?.length>=40,id+' part '+(i+1)+' invalid question/why: '+q.q);
  assert.ok(context.PART_TERMS[id][i].length>=2,id+' part '+(i+1)+' vocabulary missing');
 }
 assert.ok(words>=4000,id+' must have 4,000 substantive reading words: '+words);total+=words;
 assert.ok(html.includes('src="./'+file+'?v=2.0.0"'),id+' is missing from current reader');
 assert.ok(read('sw.js').includes("'./"+file+"?v=2.0.0'"),id+' is missing from PWA cache');
 console.log('PASS: '+id+' 12-part insurance textbook, '+words+' instructional words and complete casework.');
}
const lab=read('academy-gold-insurance-labs.js');new Script(lab,{filename:'academy-gold-insurance-labs.js'});
const env={document:{addEventListener(){},documentElement:{}},MutationObserver:class{observe(){}}};env.window=env;
runInNewContext(lab,env);
for(const id of ids){const m=env.WealthLabInsuranceLabMarkup({id});assert.ok(m.includes('data-wlp="'+id+'"')&&m.includes('data-wlp-check'));assert.ok(m.includes('data-wlp-answer="2"'),id+' independent numeracy not present');}
assert.equal(env.WealthLabInsuranceLabMarkup({id:'L4.S1'}),'','Insurance labs must be scoped to insurance lessons');
assert.ok(!lab.includes('localStorage')&&!lab.includes('fetch('),'Independent financial input must not be saved or transmitted');
assert.ok(html.includes('WealthLabInsuranceLabMarkup(s)'),'Existing Examples reader hook should include insurance workbooks');
assert.ok(html.includes("const STORE='wealthlab-state-v1'"),'Existing notes/progress persistence key must remain unchanged');
assert.ok(read('sw.js').includes('wealth-lab-v6.8.0-insurance-gold-edition'));
assert.ok(read('sw.js').includes("'./academy-gold-insurance-labs.js?v=2.0.0'"));
assert.ok(read('academy-chapters/L5.S1-edition2.js').includes('www.irs.gov/publications/p525'),'Life-policy tax claims need IRS source');
assert.ok(read('academy-chapters/L5.S2-edition2.js').includes('floodsmart.gov'),'Flood-risk source needs FEMA');
console.log('PASS: Two comprehensive M5 textbooks with '+total+' instructional reading words, 48 part checks and 12 cumulative checks.');
console.log('PASS: Original lesson IDs, private calculator workbooks, policy loan, tax and flood risks and offline PWA integration.');
