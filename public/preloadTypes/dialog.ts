export type TypeDialog = {
  pickWallpaper: () => Promise<string>;
  openDir: () => Promise<string>;
  error: (text: string) => void;
};
