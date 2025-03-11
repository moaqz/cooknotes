export type RecipeEntry = {
  /**
   * Unique identifier of the recipe, derived from the filename in kebab case.
   *
   * @example "chocolate-cake.json" -> "chocolate-cake"
   */
  id: string;
  /**
   * Name of the recipe, used for listing it.
   *
   * @example "chocolate-cake.json" -> "Chocolate cake"
   */
  name: string;
};

export type RecipeEntries = RecipeEntry[];

export type RecipeStep = {
  /**
   * Description of the step in the recipe.
   */
  description: string;
  /**
   * Array of image URLs related to this step.
   */
  images: string[];
};

export type IngredientSection = {
  section_name?: string;
  ingredients: string[];
};

export type Recipe = {
  name: string;
  main_image: string;
  /**
   * Estimated cooking time in minutes.
   */
  cooking_time: number;
  /**
   * ISO 8601 timestamp of when the recipe was created.
   */
  created_at: string;
  ingredients: IngredientSection[];
  steps: RecipeStep[];
};

export type RecipeFormData = {
  steps: RecipeStep[];
  ingredients: IngredientSection[];
  name: string;
  main_image: string;
  cooking_time: number;
};
