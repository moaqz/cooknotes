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
