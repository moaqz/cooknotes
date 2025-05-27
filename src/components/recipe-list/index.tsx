import styles from "./recipe-list.module.css";

import { useEffect, useState } from "preact/hooks";
import { Spinner } from "~/components/spinner";
import { RecipeEntries } from "~/types";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { RECIPES_UPDATED_EVENT } from "~/constants";
import { useLocation } from "preact-iso";
import { useTranslation } from "~/hooks/use-translation";
import { recipesService } from "~/services/index";

export function RecipeList() {
  const [recipes, setRecipes] = useState<RecipeEntries>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [query, setQuery] = useState("");
  const { path: currentPath } = useLocation();
  const t = useTranslation();

  const fetchRecipes = async () => {
    setIsLoading(true);
    setIsRefetching(true);
    const data = await recipesService.list().catch(() => []);
    setRecipes(data);
    setIsLoading(false);
    setIsRefetching(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    let unlisten: UnlistenFn | undefined;

    listen(RECIPES_UPDATED_EVENT, () => fetchRecipes())
      .then((fn) => { unlisten = fn; });

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });

  const hasRecipes = filteredRecipes.length > 0;

  return (
    <div class={styles.container}>
      <h3 class={styles.title}>{t("common.recipes")}</h3>

      <input
        type="search"
        placeholder={t("common.search.placeholder")}
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
      />

      {isLoading || isRefetching
        ? <Spinner />
        : (
          <ul class={styles.recipeList}>
            {hasRecipes
              ? (
                  filteredRecipes.map((item) => {
                    const recipePath = `/recipes/${item.id}`;
                    const isActive = decodeURIComponent(recipePath) === decodeURIComponent(currentPath);

                    return (
                      <li key={item.id}>
                        <a href={recipePath} class={styles.recipeItem} data-selected={isActive}>
                          <svg width="14" height="14" viewBox="0 0 24 24">
                            <use href="/ui.svg#hash" />
                          </svg>
                          {item.name}
                        </a>
                      </li>
                    );
                  })
                )
              : <p class={styles.notFoundMessage}>{t("common.search.no_matches_found")}</p>}
          </ul>
          )}
    </div>
  );
}
