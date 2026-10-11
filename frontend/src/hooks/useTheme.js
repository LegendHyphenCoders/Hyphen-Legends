import { useState, useEffect } from "react";

/**
 * useTheme hook
 * Syncs with document.documentElement.dataset.theme initialized by the blocking script in index.html.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.dataset.theme || "light";
    }
    return "light";
  });

  useEffect(() => {
    // Keep React state in sync with DOM attribute changes
    const observer = new MutationObserver(() => {
      const current = document.documentElement.dataset.theme || "light";
      setTheme(current);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Listen for OS system theme changes if user hasn't explicitly set a preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      if (!localStorage.getItem("theme")) {
        const nextTheme = e.matches ? "dark" : "light";
        document.documentElement.dataset.theme = nextTheme;
        updateMetaThemeColor(nextTheme);
        setTheme(nextTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (_) {
      // Handle private browsing or localStorage disabled
    }
    updateMetaThemeColor(nextTheme);
    setTheme(nextTheme);
  };

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
  };
}

function updateMetaThemeColor(theme) {
  const meta =
    document.getElementById("theme-color-meta") ||
    document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#131110" : "#fdfbf7");
  }
}
