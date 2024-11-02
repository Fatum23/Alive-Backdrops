export type TypePreloadDialog = {
  pickWallpaper: () => Promise<string | null>;
  pickDir: () => Promise<string | null>;
  message: (message: string, detail: string) => void;
};
