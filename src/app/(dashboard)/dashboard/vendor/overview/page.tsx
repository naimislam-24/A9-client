"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, CheckCircle2, Eye, Utensils, MapPin, Tag } from "lucide-react";
import { useSession } from "@/lib/auth-client";

type TMenuItem = {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  status?: "Pending" | "Active" | "Rejected";
  createdAt?: string;
};

export default function RecentItems() {
  const { data: session } = useSession();

  const [items, setItems] = useState<TMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usersvendor/featured/${session?.user?.email}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const result = await response.json();

        console.log("Menu Items:", result);

        setItems(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [session?.user?.email]);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Recent Items</h2>
          <p className="mt-1 text-xs text-gray-500">
            Your recently added menu items
          </p>
        </div>

        <button className="text-sm font-semibold text-orange-600 hover:text-orange-700">
          View All →
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="py-8 text-center text-sm text-gray-500">
          Loading items...
        </p>
      ) : items.length === 0 ? (
        <div className="py-10 text-center">
          <Utensils className="mx-auto mb-2 text-gray-400" size={32} />
          <p className="text-sm text-gray-500">No menu items found.</p>
        </div>
      ) : (
        /* Menu Items */
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="group flex flex-col gap-3 rounded-xl border border-gray-100 p-3 transition duration-300 hover:border-orange-200 hover:bg-orange-50/30 sm:flex-row sm:items-center"
            >
              {/* Image */}
              <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-20">
                <Image
                  src={item.imageUrl}
                  alt={item.itemName}
                  fill
                  sizes="80px"
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-gray-900">
                  {item.itemName}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Tag size={12} />
                    {item.category}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                </div>

                <p className="mt-1 text-sm font-bold text-orange-600">
                  ${item.price}
                </p>
              </div>

              {/* Status and Action */}
              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    (item.status || "Pending") === "Pending"
                      ? "bg-amber-50 text-amber-600"
                      : item.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  {(item.status || "Pending") === "Pending" ? (
                    <Clock size={13} />
                  ) : item.status === "Active" ? (
                    <CheckCircle2 size={13} />
                  ) : null}

                  {item.status || "Pending"}
                </span>

                <button
                  type="button"
                  title="View item"
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-orange-100 hover:text-orange-600"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
