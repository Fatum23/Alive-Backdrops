export * from "./settings";
export * from "./stateStore";
export * from "./store";
export * from "./wallpaper";
export * from "./fs";

export type TypeWindowState = {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  isFullscreen: boolean;
};

export type TypeContextMenu = {
  x: number;
  y: number;
  activeWallpaper: number;
  clickedWallpaper: number;
};

export type TypeHomeTab = "all" | "playlists" | "scheduling";
