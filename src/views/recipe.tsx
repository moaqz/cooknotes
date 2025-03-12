import { toast } from "@moaqzdev/toast";
import styles from "./recipe.module.css";
import { useLocation, useRoute } from "preact-iso";
import { useEffect } from "preact/hooks";
import { useRecipe } from "~/hooks/useRecipe";
import { deleteFile, getRecipePath } from "~/lib/fs";
import { emit } from "@tauri-apps/api/event";
import { RECIPES_UPDATED_EVENT } from "~/constants";

export function RecipeView() {
  const { recipeState, isFetching } = useRecipe({ normalizeImage: true });
  const { id } = useRoute().params;
  const location = useLocation();

  useEffect(() => {
    if (!isFetching && !recipeState) {
      location.route("/not-found");
    }
  }, [isFetching]);

  if (isFetching || !recipeState) {
    return null;
  }

  const formattedDate = new Intl.DateTimeFormat("es", {
    dateStyle: "full",
  }).format(new Date(recipeState.metadata.created_at));

  const deleteRecipe = () => {
    toast.confirm({
      title: "Eliminar receta",
      description:
        "¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          const filePath = getRecipePath(recipeState.data.name);
          await deleteFile(filePath);
          toast.success({
            title: "Receta eliminada",
            description: "La receta ha sido eliminada correctamente.",
            duration: 8000,
          });
          await emit(RECIPES_UPDATED_EVENT);
          location.route("/");
        } catch (e) {
          toast.error({
            title: "Error al eliminar",
            description: "Hubo un problema al eliminar la receta.",
            duration: 8000,
          });
        }
      },
      duration: "none",
    });
  };

  return (
    <>
      <section class={styles.container}>

        <div class={styles.leftSection}>
          <img
            class={styles.recipeImage}
            src={recipeState.data.main_image}
            alt={recipeState.data.name || "placeholder"}
          />

          <div class={styles.contentGroup}>
            <h2>Ingredientes</h2>

            {recipeState.data.ingredients?.map((section, idx) => (
              <div key={section.section_name || idx} class={styles.ingredientsGroup}>
                {section.section_name ? <h3>{section.section_name}</h3> : null}

                <ul>
                  {section.ingredients?.map((item, idx) => (
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
              {recipeState.data.name}
            </h1>

            <div class={styles.recipeMeta}>
              <time datetime={recipeState.metadata.created_at}>{formattedDate}</time>

              {recipeState.data.cooking_time > 0
                ? <>
                  <span role="separator">·</span>
                  <p>{recipeState.data.cooking_time} minutos</p>
                </>
                : null}
            </div>
          </div>

          <div class={styles.contentGroup}>
            <h2>Paso a Paso</h2>

            <ol class={styles.stepsList}>
              {recipeState.data.steps?.map((item, idx) => (
                <li key={idx} class={styles.step}>
                  {item.description}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer class={styles.actions}>
        <a href={`/recipes/${id}/edit`} class="btn">
          <svg width="20" height="20" aria-hidden="true">
            <use href="/recipe.svg#pencil" />
          </svg>
          Editar receta
        </a>

        <button
          class="btn btn-danger"
          onClick={deleteRecipe}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/recipe.svg#trash" />
          </svg>
          Borrar
        </button>
      </footer>
    </>
  );
}
