export function initInspector(): void {
  const body = document.body;
  const toggleButtons = document.querySelectorAll<HTMLElement>('.inspect-trigger');
  const hudCloseBtn = document.getElementById('hud-close-btn');
  const hud = document.getElementById('inspector-hud');
  const tooltip = document.getElementById('inspector-tooltip');
  const domCountEl = document.getElementById('hud-dom-count');
  const viewportEl = document.getElementById('hud-viewport');
  const targetElemEl = document.getElementById('hud-target-elem');
  const schematicBtn = document.getElementById('hud-schematic-btn');
  const schematicDrawer = document.getElementById('hud-schematic-drawer');

  let isActive = false;

  function updateHud(): void {
    if (domCountEl) domCountEl.textContent = document.querySelectorAll('*').length.toString();
    if (viewportEl) viewportEl.textContent = `${window.innerWidth}×${window.innerHeight}`;
  }

  function setInspectorState(active: boolean): void {
    isActive = active;
    body.classList.toggle('inspect-active', isActive);

    toggleButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', isActive.toString());
      btn.textContent = isActive ? '[ ✕ CLOSE ]' : '[ ⌘ INSPECT ]';
    });

    if (hud) hud.setAttribute('aria-hidden', (!isActive).toString());
    if (tooltip && !isActive) tooltip.style.display = 'none';

    if (!isActive && schematicDrawer) {
      schematicDrawer.classList.remove('is-open');
      schematicDrawer.setAttribute('aria-hidden', 'true');
      if (schematicBtn) schematicBtn.setAttribute('aria-expanded', 'false');
    }

    if (targetElemEl) {
      if (isActive) {
        const canHover = window.matchMedia('(hover: hover)').matches;
        targetElemEl.textContent = canHover ? '<HOVER ELEMENT>' : '<TAP ELEMENT>';
      } else {
        targetElemEl.textContent = '<NONE>';
      }
    }

    if (isActive) {
      updateHud();
    }
  }

  function toggleInspector(): void {
    setInspectorState(!isActive);
  }

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      toggleInspector();
    } else if (e.key === 'Escape' && isActive) {
      e.preventDefault();
      setInspectorState(false);
    }
  });

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      toggleInspector();
    });
  });

  if (hudCloseBtn) {
    hudCloseBtn.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      setInspectorState(false);
    });
  }

  if (schematicBtn && schematicDrawer) {
    schematicBtn.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      const isOpen = schematicDrawer.classList.toggle('is-open');
      schematicBtn.setAttribute('aria-expanded', isOpen.toString());
      schematicDrawer.setAttribute('aria-hidden', (!isOpen).toString());
    });
  }

  window.addEventListener('resize', () => {
    if (isActive) updateHud();
  });

  function showElementInspection(target: HTMLElement): void {
    if (!target || target === body || target === tooltip || target.closest('#inspector-hud') || target.closest('.inspect-trigger')) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const tag = target.tagName.toLowerCase();
    const classNames = typeof target.className === 'string'
      ? target.className.trim().split(/\s+/).filter(Boolean)
      : [];
    const classList = classNames.length > 0 ? '.' + classNames.slice(0, 2).join('.') : '';
    const label = `<${tag}${classList}> [${Math.round(rect.width)}×${Math.round(rect.height)}px]`;

    if (targetElemEl) {
      targetElemEl.textContent = label;
    }

    // Bounding-box tooltip is gated behind hover-capable pointer to prevent stuck tooltips on touch viewports
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (tooltip && canHover) {
      tooltip.textContent = label;
      tooltip.style.display = 'block';
      tooltip.style.left = `${Math.max(10, rect.left + window.scrollX)}px`;
      tooltip.style.top = `${Math.max(10, rect.top - 24 + window.scrollY)}px`;
    }
  }

  document.addEventListener('mouseover', (e: MouseEvent) => {
    if (!isActive || !(e.target instanceof HTMLElement)) return;
    showElementInspection(e.target);
  });

  // Capturing phase listener intercepts anchor clicks during diagnostic mode to inspect targets instead of triggering navigation
  document.addEventListener('click', (e: MouseEvent) => {
    if (!isActive || !(e.target instanceof HTMLElement)) return;
    const target = e.target;
    if (target.closest('#inspector-hud') || target.closest('.inspect-trigger')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    showElementInspection(target);
  }, true);
}
