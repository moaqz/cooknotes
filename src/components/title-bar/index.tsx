import styles from "./title-bar.module.css";

import { useLocation } from "preact-iso";
import { useHistory } from "~/hooks/use-history";

export function TitleBar() {
  const location = useLocation();
  const {
    canGoBackward,
    canGoForward,
    goBackward,
    goForward
  } = useHistory();

  return (
    <header class={styles.titleBar}>
      <div class={styles.navigation}>
        <button
          type="button"
          class={styles.iconBtn}
          title="Retroceder"
          disabled={!canGoBackward}
          onClick={goBackward}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/title-bar.svg#arrow-left" />
          </svg>
        </button>

        <button
          type="button"
          class={styles.iconBtn}
          title="Avanzar"
          disabled={!canGoForward}
          onClick={goForward}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/title-bar.svg#arrow-right" />
          </svg>
        </button>
      </div>

      <div class={styles.actions}>
        <button
          type="button" class={styles.iconBtn}
          title="Crear receta" onClick={() => location.route("/new")}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/title-bar.svg#square-pen" />
          </svg>
        </button>
      </div>
    </header>
  );
}
