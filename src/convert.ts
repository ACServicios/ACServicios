import type { CalcState, UnitSystem } from "./types";

const FT_TO_M = 0.3048;
const FT2_TO_M2 = 0.09290304;
const GAL_TO_L = 3.785411784;
const PSI_TO_BAR = 0.0689476;
const MPH_TO_KMH = 1.609344;
// gpm/ft² -> L/min·m² (= GAL_TO_L / FT2_TO_M2)
const RATE_US_TO_SI = GAL_TO_L / FT2_TO_M2;

function conv(value: number | null, factorUsToSi: number, toSI: boolean, decimals = 3): number | null {
  if (value == null) return null;
  const result = toSI ? value * factorUsToSi : value / factorUsToSi;
  const f = 10 ** decimals;
  return Math.round(result * f) / f;
}

function convLength(v: number | null, toSI: boolean) {
  return conv(v, FT_TO_M, toSI, 3);
}
function convArea(v: number | null, toSI: boolean) {
  return conv(v, FT2_TO_M2, toSI, 2);
}
function convFlow(v: number | null, toSI: boolean) {
  return conv(v, GAL_TO_L, toSI, 1);
}
function convRate(v: number | null, toSI: boolean) {
  return conv(v, RATE_US_TO_SI, toSI, 3);
}
function convPressure(v: number | null, toSI: boolean) {
  return conv(v, PSI_TO_BAR, toSI, 3);
}
function convWind(v: number | null, toSI: boolean) {
  return conv(v, MPH_TO_KMH, toSI, 1);
}
function convTemp(v: number | null, toSI: boolean): number | null {
  if (v == null) return null;
  const result = toSI ? ((v - 32) * 5) / 9 : (v * 9) / 5 + 32;
  return Math.round(result * 10) / 10;
}

/** Convierte los campos numéricos dependientes de unidad al cambiar entre US y SI, preservando la magnitud física real. */
export function convertUnits(state: CalcState, target: UnitSystem): CalcState {
  if (target === state.header.unitSystem) return state;
  const toSI = target === "SI";

  return {
    ...state,
    header: { ...state.header, unitSystem: target },
    geometry: {
      ...state.geometry,
      diametroTanque: convLength(state.geometry.diametroTanque, toSI),
      alturaEnvolvente: convLength(state.geometry.alturaEnvolvente, toSI),
      areaLiquidoManual: convArea(state.geometry.areaLiquidoManual, toSI),
      distanciaEmplazamiento: convLength(state.geometry.distanciaEmplazamiento, toSI),
    },
    product: {
      ...state.product,
      tasaAplicacionManual: convRate(state.product.tasaAplicacionManual, toSI),
      puntoInflamacionReal: convTemp(state.product.puntoInflamacionReal, toSI),
      puntoEbullicion: convTemp(state.product.puntoEbullicion, toSI),
      temperaturaAlmacenamiento: convTemp(state.product.temperaturaAlmacenamiento, toSI),
    },
    factor: {
      ...state.factor,
      velocidadVientoDiseno: convWind(state.factor.velocidadVientoDiseno, toSI),
      tasaDisenoOverride: convRate(state.factor.tasaDisenoOverride, toSI),
    },
    foam: {
      ...state.foam,
      tasaSFFFManual: convRate(state.foam.tasaSFFFManual, toSI),
    },
    monitores: {
      ...state.monitores,
      caudalNominalPorMonitor: convFlow(state.monitores.caudalNominalPorMonitor, toSI),
      alcanceEfectivoEspuma: convLength(state.monitores.alcanceEfectivoEspuma, toSI),
      presionRequeridaBoquilla: convPressure(state.monitores.presionRequeridaBoquilla, toSI),
    },
    mangueras: {
      ...state.mangueras,
      caudalPorLinea: convFlow(state.mangueras.caudalPorLinea, toSI),
      longitudTendido: convLength(state.mangueras.longitudTendido, toSI),
    },
    supplies: {
      ...state.supplies,
      caudalAguaDisponible: convFlow(state.supplies.caudalAguaDisponible, toSI),
      presionDisponible: convPressure(state.supplies.presionDisponible, toSI),
    },
  };
}
