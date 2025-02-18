import styles from "./title-bar.module.css";
import { useLocation } from "preact-iso";

export function TitleBar() {
  const location = useLocation();

  return (
    <header class={styles.titleBar}>
      <div class={styles.navigation}>
        <button
          type="button"
          class={styles.iconBtn}
          title="Retroceder"
          disabled
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/title-bar.svg#arrow-left" />
          </svg>
        </button>

        <button
          type="button"
          class={styles.iconBtn}
          title="Avanzar"
          disabled
        >
          <svg width="20" height="20" aria-hidden="true">
            <use href="/title-bar.svg#arrow-right" />
          </svg>
        </button>
      </div>

      <span class={styles.tabTitle}>
        {new Intl.DateTimeFormat("es", { day: "2-digit", month: "long", year: "numeric" }).format(new Date())}
      </span>

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
