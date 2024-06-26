export type TypeApp = {
  quit: () => void;
  toggleAutolaunch: (autolaunch?: boolean) => void;
  getVersion: () => Promise<string>;
};
