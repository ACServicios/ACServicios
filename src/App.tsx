import { useMemo, useState } from "react";
import { Block0Header } from "./components/Block0Header";
import { Block1Role } from "./components/Block1Role";
import { Block2Geometry } from "./components/Block2Geometry";
import { Block3Product } from "./components/Block3Product";
import { Block4Factor } from "./components/Block4Factor";
import { Block5Foam } from "./components/Block5Foam";
import { Block6Equipment } from "./components/Block6Equipment";
import { Block7Supplies } from "./components/Block7Supplies";
import { Block8Output } from "./components/Block8Output";
import { GlobalActions } from "./components/GlobalActions";
import { ResultsPanel } from "./components/ResultsPanel";
import { ValidationsPanel } from "./components/ValidationsPanel";
import { convertUnits } from "./convert";
import { computeResults, computeValidations } from "./engine";
import { createInitialState, PLANTILLAS } from "./state";
import type { CalcState, UnitSystem } from "./types";

const NAV = [
  { id: "block-0", label: "0 · Encabezado" },
  { id: "block-1", label: "1 · Rol y limitaciones" },
  { id: "block-2", label: "2 · Geometría" },
  { id: "block-3", label: "3 · Producto almacenado" },
  { id: "block-4", label: "4 · Factor de mayoración" },
  { id: "block-5", label: "5 · Agente espumante" },
  { id: "block-6", label: "6 · Equipos de aplicación" },
  { id: "block-7", label: "7 · Suministros y reserva" },
  { id: "block-8", label: "8 · Preferencias de salida" },
];

function App() {
  const [state, setState] = useState<CalcState>(createInitialState);
  const [lastCalculatedAt, setLastCalculatedAt] = useState<string | null>(null);

  const patch = <K extends keyof CalcState>(block: K, p: Partial<CalcState[K]>) => {
    setLastCalculatedAt(null);
    setState((prev) => ({ ...prev, [block]: { ...prev[block], ...p } }));
  };

  const handleUnitChange = (unit: UnitSystem) => {
    setLastCalculatedAt(null);
    setState((prev) => convertUnits(prev, unit));
  };

  const results = useMemo(() => computeResults(state), [state]);
  const validations = useMemo(() => computeValidations(state, results), [state, results]);
  const bloqueos = validations.filter((v) => v.severity === "bloqueo");
  const advertencias = validations.filter((v) => v.severity === "advertencia");

  const handleCalcular = () => {
    if (bloqueos.length > 0) return;
    setLastCalculatedAt(new Date().toLocaleString());
  };

  const handleLimpiar = () => {
    if (window.confirm("¿Reiniciar todos los campos del cálculo? Esta acción no se puede deshacer.")) {
      setState(createInitialState());
      setLastCalculatedAt(null);
    }
  };

  const handleGuardar = () => {
    const nombre = window.prompt("Nombre del escenario a guardar:", state.header.tag || "escenario");
    if (!nombre) return;
    const raw = window.localStorage.getItem("nfpa11-5-2-4-escenarios");
    const escenarios = raw ? JSON.parse(raw) : {};
    escenarios[nombre] = state;
    window.localStorage.setItem("nfpa11-5-2-4-escenarios", JSON.stringify(escenarios));
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nombre}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCargarPlantilla = (id: string) => {
    const plantilla = PLANTILLAS[id];
    if (!plantilla) return;
    setState((prev) => ({ ...prev, ...plantilla }));
    setLastCalculatedAt(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <h1 className="text-base font-semibold text-slate-100">
              Módulo 5.2.4 — Monitores y líneas de manguera de espuma
            </h1>
            <p className="text-xs text-slate-500">
              NFPA 11 (2021) — Design Criteria for Foam Monitors and Handlines
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastCalculatedAt && (
              <span className="rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3 py-1 text-xs text-emerald-300">
                Calculado {lastCalculatedAt}
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                bloqueos.length > 0
                  ? "border border-red-500/30 bg-red-950/20 text-red-300"
                  : advertencias.length > 0
                    ? "border border-amber-500/30 bg-amber-950/20 text-amber-300"
                    : "border border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
              }`}
            >
              {bloqueos.length > 0
                ? `${bloqueos.length} bloqueo(s)`
                : advertencias.length > 0
                  ? `${advertencias.length} advertencia(s)`
                  : "Listo para calcular"}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 sm:px-6">
        <nav className="sticky top-[73px] hidden h-[calc(100vh-93px)] w-48 shrink-0 flex-col gap-1 overflow-y-auto lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-900 hover:text-slate-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <main className="flex min-w-0 flex-1 flex-col gap-6">
          <div id="block-0" className="scroll-mt-24">
            <Block0Header state={state} patch={patch} onUnitChange={handleUnitChange} />
          </div>
          <div id="block-1" className="scroll-mt-24">
            <Block1Role state={state} patch={patch} />
          </div>
          <div id="block-2" className="scroll-mt-24">
            <Block2Geometry state={state} patch={patch} results={results} />
          </div>
          <div id="block-3" className="scroll-mt-24">
            <Block3Product state={state} patch={patch} />
          </div>
          <div id="block-4" className="scroll-mt-24">
            <Block4Factor state={state} patch={patch} results={results} />
          </div>
          <div id="block-5" className="scroll-mt-24">
            <Block5Foam state={state} patch={patch} />
          </div>
          <div id="block-6" className="scroll-mt-24">
            <Block6Equipment state={state} patch={patch} />
          </div>
          <div id="block-7" className="scroll-mt-24">
            <Block7Supplies state={state} patch={patch} />
          </div>
          <div id="block-8" className="scroll-mt-24">
            <Block8Output state={state} patch={patch} />
          </div>
        </main>

        <aside className="sticky top-[73px] hidden h-[calc(100vh-93px)] w-96 shrink-0 flex-col gap-4 overflow-y-auto xl:flex">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <GlobalActions
              disabledCalcular={bloqueos.length > 0}
              onCalcular={handleCalcular}
              onLimpiar={handleLimpiar}
              onGuardar={handleGuardar}
              onCargarPlantilla={handleCargarPlantilla}
              bloqueos={bloqueos}
            />
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-200">Resultados</h3>
            <ResultsPanel state={state} results={results} />
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">
              Panel de validaciones y alertas
            </h3>
            <ValidationsPanel items={validations} />
          </div>
        </aside>
      </div>

      {/* Panel móvil: resultados y validaciones debajo del formulario en pantallas angostas */}
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 pb-8 sm:px-6 xl:hidden">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <GlobalActions
            disabledCalcular={bloqueos.length > 0}
            onCalcular={handleCalcular}
            onLimpiar={handleLimpiar}
            onGuardar={handleGuardar}
            onCargarPlantilla={handleCargarPlantilla}
            bloqueos={bloqueos}
          />
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-200">Resultados</h3>
          <ResultsPanel state={state} results={results} />
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">
            Panel de validaciones y alertas
          </h3>
          <ValidationsPanel items={validations} />
        </div>
      </div>
    </div>
  );
}

export default App;
