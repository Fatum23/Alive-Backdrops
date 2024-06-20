import { create } from "zustand";
import { getFromStore, setToStore } from "@shared/services";
import {
  TypeColorTheme,
  TypeLanguage,
  TypeSettings,
  TypeWallpaperBehavior,
} from "@shared/types";

export const useSettingsStore = create<TypeSettings>((set) => ({
  behaviorWindow: "mute",
  setBehaviorWindow: (behavior) => {
    setToStore<TypeWallpaperBehavior>("behaviorWindow", behavior);
    set(() => ({
      behaviorWindow: behavior,
    }));
  },
  behaviorMaximizedWindow: "pause",
  setBehaviorMaximizedWindow: (behavior) => {
    setToStore<TypeWallpaperBehavior>("behaviorMaximizedWindow", behavior);
    set(() => ({
      behaviorMaximizedWindow: behavior,
    }));
  },
  behaviorFullscreenWindow: "pause",
  setBehaviorFullscreenWindow: (behavior) => {
    setToStore<TypeWallpaperBehavior>("behaviorFullscreenWindow", behavior);
    set(() => ({
      behaviorFullscreenWindow: behavior,
    }));
  },
  volume: "",
  setVolume: (volume) => {
    setToStore<string>("volume", volume);
    set(() => ({
      volume: volume,
    }));
  },
  autolaunch: false,
  setAutolaunch: async (active) => {
    if (active) {
      await enable();
    } else {
      await disable();
    }
    setToStore<boolean>("autolaunch", active);
    set(() => ({
      autolaunch: active,
    }));
  },

  colorTheme: "system",
  setColorTheme: (theme) => {
    setToStore<TypeColorTheme>("colorTheme", theme);
    set(() => ({
      colorTheme: theme,
    }));
    emit("change-theme", theme);
  },

  language: "system",
  setLanguage: (language) => {
    setToStore<TypeLanguage>("language", language);
    set(() => ({
      language: language,
    }));
    emit("change-language", language);
  },

  wallpaperPath: "",
  setWallpaperPath: (path) => {
    setToStore<string>("wallpaperPath", path);
    set(() => ({
      wallpaperPath: path,
    }));
  },
}));

const initSettingsStore = async () => {
  await getFromStore<TypeWallpaperBehavior>("behaviorWindow").then(
    (behavior) => {
      useSettingsStore.setState({
        behaviorWindow: behavior !== null ? behavior : "mute",
      });
    }
  );
  await getFromStore<TypeWallpaperBehavior>("behaviorMaximizedWindow").then(
    (behavior) => {
      useSettingsStore.setState({
        behaviorMaximizedWindow: behavior !== null ? behavior : "pause",
      });
    }
  );
  await getFromStore<TypeWallpaperBehavior>("behaviorFullscreenWindow").then(
    (behavior) => {
      useSettingsStore.setState({
        behaviorFullscreenWindow: behavior !== null ? behavior : "pause",
      });
    }
  );
  await getFromStore<string>("volume").then((volume) => {
    useSettingsStore.setState({ volume: volume !== null ? volume : "100" });
  });
  await getFromStore<boolean>("autolaunch").then(async (active) => {
    if (active !== null) {
      if (active) {
        await enable();
      } else {
        await disable();
      }
      useSettingsStore.setState({
        autolaunch: active,
      });
    } else {
      useSettingsStore.setState({
        autolaunch: true,
      });
    }
  });

  await getFromStore<TypeColorTheme>("colorTheme").then((theme) => {
    emit("change-theme", theme);
    useSettingsStore.setState({
      colorTheme: theme !== null ? theme : "system",
    });
  });

  await getFromStore<TypeLanguage>("language").then((language) => {
    useSettingsStore.setState({
      language: language !== null ? language : "system",
    });
  });

  await getFromStore<string>("wallpaperPath").then(async (path) => {
    if (path !== null) {
      useSettingsStore.setState({
        wallpaperPath: path,
      });
    } else {
      let dataDir = await appDataDir();
      useSettingsStore.setState({
        wallpaperPath: dataDir,
      });
    }
  });
};

initSettingsStore();
