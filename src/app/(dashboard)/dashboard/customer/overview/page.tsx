// import React from "react";

// const OverviewPage = () => {
//   return (
//     <div>
//       <h1>Overvoew</h1>
//     </div>
//   );
// };

// export default OverviewPage;

"use client";

import React, { useEffect, useState } from "react";
import { Utensils, CheckCircle2, ShoppingCart, BadgeCheck } from "lucide-react";

interface Product {
  _id: string;
  itemName: string;
  status?: string;
  imageUrl?: string;
}

interface Order {
  _id: string;
  status?: string;
}

const OverviewPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/usersvendor`, {
            cache: "no-store",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            cache: "no-store",
          }),
        ]);

        if (!productRes.ok || !orderRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const productData = await productRes.json();
        const orderData = await orderRes.json();

        setProducts(
          Array.isArray(productData) ? productData : productData.data || [],
        );

        setOrders(Array.isArray(orderData) ? orderData : orderData.data || []);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate Statistics
  const totalItems = products.length;

  const activeItems = products.filter((item) =>
    ["active", "approved"].includes(item.status?.toLowerCase() || ""),
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending",
  ).length;

  const acceptedOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "accepted",
  ).length;

  // Dashboard Statistics
  const stats = [
    {
      title: "Total Items",
      value: totalItems,
      icon: Utensils,
      iconBg: "bg-rose-500",
      cardBg: "bg-gradient-to-br from-rose-50 to-white",
      border: "border-rose-100",
    },
    {
      title: "Active Items",
      value: activeItems,
      icon: CheckCircle2,
      iconBg: "bg-green-500",
      cardBg: "bg-gradient-to-br from-green-50 to-white",
      border: "border-green-100",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: ShoppingCart,
      iconBg: "bg-orange-500",
      cardBg: "bg-gradient-to-br from-orange-50 to-white",
      border: "border-orange-100",
    },
    {
      title: "Accepted Orders",
      value: acceptedOrders,
      icon: BadgeCheck,
      iconBg: "bg-violet-600",
      cardBg: "bg-gradient-to-br from-violet-50 to-white",
      border: "border-violet-100",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#faf9f6] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Banner */}
        <div
          className="relative mb-6 flex min-h-[120px] items-center overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 bg-cover bg-center px-5 py-6 shadow-sm sm:px-8"
          style={
            products[0]?.imageUrl
              ? {
                  backgroundImage: `linear-gradient(90deg, #fff7f2 0%, rgba(255,247,242,0.96) 35%, rgba(255,247,242,0.2) 100%), url("${products[0].imageUrl}")`,
                }
              : undefined
          }
        >
          <div className="relative z-10">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Welcome back,
              <br />
              Pizza Palace! 👋
            </h1>

            <p className="mt-2 text-sm font-medium text-gray-700 sm:text-base">
              Manage your restaurant and orders
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`flex items-center gap-4 rounded-2xl border ${stat.border} ${stat.cardBg} p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5`}
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg} text-white shadow-md`}
                >
                  <Icon size={23} strokeWidth={2.5} />
                </div>

                {/* Information */}
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
                    {stat.value}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OverviewPage;
