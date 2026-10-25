# Sistema de diseño de nsvsoft

> Frameworks: no se detectaron
> Colores: 20 · Fuentes: 3 · Componentes: 9
> Biblioteca de íconos: no detectada · Estado: no detectado
> Tema principal: oscuro · Selector de modo oscuro: no · Movimiento: expresivo

---

## 1. Tema visual y atmósfera

Esta es una interfaz de **tema oscuro** con un tono frío. La profundidad se expresa mediante sombras en capas y una sutil variación de color en las superficies. La tipografía combina **Inter** para títulos/encabezados con **Plus Jakarta Sans** para el texto de cuerpo, lo que crea una jerarquía visual clara a través del contraste tipográfico. El espaciado sigue una **cuadrícula base de 5px** (densidad estándar), con la escala: 5, 10, 15, 20, 25, 30, 35, 40px. El color de acento **#3b82f6** ancla los elementos interactivos (botones, enlaces, anillos de foco). El movimiento es expresivo: la física de resortes, las animaciones de diseño y las apariciones escalonadas forman parte del lenguaje visual.

---

## 2. Paleta de colores y roles

| Token | Hex | Rol | Uso |
|---|---|---|---|
| bs-emphasis-color | `#000000` | fondo | Fondo de la página, superficie más oscura |
| surface | `#0f172a` | superficie | Fondos de tarjetas y paneles |
| bs-emphasis-color | `#ffffff` | texto principal | Encabezados y texto de cuerpo |
| text-muted | `#94a3b8` | texto atenuado | Leyendas, marcadores de posición, información secundaria |
| bs-body-color | `#212529` | borde | Divisores, bordes de tarjetas, contornos |
| accent-color | `#3b82f6` | acento | CTA, enlaces, anillos de foco, estados activos |
| bs-warning | `#ffc107` | acento | CTA, enlaces, anillos de foco, estados activos |
| bs-danger | `#dc3545` | peligro | Estados de error, acciones destructivas |
| bs-success | `#198754` | éxito | Estados de éxito, indicadores positivos |
| warning | `#f59e0b` | advertencia | Estados de advertencia, indicadores de precaución |
| theme-color | `#2563eb` | información | Resaltados informativos |
| bs-primary | `#0d6efd` | sin asignar | Color de la paleta |
| primary-dark | `#020617` | sin asignar | Color de la paleta |
| bs-secondary | `#6c757d` | sin asignar | Color de la paleta |
| text-main | `#334155` | sin asignar | Color de la paleta |
| bs-primary-text-emphasis | `#6ea8fe` | sin asignar | Color de la paleta |
| primary-light | `#1e293b` | sin asignar | Color de la paleta |
| unknown | `#10b981` | sin asignar | Color de la paleta |
| bs-info | `#0dcaf0` | sin asignar | Color de la paleta |
| danger-color | `#ef4444` | sin asignar | Color de la paleta |

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


---

## 3. Reglas tipográficas

**Pila de fuentes:**
- **Plus Jakarta Sans** — Encabezado 1, Encabezado 2, Encabezado 3
- **Inter** — Cuerpo, Leyenda
- **Courier New** — Código

**Orígenes de las fuentes:**

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

| Rol | Fuente | Tamaño | Peso |
|---|---|---|---|
| Encabezado 1 | Plus Jakarta Sans | 5rem | 700 |
| Encabezado 2 | Plus Jakarta Sans | 4.5rem | 700 |
| Encabezado 3 | Plus Jakarta Sans | 4rem | 700 |
| Cuerpo | Inter | 0.75rem | 400 |
| Leyenda | Inter | 1rem | 400 |
| Código | Courier New | 14px | 400 |

**Reglas tipográficas:**
- Limitar a un máximo de 3 familias tipográficas por pantalla
- Usar **Plus Jakarta Sans** para el texto de cuerpo/interfaz e **Inter** para títulos/encabezados
- Mantener una jerarquía coherente: no más de 3-4 tamaños de fuente por pantalla
- Los encabezados usan negrita (600-700) y el cuerpo usa peso regular (400)
- Interlineado: 1.5 para el texto de cuerpo, 1.2 para los encabezados
- Usar color y opacidad para la jerarquía secundaria, no tamaños de fuente adicionales


---

## 4. Estilos de componentes

### Diseño (1)

**Pie de página** — `html`

### Navegación (1)

**Navegación** — `html`

### Visualización de datos (3)

**Tarjeta** — `html`
- Variantes: `home`, `detail`, `glass`, `1`, `2`

**Insignia** — `html`

**Lista** — `html`

### Entrada de datos (2)

**Botón** — `html`
- Variantes: `sm`, `link`, `primary-glow`, `lg`, `outline-light`
- Animación: 

**Campo de entrada** — `html`
- Estado: :focus, :placeholder

### Superposición (1)

**Modal** — `html`

### Multimedia (1)

**Imagen** — `html`



---

## 5. Principios de diseño

- **Unidad base de espaciado:** 5px
- **Escala de espaciado:** 5, 10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 80
- **Radio de borde:** .25rem, .25em, .375rem, 1rem, 2em, inherit, 3px, 4px, 6px, 8px, 10px, 12px, 14px, 15px, 16px, 18px, 20px, 24px, 28px, 30px, 40px, 50px
- **Ancho máximo del contenido:** 991px

**El espaciado como significado:**
| Espaciado | Uso |
|---|---|
| 2.5-5px | Ajustado: elementos relacionados dentro de un grupo |
| 10px | Medio: entre grupos |
| 15-20px | Amplio: entre secciones |
| 30px+ | Muy amplio: cortes de sección principales |


---

## 6. Profundidad y elevación

### Plano — indicios sutiles de profundidad

- `0 0 0 1px #fff,0 0 0 .25rem rgba(13,110,253,.25)`
- `inset 0 0 0 1px rgba(59,130,246,0.2)`
- `inset 0 0 0 1px rgba(96,165,250,0.25)`

### Elevado — tarjetas, botones, elementos interactivos

- `0 0 0 .25rem rgba(13,110,253,.25)`
- `0 0 0 .25rem rgba(var(--bs-success-rgb),.25)`
- `0 0 0 .25rem rgba(var(--bs-danger-rgb),.25)`

### Flotante — menús desplegables, ventanas emergentes, modales

- `0 4px 15px rgba(59,130,246,0.4)`
- `0 4px 20px rgba(0,0,0,0.05)`
- `0 4px 12px rgba(59,130,246,0.3)`

### Superposición — superposiciones de pantalla completa, diálogos de nivel superior

- `inset 0 0 0 9999px var(--bs-table-bg-state,var(--bs-table-bg-type,var(--bs-table-accent-bg)))`
- `0 8px 32px 0 rgba(31,38,135,0.05)`
- `0 8px 25px rgba(59,130,246,0.6)`

### Escala de Z-Index

`0, 1, 2, 3, 4, 5, 10, 100, 1020, 1030, 1040, 1055, 9999`



---

## 7. Animación y movimiento

Este proyecto usa **movimiento expresivo**. Las animaciones son una parte integral de la experiencia.

### Animaciones CSS

- `@keyframes progress-bar-stripes`
- `@keyframes spinner-border`
- `@keyframes spinner-grow`
- `@keyframes placeholder-glow`
- `@keyframes placeholder-wave`
- `@keyframes fa-beat`
- `@keyframes fa-bounce`
- `@keyframes fa-fade`

### Componentes animados

- **Botón**: 

### Pautas de movimiento

- Duración: 150-300ms para microinteracciones, 300-500ms para transiciones de página
- Curva de aceleración: `ease-out` para entradas, `ease-in` para salidas
- Respetar siempre `prefers-reduced-motion`


---

## 8. Qué hacer y qué no hacer

### Qué hacer

- Usar `#3b82f6` para los elementos interactivos (botones, enlaces, anillos de foco)
- Usar `#000000` como fondo principal de la página
- Combinar **Plus Jakarta Sans** (cuerpo) con **Inter** (títulos): son las únicas fuentes permitidas
- Seguir la cuadrícula de espaciado de **5px** para todos los márgenes, rellenos y separaciones
- Usar los tokens de sombra definidos para la elevación; ver la Sección 6
- Usar radios de borde de la escala: .25rem, .25em, .375rem, 1rem, 2em
- Reutilizar los componentes existentes de la Sección 4 antes de crear nuevos

### Qué no hacer

- No introducir colores fuera de esta paleta; primero ampliar los tokens de diseño
- No introducir familias tipográficas adicionales además de Plus Jakarta Sans, Inter y Courier New
- No usar valores de espaciado arbitrarios; limitarse a múltiplos de 5px
- No crear valores de box-shadow personalizados fuera de los tokens del sistema
- No usar valores de border-radius arbitrarios; elegir de la escala definida
- No duplicar patrones de componentes; revisar primero la Sección 4


---

## 9. Comportamiento responsivo

| Nombre | Valor | Origen |
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

**Enfoque:** Usar consultas `@media (min-width: ...)` que coincidan con los puntos de quiebre anteriores.


---

## 10. Guía de instrucciones para agentes

Usa estos ejemplos como punto de partida al construir nuevas interfaces:

### Construir una tarjeta

```
Fondo: #0f172a
Borde: 1px solid #212529
Radio: 12px
Relleno: 20px
Fuente: Plus Jakarta Sans
Usa los tokens de sombra de la sección 6.
```

### Construir un botón

```
Primario: fondo #3b82f6, texto blanco
Fantasma: fondo transparente, borde #212529
Relleno: 10px 20px
Radio: 12px
Al pasar el cursor: opacidad 0.9 o un tono más claro
Foco: anillo con #3b82f6
```

### Construir el diseño de una página

```
Fondo: #000000
Ancho máximo: 991px, centrado
Cuadrícula: base de 5px
Responsivo: primero móvil, puntos de quiebre de la sección 9
```

### Construir una tarjeta de estadísticas

```
Superficie: #0f172a
Etiqueta: #94a3b8 (atenuado, 12px, mayúsculas)
Valor: #ffffff (principal, 24-32px, negrita)
Estado: usa éxito/advertencia/peligro de la sección 2
```

### Construir un formulario

```
Fondo del campo: #000000
Borde del campo: 1px solid #212529
Foco: color de borde #3b82f6
Etiqueta: #94a3b8 12px
Espaciado: 20px entre campos
Radio: 12px
```

### Componente general

```
1. Lee las secciones 2-6 de DESIGN.md para los tokens
2. Colores: solo de la paleta
3. Fuente: Plus Jakarta Sans, escala tipográfica de la sección 3
4. Espaciado: cuadrícula de 5px
5. Componentes: sigue los patrones de la sección 4
6. Elevación: tokens de sombra
```
