import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@shared/store";
import {
  TypeAppSettingsChapter,
  TypeModalDoNotShowAgainKeys,
  TypeSettingsStateStore,
  TypeSettingsTab,
  TypeWallpapersSettingsChapter,
} from "@public/types";
import { BackButton, Tabs } from "@widgets";
import { Modal, Select } from "@ui";

export const SettingsNavBar = (
  props: TypeSettingsStateStore & {
    settingsTab: TypeSettingsTab;
    setSettingsTab: Dispatch<SetStateAction<TypeSettingsTab>>;
    volumeValid: boolean;
    interfaceScaleValid: boolean;
    appSettingsChapter: TypeAppSettingsChapter;
    setAppSettingsChapter: Dispatch<SetStateAction<TypeAppSettingsChapter>>;
    wallpapersSettingsChapter: TypeWallpapersSettingsChapter;
    setWallpapersSettingsChapter: Dispatch<
      SetStateAction<TypeWallpapersSettingsChapter>
    >;
    setSettingsChapterScrolled: Dispatch<SetStateAction<boolean>>;
  }
) => {
  const { t } = useTranslation();
  const store = useSettingsStore();

  const [userDataPath, setUserDataPath] = useState<string>("");

  useEffect(() => {
    async function getUserDataPath() {
      setUserDataPath(await window.ipcRenderer.path.get("userData"));
    }
    getUserDataPath();
  }, []);

  const [checkDoNotShowAgain, setCheckDoNotShowAgain] =
    useState<boolean>(false);
  const [restartModalOpened, setRestartModalOpened] = useState<boolean>(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState<boolean>(false);

  useEffect(() => {
    const getFromStore = async () => {
      setRestartModalOpened(
        (await window.ipcRenderer.store.get<
          TypeModalDoNotShowAgainKeys,
          boolean
        >("settings-restart")) && (await window.ipcRenderer.app.isPackaged())
          ? false
          : true
      );
      setDoNotShowAgain(
        !!(await window.ipcRenderer.store.get<
          TypeModalDoNotShowAgainKeys,
          boolean
        >("settings-restart"))
      );
    };
    getFromStore();
  }, [checkDoNotShowAgain]);

  const [storeChangeCount, setStoreChangeCount] = useState<number>(0);

  useEffect(
    () =>
      storeChangeCount == 2
        ? setCheckDoNotShowAgain((value) => !value)
        : setStoreChangeCount((value) => value + 1),
    [store.wallpapersPath, store.hardwareAcceleration]
  );

  return (
    <>
      <div className="flex flex-row items-center h-8 gap-2 m-2">
        <BackButton />
        <Tabs />
        <Select<TypeAppSettingsChapter>
          options={[
            {
              label: t("settings.general.title"),
              value: "general",
            },
            {
              label: t("settings.system.title"),
              value: "system",
            },
            {
              label: t("settings.appearance.title"),
              value: "appearance",
            },
            {
              label: t("settings.app-window.title"),
              value: "app-window",
            },
            {
              label: t("settings.hotkeys.title"),
              value: "hotkeys",
            },
            {
              label: t("settings.other.title"),
              value: "other",
            },
            {
              label: t("settings.about.title"),
              value: "about",
            },
          ]}
          value={props.settingsTab}
          setValue={props.setSettingsTab as Dispatch<SetStateAction<string>>}
          onOptionClick={() => props.setSettingsChapterScrolled(false)}
          classNameStylePrefix="settings-navbar"
        />
        <button
          className="p-1"
          disabled={
            props.language === store.language &&
            props.wallpapersPath === store.wallpapersPath &&
            props.behaviorWindow === store.behaviorWindow &&
            props.behaviorMaximizedWindow === store.behaviorMaximizedWindow &&
            props.behaviorFullscreenWindow === store.behaviorFullscreenWindow &&
            (!props.volumeValid || props.volume === store.volume) &&
            props.autolaunch === store.autolaunch &&
            props.tray === store.tray &&
            props.hardwareAcceleration === store.hardwareAcceleration &&
            props.colorTheme === store.colorTheme &&
            JSON.stringify(props.colorThemeCustom) ===
              JSON.stringify(store.colorThemeCustom) &&
            (!props.interfaceScaleValid ||
              props.interfaceScale === store.interfaceScale) &&
            props.showWindowOnLaunch === store.showWindowOnLaunch &&
            props.showWindowOnAutolaunch === store.showWindowOnAutolaunch &&
            props.hideWindowOnClose === store.hideWindowOnClose &&
            props.quitAppOnWindowClose === store.quitAppOnWindowClose &&
            props.hotkeysEnabled === store.hotkeysEnabled &&
            props.hotkeyPause == store.hotkeyPause &&
            props.hotkeyMute == store.hotkeyMute &&
            props.hotkeyVolumeUp == store.hotkeyVolumeUp &&
            props.hotkeyVolumeDown == store.hotkeyVolumeDown &&
            props.activityInDiscord === store.activityInDiscord &&
            props.notifyAboutUpdates === store.notifyAboutUpdates
          }
          onClick={() => {
            store.setLanguage(props.language);
            store.setWallpapersPath(props.wallpapersPath);

            store.setBehaviorWindow(props.behaviorWindow);
            store.setBehaviorMaximizedWindow(props.behaviorMaximizedWindow);
            store.setBehaviorFullscreenWindow(props.behaviorFullscreenWindow);
            store.setVolume(props.volume);

            store.setAutolaunch(props.autolaunch);
            store.setTray(props.tray);
            store.setHardwareAcceleration(props.hardwareAcceleration);

            store.setColorTheme(props.colorTheme);
            store.setColorThemeCustom(props.colorThemeCustom);
            store.setInterfaceScale(props.interfaceScale);

            store.setShowWindowOnLaunch(props.showWindowOnLaunch);
            store.setShowWindowOnAutolaunch(props.showWindowOnAutolaunch);
            store.setHideWindowOnClose(props.hideWindowOnClose);
            store.setQuitAppOnWindowClose(props.quitAppOnWindowClose);

            store.setHotkeysEnabled(props.hotkeysEnabled);
            store.setHotkeyPause(props.hotkeyPause);
            store.setHotkeyMute(props.hotkeyMute);
            store.setHotkeyVolumeUp(props.hotkeyVolumeUp);
            store.setHotkeyVolumeDown(props.hotkeyVolumeDown);

            store.setActivityInDiscord(props.activityInDiscord);

            store.setNotifyAboutUpdates(props.notifyAboutUpdates);
          }}
        >
          {t("settings.navbar.apply")}
        </button>
        <button
          className="p-1"
          disabled={
            props.language === "system" &&
            props.wallpapersPath === userDataPath &&
            props.behaviorWindow === "mute" &&
            props.behaviorMaximizedWindow === "pause" &&
            props.behaviorFullscreenWindow === "pause" &&
            props.volume === "100" &&
            props.autolaunch &&
            props.tray &&
            props.hardwareAcceleration &&
            props.colorTheme === "system" &&
            props.colorThemeCustom === undefined &&
            props.interfaceScale === "1" &&
            props.showWindowOnLaunch === "if-no-active-wallpaper" &&
            props.showWindowOnAutolaunch === "if-no-active-wallpaper" &&
            props.hideWindowOnClose &&
            !props.quitAppOnWindowClose &&
            props.hotkeysEnabled &&
            props.hotkeyPause === "Ctrl + P" &&
            props.hotkeyMute === "Ctrl + M" &&
            props.hotkeyVolumeUp === "Ctrl + ArrowUp" &&
            props.hotkeyVolumeDown === "Ctrl + ArrowDown" &&
            props.activityInDiscord &&
            props.notifyAboutUpdates &&
            store.language === "system" &&
            store.wallpapersPath === userDataPath &&
            store.behaviorWindow === "mute" &&
            store.behaviorMaximizedWindow === "pause" &&
            store.behaviorFullscreenWindow === "pause" &&
            store.volume === "100" &&
            store.autolaunch &&
            store.tray &&
            store.hardwareAcceleration &&
            store.colorTheme === "system" &&
            store.colorThemeCustom === undefined &&
            store.interfaceScale === "1" &&
            store.showWindowOnLaunch === "if-no-active-wallpaper" &&
            store.showWindowOnAutolaunch === "if-no-active-wallpaper" &&
            store.hideWindowOnClose &&
            !store.quitAppOnWindowClose &&
            store.hotkeysEnabled &&
            store.hotkeyPause === "Ctrl + P" &&
            store.hotkeyMute === "Ctrl + M" &&
            store.hotkeyVolumeUp === "Ctrl + ArrowUp" &&
            store.hotkeyVolumeDown === "Ctrl + ArrowDown" &&
            store.activityInDiscord &&
            store.notifyAboutUpdates
          }
          onClick={async () => {
            props.setLanguage("system");
            props.setWallpapersPath(userDataPath);
            props.setBehaviorWindow("mute");
            props.setBehaviorMaximizedWindow("pause");
            props.setBehaviorFullscreenWindow("pause");
            props.setVolume("100");
            props.setAutolaunch(true);
            props.setTray(true);
            props.setHardwareAcceleration(true);
            props.setColorTheme("system");
            props.setColorThemeCustom(undefined);
            props.setInterfaceScale("1");
            props.setShowWindowOnLaunch("if-no-active-wallpaper");
            props.setShowWindowOnAutolaunch("if-no-active-wallpaper");
            props.setHideWindowOnClose(true);
            props.setQuitAppOnWindowClose(false);
            props.setHotkeysEnabled(true);
            props.setHotkeyPause("Ctrl + P");
            props.setHotkeyMute("Ctrl + M");
            props.setHotkeyVolumeUp("Ctrl + ArrowUp");
            props.setHotkeyVolumeDown("Ctrl + ArrowDown");
            props.setActivityInDiscord(true);
            props.setNotifyAboutUpdates(true);

            store.setLanguage("system");
            store.setWallpapersPath(userDataPath);
            store.setBehaviorWindow("mute");
            store.setBehaviorMaximizedWindow("pause");
            store.setBehaviorFullscreenWindow("pause");
            store.setVolume("100");
            store.setAutolaunch(true);
            store.setTray(true);
            store.setHardwareAcceleration(true);
            store.setColorTheme("system");
            store.setColorThemeCustom(undefined);
            store.setInterfaceScale("1");
            store.setShowWindowOnLaunch("if-no-active-wallpaper");
            store.setShowWindowOnAutolaunch("if-no-active-wallpaper");
            store.setHideWindowOnClose(true);
            store.setQuitAppOnWindowClose(false);
            store.setHotkeysEnabled(true);
            store.setHotkeyPause("Ctrl + P");
            store.setHotkeyMute("Ctrl + M");
            store.setHotkeyVolumeUp("Ctrl + ArrowUp");
            store.setHotkeyVolumeDown("Ctrl + ArrowDown");
            store.setActivityInDiscord(true);
            store.setNotifyAboutUpdates(true);
          }}
        >
          {t("settings.navbar.reset")}
        </button>
      </div>
      <hr />
      <Modal
        opened={restartModalOpened}
        setOpened={setRestartModalOpened}
        doNotShowAgain={doNotShowAgain}
        setDoNotShowAgain={setDoNotShowAgain}
        title={t("settings.restart-required")}
        closable
        confirmEnabled
        cancelEnabled
        confirmButton
        cancelButton
        onConfirm={() => {
          window.ipcRenderer.app.relaunch("settings-restart");
        }}
        onCancel={() => {
          setRestartModalOpened(false);
        }}
      >
        <div className="flex justify-center">{t("settings.restart-now")}</div>
      </Modal>
    </>
  );
};
