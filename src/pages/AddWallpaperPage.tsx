import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { BackButton, Copy, Filepicker, WallpaperPreview } from "@widgets";
import { AddWallpaperButton } from "@features";
import { Slider, Textarea } from "@ui";
import { TypePage } from "@public/types";

export const AddWallpaperPage = (props: TypePage) => {
  const location = useLocation();
  useEffect(() => {
    props.setTitle("Add wallpaper");
    props.setLocation(location.pathname);
  }, []);

  const { t } = useTranslation();
  const [wallpaperSrc, setWallpaperSrc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [volume, setVolume] = useState("100");
  const [volumeValid, setVolumeValid] = useState<boolean>(true);

  const [speed, setSpeed] = useState("1");
  const [speedValid, setSpeedValid] = useState<boolean>(true);

  // useEffect(
  //   () => console.log(speed, speedValid, volume, volumeValid),
  //   [speed, volume]
  // );

  const { state } = useLocation();

  useEffect(() => {
    if (state !== null) {
      console.log(state);
      setWallpaperSrc(state.drop);
    }
  }, [state]);

  useEffect(() => {
    const check = async () => {
      if (wallpaperSrc !== "") {
        let fileName: string = wallpaperSrc.split("\\").pop()!;
        setTitle(fileName.split(".")[0]!);
      }
    };
    check();
  }, [wallpaperSrc]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
        <div className="absolute m-2">
          <BackButton />
        </div>
        <div className="flex w-full h-[200%] flex-col items-center gap-4 m-2">
          <WallpaperPreview
            src={wallpaperSrc}
            volume={volumeValid ? volume : "0"}
            speed={speedValid ? speed : "1"}
          />
          {wallpaperSrc !== "" && (
            <div className="w-[50%] overflow-hidden break-all flex flex-row gap-1 items-center justify-center select-text">
              {wallpaperSrc}
              <Copy copyText={wallpaperSrc} />
            </div>
          )}
          <Filepicker setVideoSrc={setWallpaperSrc} />
          <Textarea
            className="w-[50%] bg-light overflow-hidden resize-none"
            placeholder={t("Title")}
            maxLength={58}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="w-[50%] flex flex-row">
            <div>
              <div className="mt-1.5">{t("Volume")}</div>
              <div className="mt-3">{t("Speed")}</div>
            </div>
            <div className="w-full ml-2">
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
};
