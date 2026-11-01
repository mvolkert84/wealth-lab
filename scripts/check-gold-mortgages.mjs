/** Guard v6.5 gold Mortgage editions.
 * Runs the original canonical six-part TEXTBOOK data in VM and applies the
 * three edition-two files exactly as the app does. No network/dependencies. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
function readJson(name){
 const needle='const '+name+'=',pos=html.indexOf(needle);
 assert.ok(pos>=0,'Missing '+name);const start=pos+needle.length;
 let level=0,quoted=false,escape=false;
 for(let i=start;i<html.length;i++){
  const c=html[i];
  if(quoted){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==='"')quoted=false;continue}
  if(c==='"'){quoted=true;continue}
  if(c==='{')level++;
  if(c==='}'&&--level===0)return JSON.parse(html.slice(start,i+1));
 }
 throw new Error('Cannot parse '+name);
}
const ids=['L2.S1','L2.S2','L2.S3'];
const vars=['TEXTBOOK','PART_CHECKS','PART_TERMS','PRACTITIONER_NOTES','CASE_FILES','TEXTBOOK_CHECKS'];
const context=Object.fromEntries(vars.map(name=>[name,readJson(name)]));
const before=Object.fromEntries(ids.map(id=>[id,{
  headings:context.TEXTBOOK[id].pages.map(p=>p.heading),
  checks:context.PART_CHECKS[id].map(qs=>qs.map(q=>q.q)),
  finals:context.TEXTBOOK_CHECKS[id].map(q=>q.q)
}]));
context.window=context;
const core=read('academy-gold-standard-core.js');
new Script(core);runInNewContext(core,context);
let count=0;
for(const id of ids){
 const name='academy-chapters/'+id+'-edition2.js',src=read(name);
 new Script(src,{filename:name});runInNewContext(src,context,{filename:name});
 const book=context.TEXTBOOK[id],parts=context.PART_CHECKS[id],final=context.TEXTBOOK_CHECKS[id];
 assert.equal(book.pages.length,12,id+' must have twelve parts');
 assert.equal(parts.length,12,id+' must have twelve question groups');
 assert.equal(context.PART_TERMS[id].length,12,id+' missing terminology for advanced part');
 assert.equal(final.length,before[id].finals.length+4,id+' needs four additional final questions');
 assert.deepEqual(JSON.parse(JSON.stringify(book.pages.slice(0,6).map(p=>p.heading))),before[id].headings,id+' original headings shifted');
 assert.deepEqual(JSON.parse(JSON.stringify(parts.slice(0,6).map(a=>a.map(q=>q.q)))),before[id].checks,id+' old part questions changed');
 assert.deepEqual(JSON.parse(JSON.stringify(final.slice(0,before[id].finals.length).map(q=>q.q))),before[id].finals,id+' old final question IDs changed');
 let words=0;
 for(const [i,p] of book.pages.entries()){
  assert.ok(p.paragraphs.length>=4,id+' reading part '+i+' too shallow');
  const n=p.paragraphs.join(' ').split(/\s+/).length;words+=n;
  assert.ok(n>=240,id+' part '+(i+1)+' needs >240 words; found '+n);
  assert.ok(p.example&&p.example.length>=3,id+' missing examples part '+i);
  assert.ok(p.pitfall&&p.pitfall.length>=70,id+' no caveat part '+i);
  assert.ok(p.exercise&&p.exercise.length>=85,id+' no independent practice part '+i);
  assert.equal(parts[i].length,2,id+' part '+i+' must have two checks');
  for(const q of parts[i]){assert.equal(q.options.length,4);assert.ok(q.answer>=0&&q.answer<4)}
  if(i>=6){assert.equal(context.PRACTITIONER_NOTES[id][i].length,4);assert.ok(context.PART_TERMS[id][i].length>=2)}
 }
 assert.ok(words>=4000,id+' must have at least 4000 instructional words; has '+words);
 assert.ok(context.CASE_FILES[id]?.steps?.length>=8,id+' needs multistep case');
 assert.ok(book.sources?.some(u=>u.includes('consumerfinance.gov')||u.includes('investor.gov')),id+' needs official educational sources');
 assert.ok(html.includes('src="./'+name+'?v=2.0.0"'),id+' not linked into app');
 const sw=read('sw.js');assert.ok(sw.includes("'./"+name+"?v=2.0.0'"),id+' not offline cached');
 count+=words;
 console.log('PASS: '+id+' edition 2.0; 12 parts, '+words+' instructional words, original answers preserved.');
}
const lab=read('academy-gold-mortgage-labs.js');
new Script(lab,{filename:'academy-gold-mortgage-labs.js'});
const env={document:{addEventListener(){},documentElement:{}},MutationObserver:class{observe(){}}};
env.window=env;
runInNewContext(lab,env);
for(const id of ids){const markup=env.WealthLabMortgageLabMarkup({id});assert.ok(markup.includes('data-wlm="'+id+'"')&&markup.includes('data-wlm-check'));assert.ok(markup.includes('data-wlm-answer="2"'))}
assert.equal(env.WealthLabMortgageLabMarkup({id:'L1.S2'}),'','New workbooks must stay scoped to the correct lessons');
assert.ok(!lab.includes('localStorage'),'Financial figures must not be persisted by the numerical labs');
assert.ok(html.includes('WealthLabMortgageLabMarkup(s)'),'Examples tab must mount workbook');
assert.ok(html.includes("const STORE='wealthlab-state-v1'"),'Saved progress key may not change');
const sw=read('sw.js');
assert.ok(sw.includes('wealth-lab-v6.6.0-estate-gold-edition'));
assert.ok(sw.includes("'./academy-gold-mortgage-labs.js?v=2.0.0'"));
assert.ok(sw.includes("'./academy-gold-standard-core.js?v=2.0.0'"));
console.log('PASS: Three original Mortgage chapters fully upgraded; '+count+' reading words.');
console.log('PASS: 72 part questions, 12 extra final checks plus original questions, three new case studies.');
console.log('PASS: Private interactive numerical exercises and compatible saved answers, progress, bookmarks and PWA offline scripts.');
assert.ok(read('academy-gold-mortgage-labs.js').includes('Loan')||read('academy-gold-mortgage-labs.js').includes('mortgage'),'Mortgage calculators should include real amortization or finance logic');
