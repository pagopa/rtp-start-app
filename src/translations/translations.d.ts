export type Translation = typeof import("./it/translations.json");

export interface Languages {
  [key: string]: {
    label: string;
    lang: string;
    translation: Translation;
  };
}
