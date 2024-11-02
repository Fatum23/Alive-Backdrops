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
import { Checkbox } from "./Checkbox";

export const Modal = (props: {
  title?: string;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  closable: boolean;
  cancelButton?: boolean;
  confirmButton?: boolean;
  closeButton?: boolean;
  confirmEnabled?: boolean;
  cancelEnabled?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
  doNotShowAgain?: boolean;
  setDoNotShowAgain?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();

  const [doNotShowAgain, setDoNotShowAgain] = useState<boolean | undefined>(
    props.doNotShowAgain
  );

  useEffect(() => {
    if (props.opened) {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }
  }, [props.opened]);

  const documentOnKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (props.opened) {
        if (e.key === "Escape") {
          (document.activeElement! as HTMLElement).blur();
          props.closable && props.setOpened(false);
        }
      }
    },
    [props.opened]
  );

  useEffect(() => {
    document.getElementById("router")!.inert = props.opened ? true : false;
    document.getElementById("modal-portal")!.inert = props.opened
      ? false
      : true;
  }, [props.opened]);

  useEffect(() => {
    document.addEventListener("keydown", documentOnKeyDown);

    return () => {
      document.removeEventListener("keydown", documentOnKeyDown);
    };
  }, [documentOnKeyDown]);

  return document.getElementById("modal-portal") ? (
    ReactDOM.createPortal(
      <div
        style={{
          opacity: props.opened ? 1 : 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
        {...{ inert: props.opened ? undefined : "" }}
        onMouseDown={() =>
          props.closable
            ? props.setOpened(false)
            : window.ipcRenderer.shell.beep()
        }
        className="absolute z-50 flex items-center justify-center w-full h-full transition-opacity"
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            transform: `scale(${props.opened ? 1 : 0.9})`,
          }}
          className="transition-transform max-w-[calc(100vw-24px)] max-h-[calc(100vh-24px)] overflow-y-auto overflow-x-hidden"
          {...{ inert: props.opened ? undefined : "" }}
        >
          <div className="flex flex-col justify-between gap-2 p-2 rounded-md min-w-48 bg-default drop-shadow-2xl">
            {props.title && (
              <div className="relative flex flex-row justify-center">
                <h1 className="mx-8">{props.title}</h1>
                {props.closable ? (
                  <IoClose
                    size={24}
                    className="absolute top-0 right-0 transition-opacity cursor-pointer hover:opacity-70"
                    onClick={() => props.setOpened(false)}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            )}
            {props.children && <div>{props.children}</div>}
            {doNotShowAgain !== undefined && (
              <div className="flex flex-row items-center gap-1">
                <Checkbox
                  size={16}
                  checked={doNotShowAgain}
                  setChecked={
                    setDoNotShowAgain as Dispatch<SetStateAction<boolean>>
                  }
                />
                <div onClick={() => setDoNotShowAgain!((value) => !value)}>
                  {t("components.modal.do-not-show-again")}
                </div>
              </div>
            )}
            <div className="flex flex-row gap-2">
              {props.cancelButton && (
                <button
                  disabled={props.cancelEnabled === false}
                  className="flex-1 p-1 px-2"
                  onClick={props.onCancel}
                >
                  {t("components.modal.cancel")}
                </button>
              )}
              {props.confirmButton && (
                <button
                  disabled={props.confirmEnabled === false}
                  className="flex-1 p-1 px-2 bg-accent hover:bg-accent-hover"
                  onClick={props.onConfirm}
                >
                  {t("components.modal.ok")}
                </button>
              )}
              {props.closeButton && (
                <button
                  disabled={props.closable === false}
                  className="flex-1 p-1 px-2"
                  onClick={props.onClose}
                >
                  {t("components.modal.close")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("modal-portal")!
    )
  ) : (
    <></>
  );
};
