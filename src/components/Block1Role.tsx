import { Checkbox, Field, NumberInput, Section, Segmented, TextInput } from "./Fields";
import { dispositivoIncluyeMonitores } from "../engine";
import type { CalcState, Rol, TipoDispositivo } from "../types";

export function Block1Role({
  state,
  patch,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
}) {
  const r = state.role;
  const esPrimario = r.rol === "primario";
  const incluyeMonitores = dispositivoIncluyeMonitores(r.tipoDispositivo);
  const mostrarCondiciones = esPrimario && incluyeMonitores;

  return (
    <div className="flex flex-col gap-4">
      <Section
        title="3.1 Rol asignado al sistema"
        subtitle="Este bloque es la compuerta de validación más crítica del módulo."
        tone="critical"
      >
        <Field label="Rol del sistema" full>
          <Segmented<Rol>
            value={r.rol}
            onChange={(v) => patch("role", { rol: v })}
            options={[
              { value: "primario", label: "Medio primario de protección (§ 5.2.4.1)" },
              { value: "suplementario", label: "Suplementario de sistema fijo (§ 5.9.2)" },
              { value: "apoyo_manual", label: "Apoyo manual de brigada — informativo" },
            ]}
          />
        </Field>
      </Section>

      <Section title="3.2 Tipo de dispositivo">
        <Field label="Tipo de dispositivo" full>
          <Segmented<TipoDispositivo>
            value={r.tipoDispositivo}
            onChange={(v) => patch("role", { tipoDispositivo: v })}
            options={[
              { value: "monitores", label: "Monitores de espuma" },
              { value: "mangueras", label: "Líneas de manguera" },
              { value: "combinacion", label: "Combinación de ambos" },
            ]}
          />
        </Field>
      </Section>

      {mostrarCondiciones && (
        <Section
          title="3.3 Condiciones habilitantes para monitores como medio primario"
          subtitle="Las condiciones son obligatorias y simultáneas."
          normRef="§ 5.2.4.1.1"
          tone="critical"
        >
          <Checkbox
            label="Sistema portátil, móvil o semifijo declarado"
            checked={r.sistemaPortatil}
            onChange={(v) => patch("role", { sistemaPortatil: v })}
          />
          <Field label="Tiempo de puesta en servicio" help="Bloqueo si supera 4 horas">
            <NumberInput
              unit="h"
              value={r.tiempoPuestaServicio ?? ""}
              onChange={(e) =>
                patch("role", { tiempoPuestaServicio: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Checkbox
            label="Suministro de agua contra incendio adecuado"
            checked={r.suministroAguaAdecuado}
            onChange={(v) => patch("role", { suministroAguaAdecuado: v })}
          />
          <Checkbox
            label="Suministro de concentrado de espuma adecuado"
            checked={r.suministroConcentradoAdecuado}
            onChange={(v) => patch("role", { suministroConcentradoAdecuado: v })}
          />
          <Checkbox
            label="Evaluación de riesgo completada"
            checked={r.evaluacionRiesgoCompleta}
            onChange={(v) => patch("role", { evaluacionRiesgoCompleta: v })}
          />
          <Field label="Referencia de documento de evaluación de riesgo">
            <TextInput
              value={r.evaluacionRiesgoDoc}
              onChange={(e) => patch("role", { evaluacionRiesgoDoc: e.target.value })}
              placeholder="N.º de documento"
            />
          </Field>
          <Checkbox
            label="Plan de contingencia pre-incidente completado"
            checked={r.planContingenciaCompleto}
            onChange={(v) => patch("role", { planContingenciaCompleto: v })}
          />
          <Field label="Referencia de plan de contingencia">
            <TextInput
              value={r.planContingenciaDoc}
              onChange={(e) => patch("role", { planContingenciaDoc: e.target.value })}
              placeholder="N.º de documento"
            />
          </Field>
          <Checkbox
            label="Aprobación de la autoridad competente"
            checked={r.aprobacionAutoridad}
            onChange={(v) => patch("role", { aprobacionAutoridad: v })}
          />
          <Field label="N.º de aprobación">
            <TextInput
              value={r.aprobacionAutoridadRef}
              onChange={(e) => patch("role", { aprobacionAutoridadRef: e.target.value })}
              placeholder="Registrar número de aprobación"
            />
          </Field>
        </Section>
      )}

      <Section title="3.5 Exclusiones generales">
        <Checkbox
          label="Tanque horizontal o presurizado (fuera de alcance como medio primario, § 5.2.3)"
          checked={r.tanqueHorizontalPresurizado}
          onChange={(v) => patch("role", { tanqueHorizontalPresurizado: v })}
          critical
        />
        <Checkbox
          label="Techo flotante abierto o interno (redirigir a § 5.3 / § 5.4)"
          checked={r.techoFlotante}
          onChange={(v) => patch("role", { techoFlotante: v })}
          critical
        />
      </Section>
    </div>
  );
}
