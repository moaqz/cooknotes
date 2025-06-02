import styles from "./title-bar.module.css";

import { useLocation } from "preact-iso";
import { useHistory } from "~/hooks/use-history";
import { useTranslation } from "~/hooks/use-translation";

export function TitleBar() {
  const location = useLocation();
  const t = useTranslation();
  const { canGoBackward, canGoForward, goBackward, goForward } = useHistory();

  return (
    <header class={styles.titleBar}>
      <div class={styles.navigation}>
        <button
          type="button"
          class={styles.iconBtn}
          title={t("navigation.back.aria")}
          disabled={!canGoBackward}
          onClick={goBackward}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/sprite.svg#arrow-left" />
          </svg>
        </button>

        <button
          type="button"
          class={styles.iconBtn}
          title={t("navigation.forward.aria")}
          disabled={!canGoForward}
          onClick={goForward}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/sprite.svg#arrow-right" />
          </svg>
        </button>
      </div>

      <div class={styles.actions}>
        <button
          type="button"
          class={styles.iconBtn}
          title={t("navigation.new_recipe.aria")}
          onClick={() => location.route("/new")}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/sprite.svg#pencil" />
          </svg>
        </button>
      </div>
    </header>
  );
}
