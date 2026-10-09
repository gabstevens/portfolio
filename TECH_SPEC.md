# TECH_SPEC.md — Technical Architecture & Implementation Specification

---

## 1. Toolchain & Runtime Constraints

* **Build Tool**: Vite (latest stable).
* **Language**: Vanilla TypeScript (`strict: true`, target `ES2022`, module `ESNext`).
* **Styling**: SCSS (Dart Sass via Vite preprocessor).
* **Package Manager**: `npm` or `pnpm`.
* **Zero Runtime Dependencies**: No frontend UI frameworks (no React/Vue/Svelte), no CSS utility frameworks (no Tailwind), no external icon packages, no runtime animation libraries.
* **Target Output**: Static HTML, CSS, and JS compiled to `/dist` deployable to any static host or edge CDN.

---

## 2. Repository Directory Structure

```text
.
├── DESIGN_SYSTEM.md        # Visual tokens, typographic scale, negative constraints
├── CONTENT_SPEC.md         # Text content, project data, capability matrix
├── TECH_SPEC.md            # Technical architecture and subsystem contracts
├── index.html              # Full semantic HTML5 document (Option A: fully static)
├── package.json
├── tsconfig.json           # Strict TypeScript configuration
├── vite.config.ts          # Minimal Vite build configuration
└── src/
    ├── styles/
    │   ├── _tokens.scss    # CSS custom properties matching DESIGN_SYSTEM.md
    │   ├── _reset.scss     # Box-sizing reset, margin/padding 0, border-radius: 0
    │   ├── _typography.scss# Font imports, font stacks, and scale utility classes
    │   ├── _layout.scss    # Masthead, asymmetric grid, section spacing
    │   ├── _components.scss# Ledger rows, status bullets, keycaps, link underlines
    │   ├── _inspect.scss   # Visual overrides and HUD styling for .inspect-active
    │   └── main.scss       # Main SCSS entry importing all partials
    └── ts/
        ├── main.ts         # Application bootstrapper (subsystem orchestrator)
        ├── clock.ts        # Dual-clock (London / Local) and Unix epoch ticker
        ├── telemetry.ts    # Navigation timing, DOM node count, edge trace parser
        └── inspector.ts    # Cmd+I listener, wireframe HUD, bounding box tooltip
```

---

## 3. Semantic DOM Architecture (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gabriele Stefani — Front-End Engineer</title>
  <meta name="description" content="Front-End Engineer building web foundations, interactive systems, and thoughtful user experiences." />
  
  <!-- Font Preconnect & Stylesheets (Geist & Geist Mono) -->
  <link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
  <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
  <link href="[https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@400;500;600&display=swap](https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@400;500;600&display=swap)" rel="stylesheet">

  <link rel="stylesheet" href="/src/styles/main.scss" />
</head>
<body>
  <!-- RUNNING FOLIO MASTHEAD -->
  <header id="masthead" class="masthead">
    <div class="masthead__inner">
      <div class="masthead__identity">
        <span class="mono-label">GABRIELE STEFANI // 2026</span>
        <span class="mono-divider">//</span>
        <span class="mono-label">LONDON, UK</span>
      </div>

      <div class="masthead__telemetry mono-label">
        <span data-clock="local">LOCAL: --:--:--</span>
        <span class="bullet-sep">•</span>
        <span data-clock="london">LONDON: --:--:--</span>
        <span class="bullet-sep">•</span>
        <span data-clock="epoch">EPOCH: ----------</span>
        <span class="bullet-sep">•</span>
        <span data-telemetry="edge">EDGE: DETECTING</span>
      </div>

      <div class="masthead__status mono-label">
        <span class="status-indicator"></span>
        <span>AMAZON (<a href="[https://brandinnovationlab.amazon/](https://brandinnovationlab.amazon/)" target="_blank" rel="noopener noreferrer">BRAND INNOVATION LAB</a>) — OPEN TO COLLABORATION</span>
      </div>
    </div>
  </header>

  <!-- MAIN DOCUMENT CONTAINER -->
  <main id="main-content" class="container">
    <!-- HERO STATEMENT -->
    <section id="hero" class="hero-section">
      <h1 class="hero__headline">
        Front-End Engineer building web foundations, interactive systems, and thoughtful user experiences.
      </h1>
      <div class="hero__lead">
        <p>
          I work in engineering at Amazon <a href="[https://brandinnovationlab.amazon/](https://brandinnovationlab.amazon/)" target="_blank" rel="noopener noreferrer">Brand Innovation Lab</a>, building the foundational tools and architecture our teams use to deliver flagship interactive campaigns.
        </p>
        <p>
          My core competency is frontend systems, browser runtimes, and building software with a relentless focus on the user experience. Beyond the web, I consider myself a builder first: deeply curious about engineering across disciplines, whether that means prototyping physical devices, exploring new computing paradigms, or building tools from the ground up.
        </p>
        <p>
          Always open to good technical discussions, open-source work, and unexpected side ventures.
        </p>
      </div>
    </section>

    <!-- 01 // SELECTED ARTIFACTS -->
    <section id="artifacts" class="editorial-grid section-divider">
      <aside class="grid-gutter">
        <div class="sticky-marker mono-label">[01] // ARTIFACTS</div>
      </aside>
      <div class="grid-content">
        <article class="ledger-row" id="product-selector">
          <div class="ledger-row__header">
            <span class="mono-label">01 // PRODUCT SELECTOR // GUIDED COMMERCE ENGINE</span>
            <span class="mono-label text-muted">2024 – PRESENT</span>
          </div>
          <div class="ledger-row__meta mono-label text-muted">ROLE: FRONT-END ARCHITECTURE // AMAZON BRAND INNOVATION LAB</div>
          <div class="ledger-row__body">
            <div class="spec-row">
              <span class="spec-label mono-label">PROBLEM:</span>
              <span class="spec-value">Brand Stores lacked an interactive guided-selling mechanism for complex product catalogs. Advertisers needed a self-service, branching recommendation quiz that could run embedded inside third-party storefronts without custom engineering overhead.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">ARCHITECTURE:</span>
              <span class="spec-value">Built in React with a deterministic client-side recommendation engine and dynamic branching logic. Engineered to execute seamlessly across Amazon’s web, mobile, and in-app webview runtimes under strict bundle-size and latency budgets. Zero third-party dependencies, built entirely with human-authored client logic.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">OUTCOME:</span>
              <span class="spec-value">Adopted as one of Amazon Brand Stores' flagship interactive self-service widgets; deployed globally across high-traffic brand storefronts.</span>
            </div>
          </div>
          <div class="ledger-row__footer mono-label">
            <span class="text-muted">[ SYSTEM // PROPRIETARY ENTERPRISE SYSTEM ]</span>
          </div>
        </article>
      </div>
    </section>

    <!-- 02 // CAPABILITY DOMAINS -->
    <section id="capabilities" class="editorial-grid section-divider">
      <aside class="grid-gutter">
        <div class="sticky-marker mono-label">[02] // CAPABILITIES</div>
      </aside>
      <div class="grid-content">
        <article class="ledger-row">
          <div class="ledger-row__header">
            <span class="mono-label">01 // CLIENT ARCHITECTURE & FRONTEND</span>
          </div>
          <div class="ledger-row__body">
            <div class="spec-row">
              <span class="spec-label mono-label">FOCUS:</span>
              <span class="spec-value">Fast, accessible web applications and platform tooling with zero unnecessary bloat.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">CORE STACK:</span>
              <span class="spec-value">TypeScript, modern JavaScript, React, semantic HTML5, modular SCSS/CSS Grid.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">SPECIALTIES:</span>
              <span class="spec-value">DOM performance, state architecture, component libraries, web accessibility, bundle size budgeting, cross-browser quirks.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">APPROACH:</span>
              <span class="spec-value">User experience comes first. Measure latency, avoid runtime bloat, and keep interactions snappy.</span>
            </div>
          </div>
        </article>

        <article class="ledger-row">
          <div class="ledger-row__header">
            <span class="mono-label">02 // SYSTEMS & HARDWARE TINKERING</span>
          </div>
          <div class="ledger-row__body">
            <div class="spec-row">
              <span class="spec-label mono-label">FOCUS:</span>
              <span class="spec-value">Practical curiosity beyond browser tabs.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">ENVIRONMENTS:</span>
              <span class="spec-value">Linux environments, Docker containers, local networking, reverse proxies.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">HARDWARE:</span>
              <span class="spec-value">Microcontrollers (ESP32, Raspberry Pi), sensor telemetry, serial communication, and hardware prototyping.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">APPROACH:</span>
              <span class="spec-value">Understanding how the whole machine works—from protocols and operating system layers down to physical components.</span>
            </div>
          </div>
        </article>

        <article class="ledger-row">
          <div class="ledger-row__header">
            <span class="mono-label">03 // AI FLUENCY & MODERN WORKFLOW</span>
          </div>
          <div class="ledger-row__body">
            <div class="spec-row">
              <span class="spec-label mono-label">FOCUS:</span>
              <span class="spec-value">Pragmatic leverage without relying on unvetted generated code.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">WORKFLOWS:</span>
              <span class="spec-value">Agentic coding environments for fast scaffolding, automated test generation, and local models for private workflows.</span>
            </div>
            <div class="spec-row">
              <span class="spec-label mono-label">APPROACH:</span>
              <span class="spec-value">Use AI to cut through repetitive boilerplate, but keep architectural decisions, edge cases, and code quality strictly human-directed.</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 03 // DIRECT CHANNELS & COLOPHON -->
    <section id="channels" class="editorial-grid section-divider">
      <aside class="grid-gutter">
        <div class="sticky-marker mono-label">[03] // DIRECT CHANNELS</div>
      </aside>
      <div class="grid-content">
        <div class="channels-block">
          <ul class="channels-list mono-label">
            <li><a href="[https://github.com/your-username](https://github.com/your-username)" target="_blank" rel="noopener noreferrer">[ GITHUB ]</a></li>
            <li><a href="[https://linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)" target="_blank" rel="noopener noreferrer">[ LINKEDIN ]</a></li>
          </ul>
        </div>

        <div class="colophon-block section-divider-subtle">
          <div class="mono-label colophon-title">COLOPHON & ARCHITECTURAL PROVENANCE</div>
          <div class="colophon-specs mono-label">
            <div>TYPEFACES: GEIST (GROTESK) & GEIST MONO</div>
            <div>RUNTIME: ZERO-FRAMEWORK STATIC VITE + TS + SCSS</div>
            <div>HOSTING: STATIC EDGE DISTRIBUTION</div>
            <div>SOURCE: <a href="[https://github.com/your-username/portfolio](https://github.com/your-username/portfolio)" target="_blank" rel="noopener noreferrer">[ REPOSITORY ]</a></div>
            <div>DIAGNOSTICS: TOGGLE VIA <button type="button" class="inspect-trigger" id="inspect-button">[ ⌘ INSPECT ]</button> OR SHORTCUT CMD+I</div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- DIAGNOSTIC INSPECTOR HUD -->
  <aside id="inspector-hud" class="inspector-hud mono-label" aria-hidden="true">
    <div class="hud-header">
      <span>DIAGNOSTIC TELEMETRY</span>
      <span class="hud-tag">ACTIVE</span>
    </div>
    <div class="hud-metric"><span>DOM NODES:</span> <span id="hud-dom-count">0</span></div>
    <div class="hud-metric"><span>RENDER TIME:</span> <span id="hud-render-time">0ms</span></div>
    <div class="hud-metric"><span>VIEWPORT:</span> <span id="hud-viewport">0x0</span></div>
    <div class="hud-metric"><span>THEME:</span> <span>TECHNICAL SWISS</span></div>
  </aside>

  <!-- INSPECTOR HOVER TOOLTIP -->
  <div id="inspector-tooltip" class="inspector-tooltip mono-label" aria-hidden="true"></div>

  <script type="module" src="/src/ts/main.ts"></script>
</body>
</html>
```

---

## 4. Subsystem Implementation Contracts

### 4.1 Dual-Clock & Unix Epoch Engine (`src/ts/clock.ts`)

* **Interval**: Fixed 1000ms tick interval (`setInterval`). Avoid 60fps loops to conserve CPU and mobile battery.

```typescript
export function initClocks(): void {
  const localEl = document.querySelector<HTMLElement>('[data-clock="local"]');
  const londonEl = document.querySelector<HTMLElement>('[data-clock="london"]');
  const epochEl = document.querySelector<HTMLElement>('[data-clock="epoch"]');

  if (!localEl || !londonEl || !epochEl) return;

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
    localEl.textContent = `LOCAL: ${localFormatter.format(now)}`;
    londonEl.textContent = `LONDON: ${londonFormatter.format(now)}`;
    epochEl.textContent = `EPOCH: ${Math.floor(now.getTime() / 1000)}`;
  }

  tick();
  window.setInterval(tick, 1000);
}
```

---

### 4.2 Performance & Edge Telemetry Engine (`src/ts/telemetry.ts`)

* **Navigation Timing**: Read from `performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming`. Calculate `loadEventEnd - startTime` (falling back to `domContentLoadedEventEnd - startTime` if load is in flight).
* **Edge Detection**: Non-blocking `fetch('/cdn-cgi/trace')` with a 1.5-second `AbortController` timeout.

```typescript
export async function detectEdgeLocation(): Promise<string> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch('/cdn-cgi/trace', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) return 'EDGE';
    const text = await response.text();
    const match = text.match(/colo=([A-Z0-9]+)/);
    return match ? match[1] : 'EDGE';
  } catch {
    clearTimeout(timeoutId);
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'LOCAL'
      : 'EDGE';
  }
}

export function getPerformanceMetrics(): { renderTimeMs: number; domCount: number } {
  const navEntries = performance.getEntriesByType('navigation');
  let renderTimeMs = 0;

  if (navEntries.length > 0) {
    const nav = navEntries[0] as PerformanceNavigationTiming;
    renderTimeMs = Math.round(nav.loadEventEnd > 0 ? nav.loadEventEnd - nav.startTime : performance.now());
  } else {
    renderTimeMs = Math.round(performance.now());
  }

  const domCount = document.querySelectorAll('*').length;
  return { renderTimeMs, domCount };
}
```

---

### 4.3 Diagnostic Inspector Engine (`src/ts/inspector.ts`)

* **Activation**: Click `#inspect-button` or press `Cmd+I` / `Ctrl+I`.
* **State**: Toggles `body.inspect-active`. Shows wireframes, updates HUD metrics, and activates hover bounding-box tooltips.

```typescript
export function initInspector(): void {
  const body = document.body;
  const toggleBtn = document.getElementById('inspect-button');
  const hud = document.getElementById('inspector-hud');
  const tooltip = document.getElementById('inspector-tooltip');
  const domCountEl = document.getElementById('hud-dom-count');
  const renderTimeEl = document.getElementById('hud-render-time');
  const viewportEl = document.getElementById('hud-viewport');

  let isActive = false;

  function updateHud(): void {
    if (domCountEl) domCountEl.textContent = document.querySelectorAll('*').length.toString();
    if (viewportEl) viewportEl.textContent = `${window.innerWidth}×${window.innerHeight}`;
  }

  function toggleInspector(): void {
    isActive = !isActive;
    body.classList.toggle('inspect-active', isActive);

    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', isActive.toString());
      toggleBtn.textContent = isActive ? '[ ✕ CLOSE INSPECT ]' : '[ ⌘ INSPECT ]';
    }

    if (hud) hud.setAttribute('aria-hidden', (!isActive).toString());
    if (tooltip && !isActive) tooltip.style.display = 'none';

    if (isActive) {
      updateHud();
    }
  }

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      toggleInspector();
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleInspector);
  }

  window.addEventListener('resize', () => {
    if (isActive) updateHud();
  });

  document.addEventListener('mouseover', (e: MouseEvent) => {
    if (!isActive || !tooltip) return;
    const target = e.target as HTMLElement;
    if (!target || target === body || target === tooltip || target.closest('#inspector-hud')) return;

    const rect = target.getBoundingClientRect();
    const tag = target.tagName.toLowerCase();
    const classList = target.className && typeof target.className === 'string'
      ? '.' + target.className.trim().split(/\s+/).slice(0, 2).join('.')
      : '';

    tooltip.textContent = `<${tag}${classList}> [${Math.round(rect.width)}×${Math.round(rect.height)}px]`;
    tooltip.style.display = 'block';
    tooltip.style.left = `${Math.max(10, rect.left + window.scrollX)}px`;
    tooltip.style.top = `${Math.max(10, rect.top - 24 + window.scrollY)}px`;
  });
}
```

---

### 4.4 Application Orchestrator (`src/ts/main.ts`)

```typescript
import { initClocks } from './clock';
import { detectEdgeLocation, getPerformanceMetrics } from './telemetry';
import { initInspector } from './inspector';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Start live clocks & epoch counter
  initClocks();

  // 2. Initialize diagnostic inspector & keyboard shortcut
  initInspector();

  // 3. Resolve edge POP telemetry
  const edgeEl = document.querySelector<HTMLElement>('[data-telemetry="edge"]');
  const edge = await detectEdgeLocation();
  if (edgeEl) edgeEl.textContent = `EDGE: ${edge}`;

  // 4. Capture navigation performance timing
  window.addEventListener('load', () => {
    const { renderTimeMs } = getPerformanceMetrics();
    const hudRenderTime = document.getElementById('hud-render-time');
    if (hudRenderTime) hudRenderTime.textContent = `${renderTimeMs}ms`;
  });
});
```

---

## 5. SCSS Styling Architecture

### 5.1 Inspect Mode Styling Rules (`src/styles/_inspect.scss`)

Conforms strictly to `DESIGN_SYSTEM.md` negative constraints: zero box shadows, flat surfaces, and pure hairlines.

```scss
body.inspect-active {
  /* Wireframe every semantic container and section */
  main, header, footer, section, aside, article, div {
    outline: 1px dashed var(--accent-inspect) !important;
    outline-offset: -1px;
  }

  /* Structural columns display faint guidelines */
  .editorial-grid {
    background-image: linear-gradient(
      to right,
      rgba(56, 189, 248, 0.05) 1px,
      transparent 1px
    );
    background-size: 28% 100%;
  }

  /* Display the HUD */
  .inspector-hud {
    display: flex;
  }
}

.inspector-hud {
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 220px;
  background: var(--bg-surface);
  border: 1px solid var(--accent-inspect);
  padding: 0.75rem 1rem;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
  z-index: 9999;

  .hud-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: 0.25rem;
    margin-bottom: 0.25rem;
    color: var(--accent-inspect);
  }

  .hud-metric {
    display: flex;
    justify-content: space-between;
    color: var(--text-muted);

    span:last-child {
      color: var(--text-display);
    }
  }
}

.inspector-tooltip {
  display: none;
  position: absolute;
  background: var(--accent-inspect);
  color: #000;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 2px 6px;
  pointer-events: none;
  z-index: 10000;
  white-space: nowrap;
}
```

---

## 6. Performance Budgets & Quality Gates

* **Zero Layout Shift (CLS = 0)**: Preconnect Google Fonts with `font-display: swap` and matching fallback system fonts.
* **Bundle Budget**: Total uncompressed asset footprint:
  * HTML: < 15 KB
  * CSS: < 15 KB
  * JS: < 20 KB
  * Total transfer over wire: < 15 KB gzipped.
* **Execution Latency**: Time to Interactive (TTI) must complete in <= 50ms on median mobile devices.
* **Lighthouse Targets**: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.