import { create } from "zustand";
import {
  TypeColorTheme,
  TypeColorThemeCustom,
  TypeLanguage,
  TypeSettingsStore,
  TypeWallpaperBehavior,
} from "@public/types";

export const useSettingsStore = create<TypeSettingsStore>((set) => ({
  behaviorWindow: "mute",
  setBehaviorWindow: (behavior) => {
    window.ipcRenderer.store.set<TypeWallpaperBehavior>(
      "behaviorWindow",
      behavior
    );
    set(() => ({
      behaviorWindow: behavior,
    }));
  },
  behaviorMaximizedWindow: "pause",
  setBehaviorMaximizedWindow: (behavior) => {
    window.ipcRenderer.store.set<TypeWallpaperBehavior>(
      "behaviorMaximizedWindow",
      behavior
    );
    set(() => ({
      behaviorMaximizedWindow: behavior,
    }));
  },
  behaviorFullscreenWindow: "pause",
  setBehaviorFullscreenWindow: (behavior) => {
    window.ipcRenderer.store.set<TypeWallpaperBehavior>(
      "behaviorFullscreenWindow",
      behavior
    );
    set(() => ({
      behaviorFullscreenWindow: behavior,
    }));
  },
  volume: "0",
  setVolume: (volume) => {
    window.ipcRenderer.store.set<string>("volume", volume);
    set(() => ({
      volume: volume,
    }));
  },
  autolaunch: false,
  setAutolaunch: (autolaunch) => {
    window.ipcRenderer.store.set<boolean>("autolaunch", autolaunch);
    set(() => ({
      autolaunch: autolaunch,
    }));
    window.ipcRenderer.app.toggleAutolaunch(autolaunch);
  },

  colorTheme: "system",
  setColorTheme: (theme) => {
    window.ipcRenderer.store.set<TypeColorTheme>("colorTheme", theme);
    set(() => ({
      colorTheme: theme,
    }));
    window.ipcRenderer.theme.set(theme);
  },

  colorThemeCustom: undefined,
  setColorThemeCustom: (theme) => {
    window.ipcRenderer.store.set<TypeColorThemeCustom>(
      "colorThemeCustom",
      theme
    );
    set(() => ({
      colorThemeCustom: theme,
    }));
    window.ipcRenderer.theme.set(theme);
  },

  language: "system",
  setLanguage: (language) => {
    window.ipcRenderer.store.set<TypeLanguage>("language", language);
    set(() => ({
      language: language,
    }));
    window.ipcRenderer.language.set(language);
  },

  wallpapersPath: "",
  setWallpapersPath: (path) => {
    window.ipcRenderer.store.set<string>("wallpapersPath", path);
    set(() => ({
      wallpapersPath: path,
    }));
  },
}));

const initSettingsStore = async () => {
  await window.ipcRenderer.store
    .get<TypeWallpaperBehavior>("behaviorWindow")
    .then((behavior) => {
      useSettingsStore.setState({
        behaviorWindow: behavior !== undefined ? behavior : "mute",
      });
    });
  await window.ipcRenderer.store
    .get<TypeWallpaperBehavior>("behaviorMaximizedWindow")
    .then((behavior) => {
      useSettingsStore.setState({
        behaviorMaximizedWindow: behavior !== undefined ? behavior : "pause",
      });
    });
  await window.ipcRenderer.store
    .get<TypeWallpaperBehavior>("behaviorFullscreenWindow")
    .then((behavior) => {
      useSettingsStore.setState({
        behaviorFullscreenWindow: behavior !== undefined ? behavior : "pause",
      });
    });
  await window.ipcRenderer.store.get<string>("volume").then((volume) => {
    useSettingsStore.setState({
      volume: volume !== undefined ? volume : "100",
    });
  });
  await window.ipcRenderer.store
    .get<boolean>("autolaunch")
    .then(async (autolaunch) => {
      autolaunch = autolaunch !== undefined ? autolaunch : true;
      useSettingsStore.setState({ autolaunch: autolaunch });
      window.ipcRenderer.app.toggleAutolaunch(autolaunch);
    });

  await window.ipcRenderer.store
    .get<TypeColorTheme>("colorTheme")
    .then(async (theme) => {
      theme = theme ? theme : "system";
      useSettingsStore.setState({
        colorTheme: theme,
      });

      window.ipcRenderer.theme.set(theme);
    });

  await window.ipcRenderer.store
    .get<TypeColorThemeCustom>("colorThemeCustom")
    .then((theme) => {
      useSettingsStore.setState({
        colorThemeCustom: theme,
      });
    });

  await window.ipcRenderer.store
    .get<TypeLanguage>("language")
    .then(async (language) => {
      (language = language !== undefined ? language : "system"),
        useSettingsStore.setState({
          language: language,
        });
      window.ipcRenderer.language.set(language);
    });

  await window.ipcRenderer.store
    .get<string>("wallpapersPath")
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

  requestAnimationFrame(() =>
    requestAnimationFrame(() => window.ipcRenderer.window.settingsLoaded())
  );
};

initSettingsStore();
