import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@shared/store";
import { TypeSettingsChapter, TypeSettingsStateStore } from "@public/types";
import { BackButton } from "@widgets";
import { Select } from "@ui";

export const SettingsNavBar = (
  props: TypeSettingsStateStore & {
    volumeValid: boolean;
    settingsChapter: TypeSettingsChapter;
    setSettingsChapter: Dispatch<SetStateAction<TypeSettingsChapter>>;
    setSettingsChapterTrigger: Dispatch<SetStateAction<boolean>>;
  }
) => {
  const { t } = useTranslation();
  const store = useSettingsStore();

  const [userDataPath, setUserDataPath] = useState<string | null>(null);

  useEffect(() => {
    async function getUserDataPath() {
      setUserDataPath(await window.ipcRenderer.path.get("userData"));
    }
    getUserDataPath();
  }, []);

  return (
    <>
      <div className="flex flex-row gap-2 items-center h-8 m-2">
        <BackButton />
        <Select
          dropdownValues={[
            "General",
            "Wallpapers",
            "System",
            "Appearance",
            "App window",
            "Hotkeys",
            "Other",
            "About the program",
          ]}
          value={props.settingsChapter}
          setValue={
            props.setSettingsChapter as Dispatch<SetStateAction<string>>
          }
          onOptionClick={() => props.setSettingsChapterTrigger((val) => !val)}
          classNamePrefix="settings-navbar"
        />
        <button
          className="p-1"
          disabled={
            props.behaviorWindow === store.behaviorWindow &&
            props.behaviorMaximizedWindow === store.behaviorMaximizedWindow &&
            props.behaviorFullscreenWindow === store.behaviorFullscreenWindow &&
            (!props.volumeValid || props.volume === store.volume) &&
            props.autolaunch === store.autolaunch &&
            props.colorTheme === store.colorTheme &&
            JSON.stringify(props.colorThemeCustom) ===
              JSON.stringify(store.colorThemeCustom) &&
            props.language === store.language &&
            props.wallpapersPath === store.wallpapersPath
          }
          onClick={() => {
            store.setBehaviorWindow(props.behaviorWindow);
            store.setBehaviorMaximizedWindow(props.behaviorMaximizedWindow);
            store.setBehaviorFullscreenWindow(props.behaviorFullscreenWindow);
            store.setVolume(props.volume);
            store.setAutolaunch(props.autolaunch);
            store.setColorTheme(props.colorTheme);
            store.setColorThemeCustom(props.colorThemeCustom);
            store.setLanguage(props.language);
            store.setWallpapersPath(props.wallpapersPath);
          }}
        >
          {t("Apply")}
        </button>
        <button
          className="p-1"
          disabled={
            props.behaviorWindow === "mute" &&
            props.behaviorMaximizedWindow === "pause" &&
            props.behaviorFullscreenWindow === "pause" &&
            props.volume === "100" &&
            props.autolaunch === true &&
            props.colorTheme === "system" &&
            props.colorThemeCustom === undefined &&
            props.language === "system" &&
            props.wallpapersPath === userDataPath &&
            store.behaviorWindow === "mute" &&
            store.behaviorMaximizedWindow === "pause" &&
            store.behaviorFullscreenWindow === "pause" &&
            store.volume === "100" &&
            store.autolaunch === true &&
            store.colorTheme === "system" &&
            store.colorThemeCustom === undefined &&
            store.language === "system" &&
            store.wallpapersPath === userDataPath
          }
          onClick={async () => {
            props.setBehaviorWindow("mute");
            props.setBehaviorMaximizedWindow("pause");
            props.setBehaviorFullscreenWindow("pause");
            props.setVolume("100");
            props.setAutolaunch(true);
            props.setColorTheme("system");
            props.setColorThemeCustom(undefined);
            props.setLanguage("system");
            props.setWallpapersPath(userDataPath!);
            store.setBehaviorWindow("mute");
            store.setBehaviorMaximizedWindow("pause");
            store.setBehaviorFullscreenWindow("pause");
            store.setVolume("100");
            store.setAutolaunch(true);
            store.setColorTheme("system");
            store.setColorThemeCustom(undefined);
            store.setLanguage("system");
            store.setWallpapersPath(userDataPath!);
          }}
        >
          {t("Reset")}
        </button>
      </div>
      <hr />
    </>
  );
};
