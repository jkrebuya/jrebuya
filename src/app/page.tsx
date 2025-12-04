import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center font-sans bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg6.jpg')" }} 
    >
      <div className="text-center bg-white/60 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-black mb-6">
          JANA KIMBERLY SKINCARE PRODUCT
        </h1>

        <div className="flex justify-center gap-6 mt-4">
          <a
            href="/login"
            className="px-6 py-3 rounded-xl bg-peach-500 text-black font-semibold shadow hover:bg-peach-600 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-3 rounded-xl bg-peach-400 text-black font-semibold shadow hover:bg-peach-500 transition"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
