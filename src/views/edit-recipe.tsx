import { toast } from "@moaqzdev/toast";
import { emit } from "@tauri-apps/api/event";
import { useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { RecipeForm } from "~/components/recipe-form";
import { RECIPES_UPDATED_EVENT } from "~/constants";
import { useRecipe } from "~/hooks/useRecipe";
import { getRecipePath, renameFile, writeJSONFile } from "~/lib/fs";
import { toKebabCase } from "~/lib/strings";
import { Recipe, RecipeFormData } from "~/types";

export function EditRecipeView() {
  const { recipeData, isFetching } = useRecipe();
  const location = useLocation();

  useEffect(() => {
    if (!isFetching && !recipeData) {
      location.route("/not-found");
    }
  }, [isFetching]);

  if (isFetching || !recipeData) {
    return null;
  }

  return (
    <RecipeForm
      primaryButtonText={{
        default: "Actualizar",
        loading: "Actualizando..."
      }}
      data={recipeData as RecipeFormData}
      handleOnSubmit={async (data) => {
        const hasNameChanged = recipeData.name !== data.name;
        const newFilePath = getRecipePath(data.name);
        const oldFilePath = getRecipePath(recipeData.name);

        if (hasNameChanged) {
          try {
            await renameFile(oldFilePath, newFilePath);
            await emit(RECIPES_UPDATED_EVENT);
            toast.success({
              title: "Nombre de receta actualizado",
              description: "El nombre de la receta se ha actualizado correctamente.",
              duration: 8000,
            });
          } catch (e) {
            toast.error({
              title: "Error al renombrar la receta",
              description: "Hubo un problema al cambiar el nombre del archivo.",
              duration: 8000,
            });
            return;
          }
        }

        try {
          await writeJSONFile<Recipe>(newFilePath, {
            ...data,
            created_at: recipeData.created_at
          });

          await emit(RECIPES_UPDATED_EVENT);
          toast.success({
            title: "Receta actualizada",
            description: "La receta se ha actualizado correctamente.",
            duration: 8000,
          });

          location.route(`/recipes/${toKebabCase(data.name)}`);
        } catch (_) {
          toast.error({
            title: "Error al actualizar receta",
            description: "Hubo un problema al guardar la receta.",
            duration: 8000,
          });
        }
      }}
    />
  );
}
