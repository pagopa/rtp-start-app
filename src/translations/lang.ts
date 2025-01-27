import translationIT from "./it/translations.json";
import translationEN from "./en/translations.json";
import translationDE from "./de/translations.json";
import { Languages } from "./translations";

const lang: Languages = {
  it: {
    label: "Italiano",
    lang: "it-IT",
    translation: translationIT,
  },
  en: {
    label: "English",
    lang: "en-EN",
    translation: translationEN,
  },
  de: {
    label: "Deutsch",
    lang: "de-DE",
    translation: translationDE,
  },
};

export default lang;
