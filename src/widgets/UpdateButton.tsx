import { useTranslation } from "react-i18next";

export const UpdateButton = () => {
  const { t } = useTranslation();
  return (
    <>
      <button className="p-1">{t("Update")}</button>
      {/* Update Modal and also show it when user click on update notification */}
    </>
  );
};
