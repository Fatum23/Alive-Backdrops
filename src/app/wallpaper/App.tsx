import { useEffect, useRef, useState } from "react";
import "@shared/styles/App.scss";

export const App = () => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [src, _setSrc] = useState<string>("");
  const [volume, _setVolume] = useState<number>(0);
  const [speed, _setSpeed] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    // listen("setSrc", (ev: { payload: string }) => {
    //   setSrc(ev.payload);
    // });
    // listen("setVolume", (ev: { payload: string }) => {
    //   setVolume(parseFloat(ev.payload) / 100);
    // });
    // listen("setSpeed", (ev: { payload: string }) => {
    //   setSpeed(parseFloat(ev.payload));
    // });
    // listen("play", () => ref.current!.play());
    // listen("pause", () => ref.current!.pause());
    // listen("mute", () => (ref.current!.muted = true));
    // listen("unmute", () => (ref.current!.muted = false));
  }, []);
  useEffect(() => {
    if (loaded) {
      ref.current!.volume = volume;
      ref.current!.playbackRate = speed;
      // invoke("start_wallpaper_service");
    }
  }, [loaded, volume, speed]);
  return (
    <div className="h-screen w-screen bg-white">
      {src !== "" && (
        <video
          ref={ref}
          className="h-full w-full"
          src={"fs:///" + src}
          loop
          preload="metadata"
          onLoadedMetadata={() => setLoaded(true)}
        />
      )}
    </div>
  );
};
