# Módulo 5.2.4 — Monitores y líneas de manguera de espuma (NFPA 11, 2021)

Interfaz de cálculo rápido para ingenieros: carga los parámetros de entrada para el
diseño de protección de tanques de techo fijo con monitores de espuma (foam monitors)
y líneas de manguera (foam handlines) según NFPA 11 § 5.2.4, y obtiene en tiempo real
la tasa de aplicación mayorada, el caudal de diseño, el tiempo de descarga y los
volúmenes de agua y concentrado, junto con el panel de bloqueos, advertencias y avisos
informativos exigidos por la norma.

Basada en la especificación funcional `Especificacion_UI_Modulo_5.2.4_Monitores_y_Mangueras_NFPA11.docx`.

## Uso

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc + vite build)
npm run lint      # oxlint
```

## Estructura

- `src/types.ts` — modelo de datos de los 9 bloques de entrada.
- `src/constants.ts` — constantes normativas por sistema de unidades (US/SI).
- `src/engine.ts` — motor de cálculo (área, tasa mayorada, caudal, volúmenes) y motor de validaciones (bloqueos / advertencias / avisos).
- `src/convert.ts` — conversión física de los campos numéricos al alternar entre unidades US y SI.
- `src/state.ts` — estado inicial y plantillas de producto (crudo, gasolina, diésel).
- `src/components/` — bloques de la interfaz (`Block0Header` … `Block8Output`), panel de resultados, panel de validaciones y acciones globales.

## Notas de cálculo

- Tasa de diseño = tasa de tabla (0,16 gpm/ft² / 6,5 L/min·m² para hidrocarburos, o
  manual para espumas resistentes al alcohol / SFFF) × factor de mayoración (mínimo 1,5).
- Caudal de diseño = tasa de diseño × área de líquido.
- Volumen agua + espuma = caudal de diseño × tiempo de descarga (50 o 65 min según categoría).
- Concentrado total a acopiar = volumen primario (dosificación %) + reserva declarada, con
  redondeo opcional al alza (10/100 gal o su equivalente en SI).
- El botón **Calcular** se inhabilita mientras exista algún bloqueo activo, siguiendo la
  convención de la especificación.
