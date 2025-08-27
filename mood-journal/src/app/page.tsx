"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // npm i lucide-react

export default function Home() {
  // `null` until we know the user's preference (avoids SSR/client mismatch)
  const [dark, setDark] = useState<boolean | null>(null);

  // read saved preference (or system preference) on mount
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("mj_theme");
    if (saved === "dark") {
      setDark(true);
      return;
    }
    if (saved === "light") {
      setDark(false);
      return;
    }
    // fallback to system preference
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  // apply/remove `dark` on <html> and persist choice
  useEffect(() => {
    if (dark === null) return;
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mj_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mj_theme", "light");
    }
  }, [dark]);

  // while we don't know theme yet, render neutral shell (prevents flicker / mismatch)
  if (dark === null) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* top-right: icon toggle + login */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        {/* Dark mode icon button */}
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDark(!dark)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {dark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>

        {/* Login placeholder */}
        <button className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm">
          Login
        </button>
      </div>

      {/* Main content */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        Welcome to Mood Journal
      </h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Your safe space to track how you feel.
      </p>
    </div>
  );
}
