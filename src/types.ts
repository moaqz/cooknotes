import { ToasterAttributes } from "@moaqzdev/toast";

declare global {
  namespace preact.JSX {
    interface IntrinsicElements {
      "moaqz-toaster": Partial<ToasterAttributes>;
    }
  }
}

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
  description: string;
};

export type IngredientSection = {
  section_name?: string;
  ingredients: string[];
};

export type Recipe = {
  data: {
    name: string;
    steps?: RecipeStep[];
    ingredients?: IngredientSection[];
    main_image?: string;
    /* Estimated cooking time in minutes. */
    cooking_time: number;
  };
  metadata: {
    created_at: string;
    updated_at?: string;
  };
};

export type RecipeFormData = Recipe["data"];
