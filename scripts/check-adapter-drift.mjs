#!/usr/bin/env node
/**
 * Verify that every canonical .claude/skills/<name>/SKILL.md has a matching
 * adapter in .gemini, .kimi, .chatgpt, .grok, .ollama, and .herme.
 *
 * Gemini adapters must preserve system_instruction fidelity.
 */
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoot } from "./lib/suite-constants.mjs";

const root = fileURLToPath(projectRoot());
const skillsDir = join(root, ".claude/skills");
const adapters = [
  { dir: ".gemini/skills", file: "SKILL.md" },
  { dir: ".kimi/skills", file: "SKILL.md" },
  { dir: ".chatgpt/skills", file: "SKILL.md" },
  { dir: ".grok/skills", file: "SKILL.md" },
  { dir: ".ollama/modelfiles", file: "Modelfile" },
  { dir: ".herme/agents", file: "SKILL.md" },
];

const dirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let errors = 0;
for (const skill of dirs) {
  for (const adapter of adapters) {
    const path = join(root, adapter.dir, skill, adapter.file);
    if (!existsSync(path)) {
      console.error(`❌ missing adapter: ${adapter.dir}/${skill}/${adapter.file}`);
      errors++;
      continue;
    }
    if (adapter.dir === ".gemini/skills") {
      const text = readFileSync(path, "utf8");
      if (!text.includes("system_instruction:")) {
        console.error(`❌ gemini fidelity: missing system_instruction in ${adapter.dir}/${skill}/${adapter.file}`);
        errors++;
      }
      if (!text.includes("model_adapter: gemini")) {
        console.error(`❌ gemini fidelity: missing model_adapter: gemini in ${adapter.dir}/${skill}/${adapter.file}`);
        errors++;
      }
    }
  }
}
if (errors) {
  console.error(`\n${errors} adapter drift error(s)`);
  process.exit(1);
}
console.log(`✅ Adapter drift check passed for ${dirs.length} skills`);
