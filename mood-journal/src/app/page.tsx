"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Home() {
  const [dark, setDark] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("mj_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mj_theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mj_theme", "dark");
      setDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* top-right controls */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          Login
        </button>
      </div>

      {/* main content */}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Mood Journal</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Track your moods, reflect, and grow ✨
        </p>
      </main>
    </div>
  );
}
