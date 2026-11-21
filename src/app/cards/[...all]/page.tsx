import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, ShoppingBag, Tag } from "lucide-react";

interface VendorProduct {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
}

interface PageProps {
  params: Promise<{
    all: string[];
  }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { all } = await params;

  // Get Product ID from URL
  const productId = all[0];

  // Fetch products (no JSX here — see rule react-hooks/error-boundaries)
  let products: VendorProduct[] = [];
  let fetchFailed = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usersvendor`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    products = Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Product details error:", error);
    fetchFailed = true;
  }

  // Fetch Failed
  if (fetchFailed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f6] px-4 text-center">
        <h2 className="text-2xl font-bold text-red-500">Failed to Load Product</h2>

        <p className="mt-3 text-gray-500">Please try again later.</p>

        <Link
          href="/"
          className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Find Product by ID
  const product = products.find((item) => item._id === productId);

  // Product Not Found
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f6] px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Product Not Found!</h2>

        <p className="mt-3 text-gray-500">
          Sorry, this product is not available.
        </p>

        <Link
          href="/"
          className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#faf9f6] px-4 py-10 md:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-600 transition hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        {/* Details Card */}
        <div className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:grid-cols-2">
          {/* Product Image */}
          <div className="relative min-h-[300px] md:min-h-[550px]">
            <Image
              src={product.imageUrl}
              alt={product.itemName}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <span className="absolute bottom-5 left-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-lg">
              {product.category}
            </span>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            {/* Category */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              <Tag size={15} />
              {product.category}
            </div>

            {/* Product Name */}
            <h1 className="mt-4 text-3xl font-bold text-[#252525] sm:text-4xl">
              {product.itemName}
            </h1>

            {/* Description */}
            <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
              {product.description}
            </p>

            {/* Location */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <MapPin size={22} />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400">
                  Vendor Location
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.location}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-8 border-y border-gray-100 py-6">
              <p className="text-sm text-gray-400">Product Price</p>

              <h2 className="mt-2 text-3xl font-bold text-orange-600">
                ${Number(product.price).toFixed(2)}
              </h2>
            </div>

            {/* Order Button */}
            <button
              type="button"
              className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]"
            >
              <ShoppingBag size={20} />
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
