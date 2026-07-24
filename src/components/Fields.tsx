import type { ReactNode } from "react";

export function Section({
  title,
  subtitle,
  normRef: refText,
  children,
  tone = "default",
}: {
  title: string;
  subtitle?: string;
  normRef?: string;
  children: ReactNode;
  tone?: "default" | "critical";
}) {
  return (
    <section
      className={`rounded-xl border ${
        tone === "critical"
          ? "border-amber-500/30 bg-amber-950/10"
          : "border-slate-800 bg-slate-900/40"
      } p-5 shadow-sm`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
        {refText && (
          <span className="shrink-0 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-400">
            {refText}
          </span>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function Field({
  label,
  help,
  full,
  readOnly,
  children,
}: {
  label: string;
  help?: string;
  full?: boolean;
  readOnly?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
        {label}
        {readOnly && (
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-normal uppercase tracking-wide text-slate-500">
            Solo lectura
          </span>
        )}
      </span>
      {children}
      {help && <span className="text-[11px] leading-snug text-slate-500">{help}</span>}
    </label>
  );
}

const inputBase =
  "w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function NumberInput({
  unit,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { unit?: string }) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        {...props}
        className={`${inputBase} ${unit ? "pr-14" : ""} ${props.className ?? ""}`}
      />
      {unit && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
          {unit}
        </span>
      )}
    </div>
  );
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputBase} ${props.className ?? ""}`}>
      {children}
    </select>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  critical,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  critical?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5 text-sm text-slate-200 transition hover:border-slate-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`mt-0.5 h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-900 ${
          critical ? "accent-amber-500" : "accent-orange-500"
        }`}
      />
      <span>{label}</span>
    </label>
  );
}

export function Toggle<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-slate-700 bg-slate-950/60 p-1 text-sm">
      {options.map((opt) => (
        <button
          type="button"
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-3 py-1.5 font-medium transition ${
            value === opt.value
              ? "bg-orange-500 text-slate-950"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          type="button"
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            value === opt.value
              ? "border-orange-400 bg-orange-500/15 text-orange-300"
              : "border-slate-700 bg-slate-950/40 text-slate-400 hover:border-slate-500 hover:text-slate-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function SliderField({
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-orange-500"
      />
      <span className="w-16 shrink-0 text-right font-mono text-sm text-slate-200">
        {value}
        {unit}
      </span>
    </div>
  );
}

export function ReadOnlyValue({ value, unit }: { value: string | number | null; unit?: string }) {
  return (
    <div className="flex items-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
      <span className="font-mono">{value ?? "—"}</span>
      {unit && value != null && <span className="ml-1.5 text-slate-500">{unit}</span>}
    </div>
  );
}
