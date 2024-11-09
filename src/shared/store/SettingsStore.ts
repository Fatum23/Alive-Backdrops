import { create } from "zustand";
import {
  TypeColorTheme,
  TypeColorThemeCustom,
  TypeLanguage,
  TypeSettingsStateStore,
  TAppSettingsStoreKeys,
  TypeShowWindow,
  TWallpaperBehavior,
} from "@public/types";

export const useSettingsStore = create<TypeSettingsStateStore>((set) => ({
  language: "system",
  setLanguage: (language) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeLanguage>(
      "language",
      language
    );
    set(() => ({
      language: language,
    }));
    window.ipcRenderer.language.set(language);
  },

  wallpapersPath: "",
  setWallpapersPath: (path) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, string>(
      "wallpapers-path",
      path
    );
    set(() => ({
      wallpapersPath: path,
    }));
  },

  behaviorWindow: "mute",
  setBehaviorWindow: (behavior) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeWallpaperBehavior>(
      "behavior-window",
      behavior
    );
    set(() => ({
      behaviorWindow: behavior,
    }));
  },
  behaviorMaximizedWindow: "pause",
  setBehaviorMaximizedWindow: (behavior) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeWallpaperBehavior>(
      "behavior-maximized-window",
      behavior
    );
    set(() => ({
      behaviorMaximizedWindow: behavior,
    }));
  },
  behaviorFullscreenWindow: "pause",
  setBehaviorFullscreenWindow: (behavior) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeWallpaperBehavior>(
      "behavior-fullscreen-window",
      behavior
    );
    set(() => ({
      behaviorFullscreenWindow: behavior,
    }));
  },
  volume: "100",
  setVolume: (volume) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, string>(
      "volume",
      volume
    );
    set(() => ({
      volume: volume,
    }));
  },

  autolaunch: true,
  setAutolaunch: (autolaunch) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, boolean>(
      "autolaunch",
      autolaunch
    );
    set(() => ({
      autolaunch: autolaunch,
    }));
    window.ipcRenderer.app.toggleAutolaunch(autolaunch);
  },
  tray: true,
  setTray: (value) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, boolean>("tray", value);
    set(() => ({
      tray: value,
    }));
  },
  hardwareAcceleration: true,
  setHardwareAcceleration: (value) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, boolean>(
      "hardware-acceleration",
      value
    );
    set(() => ({
      hardwareAcceleration: value,
    }));
  },

  colorTheme: "system",
  setColorTheme: (theme) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeColorTheme>(
      "theme",
      theme
    );
    set(() => ({
      colorTheme: theme,
    }));
    window.ipcRenderer.theme.set(theme);
  },

  colorThemeCustom: undefined,
  setColorThemeCustom: (theme) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeColorThemeCustom>(
      "theme-custom",
      theme
    );
    set(() => ({
      colorThemeCustom: theme,
    }));
    window.ipcRenderer.theme.setCustom(theme);
  },
  interfaceScale: "1",
  setInterfaceScale: (scale) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, string>(
      "interface-scale",
      scale
    );
    set(() => ({
      interfaceScale: scale,
    }));
    window.ipcRenderer.window.setZoomFactor(parseFloat(scale));
  },

  showWindowOnLaunch: "if-no-active-wallpaper",
  setShowWindowOnLaunch: (value) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeShowWindow>(
      "show-window-on-launch",
      value
    );
    set(() => ({
      showWindowOnLaunch: value,
    }));
  },
  showWindowOnAutolaunch: "if-no-active-wallpaper",
  setShowWindowOnAutolaunch: (value) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, TypeShowWindow>(
      "show-window-on-autolaunch",
      value
    );
    set(() => ({
      showWindowOnAutolaunch: value,
    }));
  },
  hideWindowOnClose: true,
  setHideWindowOnClose: (value) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, boolean>(
      "hide-window-on-close",
      value
    );
    set(() => ({
      hideWindowOnClose: value,
    }));
  },
  quitAppOnWindowClose: false,
  setQuitAppOnWindowClose: (value) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, boolean>(
      "quit-app-on-window-close",
      value
    );
    set(() => ({
      quitAppOnWindowClose: value,
    }));
  },

  hotkeysEnabled: true,
  setHotkeysEnabled: (value) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, boolean>(
      "hotkeys-enabled",
      value
    );
    set(() => ({
      hotkeysEnabled: value,
    }));
  },

  hotkeyPause: "Ctrl + P",
  setHotkeyPause: (hotkey) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, string>(
      "hotkey-pause",
      hotkey
    );
    set(() => ({
      hotkeyPause: hotkey,
    }));
  },
  hotkeyMute: "Ctrl + M",
  setHotkeyMute: (hotkey) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, string>(
      "hotkey-mute",
      hotkey
    );
    set(() => ({
      hotkeyMute: hotkey,
    }));
  },
  hotkeyVolumeUp: "Ctrl + ArrowUp",
  setHotkeyVolumeUp: (hotkey) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, string>(
      "hotkey-volume-up",
      hotkey
    );
    set(() => ({
      hotkeyVolumeUp: hotkey,
    }));
  },
  hotkeyVolumeDown: "Ctrl + ArrowDown",
  setHotkeyVolumeDown: (hotkey) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, string>(
      "hotkey-volume-down",
      hotkey
    );
    set(() => ({
      hotkeyVolumeDown: hotkey,
    }));
  },

  activityInDiscord: true,
  setActivityInDiscord: (activity) => {
    window.ipcRenderer.store.set<TypeSettingsStoreKeys, boolean>(
      "activity-in-discord",
      activity
    );
    set(() => ({
      activityInDiscord: activity,
    }));
    window.ipcRenderer.other.toggleActivityInDiscord(activity);
  },

  notifyAboutUpdates: true,
  setNotifyAboutUpdates: (value) => {
    window.ipcRenderer.store.set("notify-about-updates", value);
    set(() => ({
      notifyAboutUpdates: value,
    }));
  },
}));

const initSettingsStore = async () => {
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeLanguage>("language")
    .then(async (language) => {
      (language = language !== undefined ? language : "system"),
        useSettingsStore.setState({
          language: language,
        });
      window.ipcRenderer.language.set(language);
    });

  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, string>("wallpapers-path")
    .then(async (path) => {
      if (path !== undefined) {
        useSettingsStore.setState({
          wallpapersPath: path,
        });
      } else {
        useSettingsStore.setState({
          wallpapersPath: await window.ipcRenderer.path.get("userData"),
        });
      }
    });

  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeWallpaperBehavior>("behavior-window")
    .then((behavior) => {
      useSettingsStore.setState({
        behaviorWindow: behavior !== undefined ? behavior : "mute",
      });
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeWallpaperBehavior>(
      "behavior-maximized-window"
    )
    .then((behavior) => {
      useSettingsStore.setState({
        behaviorMaximizedWindow: behavior !== undefined ? behavior : "pause",
      });
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeWallpaperBehavior>(
      "behavior-fullscreen-window"
    )
    .then((behavior) => {
      useSettingsStore.setState({
        behaviorFullscreenWindow: behavior !== undefined ? behavior : "pause",
      });
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, string>("volume")
    .then((volume) => {
      useSettingsStore.setState({
        volume: volume !== undefined ? volume : "100",
      });
    });

  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, boolean>("autolaunch")
    .then(async (autolaunch) => {
      autolaunch = autolaunch !== undefined ? autolaunch : true;
      useSettingsStore.setState({ autolaunch: autolaunch });
      window.ipcRenderer.app.toggleAutolaunch(autolaunch);
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, boolean>("tray")
    .then((tray) => {
      tray = tray !== undefined ? tray : true;

      useSettingsStore.setState({ tray: tray });
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, boolean>("hardware-acceleration")
    .then((value) => {
      value = value !== undefined ? value : true;

      useSettingsStore.setState({ hardwareAcceleration: value });
    });

  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeColorTheme>("theme")
    .then(async (theme) => {
      theme = theme ? theme : "system";
      useSettingsStore.setState({
        colorTheme: theme,
      });

      window.ipcRenderer.theme.set(theme);
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeColorThemeCustom>("theme-custom")
    .then((theme) => {
      useSettingsStore.setState({
        colorThemeCustom: theme,
      });
      window.ipcRenderer.theme.setCustom(theme);
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, string>("interface-scale")
    .then((scale) => {
      scale = scale !== undefined ? scale : "1";

      useSettingsStore.setState({ interfaceScale: scale });
    });

  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeShowWindow>("show-window-on-launch")
    .then((value) => {
      value = value !== undefined ? value : "if-no-active-wallpaper";

      useSettingsStore.setState({ showWindowOnLaunch: value });
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, TypeShowWindow>("show-window-on-autolaunch")
    .then((value) => {
      value = value !== undefined ? value : "if-no-active-wallpaper";

      useSettingsStore.setState({ showWindowOnAutolaunch: value });
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, boolean>("hide-window-on-close")
    .then((hide) => {
      hide = hide !== undefined ? hide : true;

      useSettingsStore.setState({ hideWindowOnClose: hide });
    });
  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, boolean>("quit-app-on-window-close")
    .then((quit) => {
      quit = quit !== undefined ? quit : true;

      useSettingsStore.setState({ quitAppOnWindowClose: quit });
    });

  //TODO hotkeys

  await window.ipcRenderer.store
    .get<TypeSettingsStoreKeys, boolean>("activity-in-discord")
    .then((activity) => {
      activity = activity !== undefined ? activity : true;

      useSettingsStore.setState({ activityInDiscord: activity });
      window.ipcRenderer.other.toggleActivityInDiscord(activity);
    });

  requestAnimationFrame(() =>
    requestAnimationFrame(() => window.ipcRenderer.window.settingsLoaded())
  );
};

initSettingsStore();
