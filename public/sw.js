/**
 * Service Worker Subsystem — Portfolio
 * Zero-dependency Vanilla Service Worker
 */

const CACHE_VERSION = 'folio-v2';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const ACTIVE_CACHES = new Set([SHELL_CACHE, STATIC_CACHE]);

const PRECACHE_SHELL = ['/', '/index.html'];

// 1. Immediate Takeover (install event): Precache minimal shell and skip waiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE_SHELL))
      .then(() => self.skipWaiting())
  );
});

// 2. Legacy Cache Invalidation (activate event): Purge all stale origin caches and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION) || !ACTIVE_CACHES.has(key))
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. Fetch Strategy Router
self.addEventListener('fetch', (event) => {
  // Bypass Rule: Fall through for non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // Bypass non-http/https protocols (e.g., chrome-extension://)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Bypass Rule: Dynamic telemetry endpoints (e.g., Cloudflare edge trace)
  if (url.pathname === '/cdn-cgi/trace' || url.pathname.startsWith('/cdn-cgi/')) {
    return;
  }

  // Document Navigation: Enforce Network-First
  // Guarantees connected visitors always receive fresh HTML, falling back to cached shell offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(SHELL_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
          return caches.match('/');
        })
    );
    return;
  }

  // Hashed Assets (/assets/): Enforce Cache-First for immutable, content-hashed build assets
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Static & Font Requests: Enforce Stale-While-Revalidate
  const isFont =
    event.request.destination === 'font' ||
    url.pathname.startsWith('/fonts/') ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname);

  const isStaticMedia =
    event.request.destination === 'image' ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/og-image.jpg' ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname === '/robots.txt' ||
    /\.(jpe?g|png|gif|svg|webp|avif|ico)$/i.test(url.pathname);

  if (isFont || isStaticMedia || url.origin === self.location.origin) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);

        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              (networkResponse.status === 200 || networkResponse.type === 'opaque')
            ) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch((err) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            throw err;
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
});
