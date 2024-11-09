import { TypeColorTheme, TypeLanguage, TypeShowWindow } from "@public/types";

export type TAppSettingsStateStore = {
  language: TypeLanguage;
  setLanguage: (language: TypeLanguage) => void;

  autolaunch: boolean;
  setAutolaunch: (value: boolean) => void;

  tray: boolean;
  setTray: (value: boolean) => void;

  colorTheme: TypeColorTheme;
  setColorTheme: (theme: TypeColorTheme) => void;

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

  activityInDiscord: boolean;
  setActivityInDiscord: (value: boolean) => void;

  notifyAboutUpdates: boolean;
  setNotifyAboutUpdates: (value: boolean) => void;
};
