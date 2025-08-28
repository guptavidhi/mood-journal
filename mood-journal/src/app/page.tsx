"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState<string>("");

  // Fetch existing data
  const fetchData = async () => {
    const { data, error } = await supabase.from("test_table").select("*");
    if (error) {
      setError(error.message);
      console.error(error);
    } else {
      setData(data || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Insert a new row
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    const { error } = await supabase.from("test_table").insert([{ text: newEntry }]);
    if (error) {
      setError(error.message);
    } else {
      setNewEntry("");
      fetchData(); // refresh table
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Mood Journal 📝</h1>

      {/* Entry Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your mood..."
          className="p-2 border rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Errors */}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {/* Data List */}
      {data.length > 0 ? (
        <ul className="bg-white p-4 rounded shadow w-1/2">
          {data.map((row, i) => (
            <li key={i} className="border-b py-2">
              {row.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No entries yet…</p>
      )}
    </main>
  );
}
