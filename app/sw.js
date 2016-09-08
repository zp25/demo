/** @type {Number} Cache版本 */
const CACHE_VERSION = 2.0;

/** @type {Object} 当前可用cacheName */
const CURRENT_CACHES = {
  offline: `offline-v${CACHE_VERSION}`,
};

/** @type {Array}  */
const OFFLINE_URL = {
  offline: 'sw',
  style: new URL('styles/main.css', self.location.origin).href,
  image: new URL('images/zp.jpg', self.location.origin).href,
};

/**
 * Cache Busting
 * @param  {String} url 资源路径
 * @return {Request} Request Object
 */
function buildRequest(url) {
  const request = new Request(url, { cache: 'reload', mode: 'no-cors' });

  if ('cache' in request) {
    return request;
  }

  // 否则使用QS策略
  const bustedUrl = new URL(url, self.location.href);
  bustedUrl.search += `${bustedUrl.search ? '&' : ''}cachebust=${Date.now()}`;

  return new Request(bustedUrl, { mode: 'no-cors' });
}

/** 安装，预先获取需缓存资源 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CURRENT_CACHES.offline).then(cache => {
      const cachePromises = Object.values(OFFLINE_URL).map(url => (
        fetch(buildRequest(url)).then(res => cache.put(url, res))
      ));

      return Promise.all(cachePromises);
    })
  );
});

/** 清理 */
self.addEventListener('activate', event => {
  const cacheWhitelist = Object.values(CURRENT_CACHES);

  event.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map(key => {
      if (!cacheWhitelist.includes(key)) {
        return caches.delete(key);
      }

      return true;
    })))
  );
});

/** 代理，部分浏览器暂不支持navigation request */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    event.respondWith(
      fetch(event.request)
    );
  } else if (event.request.mode === 'navigate' ||
      event.request.headers.get('accept').indexOf('text/html') !== -1) {
    event.respondWith(
      // html, 网络问题，例如offline，和非网络问题，例如404，都使用Cache响应
      fetch(event.request).then(res => {
        if (!res.ok) {
          // 非网络问题fetch失败，例如404，使用Cache响应
          throw new Error('Not Found');
        }

        return res;
      }).catch(() => caches.match(OFFLINE_URL.offline))
    );
  } else {
    event.respondWith(
      // 其它资源
      fetch(buildRequest(event.request.url)).then(res => {
        if (!res.ok) {
          throw new Error('Not Found');
        }

        return res;
      }).catch(() => caches.match(event.request).then(res => {
        if (res) {
          return res;
        }

        return new Response('Page Not Found', {
          status: 404,
          statusText: 'Not Found',
        });
      }))
    );
  }
});
