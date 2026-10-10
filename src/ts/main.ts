import { initClocks } from './clock';
import { detectEdgeLocation, getPerformanceMetrics } from './telemetry';
import { initInspector } from './inspector';
import { initPwa } from './pwa';

async function bootstrap(): Promise<void> {
  initPwa();
  initClocks();
  initInspector();

  // Non-blocking async probe for edge POP telemetry
  const edgeEl = document.querySelector<HTMLElement>('[data-telemetry="edge"]');
  const edge = await detectEdgeLocation();
  if (edgeEl) edgeEl.textContent = `EDGE: ${edge}`;

  // Defer performance timing capture until load completion for accurate navigation metrics
  const recordTiming = (): void => {
    const { renderTimeMs } = getPerformanceMetrics();
    const hudRenderTime = document.getElementById('hud-render-time');
    if (hudRenderTime) hudRenderTime.textContent = `${renderTimeMs}ms`;
  };

  if (document.readyState === 'complete') {
    recordTiming();
  } else {
    window.addEventListener('load', recordTiming);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
