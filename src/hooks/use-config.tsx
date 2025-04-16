import { useContext } from "preact/compat";
import { AppConfig, AppConfigContext } from "~/hooks/context/app-config";

export function useSetting<K extends keyof AppConfig>(key: K) {
  const ctx = useContext(AppConfigContext);

  if (!ctx) {
    throw new Error("useSetting must be used inside AppSettingsProvider");
  };

  const { settings, setSetting } = ctx;
  return [
    settings[key],
    (value: AppConfig[K]) => setSetting(key, value)
  ] as const;
}
