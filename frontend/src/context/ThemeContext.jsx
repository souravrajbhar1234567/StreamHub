import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const getISTDefaultTheme = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (5.5 * 60 * 60 * 1000));
  const istHours = istDate.getHours();
  // 5:00 AM to 12:00 PM IST is light theme, otherwise dark
  return (istHours >= 5 && istHours < 12) ? "light" : "dark";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("streamhub_theme");
    if (saved) return saved;
    return getISTDefaultTheme();
  });

  useEffect(() => {
    localStorage.setItem("streamhub_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("streamhub_theme", next);
      return next;
    });
  };

  const applyThemeFromUser = (userTheme) => {
    if (userTheme && (userTheme === "light" || userTheme === "dark")) {
      setTheme(userTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, applyThemeFromUser, getISTDefaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: "dark", toggleTheme: () => {} };
  }
  return context;
};

export default ThemeContext;
