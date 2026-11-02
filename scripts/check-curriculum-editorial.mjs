import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const app=read('index.html'),sw=read('sw.js');
assert.ok(app.includes("const STORE='wealthlab-state-v1'"));
assert.ok(app.includes('data-chat='),'The optional ChatGPT discussion action must be retained');
assert.ok(!app.includes('ChatGPT handoff to challenge your assumptions'));
assert.ok(!app.includes('To investigate a real situation, use “Discuss in ChatGPT”'));

const m1js=read('academy-academic/module1-academic.js');
const start=m1js.indexOf('window.WLAcademicDocuments=')+'window.WLAcademicDocuments='.length;
const end=m1js.indexOf(';\n(function bootstrap',start);
assert.ok(start>0&&end>start);
const m1docs=JSON.parse(m1js.slice(start,end));
const m1ref=JSON.parse(read('academy-academic/module1-academic-sidecar.json'));
const ids=new Set();
for(const lesson of m1ref.lessons){
 ids.add(lesson.lesson_id);
 assert.equal(lesson.academic_sections.length,6);
 const studentMarkup=m1docs[lesson.lesson_id];
 assert.ok(studentMarkup.includes('Advanced study'));
 assert.doesNotMatch(studentMarkup,/candidate edition|academic reconstruction|additive textbook supplement|your live app|the audit found|legacy assessment positions/i);
 assert.equal((studentMarkup.match(/<h1>/g)||[]).length,1,'One main chapter heading per lesson');
}
assert.ok(m1docs.roadmap.includes('Course learning sequence'));
assert.doesNotMatch(m1docs.roadmap,/source of audit|candidate pack|user explicitly|not merged|repository's registered/i);
assert.doesNotMatch(m1js,/Your existing chapter answers and private notes remain|previous chapter answers and personal notes/i);
new Script(m1js);

let labModules=0,labRuns=0,sections=0,problems=0,contentWordCount=0;
for(let n=2;n<=16;n++){
 const ds=read('academy-academic/module'+n+'-data.js');
 const cs=read('academy-academic/module'+n+'-core.js');
 const events={};let currentRoot=null;
 const doc={
  addEventListener(name,fn){events[name]=fn;},
  querySelectorAll(selector){return selector==='.wl-m'+n+'-lab'&&currentRoot?[currentRoot]:[];}
 };
 const context={document:doc,console,Intl,Math,Number,Date};
 context.window=context;
 new Script(ds,{filename:'module'+n+'-data.js'});
 new Script(cs,{filename:'module'+n+'-core.js'});
 runInNewContext(ds,context);
 runInNewContext(cs,context);
 const data=context['WealthLabAcademicM'+n+'Data'];
 const render=context['WealthLabAcademicM'+n+'Markup'];
 const init=context['WealthLabAcademicM'+n+'Init'];
 assert.equal(typeof render,'function');
 assert.equal(typeof init,'function');
 assert.equal(data.lessonIds.length,data.lessons.length);
 const references=[...cs.matchAll(/\.dataset\.(m\d+)(?:Lab|Input|Output)/g)].map(x=>x[1]);
 assert.ok(references.length>0,'No dataset wiring found in Module '+n);
 assert.ok(references.every(x=>x==='m'+n),'Copied DOM bindings from another module in Module '+n+': '+references.join(', '));
 assert.doesNotMatch(cs,/Additive university-style study|Your existing chapter answers|Academic expansion added to the original lesson|individual tax or tax advice|Module 5 Academic content unavailable for this lesson/);
 for(let i=0;i<data.lessons.length;i++){
  const lesson=data.lessons[i],id=lesson.id;
  assert.equal(data.lessonIds[i],id);
  assert.ok(!ids.has(id),'Duplicate stable lesson ID '+id);
  ids.add(id);
  const rendered=render(id);
  assert.ok(rendered.includes('Academic section'),'Missing academic section in '+id);
  assert.ok(rendered.includes('Authoritative research sources')||rendered.includes('Primary sources'),'Missing sources in '+id);
  assert.doesNotMatch(rendered,/Additive university-style study|Your existing chapter answers|Academic expansion added to the original lesson|Academic Edition 3 · Candidate|user explicitly prohibited|reconstruction architecture/i);
  for(const sec of lesson.sections){
   sections++;
   if(Array.isArray(sec.practice))problems+=sec.practice.length;
   const text=(sec.body||[]).join(' ');
   contentWordCount+=text.trim().split(/\s+/).filter(Boolean).length;
   assert.doesNotMatch(text,/our chat thread|this chat thread|we (built|rewrote|deployed) this module|you (asked|approved) in chat|source of audit findings|not merged or published/i,'Development language inside '+id);
  }
 }
 const firstId=data.lessonIds[0],markup=render(firstId);
 const labRe=new RegExp('data-m'+n+'-lab="([^"]+)"');
 const m=labRe.exec(markup);assert.ok(m,'No rendered lab for '+firstId);
 const labId=m[1];
 const nextLab=markup.indexOf('class="lab wl-m'+n+'-lab"',m.index+m[0].length);
 const labHTML=markup.slice(m.index,nextLab<0?undefined:nextLab);
 const inRe=new RegExp('data-m'+n+'-input="([^"]+)" value="([^"]+)"','g');
 const outRe=new RegExp('data-m'+n+'-output="([^"]+)"','g');
 const inputs=[...labHTML.matchAll(inRe)].map(x=>({dataset:{['m'+n+'Input']:x[1]},value:x[2],textContent:''}));
 const outputs=[...labHTML.matchAll(outRe)].map(x=>({dataset:{['m'+n+'Output']:x[1]},textContent:''}));
 assert.ok(inputs.length>0&&outputs.length>0,'Missing numeric input/output '+n);
 const warning={textContent:''};
 currentRoot={
  dataset:{['m'+n+'Lab']:labId},
  querySelectorAll(selector){
   if(selector==='[data-m'+n+'-input]')return inputs;
   if(selector==='[data-m'+n+'-output]')return outputs;
   return [];
  },
  querySelector(selector){
   if(selector==='[data-m'+n+'-warning]')return warning;
   return null;
  }
 };
 init();
 assert.ok(outputs.every(x=>x.textContent.trim()&&x.textContent!=='Check inputs'),
   'On-screen default lab inputs did not compute in Module '+n+': '+JSON.stringify(outputs));
 assert.equal(typeof events.input,'function','Input event missing in Module '+n);
 labModules++;labRuns++;
}
assert.equal(ids.size,59,'All 59 original lesson IDs must be retained');
assert.equal(labModules,15);
assert.ok(contentWordCount>70000,'Unexpectedly sparse academic content');
for(let n=1;n<=16;n++){
 assert.ok(sw.includes('academy-academic/module'+n), 'Offline academic Module '+n+' omitted');
}
console.log('Editorial and UI sweep passed: '+ids.size+' stable lessons, '+sections+' academic sections, '+problems+' exercises, '+contentWordCount+' body words, '+labRuns+' live DOM-style lab initializations, 0 failures.');
