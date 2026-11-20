"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { authClient, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SignInPageProps {
  /** Pass your custom top banner image URL here */
  headerImageUrl?: string;
}

export default function SignInPage({
  headerImageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
}: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     console.log({ email, password, rememberMe });
  //   }, 1000);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);

      const { data: resData, error } = await signIn.email({
        email: data.email as string,
        password: data.password as string,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (resData) {
        toast.success("Login successful!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-dvh w-full bg-[#FAF7F5] sm:bg-stone-100 flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 md:p-6 font-sans">
      {/* Fluid Responsive Card Container */}
      <div className="w-full sm:max-w-[400px] md:max-w-[430px] flex-1 sm:flex-initial bg-[#FAF7F5] sm:rounded-[2rem] shadow-none sm:shadow-2xl overflow-hidden flex flex-col relative sm:border sm:border-stone-200/60">
        {/* Top Customizable Header Image Area */}
        <div className="relative h-28 sm:h-24 md:h-28 w-full shrink-0 overflow-hidden bg-stone-900">
          <Image
            fill
            priority
            sizes="(max-width: 640px) 100vw, 430px"
            src={headerImageUrl}
            alt="Header Banner"
            className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        </div>

        {/* Main Content Body (justify-start keeps footer close to Google button on mobile) */}
        <div className="relative -mt-7 flex-1 bg-[#FAF7F5] rounded-t-[1.75rem] px-5 sm:px-6 md:px-7 pt-3 pb-6 sm:pb-5 flex flex-col justify-start shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          <div>
            {/* Floating Pizza Slice Badge */}
            <div className="flex justify-center -mt-9 sm:-mt-10 mb-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-lg shadow-red-900/10 border border-stone-100 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <span
                  className="text-3xl sm:text-4xl select-none"
                  role="img"
                  aria-label="Pizza"
                >
                  🍕
                </span>
              </div>
            </div>

            {/* Headings */}
            <div className="text-center mb-4">
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                Sign In
              </h1>
              <p className="text-stone-500 font-medium mt-0.5 text-xs sm:text-[13px]">
                Welcome Back! Craving something delicious?
              </p>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#D32F2F] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-stone-200/90 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#D32F2F] transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-stone-200/90 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 pb-1">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={rememberMe}
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      rememberMe
                        ? "bg-[#D32F2F] border-[#D32F2F] text-white shadow-sm shadow-red-600/30"
                        : "bg-white border-stone-300 group-hover:border-[#D32F2F]"
                    }`}
                  >
                    {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span className="text-xs font-semibold text-stone-700">
                    Remember Me
                  </span>
                </label>

                <a
                  href="#forgot-password"
                  className="text-xs font-semibold text-[#D32F2F] hover:text-[#B71C1C] hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Primary Sign In CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-5 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] hover:from-[#C62828] hover:to-[#9A1515] active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md shadow-red-600/25 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 cursor-pointer"
              >
                <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-3.5 sm:my-4 flex items-center justify-center">
              <div className="border-t border-stone-200 w-full" />
              <span className="bg-[#FAF7F5] px-2.5 text-xs font-medium text-stone-400 whitespace-nowrap">
                or continue with
              </span>
              <div className="border-t border-stone-200 w-full" />
            </div>

            {/* Google Social Login Button */}
            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              className="w-full py-2.5 sm:py-3 px-4 bg-white hover:bg-stone-50 active:scale-[0.99] border border-stone-200/90 rounded-xl shadow-sm flex items-center justify-center gap-2.5 text-sm font-semibold text-stone-700 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer Sign Up Link (directly below Google button with tight margin) */}
          <div className="pt-3.5 mt-4 border-t border-stone-200/70 text-center">
            <p className="text-xs font-medium text-stone-500">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="font-bold text-[#D32F2F] hover:text-[#B71C1C] hover:underline transition-colors"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
