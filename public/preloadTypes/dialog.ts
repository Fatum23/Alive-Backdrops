export type TypeDialog = {
  pickWallpaper: () => Promise<string>;
  openDir: () => Promise<string>;
  message: (message: string, detail: string) => void;
};
