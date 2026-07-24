export type UnitSystem = "US" | "SI";

export type Rol = "primario" | "suplementario" | "apoyo_manual";
export type TipoDispositivo = "monitores" | "mangueras" | "combinacion";
export type ModoEntradaGeometria = "diametro" | "area";
export type FamiliaProducto = "hidrocarburo" | "alcohol";
export type CategoriaHidrocarburo = "cat_100_140" | "cat_below_100" | "crudo";
export type TipoConcentrado =
  | "proteinica"
  | "fp"
  | "afff"
  | "fffp"
  | "ar_afff"
  | "sfff"
  | "otro";
export type Dosificacion = 1 | 3 | 6 | "custom";
export type AgenciaListado = "UL" | "FM" | "LASTFIRE" | "otra";
export type TipoMonitor = "fijo" | "portatil" | "remolcable" | "telecomandado";
export type TipoBoquilla = "aspirante" | "no_aspirante" | "autoeductora";
export type MetodoDosificacion = "eductor_linea" | "alrededor_bomba" | "preproporcionado";
export type ReservaConcentrado = 0 | 100 | "custom";
export type FormaReserva = "tanque_separado" | "compartimento_separado" | "suministro_externo";
export type FuenteAgua = "red_ci" | "tanque_dedicado" | "bomba_movil" | "fuente_abierta";
export type Redondeo = "exacto" | "alza10" | "alza100";
export type FormatoExportacion = "PDF" | "XLSX" | "Imprimir";

export interface Block0Header {
  proyecto: string;
  tag: string;
  revision: string;
  fecha: string;
  disenador: string;
  unitSystem: UnitSystem;
}

export interface Block1Role {
  rol: Rol;
  tipoDispositivo: TipoDispositivo;
  // 3.3 condiciones habilitantes (monitores como medio primario)
  sistemaPortatil: boolean;
  tiempoPuestaServicio: number | null; // horas
  suministroAguaAdecuado: boolean;
  suministroConcentradoAdecuado: boolean;
  evaluacionRiesgoCompleta: boolean;
  evaluacionRiesgoDoc: string;
  planContingenciaCompleto: boolean;
  planContingenciaDoc: string;
  aprobacionAutoridad: boolean;
  aprobacionAutoridadRef: string;
  // 3.5 exclusiones generales
  tanqueHorizontalPresurizado: boolean;
  techoFlotante: boolean;
}

export interface Block2Geometry {
  modoEntrada: ModoEntradaGeometria;
  diametroTanque: number | null;
  alturaEnvolvente: number | null;
  areaLiquidoManual: number | null;
  distanciaEmplazamiento: number | null;
}

export interface Block3Product {
  familiaProducto: FamiliaProducto;
  categoriaHidrocarburo: CategoriaHidrocarburo;
  // alcohol-resistant
  tasaAplicacionManual: number | null;
  tiempoOperacionManual: number | null;
  ensayoFuegoDoc: string;
  profundidadLiquidoMayor1in: boolean;
  espumaListadaChorroAlcohol: boolean;
  // complementary
  puntoInflamacionReal: number | null;
  puntoEbullicion: number | null;
  rangoAmplioDestilacion: boolean;
  aditivosOxigenados: number; // 0-30 %
  temperaturaAlmacenamiento: number | null;
}

export interface Block4Factor {
  factorMayoracion: number;
  velocidadVientoDiseno: number | null;
  justificacionFactorSuperior: string;
  tasaDisenoOverride: number | null; // solo-lectura salvo que el ingeniero decida ajustar
}

export interface Block5Foam {
  tipoConcentrado: TipoConcentrado;
  dosificacion: Dosificacion;
  dosificacionCustom: number | null;
  listadoAplicacionChorro: boolean;
  agenciaListado: AgenciaListado;
  marcaModelo: string;
  tasaSFFFManual: number | null;
}

export interface Block6Monitores {
  cantidadMonitores: number;
  tipoMonitor: TipoMonitor;
  caudalNominalPorMonitor: number | null;
  alcanceEfectivoEspuma: number | null;
  presionRequeridaBoquilla: number | null;
  ubicacionFueraDique: boolean;
}

export interface Block6Mangueras {
  cantidadLineas: number;
  caudalPorLinea: number | null;
  tipoBoquilla: TipoBoquilla;
  longitudTendido: number | null;
  metodoDosificacion: MetodoDosificacion;
  personalDisponiblePorLinea: number | null;
}

export interface Block7Supplies {
  reservaConcentrado: ReservaConcentrado;
  reservaConcentradoCustom: number | null;
  formaReserva: FormaReserva;
  caudalAguaDisponible: number | null;
  presionDisponible: number | null;
  fuenteAgua: FuenteAgua;
  autonomiaSuministro: number | null;
}

export interface Block8Output {
  redondeoVolumenes: Redondeo;
  incluirMemoriaCalculo: boolean;
  incluirConstanciaCondiciones: boolean;
  formatoExportacion: FormatoExportacion;
}

export interface CalcState {
  header: Block0Header;
  role: Block1Role;
  geometry: Block2Geometry;
  product: Block3Product;
  factor: Block4Factor;
  foam: Block5Foam;
  monitores: Block6Monitores;
  mangueras: Block6Mangueras;
  supplies: Block7Supplies;
  output: Block8Output;
}

export type Severity = "bloqueo" | "advertencia" | "info";

export interface ValidationItem {
  id: string;
  severity: Severity;
  message: string;
  ref?: string;
}

export interface CalcResults {
  areaLiquido: number | null;
  tasaTabla: number | null;
  tiempoDescarga: number | null;
  tasaMayorada: number | null;
  tasaDiseno: number | null;
  caudalDiseno: number | null;
  volumenAguaEspuma: number | null;
  porcentajeDosificacionEfectivo: number | null;
  volumenConcentradoPrimario: number | null;
  volumenConcentradoReserva: number | null;
  volumenConcentradoTotal: number | null;
  caudalEquipoTotal: number | null;
  coberturaEquipoSuficiente: boolean | null;
}
