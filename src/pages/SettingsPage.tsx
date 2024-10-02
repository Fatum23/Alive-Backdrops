import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsItem, SettingsNavBar, SettingsFooter } from "@widgets";
import { Tooltip } from "@ui";
import { useSettingsStore } from "@shared/store";
import {
  TypeColorTheme,
  TypeLanguage,
  TypePage,
  TypeSettingsChapter,
  TypeWallpaperBehavior,
} from "@public/types";
import { useLocation } from "react-router-dom";
import {
  contextColorThemeCustom,
  ProviderColorThemeCustom,
} from "@shared/contexts";

import { IoMdInformationCircleOutline } from "react-icons/io";

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
  const [volumeValid, setVolumeValid] = useState<boolean>(true);

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

  const [settingsChapter, setSettingsChapter] =
    useState<TypeSettingsChapter>("General");
  const [settingsChapterTrigger, setSettingsChapterTrigger] =
    useState<boolean>(false);

  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const generalChapterRef = useRef<HTMLDivElement>(null);
  const wallpapersChapterRef = useRef<HTMLDivElement>(null);
  const systemChapterRef = useRef<HTMLDivElement>(null);
  const appearanceChapterRef = useRef<HTMLDivElement>(null);
  const appWindowChapterRef = useRef<HTMLDivElement>(null);
  const hotkeysChapterRef = useRef<HTMLDivElement>(null);
  const otherChapterRef = useRef<HTMLDivElement>(null);
  const aboutChapterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !scrollableDivRef.current ||
      !generalChapterRef.current ||
      !wallpapersChapterRef.current ||
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
      case "General":
        chapterTop = generalChapterRef.current.getBoundingClientRect().top;
        break;
      case "Wallpapers":
        chapterTop = wallpapersChapterRef.current.getBoundingClientRect().top;
        break;
      case "System":
        chapterTop = systemChapterRef.current.getBoundingClientRect().top;
        break;
      case "Appearance":
        chapterTop = appearanceChapterRef.current.getBoundingClientRect().top;
        break;
      case "App window":
        chapterTop = appWindowChapterRef.current.getBoundingClientRect().top;
        break;
      case "Hotkeys":
        chapterTop = hotkeysChapterRef.current.getBoundingClientRect().top;
        break;
      case "Other":
        chapterTop = otherChapterRef.current.getBoundingClientRect().top;
        break;
      case "About the program":
        chapterTop = aboutChapterRef.current.getBoundingClientRect().top;
        break;
    }
    scrollableDivRef.current.scrollBy({
      top:
        chapterTop - scrollableDivRef.current.getBoundingClientRect().top - 24,
      behavior: "smooth",
    });
  }, [settingsChapterTrigger]);

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
        volumeValid={volumeValid}
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
        settingsChapter={settingsChapter}
        setSettingsChapter={setSettingsChapter}
        setSettingsChapterTrigger={setSettingsChapterTrigger}
      />
      <div
        ref={scrollableDivRef}
        className="h-[calc(100%-72px)] overflow-y-auto"
        // onScroll={(e) => {
        //   if (
        //     !generalChapterRef.current ||
        //     !wallpapersChapterRef.current ||
        //     !systemChapterRef.current ||
        //     !appearanceChapterRef.current ||
        //     !appWindowChapterRef.current ||
        //     !otherChapterRef.current ||
        //     !aboutChapterRef.current
        //   )
        //     return;

        //   const el = document.elementFromPoint(
        //     window.innerWidth / 2,
        //     e.currentTarget.getBoundingClientRect().top
        //   ) as HTMLElement;
        //   if (generalChapterRef.current.contains(el))
        //     setSettingsChapter("Основные");
        //   if (wallpapersChapterRef.current.contains(el))
        //     setSettingsChapter("Обои");
        //   if (systemChapterRef.current.contains(el))
        //     setSettingsChapter("Система");
        //   if (appearanceChapterRef.current.contains(el))
        //     setSettingsChapter("Внешний вид");
        //   if (appWindowChapterRef.current.contains(el))
        //     setSettingsChapter("Окно приложения");
        //   if (otherChapterRef.current.contains(el))
        //     setSettingsChapter("Другое");
        //   if (aboutChapterRef.current.contains(el))
        //     setSettingsChapter("О программе");
        // }}
      >
        <div className="flex flex-col gap-6 m-4">
          <div ref={generalChapterRef} className="flex flex-col">
            <h1>{t("General")}</h1>
            <SettingsItem
              value={language}
              dropdownValues={["system", "en", "ru"]}
              setValue={setLanguage}
              storekey="language"
              title="Language"
              description="App language"
            />
          </div>
          <div ref={wallpapersChapterRef} className="flex flex-col">
            <h1>{t("Wallpapers")}</h1>
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
            <SettingsItem
              value={volume}
              setValue={setVolume}
              sliderValueValid={volumeValid}
              setSliderValueValid={setVolumeValid}
              storekey="volume"
              title="General volume"
              description="General volume for all wallpapers"
            />
            <SettingsItem
              value={wallpapersPath}
              setValue={setWallpapersPath}
              storekey="wallpapersPath"
              title="Path to wallpapers folder"
              description="Path to the folder where the wallpapers are stored"
            />
          </div>
          <div ref={systemChapterRef} className="flex flex-col">
            <h1>System</h1>
            <SettingsItem
              value={autolaunch}
              setValue={setAutolaunch}
              storekey="autolaunch"
              title="Autolaunch"
              description="Launch app with system to enable wallpapers"
            />
          </div>
          <div ref={appearanceChapterRef} className="flex flex-col">
            <h1>Appearance</h1>
            <SettingsItem
              value={colorTheme}
              dropdownValues={["system", "light", "dark", "custom"]}
              setValue={setColorTheme}
              storekey="colorTheme"
              title="Color theme"
              description="App color theme"
            />
          </div>
          <div ref={appWindowChapterRef} className="flex flex-col">
            <h1>App window</h1>
          </div>
          <div ref={hotkeysChapterRef} className="flex flex-col">
            <div className="flex flex-row items-center gap-1">
              <h1>Hotkeys</h1>
              <Tooltip text="Hotkeys work only when desktop is focused">
                <IoMdInformationCircleOutline size={22} />
              </Tooltip>
            </div>
          </div>
          <div ref={otherChapterRef} className="flex flex-col">
            <h1>Other</h1>
          </div>
          <div ref={aboutChapterRef} className="flex flex-col">
            <h1>About the program</h1>
            <SettingsFooter />
          </div>
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
