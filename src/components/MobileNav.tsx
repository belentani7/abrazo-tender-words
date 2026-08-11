import { Heart, Shield, BookOpen, AlertCircle, Library, Sparkles } from "lucide-react";

interface MobileNavProps {
  currentSection: string;
  onSelectSection: (section: "home" | "virtualHug" | "agents") => void;
  onOpenSOS: () => void;
  onOpenWiki: () => void;
}

export const MobileNav = ({
  currentSection,
  onSelectSection,
  onOpenSOS,
  onOpenWiki,
}: MobileNavProps) => {
  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40">
      <div className="glass-strong laser-border rounded-full px-2 py-1.5 border border-white/10 shadow-2xl flex items-center justify-around backdrop-blur-2xl bg-black/80">
        <button
          onClick={() => onSelectSection("home")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-colors ${
            currentSection === "home" ? "text-primary font-medium" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span className="mono text-[8px] uppercase tracking-wider">Inicio</span>
        </button>

        <button
          onClick={() => onSelectSection("virtualHug")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-colors ${
            currentSection === "virtualHug" ? "text-rose-400 font-medium" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
          <span className="mono text-[8px] uppercase tracking-wider">Abrazo</span>
        </button>

        <button
          onClick={() => onSelectSection("agents")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-colors ${
            currentSection === "agents" ? "text-primary font-medium" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="mono text-[8px] uppercase tracking-wider">IA</span>
        </button>

        <button
          onClick={onOpenWiki}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-full text-foreground/50 hover:text-foreground transition-colors"
        >
          <Library className="w-3.5 h-3.5" />
          <span className="mono text-[8px] uppercase tracking-wider">Wiki</span>
        </button>

        <button
          onClick={onOpenSOS}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-full text-primary bg-primary/10 border border-primary/30 animate-pulse"
        >
          <AlertCircle className="w-3.5 h-3.5 text-primary" />
          <span className="mono text-[8px] uppercase tracking-wider font-semibold text-primary">SOS</span>
        </button>
      </div>
    </div>
  );
};

