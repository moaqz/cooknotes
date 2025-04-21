import { useTranslation } from "~/hooks/use-translation";
import styles from "./welcome.module.css";

export function WelcomeView() {
  const t = useTranslation();
  return (
    <div class={styles.container}>
      <p class={styles.title}>{t("home.welcome_message")}</p>
      <div class={styles.links}>
        <a href="/new" class={styles.link}>
          &#8594; {t("navigation.new_recipe.aria")}
        </a>
      </div>
    </div>
  );
}
