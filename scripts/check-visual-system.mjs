/**
 * Deep Emerald + Rich Gold UI contract.
 * Node-only / no network or extra dependencies.
 * Run: node scripts/check-visual-system.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),css=read('visual-polish-v1.css'),
      sw=read('sw.js'),manifest=JSON.parse(read('manifest.webmanifest'));
const pages=['.v3-home','.wl-learn','.wl-reader','.wl-tools','.wlnb','.wl-more','.state-page'];
const colors=[
 '#031915','#05231d','#0a3027','#0e3a2f','#145141',
 '#c9a24d','#d8b668','#e7c987','#f4ebdc','#d9d0c2',
 '#b7c7be','#355a4a'
];
for(const c of colors){
 assert.ok(css.toLowerCase().includes(c),'Missing approved color '+c);
}
for(const page of pages){
 assert.ok(css.includes(page),'Missing shared styling for '+page);
}
const medias=[
 '.v3-home .v3-hero',
 '.wl-learn .wl-learn-hero',
 '.wl-tools .wt-hero',
 '.wl-reader .wlr-hero',
 '.wlnb .wlnb-hero',
 '.wl-learn .wl-row-art',
 '.wl-learn .wl-feature-art',
 '.wl-learn .wl-topic-card',
 '.wl-tools .wt-category',
 '.wlnb .wlnb-book'
];
for(const selector of medias){
 assert.ok(css.includes(selector),'Missing image clarity rule '+selector);
}
assert.ok(css.includes('notebook-approved-hero.webp'),'Must preserve approved Notebook hero');
for(const asset of ['assets/notebook-approved-hero.webp','assets/academy-hero.webp','assets/lesson-thumbnails.webp']){
 assert.ok(existsSync(new URL('../'+asset,import.meta.url)),'Required photographic asset missing: '+asset);
}
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length,'Visual stylesheet has unbalanced braces');
const styles=[...html.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g)].map(m=>m[1]);
assert.ok(styles.length>1,'External stylesheets missing');
assert.ok(styles.at(-1)?.startsWith('./visual-polish-v1.css?v=6.0.0'),'Shared visual system must be the last stylesheet');
assert.ok(html.includes('<meta name="theme-color" content="#031915">'),'Browser theme must be emerald');
assert.equal(manifest.background_color.toLowerCase(),'#031915');
assert.equal(manifest.theme_color.toLowerCase(),'#031915');
assert.ok(sw.includes("'./visual-polish-v1.css'"),'Offline PWA must precache shared stylesheet');
assert.ok(/wealth-lab-v6\.[1-9]\d*\./.test(sw),'Offline PWA cache version must be bumped');
assert.ok(html.includes('id = \'wl-update-prompt\''),'Installed PWA must offer a safe update prompt');
assert.ok(html.includes('New Wealth Lab design is ready.'),'Update prompt copy missing');
assert.ok(html.includes('function reader(){'),'Canonical lesson reader must be preserved');
assert.ok(html.includes('wealthlab-state-v1'),'Local progress key must be preserved');
console.log('PASS: Approved v6 palette, seven page families, ten media rules.');
console.log('PASS: Last-loaded stylesheet, image assets, PWA theme/cache/update.');
console.log('PASS: Lesson renderer and saved-state structure preserved.');
