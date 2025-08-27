"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [dark, setDark] = useState<boolean | null>(null);

  // Load saved preference on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("mj_theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Fallback to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle handler
  const toggleDark = () => {
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
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Top-right corner controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="outline" size="icon" onClick={toggleDark}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="outline" size="sm">
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Button>
      </div>

      {/* Page content */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Mood Journal</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Track your thoughts and feelings with ease.
        </p>
      </div>
    </main>
  );
}
