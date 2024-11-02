import { TypeSettingsStoreKeys } from "./store";

export type TypeSettingsTab = "app" | "wallpaper";
export type TypeAppSettingsChapter =
  | "general"
  | "system"
  | "appearance"
  | "app-window"
  | "hotkeys"
  | "other"
  | "about";

export type TypeWallpapersSettingsChapter = "wallpapers-behavior";

export type TypeSettingsKeys =
  | TypeSettingsStoreKeys
  | "version"
  | "github"
  | "faq"
  | "report-a-bug"
  | "feedback";

export type TypeLanguage = "system" | "en" | "ru";
export type TypeWallpaperBehavior = "keep-running" | "mute" | "pause";
export type TypeColorTheme = "system" | "dark" | "light" | "custom";

export type TypeColorThemeCustom =
  | {
      bg: string;
      text: string;
      primary: string;
      secondary: string;
      accent: string;
      accentHover: string;
      link: string;
    }
  | undefined;

export type TypeShowWindow = "if-no-active-wallpaper" | "do-not-show" | "show";
