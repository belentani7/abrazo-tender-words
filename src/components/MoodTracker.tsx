import React, { useState, useEffect } from "react";
import { Smile, Frown, Meh, HeartHandshake, ShieldAlert, Sparkles, Plus, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

interface MoodEntry {
  id: string;
  timestamp: string;
  mood: string;
  intensity: number;
  note: string;
  recommendation: string;
}

const MOOD_OPTIONS = [
  { id: "calm", label: "Calmo / En Paz", icon: Smile, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", rec: "Mantén este espacio de serenidad cuidando tu ritmo de respiración." },
  { id: "tender", label: "Sensible / Vulnerable", icon: HeartHandshake, color: "text-rose-400 border-rose-500/30 bg-rose-500/10", rec: "Dite a ti mismo/a: 'Es bello y seguro sentir sin juzgarme'." },
  { id: "anxious", label: "Ansioso / Agitado", icon: ShieldAlert, color: "text-amber-400 border-amber-500/30 bg-amber-500/10", rec: "Realiza el ejercicio de Respiración Somática 4-7-8 o pide un Abrazo Virtual." },
  { id: "overwhelmed", label: "Abrumado / Agotado", icon: Frown, color: "text-purple-400 border-purple-500/30 bg-purple-500/10", rec: "Regálate un micro-descanso de 5 minutos sin pantallas ni exigencias." },
  { id: "seeking", label: "Busco Consuelo", icon: Sparkles, color: "text-pink-400 border-pink-500/30 bg-pink-500/10", rec: "Recuerda que tu dolor merece ser atendido con máxima ternura." },
];

export const MoodTracker: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("abrazo-mood-tracker");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedMood, setSelectedMood] = useState(MOOD_OPTIONS[0]);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("abrazo-mood-tracker", JSON.stringify(entries));
    } catch {
      // Ignore
    }
  }, [entries]);

  const handleAddEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      mood: selectedMood.label,
      intensity,
      note: note.trim(),
      recommendation: selectedMood.rec,
    };

    setEntries([newEntry, ...entries]);
    setNote("");
    toast.success("¡Registro emocional guardado privadamente!");
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
    toast.info("Registro eliminado.");
  };

  return (
    <div className="space-y-6">
      <div className="glass border border-foreground/[0.08] rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">
            — Diario Emocional Privado
          </p>
          <h3 className="text-xl md:text-2xl font-light text-foreground/95">
            Rastreador de Estado Anímico & Claridad Afectiva
          </h3>
          <p className="text-foreground/55 text-sm mt-1">
            Los datos se guardan únicamente en el almacenamiento local de tu navegador. Nadie más tiene acceso a tus notas.
          </p>
        </div>

        {/* Form Selector */}
        <div className="space-y-4">
          <div>
            <label className="block mono text-[10px] text-foreground/50 uppercase mb-2">
              ¿Cómo te sientes en este instante?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MOOD_OPTIONS.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMood.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? m.color + " shadow-md"
                        : "glass border-foreground/10 text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-light">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intensity Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="mono text-[10px] text-foreground/50 uppercase">
                Intensidad de la Emoción:
              </label>
              <span className="mono text-xs text-primary">{intensity} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-primary bg-foreground/10 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Note Input */}
          <div>
            <label className="block mono text-[10px] text-foreground/50 uppercase mb-2">
              Nota o Reflexión Personal (Opcional):
            </label>
            <textarea
              rows={2}
              placeholder="¿Qué pensamiento o evento desencadenó este sentimiento?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-background/50 border border-foreground/10 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>

          <button
            onClick={handleAddEntry}
            className="w-full py-3 rounded-full glass-laser laser-border text-xs mono text-foreground hover:text-laser flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Guardar Registro en mi Diario</span>
          </button>
        </div>
      </div>

      {/* History Log */}
      {entries.length > 0 && (
        <div className="space-y-4">
          <h4 className="mono text-xs text-foreground/60 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            Historial Reciente de Registros ({entries.length})
          </h4>

          <div className="space-y-3">
            {entries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="glass rounded-2xl p-4 border border-foreground/[0.06] flex items-start justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] mono bg-primary/10 text-primary border border-primary/20">
                      {entry.mood} ({entry.intensity}/10)
                    </span>
                    <span className="mono text-[10px] text-foreground/40">{entry.timestamp}</span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-foreground/80 pt-1 font-light">"{entry.note}"</p>
                  )}
                  <p className="text-xs text-foreground/50 pt-1 italic">
                    💡 Recomendación: {entry.recommendation}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-foreground/30 hover:text-rose-400 transition-colors p-1"
                  title="Eliminar este registro"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
