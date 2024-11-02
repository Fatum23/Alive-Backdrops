import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { isValidExtension } from "@shared/utils";
import { VIDEO_WALLPAPER_EXTENSIONS } from "@public/constants";

export const DropHandler = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(
    async (e: DragEvent) => {
      setVisible(false);
      e.preventDefault();
      e.stopPropagation();
      const dt = e.dataTransfer;
      const data =
        dt?.types.includes("Files") && dt.types.length === 1
          ? dt.files![0]?.path!
          : dt?.getData("text/plain")!;
      if (isValidExtension(data)) {
        if (location.pathname !== "/AddWallpaper") {
          navigate("/AddWallpaper", {
            state: {
              drop: data,
            },
          });
        }
      } else {
        window.ipcRenderer.dialog.message(
          t("Invalid wallpaper file extension"),
          `Video: ${VIDEO_WALLPAPER_EXTENSIONS}`
        );
      }
    },
    [location]
  );

  const onDragEnter = useCallback(() => setVisible(true), []);

  const onDragLeave = useCallback((e: DragEvent) => {
    if (e.x === 0 && e.y === 0) setVisible(false);
  }, []);

  useEffect(() => {
    const router = document.getElementById("router");
    if (!router) return;

    router.addEventListener("dragover", onDragOver);
    router.addEventListener("drop", onDrop);
    router.addEventListener("dragenter", onDragEnter);
    router.addEventListener("dragleave", onDragLeave);

    return () => {
      router.removeEventListener("dragover", onDragOver);
      router.removeEventListener("drop", onDrop);
      router.removeEventListener("dragenter", onDragEnter);
      router.removeEventListener("dragleave", onDragLeave);
    };
  }, []);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
      }}
      className="absolute z-50 flex flex-col items-center justify-center w-screen h-screen transition-all bg-transparent pointer-events-none backdrop-blur-sm"
    >
      <IoAddOutline size={48} />
      <div className="text-2xl">
        {t("components.drop-handler.add-wallpaper")}
      </div>
    </div>
  );
};
