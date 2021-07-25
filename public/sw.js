/* eslint-disable no-undef */

/**
Import the Workbox library from the Google CDN.
It is possible to serve this locally should we want to remove the dependency on Google
See here for more info: https://developers.google.com/web/tools/workbox/modules/workbox-sw
**/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// SETTINGS
workbox.setConfig({
  // set the local path is not using Google CDN
  // modulePathPrefix: '/directory/to/workbox/'
  // By default, workbox-sw will use the debug build for sites on localhost,
  // but for any other origin it’ll use the production build. Force by setting to true.
  // debug: true
});

const { CacheFirst, NetworkOnly } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

const timeInHour = 60 * 60;
const timeInDay = 24 * timeInHour;
const timeInYear = 365 * timeInDay;

// Force verbose logging even for the production
// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

// Cache settings
workbox.core.setCacheNameDetails({
  // set the default cache name prefix. each domain should be unique to stop clashes
  // this is used for runtime and precaching only
  prefix: 'svelgo',
});

const offlineHandler = async (params) => {
  const networkOnly = new NetworkOnly();
  try {
    return await networkOnly.handle(params);
  } catch (error) {
    return caches.match('/offline.html', {
      cacheName: offlineCacheName,
    });
  }
};

self.addEventListener('install', async (event) => {
  event.waitUntil(
    Promise.all([
      caches.open('offline').then((c) => {
        c.add('/offline.html');
      }),
    ]),
  );
});

// Using cache first strategy since the JS files are fingerprinted and this
// filename will change once a new version is created
workbox.routing.registerRoute(
  // match only with assets on the assets domain
  /\.js$/,
  new CacheFirst({
    cacheName: 'js',
    plugins: [
      new CacheableResponse({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: timeInYear,
        maxEntries: 30,
      }),
    ],
  }),
);

// Using cache first strategy since the CSS files are fingerprinted and this
// filename will change once a new version is created
workbox.routing.registerRoute(
  // match only with assets on the assets domain
  /\.css$/,
  new CacheFirst({
    cacheName: 'css',
    plugins: [
      new CacheableResponse({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: timeInYear,
        maxEntries: 30,
      }),
    ],
  }),
);

workbox.routing.registerRoute(new workbox.routing.NavigationRoute(offlineHandler));

// If any precache rules are defined in the Workbox setup this is where they will be injected
workbox.precaching.precacheAndRoute(['/', '/offline.html']);

// skip the 'worker in waiting' phase and activate immediately
workbox.core.skipWaiting();
// claim any clients that match the worker scope immediately. requests on these pages will
// now go via the service worker.
workbox.core.clientsClaim();
