// Malachite Service Worker
const CACHE_NAME = 'malachite-v1.0.1';
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
  '/img/mosslogo.png',
  '/img/midnightlogo.png',
  '/img/roselogo.png',
  '/img/noirlogo.png',
  '/img/mossfavicon.ico',
  '/img/midnightfavicon.ico',
  '/img/rosefavicon.ico',
  '/img/noirfavicon.ico'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 