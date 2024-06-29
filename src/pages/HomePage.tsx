import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TypeContextMenu, TypePage } from "@public/types";
import { ContextMenu, HomeNavbar, WallpaperList } from "@widgets";
import { useAppStore } from "@shared/store";

export const HomePage = (props: TypePage) => {
  const location = useLocation();
  useEffect(() => {
    props.setTitle("");
    props.setLocation(location.pathname);
  }, []);
  const [search, setSearch] = useState<string>("");
  const activeWallpaper = useAppStore((state) => state.activeWallpaper);
  const [menu, setMenu] = useState<TypeContextMenu>({
    x: -1,
    y: -1,
    activeWallpaper: activeWallpaper !== undefined ? activeWallpaper.id! : -1,
    clickedWallpaper: -1,
  });
  return (
    <div className="h-screen w-screen overflow-hidden">
      <HomeNavbar search={search} setSearch={setSearch} />
      <WallpaperList search={search} menu={menu} setMenu={setMenu} />
      <ContextMenu contextMenu={menu} setContextMenu={setMenu} />
    </div>
  );
};
