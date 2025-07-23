import styles from "./ingredients.module.css";

import { FormStore, FieldArray, Field, insert, remove } from "@modular-forms/preact";
import { useTranslation } from "~/hooks/use-translation";

import { RecipeFormData } from "~/types";

interface IngredientsProps {
  of: FormStore<RecipeFormData>;
}

export function Ingredients(props: IngredientsProps) {
  const { of: store } = props;
  const t = useTranslation();

  const addSection = () => {
    const newIngredient = {
      ingredients: [""],
      section_name: "",
      id: crypto.randomUUID()
    };
    insert(store, "ingredients", { value: newIngredient });
  };

  const removeSection = (idx: number) => {
    remove(store, "ingredients", { at: idx });
  };

  const addIngredient = (sectionIdx: number) => {
    insert(store, `ingredients.${sectionIdx}.ingredients`, { value: "" });
  };

  const removeIngredient = (sectionIdx: number, ingredientIdx: number) => {
    remove(store, `ingredients.${sectionIdx}.ingredients`, { at: ingredientIdx });
  };

  return (
    <div class={styles.ingredientForm}>
      <FieldArray of={store} name="ingredients">
        {(sections) => sections.items.value.map((section, sectionIdx) => (
          <div key={section} class={styles.ingredientSection}>
            <Field of={store} name={`ingredients.${sectionIdx}.section_name`}>
              {(field, props) => (
                <input
                  id={field.name}
                  type="text"
                  class="textField"
                  placeholder={t("common.section_placeholder")}
                  aria-label={t("common.section_label")}
                  value={field.value}
                  {...props}
                />
              )}
            </Field>

            <ul class={styles.ingredientsList}>
              <FieldArray of={store} name={`ingredients.${sectionIdx}.ingredients`}>
                {(ingredients) => ingredients.items.value.map((ingredient, ingredientIdx) => (
                  <li key={ingredient} class={styles.ingredient}>
                    <Field of={store} name={`ingredients.${sectionIdx}.ingredients.${ingredientIdx}`}>
                      {(field, props) => (
                        <input
                          id={field.name}
                          class="textField"
                          type="text"
                          placeholder={t("common.ingredient_placeholder")}
                          value={field.value}
                          {...props}
                        />
                      )}
                    </Field>

                    <button
                      type="button"
                      class={styles.action}
                      title={t("common.actions.delete_ingredient")}
                      onDblClick={() => removeIngredient(sectionIdx, ingredientIdx)}
                      disabled={store.submitting.value}
                    >
                      <svg width="20" height="20" aria-hidden="true">
                        <use href="/ui.svg#trash" />
                      </svg>
                    </button>
                  </li>
                ))}
              </FieldArray>
            </ul>

            <div class={styles.actions}>
              <button
                type="button"
                class="btn"
                onClick={() => addIngredient(sectionIdx)}
                disabled={store.submitting.value}
              >
                {t("common.actions.add_ingredient")}
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onDblClick={() => removeSection(sectionIdx)}
                disabled={store.submitting.value}
              >
                {t("common.actions.delete_section")}
              </button>
            </div>
          </div>
        ))}
      </FieldArray>

      <button
        type="button"
        class="btn"
        onClick={addSection}
        disabled={store.submitting.value}
      >
        {t("common.actions.add_section")}
      </button>
    </div>
  );
}
