import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { isValidExtension } from "@shared/utils";

export const DropHandler = (props: { location: string }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const locationRef = useRef(props.location);

  useEffect(() => {
    locationRef.current = props.location;
  }, [props.location]);

  useEffect(() => {
    document.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    document.addEventListener("drop", async (e) => {
      setVisible(false);
      e.preventDefault();
      e.stopPropagation();
      const dt = e.dataTransfer;
      const data =
        dt?.types.includes("Files") && dt.types.length === 1
          ? dt.files![0]?.path!
          : dt?.getData("text/plain")!;
      if (isValidExtension(data)) {
        if (locationRef.current !== "/AddWallpaper") {
          navigate("/AddWallpaper", {
            state: {
              drop: data,
            },
          });
        }
      } else {
        await window.ipcRenderer.dialog.error(
          t("Invalid wallpaper file extension")
        );
      }
    });
    document.addEventListener("dragenter", () => setVisible(true));
    document.addEventListener("dragleave", (e) => {
      if (e.x === 0 && e.y === 0) {
        setVisible(false);
      }
    });
  }, []);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
      }}
      className="pointer-events-none absolute h-screen w-screen bg-transparent transition-all duration-300 z-50 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <IoAddOutline size={48} />
      <div className="text-2xl">{t("Add wallpaper")}</div>
    </div>
  );
};
