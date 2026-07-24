import { TIPO_CONCENTRADO_LABEL, UNIT_CONSTANTS } from "../constants";
import { Checkbox, Field, NumberInput, Section, Segmented, Select, TextInput } from "./Fields";
import type { AgenciaListado, CalcState, Dosificacion, TipoConcentrado } from "../types";

export function Block5Foam({
  state,
  patch,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
}) {
  const f = state.foam;
  const uc = UNIT_CONSTANTS[state.header.unitSystem];
  const isSFFF = f.tipoConcentrado === "sfff";

  return (
    <Section title="Bloque 5 — Agente espumante">
      <Field label="Tipo de concentrado" full>
        <Select
          value={f.tipoConcentrado}
          onChange={(e) => patch("foam", { tipoConcentrado: e.target.value as TipoConcentrado })}
        >
          {Object.entries(TIPO_CONCENTRADO_LABEL).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Porcentaje de dosificación" full>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented<Dosificacion>
            value={f.dosificacion}
            onChange={(v) => patch("foam", { dosificacion: v })}
            options={[
              { value: 1, label: "1 %" },
              { value: 3, label: "3 %" },
              { value: 6, label: "6 %" },
              { value: "custom", label: "Personalizado" },
            ]}
          />
          {f.dosificacion === "custom" && (
            <NumberInput
              unit="%"
              className="w-28"
              value={f.dosificacionCustom ?? ""}
              onChange={(e) =>
                patch("foam", { dosificacionCustom: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          )}
        </div>
      </Field>

      {isSFFF && (
        <Field
          label="Tasa según listado / recomendación del fabricante (Anexo H)"
          full
          help="Regla especial: al seleccionar SFFF, la tasa proviene del listado del fabricante y el modo pasa a manual."
        >
          <NumberInput
            unit={state.header.unitSystem === "US" ? "gpm/ft²" : "L/min·m²"}
            value={f.tasaSFFFManual ?? ""}
            onChange={(e) =>
              patch("foam", { tasaSFFFManual: e.target.value === "" ? null : Number(e.target.value) })
            }
          />
        </Field>
      )}

      <Checkbox
        label="Listado para aplicación por chorro de monitor o manguera"
        checked={f.listadoAplicacionChorro}
        onChange={(v) => patch("foam", { listadoAplicacionChorro: v })}
      />
      <Field label="Agencia de listado">
        <Select
          value={f.agenciaListado}
          onChange={(e) => patch("foam", { agenciaListado: e.target.value as AgenciaListado })}
        >
          <option value="UL">UL</option>
          <option value="FM">FM</option>
          <option value="LASTFIRE">LASTFIRE</option>
          <option value="otra">Otra</option>
        </Select>
      </Field>
      <Field label="Marca y modelo" full help="Trazabilidad">
        <TextInput value={f.marcaModelo} onChange={(e) => patch("foam", { marcaModelo: e.target.value })} />
      </Field>
      <p className="sm:col-span-2 text-[11px] text-slate-500">
        Sistema de unidades activo: {state.header.unitSystem} — {uc.flowUnit}, {uc.volumeUnit}.
      </p>
    </Section>
  );
}
