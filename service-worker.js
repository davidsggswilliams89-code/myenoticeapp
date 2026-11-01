const CACHE_NAME = "my-enotice-shell-v1";
const OFFLINE_URL = "./offline.html";
const PRECACHE = ["./index.html", "./offline.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Never intercept Firebase, Google, or other external service requests.
  if (url.origin !== self.location.origin) return;

  // Do not cache the very large static curriculum file (about 19 MB).
  if (url.pathname.toLowerCase().endsWith("/curriculum.html")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        // The GitHub Pages project root URL ends in "/", while the cached shell is index.html.
        if (url.pathname.endsWith("/")) {
          const home = await caches.match("./index.html");
          if (home) return home;
        }
        const fallback = await caches.match(OFFLINE_URL);
        return fallback || new Response("You are offline. Reconnect to the internet and try again.", {
          status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      })
    );
    return;
  }

  // Cache only small same-origin app assets; leave unknown/dynamic requests to network.
  if (["style", "script", "image", "font"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }))
    );
  }
});
