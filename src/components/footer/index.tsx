import { useTranslation } from "~/hooks/use-translation";
import styles from "./footer.module.css";

export function Footer() {
  const t = useTranslation();
  return (
    <div class={styles.footer}>
      <a
        href="/settings"
        title={t("navigation.settings")}
        type="button"
        class={styles.btn}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <use href="/sprite.svg#settings" />
        </svg>
        {t("navigation.settings")}
      </a>
    </div>
  );
}
