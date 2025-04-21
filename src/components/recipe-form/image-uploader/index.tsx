import styles from "./image-uploader.module.css";

import { TargetedEvent, useEffect, useState } from "preact/compat";
import { FormStore, reset, getValue, setValue, Field } from "@modular-forms/preact";

import { copyImage, getLocalImage } from "~/lib/image";
import { RecipeFormData } from "~/types";
import { useTranslation } from "~/hooks/use-translation";

interface ImageUploaderProps {
  of: FormStore<RecipeFormData>;
}

export function ImageUploader(props: ImageUploaderProps) {
  const { of: store } = props;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const t = useTranslation();

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
            aria-label={t("common.upload_image_label")}
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
        alt={t("common.uploaded_image_alt")}
      />

      <Field of={store} name="main_image">
        {(field, props) => (
          <input type="hidden" value={field.value} {...props} />
        )}
      </Field>

      <button
        type="button"
        onClick={onFileRemoval}
        aria-label={t("common.remove_uploaded_image")}
        disabled={store.submitting.value}
      >
        <svg width="20" height="20">
          <use href="/ui.svg#x" />
        </svg>
      </button>
    </div>
  );
}
