import { TypeColorTheme, TypeColorThemeCustom } from "../types";

export type TypePreloadTheme = {
  set: (theme: TypeColorTheme) => void;
  onChange: (
    callback: (e: Electron.IpcRendererEvent, theme: TypeColorTheme) => void
  ) => void;

  setCustom: (theme: TypeColorThemeCustom) => void;
  onCustomChange: (
    callback: (
      e: Electron.IpcRendererEvent,
      theme: TypeColorThemeCustom
    ) => void
  ) => void;
  getAccent: () => Promise<string>;
  onAccentChange: (
    callback: (e: Electron.IpcRendererEvent, accent: string) => void
  ) => void;

  calculateAccentHover: (accent: string) => Promise<string>;
};
