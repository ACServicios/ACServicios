# Guía de diseño de nsvsoft

Esta guía describe la interfaz de **nsvsoft**. Tema oscuro, paleta fría, tipografía sans-serif (Plus Jakarta Sans), densidad estándar sobre una cuadrícula de 5px y movimiento expresivo.

## Filosofía de diseño

- **Profundidad en capas** — usa los tokens de sombra para crear una sensación de superposición física. Cada nivel de elevación tiene una sombra específica.
- **Acentos con degradado** — los degradados se usan con criterio para dar énfasis, no como decoración.
- **Combinación tipográfica** — Plus Jakarta Sans para el texto de cuerpo/interfaz, Inter para encabezados/display. Nunca introduzcas una tercera tipografía.
- **Densidad estándar** — cuadrícula base de 5px. Cada dimensión es múltiplo de 5.
- **Paleta fría** — la temperatura de color es fría, en sintonía con la tipografía sans-serif.
- **Acento contenido** — `#3b82f6` es el único toque de color. Se usa exclusivamente para CTAs, enlaces, anillos de foco y estados activos.
- **Movimiento expresivo** — las animaciones son parte integral de la experiencia. Usa física de resortes (spring) y animaciones de layout.

## Sistema de color

### Paleta principal

| Rol | Token | Hex | Uso |
|------|-------|-----|-----|
| Fondo | `--background` | `#000000` | Fondo de la página/aplicación |
| Superficie | `--surface` | `#0f172a` | Tarjetas, paneles, modales |
| Texto principal | `--text-primary` | `#ffffff` | Encabezados, texto de cuerpo |
| Texto atenuado | `--text-muted` | `#94a3b8` | Leyendas, placeholders |
| Acento | `--accent` | `#3b82f6` | CTAs, enlaces, anillos de foco |
| Borde | `--border` | `#212529` | Divisores, bordes de tarjetas |

### Colores de estado

| Estado | Hex | Uso |
|--------|-----|-----|
| Éxito | `#198754` | Confirmaciones, tendencias positivas |
| Advertencia | `#f59e0b` | Estados de precaución, elementos pendientes |
| Peligro | `#dc3545` | Errores, acciones destructivas |

### Paleta extendida

- **theme-color:** `#2563eb`
- **bs-primary:** `#0d6efd`
- **primary-dark:** `#020617` — Capa de fondo profunda o color de sombra
- **bs-secondary:** `#6c757d` — Texto secundario, texto de placeholder
- **text-main:** `#334155`
- **bs-primary-text-emphasis:** `#6ea8fe`
- **primary-light:** `#1e293b`
- `#10b981`

### Tokens de variables CSS

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

## Tipografía

### Pila de fuentes

- **Plus Jakarta Sans** — Encabezado 1, Encabezado 2, Encabezado 3
- **Inter** — Cuerpo, Leyenda
- **Courier New** — Código

### Origen de las fuentes

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

### Escala tipográfica

| Rol | Familia | Tamaño | Peso |
|------|--------|------|--------|
| Encabezado 1 | Plus Jakarta Sans | 5rem | 700 |
| Encabezado 2 | Plus Jakarta Sans | 4.5rem | 700 |
| Encabezado 3 | Plus Jakarta Sans | 4rem | 700 |
| Cuerpo | Inter | 0.75rem | 400 |
| Leyenda | Inter | 1rem | 400 |
| Código | Courier New | 14px | 400 |

### Reglas tipográficas

- Cuerpo/interfaz: **Plus Jakarta Sans**, encabezados: **Inter** — son las únicas fuentes de display
- Máximo 3-4 tamaños de fuente por pantalla
- Encabezados: peso 600-700, cuerpo: peso 400
- Usa el color y la opacidad para la jerarquía del texto, no tamaños de fuente adicionales
- Interlineado: 1.5 para el cuerpo, 1.2 para los encabezados

## Espaciado y layout

### Cuadrícula base: 5px

Cada dimensión (margin, padding, gap, ancho, alto) debe ser múltiplo de **5px**.

### Escala de espaciado

`5, 10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 80` px

### El espaciado como significado

| Espaciado | Uso |
|---------|-----|
| 2.5-5px | Ajustado: elementos relacionados dentro de un grupo |
| 10px | Medio: entre grupos |
| 15-20px | Amplio: entre secciones |
| 30px+ | Muy amplio: cortes entre secciones principales |

### Radio de borde

Escala: `.25rem, .25em, .375rem, 1rem, 2em, inherit, 3px, 4px, 6px, 8px, 10px, 12px, 14px, 15px, 16px, 18px, 20px, 24px, 28px, 30px, 40px, 50px`
Predeterminado: `12px`

### Contenedor

Ancho máximo: `991px`, centrado con márgenes automáticos.

### Breakpoints

| Nombre | Valor |
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

Mobile-first: diseña para pantallas pequeñas y agrega encima los ajustes responsivos.

## Patrones de componentes

### Tarjeta

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

### Botón

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

### Campo de entrada

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

### Insignia / Chip

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

### Modal / Diálogo

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

### Tabla

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

### Navegación

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

### Componentes extraídos

Estos componentes se encontraron en el código fuente:

**Botón** (`html`)
- Variantes: `sm`, `link`, `primary-glow`, `lg`, `outline-light`

**Campo de entrada** (`html`)

**Tarjeta** (`html`)
- Variantes: `home`, `detail`, `glass`, `1`, `2`

**Navegación** (`html`)

**Insignia** (`html`)

**Modal** (`html`)

## Estructura de página

Se detectaron las siguientes secciones de página:

- **Navegación** — Barra de navegación superior (9 elementos)
- **Hero** — Sección hero/banner con titular y CTAs
- **Características** — Cuadrícula de tarjetas de características/beneficios (23 elementos)
- **Pie de página** — Pie de página con enlaces e información (17 elementos)
- **Preguntas frecuentes** — Sección de FAQ/acordeón
- **CTA** — Sección de llamado a la acción

Al construir páginas, sigue este orden y esta estructura de secciones.

## Animación y movimiento

Este proyecto usa **movimiento expresivo**. Las animaciones son parte del lenguaje de diseño.

### Animaciones CSS

- `progress-bar-stripes`
- `spinner-border`
- `spinner-grow`
- `placeholder-glow`
- `placeholder-wave`

### Tokens de movimiento

- **Escala de duración:** `0ms`, `100ms`, `150ms`, `200ms`, `250ms`, `300ms`, `350ms`, `400ms`, `500ms`, `600ms`, `800ms`, `1000ms`
- **Funciones de easing:** `ease-in-out`, `linear`, `ease`, `ease-out`, `cubic-bezier(0.5,0,0,1)`, `cubic-bezier(0.175,0.885,0.32,1.275)`, `cubic-bezier(0.2,0.8,0.2,1)`, `cubic-bezier(0.4,0,0.2,1)`, `cubic-bezier(0.25,0.8,0.25,1)`, `cubic-bezier(0.8,0,0.2,1)`, `cubic-bezier(0.16,1,0.3,1)`
- **Propiedades animadas:** `border-color`, `box-shadow`

### Pautas de movimiento

- **Duración:** usa valores de la escala de duración anterior. Cortos (0ms) para microinteracciones, largos (1000ms) para transiciones de página
- **Easing:** usa `ease-in-out` como curva de easing predeterminada
- **Dirección:** los elementos entran desde abajo/derecha y salen hacia arriba/izquierda
- **Movimiento reducido:** respeta siempre `prefers-reduced-motion` — desactiva las animaciones cuando esté activado

## Profundidad y elevación

### Tokens de sombra

- Sutil: `0 0 0 1px #fff,0 0 0 .25rem rgba(13,110,253,.25)`
- Sutil: `inset 0 0 0 1px rgba(59,130,246,0.2)`
- Sutil: `inset 0 0 0 1px rgba(96,165,250,0.25)`
- Sutil: `0 0 0 2px #ffffff`
- Sutil: `0 0 0 2px #0f172a`
- Elevada (tarjetas, botones): `0 0 0 .25rem rgba(13,110,253,.25)`

### Escala de z-index

`0, 1, 2, 3, 4, 5, 10, 100, 1020, 1030, 1040, 1055, 9999`

Usa exactamente estos valores — nunca inventes valores de z-index.

## Antipatrones (nunca hacer)

- **Sin filas cebra** — las tablas y listas usan bordes para separar
- **Sin colores inventados** — cada valor hex debe salir de la paleta anterior
- **Sin espaciado arbitrario** — cada dimensión es múltiplo de 5px
- **Sin fuentes adicionales** — solo se permiten Plus Jakarta Sans, Inter y Courier New
- **Sin border-radius arbitrario** — usa la escala: .25rem, .25em, .375rem, 1rem, 2em, 3px, 4px, 6px, 8px, 10px
- **Sin opacidad para estados deshabilitados** — usa colores atenuados en su lugar

## Flujo de trabajo

1. **Lee** `DESIGN.md` antes de escribir cualquier código de interfaz
2. **Elige los colores** de la sección Sistema de color — nunca inventes nuevos
3. **Define la tipografía** — solo Plus Jakarta Sans, Inter y Courier New, usando la escala tipográfica
4. **Construye el layout** sobre la cuadrícula de 5px — revisa cada margin, padding y gap
5. **Ajusta los componentes** a los patrones anteriores antes de crear nuevos
6. **Aplica la elevación** — usa los tokens de sombra
7. **Valida** — cada valor debe remitir a un token de diseño. Sin números mágicos.

## Especificación de marca

- **Favicon:** `/favicon.ico`
- **URL del sitio:** `https://nsvsoft.net/`
- **Color de marca:** `#3b82f6`
- **Tipografía de marca:** Plus Jakarta Sans

## Referencia rápida

```
Fondo:          #000000
Superficie:     #0f172a
Texto:          #ffffff / #94a3b8
Acento:         #3b82f6
Borde:          #212529
Fuente:         Plus Jakarta Sans
Espaciado:      5px grid
Radio:          12px
Componentes:    9 detectados
```

