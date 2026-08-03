import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { DUDAS } from "../../../content/wiki-data";

export default defineTool({
  name: "list_faqs",
  title: "List FAQs",
  description:
    "List the encyclopedia's frequently-asked questions and answers about relationships and mental health, grouped by category (boundaries, is-it-me, manipulation, asking for help, etc.). Optionally filter by a category id.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe("Optional category id to filter by, e.g. 'limites', 'manipulacion' (omit for all)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const cats = category ? DUDAS.filter((c) => c.id === category.trim().toLowerCase()) : DUDAS;
    if (cats.length === 0) {
      const ids = DUDAS.map((c) => `${c.id} (${c.category})`).join(", ");
      return {
        content: [{ type: "text", text: `No hay categoría "${category}". Disponibles: ${ids}` }],
        isError: true,
      };
    }
    const text = cats
      .map((c) => `${c.icon} ${c.category} — id: ${c.id}\n${c.questions.map((qa) => `  • ${qa.q}\n    ${qa.a}`).join("\n")}`)
      .join("\n\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: {
        categories: cats.map((c) => ({ id: c.id, category: c.category, questions: c.questions })),
      },
    };
  },
});