import { useEffect, useState } from "react";
import { Settings2, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";

type Settings = {
  contrast: boolean;
  fontSize: "sm" | "base" | "lg" | "xl";
  reduceMotion: boolean;
  skipSensitive: boolean;
  dyslexia: boolean;
};

const DEFAULTS: Settings = {
  contrast: false,
  fontSize: "base",
  reduceMotion: false,
  skipSensitive: false,
  dyslexia: false,
};

const STORAGE_KEY = "abrazo-a11y";

const load = (): Settings => {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
};

const apply = (s: Settings) => {
  const root = document.documentElement;
  root.style.fontSize = { sm: "14px", base: "16px", lg: "18px", xl: "20px" }[s.fontSize];
  document.body.classList.toggle("a11y-contrast", s.contrast);
  document.body.classList.toggle("a11y-reduce-motion", s.reduceMotion);
  document.body.classList.toggle("a11y-skip-sensitive", s.skipSensitive);
  document.body.classList.toggle("a11y-dyslexia", s.dyslexia);
};

const AccessibilityPanel = () => {
  const { t } = useLang();
  const a = t.a11y!;
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    apply(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const toggle = (key: keyof Settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] } as Settings));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={a.open}
        className="fixed bottom-5 right-5 z-50 glass-strong laser-border rounded-full w-12 h-12 flex items-center justify-center text-foreground/70 hover:text-laser transition-all"
      >
        <Settings2 className="w-4 h-4" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-end md:items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-strong laser-border rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="mono text-xs tracking-wider-2 text-foreground/80 uppercase">{a.title}</h3>
              <button onClick={() => setOpen(false)} aria-label={a.close} className="text-foreground/60 hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <Toggle label={a.contrast} value={settings.contrast} onChange={() => toggle("contrast")} />
            <Toggle label={a.reduceMotion} value={settings.reduceMotion} onChange={() => toggle("reduceMotion")} />
            <Toggle label={a.skipSensitive} value={settings.skipSensitive} onChange={() => toggle("skipSensitive")} />
            <Toggle label={a.dyslexia} value={settings.dyslexia} onChange={() => toggle("dyslexia")} />

            <div>
              <p className="mono text-[10px] tracking-wider-2 text-foreground/50 uppercase mb-2">{a.fontSize}</p>
              <div className="flex gap-2">
                {(["sm", "base", "lg", "xl"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSettings((s) => ({ ...s, fontSize: sz }))}
                    className={`flex-1 py-2 rounded-full mono text-[10px] tracking-wider-2 border transition-all ${
                      settings.fontSize === sz
                        ? "border-primary/60 text-primary bg-primary/10"
                        : "border-foreground/15 text-foreground/60"
                    }`}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSettings(DEFAULTS)}
              className="w-full py-2 mono text-[10px] tracking-wider-2 text-foreground/60 hover:text-foreground border border-foreground/15 rounded-full uppercase"
            >
              {a.reset}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) => (
  <button onClick={onChange} className="w-full flex items-center justify-between py-2">
    <span className="text-foreground/80 text-sm text-left">{label}</span>
    <span
      className={`relative w-10 h-5 rounded-full transition-all ${value ? "bg-primary/70" : "bg-foreground/15"}`}
      aria-pressed={value}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-foreground rounded-full transition-all ${value ? "left-5" : "left-0.5"}`} />
    </span>
  </button>
);

export default AccessibilityPanel;
