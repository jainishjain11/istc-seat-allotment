'use client';

import { useState } from 'react';

const courses = [
  { id: '1', name: 'Diploma in Mechanical Engineering (Tool & Die)' },
  { id: '2', name: 'Diploma in Electronics Engineering' },
  { id: '3', name: 'Advanced Diploma in Die & Mould Making' },
  { id: '4', name: 'Advanced Diploma in Mechatronics & Industrial Automation' },
];

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState(['', '', '', '']);
  const [message, setMessage] = useState('');

  const handleChange = (index: number, value: string) => {
    const newPrefs = [...preferences];
    newPrefs[index] = value;
    setPreferences(newPrefs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicates
    const uniquePrefs = new Set(preferences);
    if (uniquePrefs.size !== preferences.length) {
      setMessage('Each preference must be unique.');
      return;
    }

    try {
      const res = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });

      if (res.ok) {
        setMessage('Preferences submitted successfully!');
      } else {
        setMessage('Error submitting preferences.');
      }
    } catch (error) {
      setMessage('Submission failed.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit Your Preferences</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {preferences.map((pref, i) => (
          <div key={i}>
            <label className="block mb-1">Preference {i + 1}</label>
            <select
              value={pref}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Preferences
        </button>
      </form>
      {message && <p className="mt-4 text-center text-lg">{message}</p>}
    </div>
  );
}
