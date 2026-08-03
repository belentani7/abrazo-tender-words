export type { Lang, Translations } from "./types";
export { langLabels } from "./types";
import type { Lang, Translations } from "./types";
import { langLabels } from "./types";
import { es } from "./es";
import { en } from "./en";
import { pt } from "./pt";
import { ca } from "./ca";
import { darkEs } from "./dark/es";
import { darkEn } from "./dark/en";
import { extrasEs } from "./extras/es";
import { extrasEn } from "./extras/en";

const merge = (base: Translations, dark: typeof darkEs, extras: typeof extrasEs): Translations => ({
  ...base,
  nav: { ...base.nav, ...dark.nav, ...extras.nav },
  tlpDolor: dark.tlpDolor,
  threshold: dark.threshold,
  darkSide: dark.darkSide,
  clinical: extras.clinical,
  resources: extras.resources,
  news: extras.news,
  a11y: extras.a11y,
});

export const translations: Record<Lang, Translations> = {
  es: merge(es, darkEs, extrasEs),
  en: merge(en, darkEn, extrasEn),
  pt: merge(pt, darkEs, extrasEs),
  ca: merge(ca, darkEs, extrasEs),
};
export { langLabels as langLabelsExport };
