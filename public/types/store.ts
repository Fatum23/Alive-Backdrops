export type TypeSettingsStoreKeys =
  | "language"
  | "wallpapers-path"
  | "behavior-window"
  | "behavior-maximized-window"
  | "behavior-fullscreen-window"
  | "volume"
  | "autolaunch"
  | "tray"
  | "hardware-acceleration"
  | "theme"
  | "theme-custom"
  | "interface-scale"
  | "show-window-on-launch"
  | "show-window-on-autolaunch"
  | "hide-window-on-close"
  | "quit-app-on-window-close"
  | "hotkeys-enabled"
  | "hotkey-pause"
  | "hotkey-mute"
  | "hotkey-volume-up"
  | "hotkey-volume-down"
  | "activity-in-discord"
  | "notify-about-updates";

export type TypeModalDoNotShowAgainKeys = "settings-restart";

export type TypeAppStoreKeys = "activeWallpaper";
export type TypeElectronStoreKeys = "mainWindowState";

export type TypeStoreKeys =
  | TypeSettingsStoreKeys
  | TypeAppStoreKeys
  | TypeElectronStoreKeys;
