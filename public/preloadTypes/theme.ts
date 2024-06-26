import { TypeColorTheme } from "../types";

export type TypeTheme = {
  set: (theme: TypeColorTheme) => void;
  onChange: (
    callback: (e: Electron.IpcRendererEvent, theme: TypeColorTheme) => void
  ) => void;
};
