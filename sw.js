const CACHE_NAME = "abhiprajameyarnav-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./water.js",
  "./panchang.js",
  "./security.js",
  "./icon.png"
];

// ॲप इन्स्टॉल होताना सर्व फाईल्स कॅशे (Cache) करणे
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// जुना कॅशे काढून नवीन अपडेट करणे
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// इंटरनेट नसताना कॅशेमधून ॲप लोड करणे (Safe Offline Mode)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
