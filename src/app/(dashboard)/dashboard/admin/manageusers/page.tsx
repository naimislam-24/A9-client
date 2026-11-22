// import React from "react";

// const Manageusers = () => {
//   return (
//     <div>
//       <h1>Manageusers</h1>
//     </div>
//   );
// };

// export default Manageusers;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  ShieldCheck,
  Store,
  UserRound,
  Ban,
  CheckCircle2,
  Loader2,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "vendor" | "user";
  isBlocked?: boolean;
  image?: string;
}

const Manageusers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getTokenFromClient();
        const res = await fetch(`${API_URL}/users`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Fetch users error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL]);

  // Search and Filter
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // User Statistics
  const totalUsers = users.length;

  const adminCount = users.filter((user) => user.role === "admin").length;

  const vendorCount = users.filter((user) => user.role === "vendor").length;

  const blockedCount = users.filter((user) => user.isBlocked).length;

  // Block / Unblock User
  const handleBlock = async (id: string, isBlocked: boolean) => {
    try {
      setUpdating(id);

      const token = await getTokenFromClient();
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isBlocked: !isBlocked,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: !isBlocked } : user,
        ),
      );
    } catch (error) {
      console.error("Update user error:", error);
      alert("Failed to update user status");
    } finally {
      setUpdating(null);
    }
  };

  // Statistics Cards
  const stats = [
    {
      title: "Total Users",
      count: totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Admins",
      count: adminCount,
      icon: ShieldCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      title: "Vendors",
      count: vendorCount,
      icon: Store,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      title: "Blocked Users",
      count: blockedCount,
      icon: Ban,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
    },
  ];

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-50 text-purple-700";

      case "vendor":
        return "bg-orange-50 text-orange-700";

      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
              <Users size={17} />
              Admin Dashboard
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Manage Users
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View, search, manage and control user accounts.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-gray-600">
              User Management
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`rounded-2xl border ${stat.border} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900">
                      {loading ? "-" : stat.count}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.bg}`}>
                    <Icon size={25} className={stat.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Search and Filter Header */}
          <div className="border-b border-gray-100 p-5">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">All Users</h2>

              <p className="mt-1 text-xs text-gray-500">
                Manage all registered accounts and their permissions.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-orange-400 sm:w-44"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          {/* User List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={30} className="animate-spin text-orange-500" />
              <p className="mt-3 text-sm text-gray-500">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center">
              <UserRound size={40} className="mx-auto text-gray-300" />

              <h3 className="mt-3 font-semibold text-gray-700">
                No Users Found
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Try searching with another name or email.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-5 py-4">User</th>
                      <th className="px-4 py-4">Role</th>
                      <th className="px-4 py-4">Account Status</th>
                      <th className="px-5 py-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="transition hover:bg-gray-50/70"
                      >
                        {/* User Details */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50 font-bold text-orange-600">
                              {user.image ? (
                                <img
                                  src={user.image}
                                  alt={user.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                user.name?.charAt(0).toUpperCase() || "U"
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[180px] truncate text-sm font-semibold text-gray-800">
                                {user.name}
                              </p>

                              <p className="max-w-[200px] truncate text-xs text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getRoleStyle(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          {user.isBlocked ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                              <ShieldAlert size={13} />
                              Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                              <CheckCircle2 size={13} />
                              Active
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() =>
                              handleBlock(user._id, !!user.isBlocked)
                            }
                            disabled={
                              updating === user._id || user.role === "admin"
                            }
                            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                              user.isBlocked
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                          >
                            {updating === user._id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : user.isBlocked ? (
                              <CheckCircle2 size={14} />
                            ) : (
                              <Ban size={14} />
                            )}

                            {user.isBlocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-3 p-4 md:hidden">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50 font-bold text-orange-600">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          user.name?.charAt(0).toUpperCase() || "U"
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-gray-900">
                          {user.name}
                        </h3>

                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getRoleStyle(user.role)}`}
                        >
                          {user.role}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${user.isBlocked ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </div>

                      <button
                        onClick={() => handleBlock(user._id, !!user.isBlocked)}
                        disabled={
                          updating === user._id || user.role === "admin"
                        }
                        className={`rounded-lg px-3 py-2 text-xs font-semibold disabled:opacity-40 ${
                          user.isBlocked
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {updating === user._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : user.isBlocked ? (
                          "Unblock"
                        ) : (
                          "Block"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          {!loading && filteredUsers.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
              <p className="text-xs text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manageusers;
