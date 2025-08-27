"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // icon library

export default function Home() {
  const [dark, setDark] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const theme = localStorage.getItem("mj_theme");
    if (theme === "dark") setDark(true);
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mj_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mj_theme", "light");
    }
  }, [dark]);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold">Mood Journal</h1>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Login placeholder */}
          <button className="rounded-xl px-3 py-1.5 text-sm ring-1 ring-neutral-300 dark:ring-neutral-700">
            Login
          </button>
        </div>
      </div>

      {/* Page content */}
      <section className="flex flex-col items-center justify-center h-[80vh]">
        <p className="text-lg">Dark mode + Login placeholder ready ✅</p>
      </section>
    </main>
  );
}
