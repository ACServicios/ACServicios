# Sistema de diseño de nsvsoft

> Referencia del sitio https://nsvsoft.net/ (página de inicio), verificada el 25 de octubre de 2026 con el CSS del sitio (`style.css`, `home.css`) y con los estilos calculados en el navegador.
> Base técnica: Bootstrap 5 + Font Awesome, con estilos propios encima.
> Tema: **claro por defecto**, con cabecera (hero) oscura. Tiene **modo oscuro** que el usuario activa con un botón (clase `body.dark-mode`).
> Capturas de referencia en `capturas/` (escritorio 1440px y móvil 390px, modo claro y oscuro).

---

## 1. Tema visual y atmósfera

Software de ingeniería contra incendios con estética moderna tipo "SaaS". La página arranca con un **hero oscuro a pantalla casi completa** (`#020617`, con un video o imagen de planos CAD detrás y un velo oscuro), titular grande en blanco y la segunda línea en azul. Debajo, el resto de la página es **clara** (`#f8fafc`) con paneles de **efecto vidrio** (fondo blanco translúcido + desenfoque), esquinas muy redondeadas (24px) y sombras suaves.

Rasgos que la definen:
- **Azul como color de marca**, usado en botones con degradado y brillo, enlaces, etiquetas de sección y palabras destacadas de los títulos.
- **Vidrio esmerilado** (`backdrop-filter: blur(16px)`) en paneles, tarjetas y barra de estadísticas.
- **Manchas de luz difusas** fijas en el fondo (una azul arriba a la derecha, una roja abajo a la izquierda) que flotan lentamente.
- **Botones en forma de píldora** (radio 50px).
- **Aparición al hacer scroll**: cada sección sube 30px y aparece con un fundido.

---

## 2. Paleta de colores y roles

### Variables propias del sitio (`:root`)

| Variable | Modo claro | Modo oscuro | Uso |
|---|---|---|---|
| `--bg-body` | `#f8fafc` | `#0f172a` | Fondo de la página |
| `--text-main` | `#334155` | `#f8fafc` | Texto principal y títulos |
| `--text-muted` | `#64748b` | `#cbd5e1` | Texto secundario, enlaces del pie |
| `--primary-dark` | `#020617` | `#ffffff` | Fondo del hero; color "oscuro" de marca |
| `--primary-light` | `#1e293b` | — | Títulos dentro de artículos |
| `--accent-color` | `#3b82f6` | `#3b82f6` | Color de marca: botones, enlaces, foco, estado activo |
| `--accent-glow` | `#60a5fa` | `#60a5fa` | Azul claro: hover de enlaces, degradados en modo oscuro |
| `--danger-color` | `#ef4444` | `#ef4444` | Rojo: alarmas, módulo "Fire Alarm", mancha de fondo |
| `--glass-bg` | `rgba(255,255,255,0.75)` | `rgba(30,41,59,0.6)` | Fondo de paneles de vidrio |
| `--glass-border` | `rgba(255,255,255,0.5)` | `rgba(255,255,255,0.1)` | Borde de paneles de vidrio |
| `--glass-blur` | `blur(16px)` | `blur(16px)` | Desenfoque de los paneles de vidrio |
| `--transition-speed` | `0.3s` | `0.3s` | Duración estándar de transiciones |

### Otros colores que se usan de verdad

| Color | Uso en el sitio |
|---|---|
| `#2563eb` | Segundo tono del degradado de los botones principales |
| `#0d6efd` | Azul de Bootstrap (`text-primary`): la palabra destacada del titular ("Without Limits."), etiquetas de sección, contadores y enlaces "Read More". En modo oscuro se reemplaza por `#60a5fa` |
| `#10b981` | Verde: módulo "IBC Architect", etiqueta "FREE TOOL", marcas de éxito |
| `#dc3545` | Rojo de Bootstrap: insignia "New" |
| `#212529` | Texto oscuro de Bootstrap en algunas tarjetas |
| `#111827` | Texto de precios en tarjetas de módulos |
| `#f1f5f9` | Números grandes decorativos (01, 02…) detrás de las tarjetas de pasos |
| `#cbd5e1` | Borde de campos de formulario |
| `#e2e8f0` | Final del degradado del pie de página; borde del boletín |

### Colores por módulo (producto)

Cada tarjeta de producto define `--module-color` y `--module-bg`:

| Módulo | `--module-color` | `--module-bg` |
|---|---|---|
| Fire Alarm Designer | `#ef4444` | `rgba(239, 68, 68, 0.1)` |
| Fire Sprinkler Designer | `#3b82f6` | `rgba(59, 130, 246, 0.1)` |
| IBC Architect | `#10b981` | `rgba(16, 185, 129, 0.1)` |

### Variables CSS para copiar

```css
:root {
  --primary-dark: #020617;
  --primary-light: #1e293b;
  --accent-color: #3b82f6;
  --accent-glow: #60a5fa;
  --danger-color: #ef4444;
  --text-main: #334155;
  --text-muted: #64748b;
  --bg-body: #f8fafc;
  --glass-bg: rgba(255, 255, 255, 0.75);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-blur: blur(16px);
  --transition-speed: 0.3s;
}
body.dark-mode {
  --primary-dark: #ffffff;
  --bg-body: #0f172a;
  --text-main: #f8fafc;
  --text-muted: #cbd5e1;
  --glass-bg: rgba(30, 41, 59, 0.6);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

---

## 3. Reglas tipográficas

**Fuentes:**
- **Inter**: toda la interfaz (cuerpo, títulos h2/h3, menú, botones, formularios). Es la fuente de `body`.
- **Plus Jakarta Sans**: solo el **titular del hero** (`.hero-title`) y el **logotipo de texto** (`.navbar-brand`), en peso 800.

El sitio sirve las fuentes en formato woff2 desde `/assets/fonts/`. En esta carpeta están las versiones TTF en `fonts/`:

```css
@font-face { font-family: "Inter"; src: url("fonts/Inter-Regular.ttf") format("truetype"); font-weight: 400; }
@font-face { font-family: "Inter"; src: url("fonts/Inter-Medium.ttf") format("truetype"); font-weight: 500; }
@font-face { font-family: "Inter"; src: url("fonts/Inter-SemiBold.ttf") format("truetype"); font-weight: 600; }
@font-face { font-family: "Inter"; src: url("fonts/Inter-Bold.ttf") format("truetype"); font-weight: 700; }
@font-face { font-family: "Inter"; src: url("fonts/Inter-Black.ttf") format("truetype"); font-weight: 900; }
@font-face { font-family: "Plus Jakarta Sans"; src: url("fonts/PlusJakartaSans-ExtraBold.ttf") format("truetype"); font-weight: 800; }
```

**Escala (medida en escritorio, 1440px de ancho):**

| Elemento | Fuente | Tamaño | Peso | Interlineado |
|---|---|---|---|---|
| Titular del hero (h1) | Plus Jakarta Sans | 64px (4rem); 40px en móvil | 800 | 1.1 |
| Logotipo de texto | Plus Jakarta Sans | 28.8px (1.8rem) | 800 | — (letter-spacing -0.5px) |
| Título de sección (h2) | Inter | 32–48px | 700 | 1.2 |
| Subtítulo (h3) / título de tarjeta | Inter | 20–24px | 700 | 1.2 |
| Número decorativo de paso | Inter | 64px | 900 | 1 |
| Enlaces del menú | Inter | 16.8px (1.05rem) | 700 | letter-spacing -0.2px |
| Texto de cuerpo | Inter | 16px | 400 | 1.5 (24px) |
| Texto introductorio de sección | Inter | 17.6px (1.1rem) | 400 | 1.5 |
| Texto de tarjetas (`small`) | Inter | 14px | 400 | 1.5 |
| Etiqueta de sección (ej. "WORKFLOW") | Inter | 16px | 700, mayúsculas | — |
| Insignias | Inter | 12px | 700 | — |
| Texto de artículos del blog | Inter | 17.6px (1.1rem) | 400 | 1.8 |

**Reglas:**
- Plus Jakarta Sans es solo para el titular del hero y el logotipo; todo lo demás va en Inter.
- Los títulos de sección suelen resaltar una o dos palabras en azul (`text-primary`) o con degradado de texto (`.text-gradient`).
- El texto secundario se atenúa con color (`--text-muted`, `text-white-50`, `opacity-75`), no con tamaños extra.

---

## 4. Estilos de componentes

Resumen; el detalle con código está en `GUIA-DE-DISENO.md`.

| Componente | Clase en el sitio | Rasgos clave |
|---|---|---|
| Barra de navegación | `.navbar.fixed-top` | Transparente sobre el hero; al hacer scroll pasa a blanca (`#ffffff`, o `#0f172a` en oscuro) con sombra `0 4px 20px rgba(0,0,0,0.05)` |
| Enlace del menú activo | `.navbar .nav-link.active` | Píldora: fondo `rgba(59,130,246,0.1)`, borde interior azul, radio 50px, relleno 8px 18px |
| Botón principal | `.btn-primary-glow` | Degradado 135° `#3b82f6`→`#2563eb`, píldora, sombra azul; sube 2px al pasar el cursor |
| Botón secundario (hero) | `.btn-outline-light.rounded-pill` | Borde blanco de 1px, fondo transparente, píldora |
| Insignia de versión | `.version-badge` | Píldora translúcida blanca con desenfoque |
| Tarjeta promocional del hero | `.hero-promo-card` | Vidrio oscuro, borde azul, animación de brillo "respirando" |
| Panel de vidrio | `.glass-panel` | `--glass-bg` + `blur(16px)`, radio 24px |
| Barra de estadísticas | `.glass-panel` sobre el borde del hero | Cuatro contadores azules con etiqueta gris en mayúsculas |
| Tarjeta de paso | `.step-card` | Ícono en cuadro azul claro de 60px, número gigante decorativo detrás |
| Pestañas verticales | `.nav-pills-custom` | La activa con borde azul y sombra azul suave |
| Visor de características | `.feature-display` | Imagen con radio 30px y texto sobre un velo desenfocado |
| Comparador antes/después | `.image-slider-container` | Relación 16:9, radio 24px, fondo negro |
| Tarjeta de producto | `.module-card-home` | Franja superior de 4px del color del módulo, radio 24px |
| Tarjeta de blog | `.blog-card.glass-panel` | 320px de ancho, imagen de 200px, carrusel horizontal |
| Pie de página | `.modern-footer` | Degradado `#f8fafc`→`#e2e8f0`, boletín en píldora |

---

## 5. Principios de diseño (espaciado y layout)

- **No hay una cuadrícula de 5px.** El sitio usa la escala de Bootstrap (4, 8, 16, 24, 48px) más valores propios: 10, 20, 24, 28, 30, 40, 60, 80 y 100px.
- **Separación entre secciones:** 100px arriba y abajo (`.section-padding`); 60px en pantallas de 768px o menos.
- **Relleno de tarjetas:** 24–30px (48px en las tarjetas de producto en pantallas grandes).
- **Contenedor:** `.container` de Bootstrap, hasta **1320px** de ancho en pantallas grandes.
- **Hero:** alto mínimo de 90vh, contenido centrado verticalmente.
- **Separación entre tarjetas:** la de Bootstrap (`g-4`, 24px).

**Radios de borde que se usan:**

| Radio | Dónde |
|---|---|
| 50px | Botones, enlaces del menú, insignias, boletín (píldora) |
| 30px | Visor de características |
| 24px | Paneles de vidrio, tarjetas de producto y blog, comparador |
| 20px | Tarjetas de artículos (página del blog) |
| 16px | Cuadros de íconos, tarjetas de pasos |
| 12px | Pestañas verticales, botones de paginación |
| 50% | Botones redondos (flechas del carrusel), manchas de fondo |

---

## 6. Profundidad y elevación

| Nivel | Sombra | Dónde |
|---|---|---|
| Vidrio | `0 8px 32px 0 rgba(31, 38, 135, 0.05)` | Paneles de vidrio |
| Tarjeta | `0 10px 30px rgba(0, 0, 0, 0.03)` | Tarjetas de producto |
| Barra al hacer scroll | `0 4px 20px rgba(0, 0, 0, 0.05)` | Barra de navegación |
| Botón principal | `0 4px 15px rgba(59, 130, 246, 0.4)` | Reposo |
| Botón principal (hover) | `0 8px 25px rgba(59, 130, 246, 0.6)` | Al pasar el cursor |
| Pestaña activa | `0 4px 15px rgba(59, 130, 246, 0.15)` | Pestañas verticales |
| Tarjeta al pasar el cursor | `0 20px 40px rgba(0, 0, 0, 0.08)` | Tarjetas de producto y artículos |
| Visor de video o imagen | `0 25px 60px -10px rgba(0, 0, 0, 0.6)` | Comparador, video de demostración |

En **modo oscuro** las sombras negras se intensifican (por ejemplo `rgba(0,0,0,0.3)` en lugar de `0.05`) y los bordes pasan a `rgba(255,255,255,0.1)`.

**Capas (z-index):** barra de navegación 1030 (Bootstrap), cinta "Available now" 10, contenido del hero 2, velo del hero 1, manchas de fondo -1.

---

## 7. Animación y movimiento

Movimiento **moderado y suave**: aparición al hacer scroll, tarjetas que suben al pasar el cursor y algunos brillos en bucle. No usa física de resortes.

**Animaciones propias (`@keyframes`):**

| Nombre | Efecto | Duración |
|---|---|---|
| `floatBlob` | Las manchas de fondo se desplazan 20px/40px | 10s, infinita, ida y vuelta |
| `breath-glow` | La tarjeta promocional del hero "respira": brillo azul y escala 1→1.02 | 4s, infinita |
| `ambient-pulse` | Resplandor azul detrás del video pulsa en opacidad y escala | 6s, infinita |
| `subtle-card-glow` | La tarjeta de producto destacada pulsa su sombra azul | 4s, infinita |
| `smoothSlideUp` | El contenido de una pestaña entra subiendo 20px con fundido | 0.6s |
| `dropFade` | Menús desplegables entran subiendo 10px con escala 0.95→1 | — |

Las demás (`spinner-*`, `placeholder-*`, `fa-*`) vienen de Bootstrap y Font Awesome; no son parte del estilo propio.

**Transiciones:**
- Aparición por scroll (`.reveal` → `.reveal.active`): `all 0.8s cubic-bezier(0.5, 0, 0, 1)`, desde `translateY(30px)` y opacidad 0.
- Botones y enlaces: `0.3s`; menú: `0.3s cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Tarjetas al pasar el cursor: `0.3–0.4s`, suben 8–10px (`translateY(-10px)`); las de blog además escalan a 1.02.
- Imágenes al pasar el cursor: zoom a 1.08–1.1 en `0.5–0.6s`.
- Cambio claro/oscuro: `background-color 0.3s, color 0.3s` en `body`.

---

## 8. Qué hacer y qué no hacer

### Qué hacer

- Usar `#3b82f6` (y el degradado hacia `#2563eb`) para acciones principales y elementos activos.
- Usar fondo claro `#f8fafc` en el cuerpo de la página y reservar el oscuro `#020617` para el hero.
- Usar Inter en todo y Plus Jakarta Sans 800 solo en el titular grande y el logotipo.
- Usar paneles de vidrio (fondo translúcido + `blur(16px)` + radio 24px) para agrupar contenido.
- Hacer los botones en forma de píldora (radio 50px).
- Resaltar una palabra clave de cada título en azul.
- Definir siempre la versión en modo oscuro de cada componente nuevo.

### Qué no hacer

- No hacer toda la página oscura: solo el hero lo es en modo claro.
- No usar esquinas pequeñas (4–8px) en tarjetas o botones; el sitio usa 16–24px en tarjetas y 50px en botones.
- No usar Plus Jakarta Sans para texto normal.
- No poner sombras negras fuertes en modo claro; las sombras son muy suaves (opacidad 0.03–0.08) o azules.
- No mezclar más acentos de color: azul es la marca; rojo y verde solo identifican módulos o estados.

---

## 9. Comportamiento responsivo

Usa los puntos de quiebre de Bootstrap 5 (`sm` 576px, `md` 768px, `lg` 992px, `xl` 1200px, `xxl` 1400px) y además estos ajustes propios:

| Ancho | Cambios |
|---|---|
| ≤ 991px | El menú se colapsa en un panel oscuro (`#0f172a`) con desenfoque y radio 1rem; se evita el desplazamiento horizontal |
| ≤ 768px | Titular del hero a 2.5rem (40px); secciones con 60px de separación; visor de características a 350px de alto; pie de página centrado y boletín en columna |
| ≤ 767px | Se quitan los bordes verticales entre contadores de la barra de estadísticas |

---

## 10. Guía de instrucciones para agentes

Usa estos ejemplos como punto de partida al construir nuevas interfaces:

### Construir una tarjeta

```
Fondo: rgba(255, 255, 255, 0.75) con backdrop-filter: blur(16px)
Borde: 1px solid rgba(255, 255, 255, 0.5)
Radio: 24px
Relleno: 30px
Sombra: 0 8px 32px 0 rgba(31, 38, 135, 0.05)
Al pasar el cursor: translateY(-10px) en 0.4s
Modo oscuro: fondo rgba(30, 41, 59, 0.6), borde rgba(255, 255, 255, 0.1)
```

### Construir un botón

```
Principal: degradado 135deg #3b82f6 → #2563eb, texto blanco, peso 700
Radio: 50px (píldora)
Relleno: 10px 28px
Sombra: 0 4px 15px rgba(59, 130, 246, 0.4)
Al pasar el cursor: translateY(-2px), sombra 0 8px 25px rgba(59, 130, 246, 0.6)
Secundario sobre fondo oscuro: transparente, borde 1px blanco, píldora
```

### Construir el diseño de una página

```
Hero: fondo #020617 con imagen y velo rgba(2, 6, 23, 0.6), alto mínimo 90vh, texto blanco
Resto de la página: fondo #f8fafc, texto #334155
Contenedor: hasta 1320px, centrado
Secciones: 100px de separación vertical (60px en móvil)
Cada sección aparece al hacer scroll (sube 30px, 0.8s)
```

### Construir una tarjeta de estadísticas

```
Contenedor: panel de vidrio, radio 24px, superpuesto al borde inferior del hero
Valor: Inter 700, color azul (#0d6efd / #60a5fa en oscuro)
Etiqueta: Inter 700, mayúsculas, color #64748b, tamaño pequeño
Separadores verticales entre columnas (se quitan en móvil)
```

### Construir un formulario

```
Campo: borde 1px solid #cbd5e1, fondo rgba(255, 255, 255, 0.8)
Foco: fondo #fff, borde #3b82f6, sombra 0 0 0 3px rgba(59, 130, 246, 0.2)
Boletín: campo y botón dentro de una píldora blanca (radio 50px, relleno 6px)
Modo oscuro: fondo #1e293b, borde #334155
```

### Componente general

```
1. Lee las secciones 2-6 de este archivo para los valores
2. Colores: variables de la sección 2
3. Fuente: Inter; Plus Jakarta Sans 800 solo para titulares grandes
4. Espaciado: escala de Bootstrap + 100px entre secciones
5. Componentes: sigue los patrones de GUIA-DE-DISENO.md
6. Define el modo oscuro con body.dark-mode
```
