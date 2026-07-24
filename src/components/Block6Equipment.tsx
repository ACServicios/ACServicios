import { UNIT_CONSTANTS } from "../constants";
import { dispositivoIncluyeMangueras, dispositivoIncluyeMonitores } from "../engine";
import { Checkbox, Field, NumberInput, Section, Select } from "./Fields";
import type { CalcState, MetodoDosificacion, TipoBoquilla, TipoMonitor } from "../types";

export function Block6Equipment({
  state,
  patch,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
}) {
  const uc = UNIT_CONSTANTS[state.header.unitSystem];
  const m = state.monitores;
  const h = state.mangueras;
  const showMonitores = dispositivoIncluyeMonitores(state.role.tipoDispositivo);
  const showMangueras = dispositivoIncluyeMangueras(state.role.tipoDispositivo);

  return (
    <div className="flex flex-col gap-4">
      {showMonitores && (
        <Section title="8.1 Monitores">
          <Field label="Cantidad de monitores" help="Mínimo 1; el conjunto debe cubrir el caudal total mayorado">
            <NumberInput
              min={1}
              step={1}
              value={m.cantidadMonitores}
              onChange={(e) => patch("monitores", { cantidadMonitores: Math.max(1, Number(e.target.value)) })}
            />
          </Field>
          <Field label="Tipo">
            <Select value={m.tipoMonitor} onChange={(e) => patch("monitores", { tipoMonitor: e.target.value as TipoMonitor })}>
              <option value="fijo">Fijo</option>
              <option value="portatil">Portátil</option>
              <option value="remolcable">Remolcable</option>
              <option value="telecomandado">Telecomandado</option>
            </Select>
          </Field>
          <Field label="Caudal nominal por monitor" help="Debe estar dentro del rango listado del modelo">
            <NumberInput
              unit={uc.flowUnit}
              value={m.caudalNominalPorMonitor ?? ""}
              onChange={(e) =>
                patch("monitores", { caudalNominalPorMonitor: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Field label="Alcance efectivo con espuma" help="Alerta si es menor que distancia de emplazamiento + radio del tanque">
            <NumberInput
              unit={uc.lengthUnit}
              value={m.alcanceEfectivoEspuma ?? ""}
              onChange={(e) =>
                patch("monitores", { alcanceEfectivoEspuma: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Field label="Presión requerida en boquilla" help="Se verifica contra la presión disponible">
            <NumberInput
              unit={uc.pressureUnit}
              value={m.presionRequeridaBoquilla ?? ""}
              onChange={(e) =>
                patch("monitores", { presionRequeridaBoquilla: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Checkbox
            label="Ubicación fuera del dique"
            checked={m.ubicacionFueraDique}
            onChange={(v) => patch("monitores", { ubicacionFueraDique: v })}
          />
        </Section>
      )}

      {showMangueras && (
        <Section title="8.2 Líneas de manguera">
          <Field label="Cantidad de líneas" help="Se compara con el mínimo de § 5.9 si el rol es suplementario">
            <NumberInput
              min={0}
              step={1}
              value={h.cantidadLineas}
              onChange={(e) => patch("mangueras", { cantidadLineas: Math.max(0, Number(e.target.value)) })}
            />
          </Field>
          <Field label="Caudal por línea" help={`Mínimo ${uc.caudalLineaMin} ${uc.flowUnit} como protección suplementaria`}>
            <NumberInput
              unit={uc.flowUnit}
              value={h.caudalPorLinea ?? ""}
              onChange={(e) =>
                patch("mangueras", { caudalPorLinea: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Field label="Tipo de boquilla">
            <Select value={h.tipoBoquilla} onChange={(e) => patch("mangueras", { tipoBoquilla: e.target.value as TipoBoquilla })}>
              <option value="aspirante">Aspirante de aire</option>
              <option value="no_aspirante">No aspirante</option>
              <option value="autoeductora">Autoeductora</option>
            </Select>
          </Field>
          <Field label="Longitud de tendido" help="Alimenta el cálculo de pérdidas de carga">
            <NumberInput
              unit={uc.lengthUnit}
              value={h.longitudTendido ?? ""}
              onChange={(e) =>
                patch("mangueras", { longitudTendido: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Field label="Método de dosificación en línea">
            <Select
              value={h.metodoDosificacion}
              onChange={(e) => patch("mangueras", { metodoDosificacion: e.target.value as MetodoDosificacion })}
            >
              <option value="eductor_linea">Eductor en línea</option>
              <option value="alrededor_bomba">Alrededor de la bomba</option>
              <option value="preproporcionado">Preproporcionado</option>
            </Select>
          </Field>
          <Field label="Personal disponible por línea" help="Alerta si es inferior a dos operadores por línea">
            <NumberInput
              value={h.personalDisponiblePorLinea ?? ""}
              onChange={(e) =>
                patch("mangueras", {
                  personalDisponiblePorLinea: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </Field>
        </Section>
      )}
    </div>
  );
}
