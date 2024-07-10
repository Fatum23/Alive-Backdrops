import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

export const Modal = (props: {
  title?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  closable: boolean;
  confirmEnabled: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const onKeyDownListener = useCallback(
    (e: KeyboardEvent) => {
      if (props.open) {
        if (e.key === "Escape") {
          (document.activeElement! as HTMLElement).blur();
          props.closable && props.setOpen(false);
        }
        if (e.key === "Tab") {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    [props.open]
  );

  useEffect(() => {
    document.getElementById("router")!.style.pointerEvents = props.open
      ? "none"
      : "auto";
  }, [props.open]);
  useEffect(() => {
    if (!props.open) {
      document.getElementById("router")!.style.pointerEvents = "auto";
      //enable pointer events when hot reload
    }
    document.addEventListener("keydown", onKeyDownListener);

    return () => {
      document.removeEventListener("keydown", onKeyDownListener);
    };
  }, [onKeyDownListener]);

  const { t } = useTranslation();
  return ReactDOM.createPortal(
    <div
      style={{
        opacity: props.open ? 1 : 0,
        pointerEvents: props.open ? "auto" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
      onMouseDown={() =>
        props.closable ? props.setOpen(false) : window.ipcRenderer.shell.beep()
      }
      className="absolute w-full h-full z-50 flex items-center justify-center !transition-opacity"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          pointerEvents: props.open ? "auto" : "none",
        }}
      >
        <div className="min-w-48 p-2 bg-default rounded-md flex flex-col gap-2 justify-between drop-shadow-2xl">
          {props.title && <h1 className="text-center">{t(props.title)}</h1>}
          <div>{props.children}</div>
          <div className="flex flex-row gap-2">
            <button className="w-1/2 p-1 px-2" onClick={props.onCancel}>
              {t("Cancel")}
            </button>
            <button
              disabled={!props.confirmEnabled}
              className="w-1/2 p-1 px-2 bg-accent hover:bg-dark-accent"
              onClick={props.onConfirm}
            >
              {t("Ok")}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};
