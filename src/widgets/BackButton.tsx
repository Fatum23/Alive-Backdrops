import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useCallback, useEffect } from "react";

export const BackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    e.key === "Escape" &&
      !["modal-open", "hotkey"].some((v) =>
        document.documentElement.className.includes(v)
      ) &&
      navigate(-1);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <button
      className="flex flex-row items-center p-1"
      onClick={() => navigate(-1)}
    >
      <IoMdArrowRoundBack size={24} />
      <div className="hidden md:inline">{t("components.back.back")}</div>
    </button>
  );
};
