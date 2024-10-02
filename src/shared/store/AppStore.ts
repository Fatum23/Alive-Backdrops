import { create } from "zustand";
import { TypeAppStateStore, TypeWallpaper } from "@public/types";

export const useAppStore = create<TypeAppStateStore>((set) => ({
  activeWallpaper: undefined,
  setActiveWallpaper: (wallpaper: TypeWallpaper) => {
    window.ipcRenderer.store.set<number>("activeWallpaper", wallpaper.id!);
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
  await window.ipcRenderer.store
    .get<number>("activeWallpaper")
    .then(async (id) => {
      useAppStore.setState({
        activeWallpaper:
          id === undefined
            ? undefined
            : { id: 1, speed: "1", volume: "1", title: "a", src: "a" },
      });
    });
};

initAppStore();
