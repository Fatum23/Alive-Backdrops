import { TypeModalDoNotShowAgainKeys } from "@public/types";

export type TypePreloadApp = {
  isPackaged: () => Promise<boolean>;
  quit: () => void;
  toggleAutolaunch: (autolaunch?: boolean) => void;
  getVersion: () => Promise<string>;
  relaunch: (arg: TypeModalDoNotShowAgainKeys) => void;
};
