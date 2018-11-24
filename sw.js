// Use a cacheName for cache versioning
var cacheName = 'v1:static';
var cacheFiles = [
    './',
    'index.html',
    './index.html',
    './css/main.css',
    './js/main.js',
    './js/loader/stl.js',
    './js/slacer/mesh.js',
    './js/slacer/settings.js',
    './js/slacer/slicer.js',
    './js/slacer/viewer.js',
    './js/slacer/viewcontrols.js',
    './js/slacer/viewer2d.js',
    './js/slacer/viewer3d.js',
    './vendor/jquery-ui/jquery-ui.min.css',
    './vendor/bootstrap/css/bootstrap.min.css',
    './vendor/bootstrap-slider/css/bootstrap-slider.min.css',
    './vendor/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css',
    './vendor/jquery-2.1.4.min.js',
    './vendor/jquery-ui/jquery-ui.min.js',
    './vendor/bootstrap/js/bootstrap.min.js',
    './vendor/bootstrap-slider/bootstrap-slider.min.js',
    './vendor/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js',
    './vendor/lodash.min.js',
    './vendor/three.min.js',
    './vendor/earcut.js',
    './vendor/triangulation.js',
    './vendor/OrbitControls.js',
    './vendor/FileSaver.min.js',
    './vendor/jszip.min.js'
];

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function(e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    console.log('install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheFiles).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// when the browser fetches a URL…
self.addEventListener('fetch', function(event) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});