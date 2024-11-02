import i18next from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./translations/en/";
import { ru } from "./translations/ru/";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  keySeparator: ".",
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
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
