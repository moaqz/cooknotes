export type RegisteryItem = {
  /**
   * Unique identifier of the recipe.
   */
  id: string;
  /**
   * Name of the recipe, used for listing it.
   */
  name: string;
};

export type Registery = RegisteryItem[];

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
