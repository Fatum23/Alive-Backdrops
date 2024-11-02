export type TypePreloadShell = {
  openUrl: (url: string) => void;
  openPath: (path: string) => void;
  openInExplorer: (path: string) => void;
  beep: () => void;
};
