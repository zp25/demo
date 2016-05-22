/** @type {Number} Cache版本 */
var CACHE_VERSION = 1.2;

/** @type {Object} 当前可用cacheName */
var CURRENT_CACHES = {
  offline: 'offline-v' + CACHE_VERSION,
};

/** @type {Array}  */
var OFFLINE_URL = {
  offline: 'sw',
  style: new URL('styles/main.min.css', self.location.origin).href,
  image: new URL('images/zp.jpg', self.location.origin).href,
};

/**
 * Cache Busting
 * @param  {String} url 资源路径
 * @return {Request} Request Object
 */
function buildRequest(url) {
  var request = new Request(url, { cache: 'reload', mode: 'no-cors' });
  var bustedUrl;

  if ('cache' in request) {
    return request;
  }

  // 否则使用QS策略
  bustedUrl = new URL(url, self.location.href);
  bustedUrl.search +=
    (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();

  return new Request(bustedUrl, { mode: 'no-cors' });
}

/** 安装，预先获取需缓存资源 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CURRENT_CACHES.offline).then(function(cache) {
      var resource = Object.keys(OFFLINE_URL).map(function(key) {
        return OFFLINE_URL[key];
      });

      var cachePromises = resource.map(function(url) {
        return fetch(buildRequest(url)).then(function(response) {
          return cache.put(url, response);
        });
      });

      return Promise.all(cachePromises);
    })
  );
});

/** 清理 */
self.addEventListener('activate', function(event) {
  var cacheWhitelist = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }

        return true;
      }));
    })
  );
});

/** 代理，部分浏览器暂不支持navigation request */
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') {
    event.respondWith(
      fetch(event.request)
    );
  } else if (event.request.mode === 'navigate' ||
      event.request.headers.get('accept').indexOf('text/html') !== -1) {
    event.respondWith(
      // html
      fetch(event.request).then(function(response) {
        if (!response.ok) {
          // 非网络问题fetch失败，例如404，使用Cache响应
          throw new Error('Not Found');
        }

        return response;
      }).catch(function() {
        // 网络问题，例如offline，使用Cache响应
        return caches.match(OFFLINE_URL.offline);
      })
    );
  } else {
    event.respondWith(
      // 其它资源
      fetch(buildRequest(event.request.url)).then(function(response) {
        if (!response.ok) {
          throw new Error('Not Found');
        }

        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          }

          return new Response('Page Not Found', {
            status: 404,
            statusText: 'Not Found'
          });
        });
      })
    );
  }
});
