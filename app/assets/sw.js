const CACHE_VERSION = 2.1;
const CURRENT_CACHES = {
  offline: `offline-v${CACHE_VERSION}`,
};

const pageNotFound = '/404.html';

// 默认缓存
const OFFLINE_URL = [
  pageNotFound,
  '/styles/main.css',
  '/images/zp.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CURRENT_CACHES.offline).then(cache => cache.addAll(OFFLINE_URL)),
  );
});

// 清理
self.addEventListener('activate', (event) => {
  const cacheWhitelist = Object.values(CURRENT_CACHES);

  event.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (!cacheWhitelist.includes(key)) {
        return caches.delete(key);
      }

      return true;
    }))),
  );
});

// 代理
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    event.respondWith(
      fetch(event.request),
    );
  } else if (event.request.mode === 'navigate') {
    // HTML，总是请求资源并缓存
    event.respondWith(
      fetch(event.request).then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }

        return caches.open(CURRENT_CACHES.offline).then((cache) => {
          cache.put(event.request, res.clone());

          return res;
        });
      }).catch(() => caches.match(event.request).then((res) => {
        if (!res) {
          return caches.match(pageNotFound);
        }

        return res;
      })),
    );
  } else {
    // 其它资源，先匹配缓存，未匹配请求资源，无资源以404响应
    event.respondWith(
      caches.match(event.request).then((asset) => {
        if (asset) {
          return asset;
        }

        return fetch(event.request).then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
          }

          return caches.open(CURRENT_CACHES.offline).then((cache) => {
            cache.put(event.request, res.clone());

            return res;
          });
        }).catch(() => new Response('Page Not Found', {
          status: 404,
          statusText: 'Not Found',
        }));
      }),
    );
  }
});