import { RecipeForm } from "~/components/recipe-form";

import { listRecipes, writeJSONFile } from "~/lib/fs";
import { Recipe } from "~/types";
import { toKebabCase } from "~/lib/strings";

import { toast } from "@moaqzdev/toast";
import { useLocation } from "preact-iso";
import { RECIPES_UPDATED_EVENT } from "~/constants";
import { emit } from "@tauri-apps/api/event";
import { useTranslation } from "~/hooks/use-translation";

export function NewRecipeView() {
  const location = useLocation();
  const t = useTranslation();

  return (
    <RecipeForm
      handleOnSubmit={async (data) => {
        const recipeIdentifier = toKebabCase(data.name);
        const recipe: Recipe = {
          data,
          metadata: {
            created_at: new Date().toISOString(),
          },
        };

        const recipeEntries = await listRecipes("recipes").catch(() => []);
        const fileExists = recipeEntries.find((entry) => {
          return entry.id === recipeIdentifier;
        });

        if (fileExists) {
          toast.error({
            title: t("toasts.recipe_name_taken.title"),
            description: t("toasts.recipe_name_taken.description"),
            duration: 8000,
          });
          return;
        }

        try {
          await writeJSONFile<Recipe>(
            `recipes/${recipeIdentifier}.json`,
            recipe
          );
          toast.success({
            title: t("toasts.recipe_created.title"),
            description: t("toasts.recipe_created.description"),
            duration: 8000,
          });
          await emit(RECIPES_UPDATED_EVENT);
          location.route(`/recipes/${recipeIdentifier}`);
        } catch (e) {
          toast.error({
            title: t("toasts.recipe_not_created.title"),
            description: t("toasts.recipe_not_created.description"),
            duration: 8000,
          });
        }
      }}
    />
  );
}
