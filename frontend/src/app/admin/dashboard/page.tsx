"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Candidate {
  id: number;
  name: string;
  email: string;
  preferences: string[];
}

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/candidates")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      });
  }, []);

  const triggerAllocation = async () => {
    try {
      const res = await fetch("/api/admin/allocate", {
        method: "POST",
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ Allocation completed successfully!");
      } else {
        setMessage(`❌ Allocation failed: ${result.message}`);
      }
    } catch (err) {
      setMessage("❌ Allocation failed: Network error.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/admin/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex justify-between mb-4">
        <button
          onClick={triggerAllocation}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔄 Trigger Allocation
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className="mb-4 text-sm text-white bg-gray-800 p-2 rounded">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Preferences</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.id}</td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.email}</td>
                <td className="border p-2">{c.preferences.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
