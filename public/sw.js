/**
 * Tamim Hasan Portfolio service worker.
 *
 * IMPORTANT: every entry in APP_SHELL must resolve to a real, same-origin
 * 200 response. `cache.addAll()` is atomic — a single 404 rejects the whole
 * promise and the worker never installs. Keep this list short and verifiable.
 */
const CACHE_NAME = "tamim-portfolio-v6";
const OFFLINE_URL = "/offline.html";

const APP_SHELL = [
  "/",
  "/home",
  "/resume",
  "/cv",
  "/offline.html",
  "/manifest.webmanifest",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/brand/tamim-hassan-logo.png",
  "/assets/brand/og.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Add entries individually so one failure cannot break the whole install.
      await Promise.all(
        APP_SHELL.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "reload" });
            if (response.ok) await cache.put(url, response);
          } catch {
            /* Offline or unavailable during install — retried on next fetch. */
          }
        }),
      );
      await self.skipWaiting();
    })(),
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
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache API responses, auth, or the live-update SSE stream.
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/dashboard") ||
    url.pathname === "/login"
  ) {
    return;
  }

  // Navigation requests: network first, cached shell as fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached =
            (await caches.match(request)) || (await caches.match(OFFLINE_URL));
          return cached || Response.error();
        }),
    );
    return;
  }

  // Static assets: cache first, then network.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => Response.error()),
    ),
  );
});
