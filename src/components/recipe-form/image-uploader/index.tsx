import styles from "./image-uploader.module.css";

import { TargetedEvent, useEffect, useState } from "preact/compat";
import { FormStore, reset, getValue, setValue, Field } from "@modular-forms/preact";

import { copyImage, getLocalImage } from "~/lib/image";
import { RecipeFormData } from "~/types";

interface ImageUploaderProps {
  of: FormStore<RecipeFormData>;
}

export function ImageUploader(props: ImageUploaderProps) {
  const { of: store } = props;
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Fetch local image if not null.
  useEffect(() => {
    const image = getValue(store, "main_image");
    if (!image) {
      return;
    }

    getLocalImage(image).then((path) => {
      setImageSrc(path);
    });
  }, []);

  const onFileChange = async (event: TargetedEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      return;
    }

    try {
      const fileName = file.name;
      await copyImage(fileName, file);
      setValue(store, "main_image", fileName);
      setImageSrc(await getLocalImage(fileName));
    } catch (_) {
      //
    }
  };

  const onFileRemoval = () => {
    reset(store, "main_image", { initialValue: "" });
    setImageSrc(null);
  };

  if (!imageSrc) {
    return (
      <>
        <label class={styles.imageUploader}>
          <svg width="144" height="144">
            <use href="/ui.svg#image" />
          </svg>
          <input
            id="main_image"
            type="file"
            class={styles.fileInput}
            aria-label="Upload an image"
            accept="image/*"
            onChange={onFileChange}
          />
        </label>

        <Field of={store} name="main_image">
          {(field, props) => (
            <input type="hidden" value={field.value} {...props} />
          )}
        </Field>
      </>
    );
  }

  return (
    <div class={styles.imagePreview}>
      <img
        src={imageSrc}
        alt="Uploaded recipe image"
      />

      <Field of={store} name="main_image">
        {(field, props) => (
          <input type="hidden" value={field.value} {...props} />
        )}
      </Field>

      <button
        type="button"
        onClick={onFileRemoval}
        aria-label="Remove uploaded image"
        disabled={store.submitting.value}
      >
        <svg width="20" height="20">
          <use href="/ui.svg#x" />
        </svg>
      </button>
    </div>
  );
}
