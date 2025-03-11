import styles from "./recipe-list.module.css";

import { useEffect, useState } from "preact/hooks";
import { Spinner } from "~/components/spinner";
import { RecipeEntries } from "~/types";
import { listRecipes } from "~/lib/fs";

export function RecipeList() {
  const [recipes, setRecipes] = useState<RecipeEntries>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchRegistery = async () => {
      setIsLoading(true);
      const data = await listRecipes("recipes").catch(() => []);
      setRecipes(data);
      setIsLoading(false);
    };

    fetchRegistery();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });

  const hasRecipes = filteredRecipes.length > 0;

  return (
    <div class={styles.container}>
      <h3 class={styles.title}>Recetas</h3>

      <input
        type="search"
        placeholder="Buscar..."
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
      />

      {isLoading
        ? <Spinner />
        : (
          <ul class={styles.recipeList}>
            {hasRecipes
              ? (
                  filteredRecipes.map((item) => (
                    <li key={item.id}>
                      <a href={`/recipes/${item.id}`} class={styles.recipeItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24">
                          <use href="/ui.svg#hash" />
                        </svg>
                        {item.name}
                      </a>
                    </li>
                  ))
                )
              : <p class={styles.notFoundMessage}>
                Aún no tienes recetas {query ? <>de <span>{query}</span></> : null} en tu colección.
              </p>}
          </ul>
          )}
    </div>
  );
}
