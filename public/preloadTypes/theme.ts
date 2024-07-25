import { TypeColorTheme, TypeColorThemeCustom } from "../types";

export type TypeTheme = {
  set: (theme: TypeColorTheme | TypeColorThemeCustom) => void;
  onChange: (
    callback: (
      e: Electron.IpcRendererEvent,
      theme: TypeColorTheme | TypeColorThemeCustom
    ) => void
  ) => void;
  getAccent: () => Promise<string>;
  onAccentChange: (
    callback: (e: Electron.IpcRendererEvent, accent: string) => void
  ) => void;

  calculateAccentHover: (accent: string) => Promise<string>;
};
