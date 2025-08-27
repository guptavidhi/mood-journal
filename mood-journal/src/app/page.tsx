"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Home() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mj_theme");
    if (saved) {
      setDark(saved === "dark");
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    if (dark === null) return;
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem("mj_theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center transition-colors duration-500">
      {/* top-right corner */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition">
          Login
        </button>
      </div>

      {/* content */}
      <h1 className="text-4xl font-bold">Mood Journal</h1>
      <p className="mt-4 text-lg opacity-80">Track your moods, journal your thoughts ✨</p>
    </main>
  );
}
