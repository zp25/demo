const CACHE_VERSION = '2019-12-15-v1';
const CURRENT_CACHES = {
  offline: `offline-${CACHE_VERSION}`,
};

const networkError = '/error.html';
const pageNotFound = '/404.html';

// 默认缓存
const OFFLINE_URL = [
  pageNotFound,
  networkError,
  '/',
  '/index.html',
  '/manifest.json',
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

/**
 * fetch并存储到cache
 * @param {Request} req - Request对象
 * @return {Promise}
 * @throws {TypeError} If network error
 * @throws {Error} If res.ok === false
 */
const fetchAndCache = req => fetch(req).then((res) => {
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return caches.open(CURRENT_CACHES.offline).then((cache) => {
    cache.put(req, res.clone());

    return res;
  });
});

// 代理
self.addEventListener('fetch', (event) => {
  const { pathname } = new URL(event.request.url);

  if (pathname === '/' || pathname === '/index.html') {
    // Network falling back to the cache
    event.respondWith(
      fetchAndCache(event.request).catch(() => (
        caches.match(event.request).then((res) => {
          if (!res) {
            return caches.match(networkError);
          }

          return res;
        })
      )),
    );
  } else {
    // Cache falling back to the network
    event.respondWith(
      caches.match(event.request).then((asset) => {
        if (asset) {
          return asset;
        }

        return fetchAndCache(event.request);
      }).catch((err) => {
        // document间导航，包括html或直接访问图片
        if (event.request.mode === 'navigate') {
          if (err instanceof TypeError) {
            return caches.match(networkError);
          }

          return Response.redirect(pageNotFound, 301);
        }

        // 页面中加载的资源
        return new Response('Page Not Found', {
          status: 404,
          statusText: 'Not Found',
        });
      }),
    );
  }
});
