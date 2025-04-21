import { useSetting } from "~/hooks/use-config";
import { SUPPORTED_LANGUAGES } from "~/locales";

export function LanguagePicker() {
  const [language, setLanguage] = useSetting("language");

  return (
    // @ts-ignore
    <select onChange={(e) => setLanguage(e.target.value)}>
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => {
        return (
          <option value={key} key={key} selected={language === key}>
            {value.name}
          </option>
        );
      })}
    </select>
  );
}
