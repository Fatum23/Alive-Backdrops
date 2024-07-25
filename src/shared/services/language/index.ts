import i18next from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enTranslations } from "./en";
import { ruTranslations } from "./ru";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "en",
  resources: {
    en: {
      translation: enTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

window.ipcRenderer.language.onChange((_e, language) => {
  language = language !== "system" ? language : navigator.language;
  i18next.changeLanguage(language);
});
