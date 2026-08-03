import { useState, ReactNode, useEffect, lazy, Suspense } from "react";
import { useLang } from "@/hooks/useLang";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useGsapAnimations from "@/hooks/useGsapAnimations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import { AudioPlayer } from "@/components/AudioPlayer";
import { SOSModal } from "@/components/SOSModal";
import { AmbientBackground } from "@/components/AmbientBackground";
import { MobileNav } from "@/components/MobileNav";
import { VirtualHugGenerator } from "@/components/VirtualHugGenerator";
import { MoodTracker } from "@/components/MoodTracker";
import { GSAPBreathingVisualizer } from "@/components/GSAPBreathingVisualizer";
import { DiscreetCredit } from "@/components/DiscreetCredit";
import { Heart, BookOpen, Eye, Shield, MessageCircleHeart, Scale, Users, ChevronRight, Wind, Handshake, HelpCircle, BookOpenCheck, Flame, ArrowRight, Stethoscope, LifeBuoy, Library, Sparkles, AlertCircle, Calendar } from "lucide-react";

const Encyclopedia = lazy(() => import("@/components/Encyclopedia"));
const AgentChat = lazy(() => import("@/components/AgentChat"));

type Section = "home" | "virtualHug" | "moodTracker" | "somaticBreathing" | "understanding" | "signs" | "story" | "tools" | "boundaries" | "forBoth" | "whatIfMe" | "faq" | "glossary" | "farewell" | "community" | "young" | "tlpDolor" | "clinical" | "resources" | "agents" | "darkIntro" | "spectrum" | "darkTriad" | "tactics" | "attachment" | "profiles" | "redFlags" | "faqRel" | "protocol" | "darkClosing";

const Panel = ({ children, className = "", laser = false }: { children: ReactNode; className?: string; laser?: boolean }) => (
  <div className={`reveal hover-lift ${laser ? "glass-laser" : "glass"} laser-border rounded-3xl p-5 md:p-7 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) => (
  <div className="reveal mb-8">
    <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-3">— {kicker}</p>
    <h2 className="text-3xl md:text-5xl font-light text-foreground/95 leading-[1.05] tracking-tight">{title}</h2>
    {subtitle && <p className="text-foreground/50 text-sm md:text-base mt-3 italic font-light">{subtitle}</p>}
  </div>
);

const Index = () => {
  const { t, lang } = useLang();
  const [section, setSection] = useState<Section>("home");
  const [wikiMode, setWikiMode] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [crossed, setCrossed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("abrazo-crossed") === "1";
  });
  const cross = () => {
    setCrossed(true);
    localStorage.setItem("abrazo-crossed", "1");
    goTo("darkIntro");
  };
  const uncross = () => {
    setCrossed(false);
    localStorage.removeItem("abrazo-crossed");
    goTo("home");
  };

  useScrollReveal(`${section}-${lang}`);
  useGsapAnimations(section);

  useEffect(() => {
    document.title = `${t.header.title} — ${t.header.subtitle}`;
  }, [t]);

  const goTo = (s: Section) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const enterWiki = () => {
    setWikiMode(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const exitWiki = () => {
    setWikiMode(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const openAbrazoFromWiki = () => {
    setWikiMode(false);
    goTo("understanding");
  };

  const navItems: { id: Section; label: string; icon: ReactNode }[] = [
    { id: "home", label: t.nav.home, icon: <Heart className="w-3.5 h-3.5" /> },
    { id: "virtualHug", label: "Abrazo Virtual & Cartas", icon: <Heart className="w-3.5 h-3.5 text-rose-400" /> },
    { id: "agents", label: "Agentes IA (Sin API)", icon: <Sparkles className="w-3.5 h-3.5 text-primary" /> },
    { id: "somaticBreathing", label: "Calma GSAP", icon: <Wind className="w-3.5 h-3.5" /> },
    { id: "moodTracker", label: "Diario de Ánimo", icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: "understanding", label: t.nav.understanding, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "signs", label: t.nav.signs, icon: <Eye className="w-3.5 h-3.5" /> },
    { id: "tools", label: t.nav.tools, icon: <Shield className="w-3.5 h-3.5" /> },
    { id: "boundaries", label: t.nav.boundaries, icon: <Scale className="w-3.5 h-3.5" /> },
    { id: "forBoth", label: t.nav.forBoth, icon: <Handshake className="w-3.5 h-3.5" /> },
    { id: "whatIfMe", label: t.nav.whatIfMe, icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: "story", label: t.nav.story, icon: <MessageCircleHeart className="w-3.5 h-3.5" /> },
    { id: "faq", label: t.nav.faq, icon: <BookOpenCheck className="w-3.5 h-3.5" /> },
    { id: "glossary", label: t.nav.glossary, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "farewell", label: t.nav.farewell, icon: <Flame className="w-3.5 h-3.5" /> },
    { id: "community", label: t.nav.community, icon: <Users className="w-3.5 h-3.5" /> },
    { id: "young", label: t.nav.young || "Guía joven", icon: <Wind className="w-3.5 h-3.5" /> },
    { id: "tlpDolor", label: t.nav.tlpDolor || "Su dolor", icon: <Heart className="w-3.5 h-3.5" /> },
    { id: "clinical", label: t.nav.clinical || "Clínico", icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: "resources", label: t.nav.resources || "Recursos", icon: <LifeBuoy className="w-3.5 h-3.5" /> },
  ];

  const darkNavItems: { id: Section; label: string }[] = crossed
    ? [
        { id: "darkIntro", label: t.nav.darkIntro || "Cuando el dolor daña" },
        { id: "spectrum", label: t.nav.spectrum || "Espectro" },
        { id: "darkTriad", label: t.nav.darkTriad || "Tríada oscura" },
        { id: "tactics", label: t.nav.tactics || "Tácticas" },
        { id: "attachment", label: t.nav.attachment || "Apego" },
        { id: "profiles", label: t.nav.profiles || "Perfiles" },
        { id: "redFlags", label: t.nav.redFlags || "Señales" },
        { id: "faqRel", label: t.nav.faqRel || "Dudas" },
        { id: "protocol", label: t.nav.protocol || "Protocolo" },
        { id: "darkClosing", label: t.nav.darkClosing || "Cierre" },
      ]
    : [];

  const sectionMeta: Record<Section, string> = {
    home: "00", understanding: "01", signs: "02", tools: "03", boundaries: "04",
    forBoth: "05", whatIfMe: "06", story: "07", faq: "08", glossary: "09",
    farewell: "10", community: "11", young: "12", tlpDolor: "13", clinical: "14", resources: "15",
    agents: "16",
    darkIntro: "X1", spectrum: "X2", darkTriad: "X3", tactics: "X4",
    attachment: "X5", profiles: "X6", redFlags: "X7", faqRel: "X8",
    protocol: "X9", darkClosing: "X0",
  };

  if (wikiMode) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Encyclopedia onExit={exitWiki} onOpenAbrazo={openAbrazoFromWiki} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Skip to content (keyboard/screen-reader users) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:glass-laser focus:laser-border focus:rounded-full focus:px-4 focus:py-2 focus:mono focus:text-xs focus:tracking-wider-2 focus:text-foreground"
      >
        Saltar al contenido
      </a>
      {/* Dynamic Ambient Background Canvas */}
      <AmbientBackground isDarkSide={crossed && sectionMeta[section]?.startsWith("X")} />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/[0.06] blur-[120px] animate-float" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-primary/[0.04] blur-[140px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-foreground/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => goTo("home")} className="flex items-center gap-2.5 group">
              <div className="relative w-2 h-2 rounded-full bg-primary animate-pulse-laser" />
              <h1 className="mono text-sm tracking-wider-2 text-foreground/90 group-hover:text-laser transition-all">
                {t.header.title}
              </h1>
              <span className="mono text-[10px] tracking-wider-2 text-foreground/30 hidden sm:inline">
                / {sectionMeta[section]}
              </span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSosOpen(true)}
                className="glass-laser laser-border px-3 py-1.5 rounded-full text-xs mono text-primary hover:bg-primary/20 flex items-center gap-1.5 transition-all animate-pulse"
                title="Protocolo de Calma de Emergencia"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SOS Calma</span>
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav aria-label="Navegación principal" className="sticky top-[57px] z-40 bg-background/40 backdrop-blur-xl border-b border-foreground/[0.04]">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                aria-current={section === item.id ? "page" : undefined}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] mono tracking-wider whitespace-nowrap transition-all duration-500 ${
                  section === item.id
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-foreground/40 hover:text-foreground/80 border border-transparent"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            {crossed && (
              <>
                <span className="px-2 text-foreground/20 mono text-[11px]">|</span>
                {darkNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(item.id)}
                    aria-current={section === item.id ? "page" : undefined}
                    className={`px-3 py-1.5 rounded-full text-[11px] mono tracking-wider whitespace-nowrap transition-all duration-500 ${
                      section === item.id
                        ? "bg-foreground/10 text-foreground border border-foreground/30"
                        : "text-foreground/35 hover:text-foreground/70 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main id="main" className="max-w-5xl mx-auto px-4 py-10 md:py-16 relative z-10">

        {/* ─── HOME ─── */}
        {section === "home" && (
          <div className="space-y-10">
            <div className="reveal">
              <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-4">— {t.header.tagline}</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-foreground/95 leading-[1.05] tracking-tight mb-6">
                {t.home.heroTitle}
              </h2>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-4 max-w-3xl">{t.home.heroP1}</p>
              <p className="text-laser font-light text-base md:text-lg mb-4 max-w-3xl">{t.home.heroP2}</p>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">{t.home.heroP3}</p>
              <button
                onClick={() => goTo("understanding")}
                className="group inline-flex items-center gap-2 glass-laser laser-border rounded-full px-6 py-3 mono text-xs tracking-wider-2 text-foreground hover:text-laser transition-all duration-500 animate-pulse-laser"
              >
                {t.home.ctaButton}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { n: "01", title: t.home.card1Title, desc: t.home.card1Desc, target: "understanding" as Section },
                { n: "02", title: t.home.card2Title, desc: t.home.card2Desc, target: "signs" as Section },
                { n: "03", title: t.home.card3Title, desc: t.home.card3Desc, target: "tools" as Section },
              ].map((c) => (
                <button key={c.n} onClick={() => goTo(c.target)} className="text-left">
                  <Panel className="hover:border-primary/40 transition-all duration-500 cursor-pointer h-full">
                    <p className="mono text-[10px] text-primary/70 tracking-wider-2 mb-3">{c.n}</p>
                    <h3 className="text-lg font-light text-foreground/95 mb-2">{c.title}</h3>
                    <p className="text-foreground/55 text-sm leading-relaxed">{c.desc}</p>
                  </Panel>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── UNDERSTANDING ─── */}
        {section === "understanding" && (
          <div className="space-y-6">
            <SectionTitle kicker="01 / Mapa" title={t.understanding.title} />
            <Panel><p className="text-foreground/70 leading-relaxed text-sm md:text-base italic">{t.understanding.intro}</p></Panel>

            {[
              { icon: "🔥", title: t.understanding.emotionalSkinTitle, desc: t.understanding.emotionalSkinDesc },
              { icon: "🚪", title: t.understanding.abandonmentTitle, desc: t.understanding.abandonmentDesc },
              { icon: "🕳️", title: t.understanding.voidTitle, desc: t.understanding.voidDesc },
            ].map((item, i) => (
              <Panel key={i}>
                <h3 className="text-lg font-light text-foreground/95 mb-3 flex items-center gap-3">
                  <span className="text-xl opacity-80">{item.icon}</span>{item.title}
                </h3>
                <p className="text-foreground/65 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </Panel>
            ))}

            <Panel laser><p className="text-foreground/80 text-sm italic leading-relaxed">{t.understanding.closingNote}</p></Panel>

            <Panel>
              <h3 className="text-lg font-light text-foreground/95 mb-5">{t.understanding.clinicalTitle}</h3>
              <div className="space-y-4">
                {t.understanding.clinicalPoints.map((p, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-foreground/5 last:border-0 last:pb-0">
                    <span className="mono text-xs text-primary/80 mt-1">0{i + 1}</span>
                    <div>
                      <p className="font-medium text-foreground/90 text-sm mb-1">{p.title}</p>
                      <p className="text-foreground/55 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ─── SIGNS ─── */}
        {section === "signs" && (
          <div className="space-y-6">
            <SectionTitle kicker="02 / Patrones" title={t.signs.title} />
            <Panel><p className="text-foreground/70 leading-relaxed text-sm md:text-base italic">{t.signs.intro}</p></Panel>
            {t.signs.patterns.map((p, i) => (
              <Panel key={i}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="mono text-[10px] tracking-wider-2 text-primary/70">0{i + 1}</span>
                  <h4 className="text-base md:text-lg font-light text-foreground/95">{p.title}</h4>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed pl-8">{p.desc}</p>
              </Panel>
            ))}
            <Panel laser><p className="text-foreground/80 text-sm italic leading-relaxed">{t.signs.closingNote}</p></Panel>
          </div>
        )}

        {/* ─── TOOLS ─── */}
        {section === "tools" && (
          <div className="space-y-6">
            <SectionTitle kicker="03 / Práctica" title={t.tools.title} subtitle={t.tools.intro} />

            <Panel>
              <h3 className="text-lg font-light text-foreground/95 mb-4">{t.tools.validationTitle}</h3>
              <div className="space-y-3 text-sm">
                <div className="glass rounded-2xl p-4"><p className="text-foreground/80">💬 {t.tools.validationSituation}</p></div>
                <div className="rounded-2xl p-4 border border-primary/20 bg-primary/5"><p className="text-foreground/70 mono text-xs tracking-wide">✗ {t.tools.validationWrong}</p></div>
                <div className="rounded-2xl p-4 border border-foreground/15 bg-foreground/[0.03]"><p className="text-foreground/90 mono text-xs tracking-wide">✓ {t.tools.validationRight}</p></div>
                <p className="text-foreground/45 text-xs italic pt-2 leading-relaxed">{t.tools.validationWhy}</p>
              </div>
            </Panel>

            <Panel>
              <h3 className="text-lg font-light text-foreground/95 mb-4">{t.tools.trafficLightTitle}</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { label: t.tools.redLabel, desc: t.tools.redDesc },
                  { label: t.tools.yellowLabel, desc: t.tools.yellowDesc },
                  { label: t.tools.greenLabel, desc: t.tools.greenDesc },
                ].map((light, i) => (
                  <div key={i} className="rounded-2xl p-4 glass">
                    <p className="font-light text-foreground/95 text-sm mb-2">{light.label}</p>
                    <p className="text-foreground/55 text-xs leading-relaxed">{light.desc}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <h3 className="text-lg font-light text-foreground/95 mb-2 flex items-center gap-3">
                <Wind className="w-4 h-4 text-primary" />{t.tools.breathingTitle}
              </h3>
              <p className="text-foreground/65 text-sm leading-relaxed mb-5">{t.tools.breathingDesc}</p>
              <div className="flex gap-3 justify-center">
                {[
                  { n: "4", label: t.tools.breathingInhale },
                  { n: "7", label: t.tools.breathingHold },
                  { n: "8", label: t.tools.breathingExhale },
                ].map((step, i) => (
                  <div key={i} className="glass-laser rounded-2xl px-6 py-4 text-center min-w-[72px]">
                    <p className="text-3xl font-extralight text-laser">{step.n}</p>
                    <p className="mono text-[9px] tracking-wider-2 text-foreground/60 uppercase mt-1">{step.label}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <h3 className="text-lg font-light text-foreground/95 mb-2">{t.tools.communicationTitle}</h3>
              <p className="text-foreground/55 text-sm mb-5">{t.tools.communicationIntro}</p>
              <div className="space-y-4">
                {t.tools.commPoints.map((cp, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground/90 text-sm mb-1">{cp.title}</p>
                      <p className="text-foreground/55 text-sm leading-relaxed">{cp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel laser>
              <p className="font-light text-foreground/95 mb-2 text-sm">{t.tools.dontDoTitle}</p>
              <p className="text-foreground/65 text-sm leading-relaxed">{t.tools.dontDoDesc}</p>
            </Panel>
          </div>
        )}

        {/* ─── BOUNDARIES ─── */}
        {section === "boundaries" && (
          <div className="space-y-6">
            <SectionTitle kicker="04 / Cuidado" title={t.boundaries.title} subtitle={t.boundaries.intro} />
            <div className="grid md:grid-cols-2 gap-4">
              <Panel>
                <p className="mono text-[10px] tracking-wider-2 text-primary/70 mb-2">✗ {t.boundaries.badTitle}</p>
                <p className="text-foreground/85 text-sm italic mb-3">{t.boundaries.badExample}</p>
                <p className="text-foreground/50 text-xs leading-relaxed">{t.boundaries.badExplain}</p>
              </Panel>
              <Panel laser>
                <p className="mono text-[10px] tracking-wider-2 text-primary/90 mb-2">✓ {t.boundaries.goodTitle}</p>
                <p className="text-foreground/85 text-sm italic leading-relaxed">{t.boundaries.goodExample}</p>
              </Panel>
            </div>
            <Panel>
              <h3 className="text-lg font-light text-foreground/95 mb-5">{t.boundaries.tipsTitle}</h3>
              <div className="space-y-4">
                {t.boundaries.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="mono text-xs text-primary/80 mt-1">0{i + 1}</span>
                    <div>
                      <p className="font-medium text-foreground/90 text-sm mb-1">{tip.title}</p>
                      <p className="text-foreground/55 text-sm leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel laser>
              <h4 className="font-light text-foreground/95 mb-3 flex items-center gap-2 text-base">
                <Heart className="w-4 h-4 text-primary" />{t.boundaries.hardestTitle}
              </h4>
              <p className="text-foreground/75 text-sm leading-relaxed italic">{t.boundaries.hardestDesc}</p>
            </Panel>
          </div>
        )}

        {/* ─── FOR BOTH ─── */}
        {section === "forBoth" && (
          <div className="space-y-6">
            <SectionTitle kicker="05 / Diálogo" title={t.forBoth.title} subtitle={t.forBoth.subtitle} />
            <Panel><p className="text-foreground/70 leading-relaxed text-sm md:text-base">{t.forBoth.intro}</p></Panel>

            <div className="reveal">
              <div className="glass rounded-3xl p-5 md:p-6 mb-4 border border-foreground/15">
                <h3 className="text-base font-light text-foreground/95 mb-1">{t.forBoth.sideATitle}</h3>
                <p className="text-foreground/55 text-sm italic">{t.forBoth.sideASubtitle}</p>
              </div>
              <div className="space-y-4">
                {t.forBoth.sideAPoints.map((p, i) => (
                  <Panel key={i}>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{p.title}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{p.desc}</p>
                  </Panel>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="glass-laser rounded-3xl p-5 md:p-6 mb-4">
                <h3 className="text-base font-light text-laser mb-1">{t.forBoth.sideBTitle}</h3>
                <p className="text-foreground/55 text-sm italic">{t.forBoth.sideBSubtitle}</p>
              </div>
              <div className="space-y-4">
                {t.forBoth.sideBPoints.map((p, i) => (
                  <Panel key={i} laser>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{p.title}</h4>
                    <p className="text-foreground/65 text-sm leading-relaxed">{p.desc}</p>
                  </Panel>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── WHAT IF ME ─── */}
        {section === "whatIfMe" && (
          <div className="space-y-6">
            <SectionTitle kicker="06 / Espejo" title={t.whatIfMe.title} subtitle={t.whatIfMe.subtitle} />
            <Panel laser><p className="text-foreground/80 leading-relaxed text-sm md:text-base">{t.whatIfMe.intro}</p></Panel>

            <div className="reveal pt-2">
              <h3 className="text-base font-light text-foreground/95 mb-1">{t.whatIfMe.signsTitle}</h3>
              <p className="text-foreground/50 text-sm italic mb-4">{t.whatIfMe.signsIntro}</p>
            </div>
            {t.whatIfMe.signs.map((s, i) => (
              <Panel key={i}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="mono text-[10px] text-primary/70 tracking-wider-2">0{i + 1}</span>
                  <h4 className="font-light text-foreground/95 text-base">{s.title}</h4>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed pl-8">{s.desc}</p>
              </Panel>
            ))}

            <h3 className="reveal text-base font-light text-foreground/95 pt-2">{t.whatIfMe.stepsTitle}</h3>
            {t.whatIfMe.steps.map((s, i) => (
              <Panel key={i}>
                <p className="mono text-[10px] tracking-wider-2 text-primary/80 mb-2">— PASO 0{i + 1}</p>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{s.title}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
              </Panel>
            ))}

            <Panel laser><p className="text-foreground/80 text-sm leading-relaxed italic text-center">{t.whatIfMe.closingNote}</p></Panel>
          </div>
        )}

        {/* ─── STORY ─── */}
        {section === "story" && (
          <div className="space-y-6">
            <SectionTitle kicker="07 / Origen" title={t.story.title} subtitle={t.story.subtitle} />
            <Panel laser>
              <p className="text-foreground/85 italic text-base md:text-lg leading-relaxed font-light">"{t.story.quote}"</p>
            </Panel>
            <Panel>
              <p className="text-foreground/70 leading-relaxed mb-4 text-sm md:text-base">{t.story.intro}</p>
              <p className="text-foreground/70 leading-relaxed mb-4 text-sm md:text-base">{t.story.bodyP1}</p>
              <div className="my-6 space-y-1 pl-4 border-l border-primary/40">
                <p className="text-foreground/95 font-light italic">{t.story.bodyP2}</p>
                <p className="text-foreground/95 font-light italic">{t.story.bodyP3}</p>
              </div>
              <p className="text-foreground/70 leading-relaxed mb-4 text-sm md:text-base">{t.story.bodyP4}</p>
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">{t.story.bodyP5}</p>
            </Panel>
            <p className="reveal mono text-[10px] tracking-wider-2 text-foreground/40 text-center uppercase">{t.story.credit}</p>
          </div>
        )}

        {/* ─── FAQ ─── */}
        {section === "faq" && (
          <div className="space-y-4">
            <SectionTitle kicker="08 / Voz baja" title={t.faq.title} subtitle={t.faq.intro} />
            {t.faq.questions.map((faq, i) => (
              <Panel key={i}>
                <p className="mono text-[10px] tracking-wider-2 text-primary/70 mb-2">— Q.0{i + 1}</p>
                <h4 className="font-light text-foreground/95 mb-3 text-base md:text-lg">{faq.q}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{faq.a}</p>
              </Panel>
            ))}
          </div>
        )}

        {/* ─── GLOSSARY ─── */}
        {section === "glossary" && (
          <div className="space-y-4">
            <SectionTitle kicker="09 / Diccionario" title={t.glossary.title} subtitle={t.glossary.intro} />
            {t.glossary.terms.map((term, i) => (
              <Panel key={i}>
                <h4 className="font-light text-foreground/95 mb-2 text-base flex items-center gap-2">
                  <span className="text-laser mono text-xs">§</span>{term.term}
                </h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{term.def}</p>
              </Panel>
            ))}
          </div>
        )}

        {/* ─── FAREWELL ─── */}
        {section === "farewell" && (
          <div className="space-y-6">
            <SectionTitle kicker="10 / Soltar" title={t.farewell.title} subtitle={t.farewell.subtitle} />
            <Panel><p className="text-foreground/75 leading-relaxed text-sm md:text-base">{t.farewell.intro}</p></Panel>
            <Panel laser>
              <h3 className="font-light text-foreground/95 mb-4 flex items-center gap-2 text-base">
                <Flame className="w-4 h-4 text-primary" />{t.farewell.letterTitle}
              </h3>
              <p className="text-foreground/85 italic text-sm md:text-base leading-relaxed font-light">{t.farewell.letterText}</p>
            </Panel>
            <Panel><p className="text-foreground/75 text-sm italic leading-relaxed text-center">{t.farewell.closingNote}</p></Panel>
          </div>
        )}

        {/* ─── COMMUNITY ─── */}
        {section === "community" && (
          <div className="space-y-6">
            <SectionTitle kicker="11 / Juntos" title={t.community.title} subtitle={t.community.intro} />

            <h3 className="reveal text-sm font-light text-foreground/80 mono tracking-wider-2 uppercase">— {t.community.lettersTitle}</h3>
            {t.community.letters.map((letter, i) => (
              <Panel key={i}>
                <p className="text-foreground/80 text-sm md:text-base italic leading-relaxed font-light">"{letter.text}"</p>
                <p className="mono text-[10px] tracking-wider-2 text-primary/70 mt-3">— {letter.author}</p>
              </Panel>
            ))}

            <Panel>
              <h3 className="text-base font-light text-foreground/95 mb-2">{t.community.selfCareTitle}</h3>
              <p className="text-foreground/55 text-sm mb-4">{t.community.selfCareIntro}</p>
              <div className="space-y-3">
                {t.community.selfCarePoints.map((p, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground/85 text-sm mb-0.5">{p.title}</p>
                      <p className="text-foreground/55 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <h3 className="text-base font-light text-foreground/95 mb-2">{t.community.recoveryTitle}</h3>
              <p className="text-foreground/55 text-sm mb-4">{t.community.recoveryIntro}</p>
              <div className="space-y-3">
                {t.community.recoveryPoints.map((p, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground/85 text-sm mb-0.5">{p.title}</p>
                      <p className="text-foreground/55 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <h3 className="text-base font-light text-foreground/95 mb-2">{t.community.resourcesTitle}</h3>
              <p className="text-foreground/55 text-sm mb-4">{t.community.resourcesIntro}</p>
              <ul className="space-y-2 text-foreground/70 text-sm">
                {t.community.resources.map((r, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mono text-[10px] text-primary/70 mt-1 tracking-wider-2">0{i + 1}</span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel laser>
              <h3 className="font-light text-foreground/95 mb-3 text-base">{t.community.conclusionTitle}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-3">{t.community.conclusionText}</p>
              <p className="text-foreground/95 font-light text-sm italic">{t.community.conclusionFinal}</p>
            </Panel>
          </div>
        )}

        {/* ─── TLP DOLOR ─── */}
        {section === "tlpDolor" && t.tlpDolor && (
          <div className="space-y-6">
            <SectionTitle kicker="12 / Su dolor" title={t.tlpDolor.title} subtitle={t.tlpDolor.subtitle} />
            <Panel><p className="text-foreground/75 leading-relaxed text-sm md:text-base">{t.tlpDolor.intro}</p></Panel>
            {t.tlpDolor.points.map((p, i) => (
              <Panel key={i}>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{p.title}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{p.desc}</p>
              </Panel>
            ))}
            <Panel laser><p className="text-foreground/85 text-sm italic leading-relaxed">{t.tlpDolor.closingNote}</p></Panel>
          </div>
        )}

        {/* ─── CLINICAL ─── */}
        {section === "clinical" && t.clinical && (
          <div className="space-y-6">
            <SectionTitle kicker="13 / Clínico" title={t.clinical.title} subtitle={t.clinical.subtitle} />
            <Panel><p className="text-foreground/75 leading-relaxed text-sm md:text-base">{t.clinical.intro}</p></Panel>

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.clinical.dsmTitle}</h3>
            <Panel><p className="text-foreground/65 text-sm italic leading-relaxed">{t.clinical.dsmIntro}</p></Panel>
            <div className="grid md:grid-cols-2 gap-3">
              {t.clinical.dsmCriteria.map((c, i) => (
                <Panel key={i}>
                  <p className="mono text-[10px] tracking-wider-2 text-primary/70 mb-1">— {c.n}</p>
                  <h4 className="font-light text-foreground/95 mb-2 text-base">{c.title}</h4>
                  <p className="text-foreground/60 text-sm leading-relaxed">{c.desc}</p>
                </Panel>
              ))}
            </div>
            <Panel laser><p className="text-foreground/80 text-sm italic leading-relaxed">{t.clinical.dsmNote}</p></Panel>

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.clinical.originTitle}</h3>
            <Panel><p className="text-foreground/65 text-sm italic leading-relaxed">{t.clinical.originIntro}</p></Panel>
            {t.clinical.originPoints.map((p, i) => (
              <Panel key={i}>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{p.title}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{p.desc}</p>
              </Panel>
            ))}

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.clinical.diffTitle}</h3>
            <Panel><p className="text-foreground/65 text-sm italic leading-relaxed">{t.clinical.diffIntro}</p></Panel>
            {t.clinical.diffItems.map((d, i) => (
              <Panel key={i}>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{d.name}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{d.desc}</p>
              </Panel>
            ))}

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.clinical.dbtTitle}</h3>
            <Panel><p className="text-foreground/65 text-sm italic leading-relaxed">{t.clinical.dbtIntro}</p></Panel>
            {t.clinical.dbtModules.map((m, i) => (
              <Panel key={i}>
                <p className="mono text-[10px] tracking-wider-2 text-primary/70 mb-1">— M.0{i + 1}</p>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{m.name}</h4>
                <p className="text-foreground/65 text-sm leading-relaxed mb-2">{m.desc}</p>
                <p className="text-foreground/55 text-xs italic leading-relaxed"><span className="text-foreground/70">Ej:</span> {m.example}</p>
              </Panel>
            ))}

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.clinical.selfcareTitle}</h3>
            {t.clinical.selfcareItems.map((s, i) => (
              <Panel key={i}>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{s.title}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
              </Panel>
            ))}

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.clinical.familyTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Panel>
                <p className="mono text-[10px] tracking-wider-2 text-primary/80 mb-3">✓ Hacer</p>
                <ul className="space-y-2">
                  {t.clinical.familyDo.map((it, i) => (
                    <li key={i} className="text-foreground/70 text-sm leading-relaxed flex gap-2">
                      <span className="text-primary/70 mono text-[10px] mt-1">0{i + 1}</span><span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel>
                <p className="mono text-[10px] tracking-wider-2 text-foreground/50 mb-3">✗ Evitar</p>
                <ul className="space-y-2">
                  {t.clinical.familyDont.map((it, i) => (
                    <li key={i} className="text-foreground/70 text-sm leading-relaxed flex gap-2">
                      <span className="text-foreground/40 mono text-[10px] mt-1">0{i + 1}</span><span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>

            <Panel laser>
              <h3 className="font-light text-foreground/95 mb-3 text-base">{t.clinical.recoveryTitle}</h3>
              <p className="text-foreground/75 text-sm leading-relaxed">{t.clinical.recoveryText}</p>
            </Panel>
            <Panel><p className="text-foreground/55 text-xs italic leading-relaxed">{t.clinical.disclaimer}</p></Panel>
          </div>
        )}

        {/* ─── RESOURCES ─── */}
        {section === "resources" && t.resources && (
          <div className="space-y-6">
            <SectionTitle kicker="14 / Recursos" title={t.resources.title} subtitle={t.resources.subtitle} />
            <Panel><p className="text-foreground/75 leading-relaxed text-sm md:text-base">{t.resources.intro}</p></Panel>

            <Panel laser>
              <h3 className="font-light text-foreground/95 mb-3 text-base">{t.resources.crisisTitle}</h3>
              <p className="text-foreground/85 text-sm leading-relaxed">{t.resources.crisisText}</p>
            </Panel>

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">— {t.resources.bcnTitle}</h3>
            {t.resources.bcnItems.map((r, i) => (
              <Panel key={i}>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{r.name}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed mb-2">{r.desc}</p>
                <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">{r.contact}</p>
              </Panel>
            ))}

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">— {t.resources.spainTitle}</h3>
            {t.resources.spainItems.map((r, i) => (
              <Panel key={i}>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{r.name}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed mb-2">{r.desc}</p>
                <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">{r.contact}</p>
              </Panel>
            ))}

            <h3 className="reveal text-base font-light text-foreground/90 pt-2">— {t.resources.worldTitle}</h3>
            <Panel><p className="text-foreground/65 text-sm italic leading-relaxed">{t.resources.worldIntro}</p></Panel>
            {t.resources.worldItems.map((r, i) => (
              <Panel key={i}>
                <p className="mono text-[10px] tracking-wider-2 text-foreground/50 uppercase mb-1">— {r.region}</p>
                <h4 className="font-light text-foreground/95 mb-2 text-base">{r.name}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed mb-2">{r.desc}</p>
                <a
                  href={`https://${r.url.split(" ")[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-[10px] tracking-wider-2 text-primary/80 hover:text-laser uppercase"
                >
                  {r.url} ↗
                </a>
              </Panel>
            ))}
          </div>
        )}

        {/* ─── ABRAZO VIRTUAL & CARTAS ─── */}
        {section === "virtualHug" && (
          <div className="space-y-6">
            <SectionTitle
              kicker="01 / Sincrónico"
              title="Experiencia de Abrazo Virtual & Cartas Tiernas"
              subtitle="Sincroniza tu respiración, genera calor auditivo y envía tarjetas personalizadas de consuelo."
            />
            <VirtualHugGenerator />
          </div>
        )}

        {/* ─── DIARIO & RASTREADOR DE ÁNIMO ─── */}
        {section === "moodTracker" && (
          <div className="space-y-6">
            <SectionTitle
              kicker="02 / Registro Privado"
              title="Diario Emocional & Registro de Ánimo"
              subtitle="Sigue la evolución de tus sentimientos con total privacidad local en tu dispositivo."
            />
            <MoodTracker />
          </div>
        )}

        {/* ─── REGULACIÓN SOMÁTICA GSAP ─── */}
        {section === "somaticBreathing" && (
          <div className="space-y-6">
            <SectionTitle
              kicker="03 / Motor Kinetic"
              title="Regulación Somática & Respiración Guiada"
              subtitle="Animación fluida con motor GSAP para desescalar la ansiedad y activar la calma física."
            />
            <GSAPBreathingVisualizer />
          </div>
        )}

        {/* ─── AGENTES IA ─── */}
        {section === "agents" && (
          <div className="space-y-6">
            <SectionTitle
              kicker="04 / Tecnología Sin API"
              title="Agentes de IA Especializados"
              subtitle="Acompañantes inteligentes configurados con síntesis de empatía, desescalada y comunicación de bajo conflicto."
            />
            <Suspense fallback={<div className="glass rounded-3xl border border-foreground/[0.06] h-96 flex items-center justify-center text-foreground/40 text-xs mono">Cargando motor de IA compasiva...</div>}>
              <AgentChat />
            </Suspense>
          </div>
        )}

        {/* ─── DARK SIDE SECTIONS ─── */}
        {crossed && t.darkSide && (section === "darkIntro" || section === "spectrum" || section === "darkTriad" || section === "tactics" || section === "attachment" || section === "profiles" || section === "redFlags" || section === "faqRel" || section === "protocol" || section === "darkClosing") && (
          <div className="space-y-6">
            <p className="reveal mono text-[10px] tracking-wider-2 text-foreground/50 uppercase">— {t.darkSide.sectionLabel}</p>

            {section === "darkIntro" && (
              <>
                <SectionTitle kicker="X1" title={t.darkSide.darkIntro.title} />
                <Panel><p className="text-foreground/75 text-sm md:text-base leading-relaxed">{t.darkSide.darkIntro.intro}</p></Panel>
                {t.darkSide.darkIntro.points.map((p, i) => (
                  <Panel key={i}>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{p.title}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{p.desc}</p>
                  </Panel>
                ))}
                <Panel><p className="text-foreground/70 text-sm italic leading-relaxed">{t.darkSide.darkIntro.note}</p></Panel>
              </>
            )}

            {section === "spectrum" && (
              <>
                <SectionTitle kicker="X2" title={t.darkSide.spectrum.title} subtitle={t.darkSide.spectrum.intro} />
                <Panel><p className="text-foreground/70 text-sm leading-relaxed italic">{t.darkSide.spectrum.disclaimer}</p></Panel>
                {t.darkSide.spectrum.types.map((tp, i) => (
                  <Panel key={i}>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{tp.name}</h4>
                    <p className="text-foreground/65 text-sm leading-relaxed mb-2">{tp.desc}</p>
                    <p className="text-foreground/50 text-xs leading-relaxed italic">{tp.dynamics}</p>
                  </Panel>
                ))}
              </>
            )}

            {section === "darkTriad" && (
              <>
                <SectionTitle kicker="X3" title={t.darkSide.darkTriad.title} subtitle={t.darkSide.darkTriad.intro} />
                {t.darkSide.darkTriad.items.map((it, i) => (
                  <Panel key={i}>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{it.name}</h4>
                    <p className="text-foreground/65 text-sm leading-relaxed mb-3">{it.desc}</p>
                    <ul className="space-y-1 pl-4">
                      {it.signs.map((s, j) => (
                        <li key={j} className="text-foreground/55 text-sm leading-relaxed list-disc">{s}</li>
                      ))}
                    </ul>
                  </Panel>
                ))}
              </>
            )}

            {section === "tactics" && (
              <>
                <SectionTitle kicker="X4" title={t.darkSide.tactics.title} subtitle={t.darkSide.tactics.intro} />
                {t.darkSide.tactics.items.map((it, i) => (
                  <Panel key={i}>
                    <p className="mono text-[10px] tracking-wider-2 text-foreground/50 uppercase mb-1">— {it.category}</p>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{it.name}</h4>
                    <p className="text-foreground/65 text-sm leading-relaxed mb-3">{it.desc}</p>
                    <p className="text-foreground/55 text-xs italic leading-relaxed mb-2"><span className="text-foreground/70">Ej:</span> {it.example}</p>
                    <p className="text-foreground/70 text-xs leading-relaxed"><span className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase">Contramedida</span> · {it.counter}</p>
                  </Panel>
                ))}
              </>
            )}

            {section === "attachment" && (
              <>
                <SectionTitle kicker="X5" title={t.darkSide.attachment.title} subtitle={t.darkSide.attachment.intro} />
                <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.darkSide.attachment.stylesTitle}</h3>
                {t.darkSide.attachment.styles.map((s, i) => (
                  <Panel key={i}>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{s.name}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
                  </Panel>
                ))}
                <h3 className="reveal text-base font-light text-foreground/90 pt-2">{t.darkSide.attachment.combosTitle}</h3>
                <Panel><p className="text-foreground/65 text-sm italic leading-relaxed">{t.darkSide.attachment.combosIntro}</p></Panel>
                {t.darkSide.attachment.combos.map((c, i) => (
                  <Panel key={i}>
                    <p className="mono text-xs tracking-wider text-foreground/80 mb-2">{c.pair}</p>
                    <p className="text-foreground/60 text-sm leading-relaxed">{c.desc}</p>
                  </Panel>
                ))}
              </>
            )}

            {section === "profiles" && (
              <>
                <SectionTitle kicker="X6" title={t.darkSide.profiles.title} subtitle={t.darkSide.profiles.intro} />
                <Panel><p className="text-foreground/65 text-sm italic leading-relaxed">{t.darkSide.profiles.note}</p></Panel>
                {t.darkSide.profiles.items.map((it, i) => (
                  <Panel key={i}>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{it.context}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{it.desc}</p>
                  </Panel>
                ))}
              </>
            )}

            {section === "redFlags" && (
              <>
                <SectionTitle kicker="X7" title={t.darkSide.redFlags.title} subtitle={t.darkSide.redFlags.intro} />
                <Panel>
                  <ul className="space-y-2">
                    {t.darkSide.redFlags.items.map((s, i) => (
                      <li key={i} className="flex gap-3 text-foreground/70 text-sm leading-relaxed">
                        <span className="mono text-[10px] text-primary/70 mt-1 tracking-wider-2">{String(i + 1).padStart(2, "0")}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </Panel>
                <Panel laser><p className="text-foreground/80 text-sm italic leading-relaxed">{t.darkSide.redFlags.conclusion}</p></Panel>
              </>
            )}

            {section === "faqRel" && (
              <>
                <SectionTitle kicker="X8" title={t.darkSide.faqRel.title} subtitle={t.darkSide.faqRel.intro} />
                {t.darkSide.faqRel.questions.map((q, i) => (
                  <Panel key={i}>
                    <p className="mono text-[10px] tracking-wider-2 text-foreground/50 mb-2">— Q.{String(i + 1).padStart(2, "0")}</p>
                    <h4 className="font-light text-foreground/95 mb-3 text-base">{q.q}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{q.a}</p>
                  </Panel>
                ))}
              </>
            )}

            {section === "protocol" && (
              <>
                <SectionTitle kicker="X9" title={t.darkSide.protocol.title} subtitle={t.darkSide.protocol.intro} />
                {t.darkSide.protocol.phases.map((p, i) => (
                  <Panel key={i}>
                    <h4 className="font-light text-foreground/95 mb-2 text-base">{p.name}</h4>
                    <p className="text-foreground/65 text-sm leading-relaxed">{p.desc}</p>
                  </Panel>
                ))}
              </>
            )}

            {section === "darkClosing" && (
              <>
                <SectionTitle kicker="X0" title={t.darkSide.darkClosing.title} />
                <Panel><p className="text-foreground/75 text-sm md:text-base leading-relaxed">{t.darkSide.darkClosing.text}</p></Panel>
                <Panel laser><p className="text-foreground/85 text-sm italic leading-relaxed">{t.darkSide.darkClosing.final}</p></Panel>
              </>
            )}
          </div>
        )}

      </main>
      {/* tlpDolor & dark side sections injected via portal-like block before threshold */}

      {/* Always-visible threshold (discreet) at bottom of main flow when on safe sections */}
      {!crossed && t.threshold && (section === "community" || section === "tlpDolor") && (
        <div className="max-w-5xl mx-auto px-4 pb-12 relative z-10">
          <div className="reveal glass rounded-3xl p-6 md:p-8 border border-foreground/10">
            <p className="mono text-[10px] tracking-wider-2 text-foreground/40 uppercase mb-3">{t.threshold.kicker}</p>
            <h3 className="text-xl md:text-2xl font-light text-foreground/90 mb-3">{t.threshold.title}</h3>
            <p className="mono text-[10px] tracking-wider-2 text-foreground/40 uppercase mb-4">⚠ {t.threshold.warning}</p>
            <p className="text-foreground/65 text-sm leading-relaxed mb-3">{t.threshold.body}</p>
            <p className="text-foreground/55 text-sm leading-relaxed mb-5 italic">{t.threshold.bodyP2}</p>
            <button
              onClick={cross}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mono text-xs tracking-wider-2 border border-foreground/30 text-foreground/80 hover:text-foreground hover:border-foreground/60 transition-all"
            >
              {t.threshold.enter} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
      {crossed && t.threshold && (
        <div className="max-w-5xl mx-auto px-4 pb-6 relative z-10 flex justify-end">
          <button onClick={uncross} className="mono text-[10px] tracking-wider-2 text-foreground/40 hover:text-foreground/70 uppercase">
            ← {t.threshold.return}
          </button>
        </div>
      )}

      {/* ─── Menú al final: Agentes IA ─── */}
      <div className="max-w-5xl mx-auto px-4 pb-2 pt-4 relative z-10">
        <button onClick={() => goTo("agents")} className="w-full text-left group">
          <div className="reveal hover-lift glass laser-border rounded-3xl p-6 md:p-8 flex items-center justify-between gap-4">
            <div>
              <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Tecnología · IA
              </p>
              <h3 className="text-xl md:text-2xl font-light text-foreground/95 mb-2">
                Habla con los agentes de IA
              </h3>
              <p className="text-foreground/55 text-sm leading-relaxed max-w-2xl">
                Un asistente terapéutico que valida y da herramientas, un paciente simulador para practicar empatía y una pareja simuladora para ensayar conversaciones difíciles.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-laser group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>
        </button>
      </div>

      {/* ─── Menú al final: Enciclopedia (capa aparte) ─── */}
      <div className="max-w-5xl mx-auto px-4 pb-4 pt-4 relative z-10">
        <button onClick={enterWiki} className="w-full text-left group">
          <div className="reveal hover-lift glass laser-border rounded-3xl p-6 md:p-8 flex items-center justify-between gap-4">
            <div>
              <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mb-2 flex items-center gap-2">
                <Library className="w-3.5 h-3.5" /> Otra capa · Referencia
              </p>
              <h3 className="text-xl md:text-2xl font-light text-foreground/95 mb-2">
                Enciclopedia de dinámicas y salud mental
              </h3>
              <p className="text-foreground/55 text-sm leading-relaxed max-w-2xl">
                Un manual de referencia aparte, super enriquecido: cada trastorno, su dinámica en pareja, amistad, familia y trabajo, y las dudas más grandes separadas por temas.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-laser group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/[0.06] mt-16 py-10 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
          <p className="text-foreground/50 text-xs leading-relaxed">{t.footer.line1}</p>
          <p className="text-foreground/35 text-xs">{t.footer.line2}</p>
          <p className="mono text-[10px] tracking-wider-2 text-foreground/25 uppercase pt-2">{t.footer.line3}</p>
          <nav aria-label="Enciclopedia" className="pt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="/enciclopedia" className="mono text-[10px] tracking-wider-2 text-foreground/40 hover:text-foreground/80 uppercase">
              Enciclopedia
            </a>
            {["tlp", "tept-c", "bipolar", "narcisista", "tdah", "tca", "adicciones", "duelo", "burnout"].map((id) => (
              <a
                key={id}
                href={`/enciclopedia/${id}`}
                className="mono text-[10px] tracking-wider-2 text-foreground/30 hover:text-foreground/70 uppercase"
              >
                {id.replace("-", " ")}
              </a>
            ))}
          </nav>
          <DiscreetCredit variant="footer" className="mt-6" />
        </div>
      </footer>
      <AccessibilityPanel />
      <MobileNav
        currentSection={section}
        onSelectSection={(s) => goTo(s)}
        onOpenSOS={() => setSosOpen(true)}
        onOpenWiki={enterWiki}
      />
      <AudioPlayer />
      <SOSModal isOpen={sosOpen} onClose={() => setSosOpen(false)} />
    </div>
  );
};

export default Index;
