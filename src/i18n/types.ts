export type Lang = "es" | "en" | "pt" | "ca";

export const langLabels: Record<Lang, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  ca: "Català",
};

export interface Translations {
  nav: {
    home: string;
    understanding: string;
    signs: string;
    story: string;
    tools: string;
    boundaries: string;
    forBoth: string;
    whatIfMe: string;
    faq: string;
    glossary: string;
    farewell: string;
    community: string;
    young?: string;
    tlpDolor?: string;
    darkIntro?: string;
    spectrum?: string;
    darkTriad?: string;
    tactics?: string;
    attachment?: string;
    profiles?: string;
    redFlags?: string;
    faqRel?: string;
    protocol?: string;
    darkClosing?: string;
    clinical?: string;
    resources?: string;
    news?: string;
  };
  header: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  home: {
    heroTitle: string;
    heroP1: string;
    heroP2: string;
    heroP3: string;
    ctaButton: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  understanding: {
    title: string;
    intro: string;
    emotionalSkinTitle: string;
    emotionalSkinDesc: string;
    abandonmentTitle: string;
    abandonmentDesc: string;
    voidTitle: string;
    voidDesc: string;
    closingNote: string;
    clinicalTitle: string;
    clinicalPoints: { title: string; desc: string }[];
  };
  signs: {
    title: string;
    intro: string;
    patterns: { title: string; desc: string }[];
    closingNote: string;
  };
  story: {
    title: string;
    subtitle: string;
    quote: string;
    intro: string;
    bodyP1: string;
    bodyP2: string;
    bodyP3: string;
    bodyP4: string;
    bodyP5: string;
    credit: string;
  };
  tools: {
    title: string;
    intro: string;
    validationTitle: string;
    validationSituation: string;
    validationWrong: string;
    validationRight: string;
    validationWhy: string;
    trafficLightTitle: string;
    redLabel: string;
    redDesc: string;
    yellowLabel: string;
    yellowDesc: string;
    greenLabel: string;
    greenDesc: string;
    breathingTitle: string;
    breathingDesc: string;
    breathingInhale: string;
    breathingHold: string;
    breathingExhale: string;
    communicationTitle: string;
    communicationIntro: string;
    commPoints: { title: string; desc: string }[];
    dontDoTitle: string;
    dontDoDesc: string;
  };
  boundaries: {
    title: string;
    intro: string;
    badTitle: string;
    badExample: string;
    badExplain: string;
    goodTitle: string;
    goodExample: string;
    hardestTitle: string;
    hardestDesc: string;
    tipsTitle: string;
    tips: { title: string; desc: string }[];
  };
  forBoth: {
    title: string;
    subtitle: string;
    intro: string;
    sideATitle: string;
    sideASubtitle: string;
    sideAPoints: { title: string; desc: string }[];
    sideBTitle: string;
    sideBSubtitle: string;
    sideBPoints: { title: string; desc: string }[];
  };
  whatIfMe: {
    title: string;
    subtitle: string;
    intro: string;
    signsTitle: string;
    signsIntro: string;
    signs: { title: string; desc: string }[];
    stepsTitle: string;
    steps: { title: string; desc: string }[];
    closingNote: string;
  };
  faq: {
    title: string;
    intro: string;
    questions: { q: string; a: string }[];
  };
  glossary: {
    title: string;
    intro: string;
    terms: { term: string; def: string }[];
  };
  farewell: {
    title: string;
    subtitle: string;
    intro: string;
    letterTitle: string;
    letterText: string;
    closingNote: string;
  };
  community: {
    title: string;
    intro: string;
    lettersTitle: string;
    letters: { text: string; author: string }[];
    resourcesTitle: string;
    resourcesIntro: string;
    resources: string[];
    selfCareTitle: string;
    selfCareIntro: string;
    selfCarePoints: { title: string; desc: string }[];
    recoveryTitle: string;
    recoveryIntro: string;
    recoveryPoints: { title: string; desc: string }[];
    conclusionTitle: string;
    conclusionText: string;
    conclusionFinal: string;
  };
  tlpDolor?: {
    title: string;
    subtitle: string;
    intro: string;
    points: { title: string; desc: string }[];
    closingNote: string;
  };
  young?: {
    title: string;
    subtitle: string;
    intro: string;
    science: {
      title: string;
      intro: string;
      points: { title: string; desc: string }[];
      note: string;
    };
    speak: {
      title: string;
      intro: string;
      calmsTitle: string;
      calms: string[];
      sparksTitle: string;
      sparks: string[];
      exampleTitle: string;
      example: { bad: string; good: string; why: string }[];
    };
    limits: {
      title: string;
      intro: string;
      points: { title: string; desc: string }[];
      hardTitle: string;
      hardDesc: string;
    };
    selfcare: {
      title: string;
      intro: string;
      points: { title: string; desc: string }[];
    };
    intimacy: {
      title: string;
      intro: string;
      points: { title: string; desc: string }[];
    };
    leave: {
      title: string;
      intro: string;
      signalsTitle: string;
      signals: string[];
      planTitle: string;
      plan: { title: string; desc: string }[];
      note: string;
    };
    closing: string;
  };
  threshold?: {
    kicker: string;
    title: string;
    warning: string;
    body: string;
    bodyP2: string;
    enter: string;
    return: string;
    crossedLabel: string;
  };
  darkSide?: {
    sectionLabel: string;
    darkIntro: {
      title: string;
      intro: string;
      points: { title: string; desc: string }[];
      note: string;
    };
    spectrum: {
      title: string;
      intro: string;
      disclaimer: string;
      types: { name: string; desc: string; dynamics: string }[];
    };
    darkTriad: {
      title: string;
      intro: string;
      items: { name: string; desc: string; signs: string[] }[];
    };
    tactics: {
      title: string;
      intro: string;
      items: { name: string; category: string; desc: string; example: string; counter: string }[];
    };
    attachment: {
      title: string;
      intro: string;
      stylesTitle: string;
      styles: { name: string; desc: string }[];
      combosTitle: string;
      combosIntro: string;
      combos: { pair: string; desc: string }[];
    };
    profiles: {
      title: string;
      intro: string;
      note: string;
      items: { context: string; desc: string }[];
    };
    redFlags: {
      title: string;
      intro: string;
      items: string[];
      conclusion: string;
    };
    faqRel: {
      title: string;
      intro: string;
      questions: { q: string; a: string }[];
    };
    protocol: {
      title: string;
      intro: string;
      phases: { name: string; desc: string }[];
    };
    darkClosing: {
      title: string;
      text: string;
      final: string;
    };
  };
  footer: {
    line1: string;
    line2: string;
    line3: string;
  };
  clinical?: {
    title: string;
    subtitle: string;
    intro: string;
    dsmTitle: string;
    dsmIntro: string;
    dsmCriteria: { n: string; title: string; desc: string }[];
    dsmNote: string;
    originTitle: string;
    originIntro: string;
    originPoints: { title: string; desc: string }[];
    diffTitle: string;
    diffIntro: string;
    diffItems: { name: string; desc: string }[];
    neuroTitle?: string;
    neuroIntro?: string;
    neuroPoints?: { title: string; desc: string }[];
    comorbidTitle?: string;
    comorbidIntro?: string;
    comorbidPoints?: { title: string; desc: string }[];
    improvementTitle?: string;
    improvementIntro?: string;
    improvementList?: string[];
    dbtTitle: string;
    dbtIntro: string;
    dbtModules: { name: string; desc: string; example: string }[];
    selfcareTitle: string;
    selfcareItems: { title: string; desc: string }[];
    familyTitle: string;
    familyDo: string[];
    familyDont: string[];
    recoveryTitle: string;
    recoveryText: string;
    disclaimer: string;
  };
  resources?: {
    title: string;
    subtitle: string;
    intro: string;
    bcnTitle: string;
    bcnItems: { name: string; desc: string; contact: string }[];
    spainTitle: string;
    spainItems: { name: string; desc: string; contact: string }[];
    worldTitle: string;
    worldIntro: string;
    worldItems: { region: string; name: string; desc: string; url: string }[];
    crisisTitle: string;
    crisisText: string;
  };
  news?: {
    title: string;
    subtitle: string;
    intro: string;
    refresh: string;
    refreshing: string;
    lastUpdate: string;
    empty: string;
    error: string;
    source: string;
    open: string;
  };
  a11y?: {
    title: string;
    open: string;
    close: string;
    contrast: string;
    fontSize: string;
    reduceMotion: string;
    skipSensitive: string;
    dyslexia: string;
    reset: string;
  };
}
