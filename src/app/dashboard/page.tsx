'use client';

import React, { useEffect, useState } from 'react';
import { getToken, logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';

interface Position {
  position_id?: number;
  position_code: string;
  position_name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [positionCode, setPositionCode] = useState('');
  const [positionName, setPositionName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }
    fetchPositions();
  }, [router]);

  function authHeaders() {
    const token = getToken();
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  async function fetchPositions() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/positions`, {
        method: 'GET',
        headers: authHeaders(),
      });

      if (res.status === 401) {
        logoutUser();
        router.push('/login');
        return;
      }

      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

      const data = await res.json();
      setPositions(data);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateOrUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: Position = {
      position_code: positionCode,
      position_name: positionName,
    };

    try {
      let res: Response;

      if (editingId) {
        res = await fetch(`${API_BASE}/positions/${editingId}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/positions`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      }

      if (res.status === 401) {
        logoutUser();
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      setPositionCode('');
      setPositionName('');
      setEditingId(null);
      await fetchPositions();
    } catch (e: any) {
      setError(e?.message || 'Save failed');
    }
  }

  function startEdit(p: Position) {
    setEditingId(p.position_id ?? null);
    setPositionCode(p.position_code);
    setPositionName(p.position_name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!confirm('Delete this position?')) return;

    try {
      const res = await fetch(`${API_BASE}/positions/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (res.status === 401) {
        logoutUser();
        router.push('/login');
        return;
      }

      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      await fetchPositions();
    } catch (e: any) {
      setError(e?.message || 'Delete failed');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setPositionCode('');
    setPositionName('');
  }

  function handleLogout() {
    logoutUser();
    router.push('/login');
  }

  return (
    <div
      className="relative min-h-screen p-8 font-sans text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg8.jpg')" }}
    >
      {/* 🔥 Soft global dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-10 border-b border-white/30 pb-4">
          <h1 className="text-4xl font-extrabold uppercase tracking-wide text-white drop-shadow">
            Positions Dashboard
          </h1>

          <div className="flex gap-4">
            <button
              onClick={fetchPositions}
              className="px-6 py-2 rounded-xl bg-white/80 text-black font-bold uppercase shadow hover:scale-105 hover:bg-white transition-all duration-200"
            >
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-white text-black font-bold uppercase shadow hover:scale-105 hover:bg-gray-200 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </header>

        {/* CREATE / EDIT FORM */}
        <section className="mb-12 bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-xl border border-white/20">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide text-white drop-shadow">
            {editingId ? 'Edit Position' : 'Create Position'}
          </h2>

          <form onSubmit={handleCreateOrUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl px-4 py-3 font-semibold uppercase tracking-wide placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
              placeholder="Position Code"
              value={positionCode}
              onChange={(e) => setPositionCode(e.target.value)}
              required
            />

            <input
              className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl px-4 py-3 font-semibold uppercase tracking-wide placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
              placeholder="Position Name"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
              required
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-white text-black rounded-xl uppercase font-bold shadow hover:scale-105 hover:bg-gray-200 transition-all duration-200"
              >
                {editingId ? 'Update' : 'Create'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 border border-white/50 text-white rounded-xl uppercase font-bold hover:bg-white hover:text-black transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {error && <p className="text-red-400 mt-3 font-semibold">{error}</p>}
        </section>

        {/* TABLE */}
        <section>
          <h2 className="text-3xl font-extrabold mb-6 uppercase tracking-wide drop-shadow">
            Positions List {loading && '(loading...)'}
          </h2>

          <div className="overflow-x-auto bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-xl">
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="bg-white/10 border-b border-white/20">
                  <th className="px-6 py-3 uppercase text-white/80 font-bold">ID</th>
                  <th className="px-6 py-3 uppercase text-white/80 font-bold">Code</th>
                  <th className="px-6 py-3 uppercase text-white/80 font-bold">Name</th>
                  <th className="px-6 py-3 uppercase text-white/80 font-bold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {positions.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-white/60 font-semibold">
                      No positions found.
                    </td>
                  </tr>
                )}

                {positions.map((p) => (
                  <tr
                    key={p.position_id}
                    className="border-b border-white/10 hover:bg-white/20 hover:text-black transition-all duration-200"
                  >
                    <td className="px-6 py-3 font-mono font-bold">{p.position_id}</td>
                    <td className="px-6 py-3 font-bold">{p.position_code}</td>
                    <td className="px-6 py-3 font-semibold">{p.position_name}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(p)}
                          className="px-4 py-1 rounded-xl border border-white/40 text-white font-bold uppercase hover:bg-white hover:text-black transition-all duration-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p.position_id)}
                          className="px-4 py-1 rounded-xl border border-white/40 text-white font-bold uppercase hover:bg-red-500 hover:border-red-500 hover:text-black transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
