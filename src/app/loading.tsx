import { Pizza } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 px-4">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-xl shadow-red-500/25">
          <Pizza size={42} strokeWidth={2} />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Pizza<span className="text-red-600">Hub</span>
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Preparing something delicious...
        </p>

        {/* Loading Spinner */}
        <div className="relative mt-9 flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />
          <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
        </div>

        <p className="mt-5 text-sm font-semibold text-red-600">
          Please wait...
        </p>

        {/* Loading Progress Animation */}
        <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-red-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-rose-500" />
        </div>
      </div>
    </main>
  );
}
