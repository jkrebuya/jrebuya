import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center font-sans bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg8.jpg')" }}
    >
      {/* Soft dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative text-center bg-white/20 p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/30">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">
          JANA KIMBERLY REBUYA
        </h1>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="/login"
            className="px-7 py-3 rounded-xl bg-white/80 text-[#4a2e14] font-semibold shadow-md hover:shadow-xl hover:scale-105 hover:bg-white transition-all duration-200"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-7 py-3 rounded-xl bg-white/60 text-[#4a2e14] font-semibold shadow-md hover:shadow-xl hover:scale-105 hover:bg-white/90 transition-all duration-200"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
