"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBag, MapPin, CalendarDays, X } from "lucide-react";

interface Order {
  _id: string;
  productId: string;
  itemName: string;
  price: number;
  deliveryDate: string;
  deliveryAddress: string;
  instructions?: string;
  status?: string;
  imageUrl?: string;
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  // Error
  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }

  return (
    <section className="min-h-screen bg-[#faf9f6] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Your Food Journey
          </p>

          <h1 className="text-2xl font-bold text-[#252525] sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track and manage your food orders.
          </p>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-4 py-16 text-center shadow-sm">
            <ShoppingBag size={42} className="mx-auto mb-4 text-gray-300" />

            <h2 className="text-lg font-bold text-gray-700">No Orders Yet!</h2>

            <p className="mt-2 text-sm text-gray-500">
              Your orders will appear here after placing an order.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Product Information */}
                <div className="flex min-w-0 items-center gap-3">
                  {/* Product Image */}
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-orange-50">
                    {order.imageUrl ? (
                      <img
                        src={order.imageUrl}
                        alt={order.itemName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-orange-500">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-gray-800 sm:text-base">
                      {order.itemName}
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400">
                      <span>${Number(order.price).toFixed(2)}</span>

                      <span>•</span>

                      <span className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        {order.deliveryDate}
                      </span>
                    </div>

                    <p className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
                      <MapPin size={12} className="shrink-0" />
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3 sm:justify-end sm:border-0 sm:pt-0">
                  {/* Order Status */}
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      order.status === "Cancelled"
                        ? "bg-red-50 text-red-600"
                        : order.status === "Delivered"
                          ? "bg-green-50 text-green-600"
                          : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    disabled
                    title="Cancel API is not connected yet"
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 opacity-70"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrdersPage;
