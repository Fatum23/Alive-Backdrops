import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "@shared/styles/switch.scss";

export const Switch = (
  props: {
    switch?: JSX.IntrinsicElements["div"];
    thumb?: JSX.IntrinsicElements["div"];
  } & {
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
  }
) => {
  const [down, setDown] = useState<{ switchX: number; thumbX: number } | null>(
    null
  );
  const [move, setMove] = useState<number | null>(null);
  const [up, setUp] = useState<number | null>(null);

  const switchRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(up);
    if (!down) {
      setMove(null);
      setUp(null);
    }
  }, [down]);
  return (
    <div
      ref={switchRef}
      className="w-16 h-8 rounded-full bg-red-400 flex items-center"
      onMouseMove={(e) => {
        setMove(e.nativeEvent.offsetX);
      }}
      {...props.switch}
    >
      <div
        ref={thumbRef}
        style={{
          transform: move ? `translateX(${move}px)` : "translateX(0)",
        }}
        className="h-5 aspect-square rounded-full bg-accent"
        onMouseDown={(e) =>
          setDown({
            switchX: e.clientX - switchRef.current!.offsetLeft,
            thumbX: e.nativeEvent.offsetX,
          })
        }
        onMouseUp={(e) => {
          setUp(Math.abs(e.nativeEvent.offsetX - down!.switchX));
          setDown(null);
        }}
        onMouseLeave={() => setDown(null)}
        {...props.thumb}
      />
    </div>
  );
};
