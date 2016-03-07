/** @type {Number} Cache版本 */
var CACHE_VERSION = 1;
var CURRENT_CACHES = {
  offline: 'offline-v' + CACHE_VERSION
};

/** @type {Array}  */
var OFFLINE_URL = {
  offline: 'sw',
  style: (self.location.origin + '/styles/main.min.css'),
  image: (self.location.origin + '/images/zp.jpg')
};

/**
 * Cache Busting
 * @param  {String} url 资源路径
 * @return {Request} Request Object
 */
function buildRequest(url) {
  var request = new Request(url, {cache: 'reload'});
  var bustedUrl;

  // request.cache设置为reload，部分浏览器不支持，因此判断
  if ('cache' in request) {
    return request;
  }

  // 否则使用QS策略
  bustedUrl = new URL(url, self.location.href);
  bustedUrl.search +=
    (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();

  return new Request(bustedUrl);
}

/** 安装，预先获取需缓存资源 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CURRENT_CACHES.offline).then(function(cache) {
      var cachePromises;
      var resource = Object.keys(OFFLINE_URL).map(function(key) {
        return OFFLINE_URL[key];
      });

      cachePromises = resource.map(function(url) {
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

/** 代理 */
self.addEventListener('fetch', function(event) {
  // 仅对navigation request作响应，部分浏览器不支持navigate值，通过accept头部处理
  if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' &&
       event.request.headers.get('accept').indexOf('text/html') !== -1)) {
    event.respondWith(
      // 获取资源，否则使用Cache响应，offline页面
      fetch(event.request).catch(function() {
        return caches.match(OFFLINE_URL.offline);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }

        return fetch(buildRequest(event.request.url));
      })
    );
  }
});
