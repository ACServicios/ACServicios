import type { ValidationItem } from "../types";

const SEVERITY_CONFIG = {
  bloqueo: {
    label: "Bloqueos",
    dot: "bg-red-500",
    text: "text-red-300",
    box: "border-red-500/30 bg-red-950/20",
  },
  advertencia: {
    label: "Advertencias",
    dot: "bg-amber-400",
    text: "text-amber-300",
    box: "border-amber-500/30 bg-amber-950/10",
  },
  info: {
    label: "Avisos informativos",
    dot: "bg-sky-400",
    text: "text-sky-300",
    box: "border-sky-500/20 bg-sky-950/10",
  },
} as const;

export function ValidationsPanel({ items }: { items: ValidationItem[] }) {
  const groups: Record<string, ValidationItem[]> = {
    bloqueo: items.filter((i) => i.severity === "bloqueo"),
    advertencia: items.filter((i) => i.severity === "advertencia"),
    info: items.filter((i) => i.severity === "info"),
  };

  return (
    <div className="flex flex-col gap-3">
      {(["bloqueo", "advertencia", "info"] as const).map((sev) => {
        const cfg = SEVERITY_CONFIG[sev];
        const list = groups[sev];
        if (list.length === 0) return null;
        return (
          <div key={sev} className={`rounded-lg border ${cfg.box} p-3`}>
            <div className={`mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${cfg.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label} ({list.length})
            </div>
            <ul className="flex flex-col gap-1.5">
              {list.map((item) => (
                <li key={item.id} className="text-xs leading-snug text-slate-300">
                  {item.message}
                  {item.ref && <span className="ml-1 font-mono text-slate-500">[{item.ref}]</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {groups.bloqueo.length === 0 && groups.advertencia.length === 0 && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-3 text-xs text-emerald-300">
          Sin bloqueos ni advertencias activas.
        </div>
      )}
    </div>
  );
}
