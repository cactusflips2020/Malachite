const CACHE_NAME = 'malachite-v1.0.2';
const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/proxy.html',
  '/apps.html',
  '/games.html',
  '/settings.html',
  '/css/index.css',
  '/css/proxy.css',
  '/css/apps.css',
  '/css/games.css',
  '/css/settings.css',
  '/css/login.css',
  '/js/main.js',
  '/js/clock.js',
  '/js/login.js',
  '/js/proxypage.js',
  '/js/apps.js',
  '/js/games.js',
  '/js/settings.js',
  '/js/particles.min.js',
  '/img/logo.svg',
  '/img/mossfavicon.ico',
  '/img/midnightfavicon.ico',
  '/img/rosefavicon.ico',
  '/img/noirfavicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 