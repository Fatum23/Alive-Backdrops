export * from "./settings";
export * from "./stateStore";
export * from "./store";
export * from "./wallpaper";
export * from "./fs";
export * from "./routes";
export * from "./modal";

export type TypeWindowState = {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  isFullscreen: boolean;
};
