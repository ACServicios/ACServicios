import type { UnitSystem } from "./types";

export interface UnitConstants {
  lengthUnit: string;
  areaUnit: string;
  flowUnit: string;
  volumeUnit: string;
  tempUnit: string;
  depthUnit: string;
  pressureUnit: string;
  windUnit: string;
  diametroMax: number; // restricción de mangueras como medio primario
  alturaMax: number;
  flashPointLow: number; // 100 F / 38 C
  flashPointHigh: number; // 140 F / 60 C
  boilingPointThreshold: number; // 100 F / 38 C
  tempAlmacenamientoMax: number; // 200 F / 93 C
  profundidadLiquidoMax: number; // 1 in / 25 mm
  caudalLineaMin: number; // 50 gpm / 190 L/min
  tasaTablaBase: number; // 0.16 gpm/ft2 / 6.5 L/min.m2
  tasaAltaDestilacion: number; // 0.20 gpm/ft2 / 8.2 L/min.m2
  redondeoMenor: number; // 10 gal / ~40 L
  redondeoMayor: number; // 100 gal / ~400 L
}

export const UNIT_CONSTANTS: Record<UnitSystem, UnitConstants> = {
  US: {
    lengthUnit: "ft",
    areaUnit: "ft²",
    flowUnit: "gpm",
    volumeUnit: "gal",
    tempUnit: "°F",
    depthUnit: "in",
    pressureUnit: "psi",
    windUnit: "mph",
    diametroMax: 30,
    alturaMax: 20,
    flashPointLow: 100,
    flashPointHigh: 140,
    boilingPointThreshold: 100,
    tempAlmacenamientoMax: 200,
    profundidadLiquidoMax: 1,
    caudalLineaMin: 50,
    tasaTablaBase: 0.16,
    tasaAltaDestilacion: 0.2,
    redondeoMenor: 10,
    redondeoMayor: 100,
  },
  SI: {
    lengthUnit: "m",
    areaUnit: "m²",
    flowUnit: "L/min",
    volumeUnit: "L",
    tempUnit: "°C",
    depthUnit: "mm",
    pressureUnit: "bar",
    windUnit: "km/h",
    diametroMax: 9,
    alturaMax: 6.1,
    flashPointLow: 38,
    flashPointHigh: 60,
    boilingPointThreshold: 38,
    tempAlmacenamientoMax: 93,
    profundidadLiquidoMax: 25,
    caudalLineaMin: 190,
    tasaTablaBase: 6.5,
    tasaAltaDestilacion: 8.2,
    redondeoMenor: 40,
    redondeoMayor: 400,
  },
};

export const FACTOR_MAYORACION_MIN = 1.5;

export const CATEGORIA_HIDROCARBURO_LABEL: Record<string, string> = {
  cat_100_140: "Punto de inflamación entre 100 °F y 140 °F (38 °C y 60 °C)",
  cat_below_100: "Punto de inflamación < 100 °F (38 °C), o almacenado por encima del punto de inflamación",
  crudo: "Petróleo crudo (crude petroleum)",
};

export const CATEGORIA_HIDROCARBURO_TIEMPO: Record<string, number> = {
  cat_100_140: 50,
  cat_below_100: 65,
  crudo: 65,
};

export const TIEMPO_ALCOHOL_DEFAULT = 65;

export const TIPO_CONCENTRADO_LABEL: Record<string, string> = {
  proteinica: "Proteínica",
  fp: "Fluoroproteínica (FP)",
  afff: "AFFF",
  fffp: "FFFP",
  ar_afff: "AR-AFFF",
  sfff: "SFFF (libre de flúor)",
  otro: "Otro",
};
