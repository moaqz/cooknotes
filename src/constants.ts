export const DEFAULT_RECIPE_FORM_VALUES = {
  steps: [{ description: "", images: [] }],
  ingredients: [],
  name: "",
  main_image: "",
  cooking_time: 0,
};

export const RECIPES_UPDATED_EVENT = "recipes-updated";

export const SETTINGS_KEY = "cooknotes.settings";

export const ACCENTS = [
  "red",
  "cyan",
  "purple",
  "yellow",
  "green",
  "blue",
] as const;
