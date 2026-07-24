import { UNIT_CONSTANTS } from "../constants";
import { Field, NumberInput, ReadOnlyValue, Section, Toggle } from "./Fields";
import type { CalcResults, CalcState, ModoEntradaGeometria } from "../types";

export function Block2Geometry({
  state,
  patch,
  results,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
  results: CalcResults;
}) {
  const g = state.geometry;
  const uc = UNIT_CONSTANTS[state.header.unitSystem];

  return (
    <Section title="Bloque 2 — Geometría del área a proteger">
      <Field label="Modo de entrada" full>
        <Toggle<ModoEntradaGeometria>
          value={g.modoEntrada}
          onChange={(v) => patch("geometry", { modoEntrada: v })}
          options={[
            { value: "diametro", label: "Por diámetro de tanque" },
            { value: "area", label: "Por área directa" },
          ]}
        />
      </Field>

      {g.modoEntrada === "diametro" ? (
        <>
          <Field label="Diámetro del tanque">
            <NumberInput
              unit={uc.lengthUnit}
              value={g.diametroTanque ?? ""}
              onChange={(e) =>
                patch("geometry", { diametroTanque: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Field label="Área de líquido" readOnly help="A = π · D² / 4">
            <ReadOnlyValue value={results.areaLiquido} unit={uc.areaUnit} />
          </Field>
        </>
      ) : (
        <Field label="Área de líquido">
          <NumberInput
            unit={uc.areaUnit}
            value={g.areaLiquidoManual ?? ""}
            onChange={(e) =>
              patch("geometry", { areaLiquidoManual: e.target.value === "" ? null : Number(e.target.value) })
            }
          />
        </Field>
      )}

      <Field
        label="Altura de envolvente"
        help="Interviene en la restricción de mangueras y en el alcance requerido"
      >
        <NumberInput
          unit={uc.lengthUnit}
          value={g.alturaEnvolvente ?? ""}
          onChange={(e) =>
            patch("geometry", { alturaEnvolvente: e.target.value === "" ? null : Number(e.target.value) })
          }
        />
      </Field>
      <Field label="Distancia de emplazamiento del dispositivo" help="Se compara contra el alcance efectivo declarado">
        <NumberInput
          unit={uc.lengthUnit}
          value={g.distanciaEmplazamiento ?? ""}
          onChange={(e) =>
            patch("geometry", {
              distanciaEmplazamiento: e.target.value === "" ? null : Number(e.target.value),
            })
          }
        />
      </Field>
    </Section>
  );
}
