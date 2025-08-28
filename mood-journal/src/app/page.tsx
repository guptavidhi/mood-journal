"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Home() {
  const [dark, setDark] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
      {/* top bar */}
      <div className="absolute top-4 left-4 flex items-center gap-4">
        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition">
          Login
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar links */}
        <nav className="flex flex-col p-4 space-y-3">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">Journal</a>
          <a href="#" className="hover:text-blue-500">Mood Trends</a>
          <a href="#" className="hover:text-blue-500">Song History</a>
        </nav>
      </div>

      {/* Content */}
      <h1 className="text-4xl font-bold">Mood Journal</h1>
      <p className="mt-4 text-lg opacity-80">Track your moods, journal your thoughts ✨</p>
    </main>
  );
}
