export type Translation = typeof import('./it/translations.json');

export interface Languages {
  [key: 'it' | 'en' | 'de']: {
    label: string;
		it: string;
		en: string;
		de: string;
    lang: string;
    translation: Translation;
  };
}
