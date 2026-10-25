# nsvsoft Design System

You are building UI for **nsvsoft**. Dark-themed, cool palette, sans-serif typography (Plus Jakarta Sans), standard density on a 5px grid, expressive motion.

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — Plus Jakarta Sans for body/UI text, Inter for headings/display. Never introduce a third typeface.
- **standard density** — 5px base grid. Every dimension is a multiple of 5.
- **cool palette** — the color temperature runs cool, matching the sans-serif typography.
- **Restrained accent** — `#3b82f6` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#000000` | Page/app background |
| Surface | `--surface` | `#0f172a` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#ffffff` | Headings, body text |
| Text Muted | `--text-muted` | `#94a3b8` | Captions, placeholders |
| Accent | `--accent` | `#3b82f6` | CTAs, links, focus rings |
| Border | `--border` | `#212529` | Dividers, card borders |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Success | `#198754` | Confirmations, positive trends |
| Warning | `#f59e0b` | Caution states, pending items |
| Danger | `#dc3545` | Errors, destructive actions |

### Extended Palette

- **theme-color:** `#2563eb`
- **bs-primary:** `#0d6efd`
- **primary-dark:** `#020617` — Deep background layer or shadow color
- **bs-secondary:** `#6c757d` — Secondary text, placeholder text
- **text-main:** `#334155`
- **bs-primary-text-emphasis:** `#6ea8fe`
- **primary-light:** `#1e293b`
- `#10b981`

### CSS Variable Tokens

```css
--bs-primary: #0d6efd;
--bs-secondary: #6c757d;
--bs-primary-rgb: 13,110,253;
--bs-secondary-rgb: 108,117,125;
--bs-primary-text-emphasis: #052c65;
--bs-secondary-text-emphasis: #2b2f32;
--bs-primary-bg-subtle: #cfe2ff;
--bs-secondary-bg-subtle: #e2e3e5;
--bs-primary-border-subtle: #9ec5fe;
--bs-secondary-border-subtle: #c4c8cb;
--bs-success-border-subtle: #a3cfbb;
--bs-info-border-subtle: #9eeaf9;
--bs-warning-border-subtle: #ffe69c;
--bs-danger-border-subtle: #f1aeb5;
--bs-light-border-subtle: #e9ecef;
--bs-dark-border-subtle: #adb5bd;
--bs-secondary-color: rgba(33,37,41,0.75);
--bs-secondary-color-rgb: 33,37,41;
--bs-secondary-bg: #e9ecef;
--bs-secondary-bg-rgb: 233,236,239;
```

## Typography

### Font Stack

- **Plus Jakarta Sans** — Heading 1, Heading 2, Heading 3
- **Inter** — Body, Caption
- **Courier New** — Code

### Font Sources

```css
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("fonts/PlusJakartaSans-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("fonts/PlusJakartaSans-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | Plus Jakarta Sans | 5rem | 700 |
| Heading 2 | Plus Jakarta Sans | 4.5rem | 700 |
| Heading 3 | Plus Jakarta Sans | 4rem | 700 |
| Body | Inter | 0.75rem | 400 |
| Caption | Inter | 1rem | 400 |
| Code | Courier New | 14px | 400 |

### Typography Rules

- Body/UI: **Plus Jakarta Sans**, Headings: **Inter** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 5px

Every dimension (margin, padding, gap, width, height) must be a multiple of **5px**.

### Spacing Scale

`5, 10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 80` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 2.5-5px | Tight: related items within a group |
| 10px | Medium: between groups |
| 15-20px | Wide: between sections |
| 30px+ | Vast: major section breaks |

### Border Radius

Scale: `.25rem, .25em, .375rem, 1rem, 2em, inherit, 3px, 4px, 6px, 8px, 10px, 12px, 14px, 15px, 16px, 18px, 20px, 24px, 28px, 30px, 40px, 50px`
Default: `12px`

### Container

Max-width: `991px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| sm | 575.98px |
| sm | 576px |
| md | 767px |
| md | 767.98px |
| md | 768px |
| lg | 991px |
| lg | 991.98px |
| lg | 992px |
| xl | 1199.98px |
| xl | 1200px |
| 2xl | 1399.98px |
| 2xl | 1400px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #0f172a;
  border: 1px solid #212529;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 0 .25rem rgba(13,110,253,.25);
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #3b82f6;
  color: #ffffff;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #212529;
  color: #ffffff;
  border-radius: 12px;
  padding: 10px 20px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #000000;
  border: 1px solid #212529;
  border-radius: 12px;
  padding: 10px 15px;
  color: #ffffff;
  font-size: 14px;
}
.input:focus { border-color: #3b82f6; outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #0f172a;
  color: #94a3b8;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #0f172a;
  border: 1px solid #212529;
  border-radius: 50px;
  padding: 30px;
  max-width: 480px;
  width: 90vw;
  box-shadow: 0 4px 15px rgba(59,130,246,0.4);
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 12px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #212529;
}
.table td {
  padding: 15px;
  border-bottom: 1px solid #212529;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border-bottom: 1px solid #212529;
}
.nav-link {
  color: #94a3b8;
  padding: 10px 15px;
  border-radius: 12px;
  transition: color 150ms;
}
.nav-link:hover { color: #ffffff; }
.nav-link.active { color: #3b82f6; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Button** (`html`)
- Variants: `sm`, `link`, `primary-glow`, `lg`, `outline-light`

**Input** (`html`)

**Card** (`html`)
- Variants: `home`, `detail`, `glass`, `1`, `2`

**Navigation** (`html`)

**Badge** (`html`)

**Modal** (`html`)

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (9 items)
- **Hero** — Hero/banner section with headline and CTAs
- **Features** — Feature/benefit cards grid (23 items)
- **Footer** — Page footer with links and info (17 items)
- **Faq** — FAQ/accordion section
- **Cta** — Call-to-action section

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `progress-bar-stripes`
- `spinner-border`
- `spinner-grow`
- `placeholder-glow`
- `placeholder-wave`

### Motion Tokens

- **Duration scale:** `0ms`, `100ms`, `150ms`, `200ms`, `250ms`, `300ms`, `350ms`, `400ms`, `500ms`, `600ms`, `800ms`, `1000ms`
- **Easing functions:** `ease-in-out`, `linear`, `ease`, `ease-out`, `cubic-bezier(0.5,0,0,1)`, `cubic-bezier(0.175,0.885,0.32,1.275)`, `cubic-bezier(0.2,0.8,0.2,1)`, `cubic-bezier(0.4,0,0.2,1)`, `cubic-bezier(0.25,0.8,0.25,1)`, `cubic-bezier(0.8,0,0.2,1)`, `cubic-bezier(0.16,1,0.3,1)`
- **Animated properties:** `border-color`, `box-shadow`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (0ms) for micro-interactions, long (1000ms) for page transitions
- **Easing:** Use `ease-in-out` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Subtle: `0 0 0 1px #fff,0 0 0 .25rem rgba(13,110,253,.25)`
- Subtle: `inset 0 0 0 1px rgba(59,130,246,0.2)`
- Subtle: `inset 0 0 0 1px rgba(96,165,250,0.25)`
- Subtle: `0 0 0 2px #ffffff`
- Subtle: `0 0 0 2px #0f172a`
- Raised (cards, buttons): `0 0 0 .25rem rgba(13,110,253,.25)`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 10, 100, 1020, 1030, 1040, 1055, 9999`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 5px
- **No extra fonts** — only Plus Jakarta Sans and Inter and Courier New are allowed
- **No arbitrary border-radius** — use the scale: .25rem, .25em, .375rem, 1rem, 2em, 3px, 4px, 6px, 8px, 10px
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Plus Jakarta Sans, Inter, Courier New only, using the type scale
4. **Build layout** on the 5px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.ico`
- **Site URL:** `https://nsvsoft.net/`
- **Brand color:** `#3b82f6`
- **Brand typeface:** Plus Jakarta Sans

## Quick Reference

```
Background:     #000000
Surface:        #0f172a
Text:           #ffffff / #94a3b8
Accent:         #3b82f6
Border:         #212529
Font:           Plus Jakarta Sans
Spacing:        5px grid
Radius:         12px
Components:     9 detected
```

