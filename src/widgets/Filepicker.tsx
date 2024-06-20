import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { event } from "@tauri-apps/api";
import { message, open } from "@tauri-apps/plugin-dialog";
import { useTranslation } from "react-i18next";
import { SUPPORTED_WALLPAPER_EXTENSIONS } from "@shared/constants";
import { PhysicalPosition, currentMonitor } from "@tauri-apps/api/window";

export default function Filepicker(props: {
  setVideoSrc: Dispatch<SetStateAction<string>>;
}) {
  const { t } = useTranslation();
  const [scale, setScale] = useState<number>(1.25);

  useEffect(() => {
    currentMonitor().then((mon) => setScale(mon!.scaleFactor));
  }, []);
  const dropzoneRef = useRef<HTMLButtonElement>(null);
  event.listen("tauri://drop-over", async (e: any) => {
    const pos = e.payload.position;
    const position = new PhysicalPosition(pos.x, pos.y).toLogical(scale);
    const hoveredElement = document.elementFromPoint(position.x, position.y);

    if (dropzoneRef.current) {
      if (dropzoneRef.current.contains(hoveredElement)) {
        dropzoneRef.current.style.borderWidth = "3px";
      } else {
        dropzoneRef.current.style.borderWidth = "0";
      }
    }
  });
  event.listen("tauri://drop", async (e: any) => {
    const payload: string = e.payload.paths[0];
    if (
      dropzoneRef.current &&
      dropzoneRef.current.style.borderWidth !== "0px"
    ) {
      dropzoneRef.current.style.borderWidth = "0";
      const allowedExtensions = /(\.mp4|\.mov|\.avi)$/i;
      if (allowedExtensions.exec(payload)) {
        props.setVideoSrc(payload);
      } else {
        await message(t("Invalid video format"));
      }
    }
  });

  useEffect(() => {
    dropzoneRef.current!.addEventListener("dragover", (event) => {
      event.preventDefault();

      event.dataTransfer!.dropEffect = "copy";
    });

    dropzoneRef.current!.addEventListener("drop", (event) => {
      event.preventDefault();

      const text = event.dataTransfer!.getData("text");

      console.log(text);

      dropzoneRef.current!.textContent = text;
    });
  }, []);

  return (
    <button
      ref={dropzoneRef}
      className="w-[50%] bg-bg-light h-24 flex items-center justify-center text-lg rounded-sm border-dashed border-yellow border-0 hover:bg-opacity-70 transition-colors duration-300"
      onClick={async () => {
        const selected = await open({
          multiple: false,
          filters: [
            {
              name: "Video",
              extensions: SUPPORTED_WALLPAPER_EXTENSIONS,
            },
          ],
        });
        if (selected) {
          props.setVideoSrc(selected.path);
        }
      }}
    >
      {t("Drop or select video")}
    </button>
  );
}
