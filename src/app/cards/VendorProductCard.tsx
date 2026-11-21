"use client";

import React, { useEffect, useState } from "react";
import { Heart, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface VendorProduct {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
}

const VendorProducts = () => {
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usersvendor`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">No products available.</p>
    );
  }

  return (
    <section className="bg-[#faf9f6] px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
              Fresh & Delicious
            </p>

            <h2 className="text-2xl font-bold text-[#252525] md:text-3xl">
              Explore Our Menu
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Discover delicious food from our vendors.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.itemName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Category */}
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                  {product.category}
                </span>

                {/* Favorite */}
                <button
                  type="button"
                  aria-label="Add to favorites"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:bg-orange-500 hover:text-white"
                >
                  <Heart size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title & Price */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-lg font-bold text-[#252525]">
                    {product.itemName}
                  </h3>

                  <span className="shrink-0 text-base font-bold text-orange-600">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>

                {/* Location */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <MapPin size={15} />
                  </span>

                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      Vendor Location
                    </p>
                    <p className="text-xs text-gray-500">{product.location}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                  {product.description}
                </p>

                {/* View Details */}
                <Link
                  href={`/cards/${product._id}`}
                  className="mt-4 flex w-full items-center justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                  View Details
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorProducts;
