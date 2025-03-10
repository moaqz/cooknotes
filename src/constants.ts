/**
 * Index file containing the recipe registry.
 */
export const REGISTERY_FILE = "registery.json";

export const DEFAULT_RECIPE_FORM_VALUES = {
  steps: [
    { id: crypto.randomUUID(), description: "", images: [] },
  ],
  ingredients: [],
  name: "",
  main_image: "",
  cooking_time: 0,
};
