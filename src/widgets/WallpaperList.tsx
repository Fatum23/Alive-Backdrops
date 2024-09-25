import { Wallpaper } from "@entities";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeContextMenu, TypeWallpaper } from "@public/types";

import { CiImageOff as NoImage } from "react-icons/ci";

export const WallpaperList = (props: {
  search: string;
  menu: TypeContextMenu;
  setMenu: Dispatch<SetStateAction<TypeContextMenu>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wallpapers, _setWallpapers] = useState<TypeWallpaper[]>([]);

  // useEffect(() => {
  //   setLoading(true);
  //   getWallpapers(props.search).then((res) => {
  //     setWallpapers(res);
  //     setLoading(false);
  //   });
  // }, []);
  // useEffect(() => {
  //   setLoading(true);
  //   getWallpapers(props.search).then((res) => {
  //     setWallpapers(res);
  //     setLoading(false);
  //   });
  // }, [props.search, props.activeTab]);

  const memoizedWallpapers = useMemo(() => wallpapers, [wallpapers]);

  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col h-[calc(100%-72px)] pb-4 overflow-y-auto">
      <div
        style={{ opacity: loading ? 0 : 1 }}
        className="flex-row flex-grow flex-wrap transition-opacity duration-500 inline-block"
      ></div>
      {/* {!loading && wallpapers.length === 0 && (
        <div className="flex absolute top-0 left-0 w-full h-full justify-center flex-col items-center gap-1">
          <NoImage size={64} />
          <div className="text-xl">
            {t(
              props.search === ""
                ? "You have no wallpapers added yet"
                : "No such wallpapers found"
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};
