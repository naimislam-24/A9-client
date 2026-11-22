"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Utensils,
  MapPin,
} from "lucide-react";

interface MenuItem {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  approvalStatus?: "Pending" | "Approved" | "Rejected";
}

const Managemenuitem = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch All Menu Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/usersvendor`);

        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [API_URL]);

  // Accept or Reject Menu Item
  const handleStatus = async (id: string, status: "Approved" | "Rejected") => {
    try {
      setUpdating(id);

      const res = await fetch(`${API_URL}/usersvendor/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          approvalStatus: status,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, approvalStatus: status } : item,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update menu item status");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-600";

      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Manage Menu Items
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review and manage vendor submitted menu items.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="rounded-xl border border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-500">Total Items</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {items.length}
            </h2>
          </div>

          <div className="rounded-xl border border-amber-100 px-4 py-3">
            <p className="text-xs text-gray-500">Pending</p>
            <h2 className="mt-1 text-xl font-bold text-amber-600">
              {
                items.filter(
                  (item) => (item.approvalStatus || "Pending") === "Pending",
                ).length
              }
            </h2>
          </div>

          <div className="rounded-xl border border-green-100 px-4 py-3">
            <p className="text-xs text-gray-500">Approved</p>
            <h2 className="mt-1 text-xl font-bold text-green-600">
              {
                items.filter((item) => item.approvalStatus === "Approved")
                  .length
              }
            </h2>
          </div>
        </div>

        {/* Menu Items */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="font-bold text-gray-800">All Submitted Items</h2>
            <p className="mt-1 text-xs text-gray-500">
              Accept or reject vendor menu submissions.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-orange-500" size={30} />
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <Utensils className="mx-auto text-gray-300" size={40} />
              <h3 className="mt-3 font-semibold text-gray-700">
                No Menu Items Found
              </h3>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const status = item.approvalStatus || "Pending";

                return (
                  <div
                    key={item._id}
                    className="flex flex-col justify-between gap-4 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center"
                  >
                    {/* Item Information */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.itemName}
                          fill
                          sizes="56px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-gray-900">
                          {item.itemName}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.category} · ${item.price}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {item.location}
                        </p>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
                      >
                        {status}
                      </span>

                      {status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleStatus(item._id, "Approved")}
                            disabled={updating === item._id}
                            className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 transition hover:bg-green-100 disabled:opacity-50"
                          >
                            {updating === item._id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <CheckCircle2 size={14} />
                            )}
                            Accept
                          </button>

                          <button
                            onClick={() => handleStatus(item._id, "Rejected")}
                            disabled={updating === item._id}
                            className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Managemenuitem;
