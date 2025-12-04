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

    const res = await fetch(`${API_BASE}/register`, {
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
      className="flex items-center justify-center h-screen"
      style={{
        background: "linear-gradient(135deg, #f5e6d3 0%, #f2d7b6 100%)",
      }}
    >
      <Card className="w-full max-w-sm p-6 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-brown-800">Login</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/80"
            />

            <Input
              type="Contact number"
              placeholder="contact_number"
              value={password}
              onChange={(e) => setContact_number(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/80"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>

          <Button
            variant="link"
            className="mt-2 w-full"
            onClick={() => router.push('/login')}
          >
            Back to login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
