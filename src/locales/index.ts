export const SUPPORTED_LANGUAGES = {
  "es": {
    "file": "es.json",
    "name": "Español"
  },
  "en": {
    "file": "en.json",
    "name": "English"
  }
};

export type Language = keyof typeof SUPPORTED_LANGUAGES;

export type LanguageLocale = {
  settings: {
    general: string
    general_description: string
    accent_color: {
      text: string
      options: {
        blue: string
        cyan: string
        green: string
        purple: string
        red: string
        yellow: string
      }
    }
    theme: {
      text: string
      options: {
        dark: string
        light: string
        system: string
      }
    }
    appearance: string
    appearance_description: string
  }
  navigation: {
    settings: string
    back: {
      aria: string
    }
    forward: {
      aria: string
    }
    new_recipe: {
      aria: string
    }
  }
};
