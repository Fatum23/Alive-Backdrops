import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// import { SUPPORTED_WALLPAPER_EXTENSIONS } from "@shared/constants";

export const Filepicker = (props: {
  setVideoSrc: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const dropzoneRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dropzoneRef.current!.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    dropzoneRef.current!.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dt = e.dataTransfer;
      if (dt) {
      }
    });
    dropzoneRef.current!.addEventListener("dragenter", (event) => {
      console.log("File is in the Drop Space");
    });
    dropzoneRef.current!.addEventListener("dragleave", (event) => {
      console.log("File has left the Drop Space");
    });
  }, []);

  return (
    <button
      ref={dropzoneRef}
      className="w-[50%] bg-bg-light h-24 flex items-center justify-center text-lg rounded-sm border-dashed border-yellow border-0 hover:bg-opacity-70 transition-colors duration-300"
      onClick={async () => {
        const path = await window.ipcRenderer.invoke("dialog:pick-wallpaper");
        if (path !== null) {
          props.setVideoSrc(path);
        }
      }}
    >
      {t("Drop or select video")}
    </button>
  );
};
