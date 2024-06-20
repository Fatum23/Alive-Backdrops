import { listen } from "@tauri-apps/api/event";
import i18next from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        "Add wallpaper": "Add wallpaper",
        "My library": "My library",
        "Online library": "Online library",
        Add: "Add",
        Active: "Active",
        Settings: "Settings",
        Back: "Back",
        Apply: "Apply",
        Reset: "Reset",
        Loading: "Loading wallpapers...",
        "No such wallpapers found": "No such wallpapers found",
        "You have no wallpapers added yet": "You have no wallpapers added yet",
        "Invalid video format": "Invalid video format",
        "Drop or select video": "Drop or select video",
        Title: "Title",

        "Wallpaper behavior": "Wallpaper behavior",
        "Window in the foreground": "Window in the foreground",
        "If there is a window that is in the foreground":
          "If there is a window that is in the foreground",

        "Maximized window": "Maximized window",
        "If there is a maximized window": "If there is a maximized window",

        "Window in the fullscreen": "Window in the fullscreen",
        "If there is a window that is in the fullscreen":
          "If there is a window that is in the fullscreen",

        Volume: "Volume",
        "General volume": "General volume",
        "General volume for all wallpapers":
          "General volume for all wallpapers",

        General: "General",
        Autolaunch: "Autolaunch",
        "Launch app with system to enable wallpapers":
          "Launch app with system to enable wallpapers",

        "Color theme": "Color theme",
        "App color theme": "App color theme",

        Language: "Language",
        "App language": "App language",

        "Path to wallpapers folder": "Path to wallpapers folder",
        "Path to the folder where the wallpapers are stored":
          "Path to the folder where the wallpapers are stored",

        Speed: "Speed",
      },
    },
    ru: {
      translation: {
        "Add wallpaper": "Добавить обои",
        "My library": "Моя библиотека",
        "Online library": "Онлайн библиотека",
        Add: "Добавить",
        Active: "Активные",
        Settings: "Настройки",
        Back: "Назад",
        Apply: "Применить",
        Reset: "Сбросить",
        Loading: "Загрузка обоев...",
        "You have no wallpapers added yet":
          "У вас пока что нет добавленных обоев",
        "No such wallpapers found": "Такие обои не найдены",

        "Invalid video format": "Неправильный формат видео",
        "Drop or select video": "Перетащите сюда видео или выберите его",
        Title: "Название",

        "Wallpaper behavior": "Поведение обоев",
        "Apps in the foreground": "Приложения на переднем плане",
        "If there is an application that is in the foreground":
          "Если есть приложение, которое находится на переднем плане",

        "Maximized apps": "Развернутые приложения",
        "If there is an maximized application":
          "Если есть развернутое приложение",

        "Apps in the fullscreen": "Приложения в полноэкранном режиме",
        "If there is an application that is in the fullscreen":
          "Если есть приложение, которое в полноэкранном режиме",

        "Window in the foreground": "Окно на переднем плане",
        "If there is a window that is in the foreground":
          "If there is a window that is in the foreground",

        "Maximized window": "Maximized window",
        "If there is a maximized window": "If there is a maximized window",

        "Window in the fullscreen": "Window in the fullscreen",
        "If there is a window that is in the fullscreen":
          "If there is a window that is in the fullscreen",
        Volume: "Громкость",
        "General volume": "Общая громкость",
        "General volume for all wallpapers": "Общая громкость для всех обоев",

        General: "Основные",
        Autolaunch: "Автозапуск",
        "Launch app with system to enable wallpapers":
          "Запускать приложение с системой, чтобы включить обои",

        "Color theme": "Цветовая тема",
        "App color theme": "Цветовая тема приложения",

        Language: "Язык",
        "App language": "Язык приложения",

        "Path to wallpapers folder": "Путь к папке с обоями",
        "Path to the folder where the wallpapers are stored":
          "Путь к папке, в которой хранятся обои",

        Speed: "Скорость",
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

listen("change-language", (ev: { payload: string }) => {
  ev.payload = ev.payload !== "system" ? ev.payload : navigator.language;
  i18next.changeLanguage(ev.payload);
});
