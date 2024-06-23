import { create } from "zustand";
import {
  TypeColorTheme,
  TypeLanguage,
  TypeSettings,
  TypeWallpaperBehavior,
} from "@shared/types";
import { getFromStore, setToStore } from "@shared/services";

export const useSettingsStore = create<TypeSettings>((set) => ({
  behaviorWindow: "mute",
  setBehaviorWindow: async (behavior) => {
    await setToStore<TypeWallpaperBehavior>("behaviorWindow", behavior);
    set(() => ({
      behaviorWindow: behavior,
    }));
  },
  behaviorMaximizedWindow: "pause",
  setBehaviorMaximizedWindow: async (behavior) => {
    await setToStore<TypeWallpaperBehavior>(
      "behaviorMaximizedWindow",
      behavior
    );
    set(() => ({
      behaviorMaximizedWindow: behavior,
    }));
  },
  behaviorFullscreenWindow: "pause",
  setBehaviorFullscreenWindow: async (behavior) => {
    await setToStore<TypeWallpaperBehavior>(
      "behaviorFullscreenWindow",
      behavior
    );
    set(() => ({
      behaviorFullscreenWindow: behavior,
    }));
  },
  volume: "0",
  setVolume: async (volume) => {
    await setToStore<string>("volume", volume);
    set(() => ({
      volume: volume,
    }));
  },
  autolaunch: false,
  setAutolaunch: async (active) => {
    await window.ipcRenderer.invoke("app:toggle-autolaunch", active);
    await setToStore<boolean>("autolaunch", active);
    set(() => ({
      autolaunch: active,
    }));
  },

  colorTheme: "system",
  setColorTheme: async (theme) => {
    await setToStore<TypeColorTheme>("colorTheme", theme);
    set(() => ({
      colorTheme: theme,
    }));
    await window.ipcRenderer.invoke("theme:change-theme", theme);
  },

  language: "system",
  setLanguage: async (language) => {
    await setToStore<TypeLanguage>("language", language);
    set(() => ({
      language: language,
    }));
    await window.ipcRenderer.invoke("language:change-language", language);
  },

  wallpaperPath: "",
  setWallpaperPath: async (path) => {
    await setToStore<string>("wallpaperPath", path);
    set(() => ({
      wallpaperPath: path,
    }));
  },
}));

const initSettingsStore = async () => {
  await getFromStore<TypeWallpaperBehavior>("behaviorWindow").then(
    (behavior) => {
      useSettingsStore.setState({
        behaviorWindow: behavior !== undefined ? behavior : "mute",
      });
    }
  );
  await getFromStore<TypeWallpaperBehavior>("behaviorMaximizedWindow").then(
    (behavior) => {
      useSettingsStore.setState({
        behaviorMaximizedWindow: behavior !== undefined ? behavior : "pause",
      });
    }
  );
  await getFromStore<TypeWallpaperBehavior>("behaviorFullscreenWindow").then(
    (behavior) => {
      useSettingsStore.setState({
        behaviorFullscreenWindow: behavior !== undefined ? behavior : "pause",
      });
    }
  );
  await getFromStore<string>("volume").then((volume) => {
    useSettingsStore.setState({
      volume: volume !== undefined ? volume : "100",
    });
  });
  await getFromStore<boolean>("autolaunch").then(async (active) => {
    if (active !== undefined) {
      await window.ipcRenderer.invoke("app:toggle-autolaunch", active);
      useSettingsStore.setState({
        autolaunch: active,
      });
    } else {
      useSettingsStore.setState({
        autolaunch: true,
      });
    }
  });

  await getFromStore<TypeColorTheme>("colorTheme").then(async (theme) => {
    useSettingsStore.setState({
      colorTheme: theme !== undefined ? theme : "system",
    });
    await window.ipcRenderer.invoke("theme:change-theme", theme);
  });

  await getFromStore<TypeLanguage>("language").then(async (language) => {
    useSettingsStore.setState({
      language: language !== undefined ? language : "system",
    });
    await window.ipcRenderer.invoke("language:change-language", language);
  });

  await getFromStore<string>("wallpaperPath").then(async (path) => {
    if (path !== undefined) {
      useSettingsStore.setState({
        wallpaperPath: path,
      });
    } else {
      useSettingsStore.setState({
        wallpaperPath: await window.ipcRenderer.invoke("path:userData"),
      });
    }
  });
};

initSettingsStore();
