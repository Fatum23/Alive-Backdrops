import { useEffect, useRef } from "react";

export const WallpaperPreview = (props: {
  src: string;
  volume: string;
  speed: string;
}) => {
  const ref = useRef<HTMLVideoElement | null>(null);
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
          src={"fs:///" + props.src}
          className="w-[50%] rounded-md overflow-hidden no-volume-controls"
        />
      )}
    </>
  );
};
