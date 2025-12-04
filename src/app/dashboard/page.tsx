"use client";

import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, LogOut } from "lucide-react";

interface JwtPayload {
  sub: number;
  username: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const token = getToken();

  let username = "";
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    username = decoded.username;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  function handleRefresh() {
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f5e6d3] p-8">

      {/* ---- TOP NAVIGATION (now fully visible) ---- */}
      <div className="flex justify-end items-center gap-3 mb-6 relative z-20">
        <Button onClick={handleRefresh} className="flex gap-2 items-center">
          <RefreshCcw size={16} />
          Refresh
        </Button>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="flex gap-2 items-center"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <div
        className="relative flex items-center justify-between rounded-3xl shadow-lg p-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg7.png')",
        }}
      >

        {/* Overlay INSIDE the background box (does NOT cover navbar) */}
        <div className="absolute inset-0 bg-peach-50/40 backdrop-blur-sm rounded-3xl"></div>

        {/* Left Section */}
        <div className="relative max-w-xl z-10">
          <h1 className="text-5xl font-extrabold mb-4">Dashboard</h1>

          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {username}!
          </h2>

          <p className="text-lg text-zinc-700">
            Enhance your natural glow with premium, dermatologist-approved
            skincare essentials.
          </p>
        </div>

        {/* Right Section – Images */}
        <div className="relative grid grid-cols-2 gap-6 z-10">
          <img src="/skin1.jpg" alt="Skin 1" className="rounded-xl shadow-md w-80 h-60 object-cover" />
          <img src="/skin2.jpg" alt="Skin 2" className="rounded-xl shadow-md w-80 h-60 object-cover" />
          <img src="/skin3.jpg" alt="Skin 3" className="rounded-xl shadow-md w-80 h-60 object-cover" />
          <img src="/skin4.jpg" alt="Skin 4" className="rounded-xl shadow-md w-80 h-60 object-cover" />
        </div>

      </div>
    </div>
  );
}
