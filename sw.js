const assetsList = [
    '/index.html',
    '/index.js',
]

const versionName = `app-v3`;

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(versionName).then(function (cache) {
            return cache.addAll(assetsList);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function (cacheName) {
                        // Для удаления кеша необходимо вернуть true.
                        // Помните, что кеши являются общими
                        // для всего источника
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        }),
    );
});
