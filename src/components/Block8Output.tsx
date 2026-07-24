import { Checkbox, Field, Section, Segmented } from "./Fields";
import type { CalcState, FormatoExportacion, Redondeo } from "../types";

export function Block8Output({
  state,
  patch,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
}) {
  const o = state.output;
  return (
    <Section title="Bloque 8 — Preferencias de salida">
      <Field label="Redondeo de volúmenes" full>
        <Segmented<Redondeo>
          value={o.redondeoVolumenes}
          onChange={(v) => patch("output", { redondeoVolumenes: v })}
          options={[
            { value: "exacto", label: "Exacto" },
            { value: "alza10", label: state.header.unitSystem === "US" ? "Al alza a 10 gal" : "Al alza a 40 L" },
            { value: "alza100", label: state.header.unitSystem === "US" ? "Al alza a 100 gal" : "Al alza a 400 L" },
          ]}
        />
      </Field>
      <Checkbox
        label="Incluir memoria de cálculo detallada"
        checked={o.incluirMemoriaCalculo}
        onChange={(v) => patch("output", { incluirMemoriaCalculo: v })}
      />
      <Checkbox
        label="Incluir constancia de condiciones habilitantes"
        checked={o.incluirConstanciaCondiciones}
        onChange={(v) => patch("output", { incluirConstanciaCondiciones: v })}
      />
      <Field label="Formato de exportación" full>
        <Segmented<FormatoExportacion>
          value={o.formatoExportacion}
          onChange={(v) => patch("output", { formatoExportacion: v })}
          options={[
            { value: "PDF", label: "PDF" },
            { value: "XLSX", label: "XLSX" },
            { value: "Imprimir", label: "Impresión directa" },
          ]}
        />
      </Field>
    </Section>
  );
}
