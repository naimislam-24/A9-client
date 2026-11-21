// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight, MapPin, Pizza } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// interface TFeaturedPizza {
//   _id: string;
//   itemName: string;
//   category: string;
//   description: string;
//   price: number;
//   location: string;
//   imageUrl: string;
// }

// export default function FeaturedPizzas() {
//   const [pizzas, setPizzas] = useState<TFeaturedPizza[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeaturedPizzas = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/usersvendor/featured`,
//           { cache: "no-store" },
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch featured pizzas");
//         }

//         const data = await res.json();

//         setPizzas(
//           Array.isArray(data) ? data : data.data || data.featured || [],
//         );
//       } catch (error) {
//         console.error("Featured pizzas error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeaturedPizzas();
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-12">
//         <div className="mx-auto container px-4">
//           <div className="mb-7 h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

//           <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
//             {[1, 2, 3, 4].map((item) => (
//               <Card key={item} className="overflow-hidden border-0 shadow-sm">
//                 <div className="h-44 animate-pulse bg-gray-200" />
//                 <CardContent className="space-y-3 p-4">
//                   <div className="h-5 animate-pulse rounded bg-gray-200" />
//                   <div className="h-4 animate-pulse rounded bg-gray-100" />
//                   <div className="h-9 animate-pulse rounded bg-gray-100" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!pizzas.length) {
//     return (
//       <section className="py-16 text-center">
//         <Pizza className="mx-auto mb-3 h-12 w-12 text-gray-300" />
//         <h2 className="text-xl font-bold text-gray-800">
//           No Featured Pizzas Found
//         </h2>
//         <p className="mt-2 text-sm text-gray-500">
//           Featured pizzas will appear here.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="overflow-hidden bg-gradient-to-b from-orange-50/70 to-white py-14 sm:py-16">
//       <div className="mx-auto container px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <Badge className="mb-3 border-orange-200 bg-orange-100 text-orange-600 hover:bg-orange-100">
//               Our Special Menu
//             </Badge>

//             <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
//               Featured <span className="text-orange-600">Pizzas</span>
//             </h2>

//             <p className="mt-2 text-sm text-gray-500 sm:text-base">
//               Discover our delicious and freshly prepared pizzas.
//             </p>
//           </div>

//           <Button
//             // asChild
//             variant="outline"
//             className="hidden rounded-full border-orange-200 text-orange-600 hover:bg-orange-600 hover:text-white sm:flex"
//           >
//             <Link href="/menu">
//               View All
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//         </div>

//         {/* Right to Left Infinite Slider */}
//         <div className="featured-slider group relative">
//           <div className="featured-track flex w-max gap-5 py-3">
//             {[...pizzas, ...pizzas].map((pizza, index) => (
//               <Card
//                 key={`${pizza._id}-${index}`}
//                 className="w-[245px] shrink-0 overflow-hidden rounded-2xl border border-orange-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl sm:w-[275px] lg:w-[285px]"
//               >
//                 {/* Pizza Image */}
//                 <div className="relative h-44 overflow-hidden bg-orange-50">
//                   <Image
//                     src={pizza.imageUrl}
//                     alt={pizza.itemName}
//                     fill
//                     unoptimized
//                     sizes="285px"
//                     className="object-cover transition-transform duration-500 hover:scale-110"
//                   />

//                   <Badge className="absolute left-3 top-3 border-0 bg-white/95 text-orange-600 shadow-sm backdrop-blur-sm">
//                     {pizza.category}
//                   </Badge>
//                 </div>

//                 <CardContent className="p-4">
//                   {/* Pizza Name */}
//                   <h3 className="truncate text-lg font-bold text-gray-900">
//                     {pizza.itemName}
//                   </h3>

//                   {/* Location */}
//                   <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
//                     <span className="truncate">{pizza.location}</span>
//                   </div>

//                   {/* Description */}
//                   <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
//                     {pizza.description}
//                   </p>

//                   {/* Price and Button */}
//                   <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
//                     <div>
//                       <p className="text-xs text-gray-400">Price</p>
//                       <p className="text-xl font-extrabold text-orange-600">
//                         ৳{pizza.price}
//                       </p>
//                     </div>

//                     <Button
//                       //   asChild
//                       size="sm"
//                       className="rounded-full bg-orange-600 px-4 text-white shadow-sm transition-all hover:bg-orange-700"
//                     >
//                       <Link href={`/menu/${pizza._id}`}>
//                         View Details
//                         <ArrowRight className="ml-1 h-4 w-4" />
//                       </Link>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Mobile View All */}
//         <div className="mt-6 flex justify-center sm:hidden">
//           <Button
//             // asChild
//             className="rounded-full bg-orange-600 px-7 hover:bg-orange-700"
//           >
//             <Link href="/menu">
//               View All Pizzas
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//         </div>
//       </div>

//       {/* Slider Animation */}
//       <style jsx global>{`
//         @keyframes featured-scroll {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }

//         .featured-track {
//           animation: featured-scroll 35s linear infinite;
//           width: max-content;
//         }

//         .featured-slider:hover .featured-track {
//           animation-play-state: paused;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .featured-track {
//             animation: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Pizza } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/auth-client";

interface TFeaturedPizza {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
}

export default function FeaturedPizzas() {
  const { data: session } = useSession();

  const [pizzas, setPizzas] = useState<TFeaturedPizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPizzas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usersvendor/featured/${session?.user?.email}`,
          { cache: "no-store" },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch featured pizzas");
        }

        const data = await res.json();

        setPizzas(
          Array.isArray(data) ? data : data.data || data.featured || [],
        );
      } catch (error) {
        console.error("Featured pizzas error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPizzas();
  }, [session?.user?.email]);
  // Depandenci Array

  // Loading State
  if (loading) {
    return (
      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden border-0 shadow-sm">
                <div className="h-44 animate-pulse bg-gray-200" />
                <CardContent className="space-y-3 p-4">
                  <div className="h-5 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 animate-pulse rounded bg-gray-100" />
                  <div className="h-9 animate-pulse rounded bg-gray-100" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (!pizzas.length) {
    return (
      <section className="py-16 text-center">
        <Pizza className="mx-auto mb-3 h-12 w-12 text-gray-300" />

        <h2 className="text-xl font-bold text-gray-800">
          No Featured Pizzas Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Featured pizzas will appear here.
        </p>
      </section>
    );
  }

  // Reusable Pizza Card
  const PizzaCard = ({
    pizza,
    duplicate = false,
  }: {
    pizza: TFeaturedPizza;
    duplicate?: boolean;
  }) => (
    <Card className="w-[245px] shrink-0 overflow-hidden rounded-2xl border border-orange-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl sm:w-[275px] lg:w-[285px]">
      {/* Pizza Image */}
      <div className="relative h-44 overflow-hidden bg-orange-50">
        <Image
          src={pizza.imageUrl}
          alt={pizza.itemName}
          fill
          unoptimized
          sizes="285px"
          className="object-cover transition-transform duration-500 hover:scale-110"
        />

        <Badge className="absolute left-3 top-3 border-0 bg-white/95 text-orange-600 shadow-sm backdrop-blur-sm">
          {pizza.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        {/* Pizza Name */}
        <h3 className="truncate text-lg font-bold text-gray-900">
          {pizza.itemName}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
          <span className="truncate">{pizza.location}</span>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {pizza.description}
        </p>

        {/* Price and Button */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-xl font-extrabold text-orange-600">
              ৳{pizza.price}
            </p>
          </div>

          <Button
            // asChild
            size="sm"
            className="ml-auto flex h-10 items-center justify-center gap-2 rounded-full bg-orange-600 px-6 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg"
          >
            <Link
              href={`/cards/${pizza._id}`}
              tabIndex={duplicate ? -1 : undefined}
            >
              View Details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="overflow-hidden bg-gradient-to-b from-orange-50/70 to-white py-14 sm:py-16">
      {/* Main Container */}
      <div className="container mx-auto w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Badge className="mb-3 border-orange-200 bg-orange-100 text-orange-600 hover:bg-orange-100">
              Our Special Menu
            </Badge>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Featured <span className="text-orange-600">Pizzas</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Discover our delicious and freshly prepared pizzas.
            </p>
          </div>

          {/* <Button
            // asChild
            variant="outline"
            className="hidden rounded-full border-orange-200 text-orange-600 hover:bg-orange-600 hover:text-white sm:flex"
          >
            <Link href="/menu">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button> */}
          <Button
            // asChild
            variant="outline"
            className="group hidden rounded-full border-orange-200 px-5 text-orange-600 transition-all duration-300 hover:border-orange-600 hover:bg-orange-600 hover:text-white sm:flex"
          >
            <Link href="/cards" className="flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Right to Left Infinite Slider */}
        <div className="featured-slider group relative w-full min-w-0 overflow-hidden">
          <div className="featured-track flex w-max py-3">
            {/* First Card Group */}
            <div className="flex shrink-0 gap-5 pr-5">
              {pizzas.map((pizza) => (
                <PizzaCard key={pizza._id} pizza={pizza} />
              ))}
            </div>

            {/* Duplicate Card Group */}
            <div className="flex shrink-0 gap-5 pr-5" aria-hidden="true">
              {pizzas.map((pizza) => (
                <PizzaCard
                  key={`duplicate-${pizza._id}`}
                  pizza={pizza}
                  duplicate
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Button
            // asChild
            className="rounded-full bg-orange-600 px-7 hover:bg-orange-700"
          >
            <Link href="/cards">
              View All Pizzas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Slider Animation */}
      <style jsx global>{`
        @keyframes featured-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .featured-slider {
          width: 100%;
          overflow: hidden;
        }

        .featured-track {
          width: max-content;
          animation: featured-scroll 35s linear infinite;
          will-change: transform;
        }

        .featured-slider:hover .featured-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
