import styles from "./welcome.module.css";

export function WelcomeView() {
  return (
    <div class={styles.container}>
      <p class={styles.title}>
        Selecciona una receta o usa estos enlaces:
      </p>
      <div class={styles.links}>
        <a href="/new" class={styles.link}>
          &#8594; Crear nueva receta
        </a>
      </div>
    </div>
  );
}
