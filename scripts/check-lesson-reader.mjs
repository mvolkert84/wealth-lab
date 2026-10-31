/**
 * Wealth Lab Academy lesson-reader contract — zero dependencies.
 * Run: node scripts/check-lesson-reader.mjs
 * This guards the shared reader for existing and future lessons.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = read('index.html');
const css = read('reader-v1.css');
const sw = read('sw.js');
const manifest = JSON.parse(read('manifest.webmanifest'));

const baseIds = [...html.matchAll(/\bS\(\s*['"](L\d+\.S\d+)['"]/g)].map(m => m[1]);
const academyStart = html.indexOf('const ACADEMY_MODULES');
const academyEnd = html.indexOf('CURRICULUM.push', academyStart);
assert.ok(academyStart >= 0 && academyEnd > academyStart, 'Academy modules must join CURRICULUM');
const academyIds = [...html.slice(academyStart, academyEnd).matchAll(/"id":"(L\d+\.S\d+)"/g)].map(m => m[1]);
const ids = [...baseIds, ...academyIds];
assert.ok(ids.length >= 59, 'Expected at least 59 registered curriculum lessons');
assert.equal(new Set(ids).size, ids.length, 'Every lesson needs a unique, stable ID');
assert.match(html, /const ALL_SECTIONS=CURRICULUM\.flatMap\(m=>m\.sections\)/, 'All lessons must share the section registry');
assert.match(html, /const SECTION_BY_ID=Object\.fromEntries\(ALL_SECTIONS\.map/, 'All lessons must have section lookup');

const start = html.indexOf('function reader(){');
assert.ok(start >= 0, 'Shared reader() is required');
const nextFunction = html.indexOf('\nfunction ', start + 'function reader(){'.length);
const reader = html.slice(start, nextFunction < 0 ? undefined : nextFunction);
assert.ok(reader.includes('<section class="wl-reader"'), 'Reader must use the Academy wrapper');
assert.ok(reader.includes('class="wlr-hero"'), 'Shared Academy hero is required');
assert.ok(reader.includes('class="wlr-main"'), 'Shared reader body is required');
for (const name of ['Learn', 'Examples', 'Try It', 'Notes']) {
  assert.ok(reader.includes("'" + name + "'"), name + ' tab must remain available');
}
for (const call of ['articleLearn(s)', 'articleExample(s)', 'articlePractice(s)', 'articleNotes(s)']) {
  assert.ok(reader.includes(call), 'Reader must use shared content renderer: ' + call);
}
assert.match(html, /function articleLearn\(s\)\{if\(TEXTBOOK\[s\.id\]\)return textbookReader\(s\)/, 'Learn mode must support textbook and short lessons');
assert.match(html, /function articleExample\(s\)\{if\(TEXTBOOK\[s\.id\]\)return textbookCases\(s\)/, 'Examples must support textbook and short lessons');
assert.match(html, /function articlePractice\(s\)\{if\(TEXTBOOK\[s\.id\]\)return textbookPractice\(s\)/, 'Practice must support textbook and short lessons');
assert.match(html, /const view=\{home,learn,reader,tools,notebook,more/, 'Main app must route through shared reader');
assert.ok(html.includes('href="./reader-v1.css?v='), 'Canonical page must load versioned Academy CSS');

for (const selector of [
  '.wl-reader', '.wlr-hero', '.wlr-tabs', '.wlr-progress',
  '.wl-reader .article', '.wl-reader .book-sheet',
  '.wl-reader .noteeditor', '.wl-reader .book-case-file',
  '.wl-reader .book-quiz-card'
]) {
  assert.ok(css.includes(selector), 'Missing universal reader theme selector: ' + selector);
}
assert.ok(sw.includes("'./reader-v1.css'"), 'Offline cache must contain Academy stylesheet');
assert.ok(sw.includes("'./index.html'"), 'Offline cache must contain canonical app');
assert.equal(manifest.start_url, './index.html', 'Installed app must open canonical reader-capable page');

console.log('PASS: ' + ids.length + ' unique lessons (' + baseIds.length +
  ' foundational + ' + academyIds.length + ' Academy) share one reader.');
console.log('PASS: Four lesson tabs, short/textbook renderers, dark theme and PWA paths.');
