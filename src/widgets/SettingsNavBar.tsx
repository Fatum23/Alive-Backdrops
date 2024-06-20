import { useSettingsStore } from "@shared/store";
import { TypeSettings } from "@shared/types";
import { appDataDir } from "@tauri-apps/api/path";
import { BackButton } from "@widgets";
import { useTranslation } from "react-i18next";

export default function SettingsNavBar(props: TypeSettings) {
  const { t } = useTranslation();
  const store = useSettingsStore();
  return (
    <>
      <div className="flex flex-row justify-between items-center h-10">
        <BackButton />
        <div className="flex flex-row gap-2 items-center mr-2 mt-2">
          <button
            className="p-1"
            disabled={
              props.behaviorWindow === store.behaviorWindow &&
              props.behaviorMaximizedWindow === store.behaviorMaximizedWindow &&
              props.behaviorFullscreenWindow ===
                store.behaviorFullscreenWindow &&
              props.volume === store.volume &&
              props.autolaunch === store.autolaunch &&
              props.colorTheme === store.colorTheme &&
              props.language === store.language &&
              props.wallpaperPath === store.wallpaperPath
            }
            onClick={() => {
              store.setBehaviorWindow(props.behaviorWindow);
              store.setBehaviorMaximizedWindow(props.behaviorMaximizedWindow);
              store.setBehaviorFullscreenWindow(props.behaviorFullscreenWindow);
              store.setVolume(props.volume);
              store.setAutolaunch(props.autolaunch);
              store.setColorTheme(props.colorTheme);
              store.setLanguage(props.language);
              store.setWallpaperPath(props.wallpaperPath);
            }}
          >
            {t("Apply")}
          </button>
          <button
            className="p-1"
            onClick={async () => {
              props.setBehaviorWindow("mute");
              props.setBehaviorMaximizedWindow("pause");
              props.setBehaviorFullscreenWindow("pause");
              props.setVolume("100");
              props.setAutolaunch(true);
              props.setColorTheme("system");
              props.setLanguage("system");
              props.setWallpaperPath(await appDataDir());
              store.setBehaviorWindow("mute");
              store.setBehaviorMaximizedWindow("pause");
              store.setBehaviorFullscreenWindow("pause");
              store.setVolume("100");
              store.setAutolaunch(true);
              store.setColorTheme("system");
              store.setLanguage("system");
              store.setWallpaperPath(await appDataDir());
            }}
          >
            {t("Reset")}
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
