import Link from "next/link";
import { Pizza, Star } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f3] px-4 py-10">
      {/* Background Doodles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Pizza className="absolute left-[7%] top-[24%] h-12 w-12 rotate-[-25deg] text-orange-200" />
        <Pizza className="absolute right-[8%] top-[12%] h-14 w-14 rotate-[25deg] text-orange-200" />
        <Pizza className="absolute bottom-[12%] left-[10%] h-14 w-14 rotate-[15deg] text-orange-200" />
        <Pizza className="absolute bottom-[18%] right-[9%] h-12 w-12 rotate-[-20deg] text-orange-200" />

        <Star className="absolute left-[18%] top-[8%] h-8 w-8 rotate-12 text-orange-200" />
        <Star className="absolute right-[18%] top-[43%] h-7 w-7 text-orange-200" />
        <Star className="absolute bottom-[20%] left-[5%] h-7 w-7 text-orange-200" />
        <Star className="absolute bottom-[12%] right-[22%] h-8 w-8 text-orange-200" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Pizza Illustration */}
        <div className="relative mb-5 flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-orange-100/60 blur-2xl" />

          <div className="relative flex h-36 w-32 -rotate-6 items-center justify-center rounded-t-[45%] rounded-b-3xl border-[5px] border-[#a84c22] bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 shadow-xl shadow-orange-900/20">
            <div className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full border-4 border-[#a84c22] bg-orange-300" />

            {/* Pepperoni */}
            <span className="absolute left-5 top-7 h-4 w-4 rounded-full bg-red-600" />
            <span className="absolute right-5 top-8 h-4 w-4 rounded-full bg-red-600" />
            <span className="absolute bottom-7 left-7 h-3 w-3 rounded-full bg-red-600" />

            {/* Sunglasses */}
            <div className="absolute top-10 flex items-center gap-1">
              <div className="h-7 w-10 -rotate-6 rounded-b-xl rounded-t-md border-[3px] border-gray-900 bg-gray-950" />
              <div className="h-7 w-10 rotate-6 rounded-b-xl rounded-t-md border-[3px] border-gray-900 bg-gray-950" />
            </div>

            {/* Smile */}
            <div className="absolute bottom-8 h-3 w-5 rounded-b-full border-b-[4px] border-gray-900" />
          </div>

          <span className="absolute -bottom-1 right-1 text-3xl">✨</span>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-black tracking-tight text-red-600 sm:text-8xl">
          404
        </h1>

        <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mt-4 max-w-xs text-base leading-7 text-gray-600">
          Oops! Looks like this delicious page is missing. The page you are
          looking for doesnt exist.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-red-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
        >
          Go Home
        </Link>

        <p className="mt-6 text-xs font-medium text-gray-400">
          © {new Date().getFullYear()} PizzaHub. All rights reserved.
        </p>
      </div>
    </main>
  );
}
