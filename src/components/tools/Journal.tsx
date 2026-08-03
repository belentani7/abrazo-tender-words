import { useMemo, useState } from "react";
import { Plus, Trash2, Download, LineChart, FileJson } from "lucide-react";
import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { TPanel, Btn, Label, Field, useLocalState } from "./ui";

type Entry = {
  id: string;
  date: string;
  emotion: string;
  intensity: number;
  trigger: string;
  thought: string;
  body: string;
  action: string;
  skill: string;
  after: number;
};

const EMOTIONS = [
  "Miedo", "Rabia", "Tristeza", "Vergüenza", "Culpa", "Vacío",
  "Celos", "Ansiedad", "Alivio", "Alegría", "Calma", "Orgullo",
];

const empty = (): Entry => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString(),
  emotion: "Miedo",
  intensity: 6,
  trigger: "",
  thought: "",
  body: "",
  action: "",
  skill: "",
  after: 4,
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

const Journal = () => {
  const [entries, setEntries] = useLocalState<Entry[]>("abrazo-journal", []);
  const [draft, setDraft] = useState<Entry>(empty);
  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    if (entries.length === 0) return null;
    const last14 = entries.slice(0, 14);
    const avg = last14.reduce((s, e) => s + e.intensity, 0) / last14.length;
    const avgAfter = last14.reduce((s, e) => s + e.after, 0) / last14.length;
    const counts = new Map<string, number>();
    entries.forEach((e) => counts.set(e.emotion, (counts.get(e.emotion) ?? 0) + 1));
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
    return { avg, avgAfter, top, n: entries.length };
  }, [entries]);

  const save = () => {
    if (!draft.trigger.trim() && !draft.thought.trim()) return;
    setEntries([{ ...draft, id: crypto.randomUUID(), date: new Date().toISOString() }, ...entries]);
    setDraft(empty());
    setOpen(false);
  };

  const exportTxt = () => {
    const text = entries
      .map(
        (e) =>
          `${fmt(e.date)}\n${e.emotion} · antes ${e.intensity}/10 · después ${e.after}/10\nDisparador: ${e.trigger}\nPensamiento: ${e.thought}\nCuerpo: ${e.body}\nQué hice: ${e.action}\nHabilidad: ${e.skill}\n`,
      )
      .join("\n──────────────\n");
    const blob = new Blob([`DIARIO EMOCIONAL · ABRAZO\n\n${text}`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diario-emocional.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = useMemo(() => {
    return [...entries].reverse().slice(-10).map((e, idx) => ({
      name: `R${idx + 1}`,
      Pico: e.intensity,
      Post: e.after,
      emotion: e.emotion,
    }));
  }, [entries]);

  return (
    <div className="space-y-5">
      <div className="reveal">
        <Label>— Registro · cadena conductual</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-3">Diario emocional</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          El registro es la herramienta que más cambia el pronóstico en DBT: convierte «me desbordo sin motivo» en
          un patrón visible. Anota lo que puedas, cuando puedas. Se guarda solo en tu dispositivo.
        </p>
      </div>

      {stats && (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-3 gap-3 reveal-stagger">
            <TPanel className="hover-lift">
              <p className="mono text-[10px] tracking-wider-2 text-foreground/40 uppercase mb-1">Registros</p>
              <p className="text-3xl font-extralight text-foreground/90">{stats.n}</p>
            </TPanel>
            <TPanel className="hover-lift">
              <p className="mono text-[10px] tracking-wider-2 text-foreground/40 uppercase mb-1">Intensidad media</p>
              <p className="text-3xl font-extralight text-foreground/90">
                {stats.avg.toFixed(1)}
                <span className="text-base text-foreground/35"> → {stats.avgAfter.toFixed(1)}</span>
              </p>
            </TPanel>
            <TPanel className="hover-lift">
              <p className="mono text-[10px] tracking-wider-2 text-foreground/40 uppercase mb-2">Más frecuentes</p>
              <div className="flex flex-wrap gap-1.5">
                {stats.top.map(([e, c]) => (
                  <span key={e} className="mono text-[10px] text-foreground/60 border border-foreground/10 rounded-full px-2 py-0.5">
                    {e} · {c}
                  </span>
                ))}
              </div>
            </TPanel>
          </div>

          {chartData.length > 1 && (
            <TPanel laser className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] tracking-wider uppercase text-primary font-semibold">
                  — Gráfica de Autorregulación (Pico vs Post)
                </span>
                <span className="mono text-[9px] text-foreground/40">Últimos {chartData.length} registros</span>
              </div>
              <div className="h-44 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={chartData}>
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} />
                    <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#0b0b0d", borderColor: "rgba(255,7,58,0.4)", borderRadius: "12px", fontSize: "12px", color: "#fff" }} />
                    <Line type="monotone" dataKey="Pico" stroke="#ff073a" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Post" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </TPanel>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 reveal">
        <Btn variant="laser" onClick={() => setOpen((o) => !o)}>
          <Plus className="w-3.5 h-3.5" /> {open ? "Cerrar" : "Nuevo registro"}
        </Btn>
        {entries.length > 0 && (
          <Btn onClick={exportTxt}>
            <Download className="w-3.5 h-3.5" /> Exportar
          </Btn>
        )}
      </div>

      {open && (
        <TPanel laser className="space-y-4">
          <div>
            <label className="block text-sm font-light text-foreground/90 mb-2">Emoción principal</label>
            <div className="flex flex-wrap gap-2">
              {EMOTIONS.map((e) => (
                <button
                  key={e}
                  onClick={() => setDraft({ ...draft, emotion: e })}
                  className={`press-spring rounded-full px-3 py-1.5 text-[11px] mono tracking-wider border transition-all ${
                    draft.emotion === e
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "text-foreground/45 border-foreground/10 hover:text-foreground/85"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {([["intensity", "Intensidad en el pico"], ["after", "Intensidad después"]] as const).map(([k, label]) => (
              <div key={k}>
                <label className="block text-sm font-light text-foreground/90 mb-2">
                  {label} · <span className="text-laser mono">{draft[k]}/10</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={draft[k]}
                  onChange={(ev) => setDraft({ ...draft, [k]: Number(ev.target.value) })}
                  className="w-full accent-primary"
                />
              </div>
            ))}
          </div>

          <Field label="Disparador" hint="Qué pasó justo antes. Hechos, no interpretaciones." value={draft.trigger} onChange={(v) => setDraft({ ...draft, trigger: v })} rows={2} />
          <Field label="Pensamiento" hint="La frase exacta que te dijo tu cabeza." value={draft.thought} onChange={(v) => setDraft({ ...draft, thought: v })} rows={2} />
          <Field label="Cuerpo" hint="Dónde lo notaste: pecho, garganta, estómago, manos." value={draft.body} onChange={(v) => setDraft({ ...draft, body: v })} rows={2} />
          <Field label="Qué hice" hint="Sin juicio. Solo lo que ocurrió." value={draft.action} onChange={(v) => setDraft({ ...draft, action: v })} rows={2} />
          <Field label="Habilidad usada (o que podría usar la próxima vez)" hint="STOP, TIPP, acción opuesta, pedir ayuda…" value={draft.skill} onChange={(v) => setDraft({ ...draft, skill: v })} rows={2} />

          <Btn variant="laser" onClick={save}>Guardar registro</Btn>
        </TPanel>
      )}

      <div className="space-y-3 reveal-stagger">
        {entries.length === 0 && !open && (
          <TPanel>
            <p className="text-foreground/45 text-sm leading-relaxed flex gap-3">
              <LineChart className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              Aún no hay registros. El primero es el más difícil; con cinco ya empiezas a ver tu propio patrón.
            </p>
          </TPanel>
        )}
        {entries.map((e) => (
          <TPanel key={e.id} className="hover-lift">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase">
                  {e.emotion} · {e.intensity}/10 → {e.after}/10
                </p>
                <p className="mono text-[10px] text-foreground/30 mt-0.5">{fmt(e.date)}</p>
              </div>
              <button
                onClick={() => setEntries(entries.filter((x) => x.id !== e.id))}
                className="text-foreground/30 hover:text-primary transition-colors"
                aria-label="Borrar registro"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1.5 text-sm">
              {([["Disparador", e.trigger], ["Pensamiento", e.thought], ["Cuerpo", e.body], ["Qué hice", e.action], ["Habilidad", e.skill]] as const)
                .filter(([, v]) => v.trim())
                .map(([k, v]) => (
                  <p key={k} className="text-foreground/60 leading-relaxed">
                    <span className="mono text-[10px] tracking-wider text-foreground/35 uppercase mr-2">{k}</span>
                    {v}
                  </p>
                ))}
            </div>
          </TPanel>
        ))}
      </div>
    </div>
  );
};

export default Journal;