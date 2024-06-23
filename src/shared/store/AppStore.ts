import { create } from "zustand";
import { TypeAppStore, TypeWallpaper } from "@shared/types";
import { getFromStore, setToStore } from "@shared/services";

export const useAppStore = create<TypeAppStore>((set) => ({
  activeWallpaper: undefined,
  setActiveWallpaper: async (wallpaper: TypeWallpaper) => {
    await setToStore<number>("activeWallpaper", wallpaper.id!);
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
    useAppStore.setState({
      activeWallpaper:
        id === undefined
          ? undefined
          : { id: 1, speed: "1", volume: "1", title: "a", src: "a" },
    });
  });
};

initAppStore();
