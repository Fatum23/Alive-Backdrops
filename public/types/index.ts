export * from "./settings";
export * from "./stateStore";
export * from "./store";
export * from "./wallpaper";

import { Dispatch, SetStateAction } from "react";

export type TypeWindowState = {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  isFullscreen: boolean;
};

export type TypePage = {
  setTitle: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
};

export type TypeContextMenu = {
  x: number;
  y: number;
  activeWallpaper: number;
  clickedWallpaper: number;
};
