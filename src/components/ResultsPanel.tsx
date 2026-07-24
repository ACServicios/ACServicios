import { UNIT_CONSTANTS } from "../constants";
import type { CalcResults, CalcState } from "../types";

function Row({ label, value, unit, emphasis }: { label: string; value: string | number | null; unit?: string; emphasis?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="text-xs text-slate-400">{label}</span>
      <span className={`font-mono ${emphasis ? "text-base font-semibold text-orange-300" : "text-sm text-slate-100"}`}>
        {value ?? "—"}
        {unit && value != null ? ` ${unit}` : ""}
      </span>
    </div>
  );
}

export function ResultsPanel({ state, results }: { state: CalcState; results: CalcResults }) {
  const uc = UNIT_CONSTANTS[state.header.unitSystem];
  const rateUnit = state.header.unitSystem === "US" ? "gpm/ft²" : "L/min·m²";

  return (
    <div className="divide-y divide-slate-800">
      <Row label="Área de líquido" value={results.areaLiquido} unit={uc.areaUnit} />
      <Row label="Tasa de tabla" value={results.tasaTabla} unit={rateUnit} />
      <Row label="Tasa mayorada" value={results.tasaMayorada} unit={rateUnit} />
      <Row label="Tasa de diseño adoptada" value={results.tasaDiseno} unit={rateUnit} emphasis />
      <Row label="Tiempo de descarga" value={results.tiempoDescarga} unit="min" />
      <Row label="Caudal de diseño" value={results.caudalDiseno} unit={uc.flowUnit} emphasis />
      <Row label="Volumen agua + espuma" value={results.volumenAguaEspuma} unit={uc.volumeUnit} />
      <Row label="Dosificación efectiva" value={results.porcentajeDosificacionEfectivo} unit="%" />
      <Row label="Concentrado primario" value={results.volumenConcentradoPrimario} unit={uc.volumeUnit} />
      <Row label="Concentrado de reserva" value={results.volumenConcentradoReserva} unit={uc.volumeUnit} />
      <Row label="Concentrado total a acopiar" value={results.volumenConcentradoTotal} unit={uc.volumeUnit} emphasis />
      <Row label="Caudal total de equipos" value={results.caudalEquipoTotal} unit={uc.flowUnit} />
      <Row
        label="Cobertura de equipos"
        value={
          results.coberturaEquipoSuficiente == null
            ? "—"
            : results.coberturaEquipoSuficiente
              ? "Suficiente"
              : "Insuficiente"
        }
      />
    </div>
  );
}
