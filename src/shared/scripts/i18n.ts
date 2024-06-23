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
        Window: "Window",
        "If there is an active window": "If there is an active window",

        "Maximized window": "Maximized window",
        "If there is an active maximized window":
          "If there is an active maximized window",

        "Fullscreen window": "Fullscreen window",
        "If there is an active fullscreen window":
          "If there is an active fullscreen window",

        Nothing: "Nothing",
        Mute: "Mute",
        Pause: "Pause",

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
        Window: "Окно",
        "If there is an active window": "Если есть активное окно",

        "Maximized window": "Развернутое окно",
        "If there is an active maximized window":
          "Если есть активное развернутое окно",

        "Fullscreen window": "Полноэкранное окно",
        "If there is an active fullscreen window":
          "Если есть активное полноэкранное окно",

        Nothing: "Ничего",
        Mute: "Заглушить",
        Pause: "Приостановить",

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

window.ipcRenderer.on("language:change-language", (_e, payload: string) => {
  payload = payload !== "system" ? payload : navigator.language;
  i18next.changeLanguage(payload);
});
