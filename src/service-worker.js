const staticCacheName = 'site-static';
const assets = [
    '/', 
    '/index.html', 
    '/styles.css',
    '/app.js',
    '/images/fire.png',
    '/images/fit.png'
]

//Register service worker
if ('serviceWorker' in navigator) {
    //navigator.serviceWorker.register("/serviceworker.js");
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}
//Install Event will cache all assets from Array
self.addEventListener('install', event => {
    console.log('gr8', 'appinstalled', event);
    event.waitUntil(
        caches.open(staticCacheName).then((cache)=> {
            console.log('gr8', 'caching assets');
            cache.addAll(assets);
        })
    )
});

//Activate event
self.addEventListener('activate', event => {
    console.log('gr8', 'service worker activated', event);
});

//Fetch event
self.addEventListener('fetch', event => {
    caches.match(event.request).then(cacheRes => {
        console.log('Fetch event for caching');
        return cacheRes || fetch(event.request);
    })
})