import { addWallpaper } from "@shared/services/db";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TypeWallpaper } from "@shared/types";

export default function AddWallpaperButton(props: TypeWallpaper) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [valid, setValid] = useState(
    props.title.replace(/\s/g, "") !== "" && props.src !== ""
  );

  useEffect(() => {
    setValid(props.title.replace(/\s/g, "") !== "" && props.src !== "");
  }, [props.title, props.src]);

  return (
    <div
      className={`mb-1 py-2 px-5 rounded-sm transition-colors duration-300 ${
        valid ? "hover:bg-dark-yellow bg-yellow cursor-pointer" : "bg-dark"
      }`}
      onClick={() => {
        if (valid) {
          addWallpaper({
            title: props.title,
            src: props.src,
            volume: props.volume,
            speed: props.speed,
          });
          navigate(-1);
        }
      }}
    >
      {t("Add wallpaper")}
    </div>
  );
}