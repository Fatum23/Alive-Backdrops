import { TypeContextMenu, TypeWallpaper } from "@public/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { IoIosMore } from "react-icons/io";
import { HighlightText } from "@widgets";
import { useAppStore } from "@shared/store/AppStore";

const handleLoad = (props: {
  setLoading: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  if (props.setLoading !== undefined) {
    props.setLoading(false);
  }
};

export const Wallpaper = (
  props: TypeWallpaper & {
    setLoading: Dispatch<SetStateAction<boolean>> | undefined;
    search: string;
    menu: TypeContextMenu;
    setMenu: Dispatch<SetStateAction<TypeContextMenu>>;
  }
) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  const [hovered, setHovered] = useState<boolean>(false);

  const activeWallpaper = useAppStore((state) => state.activeWallpaper);
  const setActiveWallpaper = useAppStore((state) => state.setActiveWallpaper);

  useEffect(() => {
    ref.current!.volume = parseFloat(props.volume) / 100;
    ref.current!.playbackRate = parseFloat(props.speed);
  }, []);
  useEffect(() => {
    if (hovered) {
      ref
        .current!.play()
        .then(() => {})
        .catch((_e) => {});
    } else {
      ref.current!.currentTime = 0;
      ref.current!.pause();
    }
  }, [hovered]);

  return (
    <div
      className="sm:w-[calc(33.333%-32px)] lg:w-[calc(25%-32px)] m-4 rounded-md overflow-hidden cursor-pointer [transition:transform_0.2s] hover:scale-105 relative aspect-video bg-dark drop-shadow-lg inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setActiveWallpaper(props);
        // invoke("attach", {
        //   src: props.src,
        //   volume: props.volume,
        //   speed: props.speed,
        // });
      }}
      onContextMenu={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left + window.scrollX;
        const y = e.clientY - rect.top + window.scrollY;
        props.setMenu({
          x,
          y,
          activeWallpaper: props.menu.activeWallpaper,
          clickedWallpaper: props.id!,
        });
      }}
    >
      <video
        ref={ref}
        preload="metadata"
        src={props.src}
        loop
        onLoadedData={() => {
          handleLoad(props);
        }}
      />
      <div className="absolute bottom-1 left-0 mx-1 flex flex-row justify-between items-end gap-2 h-12 w-[calc(100%-8px)] overflow-hidden">
        <div className="flex flex-col-reverse break-all w-full">
          {!hovered && (
            <HighlightText text={props.title} highlight={props.search} />
          )}
        </div>
        {hovered && (
          <button
            className="h-[70%] rounded-md aspect-square flex items-center justify-center bg-transparent hover:bg-gray-300 hover:bg-opacity-40"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left + window.scrollX;
              const y = e.clientY - rect.top + window.scrollY;
              props.setMenu({
                x: x,
                y: y,
                activeWallpaper: props.menu.activeWallpaper,
                clickedWallpaper: props.id!,
              });
            }}
          >
            <IoIosMore fill="white" size={26} />
          </button>
        )}
      </div>
      {!hovered &&
        activeWallpaper !== null &&
        props.id! === activeWallpaper!.id! && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow"></div>
        )}
    </div>
  );
};
