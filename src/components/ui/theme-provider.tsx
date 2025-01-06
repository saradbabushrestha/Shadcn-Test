import { useContext, createContext, useEffect, useState } from "react";

type Ttheme = "dark" | "light" | "system";

type TthemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Ttheme;
  storageKey?: string;
};

type TthemeProviderState = {
  theme: Ttheme;
  setTheme: (theme: Ttheme) => void;
};

const initialState: TthemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<TthemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: TthemeProviderProps) {
  const [theme, setTheme] = useState<Ttheme>(
    () => (localStorage.getItem(storageKey) as Ttheme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme:dark")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Ttheme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
