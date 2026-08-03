// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { WIKI_DATA } from "../src/content/wiki-data";

const BASE_URL = "https://tender-words-connect.lovable.app";

type Entry = { path: string; changefreq?: string; priority?: string };

const entries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/enciclopedia", changefreq: "weekly", priority: "0.9" },
  ...WIKI_DATA.map((d) => ({ path: `/enciclopedia/${d.id}`, changefreq: "monthly", priority: "0.8" })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);