"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Upload,
  X,
  Store,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignUpPageProps {
  /** Pass your custom top banner image URL here */
  headerImageUrl?: string;
}

type UserRole = "customer" | "vendor";

export default function SignUpPage({
  // Replace this default URL with your own image path (e.g., "/images/pizza-banner.jpg")
  headerImageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
}: SignUpPageProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("customer");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imagebb = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB}`;

      const res = await fetch(imagebb, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        const uploadedImageUrl = data.data.display_url;

        setImageUrl(uploadedImageUrl);

        console.log("Image URL:", uploadedImageUrl);
      } else {
        console.log("Image Upload Failed:", data);
      }
    } catch (error) {
      console.log("Upload Error:", error);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setIsLoading(true);

  //   // console.log("Form Submitted!");

  //   console.log({
  //     fullName,
  //     email,
  //     password,
  //     role,
  //     profileImage,
  //   });

  //   try {
  //     const { data: resData, error } = await signUp.email({
  //       name: fullName,
  //       email,
  //       password,
  //       image: imageUrl,
  //     });

  //     console.log("Response Data:", resData);
  //     console.log("Response Error:", error);

  //     if (error) {
  //       console.log("Signup Error:", error.message);
  //       return;
  //     }

  //     if (resData) {
  //       console.log("Account created successfully!", resData);
  //     }
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { data: resData, error } = await signUp.email({
        name: fullName,
        email,
        password,
        image: imageUrl,
        role: role === "customer" ? "user" : "vendor",
      });

      if (error) {
        toast.error(error.message || "Signup failed!");
        return;
      }

      if (resData) {
        toast.success("Account created successfully!");

        router.push("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Please try again!");
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
    <div className="min-h-dvh w-full bg-[#FAF7F5] sm:bg-stone-100 flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 font-sans">
      {/* Compact & Responsive Card Container (removed fixed 860px height) */}
      <div className="w-full sm:max-w-[400px] md:max-w-[420px] flex-1 sm:flex-initial bg-[#FAF7F5] sm:rounded-[2rem] shadow-none sm:shadow-2xl overflow-hidden flex flex-col relative sm:border sm:border-stone-200/60">
        {/* Top Customizable Header Image Area (compact height) */}
        <div className="relative h-24 sm:h-24 w-full shrink-0 overflow-hidden bg-stone-900">
          <Image
            fill
            priority
            sizes="(max-width: 640px) 100vw, 420px"
            src={headerImageUrl}
            alt="Header Banner"
            className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        </div>

        {/* Main Content Body (justify-start prevents large mobile gap above footer) */}
        <div className="relative -mt-7 flex-1 bg-[#FAF7F5] rounded-t-[1.75rem] px-5 sm:px-6 pt-3 pb-5 flex flex-col justify-start shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          <div>
            {/* Compact Floating Pizza Slice Badge */}
            <div className="flex justify-center -mt-9 mb-2">
              <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-2xl bg-white shadow-lg shadow-red-900/10 border border-stone-100 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <span
                  className="text-3xl sm:text-4xl select-none"
                  role="img"
                  aria-label="Pizza"
                >
                  🍕
                </span>
              </div>
            </div>

            {/* Headings with tighter margin */}
            <div className="text-center mb-3.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                Sign Up
              </h1>
              <p className="text-stone-500 font-medium mt-0.5 text-xs">
                Create your account
              </p>
            </div>

            {/* Sign Up Form with tighter vertical gap (space-y-2.5) */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* Full Name Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#D32F2F] transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#D32F2F] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all"
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
                  minLength={8}
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Password must contain at least one uppercase letter, one lowercase letter, and 8 characters."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all"
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

              {/* Select Role Toggle */}
              <div className="pt-0.5">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Select Role
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      role === "customer"
                        ? "bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white shadow-md shadow-red-600/25 border border-transparent"
                        : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>Customer</span>
                    {role === "customer" && (
                      <span className="ml-1 text-white">✓</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("vendor")}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      role === "vendor"
                        ? "bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white shadow-md shadow-red-600/25 border border-transparent"
                        : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <Store className="w-4 h-4 shrink-0" />
                    <span>Vendor</span>
                    {role === "vendor" && (
                      <span className="ml-1 text-white">✓</span>
                    )}
                  </button>
                </div>

                <input type="hidden" name="role" value={role} />
              </div>

              {/* Upload Profile Image (Optional) */}
              <div className="pt-0.5 pb-1">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Upload Profile Image{" "}
                  <span className="font-normal text-stone-400">(Optional)</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-2 bg-white hover:bg-stone-50/80 border border-stone-200/90 hover:border-[#D32F2F]/40 rounded-xl shadow-sm flex items-center justify-between gap-2.5 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {imagePreview ? (
                      <Image
                        width={600}
                        height={600}
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-7 h-7 rounded-lg object-cover border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="px-2.5 py-1.5 rounded-lg bg-stone-100 group-hover:bg-red-50 text-stone-700 group-hover:text-[#D32F2F] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose File</span>
                      </div>
                    )}

                    <span className="text-xs font-medium text-stone-500 truncate">
                      {profileImage ? profileImage.name : "No file chosen"}
                    </span>
                  </div>

                  {profileImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      aria-label="Remove image"
                      className="p-1 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Primary Sign Up CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-5 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] hover:from-[#C62828] hover:to-[#9A1515] active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md shadow-red-600/25 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 cursor-pointer"
              >
                <span>{isLoading ? "Creating Account..." : "Sign Up"}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Divider with reduced margin (my-3.5) */}
            <div className="relative my-3.5 flex items-center justify-center">
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
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 active:scale-[0.99] border border-stone-200/90 rounded-xl shadow-sm flex items-center justify-center gap-2.5 text-sm font-semibold text-stone-700 transition-all cursor-pointer"
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

          {/* Footer Sign In Link (tucked cleanly below Google button) */}
          <div className="pt-3 mt-3.5 border-t border-stone-200/70 text-center">
            <p className="text-xs font-medium text-stone-500">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-bold text-[#D32F2F] hover:text-[#B71C1C] hover:underline transition-colors"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
