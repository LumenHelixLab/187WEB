/**
 * Fail if public skill showcase cards fall below equal-depth targets.
 * Run: npx tsx scripts/check-skill-parity.ts
 */
import { skillShowcases } from "../lib/skill-showcase-data";

const MIN = {
  triggers: 8,
  useCases: 4,
  outputs: 5,
  description: 40,
} as const;

const MAX = {
  /** Soft cap for public cards; access/include may be higher but should not explode. */
  triggers: 14,
  description: 320,
} as const;

type Issue = { id: string; field: string; detail: string };

const issues: Issue[] = [];

for (const s of skillShowcases) {
  if (s.triggers.length < MIN.triggers) {
    issues.push({
      id: s.id,
      field: "triggers",
      detail: `${s.triggers.length} < ${MIN.triggers}`,
    });
  }
  if (s.triggers.length > MAX.triggers) {
    issues.push({
      id: s.id,
      field: "triggers",
      detail: `${s.triggers.length} > ${MAX.triggers} (trim public card; keep depth in SKILL.md)`,
    });
  }
  if (s.useCases.length < MIN.useCases) {
    issues.push({
      id: s.id,
      field: "useCases",
      detail: `${s.useCases.length} < ${MIN.useCases}`,
    });
  }
  if (s.outputs.length < MIN.outputs) {
    issues.push({
      id: s.id,
      field: "outputs",
      detail: `${s.outputs.length} < ${MIN.outputs}`,
    });
  }
  if (s.description.trim().length < MIN.description) {
    issues.push({
      id: s.id,
      field: "description",
      detail: `${s.description.length} chars < ${MIN.description}`,
    });
  }
  if (s.description.length > MAX.description) {
    issues.push({
      id: s.id,
      field: "description",
      detail: `${s.description.length} chars > ${MAX.description} (shorten for plain language)`,
    });
  }
}

if (issues.length === 0) {
  console.log(`skill parity OK — ${skillShowcases.length} skills meet depth targets`);
  process.exit(0);
}

console.error("skill parity failures:");
for (const i of issues) {
  console.error(`  - ${i.id}.${i.field}: ${i.detail}`);
}
process.exit(1);
