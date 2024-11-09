import { motion } from "framer-motion";
import { cloneElement, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Tooltip = (props: {
  children: ReactElement;
  text: string;
  type?: "hint" | "success" | "warning" | "error";
  visible?: boolean;
  visibleCondition?: boolean;
  showTimeout?: number;
  info?: boolean;
}) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const color = () => {
      switch (props.type) {
        case undefined:
          return "black";
        case "hint":
          return "black";
        case "success":
          return "#22c55e";
        case "warning":
          return "#eab308";
        case "error":
          return "#ef4444";
        default:
          return "black";
      }
    };
    setColor(color);
  }, [props.type]);

  const [visible, setVisible] = useState<boolean | undefined>(props.visible);
  useEffect(() => setVisible(props.visible), [props.visible]);
  const [hovered, setHovered] = useState<boolean>(false);
  const [hoverTimeout, setHoverTimeout] = useState<
    NodeJS.Timeout | undefined
  >();
  const [scrollTargetTop, setScrollTargetTop] = useState<number | null>(null);
  const [rerender, setRerender] = useState<boolean>(false);

  const rerenderTooltip = useCallback(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setRerender((prev) => !prev);
        setScrollTargetTop(null);
      })
    );
  }, []);

  useEffect(() => rerenderTooltip(), [props.text, props.visible]);

  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const targetSetHoveredFalse = useCallback(() => {
    setHovered(false);
    clearTimeout(hoverTimeout);
  }, [hoverTimeout]);

  const targetOnMouseEnter = useCallback(
    () =>
      setHoverTimeout(
        setTimeout(
          () => setHovered(true),
          props.showTimeout !== undefined ? props.showTimeout : 500
        )
      ),
    [props.showTimeout]
  );

  const documentOnMouseMove = useCallback((e: MouseEvent) => {
    if (!targetRef.current) return;
    const contains = targetRef.current.contains(
      document.elementFromPoint(e.clientX, e.clientY)
    );
    !contains && setHovered(false);
  }, []);

  const documentOnScroll = useCallback(() => {
    if (!targetRef.current) return;
    setScrollTargetTop(targetRef.current.getBoundingClientRect().top); //TODO rerender only if visible
  }, [props.visible]);

  const documentOnScrollEnd = useCallback(() => {
    setScrollTargetTop(null);
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    targetRef.current.addEventListener("mouseenter", targetOnMouseEnter);
    document.addEventListener("mousemove", documentOnMouseMove);
    props.visible !== undefined &&
      document.addEventListener("scroll", documentOnScroll, true);
    props.visible !== undefined &&
      document.addEventListener("scrollend", documentOnScrollEnd, true);

    const removeResizeListener =
      props.visible !== undefined
        ? window.ipcRenderer.window.onResize(rerenderTooltip)
        : undefined;

    return () => {
      targetRef.current?.removeEventListener("mouseenter", targetOnMouseEnter);
      document.removeEventListener("mousemove", documentOnMouseMove);
      props.visible !== undefined &&
        document.removeEventListener("scroll", documentOnScroll, true);
      props.visible !== undefined &&
        document.removeEventListener("scrollend", documentOnScrollEnd, true);
      removeResizeListener && removeResizeListener();
    };
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    targetRef.current.addEventListener("mouseleave", targetSetHoveredFalse);
    !props.info &&
      targetRef.current.addEventListener("mousedown", targetSetHoveredFalse);
    props.visible === undefined &&
      targetRef.current.addEventListener("wheel", targetSetHoveredFalse);
    return () => {
      targetRef.current?.removeEventListener(
        "mouseleave",
        targetSetHoveredFalse
      );
      !props.info &&
        targetRef.current?.removeEventListener(
          "mousedown",
          targetSetHoveredFalse
        );

      props.visible === undefined &&
        targetRef.current?.removeEventListener("wheel", targetSetHoveredFalse);
    };
  }, [hoverTimeout]);

  const [modalChild, setModalChild] = useState<boolean>(false);
  useEffect(() => {
    if (!document.getElementById("modal-portal") || !targetRef.current) return;
    setModalChild(
      document.getElementById("modal-portal")!.contains(targetRef.current)
    );
  }, []);

  useEffect(() => {
    if (!modalChild || !props.visible) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const htmlTag = mutation.target as HTMLHtmlElement;
        !htmlTag.classList.contains("modal-open") && setVisible(false);
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [modalChild, props.visible]);

  const [portal, setPortal] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setPortal(document.getElementById("tooltip-portal") as HTMLDivElement);
  }, []);

  return (
    <>
      {portal &&
        createPortal(
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            ref={tooltipRef}
            style={{
              opacity: (
                visible !== undefined
                  ? visible
                  : props.visibleCondition !== undefined
                  ? props.visibleCondition && hovered
                  : hovered
              )
                ? 1
                : 0,
              transform: `translateY(${
                (
                  visible !== undefined
                    ? visible
                    : props.visibleCondition !== undefined
                    ? props.visibleCondition && hovered
                    : hovered
                )
                  ? 0
                  : 5
              }px)`,
              top:
                targetRef.current && tooltipRef.current
                  ? scrollTargetTop
                    ? scrollTargetTop -
                      tooltipRef.current.getBoundingClientRect().height
                    : targetRef.current.getBoundingClientRect().top -
                      tooltipRef.current.getBoundingClientRect().height
                  : 0,
              left:
                targetRef.current && tooltipRef.current
                  ? targetRef.current.getBoundingClientRect().left -
                      tooltipRef.current.getBoundingClientRect().width / 2 +
                      targetRef.current.getBoundingClientRect().width / 2 >
                    0
                    ? targetRef.current.getBoundingClientRect().left -
                      tooltipRef.current.getBoundingClientRect().width / 2 +
                      targetRef.current.getBoundingClientRect().width / 2
                    : 4
                  : 0,
              zIndex: modalChild ? 51 : 49,
            }}
            {...{ inert: "" }}
            data-rerender={rerender}
            className={`tooltip ${
              modalChild && "modal-child"
            } absolute [transition:opacity_0.2s,transform_0.2s] flex flex-col ${
              color === "black" && "drop-shadow-tooltip"
            }`}
          >
            <div
              className="px-2 py-1 text-white rounded-md text-nowrap"
              style={{
                backgroundColor: color,
              }}
            >
              {props.text}
            </div>
            <div
              style={{
                borderTopColor: color,
                marginLeft:
                  targetRef.current && tooltipRef.current
                    ? targetRef.current.getBoundingClientRect().left -
                      (targetRef.current.getBoundingClientRect().left -
                        tooltipRef.current.getBoundingClientRect().width / 2 +
                        targetRef.current.getBoundingClientRect().width / 2 >
                      0
                        ? targetRef.current.getBoundingClientRect().left -
                          tooltipRef.current.getBoundingClientRect().width / 2 +
                          targetRef.current.getBoundingClientRect().width / 2
                        : 4) +
                      targetRef.current.getBoundingClientRect().width / 2 -
                      4
                    : 0,
              }}
              className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-r-4 border-l-transparent border-r-transparent border-b-transparent"
            ></div>
          </motion.div>,
          portal
        )}
      {cloneElement(props.children, {
        ref: targetRef,
      })}
    </>
  );
};
