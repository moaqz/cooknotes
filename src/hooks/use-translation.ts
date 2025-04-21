import { useCallback, useEffect, useState } from "preact/hooks";
import { useSetting } from "./use-config";
import { LanguageLocale } from "~/locales";
import FALLBACK_LANGUAGE from "../locales/en.json";

function getNestedValue(obj: LanguageLocale, keys: string[]): string | null {
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
      continue;
    }

    return null;
  }

  return typeof result === "string" ? result : null;
}

// https://vite.dev/guide/features#glob-import
const LOCALES = import.meta.glob<LanguageLocale>("../locales/*.json");

export function useTranslation() {
  const [language] = useSetting("language");
  const [locale, setLocale] = useState<LanguageLocale>(FALLBACK_LANGUAGE);

  useEffect(() => {
    const loader = LOCALES[`../locales/${language}.json`];

    if (loader == null) {
      // Avoid loading a non-existing locale.
      return;
    }

    loader()
      .then((locale) => setLocale(locale))
      .catch(() => {
        console.warn(`Tried to change app language to non-existent locale: ${language}`);
      });
  }, [language]);

  const t = useCallback(
    (key: string) => {
      const keys = key.split(".");
      return getNestedValue(locale, keys) ?? getNestedValue(FALLBACK_LANGUAGE, keys) ?? key;
    },
    [locale],
  );

  return t;
}
