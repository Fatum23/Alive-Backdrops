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
  const [thumbPressX, setThumbPressX] = useState<number>(0);

  const switchRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbRef.current || !switchRef.current) return;
    thumbRef.current.style.transform = `translateX(${
      props.enabled
        ? switchRef.current.getBoundingClientRect().width -
          thumbRef.current.getBoundingClientRect().width -
          thumbRef.current.getBoundingClientRect().height * 0.2
        : thumbRef.current.getBoundingClientRect().height * 0.2
    }px)`;
  }, [props.enabled]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!thumbRef.current) return;
      thumbRef.current.style.transition = "";
    });
  }, []);

  useEffect(() => {
    if (!dragging && switchRef.current && thumbRef.current) {
      if (
        (parseFloat(thumbRef.current.style.transform.replace(/[^\d.]/g, "")) -
          thumbRef.current.getBoundingClientRect().height * 0.2) /
          (switchRef.current.getBoundingClientRect().width -
            thumbRef.current.getBoundingClientRect().width -
            thumbRef.current.getBoundingClientRect().height * 0.4) >=
        0.5
      ) {
        thumbRef.current.style.transform = `translateX(${
          switchRef.current.getBoundingClientRect().width -
          thumbRef.current.getBoundingClientRect().width -
          thumbRef.current.getBoundingClientRect().height * 0.2
        }px)`;
        props.setEnabled(true);
      } else {
        thumbRef.current.style.transform = `translateX(${
          thumbRef.current.getBoundingClientRect().height * 0.2
        }px)`;
        props.setEnabled(false);
      }
    }
  }, [dragging]);

  useEffect(() => {
    !mouseDown && setDragging(false);
  }, [mouseDown]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!thumbRef.current || !switchRef.current || !mouseDown) return;

      setDragging(true);

      if (
        e.clientX < Math.trunc(switchRef.current.getBoundingClientRect().left)
      ) {
        thumbRef.current.style.transform = `translateX(${
          thumbRef.current.getBoundingClientRect().height * 0.2
        }px)`;
        return;
      }
      if (
        e.clientX > Math.ceil(switchRef.current.getBoundingClientRect().right)
      ) {
        thumbRef.current.style.transform = `translateX(${
          switchRef.current.getBoundingClientRect().width -
          thumbRef.current.getBoundingClientRect().width -
          thumbRef.current.getBoundingClientRect().height * 0.2
        }px)`;
        return;
      }

      if (
        e.clientX -
          thumbPressX -
          switchRef.current.getBoundingClientRect().left >=
          thumbRef.current.getBoundingClientRect().height * 0.2 &&
        e.clientX +
          thumbRef.current.getBoundingClientRect().width -
          thumbPressX <=
          switchRef.current.getBoundingClientRect().left +
            switchRef.current.getBoundingClientRect().width -
            thumbRef.current.getBoundingClientRect().height * 0.2
      ) {
        thumbRef.current.style.transform = `translateX(${
          e.clientX -
          switchRef.current.getBoundingClientRect().left -
          thumbPressX
        }px)`;
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
      <div className="w-full h-[70%]">
        <div
          ref={thumbRef}
          className={`cursor-pointer h-full aspect-square rounded-full bg-white text-black ${
            dragging ? "transition-none" : "transition-transform"
          }`}
          style={{
            transition: "none",
          }}
          onMouseDown={(e) => {
            if (e.button === 2) return;
            setThumbPressX(e.nativeEvent.offsetX);
            setMouseDown(e.clientX);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
