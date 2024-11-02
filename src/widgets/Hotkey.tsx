import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";

const getKey = (code: string): string => {
  if (code.includes("Digit")) return code.split("Digit")[1]!;
  switch (code) {
    case "Escape":
      return "Esc";
    case "Delete":
      return "Del";
    case "NumpadAdd":
      return "Add";
    case "NumpadSubtract":
      return "Subtract";
  }
  if (code.includes("Numpad")) return code.split("Numpad")[1]!;

  return code;
};

export const Hotkey = (props: {
  hotkey: string;
  setHotkey: Dispatch<SetStateAction<string>>;
}) => {
  const hotkeyButtonRef = useRef<HTMLButtonElement>(null);

  const [active, setActive] = useState<boolean>(false);
  const [hotkey, setHotkey] = useState<string>(props.hotkey);

  useHotkeys(props.hotkey, () => alert("a"), [props.hotkey]);

  useEffect(() => {
    document.documentElement.classList.toggle("hotkey");
    if (active) setHotkey("");
    //TODO maybe check if hotkey not only modifiers
    if (!active && hotkey === "") {
      setHotkey(props.hotkey);
    } else {
      props.setHotkey(hotkey);
    }
  }, [active]);

  const documentOnKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active || !hotkeyButtonRef.current) return;
      console.log(e, e.code);
      e.preventDefault();
      e.stopPropagation();
      hotkeyButtonRef.current.blur();

      if (["Meta", "Unidentified"].includes(e.key)) return;

      const modifiers = ["Control", "Shift", "Alt"];
      const modifiers_string =
        (e.ctrlKey ? "Ctrl + " : "") +
        (e.shiftKey ? "Shift + " : "") +
        (e.altKey ? "Alt" : "");
      let key = "";

      setHotkey(
        modifiers_string + (!modifiers.includes(e.key) ? getKey(e.code) : "")
      );
      if (!modifiers.includes(e.key)) setActive(false);
    },
    [active]
  );

  const documentOnKeyUp = useCallback(() => setActive(false), []);

  const documentOnMouseDown = useCallback((e: MouseEvent) => {
    if (!hotkeyButtonRef.current) return;
    setActive(
      hotkeyButtonRef.current.contains(
        document.elementFromPoint(e.clientX, e.clientY)
      )
    );
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", documentOnKeyDown);
    document.addEventListener("keyup", documentOnKeyUp);
    document.addEventListener("mousedown", documentOnMouseDown);
    return () => {
      document.removeEventListener("keydown", documentOnKeyDown);
      document.removeEventListener("keyup", documentOnKeyUp);
      document.removeEventListener("mousedown", documentOnMouseDown);
    };
  }, [active]);

  useEffect(() => {
    const removeEventListener = window.ipcRenderer.window.onFocusChange(
      (_e, isFocused) => !isFocused && setActive(false)
    );

    return () => removeEventListener();
  }, []);

  return (
    <div className="flex flex-row gap-1">
      <button
        ref={hotkeyButtonRef}
        className={`h-10 min-w-10 p-1 bg-dark group-hover/settings-item:bg-light transition-all ring-2 ${
          active ? "ring-accent" : "ring-transparent"
        }`}
      >
        {hotkey}
      </button>
    </div>
  );
};
