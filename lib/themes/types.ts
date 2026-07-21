/**
 * Semantic theme contract for 187THEME.
 * Compatible with Theme Factory–style palettes (palette + type + usage).
 */
export type ThemeContract = {
  id: string;
  name: string;
  description: string;
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    secondary?: string;
    accent?: string;
  };
  typography: {
    display: string;
    body: string;
    mono?: string;
  };
  usage: string[];
  source: {
    repository: string;
    commit: string;
    license: string;
  };
};
