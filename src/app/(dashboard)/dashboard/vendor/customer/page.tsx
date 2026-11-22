"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  MapPin,
  CalendarDays,
  Package,
  Loader2,
} from "lucide-react";

interface Order {
  _id: string;
  productId: string;
  itemName: string;
  price: number;
  deliveryDate: string;
  deliveryAddress: string;
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
        <Loader2 className="animate-spin text-orange-500" size={35} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Customer Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View all orders placed by your customers.
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-8 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-orange-100 p-3">
              <ShoppingBag className="text-orange-600" size={25} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h2 className="text-2xl font-bold text-gray-900">
                {orders.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <Package className="mx-auto mb-4 text-gray-400" size={45} />
            <h2 className="text-xl font-semibold text-gray-800">
              No Orders Found
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-orange-100 p-2">
                      <ShoppingBag size={19} className="text-orange-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      Customer Order
                    </span>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                    Ordered
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-bold text-gray-900">
                  {order.itemName}
                </h2>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Package size={17} className="text-orange-500" />
                    <span>Product ID: {order.productId}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CalendarDays size={17} className="text-orange-500" />
                    <span>Delivery: {order.deliveryDate}</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-orange-500"
                    />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-medium text-gray-500">
                    Total Price
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    ${order.price}
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
