// Cache Buster Script - Ensures both VS Code Simple Browser and regular browsers show the same content
(function() {
    'use strict';
    
    // Force clear browser cache
    if ('caches' in window) {
        caches.keys().then(function(names) {
            names.forEach(function(name) {
                caches.delete(name);
            });
        });
    }
    
    // Add timestamp to all resource requests
    const timestamp = Date.now();
    
    // Update CSS link with cache buster
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('?v=')) {
            link.setAttribute('href', href + '?v=' + timestamp);
        }
    });
    
    // Update script tags with cache buster  
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src && !src.includes('?v=')) {
            script.setAttribute('src', src + '?v=' + timestamp);
        }
    });
    
    // Add no-cache headers programmatically
    if ('fetch' in window) {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            if (args[1]) {
                args[1].cache = 'no-cache';
            } else {
                args[1] = { cache: 'no-cache' };
            }
            return originalFetch.apply(this, args);
        };
    }
    
    console.log('Cache buster applied - timestamp:', timestamp);
})();
