import { toast } from "@moaqzdev/toast";
import styles from "./recipe.module.css";
import { useLocation, useRoute } from "preact-iso";
import { useEffect } from "preact/hooks";
import { useRecipe } from "~/hooks/use-recipe";
import { fileSystemService, recipesService } from "~/services/index";
import { emit } from "@tauri-apps/api/event";
import { RECIPES_UPDATED_EVENT } from "~/constants";
import { useTranslation } from "~/hooks/use-translation";
import { useSetting } from "~/hooks/use-config";

export function RecipeView() {
  const { recipeState, isFetching } = useRecipe({ normalizeImage: true });
  const { id } = useRoute().params;
  const location = useLocation();
  const t = useTranslation();
  const [currentLocale] = useSetting("language");

  useEffect(() => {
    if (!isFetching && !recipeState) {
      location.route("/not-found");
    }
  }, [isFetching]);

  if (isFetching || !recipeState) {
    return null;
  }

  const formattedDate = new Intl.DateTimeFormat(currentLocale, {
    dateStyle: "full",
  }).format(new Date(recipeState.metadata.created_at));

  const deleteRecipe = () => {
    toast.confirm({
      title: t("toasts.recipe_removal_confirmation.title"),
      description: t("toasts.recipe_removal_confirmation.description"),
      confirmText: t("toasts.recipe_removal_confirmation.confirm_text"),
      cancelText: t("toasts.recipe_removal_confirmation.cancel_text"),
      onConfirm: async () => {
        try {
          const filePath = recipesService.getRecipePath(recipeState.data.name);
          await fileSystemService.deleteFile(filePath);
          toast.success({
            title: t("toasts.recipe_removed.title"),
            description: t("toasts.recipe_removed.description"),
            duration: 8000,
          });
          await emit(RECIPES_UPDATED_EVENT);
          location.route("/");
        } catch (e) {
          toast.error({
            title: t("toasts.recipe_not_removed.title"),
            description: t("toasts.recipe_not_removed.description"),
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
            alt={recipeState.data.name}
          />

          {recipeState.data.ingredients
            ? <div class={styles.contentGroup}>
              <h2>{t("common.ingredients")}</h2>

              {recipeState.data.ingredients.map((section, idx) => (
                <div
                  key={section.section_name || idx}
                  class={styles.ingredientsGroup}
                >
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
            : null}
        </div>

        <div class={styles.rightSection}>
          <div>
            <h1>{recipeState.data.name}</h1>

            <div class={styles.recipeMeta}>
              <time datetime={recipeState.metadata.created_at}>
                {formattedDate}
              </time>

              {recipeState.data.cooking_time > 0
                ? (
                  <>
                    <span role="separator">·</span>
                    <p>{recipeState.data.cooking_time} minutos</p>
                  </>)
                : null}
            </div>
          </div>

          {recipeState.data.steps
            ? <div class={styles.contentGroup}>
              <h2>{t("common.steps")}</h2>

              <ol class={styles.stepsList}>
                {recipeState.data.steps.map((item, idx) => (
                  <li key={idx} class={`${styles.step} numbered`}>
                    {item.description}
                  </li>
                ))}
              </ol>
            </div>
            : null}
        </div>
      </section>

      <footer class={styles.actions}>
        <a href={`/recipes/${id}/edit`} class="btn">
          <svg width="20" height="20" aria-hidden="true">
            <use href="/ui.svg#pencil" />
          </svg>
          {t("common.actions.edit")}
        </a>

        <button class="btn btn-danger" onClick={deleteRecipe}>
          <svg width="20" height="20" aria-hidden="true">
            <use href="/ui.svg#trash" />
          </svg>
          {t("common.actions.delete")}
        </button>
      </footer>
    </>
  );
}
