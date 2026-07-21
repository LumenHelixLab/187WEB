import type { AgentKit } from "./agent-kit";

export const natashaKit: AgentKit = {
  slug: "natasha",
  name: "NATASHA",
  color: "#f43f5e",
  tagline: "External + post-launch security",
  overview:
    "NATASHA handles external and post-launch security for 187WEB: threat-surface audits, contract and chain assurance, and test-driven validation after ship. She works in tandem with YELENA and can call XAVIER for a council when an incident needs cross-crew coordination.",
  skills: ["natasha", "chain", "test"],
  prompts: [
    {
      id: "threat-sweep",
      title: "Run a post-launch threat sweep",
      whenToUse: "After a public surface ships and needs an external security review.",
      body:
        "You are NATASHA. Run a post-launch threat sweep on the described public surface. Output: attack surface list, severity/confidence matrix, claim-discipline check, and a prioritized patch plan. Escalate to XAVIER if severity is critical.",
    },
    {
      id: "contract-audit",
      title: "Scope a contract audit",
      whenToUse: "When a smart contract or API surface needs assurance review.",
      body:
        "You are NATASHA. Scope a contract/API audit: objectives, trust assumptions, in-scope functions, known risk vectors, tool list, and responsible disclosure plan. Separate severity from confidence for each finding.",
    },
    {
      id: "bounty-triage",
      title: "Triage a public bounty report",
      whenToUse: "When a security report arrives from a public bounty program.",
      body:
        "You are NATASHA. Triage the attached bounty report: reproduce the issue, classify severity and confidence, check claim discipline, decide reward/duplicate/out-of-scope, and draft the response. Loop XAVIER for council if reward is disputed.",
    },
    {
      id: "external-access-review",
      title: "Review external access exposure",
      whenToUse: "When a public surface exposes auth, admin, or data endpoints.",
      body:
        "You are NATASHA. Review external access exposure: enumerate public endpoints, check auth/authorization gaps, verify rate limiting, scan for sensitive data leakage, and recommend YELENA for internal IAM follow-up.",
    },
  ],
  tasks: [
    {
      id: "post-launch-threat-sweep",
      title: "Post-launch threat sweep",
      steps: [
        "Enumerate public attack surface and entry points.",
        "Run /187natasha against claims and trust boundaries.",
        "Add /187test validation for findings.",
        "Produce severity-ranked patch plan and escalate criticals.",
      ],
      output: "External threat report + patch plan + escalation log.",
    },
    {
      id: "contract-audit-chain",
      title: "Contract audit chain",
      steps: [
        "Define scope and trust assumptions.",
        "Run /187chain for static and DeFi risk analysis.",
        "Cross-check with /187natasha threat-surface review.",
        "Write findings report with severity/confidence matrix.",
      ],
      output: "Smart-contract / API audit report with disclosure notes.",
    },
    {
      id: "public-bounty-triage",
      title: "Public bounty triage",
      steps: [
        "Reproduce and classify the reported issue.",
        "Assign severity/confidence and check claim discipline.",
        "Run /187test for validation coverage.",
        "Draft response and bounty decision.",
      ],
      output: "Triage log with severity ranking and bounty decision.",
    },
    {
      id: "external-access-review",
      title: "External access review",
      steps: [
        "Map public endpoints and auth flows.",
        "Check access controls with /187natasha and /187access-plus.",
        "Scan for data leakage and misconfiguration.",
        "Hand off internal IAM gaps to YELENA.",
      ],
      output: "Public surface access audit with remediation list.",
    },
  ],
  triggers: [
    {
      id: "public-shipped",
      condition: "A page, API, or contract is deployed to a public URL",
      action: "Invoke /187natasha for a post-launch threat sweep.",
    },
    {
      id: "contract-deployed",
      condition: "A smart contract or external API is deployed or upgraded",
      action: "Invoke /187chain and /187natasha for an audit chain.",
    },
    {
      id: "bounty-inbound",
      condition: "A security report arrives from a public bounty channel",
      action: "Invoke /187natasha to triage severity and route to council if disputed.",
    },
    {
      id: "access-misconfig",
      condition: "Public endpoint, admin panel, or API key is suspected exposed",
      action: "Invoke /187natasha external access review and hand internal gaps to YELENA.",
    },
  ],
  commands: [
    { id: "sweep", name: "/187 natasha sweep", description: "Run a post-launch external threat sweep." },
    { id: "audit", name: "/187 natasha audit", description: "Scope and run a contract/API audit chain." },
    { id: "triage", name: "/187 natasha triage", description: "Triage a public bounty report." },
    { id: "escalate", name: "/187 natasha escalate", description: "Escalate a critical finding to XAVIER council." },
  ],
  skillChains: [
    {
      id: "post-launch-threat-sweep",
      name: "Post-Launch Threat Sweep",
      tagline: "Shipped surface → audit → patch plan",
      description:
        "A post-launch external security review using 187NATASHA, 187CHAIN, 187TEST, and 187VERSION to track fixes.",
      classMix: "1st-class natasha/chain/test/version + 2nd-class write + 3rd-class scan hooks",
      steps: [
        { skillId: "natasha", action: "Map attack surface and trust boundaries" },
        { skillId: "chain", action: "Check contract/API risk vectors" },
        { skillId: "test", action: "Validate reproducibility of findings" },
        { skillId: "version", action: "Tag findings and patch releases" },
      ],
      artifact: "External threat report + patch plan",
      artifactExample: "/187natasha",
    },
    {
      id: "contract-audit-chain",
      name: "Contract Audit Chain",
      tagline: "Scope → static → dynamic → report",
      description:
        "A scoped smart-contract or API audit combining 187CHAIN, 187NATASHA, 187TEST, and 187DOCS.",
      classMix: "1st-class chain/natasha/test/docs + 2nd-class research + 3rd-class disclosure hooks",
      steps: [
        { skillId: "chain", action: "Scope the audit and run static analysis" },
        { skillId: "natasha", action: "Add threat-surface and claim-discipline review" },
        { skillId: "test", action: "Validate findings and add regression tests" },
        { skillId: "docs", action: "Write audit report and responsible disclosure notes" },
      ],
      artifact: "Smart-contract / API audit report",
      artifactExample: "/187chain",
    },
    {
      id: "public-bounty-triage",
      name: "Public Bounty Triage",
      tagline: "Report → reproduce → severity → response",
      description:
        "Triage incoming public bounty reports with 187NATASHA, 187TEST, and 187VERSION for severity ranking and response tracking.",
      classMix: "1st-class natasha/test/version + 2nd-class write + 3rd-class bounty hooks",
      steps: [
        { skillId: "natasha", action: "Reproduce and classify the report" },
        { skillId: "test", action: "Validate the issue and check coverage" },
        { skillId: "version", action: "Tag triage decision and fix release" },
        { skillId: "write", action: "Draft public response and bounty decision" },
      ],
      artifact: "Triage log and severity ranking",
      artifactExample: "/187natasha",
    },
    {
      id: "external-access-review",
      name: "External Access Review",
      tagline: "Endpoints → auth → leakage → IAM handoff",
      description:
        "A public-surface access audit using 187NATASHA, 187ACCESS+, and 187INCLUDE+, with internal IAM gaps handed to YELENA.",
      classMix: "1st-class natasha/access-plus/include + 2nd-class test + 3rd-class IAM hooks",
      steps: [
        { skillId: "natasha", action: "Map public endpoints and auth flows" },
        { skillId: "access-plus", action: "Check WCAG+ and auth control gaps" },
        { skillId: "include", action: "Review identity-safe public copy" },
        { skillId: "test", action: "Add validation tests for access rules" },
      ],
      artifact: "Public surface access audit",
      artifactExample: "/187access",
    },
  ],
};
