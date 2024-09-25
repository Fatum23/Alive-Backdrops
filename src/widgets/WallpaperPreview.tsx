import { useEffect, useRef } from "react";

export const WallpaperPreview = (props: {
  src: string;
  volume: string;
  speed: string;
}) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (!ref.current || props.src === "") return;
    ref.current.volume = parseFloat(
      (parseFloat(props.volume) / 100).toFixed(8)
    );
    ref.current.playbackRate = parseFloat(props.speed);
  }, [props.src, props.volume, props.speed]);

  return (
    <>
      {props.src !== "" && (
        <video
          ref={ref}
          src={`file:///${props.src}`}
          autoPlay
          loop
          controls
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback noplaybackrate foobar"
          className="w-[50%] rounded-md overflow-hidden no-volume-controls"
        />
      )}
    </>
  );
};
