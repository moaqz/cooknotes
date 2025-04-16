import type { Theme } from "~/types";
import styles from "./theme-picker.module.css";
import { useSetting } from "~/hooks/use-config";
import { THEME_LABELS } from "~/constants";

export function ThemePicker() {
  const [activeTheme, setActiveTheme] = useSetting("theme");

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setActiveTheme(target.value as Theme);
  };

  return (
    <div class={styles.radioGroup}>
      {["system", "light", "dark"].map((mode) => (
        <label className={styles.radioOption} key={mode}>
          <input
            type="radio"
            name="settings.theme"
            value={mode}
            checked={activeTheme === mode}
            onChange={handleChange}
          />
          {THEME_LABELS[mode as Theme]}
        </label>
      ))}
    </div>
  );
}
