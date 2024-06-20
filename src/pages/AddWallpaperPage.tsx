import { useEffect, useState } from "react";
import { SUPPORTED_WALLPAPER_EXTENSIONS } from "@shared/constants";
import {
  BackButton,
  Filepicker,
  Slider,
  Textarea,
  Titlebar,
  WallpaperPreview,
} from "@widgets";
import { AddWallpaperButton } from "@features";
import { useTranslation } from "react-i18next";

export default function AddWallpaperPage() {
  const { t } = useTranslation();
  const [wallpaperSrc, setWallpaperSrc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [volume, setVolume] = useState("100");
  const [speed, setSpeed] = useState("1");

  useEffect(() => {
    if (wallpaperSrc !== "") {
      let fileName: string = wallpaperSrc.split("\\").pop()!;
      SUPPORTED_WALLPAPER_EXTENSIONS.forEach(
        (extension) => (fileName = fileName?.replace(`.${extension}`, ""))
      );
      setTitle(fileName);
    }
  }, [wallpaperSrc]);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <Titlebar title="Add wallpaper" />
      <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
        <div className="absolute">
          <BackButton />
        </div>
        <div className="flex w-full h-[200%] flex-col items-center gap-4 m-2">
          <WallpaperPreview src={wallpaperSrc} volume={volume} speed={speed} />
          {wallpaperSrc !== "" && (
            <div className="w-[50%] overflow-hidden break-all flex justify-center select-text">
              {wallpaperSrc}
            </div>
          )}
          <Filepicker setVideoSrc={setWallpaperSrc} />
          <Textarea value={title} setValue={setTitle} />
          <div className="w-[50%] flex flex-row">
            <div>
              <div className="mt-1.5">{t("Volume")}</div>
              <div className="mt-3">{t("Speed")}</div>
            </div>
            <div className="w-full ml-2">
              <Slider
                value={volume}
                setValue={setVolume}
                min="0"
                max="100"
                step="1"
              />
              <Slider
                value={speed}
                setValue={setSpeed}
                min="0.25"
                max="5"
                step="0.05"
              />
            </div>
          </div>
          <AddWallpaperButton
            src={wallpaperSrc}
            title={title}
            volume={volume}
            speed={speed}
          />
        </div>
      </div>
    </div>
  );
}
