import {
  TypeColorTheme,
  TypeColorThemeCustom,
  TypeLanguage,
  TypeShowWindow,
  TypeWallpaperBehavior,
} from "./settings";

import { TypeWallpaper } from "./wallpaper";

export type TypeSettingsStateStore = {
  language: TypeLanguage;
  setLanguage: (language: TypeLanguage) => void;

  wallpapersPath: string;
  setWallpapersPath: (path: string) => void;

  behaviorWindow: TypeWallpaperBehavior;
  setBehaviorWindow: (behavior: TypeWallpaperBehavior) => void;

  behaviorMaximizedWindow: TypeWallpaperBehavior;
  setBehaviorMaximizedWindow: (behavior: TypeWallpaperBehavior) => void;

  behaviorFullscreenWindow: TypeWallpaperBehavior;
  setBehaviorFullscreenWindow: (behavior: TypeWallpaperBehavior) => void;

  volume: string;
  setVolume: (volume: string) => void;

  autolaunch: boolean;
  setAutolaunch: (value: boolean) => void;

  tray: boolean;
  setTray: (value: boolean) => void;

  hardwareAcceleration: boolean;
  setHardwareAcceleration: (value: boolean) => void;

  colorTheme: TypeColorTheme;
  setColorTheme: (theme: TypeColorTheme) => void;

  colorThemeCustom: TypeColorThemeCustom;
  setColorThemeCustom: (theme: TypeColorThemeCustom) => void;

  interfaceScale: string;
  setInterfaceScale: (scale: string) => void;

  showWindowOnLaunch: TypeShowWindow;
  setShowWindowOnLaunch: (value: TypeShowWindow) => void;

  showWindowOnAutolaunch: TypeShowWindow;
  setShowWindowOnAutolaunch: (value: TypeShowWindow) => void;

  hideWindowOnClose: boolean;
  setHideWindowOnClose: (value: boolean) => void;

  quitAppOnWindowClose: boolean;
  setQuitAppOnWindowClose: (value: boolean) => void;

  hotkeysEnabled: boolean;
  setHotkeysEnabled: (value: boolean) => void;

  hotkeyPause: string;
  setHotkeyPause: (hotkey: string) => void;

  hotkeyMute: string;
  setHotkeyMute: (hotkey: string) => void;

  hotkeyVolumeUp: string;
  setHotkeyVolumeUp: (hotkey: string) => void;

  hotkeyVolumeDown: string;
  setHotkeyVolumeDown: (hotkey: string) => void;

  activityInDiscord: boolean;
  setActivityInDiscord: (value: boolean) => void;

  notifyAboutUpdates: boolean;
  setNotifyAboutUpdates: (value: boolean) => void;
};

export type TypeAppStateStore = {
  activeWallpaper: TypeWallpaper | undefined;
  setActiveWallpaper: (wallpaper: TypeWallpaper) => void;
};
