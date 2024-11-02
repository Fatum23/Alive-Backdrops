export type TypePreloadWallpaper = {
  getSystemImageWallpaper: () => Promise<string>;
  setSystemImageWallpaper: (path: string) => void;
};
