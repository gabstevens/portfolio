# Technical Swiss Editorial Portfolio

> An information-first, zero-framework technical portfolio built with vanilla TypeScript, modular SCSS, and semantic HTML5. Designed as an industrial specification sheet and architectural drawing with extreme typographic tension, planar hairlines, and zero ornamental bloat.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-Dart_1.83-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Runtime Dependencies](https://img.shields.io/badge/Runtime_Dependencies-0-success?style=flat-square)](package.json)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=flat-square)](https://pagespeed.web.dev/)

---

## 1. Aesthetic Axioms & Design Philosophy

This interface rejects generic web trends, commercial marketing funnels, and decorative fluff. Every pixel, hairline rule, and glyph adheres to strict architectural contracts defined in [`DESIGN_SPEC.md`](DESIGN_SPEC.md):

* **Information-First Architecture**: Structured as an industrial monograph or engineering ledger. Visual hierarchy is established strictly via data density, layout vectors, and typographic scale.
* **Typographic Tension**: Extreme scale contrast pairing tightly spaced grotesque display typography (`Geist`, tracking `-0.035em`, line-height `1.05`) with micro-sized, tracked monospace telemetry (`Geist Mono`, tracking `0.04em`–`0.08em`).
* **Planar Structure & Hairlines**: Visual boundaries and depth are rendered purely via two-dimensional 1px hairlines (`rgba(255, 255, 255, 0.12)`). Simulated depth (drop shadows, skeuomorphism, glassmorphic blurs) is prohibited.
* **Strict Negative Constraints**:
  * **Zero `border-radius`**: `border-radius: 0 !important;` enforced globally. Rounded buttons, pills, cards, and avatars are prohibited.
  * **Zero `box-shadow`**: `box-shadow: none !important;` (the solitary exception is the active status indicator emerald glow).
  * **Zero Blur / Glassmorphism**: `backdrop-filter: blur()` is prohibited. Surfaces are strictly opaque or wireframe.
  * **Zero External Icon Sets**: No FontAwesome, Lucide, Feather, or Heroicons. Structural communication relies on semantic ASCII/Unicode punctuation (`//`, `—`, `•`, `[ ]`, `+`).
  * **Zero Third-Party UI Frameworks**: No Tailwind, Bootstrap, Radix, or component libraries.

---

## 2. Technical Architecture & Zero-Dependency Policy

The project enforces a strict **zero runtime dependencies** policy in [`package.json`](package.json). The build output compiles to static, pure HTML, CSS, and JavaScript deployable to any edge CDN.

```text
.
├── DESIGN_SPEC.md          # Visual tokens, typographic scale, negative constraints
├── CONTENT_SPEC.md         # Text content, project data, capability matrix
├── TECH_SPEC.md            # Technical architecture, DOM contracts, subsystem specifications
├── index.html              # Semantic HTML5 document with preload declarations
├── package.json            # Development toolchain (0 runtime dependencies)
├── tsconfig.json           # Strict TypeScript configuration (ES2022 / ESNext)
├── vite.config.ts          # Minimal Vite pipeline with post-build CSS inliner
└── src/
    ├── styles/
    │   ├── _tokens.scss     # CSS Custom Properties (:root design tokens)
    │   ├── _reset.scss      # Planar box-sizing reset, border-radius zeroing
    │   ├── _typography.scss # Self-hosted Geist font-face declarations & role scales
    │   ├── _layout.scss     # Running masthead, asymmetric editorial grid, hero section
    │   ├── _components.scss # Ledger rows, spec rows, action buttons, colophon plate
    │   ├── _inspect.scss    # Diagnostic mode wireframe overrides & telemetry HUD
    │   └── main.scss        # SCSS barrel entry
    └── ts/
        ├── main.ts          # Subsystem orchestrator & performance timing capture
        ├── clock.ts         # Dual London/Local clock & Unix epoch ticker
        ├── telemetry.ts     # Navigation timing engine & edge POP detector
        └── inspector.ts     # Diagnostic wireframe HUD, keyboard shortcut, element inspector
```

---

## 3. Subsystem Specifications

### 3.1 Dual-Clock & Unix Epoch Engine (`src/ts/clock.ts`)
* Evaluates real-time London origin time (`Europe/London`), visitor local time, and 10-digit Unix epoch timestamps.
* Driven by a fixed 1000ms `setInterval` loop instead of `requestAnimationFrame` to eliminate unnecessary 60fps wakeups and minimize mobile CPU battery consumption.
* `Intl.DateTimeFormat` formatters are instantiated statically in outer scope to prevent per-second ICU engine allocations.
* Automatically suppresses visitor local time when the client timezone coincides with London, preventing redundant temporal display.

### 3.2 Performance & Edge Telemetry Engine (`src/ts/telemetry.ts`)
* **Edge POP Detection**: Probes Cloudflare trace telemetry (`/cdn-cgi/trace`) with a strict 1500ms `AbortController` timeout to prevent network latency from blocking masthead state, falling back gracefully to loopback detection (`LOCAL`) or edge default (`EDGE`).
* **Navigation Timing**: Evaluates `PerformanceNavigationTiming` with tiered fallbacks (`loadEventEnd` → `domContentLoadedEventEnd` → `performance.now()`) to measure sub-millisecond document render durations.

### 3.3 Diagnostic Inspector Engine (`src/ts/inspector.ts`)
* Activated globally via `[ ⌘ INSPECT ]` trigger buttons or keyboard shortcut (`Cmd+I` / `Ctrl+I` / `Escape`).
* Toggles `body.inspect-active` to render 1px dashed wireframes (`--accent-inspect`) across all semantic containers and reveal underlying column grid vectors.
* Updates the fixed monospace HUD displaying live DOM node count, computed render time, active viewport resolution, and operator CAD overlay drawer.
* Employs an event-capturing pointer tracker displaying computed bounding-box dimensions (`<element.class [W×Hpx]>`), gated behind pointer hover capabilities to ensure zero touch artifacts.
* Synchronizes ARIA attributes (`aria-pressed`, `aria-hidden`) across all UI triggers.

### 3.4 Build Optimization: Inline CSS Delivery
* `vite.config.ts` includes an automated post-build transformer that inlines compiled CSS into a `<style>` block within `dist/index.html`.
* Eliminates an external render-blocking stylesheet roundtrip, guaranteeing instant First Contentful Paint (FCP).

---

## 4. Performance Budgets & Empirical Audits

| Metric | Target Budget | Observed Production Result |
| :--- | :--- | :--- |
| **Cumulative Layout Shift (CLS)** | `0.000` | **`0.000`** (Preloaded self-hosted variable webfonts, zero FOUT/FOIT) |
| **Time to Interactive (TTI)** | $\le 50\text{ms}$ | **`< 25ms`** on mobile runtimes |
| **HTML Footprint (inlined CSS)** | $< 35\text{ KB}$ | **$33.5\text{ KB}$** ($8.4\text{ KB}$ gzipped) |
| **JavaScript Bundle** | $< 10\text{ KB}$ | **$5.1\text{ KB}$** ($2.1\text{ KB}$ gzipped) |
| **Total Wire Transfer** | $< 15\text{ KB}$ | **$\sim 10.5\text{ KB}$** gzipped total |
| **Lighthouse Scores** | `100 / 100 / 100 / 100` | **100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO** |

---

## 5. Local Setup & Toolchain

### Prerequisites
* Node.js $\ge 18.0.0$
* npm $\ge 9.0.0$

### Installation
```bash
npm install
```

### Development Server
Starts the Vite local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Type Checking
Runs strict TypeScript compilation with zero code emission:
```bash
npm run typecheck
```

### Production Build
Executes TypeScript typechecking followed by static bundle generation to `dist/`:
```bash
npm run build
```

### Production Preview
Locally serves the compiled `dist/` production assets:
```bash
npm run preview
```

---

## 6. Colophon & Provenance

* **Design System**: Technical Swiss Editorial (`DESIGN_SPEC.md`)
* **Typography**: Geist (Grotesk) & Geist Mono (Rasmus Andersson / Vercel)
* **Author**: Gabriele Stefani ([@gabstevens](https://github.com/gabstevens))
* **License**: MIT
