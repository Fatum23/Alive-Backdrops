import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatedRoutes } from "@routes/index";
import { Info, SettingsItem, SettingsNavBar } from "@widgets";
import { Scrollbar, Tooltip } from "@ui";
import { useSettingsStore } from "@shared/store";
import {
  TypeAppSettingsChapter,
  TypeColorTheme,
  TypeLanguage,
  TypeSettingsTabsRoutes,
  TypeShowWindow,
  TypeWallpaperBehavior,
} from "@public/types";
import {
  contextColorThemeCustom,
  ProviderColorThemeCustom,
} from "@shared/contexts";

import { BsWindow } from "react-icons/bs";
import { CgMaximize } from "react-icons/cg";
import {
  FaVolumeUp,
  FaDesktop,
  FaPalette,
  FaVolumeMute,
  FaDiscord,
  FaGithub,
  FaKeyboard,
  FaVolumeDown,
} from "react-icons/fa";

import {
  MdBugReport,
  MdFeedback,
  MdLaunch,
  MdRocketLaunch,
} from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { GoFileDirectoryFill, GoZoomIn } from "react-icons/go";
import { PiGraphicsCard } from "react-icons/pi";

import { FiMenu } from "react-icons/fi";
import { IoNotifications, IoPower } from "react-icons/io5";
import { HiMiniPause } from "react-icons/hi2";

import { LuEyeOff } from "react-icons/lu";
import { APP_NAME, ROUTES } from "@public/constants";
import i18next from "i18next";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { duration } from "moment";
import { AppTab, WallpapersTab } from "@routes/settings";
import { FaQuestion } from "react-icons/fa6";

const SettingsPageWithoutProvider = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TypeSettingsTabsRoutes>("/app");

  useEffect(() => {
    document.title = `${APP_NAME} - ${t(
      `routes.settings.tabs.${tab.slice(1)}.titlebar`
    )}`;
  }, [tab, i18next.language]);

  const store = useSettingsStore();

  const [language, setLanguage] = useState<TypeLanguage>(store.language);
  const [wallpapersPath, setWallpapersPath] = useState<string>(
    store.wallpapersPath
  );

  const [behaviorWindow, setBehaviorWindow] = useState<TypeWallpaperBehavior>(
    store.behaviorWindow
  );
  const [behaviorMaximizedWindow, setBehaviorMaximizedWindow] =
    useState<TypeWallpaperBehavior>(store.behaviorMaximizedWindow);
  const [behaviorFullscreenWindow, setBehaviorFullscreenWindow] =
    useState<TypeWallpaperBehavior>(store.behaviorFullscreenWindow);

  const [volume, setVolume] = useState<string>(store.volume);
  const [volumeValid, setVolumeValid] = useState<boolean>(true);

  const [autolaunch, setAutolaunch] = useState<boolean>(store.autolaunch);
  const [tray, setTray] = useState<boolean>(store.tray);
  const [hardwareAcceleration, setHardwareAcceleration] = useState<boolean>(
    store.hardwareAcceleration
  );

  const [colorTheme, setColorTheme] = useState<TypeColorTheme>(
    store.colorTheme
  );
  const { colorThemeCustom, setColorThemeCustom } = useContext(
    contextColorThemeCustom
  );
  const [interfaceScale, setInterfaceScale] = useState<string>(
    store.interfaceScale
  );
  const [interfaceScaleValid, setInterfaceScaleValid] = useState<boolean>(true);

  const [showWindowOnLaunch, setShowWindowOnLaunch] = useState<TypeShowWindow>(
    store.showWindowOnLaunch
  );
  const [showWindowOnAutolaunch, setShowWindowOnAutolaunch] =
    useState<TypeShowWindow>(store.showWindowOnAutolaunch);

  const [hideWindowOnClose, setHideWindowOnClose] = useState<boolean>(
    store.hideWindowOnClose
  );
  const [quitAppOnWindowClose, setQuitAppOnWindowClose] = useState<boolean>(
    store.quitAppOnWindowClose
  );

  const [hotkeysEnabled, setHotkeysEnabled] = useState<boolean>(
    store.hotkeysEnabled
  );
  const [hotkeyPause, setHotkeyPause] = useState<string>(store.hotkeyPause);
  const [hotkeyMute, setHotkeyMute] = useState<string>(store.hotkeyMute);
  const [hotkeyVolumeUp, setHotkeyVolumeUp] = useState<string>(
    store.hotkeyVolumeUp
  );
  const [hotkeyVolumeDown, setHotkeyVolumeDown] = useState<string>(
    store.hotkeyVolumeDown
  );

  const [activityInDiscord, setActivityInDiscord] = useState<boolean>(
    store.activityInDiscord
  );

  const [version, setVersion] = useState<string>("");
  useEffect(() => {
    const getVersion = async () =>
      setVersion(await window.ipcRenderer.app.getVersion());
    getVersion();
  }, []);
  const [notifyAboutUpdates, setNotifyAboutUpdates] = useState<boolean>(
    store.notifyAboutUpdates
  );

  const [settingsChapter, setSettingsChapter] =
    useState<TypeAppSettingsChapter>("general");
  const [settingsChapterScrolled, setSettingsChapterScrolled] =
    useState<boolean>(true);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const scrollableDivOnScrollEnd = useCallback(
    () => setSettingsChapterScrolled(true),
    []
  );
  useEffect(() => {
    if (!scrollableDivRef.current) return;

    scrollableDivRef.current.addEventListener(
      "scrollend",
      scrollableDivOnScrollEnd
    );

    return () => {
      scrollableDivRef.current?.removeEventListener(
        "scrollend",
        scrollableDivOnScrollEnd
      );
    };
  }, []);

  const generalChapterRef = useRef<HTMLDivElement>(null);
  const wallpapersBehaviorChapterRef = useRef<HTMLDivElement>(null);
  const systemChapterRef = useRef<HTMLDivElement>(null);
  const appearanceChapterRef = useRef<HTMLDivElement>(null);
  const appWindowChapterRef = useRef<HTMLDivElement>(null);
  const hotkeysChapterRef = useRef<HTMLDivElement>(null);
  const otherChapterRef = useRef<HTMLDivElement>(null);
  const aboutChapterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      settingsChapterScrolled ||
      !generalChapterRef.current ||
      !scrollableDivRef.current ||
      !wallpapersBehaviorChapterRef.current ||
      !systemChapterRef.current ||
      !appearanceChapterRef.current ||
      !appWindowChapterRef.current ||
      !hotkeysChapterRef.current ||
      !otherChapterRef.current ||
      !aboutChapterRef.current
    )
      return;

    let chapterTop = 0;
    switch (settingsChapter) {
      case "general":
        chapterTop = generalChapterRef.current.getBoundingClientRect().top;
        break;
      case "wallpapers-behavior":
        chapterTop =
          wallpapersBehaviorChapterRef.current.getBoundingClientRect().top;
        break;
      case "system":
        chapterTop = systemChapterRef.current.getBoundingClientRect().top;
        break;
      case "appearance":
        chapterTop = appearanceChapterRef.current.getBoundingClientRect().top;
        break;
      case "app-window":
        chapterTop = appWindowChapterRef.current.getBoundingClientRect().top;
        break;
      case "hotkeys":
        chapterTop = hotkeysChapterRef.current.getBoundingClientRect().top;
        break;
      case "other":
        chapterTop = otherChapterRef.current.getBoundingClientRect().top;
        break;
      case "about":
        chapterTop = aboutChapterRef.current.getBoundingClientRect().top;
        break;
    }
    scrollableDivRef.current.scrollBy({
      top:
        chapterTop - scrollableDivRef.current.getBoundingClientRect().top - 24,
      behavior: "smooth",
    });
  }, [settingsChapterScrolled]);

  const location = useLocation();

  return (
    <div className="flex flex-col w-screen h-full">
      <SettingsNavBar
        tab={tab}
        setTab={setTab}
        language={language}
        setLanguage={setLanguage}
        wallpapersPath={wallpapersPath}
        setWallpapersPath={setWallpapersPath}
        behaviorWindow={behaviorWindow}
        setBehaviorWindow={setBehaviorWindow}
        behaviorMaximizedWindow={behaviorMaximizedWindow}
        setBehaviorMaximizedWindow={setBehaviorMaximizedWindow}
        behaviorFullscreenWindow={behaviorFullscreenWindow}
        setBehaviorFullscreenWindow={setBehaviorFullscreenWindow}
        volume={volume}
        setVolume={setVolume}
        volumeValid={volumeValid}
        autolaunch={autolaunch}
        setAutolaunch={setAutolaunch}
        tray={tray}
        setTray={setTray}
        hardwareAcceleration={hardwareAcceleration}
        setHardwareAcceleration={setHardwareAcceleration}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        colorThemeCustom={colorThemeCustom}
        setColorThemeCustom={setColorThemeCustom}
        interfaceScale={interfaceScale}
        setInterfaceScale={setInterfaceScale}
        interfaceScaleValid={interfaceScaleValid}
        showWindowOnLaunch={showWindowOnLaunch}
        setShowWindowOnLaunch={setShowWindowOnLaunch}
        showWindowOnAutolaunch={showWindowOnAutolaunch}
        setShowWindowOnAutolaunch={setShowWindowOnAutolaunch}
        hideWindowOnClose={hideWindowOnClose}
        setHideWindowOnClose={setHideWindowOnClose}
        quitAppOnWindowClose={quitAppOnWindowClose}
        setQuitAppOnWindowClose={setQuitAppOnWindowClose}
        hotkeysEnabled={hotkeysEnabled}
        setHotkeysEnabled={setHotkeysEnabled}
        hotkeyPause={hotkeyPause}
        setHotkeyPause={setHotkeyPause}
        hotkeyMute={hotkeyMute}
        setHotkeyMute={setHotkeyMute}
        hotkeyVolumeUp={hotkeyVolumeUp}
        setHotkeyVolumeUp={setHotkeyVolumeUp}
        hotkeyVolumeDown={hotkeyVolumeDown}
        setHotkeyVolumeDown={setHotkeyVolumeDown}
        activityInDiscord={activityInDiscord}
        setActivityInDiscord={setActivityInDiscord}
        notifyAboutUpdates={notifyAboutUpdates}
        setNotifyAboutUpdates={setNotifyAboutUpdates}
        settingsChapter={settingsChapter}
        setSettingsChapter={setSettingsChapter}
        setSettingsChapterScrolled={setSettingsChapterScrolled}
      />
      {/* <div className="w-full h-full">
        <AnimatedRoutes mode="sync" routesAnimateDepth={2}>
          <Route
            index
            path={ROUTES.settings.tabs.app}
            element={
              <motion.div
                initial={{
                  x: -window.innerWidth,
                  width: 0,
                }}
                animate={{ x: 0, width: "100%" }}
                exit={{ x: -window.innerWidth, width: 0 }}
                className="w-full h-full"
              >
                <AppTab />
              </motion.div>
            }
          />
          <Route
            path={ROUTES.settings.tabs.wallpapers}
            element={
              <motion.div
                initial={{
                  x: window.innerWidth,
                  width: 0,
                }}
                animate={{ x: 0, width: "100%" }}
                exit={{ x: window.innerWidth, width: 0 }}
                className="w-full h-full"
              >
                <WallpapersTab />
              </motion.div>
            }
          />
        </AnimatedRoutes>
      </div> */}
      <Scrollbar>
        <div
          ref={scrollableDivRef}
          className="flex-1 overflow-y-auto"
          onScroll={(e) => {
            if (
              !settingsChapterScrolled ||
              !generalChapterRef.current ||
              !wallpapersBehaviorChapterRef.current ||
              !systemChapterRef.current ||
              !appearanceChapterRef.current ||
              !appWindowChapterRef.current ||
              !hotkeysChapterRef.current ||
              !otherChapterRef.current ||
              !aboutChapterRef.current
            )
              return;

            const el = document.elementFromPoint(
              window.innerWidth / 2,
              e.currentTarget.getBoundingClientRect().top + 24
            ) as HTMLElement;
            if (generalChapterRef.current.contains(el))
              setSettingsChapter("general");
            if (wallpapersBehaviorChapterRef.current.contains(el))
              setSettingsChapter("wallpapers-behavior");
            if (systemChapterRef.current.contains(el))
              setSettingsChapter("system");
            if (appearanceChapterRef.current.contains(el))
              setSettingsChapter("appearance");
            if (appWindowChapterRef.current.contains(el))
              setSettingsChapter("app-window");
            if (hotkeysChapterRef.current.contains(el))
              setSettingsChapter("hotkeys");
            if (otherChapterRef.current.contains(el))
              setSettingsChapter("other");
            if (aboutChapterRef.current.contains(el))
              setSettingsChapter("about");
          }}
        >
          <div className="flex flex-col gap-6 m-4">
            <div ref={generalChapterRef} className="flex flex-col">
              <h1>{t("settings.general.title")}</h1>
              <SettingsItem<TypeLanguage>
                icon={<GrLanguage size={26} />}
                value={language}
                selectOptions={[
                  {
                    label: t("settings.general.language.system"),
                    value: "system",
                  },
                  {
                    label: t("settings.general.language.en"),
                    value: "en",
                  },

                  {
                    label: t("settings.general.language.ru"),
                    value: "ru",
                  },
                ]}
                setValue={setLanguage}
                settingsKey="language"
                title={t("settings.general.language.title")}
                description={t("settings.general.language.description")}
              />
              <SettingsItem<string>
                icon={<GoFileDirectoryFill size={26} />}
                value={wallpapersPath}
                setValue={setWallpapersPath}
                settingsKey="wallpapers-path"
                title={t("settings.general.wallpapers-path.title")}
                description={t("settings.general.wallpapers-path.description")}
              />
            </div>

            <div ref={wallpapersBehaviorChapterRef} className="flex flex-col">
              <h1>{t("settings.wallpapers-behavior.title")}</h1>
              <SettingsItem<TypeWallpaperBehavior>
                icon={
                  <BsWindow size={26} className="[transform:rotateY(180deg)]" />
                }
                value={behaviorWindow}
                selectOptions={[
                  {
                    label: t("settings.wallpapers-behavior.keep-running"),
                    value: "keep-running",
                  },
                  {
                    label: t("settings.wallpapers-behavior.mute"),
                    value: "mute",
                  },

                  {
                    label: t("settings.wallpapers-behavior.pause"),
                    value: "pause",
                  },
                ]}
                setValue={setBehaviorWindow}
                settingsKey="behavior-window"
                title={t("settings.wallpapers-behavior.window.title")}
                description={t(
                  "settings.wallpapers-behavior.window.description"
                )}
              />
              <SettingsItem<TypeWallpaperBehavior>
                icon={<CgMaximize size={26} />}
                value={behaviorMaximizedWindow}
                selectOptions={[
                  {
                    label: t("settings.wallpapers-behavior.keep-running"),
                    value: "keep-running",
                  },
                  {
                    label: t("settings.wallpapers-behavior.mute"),
                    value: "mute",
                  },

                  {
                    label: t("settings.wallpapers-behavior.pause"),
                    value: "pause",
                  },
                ]}
                setValue={setBehaviorMaximizedWindow}
                settingsKey="behavior-maximized-window"
                title={t("settings.wallpapers-behavior.maximized-window.title")}
                description={t(
                  "settings.wallpapers-behavior.maximized-window.description"
                )}
              />
              <SettingsItem<TypeWallpaperBehavior>
                icon={<FaDesktop size={26} />}
                value={behaviorFullscreenWindow}
                selectOptions={[
                  {
                    label: t("settings.wallpapers-behavior.keep-running"),
                    value: "keep-running",
                  },
                  {
                    label: t("settings.wallpapers-behavior.mute"),
                    value: "mute",
                  },

                  {
                    label: t("settings.wallpapers-behavior.pause"),
                    value: "pause",
                  },
                ]}
                setValue={setBehaviorFullscreenWindow}
                settingsKey="behavior-fullscreen-window"
                title={t(
                  "settings.wallpapers-behavior.fullscreen-window.title"
                )}
                description={t(
                  "settings.wallpapers-behavior.fullscreen-window.description"
                )}
              />
              <SettingsItem<string>
                icon={
                  volumeValid && volume !== "0" ? (
                    <FaVolumeUp size={26} />
                  ) : (
                    <FaVolumeMute size={23} />
                  )
                }
                value={volume}
                setValue={setVolume}
                sliderMinValue={0}
                sliderMaxValue={100}
                sliderStep={1}
                sliderValueValid={volumeValid}
                setSliderValueValid={setVolumeValid}
                settingsKey="volume"
                title="General volume"
                description="General volume for all wallpapers"
              />
            </div>

            <div ref={systemChapterRef} className="flex flex-col">
              <h1>{t("settings.system.title")}</h1>
              <SettingsItem<boolean>
                icon={<MdRocketLaunch size={26} />}
                value={autolaunch}
                setValue={setAutolaunch}
                settingsKey="autolaunch"
                title={t("settings.system.autolaunch.title")}
                description={t("settings.system.autolaunch.description")}
              />
              <SettingsItem<boolean>
                icon={<FiMenu size={26} />}
                value={tray}
                setValue={setTray}
                settingsKey="tray"
                title={t("settings.system.tray.title")}
                description={t("settings.system.tray.description")}
              />
              <SettingsItem<boolean>
                icon={<PiGraphicsCard size={26} />}
                value={hardwareAcceleration}
                setValue={setHardwareAcceleration}
                settingsKey="hardware-acceleration"
                title={t("settings.system.hardware-acceleration.title")}
                description={t(
                  "settings.system.hardware-acceleration.description"
                )}
              />
            </div>

            <div ref={appearanceChapterRef} className="flex flex-col">
              <h1>{t("settings.appearance.title")}</h1>
              <SettingsItem<TypeColorTheme>
                icon={<FaPalette size={26} />}
                value={colorTheme}
                selectOptions={[
                  {
                    label: t("settings.appearance.theme.system"),
                    value: "system",
                  },
                  {
                    label: t("settings.appearance.theme.light"),
                    value: "light",
                  },

                  {
                    label: t("settings.appearance.theme.dark"),
                    value: "dark",
                  },
                  {
                    label: t("settings.appearance.theme.custom"),
                    value: "custom",
                  },
                ]}
                setValue={setColorTheme}
                settingsKey="theme"
                title={t("settings.appearance.theme.title")}
                description={t("settings.appearance.theme.description")}
              />
              <SettingsItem<string>
                icon={<GoZoomIn size={26} />}
                value={interfaceScale}
                setValue={setInterfaceScale}
                sliderMinValue={0.5}
                sliderMaxValue={2}
                sliderStep={0.05}
                sliderValueValid={interfaceScaleValid}
                setSliderValueValid={setInterfaceScaleValid}
                settingsKey="interface-scale"
                title={t("settings.appearance.interface-scale.title")}
                description={t(
                  "settings.appearance.interface-scale.description"
                )}
              />
            </div>

            <div ref={appWindowChapterRef} className="flex flex-col">
              <h1>{t("settings.app-window.title")}</h1>
              <SettingsItem<TypeShowWindow>
                icon={<MdLaunch size={26} />}
                value={showWindowOnLaunch}
                setValue={setShowWindowOnLaunch}
                selectOptions={[
                  {
                    label: t("settings.app-window.do-not-show"),
                    value: "do-not-show",
                  },
                  {
                    label: t("settings.app-window.if-no-active-wallpaper"),
                    value: "if-no-active-wallpaper",
                  },
                  {
                    label: t("settings.app-window.show"),
                    value: "show",
                  },
                ]}
                settingsKey="show-window-on-launch"
                title={t("settings.app-window.on-launch.title")}
                description={t("settings.app-window.on-launch.description")}
              />
              <SettingsItem<TypeShowWindow>
                icon={<MdRocketLaunch size={26} />}
                value={showWindowOnAutolaunch}
                setValue={setShowWindowOnAutolaunch}
                selectOptions={[
                  {
                    label: t("settings.app-window.do-not-show"),
                    value: "do-not-show",
                  },
                  {
                    label: t("settings.app-window.if-no-active-wallpaper"),
                    value: "if-no-active-wallpaper",
                  },
                  {
                    label: t("settings.app-window.show"),
                    value: "show",
                  },
                ]}
                settingsKey="show-window-on-autolaunch"
                title={t("settings.app-window.on-autolaunch.title")}
                description={t("settings.app-window.on-autolaunch.description")}
              />
              <SettingsItem<boolean>
                icon={<LuEyeOff size={26} />}
                value={hideWindowOnClose}
                setValue={setHideWindowOnClose}
                settingsKey="hide-window-on-close"
                title={t("settings.app-window.hide-on-close.title")}
                description={t("settings.app-window.hide-on-close.description")}
              />
              <SettingsItem<boolean>
                icon={<IoPower size={26} />}
                value={quitAppOnWindowClose}
                setValue={setQuitAppOnWindowClose}
                settingsKey="quit-app-on-window-close"
                title={t("settings.app-window.quit-app-on-close.title")}
                description={t(
                  "settings.app-window.quit-app-on-close.description"
                )}
                active={!hideWindowOnClose}
              />
            </div>

            <div ref={hotkeysChapterRef} className="flex flex-col">
              <div className="flex flex-row items-center gap-1">
                <h1>{t("settings.hotkeys.title")}</h1>
                <Tooltip text={t("settings.hotkeys.info")} info>
                  <div>
                    <Info />
                  </div>
                </Tooltip>
              </div>
              <SettingsItem<boolean>
                icon={<FaKeyboard size={26} />}
                value={hotkeysEnabled}
                setValue={setHotkeysEnabled}
                settingsKey="hotkeys-enabled"
                title={t("settings.hotkeys.hotkeys-enabled.title")}
                description={t("settings.hotkeys.hotkeys-enabled.description")}
              />
              <SettingsItem<string>
                icon={<HiMiniPause size={26} />}
                value={hotkeyPause}
                setValue={setHotkeyPause}
                active={hotkeysEnabled}
                settingsKey="hotkey-pause"
                title={t("settings.hotkeys.pause")}
              />
              <SettingsItem<string>
                icon={<FaVolumeMute size={23} />}
                value={hotkeyMute}
                setValue={setHotkeyMute}
                active={hotkeysEnabled}
                settingsKey="hotkey-mute"
                title={t("settings.hotkeys.mute")}
              />
              <SettingsItem<string>
                icon={<FaVolumeUp size={26} />}
                value={hotkeyVolumeUp}
                setValue={setHotkeyVolumeUp}
                active={hotkeysEnabled}
                settingsKey="hotkey-volume-up"
                title={t("settings.hotkeys.volume-up")}
              />
              <SettingsItem<string>
                icon={<FaVolumeDown size={26} />}
                value={hotkeyVolumeDown}
                setValue={setHotkeyVolumeDown}
                active={hotkeysEnabled}
                settingsKey="hotkey-volume-down"
                title={t("settings.hotkeys.volume-down")}
              />
            </div>

            <div ref={otherChapterRef} className="flex flex-col">
              <h1>{t("settings.other.title")}</h1>
              <SettingsItem<boolean>
                icon={<FaDiscord size={26} />}
                value={activityInDiscord}
                setValue={setActivityInDiscord}
                settingsKey="activity-in-discord"
                title={t("settings.other.activity-in-discord.title")}
                description={t(
                  "settings.other.activity-in-discord.description"
                )}
              />
            </div>

            <div ref={aboutChapterRef} className="flex flex-col">
              <h1>{t("settings.about.title")}</h1>
              <SettingsItem<boolean>
                icon={<IoNotifications size={26} />}
                value={notifyAboutUpdates}
                setValue={setNotifyAboutUpdates}
                title={t("settings.about.notify-about-updates.title")}
                description={t(
                  "settings.about.notify-about-updates.description"
                )}
                settingsKey="notify-about-updates"
              />
              <SettingsItem
                title={t("settings.about.version.title", { version: version })}
                settingsKey="version"
              />
              <SettingsItem
                icon={<FaQuestion size={26} />}
                title="Faq"
                settingsKey="faq"
              />
              <SettingsItem
                icon={<MdFeedback size={26} />}
                title="Feedback"
                settingsKey="feedback"
              />
              <SettingsItem
                icon={<FaGithub size={26} />}
                title={t("settings.about.github.title")}
                description={t("settings.about.github.description")}
                settingsKey="github"
              />
              <SettingsItem
                icon={<MdBugReport size={26} />}
                title={t("settings.about.report-a-bug.title")}
                settingsKey="report-a-bug"
                description={t("settings.about.report-a-bug.description")}
              />
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export const SettingsPage = () => (
  <ProviderColorThemeCustom>
    <SettingsPageWithoutProvider />
  </ProviderColorThemeCustom>
);
