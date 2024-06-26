import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import ContextMenuItem from "./ContextMenuItem";

import { TypeContextMenu } from "@public/types";

export default function ContextMenu(props: {
  contextMenu: TypeContextMenu;
  setContextMenu: Dispatch<SetStateAction<TypeContextMenu>>;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        props.setContextMenu({
          x: -1,
          y: -1,
          activeWallpaper: -1,
          clickedWallpaper: -1,
        });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  let itemCount: number = 5;

  // console.log(props.contextMenu);

  // const overflow_x = props.contextMenu.x + 160 < 350;
  // const overflow_y = props.contextMenu.y + 32 * itemCount < 500;

  // const x = overflow_x ? props.contextMenu.x : props.contextMenu.x - 160;

  // const y = overflow_y
  //   ? props.contextMenu.y
  //   : props.contextMenu.y - 32 * itemCount;

  let borderTL: number = 0;
  let borderTR: number = 12;
  let borderBL: number = 12;
  let borderBR: number = 12;

  return (
    <>
      {props.contextMenu.clickedWallpaper !== -1 && (
        <div
          ref={menuRef}
          style={{
            left: props.contextMenu.x,
            top: props.contextMenu.y,
            height: 32 * itemCount,
            borderTopLeftRadius: borderTL,
            borderTopRightRadius: borderTR,
            borderBottomLeftRadius: borderBL,
            borderBottomRightRadius: borderBR,
          }}
          className="absolute w-40 bg-light flex flex-col overflow-hidden pointer-events-auto shadow-2xl z-50"
        >
          <ContextMenuItem />
          <ContextMenuItem />
        </div>
      )}
    </>
  );
}
