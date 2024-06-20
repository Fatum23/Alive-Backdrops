import { useTranslation } from "react-i18next";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <button
      className="flex flex-row mt-2 ml-2 p-1"
      onClick={() => navigate(-1)}
    >
      <IoMdArrowRoundBack size={25} />
      <div>{t("Back")}</div>
    </button>
  );
}
