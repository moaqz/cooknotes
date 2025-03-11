/**
 * Index file containing the recipe registry.
 */
export const REGISTERY_FILE = "registery.json";

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
