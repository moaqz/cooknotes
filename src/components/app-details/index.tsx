import { useEffect, useState } from "preact/hooks";
import { getVersion } from "@tauri-apps/api/app";

import styles from "./app-details.module.css";

export function AppDetails() {
  const [version, setVersion] = useState("0.0.0");

  useEffect(() => {
    getVersion()
      .then((v) => setVersion(v))
      .catch(() => null);
  }, []);

  return (
    <div class={styles.appDetails}>
      <p class={styles.version}>Versión {version}</p>

      <div class={styles.linksContainer}>
        <a
          href="https://github.com/moaqz/cooknotes"
          target="_blank"
          rel="noreferrer"
        >
          Acerca de
        </a>

        <span role="separator">·</span>

        <a
          href="https://github.com/moaqz/cooknotes/issues"
          target="_blank"
          rel="noreferrer"
        >
          Reportar problema
        </a>
      </div>
    </div>
  );
}
