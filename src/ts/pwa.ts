/**
 * PWA Client Lifecycle Manager
 * Handles Service Worker registration, dev environment bypass,
 * and single-flight controller change reloading.
 */

export function initPwa(): void {
  // Defensive check for service worker support
  if (!('serviceWorker' in navigator)) {
    return;
  }

  // Bypass registration in local development environments
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return;
  }

  // Guard controllerchange with a single-flight boolean flag to avoid refresh loops
  let refreshing = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  // Register /sw.js with scope '/' deferred to window.load
  const registerWorker = (): void => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch((error: unknown) => {
        console.warn('PWA Service Worker registration failed:', error);
      });
  };

  if (document.readyState === 'complete') {
    registerWorker();
  } else {
    window.addEventListener('load', registerWorker, { once: true });
  }
}
