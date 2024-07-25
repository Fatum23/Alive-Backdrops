import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsItem, SettingsNavBar, SettingsFooter } from "@widgets";
import { useSettingsStore } from "@shared/store";
import {
  TypeColorTheme,
  TypeLanguage,
  TypePage,
  TypeWallpaperBehavior,
} from "@public/types";
import { useLocation } from "react-router-dom";
import {
  contextColorThemeCustom,
  ProviderColorThemeCustom,
} from "@shared/contexts";

const SettingsPageWithoutProvider = (props: TypePage) => {
  const location = useLocation();
  useEffect(() => {
    props.setTitle("Settings");
    props.setLocation(location.pathname);
  }, []);

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
  const { colorThemeCustom, setColorThemeCustom } = useContext(
    contextColorThemeCustom
  );
  const [language, setLanguage] = useState<TypeLanguage>(store.language);
  const [wallpapersPath, setWallpapersPath] = useState<string>(
    store.wallpapersPath
  );

  return (
    <div className="h-screen w-screen overflow-hidden">
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
        colorThemeCustom={colorThemeCustom}
        setColorThemeCustom={setColorThemeCustom}
        language={language}
        setLanguage={setLanguage}
        wallpapersPath={wallpapersPath}
        setWallpapersPath={setWallpapersPath}
      />
      <div className="h-[calc(100%-72px)] overflow-y-auto">
        <div className="flex flex-col gap-6 m-4">
          <div className="flex flex-col">
            <h1>{t("Wallpaper behavior")}</h1>
            <SettingsItem
              value={behaviorWindow}
              dropdownValues={["nothing", "mute", "pause"]}
              setValue={setBehaviorWindow}
              storekey="behaviorWindow"
              title="Window"
              description="If there is an active window"
            />
            <SettingsItem
              value={behaviorMaximizedWindow}
              dropdownValues={["nothing", "mute", "pause"]}
              setValue={setBehaviorMaximizedWindow}
              storekey="behaviorMaximizedWindow"
              title="Maximized window"
              description="If there is an active maximized window"
            />
            <SettingsItem
              value={behaviorFullscreenWindow}
              dropdownValues={["nothing", "mute", "pause"]}
              setValue={setBehaviorFullscreenWindow}
              storekey="behaviorFullscreenWindow"
              title="Fullscreen window"
              description="If there is an active fullscreen window"
            />
          </div>
          <div className="flex flex-col">
            <h1>{t("Volume")}</h1>
            <SettingsItem
              value={volume}
              setValue={setVolume}
              storekey="volume"
              title="General volume"
              description="General volume for all wallpapers"
            />
          </div>
          <div className="flex flex-col">
            <h1>{t("General")}</h1>
            <SettingsItem
              value={autolaunch}
              setValue={setAutolaunch}
              storekey="autolaunch"
              title="Autolaunch"
              description="Launch app with system to enable wallpapers"
            />
            <SettingsItem
              value={colorTheme}
              dropdownValues={["system", "light", "dark", "custom"]}
              setValue={setColorTheme}
              storekey="colorTheme"
              title="Color theme"
              description="App color theme"
            />
            <SettingsItem
              value={language}
              dropdownValues={["system", "en", "ru"]}
              setValue={setLanguage}
              storekey="language"
              title="Language"
              description="App language"
            />
            <SettingsItem
              value={wallpapersPath}
              setValue={setWallpapersPath}
              storekey="wallpapersPath"
              title="Path to wallpapers folder"
              description="Path to the folder where the wallpapers are stored"
            />
          </div>
          <SettingsFooter />
        </div>
      </div>
    </div>
  );
};

export const SettingsPage = (props: TypePage) => (
  <ProviderColorThemeCustom>
    <SettingsPageWithoutProvider
      setTitle={props.setTitle}
      setLocation={props.setLocation}
    />
  </ProviderColorThemeCustom>
);
