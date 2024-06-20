import { useTranslation } from "react-i18next";
import { Titlebar, SettingsItem, SettingsNavBar } from "@widgets";
import { useState } from "react";
import { useSettingsStore } from "@shared/store";
import {
  TypeColorTheme,
  TypeLanguage,
  TypeWallpaperBehavior,
} from "@shared/types";

export default function SettingsPage() {
  const { t } = useTranslation();
  const store = useSettingsStore();

  const [behaviorWindow, setBehaviorWindow] = useState<TypeWallpaperBehavior>(
    store.behaviorWindow
  );
  const [behaviorMaximizedWindow, setBehaviorMaximizedWindow] =
    useState<TypeWallpaperBehavior>(store.behaviorMaximizedWindow);
  const [behaviorFullscreenWindow, setBehaviorFullscreenWindow] =
    useState<TypeWallpaperBehavior>(store.behaviorFullscreenWindow);
  const [volume, setVolume] = useState<string>(store.volume);
  const [autolaunch, setAutolaunch] = useState<boolean>(store.autolaunch);
  const [colorTheme, setColorTheme] = useState<TypeColorTheme>(
    store.colorTheme
  );
  const [language, setLanguage] = useState<TypeLanguage>(store.language);
  const [wallpaperPath, setWallpaperPath] = useState<string>(
    store.wallpaperPath!
  );

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Titlebar title={t("Settings")} />
      <SettingsNavBar
        behaviorWindow={behaviorWindow}
        setBehaviorWindow={setBehaviorWindow}
        behaviorMaximizedWindow={behaviorMaximizedWindow}
        setBehaviorMaximizedWindow={setBehaviorMaximizedWindow}
        behaviorFullscreenWindow={behaviorFullscreenWindow}
        setBehaviorFullscreenWindow={setBehaviorFullscreenWindow}
        volume={volume}
        setVolume={setVolume}
        autolaunch={autolaunch}
        setAutolaunch={setAutolaunch}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        language={language}
        setLanguage={setLanguage}
        wallpaperPath={wallpaperPath}
        setWallpaperPath={setWallpaperPath}
      />
      <div className="h-[calc(100%-72px)] overflow-y-auto">
        <div className="flex flex-col gap-6 m-4">
          <div className="flex flex-col">
            <h1>{t("Wallpaper behavior")}</h1>
            <SettingsItem
              value={behaviorWindow}
              dropdownValues={["none", "mute", "pause"]}
              setValue={setBehaviorWindow}
              label="window"
              title="Window in the foreground"
              description="If there is a window that is in the foreground"
            />
            <SettingsItem
              value={behaviorMaximizedWindow}
              dropdownValues={["none", "mute", "pause"]}
              setValue={setBehaviorMaximizedWindow}
              label="maximized-window"
              title="Maximized window"
              description="If there is a maximized window"
            />
            <SettingsItem
              value={behaviorFullscreenWindow}
              dropdownValues={["none", "mute", "pause"]}
              setValue={setBehaviorFullscreenWindow}
              label="fullscreen-window"
              title="Window in the fullscreen"
              description="If there is a window that is in the fullscreen"
            />
          </div>
          <div className="flex flex-col">
            <h1>{t("Volume")}</h1>
            <SettingsItem
              value={volume}
              setValue={setVolume}
              label="volume"
              title="General volume"
              description="General volume for all wallpapers"
            />
          </div>
          <div className="flex flex-col">
            <h1>{t("General")}</h1>
            <SettingsItem
              value={autolaunch}
              setValue={setAutolaunch}
              label="autolaunch"
              title="Autolaunch"
              description="Launch app with system to enable wallpapers"
            />
            <SettingsItem
              value={colorTheme}
              dropdownValues={["system", "light", "dark"]}
              setValue={setColorTheme}
              label="theme"
              title="Color theme"
              description="App color theme"
            />
            <SettingsItem
              value={language}
              dropdownValues={["system", "en", "ru"]}
              setValue={setLanguage}
              label="language"
              title="Language"
              description="App language"
            />
            <SettingsItem
              value={wallpaperPath}
              setValue={setWallpaperPath}
              label="wallpapers-path"
              title="Path to wallpapers folder"
              description="Path to the folder where the wallpapers are stored"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
