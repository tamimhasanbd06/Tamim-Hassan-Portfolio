const CACHE_NAME = "tamim-portfolio-v5";
const APP_SHELL = [
  "/",
  "/home",
  "/resume",
  "/cv",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/tamim-hassan-logo.png",
  "/data/skills.json",
  "/data/projects.json",
  "/myapps.json",
  "/library/library-data.json",
  "/library/courses-data.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    new URL(event.request.url).origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);

        if (cached) return cached;

        if (event.request.mode === "navigate") {
          return caches.match("/");
        }

        return Response.error();
      }),
  );
});
