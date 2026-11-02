import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
const app=read('index.html'),css=read('ui-unified-v1.css'),sw=read('sw.js'),thumbs=read('learn-thumbnails.css');
assert.ok(app.includes('<link rel="stylesheet" href="./ui-unified-v1.css?v=1.0.0">'));
assert.ok(sw.includes("'./ui-unified-v1.css'"),'PWA precache missing final stylesheet');
assert.ok(sw.includes('ui-v1'),'Cache version not updated');
assert.ok(app.includes("const STORE='wealthlab-state-v1'"),'Old learning data storage key altered');
assert.ok(app.includes("['home','home','Home']")&&app.includes("['learn','book','Learn']")&&app.includes("['tools','calculator','Tools']")&&app.includes("['notebook','notes','Notebook']")&&app.includes("['more','more','More']"));
assert.ok(app.includes('homeGlyph(icon)'));
assert.ok(app.includes('aria-current="page"'),'Main navigation aria-current not found');
assert.ok(app.includes("state.view==='reader'&&v==='learn'"),'Reader should activate Learn');
assert.ok(app.includes("state.view==='states'&&v==='tools'"),'State Explorer should activate Tools');
assert.ok(css.includes('#app > nav.bottom')&&css.includes('#app.wlnb-active > nav.bottom'));
assert.ok(css.includes('min-height:56px'),'Nav targets should remain comfortably tappable');
assert.ok(css.includes('env(safe-area-inset-bottom)'),'Phone bottom safe area missing');
assert.ok(css.includes('grid-template-columns:repeat(5,minmax(0,1fr))'),'Five-tab navigation grid missing');
const input='id="${id}" type="range" min="13" max="24" step="1"';
assert.ok(app.includes(input),'Slider must cover 13px to 24px at 1px increments');
assert.ok(app.includes("function setReadingSize(value,save=false)"),'Live font update missing');
assert.ok(app.includes("case 'font-reset'"),'Reset missing');
assert.ok(app.includes("data-reading-preview"),'Font preview missing');
assert.ok(app.includes('state.font=Math.max(13,Math.min(24,'),'Saved font settings must be bounded');
assert.ok(app.includes("setReadingSize(t.value)"),'Font range input must update immediately');
assert.ok(app.includes("setReadingSize(e.target.value,true)"),'Font range change must persist');
assert.ok(app.includes("state.font=Number.isFinite(Number(b.font))?Math.max(13"),'Backup imports must retain intermediate sizes');
assert.ok(app.includes('class="wl-reader-type"'),'Reader needs direct slider access');
assert.ok(css.includes('section[class*="-section"] > p'),'Academic text must respect font size');
assert.ok(css.includes('font-size:var(--reader-size) !important'),'Academic reader size override missing');
assert.ok(!app.includes("18?20:16"),'Old font cycling still present');
for(const n of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]){
 assert.ok(app.includes("m.id==='M"+n+"'"),'Academic reader Module '+n+' lost');
}
const appScripts=[...app.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
assert.ok(appScripts.length,'No inline app scripts');
for(const [,script] of appScripts)if(script.trim())new Script(script,{filename:'index:inline.js'});

// Execute the actual slider and navigation methods without a browser network.
const typeStart=app.indexOf('function setReadingSize(value,save=false)');
const typeEnd=app.indexOf('function toast(',typeStart);
assert.ok(typeStart>0&&typeEnd>typeStart);
const slider={value:'16',setAttribute(name,value){this[name]=value}};
const valueTag={textContent:''},sample={style:{}},styles={};
let saved=0;
const uiCtx={
 state:{font:16},persist(){saved++;},
 document:{
  documentElement:{style:{setProperty(name,value){styles[name]=value}}},
  querySelectorAll(query){return query==='[data-reading-size]'?[slider]:query==='[data-reading-size-output]'?[valueTag]:query==='[data-reading-preview]'?[sample]:[]}
 }
};
runInNewContext(app.slice(typeStart,typeEnd),uiCtx);
uiCtx.setReadingSize(19,true);
assert.equal(uiCtx.state.font,19);assert.equal(slider.value,19);assert.equal(valueTag.textContent,'19px');
assert.equal(styles['--reader-size'],'19px');assert.equal(sample.style.fontSize,'19px');assert.equal(saved,1);
uiCtx.setReadingSize(50,true);assert.equal(uiCtx.state.font,24);
uiCtx.setReadingSize(0,true);assert.equal(uiCtx.state.font,16,'Empty input should normalize to accessible default');
uiCtx.setReadingSize(13,true);assert.equal(uiCtx.state.font,13);
assert.ok(uiCtx.readingSizeControl(false).includes('type="range" min="13" max="24"'));
assert.ok(uiCtx.readingSizeControl(true).includes('wl-type-compact'));
const navStart=app.indexOf('const navItems='),navEnd=app.indexOf('function progressBar(',navStart);
assert.ok(navStart>0&&navEnd>navStart);
const navCtx={state:{view:'home'},homeGlyph(name){return '<svg data-icon="'+name+'"></svg>'}};
runInNewContext(app.slice(navStart,navEnd),navCtx);
for(const [view,active] of [['home','home'],['learn','learn'],['tools','tools'],['notebook','notebook'],['more','more'],['reader','learn'],['states','tools']]){
 navCtx.state.view=view;
 const markup=navCtx.bottomNav();
 assert.equal((markup.match(/<button /g)||[]).length,5,'Every page should have exactly five nav buttons');
 assert.equal((markup.match(/<svg data-icon=/g)||[]).length,5,'Every nav button needs consistent SVG artwork');
 assert.equal((markup.match(/aria-current="page"/g)||[]).length,1,'Exactly one nav item must be current');
 assert.ok(markup.includes('data-go="'+active+'" class="active" aria-current="page"'),'Active tab incorrect for '+view);
}

assert.ok(existsSync(new URL('../assets/lesson-thumbnails.webp',import.meta.url)),'Local lesson thumbnail sprite missing');
const mappingStart=app.indexOf('const WL_THUMB_FOR_LESSON=');
const mappingEnd=app.indexOf('\nconst WL_THUMB_FOR_TOPIC=',mappingStart);
assert.ok(mappingStart>0&&mappingEnd>mappingStart,'Lesson thumbnail mapping missing');
const mapText=app.slice(mappingStart,mappingEnd);
const pairs=[...mapText.matchAll(/"(L\d+\.S\d+)":"([a-z-]+)"/g)].map(m=>({id:m[1],kind:m[2]}));
assert.equal(pairs.length,59,'All 59 lessons must have defined thumbnail types');
const expected=new Set();
for(const {id,kind} of pairs){
 assert.ok(!expected.has(id),'Duplicate lesson thumbnail '+id);
 expected.add(id);
 assert.ok(thumbs.includes('.wl-thumb-'+kind+'{background-position:'),'Missing atlas position for '+id+' '+kind);
}
assert.equal(new Set(pairs.map(x=>x.kind)).size,20,'Expected all 20 local thumbnail subjects');
assert.ok(css.includes('aspect-ratio:1/1'),'Lesson thumbnails need consistent square crops');
assert.ok(css.includes('overflow-wrap:break-word'),'Long text needs safe wrapping');
assert.ok(css.includes('@media(max-width:390px)'),'Narrow-phone layout missing');
assert.ok(css.includes('grid-template-columns:58px minmax(0,1fr) 24px'),'Narrow lesson row grid missing');
assert.ok(css.includes('#app .wl-reader .wlr-hero h1'),'Long chapter heading rule missing');
assert.ok(!css.includes('display:none!important;}.bottom'),'Footer should never be hidden');
console.log('PASS unified UI: 5 stable navigation tabs, 59 thumbnail mappings, 20 local thumbnail subjects, responsive CSS, 13-24px live font slider, legacy data and all 16 modules.');

