import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

export const Tooltip = (props: {
  children: ReactNode;
  text: string;
  type?: "hint" | "success" | "warning" | "error";
  visible?: boolean;
  wrapperClassName?: string;
}) => {
  const { t } = useTranslation();

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
    () => setHoverTimeout(setTimeout(() => setHovered(true), 500)),
    []
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
    setScrollTargetTop(
      targetRef.current.children[0]!.getBoundingClientRect().top
    );
  }, [targetRef]);

  const documentOnScrollEnd = useCallback(() => {
    setScrollTargetTop(null);
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    const target = targetRef.current.children[0]! as HTMLElement;

    target.addEventListener("mouseenter", targetOnMouseEnter);
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
      target.removeEventListener("mouseenter", targetOnMouseEnter);
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

    const target = targetRef.current.children[0]! as HTMLElement;

    target.addEventListener("mouseleave", targetSetHoveredFalse);
    target.addEventListener("mousedown", targetSetHoveredFalse);
    props.visible === undefined &&
      target.addEventListener("wheel", targetSetHoveredFalse);
    return () => {
      target.removeEventListener("mouseleave", targetSetHoveredFalse);
      target.removeEventListener("mousedown", targetSetHoveredFalse);

      props.visible === undefined &&
        target.removeEventListener("wheel", targetSetHoveredFalse);
    };
  }, [hoverTimeout]);

  return (
    <>
      {document.getElementById("tooltip") ? (
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            style={{
              opacity: (props.visible !== undefined ? props.visible : hovered)
                ? 1
                : 0,
              transform: `translateY(${
                (props.visible !== undefined ? props.visible : hovered) ? 0 : 5
              }px)`,
              top:
                targetRef.current && tooltipRef.current
                  ? scrollTargetTop
                    ? scrollTargetTop -
                      tooltipRef.current.getBoundingClientRect().height
                    : targetRef.current.children[0]!.getBoundingClientRect()
                        .top - tooltipRef.current.getBoundingClientRect().height
                  : 0,
              left:
                targetRef.current && tooltipRef.current
                  ? targetRef.current.children[0]!.getBoundingClientRect()
                      .left -
                      tooltipRef.current.getBoundingClientRect().width / 2 +
                      targetRef.current.children[0]!.getBoundingClientRect()
                        .width /
                        2 >
                    0
                    ? targetRef.current.children[0]!.getBoundingClientRect()
                        .left -
                      tooltipRef.current.getBoundingClientRect().width / 2 +
                      targetRef.current.children[0]!.getBoundingClientRect()
                        .width /
                        2
                    : 4
                  : 0,
            }}
            {...{ inert: "" }}
            data-rerender={rerender}
            className="absolute z-[60] [transition:opacity_0.2s,transform_0.2s] flex flex-col"
          >
            <div
              className="text-white rounded-md py-1 px-2 text-nowrap"
              style={{
                backgroundColor: color,
              }}
            >
              {t(props.text, { nsSeparator: false })}
            </div>
            <div
              style={{
                borderTopColor: color,
                marginLeft:
                  targetRef.current && tooltipRef.current
                    ? targetRef.current.children[0]!.getBoundingClientRect()
                        .left -
                      (targetRef.current.children[0]!.getBoundingClientRect()
                        .left -
                        tooltipRef.current.getBoundingClientRect().width / 2 +
                        targetRef.current.children[0]!.getBoundingClientRect()
                          .width /
                          2 >
                      0
                        ? targetRef.current.children[0]!.getBoundingClientRect()
                            .left -
                          tooltipRef.current.getBoundingClientRect().width / 2 +
                          targetRef.current.children[0]!.getBoundingClientRect()
                            .width /
                            2
                        : 4) +
                      targetRef.current.children[0]!.getBoundingClientRect()
                        .width /
                        2 -
                      4
                    : 0,
              }}
              className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-transparent border-t-4`}
            ></div>
          </div>,
          document.getElementById("tooltip")!
        )
      ) : (
        <></>
      )}
      <div className={props.wrapperClassName} ref={targetRef}>
        {props.children}
      </div>
    </>
  );
};
