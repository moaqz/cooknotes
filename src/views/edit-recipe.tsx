import { toast } from "@moaqzdev/toast/utils";
import { emit } from "@tauri-apps/api/event";
import { useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { RecipeForm } from "~/components/recipe-form";
import { RECIPES_UPDATED_EVENT } from "~/constants";
import { useRecipe } from "~/hooks/use-recipe";
import { useTranslation } from "~/hooks/use-translation";
import { fileSystemService, recipesService } from "~/services/index";
import { toKebabCase } from "~/lib/strings";
import { Recipe } from "~/types";

export function EditRecipeView() {
  const { recipeState, isFetching } = useRecipe();
  const location = useLocation();
  const t = useTranslation();

  useEffect(() => {
    if (!isFetching && !recipeState) {
      location.route("/not-found");
    }
  }, [isFetching]);

  if (isFetching || !recipeState) {
    return null;
  }

  return (
    <RecipeForm
      primaryButtonText={{
        loading: t("common.actions.edit_recipe.loading"),
        default: t("common.actions.edit_recipe.default")
      }}
      data={recipeState.data}
      handleOnSubmit={async (data) => {
        const hasNameChanged = recipeState.data.name !== data.name;
        const newFilePath = recipesService.getRecipePath(data.name);
        const oldFilePath = recipesService.getRecipePath(recipeState.data.name);

        if (hasNameChanged) {
          try {
            await fileSystemService.renameFile(oldFilePath, newFilePath);
            await emit(RECIPES_UPDATED_EVENT);
            toast.success({
              title: t("toasts.recipe_name_updated.title"),
              description: t("toasts.recipe_name_updated.description"),
              duration: 8000,
            });
          } catch (e) {
            toast.error({
              title: t("toasts.recipe_name_not_updated.title"),
              description: t("toasts.recipe_name_not_updated.description"),
              duration: 8000,
            });
            return;
          }
        }

        try {
          await fileSystemService.writeFile<Recipe>(newFilePath, {
            data,
            metadata: {
              ...recipeState.metadata,
              updated_at: new Date().toISOString(),
            }
          });

          await emit(RECIPES_UPDATED_EVENT);
          toast.success({
            title: t("toasts.recipe_updated.title"),
            description: t("toasts.recipe_updated.description"),
            duration: 8000,
          });

          location.route(`/recipes/${toKebabCase(data.name)}`);
        } catch (_) {
          toast.error({
            title: t("toasts.recipe_not_updated.title"),
            description: t("toasts.recipe_not_updated.description"),
            duration: 8000,
          });
        }
      }}
    />
  );
}
