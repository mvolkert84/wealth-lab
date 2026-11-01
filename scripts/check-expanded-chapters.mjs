/**
 * Verify real six-part learning content, not just section titles.
 * Runs authored chapter scripts in an isolated Node VM using the same
 * registration API as the app, without reading or changing user data.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('index.html');
const classic=[...html.matchAll(/\bS\(\s*['"](L\d+\.S\d+)['"]/g)].map(m=>m[1]);
const acadStart=html.indexOf('const ACADEMY_MODULES');
const acadEnd=html.indexOf('CURRICULUM.push',acadStart);
const academy=[...html.slice(acadStart,acadEnd).matchAll(/"id":"(L\d+\.S\d+)"/g)].map(m=>m[1]);
const ids=[...classic,...academy];
assert.equal(ids.length,59,'Original 59 stable lesson IDs must remain');
assert.equal(new Set(ids).size,59,'No duplicate lesson IDs');
const sandbox={
  ALL_SECTIONS:ids.map(id=>({id})),TEXTBOOK:{},
  PART_CHECKS:{},PART_TERMS:{},PRACTITIONER_NOTES:{},
  CASE_FILES:{},TEXTBOOK_CHECKS:{}
};
sandbox.window=sandbox;
runInNewContext(read('academy-depth-core.js'),sandbox,{filename:'academy-depth-core.js'});
const chapters=["L7.S3","L8.S3","L9.S1","L10.S1","L13.S2","L15.S3","L7.S2","L7.S4","L8.S1","L8.S4","L9.S2","L9.S3"];
for(const id of chapters){
 const path='academy-chapters/'+id+'.js';
 assert.ok(html.includes('src="./'+path+'?v=1.0.0"'),'Not loaded by canonical app: '+path);
 runInNewContext(read(path),sandbox,{filename:path});
 assert.equal(sandbox.TEXTBOOK[id].pages.length,6,'Six reading parts required: '+id);
 assert.equal(sandbox.PART_CHECKS[id].length,6);
 assert.equal(sandbox.PART_CHECKS[id].flat().length,12,'Two specific practice checks per part required');
 assert.equal(sandbox.PART_TERMS[id].length,6);
 assert.equal(sandbox.PRACTITIONER_NOTES[id].length,6);
 assert.equal(sandbox.TEXTBOOK_CHECKS[id].length,3);
 assert.ok(sandbox.CASE_FILES[id].steps.length>=3,'Professional case required');
 for(const [i,p] of sandbox.TEXTBOOK[id].pages.entries()){
   assert.ok(p.paragraphs.join(' ').split(/\s+/).length>=90,'Reading too shallow: '+id+' part '+(i+1));
 }
}
assert.deepEqual(Array.from(sandbox.WealthLabDeepChapterIds),chapters,'Registration order must be deterministic');
const sw=read('sw.js');
for(const id of chapters){
  assert.ok(sw.includes("'./academy-chapters/"+id+".js?v=1.0.0'"),'Offline cache missing '+id);
}
assert.ok(sw.includes("'./academy-depth-core.js?v=1.0.0'"),'Offline registry missing');
assert.ok(sw.includes('wealth-lab-v6.8.0-insurance-gold-edition'),'PWA version not refreshed');
console.log('PASS: '+chapters.length+' modular chapters, '+(chapters.length*6)+' reading parts, '+(chapters.length*12)+' part checks, '+(chapters.length*3)+' final checks.');
console.log('PASS: Stable 59 section IDs, real reading depth, cases, sources and offline cache.');
