import translationIT from './it/translations.json';
import translationEN from './en/translations.json';
import translationDE from './de/translations.json';
import { Languages } from './translations';

export const lang: Languages = {
  it: {
    label: 'Italiano',
    lang: 'it-IT',
    it: 'Italano',
    en: 'Inglese',
    de: 'Tedesco',
    translation: translationIT,
  },
  en: {
    label: 'English',
    it: 'Italian',
    en: 'English',
    de: 'German',
    lang: 'en-EN',
    translation: translationEN,
  },
  de: {
    label: 'Deutsch',
    it: 'Italienisch',
    en: 'Englisch',
    de: 'Deutsch',
    lang: 'de-DE',
    translation: translationDE,
  },
};
