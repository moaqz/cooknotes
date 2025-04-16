import { Theme } from "./types";

export const DEFAULT_RECIPE_FORM_VALUES = {
  steps: [
    { description: "", images: [] },
  ],
  ingredients: [],
  name: "",
  main_image: "",
  cooking_time: 0,
};

export const RECIPES_UPDATED_EVENT = "recipes-updated";

export const THEME_LABELS: Record<Theme, string> = {
  system: "Sistema",
  light: "Claro",
  dark: "Oscuro",
};

export const SETTINGS_KEY = "cooknotes.settings";
