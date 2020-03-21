// Create service worker for PWA
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
workbox.routing.registerRoute(
  new RegExp('w*.*$'),
  new workbox.strategies.StaleWhileRevalidate({ cacheName: 'bowl' })
);
