import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Tooltip } from "@ui";

import { TypeVideoWallpaper, TypeWallpaper } from "@public/types";

import { CgMaximize, CgMinimize } from "react-icons/cg";
import { HiMiniPause } from "react-icons/hi2";
import { IoPlay } from "react-icons/io5";
import { BsFillSkipForwardFill, BsSkipBackwardFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

const normalizeTime = (seconds: number): string => {
  const hours = 0;
  const minutes = Math.round(Math.round(seconds) / 60).toString();
  const seconds_normalized = (Math.round(seconds) % 60).toString();
  return `${minutes}:${
    seconds_normalized.length === 1 ? "0" : ""
  }${seconds_normalized}`;
};

export const Video = (
  props: JSX.IntrinsicElements["video"] &
    Partial<TypeWallpaper> &
    Partial<TypeVideoWallpaper> & {
      setBuffering?: Dispatch<SetStateAction<boolean>>;
    }
) => {
  const { setBuffering, inverted, ...videoProps } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [bufferingTimeout, setBufferingTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  useEffect(() => {
    if (!videoRef.current || !props.volume) return;
    videoRef.current.volume = parseFloat(props.volume) / 100;
  }, [props.volume]);

  useEffect(() => {
    if (!videoRef.current || !props.speed) return;
    videoRef.current.playbackRate = parseFloat(props.speed);
  }, [props.src, props.speed]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.style.filter =
      (props.brightness ? `brightness(${props.brightness}%)` : "") +
      (props.contrast ? ` contrast(${props.contrast}%)` : "") +
      (props.saturation ? ` saturate(${props.saturation}%)` : "") +
      (props.hue ? ` hue-rotate(${parseFloat(props.hue) / 100}turn)` : "");

    videoRef.current.style.transform = props.inverted ? "scaleX(-1)" : "";
  }, [
    props.brightness,
    props.contrast,
    props.saturation,
    props.hue,
    props.inverted,
  ]);

  const [controlsVisible, setControlsVisible] = useState<boolean>(false);
  const [controlsNotVisibleTimeout, setControlsNotVisibleTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  const [time, setTime] = useState<number>(0);
  useEffect(() => {
    if (!videoRef.current || true) return;
    videoRef.current.currentTime = time;
  }, [time]);

  const [paused, setPaused] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setPaused(false);
    setLoading(true);
  }, [props.src]);

  const [doubleClickTimeout, setDoubleClickTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  useEffect(() => {
    if (!videoRef.current) return;
    paused ? videoRef.current.pause() : videoRef.current.play();
  }, [paused]);

  useEffect(() => {
    if (!containerRef.current) return;
    const tryRequestFullscreen = () => {
      if (!containerRef.current) return;
      try {
        containerRef.current.requestFullscreen();
      } catch (e) {}
    };
    !document.fullscreenElement
      ? tryRequestFullscreen()
      : document.exitFullscreen();
  }, [fullscreen]);

  const documentFullscreenChange = useCallback(() => {
    if (fullscreen && !document.fullscreenElement) setFullscreen(false);
  }, [fullscreen]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", documentFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        documentFullscreenChange
      );
    };
  }, [fullscreen]);

  const [pauseKeyPressed, setPauseKeyPressed] = useState<boolean>(false);
  const [pauseKeyPressedTimeout, setPauseKeyPressedTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  const [skipLeft, setSkipLeft] = useState<number | null>();
  const [skipLeftTimeout, setSkipLeftTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  const [skipRight, setSkipRight] = useState<number | null>(null);
  const [skipRightTimeout, setSkipRightTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  return (
    <>
      {!["", "file:///"].includes(props.src!) && (
        <div className="relative w-full overflow-hidden rounded-md aspect-video">
          <div
            ref={containerRef}
            tabIndex={0}
            className="relative w-full focus:outline-none"
            onMouseEnter={() => {
              setControlsVisible(true);
            }}
            onMouseLeave={() => {
              setControlsVisible(false);
            }}
            onMouseDown={() => setControlsVisible(true)}
            onMouseMove={() => {
              clearTimeout(controlsNotVisibleTimeout);
              setControlsNotVisibleTimeout(undefined);

              setControlsVisible(true);
              setControlsNotVisibleTimeout(
                setTimeout(() => fullscreen && setControlsVisible(false), 2000)
              );
            }}
            onKeyDown={(e) => {
              if (!props.controls || !containerRef.current || !videoRef.current)
                return;

              clearTimeout(controlsNotVisibleTimeout);
              setControlsNotVisibleTimeout(undefined);

              setControlsVisible(true);

              if (["KeyW", "KeyD", "KeyL"].includes(e.code)) {
                setTime((value) =>
                  value + 10 <
                  Math.trunc(videoRef.current ? videoRef.current.duration : 0)
                    ? value + 10
                    : 0
                );
              } else if (["ArrowRight", "ArrowUp"].includes(e.code)) {
                setTime((value) =>
                  value + 5 <
                  Math.trunc(videoRef.current ? videoRef.current.duration : 0)
                    ? value + 5
                    : 0
                );
              } else if (["KeyA", "KeyS", "KeyJ"].includes(e.code)) {
                setTime((value) => (value - 10 >= 0 ? value - 10 : 0));
              } else if (["ArrowLeft", "ArrowDown"].includes(e.code)) {
                setTime((value) => (value - 5 >= 0 ? value - 5 : 0));

                setSkipLeft((value) => (value ? value : 0) + 5);

                clearTimeout(skipLeftTimeout);
                setSkipLeftTimeout(undefined);

                setSkipLeftTimeout(setTimeout(() => setSkipLeft(null), 1300));
              } else if (["Space", "KeyK"].includes(e.code)) {
                setPaused((value) => !value);
                clearTimeout(pauseKeyPressedTimeout);
                setPauseKeyPressedTimeout(undefined);

                setPauseKeyPressed(true);
                setPauseKeyPressedTimeout(
                  setTimeout(() => setPauseKeyPressed(false), 300)
                );
              } else if (e.code === "KeyF") setFullscreen((value) => !value);
              else if (e.code.includes("Digit")) {
                setTime(
                  Math.trunc(
                    videoRef.current.duration *
                      ((parseFloat(e.code.slice("Digit".length)) * 11) / 100)
                  )
                );
              }

              e.preventDefault();
            }}
          >
            <video
              ref={videoRef}
              {...videoProps}
              controls={false}
              src={props.src}
              className={props.className + " rounded-md"}
              onWaiting={(e) => {
                if (!props.setBuffering) return;
                if (Math.trunc(e.currentTarget.currentTime) > 0) {
                  props.setBuffering(true);
                }
              }}
              onPlay={() => {
                clearTimeout(bufferingTimeout);
                setBufferingTimeout(undefined);
              }}
              onSeeked={() => {
                clearTimeout(bufferingTimeout);
                setBufferingTimeout(undefined);
              }}
              onTimeUpdate={(e) => {
                setTime(e.currentTarget.currentTime);
                setLoading(false);
              }}
              onRateChange={() =>
                props.setBuffering && props.setBuffering(false)
              }
              onClick={() => {
                if (doubleClickTimeout) {
                  setFullscreen((value) => !value);
                  clearTimeout(doubleClickTimeout);
                  setDoubleClickTimeout(undefined);
                } else {
                  setDoubleClickTimeout(
                    setTimeout(() => {
                      setPaused((value) => !value);
                      clearTimeout(doubleClickTimeout);
                      setDoubleClickTimeout(undefined);
                    }, 250)
                  );
                }
              }}
            />
            <div
              style={{
                opacity: props.controls && (controlsVisible || paused) ? 1 : 0,
              }}
              {...{
                inert:
                  props.controls && (controlsVisible || paused)
                    ? undefined
                    : "",
              }}
              className="absolute left-0 w-full transition-opacity bottom-0 pb-3 pt-1 [background-color:rgba(0,0,0,0.3)] rounded-b-md"
            >
              <div className="flex flex-row items-center w-full gap-2">
                <div className="ml-3 transition-opacity cursor-pointer hover:opacity-70">
                  {paused ? (
                    <IoPlay
                      className="fill-white"
                      size={24}
                      onClick={() => setPaused(false)}
                    />
                  ) : (
                    <HiMiniPause
                      className="fill-white"
                      size={24}
                      onClick={() => setPaused(true)}
                    />
                  )}
                </div>
                <div
                  className="flex-grow flex flex-row items-center h-1.5 rounded-sm [background-color:rgba(255,255,255,0.3)] cursor-pointer"
                  onClick={(e) => {
                    if (!videoRef.current) return;

                    setTime(
                      Math.round(
                        ((e.clientX -
                          e.currentTarget.getBoundingClientRect().left) /
                          e.currentTarget.getBoundingClientRect().width) *
                          videoRef.current.duration
                      )
                    );
                  }}
                >
                  <div
                    style={{
                      width: `${
                        (Math.round(time / parseFloat(props.speed!)) /
                          (videoRef.current
                            ? Math.round(
                                videoRef.current.duration /
                                  parseFloat(props.speed!)
                              )
                            : 1)) *
                        100
                      }%`,
                    }}
                    className="relative h-full bg-white rounded-l-sm"
                  >
                    <Tooltip text={normalizeTime(time)} showTimeout={0} info>
                      <div className="absolute right-0 -top-[3px] w-3 h-3 translate-x-1.5 bg-white rounded-full hover:bg-gray-300" />
                    </Tooltip>
                  </div>
                </div>
                <div className="text-white">{`${normalizeTime(
                  Math.round(time / parseFloat(props.speed!))
                )} / ${
                  videoRef.current
                    ? normalizeTime(
                        Math.round(
                          videoRef.current.duration / parseFloat(props.speed!)
                        )
                      )
                    : 0
                }`}</div>
                <div className="mr-3 transition-opacity cursor-pointer hover:opacity-70">
                  {fullscreen ? (
                    <CgMinimize
                      className="[&>*]:!fill-white"
                      size={24}
                      onClick={() => setFullscreen(false)}
                    />
                  ) : (
                    <CgMaximize
                      className="[&>*]:!fill-white"
                      onClick={() => setFullscreen(true)}
                      size={24}
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              className="absolute bottom-0 left-0 w-full h-full"
              {...{ inert: "" }}
            >
              <div className="relative flex flex-row items-center justify-center w-full h-full gap-1">
                <div
                  style={{
                    opacity: skipLeft ? 1 : 0,
                    transform: `translateX(${skipLeft ? "0" : "-50%"})`,
                  }}
                  className="absolute left-0 flex flex-row items-center justify-center w-1/3 h-full gap-2 transition-all rounded-r-[150%] rounded-l-[18px] [background-color:rgba(255,255,255,0.2)]"
                >
                  <BsSkipBackwardFill className="fill-white" size={36} />
                  <div className="text-xl text-white">{skipLeft}s</div>
                </div>
                <div
                  style={{
                    opacity: false ? 1 : 0,
                    transform: `translateX(${false ? "0" : "50%"})`,
                  }}
                  className="absolute right-0 flex flex-row items-center justify-center w-1/3 h-full gap-2 transition-all rounded-l-[150%] rounded-r-[18px] [background-color:rgba(0,0,0,0.3)]"
                >
                  <div className="text-xl">10s</div>
                  <BsFillSkipForwardFill size={36} />
                </div>
                <div
                  style={{
                    opacity: pauseKeyPressed ? 1 : 0,
                    transform: `scale(${pauseKeyPressed ? 1 : 1.2})`,
                  }}
                  className="p-6 rounded-full transition-all [background-color:rgba(0,0,0,0.3)]"
                >
                  {paused ? (
                    <HiMiniPause className="fill-white" size={36} />
                  ) : (
                    <IoPlay className="fill-white" size={36} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              opacity: loading ? 1 : 0,
            }}
            {...{ inert: loading ? undefined : "" }}
            className="absolute top-0 left-0 w-full h-full transition-opacity duration-300 rounded-md skeleton"
          ></div>
        </div>
      )}
    </>
  );
};
