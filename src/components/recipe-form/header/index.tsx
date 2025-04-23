import styles from "./header.module.css";

import {
  FormStore,
  Field,
  minRange,
  required,
  minLength,
  maxLength,
  toCustom,
} from "@modular-forms/preact";
import { useTranslation } from "~/hooks/use-translation";

import { RecipeFormData } from "~/types";

interface FormHeaderProps {
  of: FormStore<RecipeFormData>
}

function toNumber() {
  return toCustom<number>((value) => {
    if (value == null) {
      return undefined;
    }

    const num = Number.parseInt(value.toString());
    return Number.isNaN(num) ? undefined : num;
  }, { on: "input" });
}

export function FormHeader(props: FormHeaderProps) {
  const t = useTranslation();
  const { of: store } = props;

  return (
    <div>
      <Field
        of={store}
        name="name"
        validate={[
          required("Name is required"),
          minLength(3, "Name must have 3 characters or more"),
          maxLength(60, "Name must have 60 characters or less"),
        ]}
      >
        {(field, props) => (
          <div class={styles.fieldGroup}>
            <input
              type="text"
              placeholder={t("common.recipe_title_placeholder")}
              class="textField"
              maxlength={60}
              minLength={3}
              required
              aria-label={t("common.recipe_title_label")}
              aria-invalid={!!field.error.value}
              value={field.value}
              {...props}
            />

            <span class={styles.charHint}>
              {field.value.value?.length} / 60
            </span>
          </div>
        )}
      </Field>

      <Field
        of={store}
        name="cooking_time"
        type="number"
        validate={[
          minRange(0, "The minium cooking time is zero."),
        ]}
        transform={toNumber()}
      >
        {(field, props) => (
          <div class={styles.fieldGroup}>
            <label for={field.name}>{t("common.time")}</label>
            <input
              id={field.name}
              class="textField"
              value={field.value}
              required
              min={0}
              type="number"
              aria-invalid={!!field.error.value}
              {...props}
            />
          </div>
        )}
      </Field>
    </div>
  );
}
