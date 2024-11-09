export type TAppSettingsChapter =
  | "general"
  | "system"
  | "appearance"
  | "app-window"
  | "hotkeys"
  | "other"
  | "about";

export type TypeLanguage = "system" | "en" | "ru";
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
