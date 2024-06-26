import { TypeLanguage as TypeLng } from "../types";

export type TypeLanguage = {
  set: (language: TypeLng) => void;
  onChange: (
    callback: (e: Electron.IpcRendererEvent, language: string) => void
  ) => void;
};
