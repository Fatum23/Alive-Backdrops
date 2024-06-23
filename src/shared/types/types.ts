import { Dispatch, SetStateAction } from "react";

export type TypeNavbar = {
  activeTab: TypeTab;
  setActiveTab: Dispatch<SetStateAction<TypeTab>>;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export type TypeTab = "My library" | "Online library";

export type TypeWallpaper = {
  id?: number;
  title: string;
  src: string;
  volume: string;
  speed: string;
};

export type TypeSettingsLabel =
  | "window"
  | "maximized-window"
  | "fullscreen-window"
  | "volume"
  | "autolaunch"
  | "theme"
  | "language"
  | "wallpapers-path";

export type TypeContextMenu = {
  x: number;
  y: number;
  activeWallpaper: number;
  clickedWallpaper: number;
};

export type TypeWallpaperBehavior = "nothing" | "mute" | "pause";
export type TypeColorTheme = "system" | "dark" | "light";
export type TypeLanguage = "system" | "en" | "ru";

export type TypeSettings = {
  behaviorWindow: TypeWallpaperBehavior;
  setBehaviorWindow: (behavior: TypeWallpaperBehavior) => void;

  behaviorMaximizedWindow: TypeWallpaperBehavior;
  setBehaviorMaximizedWindow: (behavior: TypeWallpaperBehavior) => void;

  behaviorFullscreenWindow: TypeWallpaperBehavior;
  setBehaviorFullscreenWindow: (behavior: TypeWallpaperBehavior) => void;

  volume: string;
  setVolume: (volume: string) => void;

  autolaunch: boolean;
  setAutolaunch: (active: boolean) => void;

  colorTheme: TypeColorTheme;
  setColorTheme: (theme: TypeColorTheme) => void;

  language: TypeLanguage;
  setLanguage: (language: TypeLanguage) => void;

  wallpaperPath: string;
  setWallpaperPath: (path: string) => void;
};

export type TypeAppStore = {
  activeWallpaper: TypeWallpaper | undefined;
  setActiveWallpaper: (wallpaper: TypeWallpaper) => void;
};
