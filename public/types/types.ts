import { Dispatch, SetStateAction } from "react";

export type TypeWindowState = {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  isFullscreen: boolean;
};

export type TypePage = {
  setTitle: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
};

export type TypeWallpaper = {
  id?: number;
  title: string;
  src: string;
  volume: string;
  speed: string;
};

export type TypeContextMenu = {
  x: number;
  y: number;
  activeWallpaper: number;
  clickedWallpaper: number;
};

export type TypeWallpaperBehavior = "nothing" | "mute" | "pause";
export type TypeColorTheme = "system" | "dark" | "light" | "custom";

export type TypeColorThemeCustom = {
  bg: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  accentHover: string;
  link: string;
};

export type TypeLanguage = "system" | "en" | "ru";

export type TypeSettingsStoreKeys =
  | "behaviorWindow"
  | "behaviorMaximizedWindow"
  | "behaviorFullscreenWindow"
  | "volume"
  | "autolaunch"
  | "colorTheme"
  | "language"
  | "wallpaperPath";

export type TypeSettingsStore = {
  behaviorWindow: TypeWallpaperBehavior;
  setBehaviorWindow: (behavior: TypeWallpaperBehavior) => void;

  behaviorMaximizedWindow: TypeWallpaperBehavior;
  setBehaviorMaximizedWindow: (behavior: TypeWallpaperBehavior) => void;

  behaviorFullscreenWindow: TypeWallpaperBehavior;
  setBehaviorFullscreenWindow: (behavior: TypeWallpaperBehavior) => void;

  volume: string;
  setVolume: (volume: string) => void;

  autolaunch: boolean;
  setAutolaunch: (autolaunch: boolean) => void;

  colorTheme: TypeColorTheme;
  setColorTheme: (theme: TypeColorTheme) => void;

  language: TypeLanguage;
  setLanguage: (language: TypeLanguage) => void;

  wallpaperPath: string;
  setWallpaperPath: (path: string) => void;
};

export type TypeAppStoreKeys = "activeWallpaper";

export type TypeAppStore = {
  activeWallpaper: TypeWallpaper | undefined;
  setActiveWallpaper: (wallpaper: TypeWallpaper) => void;
};
