const CACHE = 'wealth-lab-v6.3.0-gold-textbook';
const FILES = ['./', './index.html','./home-v3.css','./learn-v4.css','./learn-thumbnails.css','./tools-v1.css','./notebook-v1.css','./more-v1.css','./reader-v1.css','./visual-polish-v1.css','./academy-depth-core.js?v=1.0.0','./academy-chapters/L7.S3.js?v=1.0.0','./academy-chapters/L8.S3.js?v=1.0.0','./academy-chapters/L9.S1.js?v=1.0.0','./academy-chapters/L10.S1.js?v=1.0.0','./academy-chapters/L13.S2.js?v=1.0.0','./academy-chapters/L15.S3.js?v=1.0.0','./academy-chapters/L7.S2.js?v=1.0.0','./academy-chapters/L7.S4.js?v=1.0.0','./academy-chapters/L8.S1.js?v=1.0.0','./academy-chapters/L8.S4.js?v=1.0.0','./academy-chapters/L9.S2.js?v=1.0.0','./academy-chapters/L9.S3.js?v=1.0.0','./academy-chapters/L1.S1-edition2.js?v=2.0.0','./academy-gold-lab.js?v=2.0.0','./assets/notebook-approved-hero.webp','./assets/notebook-home.webp','./assets/notebook-invest.webp','./assets/notebook-taxes.webp','./assets/notebook-insurance.webp','./assets/notebook-retirement.webp','./assets/notebook-estate.webp','./assets/lesson-thumbnails.webp','./assets/academy-hero.webp','./assets/resume-house.webp', './manifest.webmanifest', './icon.svg', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith('wealth-lab-') && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    if (url.hostname === 'images.unsplash.com') {
      event.respondWith((async () => {
        const cache = await caches.open(CACHE);
        const saved = await cache.match(request);
        try {
          const fresh = await fetch(request);
          if (fresh.ok || fresh.type === 'opaque') {
            try { await cache.put(request, fresh.clone()); } catch {}
            return fresh;
          }
          return saved || fresh;
        } catch { return saved || Response.error(); }
      })());
    }
    return;
  }
  // Stylesheets are network-first, so app upgrades do not remain stuck on a
  // previous cache-first design. Offline uses the last cached version.
  if (new URL(request.url).pathname.endsWith('.css')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, {cache:'no-store'});
        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return (await caches.match(request)) ||
               (await caches.match(request, {ignoreSearch:true})) ||
               Response.error();
      }
    })());
    return;
  }
  if (request.mode === 'navigate') {
    // Network-first for pages so installed learners receive new lesson and program versions.
    event.respondWith((async () => {
      try {
        const response = await fetch(request, {cache: 'no-store'});
        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return (await caches.match(request)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});