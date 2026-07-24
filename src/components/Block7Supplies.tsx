import { UNIT_CONSTANTS } from "../constants";
import { Field, NumberInput, Section, Segmented, Select } from "./Fields";
import type { CalcState, FormaReserva, FuenteAgua, ReservaConcentrado } from "../types";

export function Block7Supplies({
  state,
  patch,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
}) {
  const s = state.supplies;
  const uc = UNIT_CONSTANTS[state.header.unitSystem];

  return (
    <Section title="Bloque 7 — Suministros y reserva">
      <Field label="Reserva de concentrado" full>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented<ReservaConcentrado>
            value={s.reservaConcentrado}
            onChange={(v) => patch("supplies", { reservaConcentrado: v })}
            options={[
              { value: 0, label: "0 %" },
              { value: 100, label: "100 %" },
              { value: "custom", label: "Personalizado" },
            ]}
          />
          {s.reservaConcentrado === "custom" && (
            <NumberInput
              unit="%"
              className="w-28"
              value={s.reservaConcentradoCustom ?? ""}
              onChange={(e) =>
                patch("supplies", {
                  reservaConcentradoCustom: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          )}
        </div>
      </Field>
      <Field label="Forma de la reserva" full>
        <Select
          value={s.formaReserva}
          onChange={(e) => patch("supplies", { formaReserva: e.target.value as FormaReserva })}
        >
          <option value="tanque_separado">Tanque separado</option>
          <option value="compartimento_separado">Compartimento separado</option>
          <option value="suministro_externo">Suministro externo aceptado por la autoridad competente</option>
        </Select>
      </Field>
      <Field label="Caudal de agua disponible" help="Alerta si es inferior a la demanda mayorada">
        <NumberInput
          unit={uc.flowUnit}
          value={s.caudalAguaDisponible ?? ""}
          onChange={(e) =>
            patch("supplies", { caudalAguaDisponible: e.target.value === "" ? null : Number(e.target.value) })
          }
        />
      </Field>
      <Field label="Presión disponible" help="Verificación contra la presión requerida en boquilla más pérdidas">
        <NumberInput
          unit={uc.pressureUnit}
          value={s.presionDisponible ?? ""}
          onChange={(e) =>
            patch("supplies", { presionDisponible: e.target.value === "" ? null : Number(e.target.value) })
          }
        />
      </Field>
      <Field label="Fuente de agua">
        <Select value={s.fuenteAgua} onChange={(e) => patch("supplies", { fuenteAgua: e.target.value as FuenteAgua })}>
          <option value="red_ci">Red contra incendio</option>
          <option value="tanque_dedicado">Tanque dedicado</option>
          <option value="bomba_movil">Bomba móvil</option>
          <option value="fuente_abierta">Fuente abierta</option>
        </Select>
      </Field>
      <Field label="Autonomía del suministro" help="Bloqueo si es menor que el tiempo de descarga adoptado">
        <NumberInput
          unit="min"
          value={s.autonomiaSuministro ?? ""}
          onChange={(e) =>
            patch("supplies", { autonomiaSuministro: e.target.value === "" ? null : Number(e.target.value) })
          }
        />
      </Field>
    </Section>
  );
}
