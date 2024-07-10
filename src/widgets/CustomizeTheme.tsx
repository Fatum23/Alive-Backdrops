import { Modal } from "@ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SlEqualizer } from "react-icons/sl";

export const CustomizeTheme = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const [bg, setBg] = useState<string>();

  useEffect(() => {
    setBg(
      getComputedStyle(document.documentElement).getPropertyValue("--dark")
    );
  }, []);
  return (
    <>
      <div
        title={t("Customize theme")}
        className="button p-1 px-2 !bg-dark group-hover:!bg-light flex items-center justify-center"
        onClick={() => setOpen(true)}
      >
        <SlEqualizer size={22} className="rotate-90" />
      </div>
      <Modal
        title="Customize theme"
        open={open}
        setOpen={setOpen}
        closable
        confirmEnabled={
          bg !== undefined && CSS.supports("background-color", bg)
        }
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          document.documentElement.style.setProperty("--default", bg!);
          setOpen(false);
        }}
      >
        <div className="flex flex-row h-8 gap-2">
          <input
            onChange={(e) => setBg(e.target.value)}
            placeholder="Background"
            className="h-full"
          />
          <div
            style={{ backgroundColor: bg }}
            className="aspect-square h-full rounded-md"
          />
        </div>
        <div>Text</div>
        <div>Primary</div>
        <div>Secondary</div>
        <div>Accent</div>
        <div>Dark accent</div>
        <div>Link</div>
      </Modal>
    </>
  );
};
