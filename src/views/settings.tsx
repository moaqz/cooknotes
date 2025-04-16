import { ThemePicker } from "~/components/theme-picker";
import styles from "./settings.module.css";
import { AccentPicker } from "~/components/accent-picker";

export function SettingsView() {
  return (
    <div class={styles.container}>
      <div class={styles.settingsGroup}>
        <div class={styles.settingsGroupHeader}>
          <h2>Apariencia</h2>
          <p>Personaliza el estilo de la aplicación.</p>
        </div>

        <div>
          <section class={styles.settingsSection}>
            <h3>Tema</h3>
            <ThemePicker />
          </section>

          <section class={styles.settingsSection}>
            <h3>Color de acentuación</h3>
            <AccentPicker />
          </section>
        </div>
      </div>
    </div>
  );
}
