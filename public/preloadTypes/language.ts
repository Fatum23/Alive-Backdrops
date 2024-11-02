import { TypeLanguage } from "../types";

export type TypePreloadLanguage = {
  set: (language: TypeLanguage) => void;
  onChange: (
    callback: (e: Electron.IpcRendererEvent, language: string) => void
  ) => void;
};
