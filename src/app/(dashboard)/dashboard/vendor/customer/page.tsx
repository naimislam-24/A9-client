"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  MapPin,
  CalendarDays,
  Package,
  Loader2,
} from "lucide-react";
import Image from "next/image";

interface Order {
  _id: string;
  productId: string;
  itemName: string;
  price: number;
  deliveryDate: string;
  deliveryAddress: string;
  imageUrl: string;
}

const CustomerPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={30} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-5 border-b border-gray-100 pb-4">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Orders for your shop
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            View and manage all orders placed by your customers.
          </p>
        </div>

        {/* Total Orders */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={17} className="text-orange-500" />
            <span className="text-sm font-semibold text-gray-700">
              All Orders
            </span>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
            {orders.length} Orders
          </span>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
            <Package className="mx-auto mb-3 text-gray-300" size={38} />
            <h2 className="text-base font-semibold text-gray-800">
              No Orders Found
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between gap-3 py-4 transition-colors hover:bg-gray-50/70"
              >
                {/* Product Info */}
                <div className="flex min-w-0 items-center gap-3">
                  {/* Product Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-orange-50">
                      <Image
                        src={order.imageUrl}
                        alt={order.itemName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-gray-900">
                      {order.itemName}
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-500">
                      <span>Product ID: {order.productId}</span>

                      <span className="hidden text-gray-300 sm:inline">|</span>

                      <span>Delivery: {order.deliveryDate}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
                      <MapPin size={12} className="shrink-0" />
                      <span className="truncate">{order.deliveryAddress}</span>
                    </div>

                    <p className="mt-1 text-xs font-semibold text-orange-600">
                      ${order.price}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="shrink-0">
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-semibold text-green-600">
                    Ordered
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
