import { CATEGORIA_HIDROCARBURO_LABEL, UNIT_CONSTANTS } from "../constants";
import { Checkbox, Field, NumberInput, Section, Segmented, SliderField } from "./Fields";
import type { CalcState, CategoriaHidrocarburo, FamiliaProducto } from "../types";

export function Block3Product({
  state,
  patch,
}: {
  state: CalcState;
  patch: <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => void;
}) {
  const p = state.product;
  const uc = UNIT_CONSTANTS[state.header.unitSystem];

  return (
    <div className="flex flex-col gap-4">
      <Section title="5.1 Familia de producto">
        <Field label="Familia de producto" full>
          <Segmented<FamiliaProducto>
            value={p.familiaProducto}
            onChange={(v) => patch("product", { familiaProducto: v })}
            options={[
              { value: "hidrocarburo", label: "Hidrocarburo — Tabla 5.2.4.2.2" },
              { value: "alcohol", label: "Requiere espuma resistente al alcohol" },
            ]}
          />
        </Field>
      </Section>

      {p.familiaProducto === "hidrocarburo" ? (
        <Section title="5.2 Categoría del hidrocarburo" normRef="Tabla 5.2.4.2.2">
          <Field label="Categoría" full>
            <Segmented<CategoriaHidrocarburo>
              value={p.categoriaHidrocarburo}
              onChange={(v) => patch("product", { categoriaHidrocarburo: v })}
              options={[
                { value: "cat_100_140", label: "100–140 °F (38–60 °C) · 50 min" },
                { value: "cat_below_100", label: "< 100 °F (38 °C) o sobre punto de inflamación · 65 min" },
                { value: "crudo", label: "Petróleo crudo · 65 min" },
              ]}
            />
          </Field>
          <p className="sm:col-span-2 text-[11px] text-slate-500">
            {CATEGORIA_HIDROCARBURO_LABEL[p.categoriaHidrocarburo]} — tasa de tabla{" "}
            {uc.tasaTablaBase} {state.header.unitSystem === "US" ? "gpm/ft²" : "L/min·m²"}.
          </p>
        </Section>
      ) : (
        <Section title="5.3 Líquidos que requieren espuma resistente al alcohol">
          <Field label="Tasa de aplicación" help="Según listado del producto; no hay valor tabulado en la norma">
            <NumberInput
              unit={state.header.unitSystem === "US" ? "gpm/ft²" : "L/min·m²"}
              value={p.tasaAplicacionManual ?? ""}
              onChange={(e) =>
                patch("product", { tasaAplicacionManual: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>
          <Field
            label="Tiempo de operación"
            help="65 minutos, salvo que el fabricante haya establecido por ensayo de fuego un tiempo menor"
          >
            <NumberInput
              unit="min"
              placeholder="65"
              value={p.tiempoOperacionManual ?? ""}
              onChange={(e) =>
                patch("product", {
                  tiempoOperacionManual: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </Field>
          <Field label="Ensayo de fuego que respalda un tiempo menor" help="Obligatoria si se reduce el tiempo">
            <input
              type="text"
              placeholder="Referencia del ensayo / documento"
              value={p.ensayoFuegoDoc}
              onChange={(e) => patch("product", { ensayoFuegoDoc: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400/60"
            />
          </Field>
          <Checkbox
            label={`Profundidad del líquido mayor a ${uc.profundidadLiquidoMax} ${uc.depthUnit}`}
            checked={p.profundidadLiquidoMayor1in}
            onChange={(v) => patch("product", { profundidadLiquidoMayor1in: v })}
          />
          {p.profundidadLiquidoMayor1in && (
            <Checkbox
              label="Espuma resistente al alcohol especialmente listada/aprobada para chorros de monitor y manguera"
              checked={p.espumaListadaChorroAlcohol}
              onChange={(v) => patch("product", { espumaListadaChorroAlcohol: v })}
            />
          )}
        </Section>
      )}

      <Section title="5.4 Campos complementarios">
        <Field label="Punto de inflamación real" help="Verifica coherencia con la categoría">
          <NumberInput
            unit={uc.tempUnit}
            value={p.puntoInflamacionReal ?? ""}
            onChange={(e) =>
              patch("product", { puntoInflamacionReal: e.target.value === "" ? null : Number(e.target.value) })
            }
          />
        </Field>
        <Field
          label="Punto de ebullición"
          help={`Si es menor a ${uc.boilingPointThreshold} ${uc.tempUnit}: alerta de posible tasa mayor por ensayo`}
        >
          <NumberInput
            unit={uc.tempUnit}
            value={p.puntoEbullicion ?? ""}
            onChange={(e) =>
              patch("product", { puntoEbullicion: e.target.value === "" ? null : Number(e.target.value) })
            }
          />
        </Field>
        <Checkbox
          label="Rango amplio de destilación"
          checked={p.rangoAmplioDestilacion}
          onChange={(v) => patch("product", { rangoAmplioDestilacion: v })}
        />
        <Field label="Contenido de aditivos oxigenados" help="Si supera 10 % en volumen: sugerencia de ruta alcohol-resistente">
          <SliderField
            value={p.aditivosOxigenados}
            min={0}
            max={30}
            unit="%"
            onChange={(v) => patch("product", { aditivosOxigenados: v })}
          />
        </Field>
        <Field
          label="Temperatura de almacenamiento"
          help={`Si supera ${uc.tempAlmacenamientoMax} ${uc.tempUnit}: alerta de espumado violento`}
        >
          <NumberInput
            unit={uc.tempUnit}
            value={p.temperaturaAlmacenamiento ?? ""}
            onChange={(e) =>
              patch("product", {
                temperaturaAlmacenamiento: e.target.value === "" ? null : Number(e.target.value),
              })
            }
          />
        </Field>
      </Section>
    </div>
  );
}
