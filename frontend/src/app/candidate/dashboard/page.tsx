'use client';

import { useEffect, useState } from 'react';

const courseMap: Record<string, string> = {
  '1': 'Diploma in Mechanical Engineering (Tool & Die)',
  '2': 'Diploma in Electronics Engineering',
  '3': 'Advanced Diploma in Die & Mould Making',
  '4': 'Advanced Diploma in Mechatronics & Industrial Automation',
};

export default function CandidateDashboard() {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch('/api/preferences');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPreferences(data.preferences || []);
      } catch (err) {
        setError('Could not load preferences.');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Submitted Preferences</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : preferences.length === 0 ? (
        <p>You haven’t submitted any preferences yet.</p>
      ) : (
        <ol className="list-decimal pl-5 space-y-2">
          {preferences.map((pref, index) => (
            <li key={index} className="text-lg">
              {courseMap[pref] || `Course ID ${pref}`}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
