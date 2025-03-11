import { RecipeForm } from "~/components/recipe-form";

import { listRecipes, writeJSONFile } from "~/lib/fs";
import { Recipe } from "~/types";
import { toKebabCase } from "~/lib/strings";

import { toast } from "@moaqzdev/toast";
import { useLocation } from "preact-iso";
import { RECIPES_UPDATED_EVENT } from "~/constants";
import { emit } from "@tauri-apps/api/event";

export function NewRecipeView() {
  const location = useLocation();

  return (
    <RecipeForm
      handleOnSubmit={async (data) => {
        const recipeIdentifier = toKebabCase(data.name);
        const recipe: Recipe = {
          ...data,
          created_at: new Date().toISOString(),
        };

        const recipeEntries = await listRecipes("recipes");
        const fileExists = recipeEntries.find((entry) => entry.id === recipeIdentifier);
        if (fileExists) {
          toast.error({
            title: "Nombre de receta en uso",
            description: "El nombre que intentas usar ya corresponde a una receta existente. Por favor, elige otro nombre.",
            duration: 8000,
          });
          return;
        }

        try {
          await writeJSONFile<Recipe>(`recipes/${recipeIdentifier}.json`, recipe);
          toast.success({
            title: "Receta creada",
            description: "La receta ha sido guardada exitosamente.",
            duration: 8000,
          });
          await emit(RECIPES_UPDATED_EVENT);
          location.route(`/recipes/${recipeIdentifier}`);
        } catch (e) {
          toast.error({
            title: "Error al crear la receta",
            description: "Hubo un problema al intentar crear la receta.",
            duration: 8000,
          });
        }
      }}
    />
  );
}
