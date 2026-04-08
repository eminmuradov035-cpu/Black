import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import az from "./az.json";
import ru from "./ru.json";
import de from "./de.json";

const LANGUAGE_STORAGE_KEY = "black-language";
const initialLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      az: {
        translation: az,
      },
      ru: {
        translation: ru,
      },
      de: {
        translation: de,
      },
    },
    lng: initialLanguage,
    fallbackLng: "en",
    supportedLngs: ["en", "az", "ru", "de"],
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;