import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { TypeTab } from "@shared/types";

export default function Tab(props: {
  title: TypeTab;
  activeTab: TypeTab;
  setActiveTab: Dispatch<SetStateAction<TypeTab>>;
}) {
  const { t } = useTranslation();
  return (
    <button
      className="p-1 bg-transparent hover:bg-transparent"
      onClick={() => props.setActiveTab(props.title)}
    >
      {t(props.title)}
      <span
        className={`block mt-0.5 transition-all duration-300 h-[3px] bg-yellow ${
          props.activeTab === props.title ? "max-w-full" : "max-w-0"
        }`}
      ></span>
    </button>
  );
}
