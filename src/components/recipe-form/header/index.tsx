import styles from "./header.module.css";

import { FormStore, Field } from "@modular-forms/preact";

import { RecipeFormData } from "~/types";

interface FormHeaderProps {
  of: FormStore<RecipeFormData>
}

export function FormHeader(props: FormHeaderProps) {
  const { of: store } = props;

  return (
    <div>
      <Field of={store} name="name">
        {(field, props) => (
          <div class={styles.fieldGroup}>
            <input
              type="text"
              placeholder="Título"
              class="textField"
              maxlength={60}
              minLength={3}
              required
              aria-label="Título de la receta"
              value={field.value}
              {...props}
            />

            <span class={styles.charHint}>
              {field.value.value?.length} / 60
            </span>
          </div>
        )}
      </Field>

      <Field of={store} name="cooking_time" type="number">
        {(field, props) => (
          <div class={styles.fieldGroup}>
            <label for={field.name}>Tiempo</label>
            <input
              id={field.name}
              type="number"
              min="1"
              max="999"
              pattern="[0-9]*"
              placeholder="180"
              class="textField"
              value={field.value}
              {...props}
            />
          </div>
        )}
      </Field>
    </div>
  );
}
