import {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

export const Scrollbar = (props: { children: ReactElement }) => {
  const targetRef = useRef<HTMLElement>(null);
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    if (!targetRef.current) return;
    targetRef.current.scrollTo({
      left: scroll,
      behavior: "smooth",
    });
  }, [scroll]);

  const onWheel = useCallback((e: any) => {
    if (e.shiftKey || !targetRef.current) return;

    const setScrollValue = (value: number): number => {
      if (!targetRef.current) return value;
      return value + e.deltaY >
        targetRef.current.scrollWidth - targetRef.current.clientWidth
        ? targetRef.current.scrollWidth - targetRef.current.clientWidth
        : value + e.deltaY < 0
        ? 0
        : value + e.deltaY;
    };

    setScroll((value) => setScrollValue(value));
  }, []);

  const [portal, setPortal] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setPortal(document.getElementById("scrollbar-portal") as HTMLDivElement);
  }, []);

  return (
    <>
      {cloneElement(props.children, {
        ref: targetRef,
        onWheel: onWheel,
        // onScroll: (update scroll)
      })}
      {portal &&
        ReactDOM.createPortal(
          <div
            style={{
              top: targetRef.current
                ? targetRef.current.getBoundingClientRect().bottom - 4
                : 0,
            }}
            className="absolute left-0 z-50 w-full h-1 cursor-pointer bg-dark"
          >
            <div
              style={{
                width: targetRef.current
                  ? `calc(100% - ${
                      targetRef.current.scrollWidth -
                      targetRef.current.clientWidth
                    }px)`
                  : 0,
                transform: `translateX(${scroll}px)`,
              }}
              className="h-full transition-transform rounded-sm bg-accent"
            />
          </div>,
          portal
        )}
    </>
  );
};
