export type TypeWallpaperType = "wallpaper" | "widget" | "audio" | "programmed";
export type TypeWallpaperMediaType = "video" | "image" | "audio" | "web-page";

export type TypeWallpaper = {
  id: number;
  type: TypeWallpaperType;
  mediaType: TypeWallpaperMediaType;
  title: string;
  description?: string;
  src: string;
  brightness: string;
  contrast: string;
  saturation: string;
  hue: string;
  inverted: boolean;
};

export type TypeVideoWallpaper = {
  volume: string;
  speed: string;
};
