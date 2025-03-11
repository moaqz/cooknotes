import { useLocation, useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { Recipe } from "~/types";

import styles from "./recipe.module.css";
import { getLocalImage } from "~/lib/image";
import { readJSONFile } from "~/lib/fs";

export function RecipeView() {
  const { route } = useLocation();
  const { id } = useRoute().params;
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const path = `recipes/${id}.json`;
        const recipe = await readJSONFile<Recipe>(path);
        setRecipeData({
          ...recipe,
          "main_image": recipe.main_image
            ? await getLocalImage(recipe.main_image)
            : "/illustrations/food-placeholder.webp"
        });
      } catch (e) {
        route("/not-found");
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipeData) {
    return;
  }

  const formattedDate = new Intl.DateTimeFormat("es", {
    dateStyle: "full",
  }).format(new Date(recipeData.created_at));

  return (
    <>
      <section class={styles.container}>

        <div class={styles.leftSection}>
          <img
            class={styles.recipeImage}
            src={recipeData.main_image}
            alt={recipeData.name || "placeholder"}
          />

          <div class={styles.contentGroup}>
            <h2>Ingredientes</h2>

            {recipeData.ingredients?.map((section, idx) => (
              <div key={section.section_name || idx} class={styles.ingredientsGroup}>
                {section.section_name ? <h3>{section.section_name}</h3> : null}

                <ul>
                  {section.ingredients.map((item, idx) => (
                    <li key={idx} class={styles.ingredient}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div class={styles.rightSection}>
          <div>
            <h1>
              {recipeData.name}
            </h1>

            <div class={styles.recipeMeta}>
              <time datetime={recipeData.created_at}>{formattedDate}</time>

              {recipeData.cooking_time > 0
                ? <>
                  <span role="separator">·</span>
                  <p>{recipeData.cooking_time} minutos</p>
                </>
                : null}
            </div>
          </div>

          <div class={styles.contentGroup}>
            <h2>Paso a Paso</h2>

            <ol class={styles.stepsList}>
              {recipeData.steps.map((item, idx) => (
                <li key={idx} class={styles.step}>
                  {item.description}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer class={styles.actions}>
        <a href={`/edit/${id}`} class="btn">
          <svg width="20" height="20" aria-hidden="true">
            <use href="/recipe.svg#pencil" />
          </svg>
          Editar receta
        </a>

        <button class="btn">
          <svg width="20" height="20" aria-hidden="true">
            <use href="/recipe.svg#printer" />
          </svg>
          Imprimir
        </button>

        <button class="btn btn-danger">
          <svg width="20" height="20" aria-hidden="true">
            <use href="/recipe.svg#trash" />
          </svg>
          Borrar
        </button>
      </footer>
    </>
  );
}
