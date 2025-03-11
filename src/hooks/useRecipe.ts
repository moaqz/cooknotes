/* eslint-disable camelcase */
import { useLocation, useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { readJSONFile } from "~/lib/fs";
import { getLocalImage } from "~/lib/image";
import { Recipe } from "~/types";

interface Props {
  normalizeImage?: boolean;
}

export function useRecipe(props: Props = {}) {
  const { normalizeImage } = props;
  const { route } = useLocation();
  const { id } = useRoute().params;
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const path = `recipes/${id}.json`;
        const recipe = await readJSONFile<Recipe>(path);

        const main_image = normalizeImage
          ? recipe.main_image
            ? await getLocalImage(recipe.main_image)
            : "/illustrations/food-placeholder.webp"
          : recipe.main_image;

        setRecipeData({
          ...recipe,
          main_image
        });
        setIsFetching(false);
      } catch (e) {
        setIsFetching(false);
        route("/not-found");
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipeData, isFetching };
}
