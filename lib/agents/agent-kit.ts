export type Prompt = {
  id: string;
  title: string;
  body: string;
  whenToUse: string;
};

export type Task = {
  id: string;
  title: string;
  steps: string[];
  output: string;
};

export type Trigger = {
  id: string;
  condition: string;
  action: string;
};

export type Command = {
  id: string;
  name: string;
  description: string;
  args?: string;
  premium?: boolean;
};

export type SkillChainStep = {
  skillId: string;
  action: string;
};

export type SkillChain = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  classMix: string;
  steps: SkillChainStep[];
  artifact: string;
  artifactExample: string;
};

export type AgentKit = {
  slug: string;
  name: string;
  color: string;
  tagline: string;
  overview: string;
  skills: string[];
  prompts: Prompt[];
  tasks: Task[];
  triggers: Trigger[];
  commands: Command[];
  skillChains: SkillChain[];
};
