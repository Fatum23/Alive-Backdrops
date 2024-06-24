import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdArrowRoundBack } from "react-icons/io";

export const BackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <button className="flex flex-row" onClick={() => navigate(-1)}>
      <IoMdArrowRoundBack size={25} />
      <div>{t("Back")}</div>
    </button>
  );
};
