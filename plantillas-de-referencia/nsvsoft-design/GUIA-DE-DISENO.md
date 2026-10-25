# Guía de diseño de nsvsoft

Esta guía describe cómo están construidos los componentes de la página de inicio de https://nsvsoft.net/ (verificada el 25 de octubre de 2026). Los valores de color, tipografía, espaciado y sombras están en `DESIGN.md`; aquí está el código de cada componente.

Resumen: página **clara** (`#f8fafc`) con un **hero oscuro** (`#020617`), azul `#3b82f6` como color de marca, paneles de **vidrio esmerilado** con radio 24px, botones en **píldora**, fuente **Inter** (y Plus Jakarta Sans solo en el titular grande) y **modo oscuro** opcional.

## Filosofía de diseño

- **Contraste hero / contenido**: la cabecera es oscura y cinematográfica (planos CAD de fondo) y el contenido es claro y aireado.
- **Vidrio esmerilado**: los bloques de contenido flotan sobre el fondo con transparencia y desenfoque, no con bordes duros.
- **Azul con brillo**: el azul de marca aparece con degradados y sombras de color, sobre todo en botones y elementos activos.
- **Formas suaves**: esquinas de 16–24px en tarjetas y 50px en botones; casi no hay esquinas rectas.
- **Movimiento discreto**: las secciones aparecen al hacer scroll, las tarjetas suben al pasar el cursor y algunos elementos destacados tienen un brillo pulsante.
- **Colores por producto**: cada módulo tiene su color (rojo alarma, azul rociadores, verde IBC), aplicado por variables CSS.

## Sistema de color

### Paleta principal

| Rol | Variable | Claro | Oscuro |
|------|-------|-----|-----|
| Fondo de página | `--bg-body` | `#f8fafc` | `#0f172a` |
| Fondo del hero | `--primary-dark` | `#020617` | `#020617` (fijo en `.hero`) |
| Texto principal | `--text-main` | `#334155` | `#f8fafc` |
| Texto atenuado | `--text-muted` | `#64748b` | `#cbd5e1` |
| Acento / marca | `--accent-color` | `#3b82f6` | `#3b82f6` |
| Acento claro | `--accent-glow` | `#60a5fa` | `#60a5fa` |
| Peligro / alarma | `--danger-color` | `#ef4444` | `#ef4444` |
| Vidrio (fondo) | `--glass-bg` | `rgba(255,255,255,0.75)` | `rgba(30,41,59,0.6)` |
| Vidrio (borde) | `--glass-border` | `rgba(255,255,255,0.5)` | `rgba(255,255,255,0.1)` |

### Colores de estado y de módulo

| Uso | Color |
|--------|-----|
| Éxito / módulo IBC / "FREE TOOL" | `#10b981` |
| Peligro / módulo Fire Alarm | `#ef4444` (insignia "New": `#dc3545`) |
| Azul de texto destacado (Bootstrap `text-primary`) | `#0d6efd`; en oscuro `#60a5fa` |

## Tipografía

- **Inter** para todo el sitio (cuerpo 16px/400, títulos de sección 32–48px/700, tarjetas 20–24px/700).
- **Plus Jakarta Sans 800** solo para `.hero-title` (64px, 40px en móvil) y `.navbar-brand`.

```css
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-body);
  color: var(--text-main);
  transition: background-color 0.3s, color 0.3s;
}
.hero-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 1.5rem;
}
@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
}
```

Título de sección con palabra destacada:

```html
<h6 class="text-primary fw-bold text-uppercase">Workflow</h6>
<h2 class="fw-bold">Fire Sprinkler System <span class="text-primary">Design</span> Simplified</h2>
```

Degradado de texto (alternativa al azul plano):

```css
.text-gradient {
  background: linear-gradient(135deg, #0f172a 0%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
body.dark-mode .text-gradient {
  background: linear-gradient(135deg, #fff 0%, var(--accent-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Espaciado y layout

- Contenedor `.container` de Bootstrap (máx. **1320px**).
- Secciones: `padding: 100px 0` (`60px 0` en ≤ 768px).
- Tarjetas: relleno 24–30px; separación entre tarjetas 24px (`g-4`).
- No hay cuadrícula de 5px: se usa la escala de Bootstrap (4, 8, 16, 24, 48px) y valores propios (10, 20, 30, 40, 60, 80, 100px).

```css
.section-padding { padding: 100px 0; }
@media (max-width: 768px) {
  .section-padding { padding: 60px 0; }
}
```

### Radios de borde

| Radio | Uso |
|---|---|
| 50px | Botones, menú, insignias, boletín |
| 30px | Visor de características |
| 24px | Paneles de vidrio y tarjetas |
| 16px | Cuadros de íconos |
| 12px | Pestañas verticales, paginación |

### Breakpoints

Bootstrap 5: `576px`, `768px`, `992px`, `1200px`, `1400px`. Ajustes propios en `max-width: 991px` (menú móvil), `768px` (tipografía y espaciado) y `767px`.

## Patrones de componentes

### Fondo con manchas de luz

```css
.ambient-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
  opacity: 0.4;
  animation: floatBlob 10s infinite alternate;
}
.blob-1 { top: -10%; right: -10%; width: 600px; height: 600px; background: rgba(59, 130, 246, 0.2); }
.blob-2 { bottom: 10%; left: -10%; width: 500px; height: 500px; background: rgba(239, 68, 68, 0.15); }
@keyframes floatBlob {
  0%   { transform: translate(0, 0); }
  100% { transform: translate(20px, 40px); }
}
```

### Barra de navegación

Transparente sobre el hero (texto blanco). Al hacer scroll se le agrega la clase `.scrolled` y pasa a blanca.

```css
.navbar {
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
  padding: 0.8rem 0;
}
.navbar-brand {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
  letter-spacing: -0.5px;
}
.navbar .nav-link {
  font-weight: 700;
  font-size: 1.05rem;
  margin: 0 10px;
  letter-spacing: -0.2px;
  border-radius: 50px;
  padding: 8px 18px;
  transition: 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.navbar .nav-link.active {
  background: rgba(59, 130, 246, 0.1);
  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.2);
}
.navbar .nav-link:hover,
.navbar .nav-link.active { color: var(--accent-color); }
.navbar.scrolled {
  background-color: #ffffff;
  backdrop-filter: blur(16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
body.dark-mode .navbar.scrolled { background-color: #0f172a; }
```

Contenido: logotipo · Home, Pricing, Software, Online Tools, Videos, Blog · botón de tema (luna/sol) · "Log In" · botón "Get Started".

### Botón principal

```css
.btn-primary-glow {
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color), #2563eb);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 28px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  transition: 0.3s;
}
.btn-primary-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
}
```

```html
<a href="#" class="btn-primary-glow">Get Started</a>
<a href="#" class="btn btn-outline-light btn-lg rounded-pill px-4">Watch Demo</a>
```

### Hero

```css
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  padding-top: 100px;
  background-color: #020617;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(2, 6, 23, 0.6), rgba(2, 6, 23, 0.6));
  z-index: 1;
}
.hero .container { position: relative; z-index: 2; }
.version-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 6px 16px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}
```

Estructura: insignia de versión ("New" en rojo + texto) → titular de dos líneas (la segunda en azul) → párrafo en `text-white-50` → botón principal + botón con contorno. A la derecha, una tarjeta promocional.

### Tarjeta promocional del hero

```css
.hero-promo-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 24px;
  transition: 0.3s;
  animation: breath-glow 4s infinite ease-in-out;
}
.hero-promo-card:hover {
  background: rgba(15, 23, 42, 0.8);
  animation-play-state: paused;
  transform: translateY(-5px);
  border-color: var(--accent-color);
}
@keyframes breath-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); border-color: rgba(59, 130, 246, 0.3); transform: scale(1); }
  50%      { box-shadow: 0 0 25px 5px rgba(59, 130, 246, 0.3); border-color: rgba(59, 130, 246, 0.8); transform: scale(1.02); }
}
```

### Panel de vidrio (base de casi todas las tarjetas)

```css
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
  border-radius: 24px;
}
```

La **barra de estadísticas** es un `.glass-panel` con margen negativo superior (`mt-n5`) que se monta sobre el borde inferior del hero, con cuatro columnas: valor azul en negrita + etiqueta gris en mayúsculas ("5x FASTER", "99 ACCURACY %"…).

### Tarjeta de paso (flujo de trabajo)

```css
.step-card { position: relative; padding: 30px; height: 100%; transition: 0.4s; }
.step-card:hover { transform: translateY(-10px); }
.step-number {
  font-size: 4rem;
  font-weight: 900;
  color: #f1f5f9;
  position: absolute;
  top: 10px;
  right: 20px;
  line-height: 1;
}
.step-icon {
  width: 60px;
  height: 60px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}
body.dark-mode .step-number { color: #1e293b; text-shadow: -1px -1px 0 #334155; }
```

```html
<div class="glass-panel step-card">
  <span class="step-number">01</span>
  <div class="step-icon"><i class="fa-solid fa-layer-group"></i></div>
  <h3 class="h5 fw-bold">Plan Preparation &amp; Clean-Ups</h3>
  <p class="text-muted small mb-0">Smart tools that automate repetitive drawing cleanup tasks.</p>
</div>
```

### Pestañas verticales con visor

```css
.nav-pills-custom .nav-link {
  color: var(--text-muted);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 12px;
  margin-bottom: 8px;
  padding: 20px 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-pills-custom .nav-link:hover { background: rgba(59, 130, 246, 0.05); }
.nav-pills-custom .nav-link.active {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
}
.feature-display {
  position: relative;
  height: 450px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.6), 0 20px 50px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.4);
}
.tab-pane.active { animation: smoothSlideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
@keyframes smoothSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

La lista de pestañas va a la izquierda (ícono + texto + flecha) y el visor a la derecha, con imagen y un texto sobre un velo blanco desenfocado en la mitad inferior.

### Tarjeta de producto (módulo)

```css
.module-card-home {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.4s ease;
}
.module-card-home::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--module-color);
}
.module-card-home:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 0 20px var(--module-bg) inset;
}
.module-icon-box {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  background: var(--module-bg);
  color: var(--module-color);
}
.module-btn,
.module-btn-solid {
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}
.module-btn { background: transparent; border: 1px solid var(--module-color); color: #111827; }
.module-btn-solid { background: var(--module-color); color: #fff; border: none; box-shadow: 0 5px 15px var(--module-bg); }
body.dark-mode .module-card-home { background: rgba(30, 41, 59, 0.9); border-color: rgba(255, 255, 255, 0.08); }
```

```html
<div class="module-card-home p-4" style="--module-color:#3b82f6; --module-bg:rgba(59,130,246,0.1)">
  <div class="module-icon-box"><i class="fa-solid fa-droplet"></i></div>
  <h3 class="h4 fw-bold">Fire Sprinkler Designer</h3>
  <p class="text-muted small">Accurate, fast, and productive tools for fire sprinkler safety analysis.</p>
  <a href="#" class="btn module-btn-solid w-100">Start free trial</a>
</div>
```

La tarjeta destacada lleva una cinta diagonal en la esquina ("AVAILABLE NOW") y la animación `subtle-card-glow` (sombra azul que pulsa cada 4s). Las demás muestran un recuadro punteado "Coming Soon".

### Carrusel de blog

```css
.blog-scroll-container { display: flex; gap: 24px; overflow-x: auto; padding: 30px 5px; scrollbar-width: none; }
.blog-card { min-width: 320px; max-width: 320px; border-radius: 24px; overflow: hidden; transition: 0.4s; }
.blog-card:hover { transform: translateY(-10px) scale(1.02); }
.blog-img-wrapper { height: 200px; overflow: hidden; }
.blog-card:hover .blog-img-wrapper img { transform: scale(1.1); }
.scroll-btn {
  width: 45px; height: 45px; border-radius: 50%;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.scroll-btn:hover { background: var(--accent-color); color: white; }
```

Cada tarjeta: imagen · categoría en azul y mayúsculas · título truncado a una línea · extracto · enlace "Read More →".

### Pie de página y boletín

```css
.modern-footer {
  background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
  padding: 80px 0 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.newsletter-box {
  background: white;
  padding: 6px;
  border-radius: 50px;
  border: 1px solid #e2e8f0;
  display: flex;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}
.footer-link { color: var(--text-muted); font-weight: 500; margin-bottom: 12px; transition: 0.2s; }
.footer-link:hover { color: var(--accent-color); padding-left: 5px; }
body.dark-mode footer { background: #020617; border-top: 1px solid #1e293b; }
```

Columnas: marca + descripción + boletín · Product · Resources · Contact (correo, ubicación, redes). Abajo: copyright y enlaces legales.

### Campo de formulario

```css
.form-control-bordered { border: 1px solid #cbd5e1; background-color: rgba(255, 255, 255, 0.8); }
.form-control-bordered:focus {
  background-color: #fff;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
```

## Estructura de página

Orden real de la página de inicio:

1. **Barra de navegación** fija.
2. **Hero** oscuro: insignia de versión, titular, texto, dos botones y tarjeta promocional.
3. **Barra de estadísticas** de vidrio montada sobre el borde del hero.
4. **"See the Designer in Action"**: comparador antes/después de planos.
5. **"Fire Sprinkler System Design Simplified"**: cinco tarjetas de pasos numeradas.
6. **"Powerful Features for Modern Engineers"**: pestañas verticales + visor.
7. **"Built for Real Fire Protection Workflows"**: texto a la izquierda y lista de beneficios con ícono de check a la derecha; luego una cuadrícula de 6 tarjetas de ventajas.
8. **"Why Teams Move Toward Automation"**: beneficios + lista de perfiles de usuario.
9. **"Get Started NOW"**: tres tarjetas de producto.
10. **"Engineering Insights"**: carrusel de blog.
11. **Pie de página**.

Cada sección (salvo el hero) tiene la clase `.reveal` y aparece al hacer scroll:

```css
.reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
.reveal.active { opacity: 1; transform: translateY(0); }
```

## Modo oscuro

Se activa con un botón en la barra (ícono de luna/sol), que agrega `dark-mode` a `body` y guarda la preferencia en `localStorage` (`theme = 'dark'`). Cambios principales:

- Fondo `#0f172a`, títulos `#f8fafc`, párrafos `#cbd5e1`, texto atenuado `#94a3b8`.
- Azul de texto destacado `#60a5fa` en lugar de `#0d6efd`.
- Vidrio `rgba(30, 41, 59, 0.6)` con borde `rgba(255, 255, 255, 0.1)`.
- Tarjetas de producto `rgba(30, 41, 59, 0.9)`; pie de página `#020617`.

## Antipatrones (nunca hacer)

- **Página entera oscura en modo claro**: solo el hero es oscuro.
- **Esquinas rectas o pequeñas** en tarjetas y botones.
- **Sombras negras fuertes** en modo claro.
- **Plus Jakarta Sans en texto normal**: solo va en titulares grandes y el logotipo.
- **Componentes sin versión oscura**: todo componente nuevo necesita su regla `body.dark-mode`.
- **Animaciones bruscas**: las entradas son suaves (0.6–0.8s) y los desplazamientos al pasar el cursor, pequeños (2–10px).

## Flujo de trabajo

1. **Lee** `DESIGN.md` para los valores (colores, tipografía, sombras).
2. **Parte de un patrón** de esta guía antes de crear un componente nuevo.
3. **Usa las variables CSS** (`--accent-color`, `--glass-bg`, etc.) en lugar de escribir colores fijos.
4. **Define el modo oscuro** de cada componente.
5. **Revisa en móvil** (≤ 768px): titular a 40px, secciones a 60px, menú colapsado.

## Especificación de marca

- **URL del sitio:** `https://nsvsoft.net/`
- **Color de marca:** `#3b82f6` (degradado a `#2563eb`)
- **Tipografía de marca:** Plus Jakarta Sans 800 (logotipo y titulares); Inter para el resto
- **Logotipo:** gota de agua/llama con "NSV" + "NSVSOFT"; versión clara sobre el hero y versión azul con la barra en blanco

## Referencia rápida

```
Fondo:          #f8fafc (hero #020617; oscuro #0f172a)
Vidrio:         rgba(255,255,255,0.75) + blur(16px)
Texto:          #334155 / #64748b
Acento:         #3b82f6 → #2563eb
Fuente:         Inter (titular: Plus Jakarta Sans 800)
Secciones:      100px (60px en móvil)
Radio:          24px tarjetas · 50px botones
Contenedor:     1320px
```
