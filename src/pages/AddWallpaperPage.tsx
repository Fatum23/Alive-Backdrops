import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useLocation } from "react-router-dom";
import { BackButton, Copy, Filepicker, Info, OpenInExplorer } from "@widgets";
import { AddWallpaperButton } from "@features";
import {
  Slider,
  Textarea,
  Video,
  RadioButton,
  Tooltip,
  Checkbox,
  Modal,
} from "@ui";
import { TypeFileProperties, TypeWallpaperType } from "@public/types";
import { IoReload } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  APP_NAME,
  AUDIO_WALLPAPER_EXTENSIONS,
  IMAGE_WALLPAPER_EXTENSIONS,
  VIDEO_WALLPAPER_EXTENSIONS,
} from "@public/constants";
import { useSettingsStore } from "@shared/store";

export const AddWallpaperPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${APP_NAME} - ${t("routes.add-wallpaper")}`;
  }, [i18next.language]);
  const location = useLocation();

  const store = useSettingsStore();

  const [wallpaperSrc, setWallpaperSrc] = useState<string>("");
  const [buffering, setBuffering] = useState<boolean>(false);
  const [wallpaperFileExtension, setWallpaperFileExtension] = useState<
    string | undefined
  >();

  const [wallpaperType, setWallpaperType] =
    useState<TypeWallpaperType>("wallpaper");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [volume, setVolume] = useState<string>("100");
  const [volumeValid, setVolumeValid] = useState<boolean>(true);

  const [speed, setSpeed] = useState<string>("1");
  const [speedValid, setSpeedValid] = useState<boolean>(true);

  const [brightness, setBrightness] = useState<string>("100");
  const [brightnessValid, setBrightnessValid] = useState<boolean>(true);

  const [contrast, setContrast] = useState<string>("100");
  const [contrastValid, setContrastValid] = useState<boolean>(true);

  const [saturation, setSaturation] = useState<string>("100");
  const [saturationValid, setSaturationValid] = useState<boolean>(true);

  const [hue, setHue] = useState<string>("0");
  const [hueValid, setHueValid] = useState<boolean>(true);

  const [opacity, setOpacity] = useState<string>("100");
  const [opacityValid, setOpacityValid] = useState<boolean>(true);

  const [inverted, setInverted] = useState<boolean>(false);

  const locationState = location.state as null | { drop: string };

  useEffect(() => {
    if (locationState !== null) {
      setWallpaperSrc(locationState.drop.replace("file:///", ""));
    }
  }, [location.state]);

  useEffect(() => {
    setWallpaperFileExtension(wallpaperSrc.split(".").pop());

    setFileProperties(undefined);
    if (!wallpaperSrc) return;

    const getFileInfo = async () => {
      setFileProperties(
        await window.ipcRenderer.fs.getFileProperties(wallpaperSrc)
      );
    };
    getFileInfo();
  }, [wallpaperSrc]);

  useEffect(() => {
    if (!wallpaperFileExtension) return;
    if (
      VIDEO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension) &&
      wallpaperType === "audio"
    ) {
      setWallpaperType("wallpaper");
    }

    if (
      AUDIO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension) &&
      wallpaperType !== "audio"
    )
      setWallpaperType("audio");
  }, [wallpaperFileExtension]);

  const [filePropertiesModalOpened, setFilePropertiesModalOpened] =
    useState<boolean>(false);
  const [fileProperties, setFileProperties] = useState<TypeFileProperties>();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="absolute m-2">
        <BackButton />
      </div>
      <div className="flex flex-col items-center w-full h-full mb-6 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col items-center w-4/5 gap-4 m-2">
          {wallpaperFileExtension &&
            VIDEO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension) && (
              <Video
                autoPlay
                loop
                controls
                src={`file:///${wallpaperSrc}`}
                setBuffering={setBuffering}
                volume={
                  volumeValid
                    ? (
                        parseFloat(volume) *
                        (parseFloat(store.volume) / 100)
                      ).toFixed()
                    : "0"
                }
                speed={speedValid ? speed : "1"}
                brightness={brightnessValid ? brightness : "100"}
                contrast={contrastValid ? contrast : "100"}
                saturation={saturationValid ? saturation : "100"}
                hue={hueValid ? hue : "0"}
                inverted={inverted}
              />
            )}
          {wallpaperFileExtension &&
            IMAGE_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension) && (
              <img src={`file:///${wallpaperSrc}`} className="bg-white" />
            )}
          {wallpaperFileExtension &&
            wallpaperType === "audio" &&
            AUDIO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension) && (
              <audio
                onTimeUpdate={(e) =>
                  (e.currentTarget.volume = parseFloat(volume) / 100)
                }
                src={`file:///${wallpaperSrc}`}
                autoPlay
                loop
              />
            )}
          {fileProperties?.audioCoverBase64 && (
            <img src={fileProperties.audioCoverBase64}></img>
          )}
          {buffering && <div>Buffering detected</div>}
          {wallpaperSrc && (
            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-row items-center w-full gap-2">
                <div
                  className="overflow-hidden break-all select-text line-clamp-1 text-clip"
                  dir="ltr"
                >
                  {wallpaperSrc}
                </div>
                <Copy data={wallpaperSrc} />
                <OpenInExplorer path={wallpaperSrc} />
                <Tooltip text={t("add-wallpaper.file-properties.title")}>
                  <div>
                    <Info
                      className="cursor-pointer"
                      onClick={() => setFilePropertiesModalOpened(true)}
                    />
                  </div>
                </Tooltip>
              </div>
              <Modal
                title={t("add-wallpaper.file-properties.title")}
                opened={filePropertiesModalOpened}
                setOpened={setFilePropertiesModalOpened}
                closable
                cancelEnabled
                closeButton
                onClose={() => setFilePropertiesModalOpened(false)}
              >
                <>
                  {fileProperties && (
                    <div className="flex flex-row gap-2">
                      <div className="flex flex-col h-full gap-1">
                        <div>{t("add-wallpaper.file-properties.name")}</div>
                        {fileProperties.author && (
                          <div>{t("add-wallpaper.file-properties.author")}</div>
                        )}
                        {fileProperties.description && (
                          <div>
                            {t("add-wallpaper.file-properties.description")}
                          </div>
                        )}
                        {fileProperties.comment && (
                          <div>
                            {t("add-wallpaper.file-properties.comment")}
                          </div>
                        )}
                        <div>
                          {t("add-wallpaper.file-properties.extension")}
                        </div>
                        <div>{t("add-wallpaper.file-properties.location")}</div>
                        <div>
                          {t("add-wallpaper.file-properties.full-path")}
                        </div>
                      </div>
                      <div className="w-0.5 bg-dark rounded-md"></div>
                      <div className="flex flex-col gap-1 [&>*]:select-text">
                        <div>{fileProperties.name}</div>
                        {fileProperties.author && (
                          <div>{fileProperties.author}</div>
                        )}
                        {fileProperties.description && (
                          <div>{fileProperties.description}</div>
                        )}
                        {fileProperties.comment && (
                          <div
                            className="underline transition-all duration-100 cursor-pointer text-link underline-offset-2 decoration-transparent hover:decoration-link"
                            onClick={() =>
                              window.ipcRenderer.shell.openUrl(
                                fileProperties.comment!
                              )
                            }
                          >
                            {fileProperties.comment}
                          </div>
                        )}
                        <div>{fileProperties.extension}</div>
                        <div>{fileProperties.location}</div>
                        <div>{fileProperties.fullPath}</div>
                      </div>
                      <div className="w-0.5 bg-dark rounded-md"></div>
                      <div className="flex flex-col gap-2.5 items-start">
                        <Copy data={fileProperties.name} />
                        {fileProperties.author && (
                          <Copy data={fileProperties.author} />
                        )}
                        {fileProperties.description && (
                          <Copy data={fileProperties.description} />
                        )}
                        {fileProperties.comment && (
                          <Copy data={fileProperties.comment} />
                        )}
                        <Copy data={fileProperties.extension} />
                        <div className="flex flex-row gap-1">
                          <Copy data={fileProperties.location} />
                          <OpenInExplorer path={fileProperties.location} />
                        </div>
                        <div className="flex flex-row gap-1">
                          <Copy data={fileProperties.fullPath} />
                          <OpenInExplorer path={fileProperties.fullPath} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </Modal>
            </div>
          )}
          <Filepicker setWallpaperSrc={setWallpaperSrc} />
          <Textarea
            className="w-full"
            placeholder={t("add-wallpaper.title")}
            value={title}
            setValue={setTitle}
          />
          <Textarea
            className="w-full"
            placeholder={t("add-wallpaper.description")}
            value={description}
            setValue={setDescription}
          />
          <div className="flex flex-row gap-4">
            <div className="flex flex-row items-center gap-1">
              <Tooltip
                text="Invalid file extension for wallpaper"
                visibleCondition={
                  !(
                    !wallpaperFileExtension ||
                    VIDEO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension)
                  )
                }
                info
              >
                <div>
                  <div
                    style={{
                      opacity:
                        !wallpaperFileExtension ||
                        VIDEO_WALLPAPER_EXTENSIONS.includes(
                          wallpaperFileExtension
                        )
                          ? 1
                          : 0.5,
                    }}
                    {...{
                      inert:
                        !wallpaperFileExtension ||
                        VIDEO_WALLPAPER_EXTENSIONS.includes(
                          wallpaperFileExtension
                        )
                          ? undefined
                          : "",
                    }}
                    className="flex flex-row items-center gap-1"
                  >
                    <RadioButton
                      checked={wallpaperType === "wallpaper"}
                      setChecked={() => setWallpaperType("wallpaper")}
                    />
                    <div
                      onClick={() => setWallpaperType("wallpaper")}
                      className="cursor-pointer"
                    >
                      {t("add-wallpaper.wallpaper")}
                    </div>
                  </div>
                </div>
              </Tooltip>
              <Tooltip text={t("add-wallpaper.wallpaper-info")} info>
                <div>
                  <Info />
                </div>
              </Tooltip>
            </div>
            <div
              style={{
                opacity:
                  !wallpaperFileExtension ||
                  VIDEO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension)
                    ? 1
                    : 0.5,
              }}
              {...{
                inert:
                  !wallpaperFileExtension ||
                  VIDEO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension)
                    ? undefined
                    : "",
              }}
              className="flex flex-row items-center gap-1"
            >
              <RadioButton
                checked={wallpaperType === "widget"}
                setChecked={() => setWallpaperType("widget")}
              />
              <div
                onClick={() => setWallpaperType("widget")}
                className="cursor-pointer"
              >
                {t("add-wallpaper.widget")}
              </div>
              <Tooltip text={t("add-wallpaper.widget-info")} info>
                <div>
                  <Info />
                </div>
              </Tooltip>
            </div>
            <div
              style={{
                opacity:
                  !wallpaperFileExtension ||
                  AUDIO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension)
                    ? 1
                    : 0.5,
              }}
              {...{
                inert:
                  !wallpaperFileExtension ||
                  AUDIO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension)
                    ? undefined
                    : "",
              }}
              className="flex flex-row items-center gap-1"
            >
              <RadioButton
                checked={wallpaperType === "audio"}
                setChecked={() => setWallpaperType("audio")}
              />
              <div
                onClick={() => setWallpaperType("audio")}
                className="cursor-pointer"
              >
                {t("add-wallpaper.audio")}
              </div>
              <Tooltip text={t("add-wallpaper.audio-info")} info>
                <div>
                  <Info />
                </div>
              </Tooltip>
            </div>
            <div
              style={{
                opacity:
                  !wallpaperFileExtension ||
                  AUDIO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension)
                    ? 1
                    : 0.5,
              }}
              {...{
                inert:
                  !wallpaperFileExtension ||
                  AUDIO_WALLPAPER_EXTENSIONS.includes(wallpaperFileExtension)
                    ? undefined
                    : "",
              }}
              className="flex flex-row items-center gap-1"
            >
              <RadioButton
                checked={wallpaperType === "audio"}
                setChecked={() => setWallpaperType("audio")}
              />
              <div
                onClick={() => setWallpaperType("audio")}
                className="cursor-pointer"
              >
                {"programmed"}
              </div>
              <Tooltip text={t("add-wallpaper.audio-info")} info>
                <div>
                  <Info />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col w-4/5 gap-3">
            <div className="w-full">
              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col gap-3">
                  <div className="mt-1.5">{t("add-wallpaper.volume")}</div>
                  <div>{t("add-wallpaper.speed")}</div>
                  <div>{t("add-wallpaper.brightness")}</div>
                  <div>{t("add-wallpaper.contrast")}</div>
                  <div>{t("add-wallpaper.saturation")}</div>
                  <div>{t("add-wallpaper.hue")}</div>
                  {wallpaperType === "widget" && <div>Opacity</div>}
                </div>
                <div className="w-full">
                  <Slider
                    value={volume}
                    setValue={setVolume}
                    valid={volumeValid}
                    setValid={setVolumeValid}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <Slider
                    value={speed}
                    setValue={setSpeed}
                    valid={speedValid}
                    setValid={setSpeedValid}
                    min={0.25}
                    max={5}
                    step={0.25}
                  />
                  <Slider
                    value={brightness}
                    setValue={setBrightness}
                    valid={brightnessValid}
                    setValid={setBrightnessValid}
                    min={0}
                    max={200}
                    step={1}
                  />
                  <Slider
                    value={contrast}
                    setValue={setContrast}
                    valid={contrastValid}
                    setValid={setContrastValid}
                    min={0}
                    max={200}
                    step={1}
                  />
                  <Slider
                    value={saturation}
                    setValue={setSaturation}
                    valid={saturationValid}
                    setValid={setSaturationValid}
                    min={0}
                    max={200}
                    step={1}
                  />
                  <Slider
                    value={hue}
                    setValue={setHue}
                    valid={hueValid}
                    setValid={setHueValid}
                    min={0}
                    max={100}
                    step={1}
                  />
                  {wallpaperType === "widget" && (
                    <Slider
                      value={opacity}
                      setValue={setOpacity}
                      valid={opacityValid}
                      setValid={setOpacityValid}
                      min={0}
                      max={100}
                      step={1}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Tooltip text={t("settings.navbar.reset")}>
                    <div className="mt-1.5">
                      <IoReload
                        className="rotate-180 [transform:rotateY(180deg)] cursor-pointer"
                        onClick={() => setVolume("100")}
                        size={24}
                      />
                    </div>
                  </Tooltip>
                  <IoReload
                    className="rotate-180 [transform:rotateY(180deg)] cursor-pointer"
                    onClick={() => setSpeed("1")}
                    size={24}
                  />
                  <IoReload
                    className="rotate-180 [transform:rotateY(180deg)] cursor-pointer"
                    onClick={() => setBrightness("100")}
                    size={24}
                  />
                  <IoReload
                    className="rotate-180 [transform:rotateY(180deg)] cursor-pointer"
                    onClick={() => setContrast("100")}
                    size={24}
                  />
                  <IoReload
                    className="rotate-180 [transform:rotateY(180deg)] cursor-pointer"
                    onClick={() => setSaturation("100")}
                    size={24}
                  />
                  <IoReload
                    className="rotate-180 [transform:rotateY(180deg)] cursor-pointer"
                    onClick={() => setHue("0")}
                    size={24}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full gap-4">
                {t("add-wallpaper.mirrored")}
                <Checkbox
                  checked={inverted}
                  setChecked={setInverted}
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* <AddWallpaperButton
            src={wallpaperSrc}
            title={title}
            // volume={volume}
            // speed={speed}
          /> */}
        </div>
      </div>
    </div>
  );
};
