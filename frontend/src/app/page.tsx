'use client';

import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Here you would normally save the session/token (e.g., in cookie/localStorage)
        // For now, redirect to admin dashboard as example
        window.location.href = '/admin/dashboard';
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Invalid credentials');
      }
    } catch {
      setErrorMsg('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1
  className="text-2xl font-bold mb-6 text-center"
  style={{ color: '#000000' }}
>
  Login to ISTC Portal
</h1>


        <label
  htmlFor="email"
  className="block mb-1 font-semibold"
  style={{ color: '#000000' }}  // pure black text for label
>
  Email
</label>
<input
  type="email"
  id="email"
  required
  className="w-full p-2 border rounded"
  style={{
    color: '#000000',           // pure black input text
    borderColor: '#000000',     // pure black border
  }}
/>

<label
  htmlFor="password"
  className="block mt-4 mb-1 font-semibold"
  style={{ color: '#000000' }}  // pure black label text
>
  Password
</label>
<input
  type="password"
  id="password"
  required
  className="w-full p-2 border rounded"
  style={{
    color: '#000000',           // pure black input text
    borderColor: '#000000',     // pure black border
  }}
/>


        {errorMsg && (
          <div className="mb-4 text-red-600 text-center font-medium">{errorMsg}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Optionally add register link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-blue-700 underline">
            Register here
          </a>
        </p>
      </form>
    </main>
  );
}
