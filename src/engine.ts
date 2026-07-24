import {
  CATEGORIA_HIDROCARBURO_TIEMPO,
  FACTOR_MAYORACION_MIN,
  TIEMPO_ALCOHOL_DEFAULT,
  UNIT_CONSTANTS,
} from "./constants";
import type { CalcResults, CalcState, ValidationItem } from "./types";

function round(n: number, decimals = 4): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

function roundUpTo(n: number, increment: number): number {
  if (increment <= 0) return n;
  return Math.ceil(n / increment) * increment;
}

export function dispositivoIncluyeMonitores(t: CalcState["role"]["tipoDispositivo"]): boolean {
  return t === "monitores" || t === "combinacion";
}

export function dispositivoIncluyeMangueras(t: CalcState["role"]["tipoDispositivo"]): boolean {
  return t === "mangueras" || t === "combinacion";
}

export function computeResults(state: CalcState): CalcResults {
  const uc = UNIT_CONSTANTS[state.header.unitSystem];
  const { geometry, product, factor, foam, monitores, mangueras, output, role } = state;

  // Bloque 2 — área de líquido
  let areaLiquido: number | null = null;
  if (geometry.modoEntrada === "diametro") {
    if (geometry.diametroTanque != null && geometry.diametroTanque > 0) {
      areaLiquido = round((Math.PI * geometry.diametroTanque ** 2) / 4);
    }
  } else {
    areaLiquido = geometry.areaLiquidoManual;
  }

  // Bloque 3 — tasa de tabla y tiempo de descarga
  let tasaTabla: number | null = null;
  let tiempoDescarga: number | null = null;
  if (product.familiaProducto === "hidrocarburo") {
    tasaTabla = foam.tipoConcentrado === "sfff" ? foam.tasaSFFFManual : uc.tasaTablaBase;
    tiempoDescarga = CATEGORIA_HIDROCARBURO_TIEMPO[product.categoriaHidrocarburo] ?? null;
  } else {
    tasaTabla = product.tasaAplicacionManual;
    tiempoDescarga = product.tiempoOperacionManual ?? TIEMPO_ALCOHOL_DEFAULT;
  }

  // Bloque 4 — tasa mayorada y de diseño
  const tasaMayorada =
    tasaTabla != null && factor.factorMayoracion != null
      ? round(tasaTabla * factor.factorMayoracion)
      : null;
  const tasaDiseno = factor.tasaDisenoOverride ?? tasaMayorada;

  // Caudal de diseño
  const caudalDiseno =
    tasaDiseno != null && areaLiquido != null ? round(tasaDiseno * areaLiquido, 2) : null;

  // Volumen agua + espuma
  const volumenAguaEspuma =
    caudalDiseno != null && tiempoDescarga != null ? round(caudalDiseno * tiempoDescarga, 1) : null;

  // Porcentaje de dosificación efectivo
  const porcentajeDosificacionEfectivo =
    foam.dosificacion === "custom" ? foam.dosificacionCustom : foam.dosificacion;

  const volumenConcentradoPrimario =
    volumenAguaEspuma != null && porcentajeDosificacionEfectivo != null
      ? round(volumenAguaEspuma * (porcentajeDosificacionEfectivo / 100), 1)
      : null;

  const reservaPct =
    state.supplies.reservaConcentrado === "custom"
      ? state.supplies.reservaConcentradoCustom
      : state.supplies.reservaConcentrado;

  const volumenConcentradoReserva =
    volumenConcentradoPrimario != null && reservaPct != null
      ? round(volumenConcentradoPrimario * (reservaPct / 100), 1)
      : null;

  const volumenConcentradoTotalRaw =
    volumenConcentradoPrimario != null
      ? volumenConcentradoPrimario + (volumenConcentradoReserva ?? 0)
      : null;

  const redondeoIncremento =
    output.redondeoVolumenes === "alza10"
      ? uc.redondeoMenor
      : output.redondeoVolumenes === "alza100"
        ? uc.redondeoMayor
        : 0;

  const volumenConcentradoTotal =
    volumenConcentradoTotalRaw != null
      ? redondeoIncremento > 0
        ? roundUpTo(volumenConcentradoTotalRaw, redondeoIncremento)
        : round(volumenConcentradoTotalRaw, 1)
      : null;

  // Cobertura de equipos
  let caudalEquipoTotal = 0;
  let hasEquipo = false;
  if (dispositivoIncluyeMonitores(role.tipoDispositivo) && monitores.caudalNominalPorMonitor != null) {
    caudalEquipoTotal += monitores.cantidadMonitores * monitores.caudalNominalPorMonitor;
    hasEquipo = true;
  }
  if (dispositivoIncluyeMangueras(role.tipoDispositivo) && mangueras.caudalPorLinea != null) {
    caudalEquipoTotal += mangueras.cantidadLineas * mangueras.caudalPorLinea;
    hasEquipo = true;
  }
  const coberturaEquipoSuficiente =
    hasEquipo && caudalDiseno != null ? caudalEquipoTotal >= caudalDiseno : null;

  return {
    areaLiquido,
    tasaTabla,
    tiempoDescarga,
    tasaMayorada,
    tasaDiseno,
    caudalDiseno,
    volumenAguaEspuma,
    porcentajeDosificacionEfectivo,
    volumenConcentradoPrimario,
    volumenConcentradoReserva,
    volumenConcentradoTotal,
    caudalEquipoTotal: hasEquipo ? round(caudalEquipoTotal, 1) : null,
    coberturaEquipoSuficiente,
  };
}

export function computeValidations(state: CalcState, results: CalcResults): ValidationItem[] {
  const uc = UNIT_CONSTANTS[state.header.unitSystem];
  const { role, geometry, product, factor, foam, monitores, supplies } = state;
  const items: ValidationItem[] = [];

  const incluyeMonitores = dispositivoIncluyeMonitores(role.tipoDispositivo);
  const incluyeMangueras = dispositivoIncluyeMangueras(role.tipoDispositivo);
  const esPrimario = role.rol === "primario";

  // ---- BLOQUEOS (11.1) ----
  if (
    esPrimario &&
    incluyeMangueras &&
    ((geometry.diametroTanque != null && geometry.diametroTanque > uc.diametroMax) ||
      (geometry.alturaEnvolvente != null && geometry.alturaEnvolvente > uc.alturaMax))
  ) {
    items.push({
      id: "bloqueo-mangueras-dimension",
      severity: "bloqueo",
      message: `Rol de medio primario con mangueras en tanque de más de ${uc.diametroMax} ${uc.lengthUnit} de diámetro o más de ${uc.alturaMax} ${uc.lengthUnit} de altura.`,
      ref: "§ 5.2.4.1.1",
    });
  }

  if (esPrimario && incluyeMonitores) {
    const faltantes: string[] = [];
    if (!role.sistemaPortatil) faltantes.push("naturaleza portátil/móvil/semifija declarada");
    if (!role.suministroAguaAdecuado) faltantes.push("suministro de agua contra incendio adecuado");
    if (!role.suministroConcentradoAdecuado) faltantes.push("suministro de concentrado de espuma adecuado");
    if (!role.evaluacionRiesgoCompleta) faltantes.push("evaluación de riesgo");
    if (!role.planContingenciaCompleto) faltantes.push("plan de contingencia pre-incidente");
    if (!role.aprobacionAutoridad) faltantes.push("aprobación de la autoridad competente");
    if (faltantes.length > 0) {
      items.push({
        id: "bloqueo-monitores-condiciones",
        severity: "bloqueo",
        message: `Rol de medio primario con monitores sin: ${faltantes.join(", ")}.`,
        ref: "§ 5.2.4.1.1",
      });
    }
  }

  if (esPrimario && incluyeMonitores && role.tiempoPuestaServicio != null && role.tiempoPuestaServicio > 4) {
    items.push({
      id: "bloqueo-tiempo-puesta-servicio",
      severity: "bloqueo",
      message: "Tiempo de puesta en servicio del sistema portátil, móvil o semifijo superior a 4 horas.",
      ref: "§ 5.2.4.1.1",
    });
  }

  if (factor.factorMayoracion != null && factor.factorMayoracion < FACTOR_MAYORACION_MIN) {
    items.push({
      id: "bloqueo-factor-mayoracion",
      severity: "bloqueo",
      message: `Factor de mayoración inferior a ${FACTOR_MAYORACION_MIN}.`,
      ref: "§ 5.2.4.2.1.2",
    });
  }

  if (
    results.tasaDiseno != null &&
    results.tasaMayorada != null &&
    results.tasaDiseno < results.tasaMayorada
  ) {
    items.push({
      id: "bloqueo-tasa-diseno",
      severity: "bloqueo",
      message: "Tasa de diseño inferior a la tasa de tabla mayorada.",
      ref: "§ 5.2.4.2.1.2",
    });
  }

  if (
    supplies.autonomiaSuministro != null &&
    results.tiempoDescarga != null &&
    supplies.autonomiaSuministro < results.tiempoDescarga
  ) {
    items.push({
      id: "bloqueo-autonomia",
      severity: "bloqueo",
      message: "Autonomía del suministro de agua inferior al tiempo de descarga adoptado.",
      ref: "§ 5.2.4",
    });
  }

  if (role.tanqueHorizontalPresurizado) {
    items.push({
      id: "bloqueo-tanque-horizontal",
      severity: "bloqueo",
      message: "Tanque horizontal o presurizado declarado: fuera del alcance de este módulo como medio primario.",
      ref: "§ 5.2.3",
    });
  }

  // ---- ADVERTENCIAS (11.2) ----
  if (
    incluyeMonitores &&
    monitores.alcanceEfectivoEspuma != null &&
    geometry.distanciaEmplazamiento != null &&
    geometry.diametroTanque != null
  ) {
    const alcanceRequerido = geometry.distanciaEmplazamiento + geometry.diametroTanque / 2;
    if (monitores.alcanceEfectivoEspuma < alcanceRequerido) {
      items.push({
        id: "advertencia-alcance-monitor",
        severity: "advertencia",
        message: `Alcance efectivo del monitor (${monitores.alcanceEfectivoEspuma} ${uc.lengthUnit}) insuficiente respecto de la distancia de emplazamiento más el radio del tanque (${round(alcanceRequerido, 1)} ${uc.lengthUnit} requeridos).`,
      });
    }
  }

  if (product.rangoAmplioDestilacion) {
    items.push({
      id: "advertencia-destilacion",
      severity: "advertencia",
      message: `Producto con rango amplio de destilación: posible necesidad de ${uc.tasaAltaDestilacion} ${state.header.unitSystem === "US" ? "gpm/ft²" : "L/min·m²"} o más tras combustión prolongada.`,
    });
  }

  if (product.temperaturaAlmacenamiento != null && product.temperaturaAlmacenamiento > uc.tempAlmacenamientoMax) {
    items.push({
      id: "advertencia-temperatura",
      severity: "advertencia",
      message: `Producto por encima de ${uc.tempAlmacenamientoMax} ${uc.tempUnit}: riesgo de espumado violento y expulsión al aplicar chorros portátiles.`,
    });
  }

  if (
    product.familiaProducto === "alcohol" &&
    product.profundidadLiquidoMayor1in &&
    !product.espumaListadaChorroAlcohol
  ) {
    items.push({
      id: "advertencia-profundidad-alcohol",
      severity: "advertencia",
      message: `Líquido de profundidad mayor a ${uc.profundidadLiquidoMax} ${uc.depthUnit} con espuma resistente al alcohol no listada específicamente para chorros de monitor y manguera.`,
    });
  }

  if (!foam.listadoAplicacionChorro) {
    items.push({
      id: "advertencia-concentrado-no-listado",
      severity: "advertencia",
      message: "Concentrado sin listado para aplicación por chorro forzado (monitor o manguera).",
    });
  }

  if (
    incluyeMonitores &&
    monitores.presionRequeridaBoquilla != null &&
    supplies.presionDisponible != null &&
    supplies.presionDisponible < monitores.presionRequeridaBoquilla
  ) {
    items.push({
      id: "advertencia-presion",
      severity: "advertencia",
      message: "Presión disponible insuficiente en la boquilla respecto de la presión requerida.",
    });
  }

  if (results.coberturaEquipoSuficiente === false) {
    items.push({
      id: "advertencia-cobertura-equipo",
      severity: "advertencia",
      message: `El caudal total instalado (${results.caudalEquipoTotal} ${uc.flowUnit}) no cubre el caudal de diseño mayorado (${results.caudalDiseno} ${uc.flowUnit}).`,
    });
  }

  if (foam.tipoConcentrado === "sfff" && !foam.tasaSFFFManual) {
    items.push({
      id: "advertencia-sfff-tasa",
      severity: "advertencia",
      message: "SFFF seleccionado: debe indicarse la tasa según el listado o las recomendaciones del fabricante (Anexo H) en modo manual.",
      ref: "Anexo H",
    });
  }

  // ---- AVISOS INFORMATIVOS (11.3) — siempre visibles ----
  items.push({
    id: "info-perdidas-viento",
    severity: "info",
    message: `Deben computarse las pérdidas por viento y otros factores del entorno además del factor mínimo de ${FACTOR_MAYORACION_MIN}.`,
  });
  items.push({
    id: "info-consultar-fabricante",
    severity: "info",
    message: "Consultar al fabricante del concentrado y del equipo por limitaciones y listados específicos.",
  });
  items.push({
    id: "info-cafs",
    severity: "info",
    message: "Los sistemas de espuma por aire comprimido requieren tasas determinadas por ensayos de listado o datos del fabricante.",
  });
  items.push({
    id: "info-mantenimiento",
    severity: "info",
    message: "Pruebas de aceptación conforme al Capítulo 12; inspección, prueba y mantenimiento conforme al Capítulo 13.",
  });

  return items;
}

export function hasBloqueos(items: ValidationItem[]): boolean {
  return items.some((i) => i.severity === "bloqueo");
}
