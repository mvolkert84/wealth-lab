import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const app=read('index.html'),sw=read('sw.js'),js=read('academy-academic/module1-academic.js'),
 css=read('academy-academic/module1-academic.css'),
 src=JSON.parse(read('academy-academic/module1-academic-sidecar.json'));
assert.equal(src.schema,'wealth-lab-academic-sidecar-v1');
assert.equal(src.lessons.length,4);
assert.deepEqual(src.lessons.map(l=>l.lesson_id),['L1.S1','L1.S2','L1.S3','L1.S4']);
for(const lesson of src.lessons){
 assert.equal(lesson.academic_sections.length,6,lesson.lesson_id+' section count');
 for(let i=0;i<6;i++){
  const stable=lesson.lesson_id+'.A'+(i+1);
  assert.equal(lesson.academic_sections[i].stable_id,stable);
  assert.ok(js.includes('id=\\"'+stable+'\\"')||js.includes('id="'+stable+'"'),stable+' not in rendered textbook');
 }
 assert.ok(lesson.academic_sections.every(x=>x.markdown.length>500),'Academic sections must have developed exposition');
}
new Script(js,{filename:'academy-academic/module1-academic.js'});
assert.ok(app.includes("['Learn','Examples','Try It','Academic','Notes']"),'New academic view is not in M1 reader');
assert.ok(app.includes('window.WealthLabAcademicMarkup?.(s.id)'),'Academic reader is not wired');
assert.ok(app.includes('window.WealthLabAcademicInit?.()'),'Lab initialization missing');
assert.ok(app.includes("const STORE='wealthlab-state-v1'"),'Storage identity must remain');
assert.ok(js.includes('data-lab')&&js.includes('window.WealthLabAcademicInit'),'Lab code missing');
assert.ok(!js.includes('localStorage'),'Math inputs cannot be saved by labs');
assert.ok(sw.includes("'./academy-academic/module1-academic.js?v=3.0.0'"),'JS must be cached');
assert.ok(sw.includes("'./academy-academic/module1-academic.css?v=3.0.0'"),'CSS must be cached');
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length,'Unbalanced CSS');
assert.ok(app.includes('src="./academy-chapters/L1.S1-edition2.js?v=2.0.0"'),'Existing chapter source lost');
console.log('PASS: Module 1 academic additions, all stable academic IDs, four interactive workbooks, live reader routing, PWA pre-cache and legacy state compatibility.');
