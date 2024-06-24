import {
  VIDEO_WALLPAPER_EXTENSIONS,
  AUDIO_WALLPAPER_EXTENSIONS,
  WEB_WALLPAPER_EXTENSIONS,
} from "@shared/constants";

export const isValidExtension = (path: string): boolean => {
  let fileName: string = path.split("\\").pop()!;
  let extension = fileName.split(".").pop()!;
  return (
    VIDEO_WALLPAPER_EXTENSIONS.includes(extension) ||
    AUDIO_WALLPAPER_EXTENSIONS.includes(extension) ||
    WEB_WALLPAPER_EXTENSIONS.includes(extension)
  );
};
