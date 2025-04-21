import { ACCENTS } from "~/constants";
import styles from "./accent-picker.module.css";
import { useSetting } from "~/hooks/use-config";
import { Accent } from "~/types";
import { useTranslation } from "~/hooks/use-translation";

export function AccentPicker() {
  const t = useTranslation();
  const [activeAccent, setActiveAccent] = useSetting("accent");

  return (
    <div class={styles.accents}>
      {ACCENTS.map((accent) => {
        const label = t(`settings.accent_color.options.${accent}`);

        return (
          <input
            type="radio"
            name="settings.accent"
            value={accent}
            checked={activeAccent === accent}
            aria-label={label}
            title={label}
            key={accent}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              setActiveAccent(target.value as Accent);
            }}
            style={{
              "borderColor": `var(--accent-${accent})`,
              "--accent": `var(--accent-${accent})`
            }}
          />
        );
      })}
    </div>
  );
}
