/**
 * Probes Cloudflare edge POP telemetry with a bounded 1500ms abort timeout.
 * Prevents network stalls from blocking masthead initialization on static or offline hosts,
 * falling back to loopback detection for local development.
 */
export async function detectEdgeLocation(): Promise<string> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch('/cdn-cgi/trace', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) return 'EDGE';
    const text = await response.text();
    const match = text.match(/colo=([A-Z0-9]+)/);
    return match?.[1] ?? 'EDGE';
  } catch {
    clearTimeout(timeoutId);
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'LOCAL'
      : 'EDGE';
  }
}

/**
 * Computes end-to-end navigation duration and active DOM node density.
 * Evaluates PerformanceNavigationTiming milestones with tiered fallbacks
 * (loadEventEnd -> domContentLoadedEventEnd -> performance.now()) to guarantee
 * valid metrics across varying lifecycle invocation times.
 */
export function getPerformanceMetrics(): { renderTimeMs: number; domCount: number } {
  const navEntries = performance.getEntriesByType('navigation');
  let renderTimeMs = 0;

  if (navEntries.length > 0) {
    const nav = navEntries[0] as PerformanceNavigationTiming;
    renderTimeMs = Math.round(
      nav.loadEventEnd > 0
        ? nav.loadEventEnd - nav.startTime
        : nav.domContentLoadedEventEnd > 0
        ? nav.domContentLoadedEventEnd - nav.startTime
        : performance.now()
    );
  } else {
    renderTimeMs = Math.round(performance.now());
  }

  const domCount = document.querySelectorAll('*').length;
  return { renderTimeMs, domCount };
}
