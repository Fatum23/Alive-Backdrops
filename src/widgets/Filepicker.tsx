import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { FaFile } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { PiFilePlus, PiFilePlusLight } from "react-icons/pi";

export const Filepicker = (props: {
  setWallpaperSrc: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const dropzoneRef = useRef<HTMLButtonElement>(null);

  const drop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer!;
    props.setWallpaperSrc(
      dt?.types.includes("Files") && dt.types.length === 1
        ? dt.files![0]?.path!
        : dt?.getData("text/plain")
    );
  }, []);

  useEffect(() => {
    document.getElementById("router")!.addEventListener("drop", drop);
    return () => {
      document.getElementById("router")!.removeEventListener("drop", drop);
    };
  }, []);

  return (
    <div className="flex flex-row w-full">
      <button
        ref={dropzoneRef}
        className="flex items-center justify-center w-full gap-2 p-4 text-lg rounded-r-none"
        onClick={async () => {
          const path = await window.ipcRenderer.dialog.pickWallpaper();
          if (path) props.setWallpaperSrc(path);
        }}
      >
        <PiFilePlusLight size={32} />
        <div>{t("add-wallpaper.drop-or-select-file")}</div>
      </button>
      <button
        onClick={() => undefined}
        className="flex items-center justify-center px-1 rounded-l-none"
      >
        <IoIosArrowDown size={24} />
      </button>
    </div>
  );
};
