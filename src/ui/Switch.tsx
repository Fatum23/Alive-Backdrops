import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const Switch = (props: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) => {
  const [dragging, setDragging] = useState<boolean | null>(null);
  const [mouseDown, setMouseDown] = useState<number | false>(false);
  const [translateX, setTranslateX] = useState<number>(props.enabled ? 29 : 4);
  const [thumbPressX, setThumbPressX] = useState<number>(0);

  const switchRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTranslateX(props.enabled ? 29 : 4);
  }, [props.enabled]);

  useEffect(() => {
    if (!dragging && switchRef.current && thumbRef.current) {
      if (translateX === (props.enabled ? 29 : 4)) {
        props.setEnabled((prev) => !prev);
      } else if (
        (translateX - 4) /
          (switchRef.current.offsetWidth - thumbRef.current.offsetWidth - 8) >=
        0.5
      ) {
        props.enabled && setTranslateX(29);
        props.setEnabled(true);
      } else {
        !props.enabled && setTranslateX(4);
        props.setEnabled(false);
      }
    }
  }, [dragging]);

  useEffect(() => {
    !mouseDown && setDragging(false);
  }, [mouseDown]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!thumbRef.current || !switchRef.current) return;
      if (
        mouseDown &&
        e.clientX -
          thumbPressX -
          switchRef.current.getBoundingClientRect().left >=
          4 &&
        e.clientX +
          thumbRef.current.getBoundingClientRect().width -
          thumbPressX <=
          switchRef.current.getBoundingClientRect().left +
            switchRef.current.getBoundingClientRect().width -
            4
      ) {
        setDragging(true);
        setTranslateX(
          e.clientX -
            switchRef.current.getBoundingClientRect().left -
            thumbPressX
        );
      }
    },
    [mouseDown, thumbPressX]
  );

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      if (mouseDown) {
        if (Math.abs(e.clientX - mouseDown) === 0) {
          props.setEnabled((prev) => !prev);
        }
        setMouseDown(false);
      }
    },
    [mouseDown]
  );

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseDown, thumbPressX]);

  return (
    <div
      ref={switchRef}
      className={`cursor-pointer h-8 flex items-center aspect-video rounded-full ${
        props.enabled
          ? "bg-accent"
          : "bg-dark group-hover/settings-item:bg-light"
      }`}
      onClick={() => props.setEnabled((prev) => !prev)}
    >
      <div
        ref={thumbRef}
        className="cursor-pointer h-6 aspect-square rounded-full bg-white text-black"
        style={{
          transition: dragging ? "" : "transform 0.3s",
          transform: `translateX(${translateX}px)`,
        }}
        onMouseDown={(e) => {
          if (e.button === 2) return;
          setThumbPressX(e.nativeEvent.offsetX);
          setMouseDown(e.clientX);
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
