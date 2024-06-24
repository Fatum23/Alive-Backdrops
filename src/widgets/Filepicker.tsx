import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";

export const Filepicker = (props: {
  setVideoSrc: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const dropzoneRef = useRef<HTMLButtonElement>(null);

  const drop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer!;
    props.setVideoSrc(
      dt?.types.includes("Files") && dt.types.length === 1
        ? dt.files![0]?.path!
        : dt?.getData("text/plain")
    );
  }, []);

  useEffect(() => {
    document.addEventListener("drop", drop);
    return () => {
      document.removeEventListener("drop", drop);
    };
  }, []);

  return (
    <button
      ref={dropzoneRef}
      className="w-[50%] h-24 flex items-center justify-center text-lg"
      onClick={async () => {
        const path = await window.ipcRenderer.invoke("dialog:pick-wallpaper");
        if (path !== null) {
          props.setVideoSrc(path);
        }
      }}
    >
      {t("Drop or select file")}
    </button>
  );
};
