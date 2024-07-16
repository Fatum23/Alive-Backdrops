import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import { SlEqualizer } from "react-icons/sl";
import { LuPipette } from "react-icons/lu";

import { Modal } from "@ui";

export const CustomizeTheme = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [bg, setBg] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [primary, setPrimary] = useState<string>("");
  const [secondary, setSecondary] = useState<string>("");
  const [accent, setAccent] = useState<string>("");
  const [accentHover, setAccentHover] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [modalTimeout, setModalTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  const rgbToHex = useCallback(
    (r: number, g: number, b: number) =>
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join(""),
    []
  );

  const hexToRgb = useCallback(
    (hex: string) =>
      hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (_m, r, g, b) => "#" + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g)!
        .map((x) => parseInt(x, 16)),
    []
  );

  useEffect(() => {
    if (modalOpen) {
      clearTimeout(modalTimeout);
      setBg(
        getComputedStyle(document.documentElement).getPropertyValue("--default")
      );
      setText(
        getComputedStyle(document.documentElement).getPropertyValue("--text")
      );
      setPrimary(
        getComputedStyle(document.documentElement).getPropertyValue("--light")
      );
      setSecondary(
        getComputedStyle(document.documentElement).getPropertyValue("--dark")
      );

      const accentComputedValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--accent");
      setAccent(accentComputedValue);

      const accentHoverComputedValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--accent-hover");

      if (accentHoverComputedValue.includes("color-mix")) {
        const [r, g, b] = hexToRgb(accentComputedValue);
        setAccentHover(
          rgbToHex(
            Math.round(r! * 0.8),
            Math.round(g! * 0.8),
            Math.round(b! * 0.8)
          )
        );
      } else {
        setAccentHover(accentHoverComputedValue);
      }

      setLink(
        getComputedStyle(document.documentElement).getPropertyValue("--link")
      );
    } else {
      setModalTimeout(
        setTimeout(() => {
          setBg("");
          setText("");
          setPrimary("");
          setSecondary("");
          setAccent("");
          setAccentHover("");
          setLink("");
        }, 300)
      );
    }
  }, [modalOpen]);

  return (
    <>
      <div
        title={t("Customize theme")}
        className="button p-1 px-2 !bg-dark group-hover:!bg-light flex items-center justify-center"
        onClick={() => setModalOpen(true)}
      >
        <SlEqualizer size={22} className="rotate-90" />
      </div>
      <Modal
        title="Customize theme"
        open={modalOpen}
        setOpen={setModalOpen}
        closable
        confirmEnabled={
          CSS.supports("color", bg) &&
          CSS.supports("color", text) &&
          CSS.supports("color", primary) &&
          CSS.supports("color", secondary) &&
          CSS.supports("color", accent) &&
          CSS.supports("color", accentHover) &&
          CSS.supports("color", link)
        }
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          // props.setTheme({
          //   bg: bg,
          //   text: text,
          //   primary: primary,
          //   secondary: secondary,
          //   accent: accent,
          //   accentHover: accentHover,
          //   link: link,
          // });
          setModalOpen(false);
        }}
      >
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-1">
            <LabelItem label={t("Background")} />
            <LabelItem label={t("Text")} />
            <LabelItem label={t("Primary")} />
            <LabelItem label={t("Secondary")} />
            <LabelItem label={t("Accent")} />
            <LabelItem label={t("Accent hover")} />
            <LabelItem label={t("Links color")} />
          </div>
          <div className="flex flex-col gap-1">
            <InputItem color={bg} onChange={setBg} />
            <InputItem color={text} onChange={setText} />
            <InputItem color={primary} onChange={setPrimary} />
            <InputItem color={secondary} onChange={setSecondary} />
            <InputItem color={accent} onChange={setAccent} />
            <InputItem color={accentHover} onChange={setAccentHover} />
            <InputItem color={link} onChange={setLink} />
          </div>
        </div>
      </Modal>
    </>
  );
};

const LabelItem = (props: { label: string }) => (
  <div className="h-8 flex items-center">{props.label}</div>
);

const InputItem = (props: {
  color: string;
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="h-8 flex flex-row gap-1">
      <input
        value={props.color}
        onChange={(e) => props.onChange(e.target.value)}
        className="h-full"
      />
      <ColorPicker color={props.color} onChange={props.onChange} />
    </div>
  );
};

const ColorPicker = (props: {
  color: string;
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pickerOpen) {
      pickerRef.current!.inert = false;
      pickerRef.current!.focus();
    } else {
      pickerRef.current!.inert = true;
    }
  }, [pickerOpen]);
  return (
    <div
      onClick={() => setPickerOpen(true)}
      style={{
        backgroundColor: CSS.supports("color", props.color)
          ? props.color
          : "transparent",
      }}
      className="cursor-pointer flex items-center justify-center aspect-square h-full rounded-md"
    >
      {!CSS.supports("color", props.color) && <LuPipette />}
      <div
        ref={pickerRef}
        style={{
          opacity: pickerOpen ? 1 : 0,
        }}
        tabIndex={-1}
        className="cursor-pointer !transition-opacity focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setPickerOpen(false);
            e.stopPropagation();
          }
        }}
        onBlur={(e) => {
          if (
            !e.relatedTarget ||
            !pickerRef.current!.contains(e.relatedTarget)
          ) {
            setPickerOpen(false);
          }
        }}
      >
        <HexColorPicker color={props.color} onChange={props.onChange} />
      </div>
    </div>
  );
};
