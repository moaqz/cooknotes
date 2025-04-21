import { ThemePicker } from "~/components/theme-picker";
import styles from "./settings.module.css";
import { AccentPicker } from "~/components/accent-picker";
import { LanguagePicker } from "~/components/language-picker";
import { useTranslation } from "~/hooks/use-translation";

export function SettingsView() {
  const t = useTranslation();

  return (
    <div class={styles.container}>
      <div class={styles.settingsGroup}>
        <div class={styles.settingsGroupHeader}>
          <h2>{t("settings.general")}</h2>
          <p>{t("settings.general_description")}</p>
        </div>

        <div>
          <section class={styles.settingsSection}>
            <h3>{t("settings.language")}</h3>
            <LanguagePicker />
          </section>
        </div>
      </div>

      <div class={styles.settingsGroup}>
        <div class={styles.settingsGroupHeader}>
          <h2>{t("settings.appearance")}</h2>
          <p>{t("settings.appearance_description")}</p>
        </div>

        <div>
          <section class={styles.settingsSection}>
            <h3>{t("settings.theme.text")}</h3>
            <ThemePicker />
          </section>

          <section class={styles.settingsSection}>
            <h3>{t("settings.accent_color.text")}</h3>
            <AccentPicker />
          </section>
        </div>
      </div>
    </div>
  );
}
