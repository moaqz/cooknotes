import { createContext } from "preact";
import { useEffect, useState, type PropsWithChildren } from "preact/compat";
import { SETTINGS_KEY } from "~/constants";
import { Language } from "~/locales";
import type { Accent, Theme } from "~/types";

export interface AppConfig {
  theme: Theme;
  accent: Accent;
  language: Language;
}

export interface SettingsContextValue {
  settings: AppConfig;
  setSetting: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
}

const DEFAULT_APP_CONFIG: AppConfig = {
  theme: "system",
  accent: "cyan",
  language: "en",
};

export const AppConfigContext = createContext<SettingsContextValue | null>(null);

export function AppSettingsProvider(props: PropsWithChildren) {
  const [settings, setSettings] = useState<AppConfig>(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        return { ...DEFAULT_APP_CONFIG, ...JSON.parse(raw) };
      };
    } catch {}

    return DEFAULT_APP_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = settings.theme === "system"
      ? prefersDark ? "dark" : "light"
      : settings.theme;

    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.accent = settings.accent;
  }, [settings]);

  const setSetting = <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AppConfigContext.Provider value={{ settings, setSetting }}>
      {props.children}
    </AppConfigContext.Provider>
  );
}
