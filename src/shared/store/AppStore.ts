import { create } from "zustand";
import { TypeAppStore, TypeWallpaper } from "@shared/types";
import { getFromStore, setToStore, getWallpaperById } from "@shared/services";

export const useAppStore = create<TypeAppStore>((set) => ({
  activeWallpaper: null,
  setActiveWallpaper: (wallpaper: TypeWallpaper) => {
    setToStore<number>("activeWallpaper", wallpaper.id!);
    set(() => ({
      activeWallpaper: {
        id: wallpaper.id!,
        title: wallpaper.title,
        src: wallpaper.src,
        volume: wallpaper.volume,
        speed: wallpaper.speed,
      },
    }));
  },
}));

const initAppStore = async () => {
  await getFromStore<number>("activeWallpaper").then(async (id) => {
    if (id !== null) {
      const activeWallpaper = await getWallpaperById(id);

      useAppStore.setState({
        activeWallpaper: activeWallpaper,
      });
    }
  });
};

initAppStore();
