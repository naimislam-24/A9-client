"use client";

import React, { useEffect, useState } from "react";
import {
  Utensils,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Loader2,
  LayoutDashboard,
} from "lucide-react";

interface MenuItem {
  _id: string;
  approvalStatus?: "Pending" | "Approved" | "Rejected";
  status?: string;
}

const OverviewPage = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usersvendor`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Count Items
  const approvedCount = items.filter(
    (item) => (item.approvalStatus || item.status) === "Approved",
  ).length;

  const rejectedCount = items.filter(
    (item) => (item.approvalStatus || item.status) === "Rejected",
  ).length;

  const pendingCount = items.filter(
    (item) => (item.approvalStatus || item.status || "Pending") === "Pending",
  ).length;

  const stats = [
    {
      title: "Total Menu Items",
      count: items.length,
      description: "Total submitted menu items",
      icon: Utensils,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    {
      title: "Approved Items",
      count: approvedCount,
      description: "Successfully accepted items",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      border: "border-emerald-100",
    },
    {
      title: "Pending Items",
      count: pendingCount,
      description: "Waiting for your approval",
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      border: "border-amber-100",
    },
    {
      title: "Rejected Items",
      count: rejectedCount,
      description: "Items you have rejected",
      icon: XCircle,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      border: "border-rose-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
              <LayoutDashboard size={17} />
              Admin Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Overview
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Here is whats happening with your shop.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
            <p className="text-xs text-gray-400">Dashboard Status</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Active
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 size={35} className="animate-spin text-orange-500" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className={`rounded-2xl border ${stat.border} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.title}
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                          {stat.count}
                        </h2>
                      </div>

                      <div className={`rounded-xl p-3 ${stat.iconBg}`}>
                        <Icon size={25} className={stat.iconColor} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                      <TrendingUp size={15} className={stat.iconColor} />
                      <p className="text-xs text-gray-500">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Approval Overview */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Menu Approval Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Summary of all menu item approval activities.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-5 flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
                {items.length > 0 && (
                  <>
                    <div
                      className="bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${(approvedCount / items.length) * 100}%`,
                      }}
                    />

                    <div
                      className="bg-amber-400 transition-all duration-500"
                      style={{
                        width: `${(pendingCount / items.length) * 100}%`,
                      }}
                    />

                    <div
                      className="bg-rose-500 transition-all duration-500"
                      style={{
                        width: `${(rejectedCount / items.length) * 100}%`,
                      }}
                    />
                  </>
                )}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Approved
                    </p>
                    <p className="text-xs text-gray-500">
                      {approvedCount} Items
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Pending
                    </p>
                    <p className="text-xs text-gray-500">
                      {pendingCount} Items
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Rejected
                    </p>
                    <p className="text-xs text-gray-500">
                      {rejectedCount} Items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
