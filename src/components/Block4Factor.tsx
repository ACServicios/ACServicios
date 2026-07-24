import { FACTOR_MAYORACION_MIN, UNIT_CONSTANTS } from "../constants";
import { Field, NumberInput, ReadOnlyValue, Section } from "./Fields";
import type { CalcResults, CalcState } from "../types";

export function Block4Factor({
  state,
  patch,
  results,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
  results: CalcResults;
}) {
  const f = state.factor;
  const uc = UNIT_CONSTANTS[state.header.unitSystem];
  const flowRateUnit = state.header.unitSystem === "US" ? "gpm/ft²" : "L/min·m²";
  const requiereJustificacion = f.factorMayoracion > FACTOR_MAYORACION_MIN;

  return (
    <Section
      title="Bloque 4 — Factor de mayoración por pérdidas"
      subtitle="Exclusivo del método de monitores y mangueras: mayora la tasa de aplicación para compensar pérdidas por viento y otros factores."
      normRef="§ 5.2.4.2.1.2"
      tone="critical"
    >
      <Field label="Factor de mayoración" help={`Valor por defecto ${FACTOR_MAYORACION_MIN}. Bloqueo si es menor.`}>
        <NumberInput
          step="0.05"
          min={0}
          value={f.factorMayoracion}
          onChange={(e) => patch("factor", { factorMayoracion: Number(e.target.value) })}
        />
      </Field>
      <Field label="Velocidad de viento de diseño" help="Informativo; justifica factores superiores a 1,5">
        <NumberInput
          unit={uc.windUnit}
          value={f.velocidadVientoDiseno ?? ""}
          onChange={(e) =>
            patch("factor", { velocidadVientoDiseno: e.target.value === "" ? null : Number(e.target.value) })
          }
        />
      </Field>
      {requiereJustificacion && (
        <Field label="Justificación de factor superior a 1,5" full help="Obligatoria si el factor supera el valor por defecto">
          <textarea
            value={f.justificacionFactorSuperior}
            onChange={(e) => patch("factor", { justificacionFactorSuperior: e.target.value })}
            rows={2}
            className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400/60"
          />
        </Field>
      )}
      <Field label="Tasa de tabla" readOnly>
        <ReadOnlyValue value={results.tasaTabla} unit={flowRateUnit} />
      </Field>
      <Field label="Tasa mayorada resultante" readOnly help="Tasa de tabla multiplicada por el factor adoptado">
        <ReadOnlyValue value={results.tasaMayorada} unit={flowRateUnit} />
      </Field>
    </Section>
  );
}
