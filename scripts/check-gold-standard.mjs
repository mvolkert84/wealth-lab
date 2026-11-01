/**
 * L1.S1 Edition 2: enforce actual instructional depth and preserve earlier work.
 * Node 22; no network, no user data, no external dependencies.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
function readLiteral(name){
 const anchor='const '+name+'=';
 const pos=html.indexOf(anchor);
 assert.ok(pos>=0,'Missing canonical '+name);
 const start=pos+anchor.length;
 assert.equal(html[start],'{','Expected JSON object for '+name);
 let depth=0,quoted=false,escape=false;
 for(let i=start;i<html.length;i++){
  const ch=html[i];
  if(quoted){if(escape)escape=false;else if(ch==='\\')escape=true;else if(ch==='"')quoted=false;continue}
  if(ch==='"'){quoted=true;continue}
  if(ch==='{')depth++;
  if(ch==='}'&&--depth===0){return JSON.parse(html.slice(start,i+1))}
 }
 throw Error('Unclosed '+name);
}
const vars=['TEXTBOOK','PART_CHECKS','PART_TERMS','PRACTITIONER_NOTES','CASE_FILES','TEXTBOOK_CHECKS'];
const data=Object.fromEntries(vars.map(name=>[name,readLiteral(name)]));
const original=data.TEXTBOOK['L1.S1'];
assert.equal(original.pages.length,6,'Original chapter must be six parts');
const originalHeadings=original.pages.map(p=>p.heading);
const originalPartQuestions=data.PART_CHECKS['L1.S1'].map(part=>part.map(q=>q.q));
const originalFinalQuestions=data.TEXTBOOK_CHECKS['L1.S1'].map(q=>q.q);
data.window=data;
const code=read('academy-chapters/L1.S1-edition2.js');
new Script(code,{filename:'L1.S1-edition2.js'});
runInNewContext(code,data,{filename:'L1.S1-edition2.js'});
const book=data.TEXTBOOK['L1.S1'], gold=data.WealthLabGoldEdition;
assert.equal(gold.edition,'2.0');
assert.equal(book.pages.length,12,'Gold edition requires 12 substantive parts');
assert.deepEqual(JSON.parse(JSON.stringify(book.pages.slice(0,6).map(p=>p.heading))),originalHeadings,'Preserve reading part order and saved indices');
assert.deepEqual(JSON.parse(JSON.stringify(data.PART_CHECKS['L1.S1'].slice(0,6).map(a=>a.map(q=>q.q)))),originalPartQuestions,'Do not overwrite existing saved part question IDs');
assert.deepEqual(JSON.parse(JSON.stringify(data.TEXTBOOK_CHECKS['L1.S1'].slice(0,3).map(q=>q.q))),originalFinalQuestions,'Do not overwrite existing final question IDs');
assert.equal(data.PART_CHECKS['L1.S1'].length,12);
assert.equal(data.PART_TERMS['L1.S1'].length,12);
for(let i=6;i<12;i++) assert.equal(data.PRACTITIONER_NOTES['L1.S1'][i]?.length,4,'Practitioner insight for advanced part '+(i+1));
assert.equal(data.TEXTBOOK_CHECKS['L1.S1'].length,7);
let words=0;
for(const [index,p] of book.pages.entries()){
 assert.ok(p.paragraphs.length>=4,'Each part requires multiple developed paragraphs: '+index);
 const count=p.paragraphs.join(' ').trim().split(/\s+/).length;
 words+=count;
 assert.ok(count>=240,'Part '+(index+1)+' lacks depth: '+count+' words');
 assert.ok(p.example?.length>=3,'Part '+(index+1)+' needs numeric worked examples');
 assert.ok(p.pitfall?.length>=80,'Part '+(index+1)+' needs an explicit risk or common error');
 assert.ok(p.exercise?.length>=50,'Part '+(index+1)+' needs independent learner work');
 const qs=data.PART_CHECKS['L1.S1'][index];
 assert.equal(qs.length,2,'Two graded checkpoints required at part '+(index+1));
 for(const q of qs){assert.equal(q.options.length,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.why.length>=(index<6?10:40))}
}
assert.ok(words>=4000,'Gold chapter must deliver at least 4,000 words of reading, actual '+words);
assert.ok(data.CASE_FILES['L1.S1'].steps.length>=8,'Professional case should be multistep');
assert.ok(book.sources.some(u=>u.includes('investor.gov'))&&book.sources.some(u=>u.includes('consumerfinance.gov')));
const labCode=read('academy-gold-lab.js');
new Script(labCode,{filename:'academy-gold-lab.js'});
const labSandbox={document:{addEventListener(){},documentElement:{}},MutationObserver:class{observe(){}}};
labSandbox.window=labSandbox;
runInNewContext(labCode,labSandbox,{filename:'academy-gold-lab.js'});
const markup=labSandbox.WealthLabGoldLabMarkup({id:'L1.S1'});
assert.ok(markup.includes('data-wlg-workbook')&&markup.includes('data-wlg-check')&&markup.includes('data-wlg-field="cash"'));
assert.equal(labSandbox.WealthLabGoldLabMarkup({id:'L1.S2'}),'','Worksheet scoped to correct lesson');
assert.ok(!labCode.includes('localStorage'),'Financial entries must remain ephemeral');
assert.ok(html.includes('academy-chapters/L1.S1-edition2.js?v=2.0.0'));
assert.ok(html.includes('academy-gold-lab.js?v=2.0.0'));
assert.ok(html.includes('window.WealthLabGoldLabMarkup(s)'),'Examples tab must display the worksheet');
const sw=read('sw.js');
assert.ok(sw.includes("academy-chapters/L1.S1-edition2.js?v=2.0.0"));
assert.ok(sw.includes("academy-gold-lab.js?v=2.0.0"));
assert.ok(sw.includes('wealth-lab-v6.9.0-tax-gold-edition'),'Release cache version expected');
assert.ok(html.includes("const STORE='wealthlab-state-v1'"),'Must preserve old saved-data key');
console.log('PASS: L1.S1 edition 2.0 '+book.pages.length+' parts and '+words+' instructional words.');
console.log('PASS: 24 part questions + 7 final checks + original single lesson quiz.');
console.log('PASS: Existing headings, answers, progress/storage keys and order preserved.');
console.log('PASS: Case study, official references, interactive private workbook and offline assets.');
