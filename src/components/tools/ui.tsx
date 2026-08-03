import { ReactNode, useEffect, useState } from "react";

export const TPanel = ({
  children,
  className = "",
  laser = false,
}: {
  children: ReactNode;
  className?: string;
  laser?: boolean;
}) => (
  <div className={`${laser ? "glass-laser" : "glass"} laser-border rounded-3xl p-5 md:p-7 ${className}`}>
    {children}
  </div>
);

export const Label = ({ children }: { children: ReactNode }) => (
  <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-2">{children}</p>
);

export const Field = ({
  label,
  hint,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-light text-foreground/90 mb-1">{label}</label>
    {hint && <p className="text-foreground/40 text-xs leading-relaxed mb-2">{hint}</p>}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full glass rounded-2xl border border-foreground/10 bg-transparent px-4 py-3 text-sm text-foreground/90 placeholder:text-foreground/30 leading-relaxed focus:outline-none focus:border-primary/40 transition-colors resize-y"
    />
  </div>
);

export const Btn = ({
  children,
  onClick,
  variant = "ghost",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ghost" | "laser";
  disabled?: boolean;
  type?: "button" | "submit";
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`press-spring inline-flex items-center gap-2 rounded-full px-4 py-2 mono text-[11px] tracking-wider-2 uppercase transition-all disabled:opacity-40 disabled:pointer-events-none ${
      variant === "laser"
        ? "border border-primary/40 text-foreground/90 hover:text-laser hover:border-primary/70"
        : "border border-foreground/10 text-foreground/55 hover:text-foreground/90 hover:border-foreground/25"
    }`}
  >
    {children}
  </button>
);

/** Persistencia local: nada sale del dispositivo. */
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [key, value]);
  return [value, setValue] as const;
}