import { motion } from "framer-motion";
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

const getOffsetTop = (el: HTMLElement): number => {
  //summ offsetHeight of parent elements
  let top = 0;
  while (el && !isNaN(el.offsetTop)) {
    // console.log(el, el.offsetTop, el.offsetHeight);
    top += el.offsetTop - el.scrollTop;
    el = el.offsetParent as HTMLElement;
  }
  return top;
};

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

  const [rerender, setRerender] = useState<boolean>(false);

  const updateRerender = useCallback(
    () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setRerender((val) => !val))
      ),
    []
  );

  useEffect(() => {
    const removeResizeListener =
      window.ipcRenderer.window.onResize(updateRerender);

    return () => {
      removeResizeListener && removeResizeListener();
    };
  });

  return (
    <>
      {cloneElement(props.children, {
        ref: targetRef,
        onWheel: onWheel,
        // onScroll: (update scroll)
      })}
      {portal &&
        targetRef.current &&
        targetRef.current.scrollWidth > targetRef.current.offsetWidth &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            style={{
              top: targetRef.current
                ? getOffsetTop(targetRef.current) +
                  targetRef.current.offsetHeight -
                  4
                : // targetRef.current.getBoundingClientRect().top +
                  // targetRef.current.getBoundingClientRect().height
                  0,
              left: targetRef.current ? targetRef.current.offsetLeft : "auto",
              right: targetRef.current
                ? window.innerWidth -
                  targetRef.current.offsetLeft -
                  targetRef.current.offsetWidth
                : "auto",
            }}
            className="absolute z-50 h-1 cursor-pointer bg-dark"
            data-rerender={rerender}
          >
            <div
              style={{
                width: targetRef.current
                  ? `calc(100% - ${
                      targetRef.current.scrollWidth -
                      targetRef.current.offsetWidth
                    }px)`
                  : 0,
                transform: `translateX(${scroll}px)`,
              }}
              className="h-full transition-transform rounded-sm bg-accent"
            />
          </motion.div>,
          portal
        )}
    </>
  );
};
