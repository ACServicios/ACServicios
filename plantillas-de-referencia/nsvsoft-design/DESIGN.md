# nsvsoft DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 9
> Icon library: not detected · State: not detected
> Primary theme: dark · Dark mode toggle: no · Motion: expressive

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a cool tone. Depth is expressed through layered shadows and subtle surface color variation. Typography pairs **Inter** for display/headings with **Plus Jakarta Sans** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **5px base grid** (standard density), with scale: 5, 10, 15, 20, 25, 30, 35, 40px. The accent color **#3b82f6** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| bs-emphasis-color | `#000000` | background | Page background, darkest surface |
| surface | `#0f172a` | surface | Card and panel backgrounds |
| bs-emphasis-color | `#ffffff` | text-primary | Headings and body text |
| text-muted | `#94a3b8` | text-muted | Captions, placeholders, secondary info |
| bs-body-color | `#212529` | border | Dividers, card borders, outlines |
| accent-color | `#3b82f6` | accent | CTAs, links, focus rings, active states |
| bs-warning | `#ffc107` | accent | CTAs, links, focus rings, active states |
| bs-danger | `#dc3545` | danger | Error states, destructive actions |
| bs-success | `#198754` | success | Success states, positive indicators |
| warning | `#f59e0b` | warning | Warning states, caution indicators |
| theme-color | `#2563eb` | info | Informational highlights |
| bs-primary | `#0d6efd` | unknown | Palette color |
| primary-dark | `#020617` | unknown | Palette color |
| bs-secondary | `#6c757d` | unknown | Palette color |
| text-main | `#334155` | unknown | Palette color |
| bs-primary-text-emphasis | `#6ea8fe` | unknown | Palette color |
| primary-light | `#1e293b` | unknown | Palette color |
| unknown | `#10b981` | unknown | Palette color |
| bs-info | `#0dcaf0` | unknown | Palette color |
| danger-color | `#ef4444` | unknown | Palette color |

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


---

## 3. Typography Rules

**Font Stack:**
- **Plus Jakarta Sans** — Heading 1, Heading 2, Heading 3
- **Inter** — Body, Caption
- **Courier New** — Code

**Font Sources:**

```css
@font-face {
  font-family: "Inter";
  src: url("https://nsvsoft.net/assets/fonts/inter-v20-latin-regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter";
  src: url("https://nsvsoft.net/assets/fonts/inter-v20-latin-700.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("https://nsvsoft.net/assets/fonts/plus-jakarta-sans-v12-latin-regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("https://nsvsoft.net/assets/fonts/plus-jakarta-sans-v12-latin-700.woff2") format("woff2");
  font-weight: 700;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Plus Jakarta Sans | 5rem | 700 |
| Heading 2 | Plus Jakarta Sans | 4.5rem | 700 |
| Heading 3 | Plus Jakarta Sans | 4rem | 700 |
| Body | Inter | 0.75rem | 400 |
| Caption | Inter | 1rem | 400 |
| Code | Courier New | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **Plus Jakarta Sans** for body/UI text, **Inter** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Display (3)

**Card** — `html`
- Variants: `home`, `detail`, `glass`, `1`, `2`

**Badge** — `html`

**List** — `html`

### Data Input (2)

**Button** — `html`
- Variants: `sm`, `link`, `primary-glow`, `lg`, `outline-light`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Overlay (1)

**Modal** — `html`

### Media (1)

**Image** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 5px
- **Spacing scale:** 5, 10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 80
- **Border radius:** .25rem, .25em, .375rem, 1rem, 2em, inherit, 3px, 4px, 6px, 8px, 10px, 12px, 14px, 15px, 16px, 18px, 20px, 24px, 28px, 30px, 40px, 50px
- **Max content width:** 991px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 2.5-5px | Tight: related items within a group |
| 10px | Medium: between groups |
| 15-20px | Wide: between sections |
| 30px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `0 0 0 1px #fff,0 0 0 .25rem rgba(13,110,253,.25)`
- `inset 0 0 0 1px rgba(59,130,246,0.2)`
- `inset 0 0 0 1px rgba(96,165,250,0.25)`

### Raised — cards, buttons, interactive elements

- `0 0 0 .25rem rgba(13,110,253,.25)`
- `0 0 0 .25rem rgba(var(--bs-success-rgb),.25)`
- `0 0 0 .25rem rgba(var(--bs-danger-rgb),.25)`

### Floating — dropdowns, popovers, modals

- `0 4px 15px rgba(59,130,246,0.4)`
- `0 4px 20px rgba(0,0,0,0.05)`
- `0 4px 12px rgba(59,130,246,0.3)`

### Overlay — full-screen overlays, top-level dialogs

- `inset 0 0 0 9999px var(--bs-table-bg-state,var(--bs-table-bg-type,var(--bs-table-accent-bg)))`
- `0 8px 32px 0 rgba(31,38,135,0.05)`
- `0 8px 25px rgba(59,130,246,0.6)`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 10, 100, 1020, 1030, 1040, 1055, 9999`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes progress-bar-stripes`
- `@keyframes spinner-border`
- `@keyframes spinner-grow`
- `@keyframes placeholder-glow`
- `@keyframes placeholder-wave`
- `@keyframes fa-beat`
- `@keyframes fa-bounce`
- `@keyframes fa-fade`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#3b82f6` for interactive elements (buttons, links, focus rings)
- Use `#000000` as the primary page background
- Pair **Plus Jakarta Sans** (body) with **Inter** (display) — these are the only allowed fonts
- Follow the **5px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .25rem, .25em, .375rem, 1rem, 2em
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Plus Jakarta Sans and Inter and Courier New
- Don't use arbitrary spacing values — stick to multiples of 5px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| sm | 575.98px | css |
| sm | 576px | css |
| md | 767px | css |
| md | 767.98px | css |
| md | 768px | css |
| lg | 991px | css |
| lg | 991.98px | css |
| lg | 992px | css |
| xl | 1199.98px | css |
| xl | 1200px | css |
| 2xl | 1399.98px | css |
| 2xl | 1400px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #0f172a
Border: 1px solid #212529
Radius: 12px
Padding: 20px
Font: Plus Jakarta Sans
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #3b82f6, text white
Ghost: bg transparent, border #212529
Padding: 10px 20px
Radius: 12px
Hover: opacity 0.9 or lighter shade
Focus: ring with #3b82f6
```

### Build a Page Layout

```
Background: #000000
Max-width: 991px, centered
Grid: 5px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #0f172a
Label: #94a3b8 (muted, 12px, uppercase)
Value: #ffffff (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #000000
Input border: 1px solid #212529
Focus: border-color #3b82f6
Label: #94a3b8 12px
Spacing: 20px between fields
Radius: 12px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Plus Jakarta Sans, type scale from Section 3
4. Spacing: 5px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```
