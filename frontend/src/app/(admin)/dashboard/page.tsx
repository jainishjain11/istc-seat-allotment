'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [message, setMessage] = useState('');

  const handleExport = async () => {
    const res = await fetch('/api/admin/export');
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'allocated_candidates.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage('Exported successfully!');
    } else {
      setMessage('Export failed.');
    }
  };

  const handleAllocate = async () => {
    const res = await fetch('/api/admin/allocate', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Allocated ${data.allocated} candidates successfully.`);
    } else {
      setMessage('Allocation failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="flex gap-4">
        <button
          onClick={handleAllocate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Allocate Seats
        </button>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>
      {message && <p className="mt-4 text-lg text-gray-800">{message}</p>}
    </div>
  );
}
