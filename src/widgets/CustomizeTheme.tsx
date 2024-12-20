import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import { SlEqualizer } from "react-icons/sl";
import { LuPipette } from "react-icons/lu";

import { Modal, Tooltip } from "@ui";
import { contextColorThemeCustom } from "@shared/contexts";

export const CustomizeTheme = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const getCSSVar = useCallback(
    (name: string) =>
      window.getComputedStyle(document.documentElement).getPropertyValue(name),
    []
  );

  const { colorThemeCustom, setColorThemeCustom } = useContext(
    contextColorThemeCustom
  );

  const [bg, setBg] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [primary, setPrimary] = useState<string>("");
  const [secondary, setSecondary] = useState<string>("");
  const [accent, setAccent] = useState<string>("");
  const [accentHover, setAccentHover] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    const ue = async () => {
      setBg(colorThemeCustom ? colorThemeCustom.bg : getCSSVar("--default"));
      setText(colorThemeCustom ? colorThemeCustom.text : getCSSVar("--text"));
      setPrimary(
        colorThemeCustom ? colorThemeCustom.primary : getCSSVar("--light")
      );
      setSecondary(
        colorThemeCustom ? colorThemeCustom.secondary : getCSSVar("--dark")
      );
      setAccent(
        colorThemeCustom ? colorThemeCustom.accent : getCSSVar("--accent")
      );
      setAccentHover(
        colorThemeCustom
          ? colorThemeCustom.accentHover
          : await window.ipcRenderer.theme.calculateAccentHover(
              getCSSVar("--accent")
            )
      );
      setLink(colorThemeCustom ? colorThemeCustom.link : getCSSVar("--link"));
    };
    ue();
  }, [modalOpened]);

  return (
    <>
      <Tooltip text={t("settings.appearance.theme.customize")}>
        <button
          className="flex items-center justify-center p-2 bg-dark group-hover/settings-item:bg-light"
          onClick={() => {
            setModalOpened(true);
          }}
        >
          <SlEqualizer className="rotate-90" size={22} />
        </button>
      </Tooltip>
      <Modal
        title={t("settings.appearance.theme.customize")}
        opened={modalOpened}
        setOpened={setModalOpened}
        closable
        cancelButton
        confirmButton
        confirmEnabled={
          CSS.supports("background", bg) &&
          CSS.supports("background", text) &&
          CSS.supports("color", primary) &&
          CSS.supports("color", secondary) &&
          CSS.supports("color", accent) &&
          CSS.supports("color", accentHover) &&
          CSS.supports("color", link)
        }
        onCancel={() => setModalOpened(false)}
        onConfirm={() => {
          setColorThemeCustom({
            bg: bg,
            text: text,
            primary: primary,
            secondary: secondary,
            accent: accent,
            accentHover: accentHover,
            link: link,
          });
          setModalOpened(false);
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
  <div className="flex items-center h-8">{props.label}</div>
);

const InputItem = (props: {
  color: string;
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-row h-8 gap-1">
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
      className="flex items-center justify-center h-full rounded-md cursor-pointer aspect-square"
    >
      {!CSS.supports("color", props.color) && <LuPipette />}
      <div
        ref={pickerRef}
        style={{
          opacity: pickerOpen ? 1 : 0,
        }}
        tabIndex={-1}
        className="transition-opacity cursor-pointer focus:outline-none"
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
