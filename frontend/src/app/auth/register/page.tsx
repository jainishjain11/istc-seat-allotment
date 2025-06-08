'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, rollNumber }),
    })

    if (res.ok) {
      setSuccess(true)
      setTimeout(() => {
        router.push('/candidate/preferences')
      }, 1500)
    } else {
      setError('Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow p-8 rounded w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Candidate Registration</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full border px-4 py-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          className="w-full border px-4 py-2 mb-3 rounded"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">Registered! Redirecting...</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}
