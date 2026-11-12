// Writes upstream's BASE_CONFIGURATION (every backend feature disabled,
// "secure by default") as the static GET /configuration response, so the
// frontend sees a well-formed "features off" config instead of an error.
// Run from frontend/ (to resolve @monkeytype/schemas) with tsx.
import { mkdirSync, writeFileSync } from "node:fs";
import { BASE_CONFIGURATION } from "./base-configuration";

const out = process.argv[2];
if (out === undefined) throw new Error("usage: export-configuration <out>");
mkdirSync(out.slice(0, out.lastIndexOf("/")), { recursive: true });
writeFileSync(
  out,
  JSON.stringify({
    message: "Configuration retrieved",
    data: { ...BASE_CONFIGURATION, maintenance: false },
  }),
);
console.log(`wrote ${out}`);
