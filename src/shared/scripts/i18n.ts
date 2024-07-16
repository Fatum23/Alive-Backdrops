import i18next from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        Library: "Library",
        Add: "Add",
        Active: "Active",
        Settings: "Settings",
        Back: "Back",
        Apply: "Apply",
        Reset: "Reset",
        Loading: "Loading wallpapers...",
        "No such wallpapers found": "No such wallpapers found",
        "You have no wallpapers added yet": "You have no wallpapers added yet",

        "Add wallpaper": "Add wallpaper",
        "Invalid wallpaper file extension": "Invalid wallpaper file extension",
        "Drop or select file": "Drop or select file",
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

        System: "System",
        Light: "Light",
        Dark: "Dark",
        Custom: "Custom",

        Ru: "Russian",
        En: "English",

        Volume: "Volume",
        "General volume": "General volume",
        "General volume for all wallpapers":
          "General volume for all wallpapers",

        General: "General",
        Autolaunch: "Autolaunch",
        "Launch app with system to enable wallpapers":
          "Launch app with system to enable wallpapers",

        "Customize theme": "Customize theme",
        "Color theme": "Color theme",
        "App color theme": "App color theme",

        Language: "Language",
        "App language": "App language",

        "Open in explorer": "Open in explorer",
        "Path to wallpapers folder": "Path to wallpapers folder",
        "Path to the folder where the wallpapers are stored":
          "Path to the folder where the wallpapers are stored",

        Speed: "Speed",

        Ok: "Ok",
        Cancel: "Cancel",

        Background: "Background",
        Text: "Text",
        Primary: "Primary",
        Secondary: "Secondary",
        Accent: "Accent",
        "Accent hover": "Accent hover",
        "Links color": "Links color",
      },
    },
    ru: {
      translation: {
        Library: "Библиотека",
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

        "Add wallpaper": "Добавить обои",
        "Invalid wallpaper file extension": "Неверное расширение файла обоев",
        "Drop or select file": "Перетащите или выберите файл",
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

        System: "Система",
        Light: "Светлая",
        Dark: "Тёмная",
        Custom: "Пользовательская",

        Ru: "Русский",
        En: "English",

        Volume: "Громкость",
        "General volume": "Общая громкость",
        "General volume for all wallpapers": "Общая громкость для всех обоев",

        General: "Основные",
        Autolaunch: "Автозапуск",
        "Launch app with system to enable wallpapers":
          "Запускать приложение с системой, чтобы включить обои",

        "Customize theme": "Настроить тему",
        "Color theme": "Цветовая тема",
        "App color theme": "Цветовая тема приложения",

        Language: "Язык",
        "App language": "Язык приложения",

        "Open in explorer": "Открыть в проводнике",
        "Path to wallpapers folder": "Путь к папке с обоями",
        "Path to the folder where the wallpapers are stored":
          "Путь к папке, в которой хранятся обои",

        Speed: "Скорость",

        Ok: "Ок",
        Cancel: "Отмена",

        Background: "Задний фон",
        Text: "Текст",
        Primary: "Основной",
        Secondary: "Вторичный",
        Accent: "Акцентный",
        "Accent hover": "Акцентный при наведении",
        "Links color": "Цвет ссылок",
      },
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
