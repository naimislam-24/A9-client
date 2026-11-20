"use client";

import Image from "next/image";
import { Truck, BadgeCheck, Star, ArrowRight } from "lucide-react";
import banner from "@/app/image/banner.jpg";

const Banner = () => {
  return (
    <section className="mx-auto container w-full px-3 py-5 sm:px-5">
      {/* Main Banner Container */}
      <div className="relative isolate overflow-hidden rounded-t-2xl">
        {/* Your Defined Background Image */}
        <Image
          src={banner}
          alt="Pizza Banner"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center"
        />

        {/* Hero Content */}
        <div className="relative z-10 grid min-h-[420px] grid-cols-1 items-center px-6 py-10 sm:min-h-[450px] sm:px-10 lg:min-h-[440px] lg:grid-cols-2 lg:px-12">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-[46px]">
              Hot & Fresh Pizza
              <span className="block">Delivered to Your Door</span>
            </h1>

            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white drop-shadow-md sm:text-base">
              Discover the best pizzas from local restaurants and enjoy fast
              delivery!
            </p>

            {/* Explore Menu Button */}
            <button className="group mt-6 inline-flex items-center gap-2 rounded-xl border border-red-400/50 bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-red-700">
              Explore Menu
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Right Side Space */}
          <div className="hidden lg:block" />
        </div>

        {/* Bottom Smooth Uneven Wave */}
        <div className="pointer-events-none absolute bottom-[-1px] left-0 z-20 w-full overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1440 50"
            preserveAspectRatio="none"
            className="block h-[32px] w-full sm:h-[36px] lg:h-[40px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 36 C180 36 245 18 450 17 C680 16 820 38 1050 34 C1210 31 1340 20 1440 29 L1440 50 L0 50 Z"
              fill="#fff9f3"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Feature Section */}
      <div className="relative z-20 -mt-px rounded-b-2xl bg-[#fff9f3] px-5 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
        <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-5 sm:grid-cols-3 sm:gap-3">
          {/* Fast Delivery */}
          <div className="flex items-center justify-center gap-3">
            <Truck size={23} className="shrink-0 text-red-700" />

            <span className="text-sm font-bold text-[#29150f]">
              Fast Delivery
            </span>
          </div>

          {/* Best Quality */}
          <div className="flex items-center justify-center gap-3 border-y border-orange-200 py-4 sm:border-x sm:border-y-0 sm:py-0">
            <BadgeCheck size={23} className="shrink-0 text-red-700" />

            <span className="text-sm font-bold text-[#29150f]">
              Best Quality
            </span>
          </div>

          {/* Top Rated */}
          <div className="flex items-center justify-center gap-3">
            <Star size={23} className="shrink-0 fill-red-700 text-red-700" />

            <span className="text-sm font-bold text-[#29150f]">Top Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
