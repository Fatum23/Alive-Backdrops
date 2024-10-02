import {
  TypeColorTheme,
  TypeColorThemeCustom,
  TypeLanguage,
  TypeWallpaperBehavior,
} from "./settings";

import { TypeWallpaper } from "./wallpaper";

export type TypeSettingsStateStore = {
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

  colorThemeCustom: TypeColorThemeCustom;
  setColorThemeCustom: (theme: TypeColorThemeCustom) => void;

  language: TypeLanguage;
  setLanguage: (language: TypeLanguage) => void;

  wallpapersPath: string;
  setWallpapersPath: (path: string) => void;
};

export type TypeAppStateStore = {
  activeWallpaper: TypeWallpaper | undefined;
  setActiveWallpaper: (wallpaper: TypeWallpaper) => void;
};
