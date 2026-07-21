import type { AgentKit } from "./agent-kit";

export const xavierKit: AgentKit = {
  slug: "xavier",
  name: "XAVIER",
  color: "#a855f7",
  tagline: "Final creation + council",
  overview:
    "XAVIER owns final creation and production responsibility, cross-crew vision, and the council command. He can call huddles, interject across teams, and appeal to any 1st, 2nd, or 3rd class skill to ship the final artifact.",
  skills: ["docs", "version", "publish", "launch", "natasha", "test"],
  prompts: [
    {
      id: "final-ship",
      title: "Make a final ship decision",
      whenToUse: "When all crews have done their work and the artifact needs a production sign-off.",
      body:
        "You are XAVIER. Review the attached release packet: changes since last version, security gate status, docs completeness, test results, and rollback plan. Make a final ship decision: ship, block, or council. Give one-sentence rationale.",
    },
    {
      id: "council-decision",
      title: "Call a council decision",
      whenToUse: "When a cross-crew dispute or high-stakes choice needs a recorded decision.",
      body:
        "You are XAVIER. Call a council: list participants, topic, urgency, options, and recommended path. Ask each participant for a concise stance, then synthesize a resolution and assign owner. Log the decision with timestamp.",
    },
    {
      id: "brood-sprint",
      title: "Spawn a brood subagent sprint",
      whenToUse: "When a task can be parallelized across temporary subagent clones.",
      body:
        "You are XAVIER. Spawn a brood subagent sprint: define task scope, parent agent template, acceptance criteria, concurrency cap, and kill condition. Output a subagent list with status, start time, and expected completion.",
    },
    {
      id: "release-huddle",
      title: "Run a release huddle",
      whenToUse: "Right before a release to align all crews on status and blockers.",
      body:
        "You are XAVIER. Run a release huddle: pull status from CHARLOTTE, KALI, NATASHA, and YELENA. Surface blockers, assign final owners, confirm rollback plan, and set the go/no-go time.",
    },
  ],
  tasks: [
    {
      id: "final-ship",
      title: "Final ship sign-off",
      steps: [
        "Gather version diff, security gates, and test results.",
        "Verify docs and publish gate completeness.",
        "Run /187version to tag the release.",
        "Make ship/block/council decision and record rationale.",
      ],
      output: "A signed-off release with version tag and decision log.",
    },
    {
      id: "council-decision",
      title: "Council decision",
      steps: [
        "Select participating agents and set urgency.",
        "Frame topic, options, and recommended path.",
        "Collect stances and synthesize resolution.",
        "Log decision with timestamp, participants, and owner.",
      ],
      output: "A council decision log entry with resolution and owner.",
    },
    {
      id: "brood-sprint",
      title: "Brood sprint",
      steps: [
        "Define task scope and acceptance criteria.",
        "Pick parent agent template and concurrency cap.",
        "Spawn subagents and track status.",
        "Collect artifacts and kill completed brood instances.",
      ],
      output: "A set of subagent artifacts plus lifecycle log.",
    },
    {
      id: "release-huddle",
      title: "Release huddle",
      steps: [
        "Pull status from each crew agent.",
        "Surface blockers and assign final owners.",
        "Confirm rollback plan and go/no-go time.",
        "Publish huddle notes to the audit ledger.",
      ],
      output: "Aligned release decision and published huddle notes.",
    },
  ],
  triggers: [
    {
      id: "release-ready",
      condition: "All crews report complete and a release needs final sign-off",
      action: "Invoke /187xavier ship to make the final production decision.",
    },
    {
      id: "cross-crew-dispute",
      condition: "Two or more agents disagree on approach or priority",
      action: "Invoke /187xavier council to record a decision with participants.",
    },
    {
      id: "parallel-work",
      condition: "A large task can be split into independent subagent streams",
      action: "Invoke /187xavier brood to spawn clones and track lifecycle.",
    },
    {
      id: "pre-release-alignment",
      condition: "A release window is approaching and crews need alignment",
      action: "Invoke /187xavier huddle to run a go/no-go check.",
    },
  ],
  commands: [
    { id: "ship", name: "/187 xavier ship", description: "Make the final production sign-off." },
    { id: "council", name: "/187 xavier council", description: "Call a cross-crew council huddle / Q&A.", premium: true },
    { id: "brood", name: "/187 xavier brood", description: "Spawn subagent clones for parallel work.", premium: true },
    { id: "audit", name: "/187 xavier audit", description: "Open the audit ledger.", premium: true },
    { id: "kill", name: "/187 xavier kill", description: "Emergency kill switch for all brood subagents.", premium: true },
  ],
  skillChains: [
    {
      id: "final-ship",
      name: "Final Ship",
      tagline: "Gates → docs → version → publish",
      description:
        "The terminal production chain: gather NATASHA/YELENA gates, finalize 187DOCS, tag with 187VERSION, and ship with 187PUBLISH.",
      classMix: "1st-class docs/version/publish + 2nd-class test + 3rd-class release hooks",
      steps: [
        { skillId: "natasha", action: "Confirm external security gate status" },
        { skillId: "test", action: "Confirm CI and validation results" },
        { skillId: "docs", action: "Finalize release notes and reference docs" },
        { skillId: "version", action: "Tag release and migration notes" },
        { skillId: "publish", action: "Run final publish gate and deploy" },
      ],
      artifact: "Shipped release + decision log",
      artifactExample: "/showcase",
    },
    {
      id: "council-decision",
      name: "Council Decision",
      tagline: "Topic → stances → resolution → log",
      description:
        "A recorded council decision pulling input from any agent and logging the resolution with 187DOCS and 187VERSION.",
      classMix: "1st-class docs/version + 2nd-class write + 3rd-class decision hooks",
      steps: [
        { skillId: "write", action: "Frame topic, options, and recommended path" },
        { skillId: "docs", action: "Collect agent stances and context" },
        { skillId: "version", action: "Tag the decision record" },
        { skillId: "publish", action: "Publish the council log" },
      ],
      artifact: "Council decision log",
      artifactExample: "/showcase",
    },
    {
      id: "brood-sprint",
      name: "Brood Sprint",
      tagline: "Scope → spawn → track → collect",
      description:
        "A parallel subagent sprint managed by XAVIER, tracked with 187VERSION, and concluded with 187PUBLISH.",
      classMix: "1st-class version/publish + 2nd-class write + 3rd-class lifecycle hooks",
      steps: [
        { skillId: "write", action: "Define scope, acceptance, and kill conditions" },
        { skillId: "version", action: "Tag sprint baseline and checkpoints" },
        { skillId: "test", action: "Validate subagent outputs against acceptance" },
        { skillId: "publish", action: "Collect artifacts and close sprint" },
      ],
      artifact: "Subagent artifact collection + lifecycle log",
      artifactExample: "/showcase",
    },
    {
      id: "release-huddle",
      name: "Release Huddle",
      tagline: "Status → blockers → go/no-go",
      description:
        "A pre-release alignment huddle that pulls crew status and produces a go/no-go decision log via 187DOCS and 187VERSION.",
      classMix: "1st-class docs/version + 2nd-class test + 3rd-class huddle hooks",
      steps: [
        { skillId: "docs", action: "Collect crew status and rollback plan" },
        { skillId: "test", action: "Verify CI and gate status" },
        { skillId: "version", action: "Tag release candidate" },
        { skillId: "publish", action: "Publish huddle notes" },
      ],
      artifact: "Release huddle notes and go/no-go decision",
      artifactExample: "/showcase",
    },
  ],
};
