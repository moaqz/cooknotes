/* eslint-disable camelcase */
import { toast } from "@moaqzdev/toast";
import { useLocation, useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { parseAsync, ValiError } from "valibot";
import { RecipeScheme } from "~/lib/schemas";
import { fileSystemService, imageService, recipesService } from "~/services/index";
import { Recipe } from "~/types";
import { useTranslation } from "./use-translation";

interface UseRecipeOptions {
  normalizeImage?: boolean;
}

async function processMainImage(normalize: boolean, imagePath?: string) {
  if (!normalize) {
    return imagePath;
  }

  return imagePath
    ? await imageService.getImageUrl(imagePath)
    : "/illustrations/food-placeholder.webp";
}

export function useRecipe(props: UseRecipeOptions = {}) {
  const { normalizeImage = false } = props;
  const { route } = useLocation();
  const { id } = useRoute().params;
  const t = useTranslation();
  const [recipeState, setRecipeState] = useState<Recipe | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const path = recipesService.getRecipePath(id);
        const recipe = await fileSystemService.readFile<Recipe>(path);
        const main_image = await processMainImage(
          normalizeImage,
          recipe.data.main_image
        );

        await parseAsync(RecipeScheme, recipe);
        setRecipeState({
          data: {
            ...recipe.data,
            main_image,
          },
          metadata: {
            ...recipe.metadata
          }
        });
        setIsFetching(false);
      } catch (e) {
        if (e instanceof ValiError) {
          toast.error({
            title: t("toasts.recipe_unexpected_format.title"),
            description: t("toasts.recipe_unexpected_format.description"),
            duration: 8000,
          });
        }
        setIsFetching(false);
        route("/not-found");
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipeState, isFetching };
}
