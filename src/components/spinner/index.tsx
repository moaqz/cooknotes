import styles from "./spinner.module.css";

export function Spinner() {
  return (
    <svg
      width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" class={styles.spinner}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
