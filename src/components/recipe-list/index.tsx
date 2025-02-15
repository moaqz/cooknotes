/* eslint-disable @stylistic/jsx-closing-tag-location */
import { useEffect, useState } from "preact/hooks";
import { BaseDirectory } from "@tauri-apps/api/path";
import { exists, readTextFile } from "@tauri-apps/plugin-fs";
import styles from "./recipe-list.module.css";
import { Spinner } from "~/components/spinner";
import { Registery } from "~/types";
import { REGISTERY_FILE } from "~/constants";

export function RecipeList() {
  const [registery, setRegistery] = useState<Registery>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchRegistery = async () => {
      setIsLoading(true);

      const hasRegistery = await exists(REGISTERY_FILE, {
        baseDir: BaseDirectory.AppLocalData,
      });

      if (!hasRegistery) {
        setRegistery([]);
        setIsLoading(false);
        return;
      }

      const data = await readTextFile(REGISTERY_FILE, {
        baseDir: BaseDirectory.AppLocalData,
      });

      setRegistery(JSON.parse(data));
      setIsLoading(false);
    };

    fetchRegistery();
  }, []);

  const filteredRecipes = registery.filter((recipe) => {
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
