import { useState } from "react";
import type { ValidationItem } from "../types";

export function GlobalActions({
  disabledCalcular,
  onCalcular,
  onLimpiar,
  onGuardar,
  onCargarPlantilla,
  bloqueos,
}: {
  disabledCalcular: boolean;
  onCalcular: () => void;
  onLimpiar: () => void;
  onGuardar: () => void;
  onCargarPlantilla: (id: string) => void;
  bloqueos: ValidationItem[];
}) {
  const [showPlantillas, setShowPlantillas] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={disabledCalcular}
        onClick={onCalcular}
        title={disabledCalcular ? `Inhabilitado: ${bloqueos.length} bloqueo(s) activo(s)` : undefined}
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition enabled:hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        Calcular
      </button>
      <button
        type="button"
        onClick={onLimpiar}
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
      >
        Limpiar
      </button>
      <button
        type="button"
        onClick={onGuardar}
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
      >
        Guardar escenario
      </button>
      <button
        type="button"
        disabled
        title="Módulo 5.2.5 (descargadores fijos) no disponible en esta versión"
        className="rounded-lg border border-slate-800 px-4 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed"
      >
        Comparar con módulo 5.2.5
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowPlantillas((v) => !v)}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
        >
          Cargar plantilla ▾
        </button>
        {showPlantillas && (
          <div className="absolute right-0 z-10 mt-1 w-44 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
            {[
              ["crudo", "Crudo"],
              ["gasolina", "Gasolina"],
              ["diesel", "Diésel"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  onCargarPlantilla(id);
                  setShowPlantillas(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
