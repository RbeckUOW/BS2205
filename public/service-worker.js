const CACHE_NAME = 'gear-up-cache-v1';
// All assets to cache for offline display
const urlsToCache = [
  '/',
  '/booking',
  '/css/styles.css',
  '/images/bannerimage.jpg',
  '/images/favicon.ico',
  '/images/logo.png',
  '/images/carousel/bball.jpg',
  '/images/carousel/tennis.jpg',
  '/images/carousel/fball.jpg',
  '/images/carousel/badmint.jpg',
  '/images/carousel/hockey.jpg',
  '/images/carousel/walkin.jpg',
  '/js/menu.js',
  '/js/toggle-theme.js',
  '/js/fetchEquipment.js',
  '/js/fetchReservations.js',
  '/js/sw.js',
  '/js/service-worker.js',
];

// Install event: Cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve resources from cache or network.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(event.request).catch(() => {
          // If the network is unavailable, return home as fallback.
          if (event.request.url.includes('home')) {
            return caches.match('/');
          }
        });
      })
  );
});
