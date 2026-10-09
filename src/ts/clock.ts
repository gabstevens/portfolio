export function initClocks(): void {
  const localEl = document.querySelector<HTMLElement>('[data-clock="local"]');
  const londonEl = document.querySelector<HTMLElement>('[data-clock="london"]');
  const epochEl = document.querySelector<HTMLElement>('[data-clock="epoch"]');

  if (!localEl || !londonEl || !epochEl) return;

  const local = localEl;
  const london = londonEl;
  const epoch = epochEl;
  const localSep = document.querySelector<HTMLElement>('.local-sep');

  // Formatters are initialized once in outer scope to prevent per-second ICU engine allocations
  const londonFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  });

  const localFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  });

  function tick(): void {
    const now = new Date();
    const localStr = localFormatter.format(now);
    const londonStr = londonFormatter.format(now);

    london.textContent = `LONDON: ${londonStr}`;
    epoch.textContent = `EPOCH: ${Math.floor(now.getTime() / 1000)}`;

    // Suppress local telemetry when visitor timezone coincides with London to eliminate redundant display
    if (localStr === londonStr) {
      local.style.display = 'none';
      if (localSep) localSep.style.display = 'none';
    } else {
      local.style.display = '';
      local.textContent = `LOCAL: ${localStr}`;
      if (localSep) localSep.style.display = '';
    }
  }

  tick();

  // Fixed 1000ms polling intentionally preferred over requestAnimationFrame to avoid 60fps main-thread overhead
  window.setInterval(tick, 1000);
}
