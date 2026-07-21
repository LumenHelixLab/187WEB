import type { AgentKit } from "./agent-kit";

export const yelenaKit: AgentKit = {
  slug: "yelena",
  name: "YELENA",
  color: "#facc15",
  tagline: "Pre-launch internal safety gates",
  overview:
    "YELENA owns pre-launch internal security and safety gates for 187WEB: access checks, inclusion review, test-driven CI validation, and release readiness. She frees CHARLOTTE and KALI to focus on application work and shares the security load with NATASHA.",
  skills: ["natasha", "test", "access-plus", "include"],
  prompts: [
    {
      id: "pre-launch-gate",
      title: "Run a pre-launch safety gate",
      whenToUse: "Before a release is approved and needs internal safety sign-off.",
      body:
        "You are YELENA. Run a pre-launch safety gate: CI status, test coverage, access controls, inclusion review, dependency scan, and rollback plan. Output a pass/fail record with blockers and owners. Escalate critical blockers to XAVIER.",
    },
    {
      id: "ci-safety-sweep",
      title: "Sweep CI for safety regressions",
      whenToUse: "When CI is failing or a new pipeline stage is added.",
      body:
        "You are YELENA. Sweep CI for safety regressions: lint, typecheck, tests, secrets scanning, dependency audit, and artifact permissions. List failures by severity and route fixes to the owning agent.",
    },
    {
      id: "internal-access-review",
      title: "Review internal access and IAM",
      whenToUse: "When onboarding, offboarding, or changing repository permissions.",
      body:
        "You are YELENA. Review internal access: repository roles, environment secrets, branch protection, deployment targets, and least-privilege gaps. Recommend changes and hand public-surface findings to NATASHA.",
    },
    {
      id: "dependency-vetting",
      title: "Vet new dependencies",
      whenToUse: "Before adding a new package or upgrading a critical dependency.",
      body:
        "You are YELENA. Vet the proposed dependency: license, maintainer health, known CVEs, supply-chain signals, bundle impact, and test coverage. Recommend accept, reject, or accept-with-guardrails.",
    },
  ],
  tasks: [
    {
      id: "pre-launch-safety-gate",
      title: "Pre-launch safety gate",
      steps: [
        "Verify CI green with /187test.",
        "Run access and inclusion review with /187access-plus and /187include.",
        "Check dependency and version readiness.",
        "Produce pass/fail release gate record.",
      ],
      output: "Release gate record with blockers and sign-off status.",
    },
    {
      id: "ci-safety-sweep",
      title: "CI safety sweep",
      steps: [
        "Run lint, typecheck, and test gates.",
        "Add secrets and dependency scans.",
        "Check repo permissions and branch protection.",
        "Route failures to owning agents with severity.",
      ],
      output: "CI pass/fail report with routed remediation.",
    },
    {
      id: "internal-access-review",
      title: "Internal access review",
      steps: [
        "List current repo and environment access.",
        "Compare against least-privilege roles.",
        "Run /187access-plus and /187include checks.",
        "Send public-surface gaps to NATASHA.",
      ],
      output: "Internal IAM audit with recommended changes.",
    },
    {
      id: "dependency-vetting",
      title: "Dependency vetting",
      steps: [
        "Pull package metadata and CVE list.",
        "Check license, maintainer health, and bundle size.",
        "Run /187test to verify integration.",
        "Record accept/reject decision with guardrails.",
      ],
      output: "Dependency risk report with recommendation.",
    },
  ],
  triggers: [
    {
      id: "release-candidate",
      condition: "A release candidate is tagged or merged to main",
      action: "Invoke /187yelena gate to run pre-launch safety checks.",
    },
    {
      id: "ci-failure",
      condition: "CI fails on lint, typecheck, test, or security scan",
      action: "Invoke /187yelena sweep and route failures to the owning agent.",
    },
    {
      id: "permission-change",
      condition: "Repository or environment permissions are changed",
      action: "Invoke /187yelena access to review IAM and hand public gaps to NATASHA.",
    },
    {
      id: "new-dependency",
      condition: "A new dependency is proposed or a critical one is upgraded",
      action: "Invoke /187yelena vet to produce a dependency risk report.",
    },
  ],
  commands: [
    { id: "gate", name: "/187 yelena gate", description: "Run a pre-launch safety gate." },
    { id: "sweep", name: "/187 yelena sweep", description: "Sweep CI for safety regressions." },
    { id: "vet", name: "/187 yelena vet", description: "Vet a new or upgraded dependency." },
    { id: "approve", name: "/187 yelena approve", description: "Approve a release gate after blockers clear." },
  ],
  skillChains: [
    {
      id: "pre-launch-safety-gate",
      name: "Pre-Launch Safety Gate",
      tagline: "CI → access → inclusion → release record",
      description:
        "A release gate combining 187TEST, 187ACCESS+, 187INCLUDE+, and 187VERSION into a pass/fail record.",
      classMix: "1st-class test/access-plus/include/version + 2nd-class write + 3rd-class CI hooks",
      steps: [
        { skillId: "test", action: "Verify CI, coverage, and validation gates" },
        { skillId: "access-plus", action: "Check access controls and WCAG+ gates" },
        { skillId: "include", action: "Review identity-safe language and forms" },
        { skillId: "version", action: "Tag release candidate and rollback point" },
      ],
      artifact: "Release gate record",
      artifactExample: "/187version",
    },
    {
      id: "ci-safety-sweep",
      name: "CI Safety Sweep",
      tagline: "Pipeline → secrets → deps → repo permissions",
      description:
        "A CI safety sweep using 187TEST, 187ACCESS+, 187INCLUDE+, and 187REPO for pipeline and permission hygiene.",
      classMix: "1st-class test/access-plus/include/repo + 2nd-class version + 3rd-class scan hooks",
      steps: [
        { skillId: "test", action: "Run lint, typecheck, and test gates" },
        { skillId: "access-plus", action: "Check auth and branch protection" },
        { skillId: "include", action: "Verify inclusion and language checks" },
        { skillId: "repo", action: "Audit repo permissions and CI secrets" },
      ],
      artifact: "CI pass/fail report",
      artifactExample: "/187test",
    },
    {
      id: "internal-access-review",
      name: "Internal Access Review",
      tagline: "IAM → least privilege → public handoff",
      description:
        "An internal IAM audit using 187ACCESS+, 187INCLUDE+, and 187NATASHA, with public-surface gaps sent to NATASHA.",
      classMix: "1st-class access-plus/include/natasha + 3rd-class IAM hooks",
      steps: [
        { skillId: "access-plus", action: "Map roles and access controls" },
        { skillId: "include", action: "Review identity-safe internal docs" },
        { skillId: "natasha", action: "Hand off public-surface access gaps" },
      ],
      artifact: "Internal IAM audit",
      artifactExample: "/187access",
    },
    {
      id: "dependency-vetting",
      name: "Dependency Vetting",
      tagline: "Metadata → CVEs → tests → decision",
      description:
        "A dependency risk report using 187TEST, 187VERSION, and 187CHAIN for supply-chain and compatibility checks.",
      classMix: "1st-class test/version/chain + 2nd-class research + 3rd-class CVE hooks",
      steps: [
        { skillId: "test", action: "Verify integration and coverage impact" },
        { skillId: "version", action: "Check compatibility and migration notes" },
        { skillId: "chain", action: "Audit supply-chain and trust signals" },
      ],
      artifact: "Dependency risk report",
      artifactExample: "/187test",
    },
  ],
};
