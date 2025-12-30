
    const CACHE_NAME = 'gp-app-v1';
    
    // Install Event
    self.addEventListener('install', (e) => {
      console.log('[Service Worker] Install');
      self.skipWaiting();
    });

    // Activate Event
    self.addEventListener('activate', (e) => {
      e.waitUntil(clients.claim());
    });

    // Fetch Event - Network First (To ensure fresh data), Fallback to Offline Page is handled by UI
    self.addEventListener('fetch', (e) => {
        e.respondWith(
            fetch(e.request).catch(() => {
                // If offline, the browser will throw error, 
                // which we handle in the UI via window.addEventListener('offline')
                // But strictly for SW, we can return nothing or a standard offline response if needed.
                // For now, let the request fail so the UI handles the "No Internet" screen.
            })
        );
    });
  