export type TypeSettingsChapter =
  | "General"
  | "Wallpapers"
  | "System"
  | "Appearance"
  | "App window"
  | "Hotkeys"
  | "Other"
  | "About the program";
export type TypeWallpaperBehavior = "nothing" | "mute" | "pause";
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

export type TypeLanguage = "system" | "en" | "ru";
