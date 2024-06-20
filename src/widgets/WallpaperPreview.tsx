import { convertFileSrc } from "@tauri-apps/api/core";
import { getCurrent } from "@tauri-apps/api/window";
import { useEffect, useRef } from "react";

export default function WallpaperPreview(props: {
  src: string;
  volume: string;
  speed: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  ref.current?.addEventListener("fullscreenchange", () => {
    getCurrent().setFullscreen(
      document.fullscreenElement !== null ? true : false
    );
  });
  useEffect(() => {
    if (props.src !== "") {
      ref.current!.volume = parseFloat(props.volume) / 100;
      ref.current!.playbackRate = parseFloat(props.speed);
    }
  }, [props.src, props.volume, props.speed]);
  return (
    <>
      {props.src !== "" && (
        <video
          ref={ref}
          autoPlay
          loop
          controls
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback noplaybackrate foobar"
          src={convertFileSrc(props.src)}
          className="w-[50%] rounded-md overflow-hidden no-volume-controls"
        />
      )}
    </>
  );
}
