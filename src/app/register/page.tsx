'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [contact_number, setContact_number] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, contact_number, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Register failed');
      return;
    }

    router.push('/login');
  }

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg8.jpg')",
      }}
    >
      <Card className="w-full max-w-sm p-8 shadow-2xl bg-white rounded-2xl">
        <CardContent>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Register</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white border border-gray-300"
            />

            <Input
              type="text"
              placeholder="Contact Number"
              value={contact_number}
              onChange={(e) => setContact_number(e.target.value)}
              className="bg-white border border-gray-300"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border border-gray-300"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-3 text-md"
              type="submit"
            >
              Register
            </Button>
          </form>

          <Button
            variant="link"
            className="mt-4 w-full text-gray-700 font-medium"
            onClick={() => router.push('/login')}
          >
            Back to login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
