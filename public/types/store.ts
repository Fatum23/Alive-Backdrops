export type TypeSettingsStoreKeys =
  | "behaviorWindow"
  | "behaviorMaximizedWindow"
  | "behaviorFullscreenWindow"
  | "volume"
  | "autolaunch"
  | "colorTheme"
  | "colorThemeCustom"
  | "colorThemeCustom"
  | "language"
  | "wallpapersPath";
export type TypeAppStoreKeys = "activeWallpaper";
export type TypeElectronStoreKeys = "mainWindowState";

export type TypeStoreKeys =
  | TypeSettingsStoreKeys
  | TypeAppStoreKeys
  | TypeElectronStoreKeys;
