import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

import { IoClose } from "react-icons/io5";

export const Modal = (props: {
  title?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  closable: boolean;
  confirmEnabled: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  onClose?: () => void;
}) => {
  const { t } = useTranslation();

  const [modalTimeout, setModalTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  useEffect(() => {
    if (props.open) {
      clearTimeout(modalTimeout);
      document.getElementById("router")!.classList.add("modal-open");
    } else {
      setModalTimeout(
        setTimeout(() => {
          document.getElementById("router")!.classList.remove("modal-open");
        }, 300)
      );
    }
  }, [props.open]);

  const documentOnKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (props.open) {
        if (e.key === "Escape") {
          (document.activeElement! as HTMLElement).blur();
          props.closable && props.setOpen(false);
        }
      }
    },
    [props.open]
  );

  useEffect(() => {
    document.getElementById("router")!.inert = props.open ? true : false;
    document.getElementById("modal")!.inert = props.open ? false : true;
  }, [props.open]);

  useEffect(() => {
    document.addEventListener("keydown", documentOnKeyDown);

    return () => {
      document.removeEventListener("keydown", documentOnKeyDown);
    };
  }, [documentOnKeyDown]);

  useEffect(() => {
    if (!props.open) {
      document.getElementById("router")!.inert = false;
      //disable inert when hot reload
    }
  }, []);
  //TODO maybe remove ueh above

  return ReactDOM.createPortal(
    <div
      style={{
        opacity: props.open ? 1 : 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
      {...{ inert: props.open ? undefined : "" }}
      onMouseDown={() =>
        props.closable ? props.setOpen(false) : window.ipcRenderer.shell.beep()
      }
      className="absolute w-full h-full z-50 flex items-center justify-center transition-opacity"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          transform: `scale(${props.open ? 1 : 1.1})`,
        }}
        className="transition-transform"
        {...{ inert: props.open ? undefined : "" }}
      >
        <div className="min-w-48 p-2 bg-default rounded-md flex flex-col gap-2 justify-between drop-shadow-2xl">
          {props.title && (
            <div className="flex flex-row justify-between">
              <div></div>
              <h1>{t(props.title)}</h1>
              {props.closable ? (
                <IoClose
                  size={24}
                  className="cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() => props.setOpen(false)}
                />
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div>{props.children}</div>
          <div className="flex flex-row gap-2">
            <button className="w-1/2 p-1 px-2" onClick={props.onCancel}>
              {t("Cancel")}
            </button>
            <button
              disabled={!props.confirmEnabled}
              className="w-1/2 p-1 px-2 bg-accent hover:bg-accent-hover"
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
