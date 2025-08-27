"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mj_draft");
    if (saved) setText(saved);
  }, []);

  // Autosave every 800ms after typing
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem("mj_draft", text);
      setStatus("saved");
      const back = setTimeout(() => setStatus("idle"), 1000);
      return () => clearTimeout(back);
    }, 800);
    return () => clearTimeout(id);
  }, [text]);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Mood Journal</h1>
          <div className="text-sm text-neutral-500">
            {status === "saved" ? "Draft saved" : "\u00A0"}
          </div>
        </header>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today? Type anything. This page stays minimal on purpose…"
            className="h-[65vh] w-full resize-none rounded-xl p-4 outline-none"
          />
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                localStorage.removeItem("mj_draft");
                setText("");
              }}
              className="rounded-2xl px-4 py-2 ring-1 ring-black/10 shadow-sm hover:bg-neutral-50"
            >
              Clear
            </button>
            <button
              onClick={() => alert('Day 1: local-only draft saved.\nTomorrow we\'ll wire DB.')}
              className="rounded-2xl px-4 py-2 ring-1 ring-black/10 shadow-sm hover:bg-neutral-50"
            >
              Save (stub)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
