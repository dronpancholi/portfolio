

const CACHE_NAME = 'portfolio-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add a .catch to prevent a single failed asset from breaking the entire SW installation.
        return cache.addAll(urlsToCache).catch(error => {
          console.error('SW cache.addAll failed:', error);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  // For image assets, use a cache-first strategy.
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          // Fetch from network, cache it, and return the response.
          const fetchPromise = fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
          // Return from cache if available, otherwise fetch from network.
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // For all other requests, use a cache-first strategy for pre-cached assets.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});