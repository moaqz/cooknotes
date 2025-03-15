/* eslint-disable camelcase */
import { useLocation, useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { readJSONFile } from "~/lib/fs";
import { getLocalImage } from "~/lib/image";
import { Recipe } from "~/types";

interface UseRecipeOptions {
  normalizeImage?: boolean;
}

async function processMainImage(normalize: boolean, imagePath?: string) {
  if (!normalize) {
    return imagePath;
  }

  return imagePath
    ? await getLocalImage(imagePath)
    : "/illustrations/food-placeholder.webp";
}

export function useRecipe(props: UseRecipeOptions = {}) {
  const { normalizeImage = false } = props;
  const { route } = useLocation();
  const { id } = useRoute().params;
  const [recipeState, setRecipeState] = useState<Recipe | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const path = `recipes/${id}.json`;
        const recipe = await readJSONFile<Recipe>(path);
        const main_image = await processMainImage(
          normalizeImage,
          recipe.data.main_image
        );

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
        setIsFetching(false);
        route("/not-found");
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipeState, isFetching };
}
