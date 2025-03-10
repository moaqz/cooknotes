import styles from "./recipe-form.module.css";

import { ImageUploader } from "./image-uploader";
import { Steps } from "./steps";
import { Ingredients } from "./ingredients";
import { FormHeader } from "./header";

import { Spinner } from "~/components/spinner";
import { DEFAULT_RECIPE_FORM_VALUES } from "~/constants";
import { RecipeFormData } from "~/types";

import { useForm } from "@modular-forms/preact";

interface RecipeFormProps {
  data?: RecipeFormData;
  handleOnSubmit: (data: RecipeFormData) => Promise<void>;
  primaryButtonText?: {
    default: string;
    loading: string;
  };
}

export function RecipeForm(props: RecipeFormProps) {
  const {
    handleOnSubmit,
    primaryButtonText = {
      loading: "Guardando receta...",
      default: "Crear receta"
    }
  } = props;
  const [recipeForm, { Form }] = useForm<RecipeFormData>({
    "initialValues": props.data ?? DEFAULT_RECIPE_FORM_VALUES,
  });

  return (
    <Form class={styles.recipeForm} onSubmit={handleOnSubmit}>
      <div class={styles.leftSection}>
        <ImageUploader of={recipeForm} />

        <div class={styles.contentGroup}>
          <h2>Ingredientes</h2>
          <Ingredients of={recipeForm} />
        </div>
      </div>

      <div class={styles.rightSection}>
        <FormHeader of={recipeForm} />

        <div class={styles.contentGroup}>
          <h2>Pasos</h2>
          <Steps of={recipeForm} />
        </div>

        <div>
          <button
            type="submit"
            class="btn"
            disabled={recipeForm.submitting.value}
          >
            {recipeForm.submitting.value
              ? <>
                <Spinner />
                {primaryButtonText.loading}
              </>
              : primaryButtonText.default}
          </button>
        </div>
      </div>
    </Form>
  );
}
