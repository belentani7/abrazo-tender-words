import { useState } from "react";
import { Volume2, VolumeX, CloudRain, Waves, Bell, Radio } from "lucide-react";
import { soundEngine } from "@/lib/audio";

export const AudioPlayer = () => {
  const [activeMode, setActiveMode] = useState<'none' | 'binaural' | 'rain' | 'ocean' | 'bowl'>('none');
  const [volume, setVolume] = useState(0.4);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleMode = (mode: 'binaural' | 'rain' | 'ocean' | 'bowl') => {
    if (activeMode === mode) {
      soundEngine.stop();
      setActiveMode('none');
    } else {
      soundEngine.playMode(mode);
      setActiveMode(mode);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    soundEngine.setVolume(v);
    if (v === 0) setMuted(true);
    else setMuted(false);
  };

  const toggleMute = () => {
    if (muted) {
      soundEngine.setVolume(volume || 0.4);
      setMuted(false);
    } else {
      soundEngine.setVolume(0);
      setMuted(true);
    }
  };

  const sounds = [
    { id: 'binaural' as const, name: 'Theta 6Hz', icon: Radio, desc: 'Binaural anti-ansiedad' },
    { id: 'rain' as const, name: 'Lluvia', icon: CloudRain, desc: 'Ruido rosa suave' },
    { id: 'ocean' as const, name: 'Océano', icon: Waves, desc: 'Olas de relajación' },
    { id: 'bowl' as const, name: 'Cuenco', icon: Bell, desc: 'Armónicos meditativos' }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative flex flex-col items-end gap-2">
        {expanded && (
          <div className="glass-strong laser-border rounded-2xl p-4 shadow-2xl backdrop-blur-xl border border-primary/20 w-72 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="mono text-[11px] uppercase text-primary/90 font-medium tracking-wider">
                — Paisaje sonoro
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="text-foreground/40 hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {sounds.map((s) => {
                const Icon = s.icon;
                const active = activeMode === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleMode(s.id)}
                    className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                      active
                        ? "bg-primary/20 border-primary/40 text-primary shadow-[0_0_15px_rgba(255,7,58,0.25)]"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-foreground/70"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className={`w-3.5 h-3.5 ${active ? "animate-pulse" : ""}`} />
                      <span className="text-xs font-medium">{s.name}</span>
                    </div>
                    <span className="text-[9px] text-foreground/40">{s.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <button onClick={toggleMute} className="text-foreground/60 hover:text-foreground">
                {muted || volume === 0 ? <VolumeX className="w-4 h-4 text-primary" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="mono text-[10px] text-foreground/40 w-7 text-right">
                {Math.round((muted ? 0 : volume) * 100)}%
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all press-spring ${
            activeMode !== 'none'
              ? "glass-laser laser-border border-primary/50 text-primary shadow-[0_0_20px_rgba(255,7,58,0.3)] animate-pulse"
              : "glass border-white/10 text-foreground/70 hover:text-foreground hover:border-white/20"
          }`}
        >
          <Radio className={`w-4 h-4 ${activeMode !== 'none' ? "text-primary animate-spin" : ""}`} />
          <span className="mono text-xs uppercase tracking-wider">
            {activeMode !== 'none' ? `Sonido: ${activeMode}` : 'Ambiente'}
          </span>
        </button>
      </div>
    </div>
  );
};
