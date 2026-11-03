import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('index.html'),legacy=read('notebook-v1.css'),unified=read('ui-unified-v1.css'),sw=read('sw.js');
const assets=['home','invest','taxes','insurance','retirement','estate'];
for(const name of assets){
 assert.ok(existsSync(new URL('../assets/notebook-'+name+'.webp',import.meta.url)),'Missing photo for notebook: '+name);
 assert.ok(legacy.includes('.wlnb-book--'+name+'{background-image:url("./assets/notebook-'+name+'.webp")!important'),'Approved notebook artwork must stay mapped: '+name);
}
assert.ok(html.includes('class="wlnb-book wlnb-book--${b.custom?\'custom\':b.id}"'),'Notebook card markup changed');
assert.ok((html.match(/class="wlnb-book wlnb-book--/g)||[]).length>=2,'Cards must exist on Notebook landing and All Notebooks page');
assert.ok(unified.includes('#app .wlnb .wlnb-book-grid'),'Notebook card rules must be scoped');
assert.ok(unified.includes('#app .wlnb .wlnb-notebooks .wlnb-book-grid'),'Notebook home tiles must be fixed');
assert.ok(unified.includes('#app .wlnb .wlnb-detail .wlnb-book-grid'),'All Notebooks tiles must be fixed');
const mobile=unified.slice(unified.indexOf('@media(max-width:729px)',unified.indexOf('Notebook category cards')));
assert.ok(mobile.includes('grid-template-columns:repeat(2,minmax(0,1fr)) !important'),'Phone must have two photo columns, not three');
assert.ok(mobile.includes('height:clamp(158px,41vw,218px) !important'),'Thumbnails must remain sized consistently');
assert.ok(unified.includes('overflow-wrap:anywhere'),'Long notebook names must wrap instead of overflowing images');
assert.ok(unified.includes('text-wrap:balance'),'Two-line subject names should balance');
assert.ok(unified.includes('min-width:0'),'Grid and title boxes must permit shrinking');
assert.ok(unified.includes('background-position:center center !important'),'Photo crop must remain centered');
assert.ok(unified.includes('background-size:cover !important'),'Photo images must cover their thumbnail cards');
assert.ok(unified.includes('.wlnb-book-grid > .wlnb-book:focus-visible'),'Keyboard navigation must remain usable');
assert.ok(unified.includes('@media(min-width:730px)'),'Wide-screen three-column design should remain');
assert.ok(html.includes('ui-unified-v1.css?v=1.1.0'),'CSS cache bust missing');
assert.ok(sw.includes('notebooks-v2'),'New PWA cache must refresh old notebook page styles');
assert.equal((unified.match(/\{/g)||[]).length,(unified.match(/\}/g)||[]).length,'Unbalanced UI CSS');
console.log('PASS Notebook cards: 6 approved local images, two columns on phones, separate wide layout, safe wrapping, consistent crops, PWA version and both notebook routes.');
