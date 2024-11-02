export type TypePreloadWindow = {
  setTitle: (title: string) => void;
  isMaximized: () => Promise<boolean>;
  isFullscreen: () => Promise<boolean>;
  minimize: () => void;
  close: () => void;
  toggleMaximize: (maximize?: boolean) => void;
  toggleFullscreen: (fullscreen?: boolean) => void;
  onResize: (
    callback: (
      e: Electron.IpcRendererEvent,
      isMaximized: boolean,
      isFullScreen: boolean
    ) => void
  ) => () => void;
  onFocusChange: (
    callback: (e: Electron.IpcRendererEvent, isFocused: boolean) => void
  ) => () => void;
  isFocused: () => Promise<boolean>;
  setZoomFactor: (zoomFactor: number) => void;
  settingsLoaded: () => void;
};
