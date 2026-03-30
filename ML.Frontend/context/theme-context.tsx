import React, { createContext, useContext, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: "light" | "dark";
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const theme: "light" | "dark" =
    themeMode === "system" ? (systemColorScheme ?? "light") : themeMode;

  const toggleTheme = () => {
    setThemeMode((current) => {
      if (current === "system") {
        return systemColorScheme === "dark" ? "light" : "dark";
      }
      return current === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, setThemeMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function useColorScheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback to system if not in provider
    return useSystemColorScheme() ?? "light";
  }
  return context.theme;
}
