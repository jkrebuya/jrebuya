'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { saveToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Login failed');
      return;
    }

    saveToken(data.accessToken);
    router.push('/dashboard');
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

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/80"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/80"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <Button
              className="w-full bg-[#8b5e34] hover:bg-[#6f4829] text-white"
              type="submit"
            >
              Login
            </Button>
          </form>

          {/* Create Account Link */}
          <Button
            variant="link"
            className="mt-3 w-full text-[#8b5e34] font-medium"
            onClick={() => router.push('/register')}
          >
            Create an account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
