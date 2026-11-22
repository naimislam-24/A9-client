// "use client";

// import React, { useEffect, useState } from "react";
// import { Heart, MapPin, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { useSession } from "@/lib/auth-client";
// import { email } from "better-auth";

// interface VendorProduct {
//   _id: string;
//   itemName: string;
//   category: string;
//   description: string;
//   price: number;
//   location: string;
//   imageUrl: string;
// }

// const VendorProducts = () => {
//   // const { data: session } = useSession();
//   // console.log(session);

//   const [products, setProducts] = useState<VendorProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // setLoading(true);
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/usersvendor`,
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch products");
//         }

//         const data = await res.json();
//         console.log(data);

//         setProducts(Array.isArray(data) ? data : data.data || []);
//       } catch (error) {
//         console.error(error);
//         setError("Something went wrong. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex min-h-60 items-center justify-center">
//         <span className="loading loading-spinner loading-lg text-orange-500"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="py-10 text-center text-red-500">{error}</p>;
//   }

//   if (products.length === 0) {
//     return (
//       <p className="py-10 text-center text-gray-500">No products available.</p>
//     );
//   }

//   return (
//     <section className="bg-[#faf9f6] px-4 py-12 md:px-8 lg:px-12">
//       <div className="mx-auto max-w-7xl">
//         {/* Section Heading */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
//               Fresh & Delicious
//             </p>

//             <h2 className="text-2xl font-bold text-[#252525] md:text-3xl">
//               Explore Our Menu
//             </h2>

//             <p className="mt-2 text-sm text-gray-500">
//               Discover delicious food from our vendors.
//             </p>
//           </div>
//         </div>

//         {/* Product Cards */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//             >
//               {/* Image */}
//               <div className="relative h-52 overflow-hidden">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.itemName}
//                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />

//                 {/* Category */}
//                 <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
//                   {product.category}
//                 </span>

//                 {/* Favorite */}
//                 <button
//                   type="button"
//                   aria-label="Add to favorites"
//                   className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:bg-orange-500 hover:text-white"
//                 >
//                   <Heart size={18} />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 {/* Title & Price */}
//                 <div className="flex items-start justify-between gap-2">
//                   <h3 className="line-clamp-1 text-lg font-bold text-[#252525]">
//                     {product.itemName}
//                   </h3>

//                   <span className="shrink-0 text-base font-bold text-orange-600">
//                     ${product.price.toFixed(2)}
//                   </span>
//                 </div>

//                 {/* Location */}
//                 <div className="mt-3 flex items-center gap-2">
//                   <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
//                     <MapPin size={15} />
//                   </span>

//                   <div>
//                     <p className="text-xs font-semibold text-gray-700">
//                       Vendor Location
//                     </p>
//                     <p className="text-xs text-gray-500">{product.location}</p>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
//                   {product.description}
//                 </p>

//                 {/* View Details */}
//                 <Link href={`/cards/${product._id}`}>
//                   <button
//                     type="button"
//                     className="mt-4 flex w-full items-center justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
//                   >
//                     View Details
//                     <ArrowRight
//                       size={17}
//                       className="transition-transform group-hover:translate-x-1"
//                     />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VendorProducts;

"use client";

import React, { useEffect, useState } from "react";
import { Heart, MapPin, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { email } from "better-auth";

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

  // Search & Category States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usersvendor/approved`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        console.log(data);

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

  // Dynamic Categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  // Search & Category Filtering
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      product.itemName.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

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
        <div className="mb-8">
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

        {/* Search Bar */}
        <div className="mb-5">
          <div className="relative">
            <Search
              size={19}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search pizzas, sides, dessert..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pr-4 pl-11 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? "border-[#252525] bg-[#252525] text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#252525]">
            {filteredProducts.length} delicious finds
          </h3>

          <p className="hidden text-xs text-gray-400 sm:block">
            Made by your neighborhood vendors
          </p>
        </div>

        {/* Product Cards */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <Search size={35} className="mx-auto mb-3 text-gray-300" />

            <h3 className="text-lg font-bold text-gray-700">
              No products found!
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
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
                      ${product.price.toFixed(2)}
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
                      <p className="text-xs text-gray-500">
                        {product.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {product.description}
                  </p>

                  {/* View Details */}
                  <Link href={`/cards/${product._id}`}>
                    <button
                      type="button"
                      className="mt-4 flex w-full items-center justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
                    >
                      View Details
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VendorProducts;
