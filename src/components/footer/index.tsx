import styles from "./footer.module.css";

export function Footer() {
  return (
    <div class={styles.footer}>
      <a href="/settings" title="Open settings" type="button" class={styles.btn}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <use href="/ui.svg#settings" />
        </svg>
        Settings
      </a>
    </div>
  );
}
