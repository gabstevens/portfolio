# DESIGN_SPEC.md — Technical Swiss Editorial

---

## 1. Aesthetic Axioms & Design Philosophy

* **Information-First Architecture**: The page is treated as an industrial specification sheet, architectural drawing, or printed technical monograph. The interface is not a marketing funnel; it is a precision instrument.
* **Typographic Tension**: Visual hierarchy is established through extreme scale contrast—pairing large, tightly spaced grotesque display typography with micro-sized, tracked monospace metadata.
* **Planar Structure & Hairlines**: Layout structure and visual depth are established strictly via two-dimensional coordinates and 1px hairline rules. Simulated depth (drop shadows, elevation, skeuomorphism, glassmorphic blurs) is prohibited.
* **Zero Ornamental Bloat**: No decorative SVG background blobs, no floating cards, no gradient borders, no bouncy spring animations, and no arbitrary illustrations. Every pixel, line, and character must serve structural, informative, or navigational utility.

---

## 2. Design Tokens & Variables

All visual styling must consume these CSS Custom Properties defined at the `:root` level. Hardcoded hex values, ad-hoc spacing, or untokenized measurements are prohibited.

```scss
:root {
  /* Surfaces & Canvas */
  --bg-canvas:          #0c0e12;  /* Deep neutral charcoal canvas */
  --bg-surface:         #12151b;  /* Elevated panel / code background */
  --bg-hover:           rgba(255, 255, 255, 0.04);
  --bg-active:          rgba(255, 255, 255, 0.08);

  /* Hairlines & Structural Boundaries */
  --border-primary:     rgba(255, 255, 255, 0.12); /* Major section delineators */
  --border-subtle:      rgba(255, 255, 255, 0.06); /* Internal ledger dividers */
  --border-focus:       #f8fafc;                    /* Accessible focus ring */

  /* Ink / Typography */
  --text-display:       #f8fafc;  /* Maximum contrast (headlines, titles, primary text) */
  --text-body:          #cbd5e1;  /* High-legibility prose ink */
  --text-muted:         #7d8c9e;  /* Monospace metadata, labels, telemetry */
  --text-ghost:         #334155;  /* Inactive states, indices, table separators */

  /* Technical Accents (Restrained) */
  --accent-active:      #10b981;  /* Muted industrial emerald for active state / availability */
  --accent-inspect:     #38bdf8;  /* Technical cyan reserved strictly for Inspector Mode */
  --accent-warning:     #f59e0b;  /* Amber for system alerts or telemetry warnings */

  /* Font Families */
  --font-grotesk:       'Geist', 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:          'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;

  /* Spatial Scale & Container Boundaries */
  --max-width:          1140px;
  --gutter-desktop:     2rem;     /* 32px */
  --gutter-mobile:      1.25rem;  /* 20px */
  --hairline:           1px solid var(--border-primary);
  --hairline-subtle:    1px solid var(--border-subtle);
}
```

---

## 3. Typographic System & Modular Scale

Typography is partitioned strictly by structural role. Narrative and headline copy use `--font-grotesk`. Structural indices, metadata, telemetry, timestamps, technical specifications, and key combinations use `--font-mono`.

| Role / Token | Font Family | Size | Weight | Line Height | Tracking | Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Grotesk | `2.75rem` – `3.5rem` | 500 | `1.05` | `-0.035em` | None |
| **Section Title** | Grotesk | `1.25rem` – `1.5rem` | 500 | `1.2` | `-0.015em` | None |
| **Subhead / Lead**| Grotesk | `1.125rem` | 400 | `1.5` | `-0.005em` | None |
| **Body / Prose** | Grotesk | `0.9375rem` (15px) | 400 | `1.65` | `0` | None |
| **Section Index**| Monospace | `0.8125rem` (13px) | 500 | `1.0` | `0.06em` | Uppercase |
| **Folio / Masthead**| Monospace | `0.6875rem` (11px) | 400 | `1.0` | `0.08em` | Uppercase |
| **Telemetry / Data**| Monospace | `0.75rem` (12px) | 400 | `1.4` | `0.04em` | Uppercase |
| **Code / Inline Spec**| Monospace | `0.8125rem` (13px) | 400 | `1.4` | `0` | None |

### Typesetting Rules
1. **Leading Compression**: Never use default loose browser line-heights on display headers. Headings must sit tight (`1.05` to `1.2`) to retain graphic punch.
2. **Monospace Tracking**: All uppercase monospace labels, indices, and telemetry indicators must feature letter-spacing between `0.04em` and `0.08em`.
3. **Punctuation & Glyphs**: Structural separation uses typographic symbols (`//`, `—`, `•`, `[ ]`). Informal emojis or icon sets are prohibited.
4. **Widow & Wrap Control**: Narrative headers and leads must use `text-wrap: balance;`. Long body paragraphs must use `text-wrap: pretty;`.

---

## 4. Spatial Grid & Layout Architecture

### 4.1 Global Viewport Bounds
* The main content column is horizontally centered with a fixed maximum boundary of `--max-width` (1140px).
* Layout edges are bordered by vertical gutters: `--gutter-desktop` (32px) on desktop, `--gutter-mobile` (20px) on mobile.

### 4.2 The Running Folio (Masthead)
* Pinned flush to the top edge of the viewport.
* Encapsulated within a full-width container bounded by `border-bottom: var(--hairline)`.
* Structured as a 3-part flexible monospace bar:
  * **Start**: Document identifier, entity name, and cycle year.
  * **Center**: Real-time environmental and runtime telemetry.
  * **End**: Operational state indicator (`● ACTIVE` / `● AVAILABLE`).

### 4.3 The Asymmetrical Two-Column Editorial Grid
All primary content sections follow a disciplined two-column grid:
* **Desktop (`min-width: 840px`)**:
  * **Left Metadata Column (28% width / ~280px)**: Pinned/sticky structural indices (e.g., `[01] // CATALOG`), category stamps, and timestamps.
  * **Right Content Column (72% width)**: Primary narrative copy, technical ledgers, and interactive elements.
* **Mobile (`max-width: 839px`)**:
  * Collapses into a single vertical stream.
  * The metadata index sits above the content block, separated from it by `var(--hairline-subtle)`.

### 4.4 Section Boundaries
* Sections are separated strictly by horizontal hairlines: `border-top: var(--hairline)`.
* Never wrap entire sections in rounded cards, floating borders, or inset box shadows. Sections are divided purely by lines and whitespace.

---

## 5. UI Primitives & Component Patterns

### 5.1 Ledger Rows (The Spec Pattern)
Tabular or structured information must be rendered as clean ledger rows rather than cards:
* Enclosed by `border-bottom: var(--hairline-subtle)`.
* Employs an internal grid:
  * Left column: Monospace field name (e.g., `ARCHITECTURE:`, `METRIC:`).
  * Right column: Narrative text or data value.
* Hover state: Transitions background to `var(--bg-hover)`.

### 5.2 Status Indicator Dot
* Formatted as a 6px × 6px inline circular badge or typographical bullet (`●`).
* Color: `var(--accent-active)`.
* Glow: Allowed a subtle, non-distracting CSS box-shadow glow: `box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);`.

### 5.3 Monospace Keycaps & Badges
* Used for keyboard shortcuts and diagnostic tags (e.g., `[ ⌘ INSPECT ]`).
* Container:
  ```scss
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--border-primary);
  background: var(--bg-surface);
  color: var(--text-display);
  ```

### 5.4 Hyperlinks & Anchors
* Plain text with an offset hairline underline.
* Styling:
  ```scss
  a {
    color: var(--text-display);
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    text-decoration-color: var(--border-primary);
    transition: text-decoration-color 100ms linear;

    &:hover {
      text-decoration-color: var(--accent-active);
    }
  }
  ```

### 5.5 Action Buttons (High-Contrast Inversion)
* Default state: `background: transparent; border: 1px solid var(--border-primary); color: var(--text-display);`
* Hover state: `background: var(--text-display); border-color: var(--text-display); color: var(--bg-canvas);`
* Active state: `opacity: 0.9;`
* Focus state: `outline: 1px solid var(--border-focus); outline-offset: 2px;`

### 5.6 Diagnostic / Inspector Overlay Mode (`.inspect-active`)
When the global diagnostic mode is toggled via `body.inspect-active`:
* **Wireframe Outlines**: All structural containers, sections, and flex items receive:
  ```scss
  outline: 1px dashed var(--accent-inspect) !important;
  outline-offset: -1px;
  ```
* **Grid Guidelines**: Columns and section boundaries reveal their underlying layout vectors via faint cyan rules.
* **Telemetry HUD**: A fixed monospace panel positioned at the bottom right viewport displaying active DOM counts, render times, and viewport coordinates.
* **Element Inspector Tooltip**: Hovering over elements shows a micro-tag indicating element tag, computed dimensions, and class names (e.g., `<section.grid [1140×320px]>`).

---

## 6. Interaction Dynamics & Motion Rules

* **Duration Cap**: All UI state transitions must complete in $\le 120\text{ms}$.
* **Timing Functions**: Use strictly `linear` or `ease-out`. Bouncy spring physics, elastic curves, and playful easing curves are prohibited.
* **Transition Scope**: Transitions apply exclusively to color, background-color, border-color, and opacity.
* **Layout Shifts**: Layout-triggering properties (`width`, `height`, `padding`, `margin`) must never animate.

---

## 7. Strict Negative Constraints (Anti-Patterns — Reject on Sight)

1. **NO Border Radius**: `border-radius: 0 !important;` throughout the entire DOM. Rounded buttons, pills, cards, and avatars are prohibited.
2. **NO Box Shadows**: `box-shadow: none !important;` (exception: status indicator glow). Depth must be conveyed strictly by hairlines and structural alignment.
3. **NO Blur / Glassmorphism**: `backdrop-filter: blur()` is prohibited. Surfaces are either opaque or transparent wireframes.
4. **NO Generic Icon Libraries**: Do not import Lucide, FontAwesome, or Heroicons. Use typography, monospace symbols, and structural layout to convey meaning.
5. **NO Floating Card Containers**: Do not place content inside elevated boxes with drop shadows and rounded corners. Group content via hairline borders and asymmetric grid placement.
6. **NO External UI Frameworks**: Do not introduce Tailwind, Bootstrap, Radix, or external component suites. Rely strictly on semantic HTML5 and tokenized SCSS.