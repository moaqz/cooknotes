import styles from "./steps.module.css";

import { RecipeFormData } from "~/types";

import {
  FormStore,
  FieldArray,
  Field,
  remove,
  insert,
  getValues,
} from "@modular-forms/preact";

interface StepsProps {
  of: FormStore<RecipeFormData>;
}

export function Steps(props: StepsProps) {
  const { of: store } = props;

  const canDeleteStep = () => (getValues(store).steps?.length ?? 0) > 1;

  function removeStep(idx: number) {
    if (canDeleteStep()) {
      remove(store, "steps", { at: idx });
    }
  }

  function addStep() {
    const newStep = {
      id: crypto.randomUUID(),
      description: "",
      images: [],
    };
    insert(store, "steps", { value: newStep });
  }

  return (
    <div class={styles.stepsContainer}>
      <ol class={styles.stepsList}>
        <FieldArray of={store} name="steps">
          {(fieldArray) => (
            fieldArray.items.value.map((item, idx) => (
              <li key={item} class={`${styles.step} numbered`}>
                <Field of={store} name={`steps.${idx}.description`}>
                  {(field, props) => (
                    <textarea
                      class="textArea"
                      value={field.value}
                      {...props}
                    />
                  )}
                </Field>

                <button
                  type="button"
                  title="Borrar paso"
                  class={styles.action}
                  disabled={!canDeleteStep() || store.submitting.value}
                  onDblClick={() => removeStep(idx)}
                >
                  <svg width="20" height="20">
                    <use href="/ui.svg#trash" />
                  </svg>
                </button>
              </li>
            ))
          )}
        </FieldArray>
      </ol>

      <div>
        <button
          type="button"
          class="btn"
          onClick={addStep}
          disabled={store.submitting.value}
        >
          Añadir un paso
        </button>
      </div>
    </div>
  );
}
