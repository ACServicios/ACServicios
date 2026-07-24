import { Field, Section, TextInput, Toggle } from "./Fields";
import type { CalcState, UnitSystem } from "../types";

export function Block0Header({
  state,
  patch,
  onUnitChange,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
  onUnitChange: (v: UnitSystem) => void;
}) {
  const h = state.header;
  return (
    <Section title="Bloque 0 — Encabezado del cálculo">
      <Field label="Proyecto / Cliente">
        <TextInput
          value={h.proyecto}
          onChange={(e) => patch("header", { proyecto: e.target.value })}
          placeholder="Libre"
        />
      </Field>
      <Field label="Tag del tanque o área" help="Ej.: TK-101">
        <TextInput
          value={h.tag}
          onChange={(e) => patch("header", { tag: e.target.value })}
          placeholder="TK-101"
        />
      </Field>
      <Field label="Revisión">
        <TextInput value={h.revision} onChange={(e) => patch("header", { revision: e.target.value })} />
      </Field>
      <Field label="Fecha">
        <TextInput
          type="date"
          value={h.fecha}
          onChange={(e) => patch("header", { fecha: e.target.value })}
        />
      </Field>
      <Field label="Diseñador / Revisor">
        <TextInput
          value={h.disenador}
          onChange={(e) => patch("header", { disenador: e.target.value })}
          placeholder="Libre"
        />
      </Field>
      <Field label="Sistema de unidades" help="Los valores numéricos ya cargados se convierten automáticamente.">
        <Toggle<UnitSystem>
          value={h.unitSystem}
          onChange={onUnitChange}
          options={[
            { value: "US", label: "US (ft, gpm, gal)" },
            { value: "SI", label: "SI (m, L/min, L)" },
          ]}
        />
      </Field>
    </Section>
  );
}
