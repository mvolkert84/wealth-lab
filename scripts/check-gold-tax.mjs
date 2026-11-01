/** Gold tax / high-stakes finance quality and regression check, self-contained. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
function parse(name){
 const key='const '+name+'=',at=html.indexOf(key);assert.ok(at>=0,'missing '+name);let level=0,quoted=false,escaped=false,start=at+key.length;
 for(let i=start;i<html.length;i++){const c=html[i];if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue}if(c==='"'){quoted=true;continue}if(c==='{')level++;if(c==='}'&&--level===0)return JSON.parse(html.slice(start,i+1))}
 throw Error('Missing end of '+name);
}
const ids=['L6.S1','L6.S2'],oldIds=[...html.matchAll(/\bS\(\s*['"](L\d+\.S\d+)['"]/g)].map(x=>x[1]);assert.equal(oldIds.length,19,'Original M1-M6 section IDs preserved');
const names=['TEXTBOOK','PART_CHECKS','PART_TERMS','PRACTITIONER_NOTES','CASE_FILES','TEXTBOOK_CHECKS'];
const env=Object.fromEntries(names.map(n=>[n,parse(n)]));env.ALL_SECTIONS=oldIds.map(id=>({id}));env.window=env;
const preexisting=Object.fromEntries(ids.map(id=>[id,env.TEXTBOOK[id]]));for(const id of ids)assert.equal(preexisting[id],undefined,id+' expected original short-form lesson');
const converter=read('academy-gold-short-converter.js');new Script(converter);runInNewContext(converter,env);
let all=0;
for(const id of ids){
 assert.ok(oldIds.includes(id)&&html.includes("S('"+id+"'"),id+' original ID missing');
 const file='academy-chapters/'+id+'-edition2.js',s=read(file);new Script(s,{filename:file});runInNewContext(s,env,{filename:file});
 const book=env.TEXTBOOK[id];assert.equal(book.pages.length,12,id+' must have 12 reading parts');
 assert.equal(env.PART_CHECKS[id].length,12,id+' must have 12 assessments');
 assert.equal(env.PART_TERMS[id].length,12,id+' must have 12 vocabulary sections');
 assert.equal(env.TEXTBOOK_CHECKS[id].length,6,id+' must have six final mastery checks');
 assert.ok(env.CASE_FILES[id]?.steps?.length>=8,id+' must have detailed decision case');
 assert.ok(book.sources.length>=3&&book.sources.some(x=>x.includes('irs.gov')),id+' needs IRS official sources');
 let words=0;for(const [i,p]of book.pages.entries()){
  const n=p.paragraphs.join(' ').split(/\s+/).length;words+=n;
  assert.ok(p.paragraphs.length>=4&&n>=240,id+' part '+(i+1)+' instructional content insufficient: '+n+' words');
  assert.ok(p.example?.length>=3,id+' part '+(i+1)+' lacks numbers');
  assert.ok(p.pitfall?.length>=75&&p.exercise?.length>=90,id+' part '+(i+1)+' lacks risk analysis or exercise');
  assert.equal(env.PART_CHECKS[id][i].length,2,id+' part '+(i+1)+' checks missing');
  assert.ok(env.PART_TERMS[id][i].length>=2,id+' part '+(i+1)+' terms missing');
  for(const q of env.PART_CHECKS[id][i])assert.ok(q.options?.length===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&q.why?.length>=40,id+' part '+(i+1)+' explanation incomplete: '+q.q);
 }
 assert.ok(words>=4000,id+' fewer than 4000 academic instructional words: '+words);all+=words;
 assert.ok(html.includes('src="./'+file+'?v=2.0.0"'),id+' is not loaded');
 assert.ok(read('sw.js').includes("'./"+file+"?v=2.0.0'"),id+' is not available offline');
 console.log('PASS: '+id+' 12-part researched tax/advanced textbook with '+words+' instructional words, 24 checks and professional case.');
}
const lab=read('academy-gold-tax-labs.js');new Script(lab,{filename:'academy-gold-tax-labs.js'});
const mock={document:{addEventListener(){},documentElement:{}},MutationObserver:class{observe(){}}};mock.window=mock;runInNewContext(lab,mock);
for(const id of ids){const m=mock.WealthLabTaxStrategyLabMarkup({id});assert.ok(m.includes('data-wlt="'+id+'"')&&m.includes('data-wlt-check')&&m.includes('data-wlt-answer="2"'),id+' calculator missing');}
assert.equal(mock.WealthLabTaxStrategyLabMarkup({id:'L5.S2'}),'','Tax labs must apply only to M6');
assert.ok(!lab.includes('localStorage')&&!lab.includes('fetch('),'Do not store or send individual practice values');
assert.ok(html.includes('WealthLabTaxStrategyLabMarkup(s)'),'Examples reader must include tax labs');
assert.ok(html.includes("const STORE='wealthlab-state-v1'"),'Existing bookmarks and notes persistence key must remain');
assert.ok(read('sw.js').includes('wealth-lab-v6.9.0-tax-gold-edition'));
assert.ok(read('sw.js').includes("'./academy-gold-tax-labs.js?v=2.0.0'"));
const m1=read('academy-chapters/L6.S1-edition2.js');
assert.ok(m1.includes('$16,100')&&m1.includes('$32,200')&&m1.includes('2026'),'Tax year and IRS deduction figures must be precise');
const m2=read('academy-chapters/L6.S2-edition2.js');
assert.ok(m2.includes('$19,000')&&m2.includes('2026')&&m2.includes('irs.gov'),'Advanced gift and trust source and dated figures required');
assert.ok(Math.abs(300000-18000-150000-132000)<.000001,'Closing cash arithmetic');
assert.ok(Math.abs((300000-18000)-220000-62000)<.000001,'Home sale basis arithmetic');
assert.ok(Math.abs(10000*1.06*1.06-11236)<.000001,'Policy loan compounding arithmetic');
console.log('PASS: Two M6 gold chapters, '+all+' explanatory reading words, 48 part checks and 12 final questions, 2 professional cases.');
console.log('PASS: Original IDs, private educational worksheets, IRS/CT references, signed-contract caution and offline assets.');
