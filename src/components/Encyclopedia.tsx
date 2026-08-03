import { useState, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  WIKI_DATA,
  DUDAS,
  CLINICAL_LEVELS,
  WIKI_DISCLAIMER,
  type DisorderEntry,
} from "@/content/wiki-data";
import { ArrowLeft, ArrowRight, Search, BookOpen, HelpCircle, Library, Heart, Wrench } from "lucide-react";
import Toolkit from "./tools/Toolkit";

const WPanel = ({ children, className = "", laser = false }: { children: ReactNode; className?: string; laser?: boolean }) => (
  <div className={`${laser ? "glass-laser" : "glass"} laser-border rounded-3xl p-5 md:p-7 ${className}`}>
    {children}
  </div>
);

type View = "home" | "disorder" | "dudas" | "tools";

const Encyclopedia = ({
  onExit,
  onOpenAbrazo,
  initialId = null,
  onSelect,
}: {
  onExit: () => void;
  onOpenAbrazo: () => void;
  initialId?: string | null;
  onSelect?: (id: string | null) => void;
}) => {
  const [view, setView] = useState<View>(initialId ? "disorder" : "home");
  const [selectedId, setSelectedId] = useState<string | null>(initialId);
  const [query, setQuery] = useState("");

  const selected: DisorderEntry | undefined = WIKI_DATA.find((d) => d.id === selectedId);

  useScrollReveal(`${view}-${selectedId}-${query}`);

  const open = (id: string) => {
    setSelectedId(id);
    setView("disorder");
    onSelect?.(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const go = (v: View) => {
    setView(v);
    setSelectedId(null);
    onSelect?.(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = WIKI_DATA.filter((d) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      d.title.toLowerCase().includes(q) ||
      d.short.toLowerCase().includes(q) ||
      d.summary.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ambient drifting field */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-primary/[0.05] blur-[130px] animate-drift" />
        <div className="absolute bottom-[-25%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-primary/[0.035] blur-[150px] animate-drift-slow" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-foreground/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
          <button onClick={onExit} className="flex items-center gap-2 mono text-[11px] tracking-wider-2 text-foreground/50 hover:text-foreground/90 transition-all press-spring">
            <ArrowLeft className="w-3.5 h-3.5" /> ABRAZO
          </button>
          <button onClick={() => go("home")} className="flex items-center gap-2 group">
            <Library className="w-3.5 h-3.5 text-primary" />
            <span className="mono text-sm tracking-wider-2 text-foreground/90 group-hover:text-laser transition-all">ENCICLOPEDIA</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="sticky top-[57px] z-40 bg-background/40 backdrop-blur-xl border-b border-foreground/[0.04]">
        <div className="max-w-5xl mx-auto px-4 py-2 flex gap-1">
          {[
            { id: "home" as View, label: "Trastornos", icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: "tools" as View, label: "Herramientas", icon: <Wrench className="w-3.5 h-3.5" /> },
            { id: "dudas" as View, label: "Dudas frecuentes", icon: <HelpCircle className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => go(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] mono tracking-wider whitespace-nowrap transition-all duration-500 press-spring ${
                (view === tab.id || (tab.id === "home" && view === "disorder"))
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-foreground/40 hover:text-foreground/80 border border-transparent"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-10 md:py-16 relative z-10">
        {/* ─── HOME / INDEX ─── */}
        {view === "home" && (
          <div className="space-y-8">
            <div className="reveal">
              <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-3">— Capa aparte · Referencia</p>
              <h2 className="text-4xl md:text-6xl font-extralight text-foreground/95 leading-[1.05] tracking-tight mb-5">
                Enciclopedia de dinámicas
              </h2>
              <p className="text-foreground/65 text-base md:text-lg leading-relaxed max-w-3xl">
                Un manual de referencia accesible sobre trastornos mentales y cómo se viven en los vínculos: pareja, amistad, familia, colega, vecino. Sin juicio, sin diagnósticos, con cuidado.
              </p>
            </div>

            {/* Search */}
            <div className="reveal relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar trastorno, rasgo o dinámica…"
                className="w-full glass laser-border rounded-full pl-11 pr-4 py-3 bg-transparent text-sm text-foreground/90 placeholder:text-foreground/35 mono tracking-wide focus:outline-none focus:border-primary/40"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
              {filtered.map((d) => (
                <button key={d.id} onClick={() => open(d.id)} className="text-left">
                  <WPanel className="hover-lift cursor-pointer h-full" laser={d.hasAbrazo}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">{d.short}</span>
                      <span className="mono text-[9px] tracking-wider-2 text-foreground/40 uppercase border border-foreground/10 rounded-full px-2 py-0.5">
                        {CLINICAL_LEVELS[d.clinicalLevel]}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-foreground/95 mb-2 leading-snug">{d.title}</h3>
                    <p className="text-foreground/55 text-sm leading-relaxed mb-4">{d.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {d.tags.slice(0, 4).map((t) => (
                        <span key={t} className="mono text-[9px] tracking-wider text-foreground/40 lowercase">#{t}</span>
                      ))}
                    </div>
                    {d.hasAbrazo && (
                      <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mt-4 flex items-center gap-1.5">
                        <Heart className="w-3 h-3" /> incluye módulo ABRAZO
                      </p>
                    )}
                  </WPanel>
                </button>
              ))}
              {filtered.length === 0 && (
                <WPanel className="md:col-span-2"><p className="text-foreground/50 text-sm">Sin resultados para «{query}».</p></WPanel>
              )}
            </div>

            <WPanel className="reveal"><p className="text-foreground/55 text-xs italic leading-relaxed">{WIKI_DISCLAIMER}</p></WPanel>
          </div>
        )}

        {/* ─── DISORDER DETAIL ─── */}
        {view === "disorder" && selected && (
          <div className="space-y-6">
            <button onClick={() => go("home")} className="reveal flex items-center gap-2 mono text-[10px] tracking-wider-2 text-foreground/40 hover:text-foreground/80 uppercase press-spring">
              <ArrowLeft className="w-3.5 h-3.5" /> Todos los trastornos
            </button>

            <div className="reveal">
              <div className="flex items-center gap-3 mb-3">
                <span className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">{selected.short}</span>
                {selected.cluster && <span className="mono text-[9px] tracking-wider-2 text-foreground/40 uppercase">· {selected.cluster}</span>}
                <span className="mono text-[9px] tracking-wider-2 text-foreground/40 uppercase border border-foreground/10 rounded-full px-2 py-0.5">{CLINICAL_LEVELS[selected.clinicalLevel]}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-foreground/95 leading-[1.05] tracking-tight mb-4">{selected.title}</h2>
              <p className="text-foreground/65 text-base md:text-lg leading-relaxed max-w-3xl">{selected.summary}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {selected.tags.map((t) => (
                  <span key={t} className="mono text-[9px] tracking-wider text-foreground/40 lowercase border border-foreground/10 rounded-full px-2 py-0.5">#{t}</span>
                ))}
              </div>
            </div>

            {selected.hasAbrazo && (
              <WPanel laser className="reveal">
                <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                  ¿Vives de cerca un vínculo de alta intensidad emocional ligado a este perfil? Hay un espacio especializado en límites, regulación y acompañamiento compasivo.
                </p>
                <button onClick={onOpenAbrazo} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mono text-xs tracking-wider-2 border border-primary/40 text-foreground/90 hover:text-laser hover:border-primary/70 transition-all press-spring">
                  Profundizar en ABRAZO <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </WPanel>
            )}

            {selected.sections.map((s) => (
              <WPanel key={s.id} className="reveal hover-lift">
                <h3 className="text-lg font-light text-foreground/95 mb-3">{s.title}</h3>
                <p className="text-foreground/65 text-sm md:text-base leading-relaxed">{s.content}</p>
              </WPanel>
            ))}

            {selected.criteria && (
              <WPanel className="reveal">
                <h3 className="text-lg font-light text-foreground/95 mb-4">Criterios y señales (DSM-5-TR)</h3>
                <ul className="space-y-2.5">
                  {selected.criteria.map((c, i) => (
                    <li key={i} className="flex gap-3 text-foreground/65 text-sm leading-relaxed">
                      <span className="mono text-[10px] text-primary/70 mt-1 tracking-wider-2">{String(i + 1).padStart(2, "0")}</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </WPanel>
            )}

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">— En las dinámicas reales</h3>
            <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
              {selected.dynamics.map((dy, i) => (
                <WPanel key={i} className="hover-lift">
                  <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mb-2">{dy.context}</p>
                  <p className="text-foreground/60 text-sm leading-relaxed">{dy.desc}</p>
                </WPanel>
              ))}
            </div>

            <WPanel laser className="reveal">
              <h3 className="text-base font-light text-foreground/95 mb-4">Cómo acompañar (y cuidarte)</h3>
              <ul className="space-y-2">
                {selected.care.map((c, i) => (
                  <li key={i} className="flex gap-3 text-foreground/70 text-sm leading-relaxed">
                    <span className="text-primary/70 mono text-[10px] mt-1 tracking-wider-2">0{i + 1}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </WPanel>

            <WPanel className="reveal"><p className="text-foreground/55 text-xs italic leading-relaxed">{WIKI_DISCLAIMER}</p></WPanel>
          </div>
        )}

        {/* ─── HERRAMIENTAS ─── */}
        {view === "tools" && <Toolkit />}

        {/* ─── DUDAS ─── */}
        {view === "dudas" && (
          <div className="space-y-8">
            <div className="reveal">
              <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-3">— Voz baja</p>
              <h2 className="text-3xl md:text-5xl font-light text-foreground/95 leading-[1.05] tracking-tight mb-4">Las dudas más grandes</h2>
              <p className="text-foreground/65 text-base leading-relaxed max-w-3xl">Las preguntas que casi nadie dice en voz alta, separadas por temas para que encuentres la tuya.</p>
            </div>

            {DUDAS.map((cat) => (
              <div key={cat.id} className="space-y-3">
                <div className="reveal flex items-center gap-3 pt-2">
                  <span className="text-xl opacity-80">{cat.icon}</span>
                  <div>
                    <h3 className="text-lg font-light text-foreground/95">{cat.category}</h3>
                    <p className="text-foreground/45 text-xs italic">{cat.intro}</p>
                  </div>
                </div>
                <div className="space-y-3 reveal-stagger">
                  {cat.questions.map((qa, i) => (
                    <WPanel key={i} className="hover-lift">
                      <h4 className="font-light text-foreground/95 mb-2 text-base">{qa.q}</h4>
                      <p className="text-foreground/60 text-sm leading-relaxed">{qa.a}</p>
                    </WPanel>
                  ))}
                </div>
              </div>
            ))}

            <WPanel className="reveal"><p className="text-foreground/55 text-xs italic leading-relaxed">{WIKI_DISCLAIMER}</p></WPanel>
          </div>
        )}
      </main>

      <footer className="border-t border-foreground/[0.06] mt-16 py-10 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <button onClick={onExit} className="inline-flex items-center gap-2 mono text-[10px] tracking-wider-2 text-foreground/40 hover:text-foreground/80 uppercase press-spring">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a ABRAZO
          </button>
          <p className="mono text-[10px] tracking-wider-2 text-foreground/25 uppercase pt-2">Enciclopedia · educativa · no diagnostica</p>
        </div>
      </footer>
    </div>
  );
};

export default Encyclopedia;