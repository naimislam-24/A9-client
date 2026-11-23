// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   Store,
//   ShoppingBag,
//   UtensilsCrossed,
//   ClipboardList,
//   User,
//   Settings,
//   LucideIcon,
// } from "lucide-react";

// import { useSession } from "@/lib/auth-client";

// interface MenuItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
// }

// interface MenuItems {
//   admin: MenuItem[];
//   vendor: MenuItem[];
//   customer: MenuItem[];
// }

// const menuItems: MenuItems = {
//   admin: [
//     {
//       name: "Overview",
//       href: "/dashboard/admin/overview",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Manage Users",
//       href: "/dashboard/admin/manageusers",
//       icon: Users,
//     },
//     {
//       name: "Manage Menu Items",
//       href: "/dashboard/admin/managemenuitem",
//       icon: Store,
//     },
//     {
//       name: "Transactions",
//       href: "/dashboard/admin/transactions",
//       icon: ShoppingBag,
//     },
//   ],

//   vendor: [
//     {
//       name: "Overview",
//       href: "/dashboard/vendor/overview",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Add Menu Item",
//       href: "/dashboard/vendor/addmenu",
//       icon: Store,
//     },
//     {
//       name: "My Menu Items",
//       href: "/dashboard/vendor/mymenu",
//       icon: UtensilsCrossed,
//     },
//     {
//       name: "Customer Orders",
//       href: "/dashboard/vendor/customer",
//       icon: ClipboardList,
//     },
//     {
//       name: "Subscription",
//       href: "/dashboard/vendor/subscription",
//       icon: ClipboardList,
//     },
//   ],

//   customer: [
//     {
//       name: "Overview",
//       href: "/dashboard/customer/overview",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Orders",
//       href: "/dashboard/customer/myorders",
//       icon: ShoppingBag,
//     },
//   ],
// };

// const DashboardSidebar = () => {
//   const pathname = usePathname();

//   const { data: session, isPending } = useSession();

//   const userRole = session?.user?.role;
//   const role = userRole === "user" ? "customer" : userRole;

//   if (isPending) {
//     return (
//       <aside className="min-h-screen w-full p-5">
//         <p className="text-sm text-gray-500">Loading dashboard...</p>
//       </aside>
//     );
//   }

//   if (!role || !["admin", "vendor", "customer"].includes(role)) {
//     return (
//       <aside className="min-h-screen w-full p-5">
//         <p className="text-sm text-red-500">Unauthorized Access</p>
//       </aside>
//     );
//   }

//   const items = menuItems[role as keyof MenuItems];

//   return (
//     <aside className="sticky top-0 flex h-screen w-full flex-col overflow-y-auto bg-white p-4 dark:bg-gray-950 sm:p-5">
//       {/* Logo */}
//       <Link
//         href="/"
//         className="mb-10 flex items-center gap-2 px-2 text-2xl font-extrabold tracking-tight text-red-600"
//       >
//         <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-500/20">
//           P
//         </span>
//         PizzaHub
//       </Link>

//       {/* Dashboard Title */}
//       <div className="mb-5 px-3">
//         <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400">
//           {role} Dashboard
//         </p>
//         <div className="mt-3 h-1 w-10 rounded-full bg-red-600" />
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 space-y-2">
//         {items.map((item) => {
//           const Icon = item.icon;
//           const active = pathname === item.href;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
//                 active
//                   ? "bg-red-600 text-white shadow-md shadow-red-500/20"
//                   : "text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-red-400"
//               }`}
//             >
//               <Icon
//                 size={19}
//                 strokeWidth={2}
//                 className={`shrink-0 transition-transform duration-200 ${
//                   active ? "text-white" : "group-hover:scale-110"
//                 }`}
//               />
//               <span>{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Settings */}
//       <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-800">
//         <Link
//           href="/dashboard/settings"
//           className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800"
//         >
//           <Settings size={19} />
//           Settings
//         </Link>

//         <div className="mt-5 rounded-xl bg-red-50 p-3 dark:bg-gray-900">
//           <p className="text-xs font-semibold text-red-600 dark:text-red-400">
//             PizzaHub Dashboard
//           </p>
//           <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
//             Manage your business easily.
//           </p>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default DashboardSidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingBag,
  UtensilsCrossed,
  ClipboardList,
  Settings,
  LucideIcon,
  Menu,
  X,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MenuItems {
  admin: MenuItem[];
  vendor: MenuItem[];
  customer: MenuItem[];
}

const menuItems: MenuItems = {
  admin: [
    {
      name: "Overview",
      href: "/dashboard/admin/overview",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manageusers",
      icon: Users,
    },
    {
      name: "Manage Menu Items",
      href: "/dashboard/admin/managemenuitem",
      icon: Store,
    },
    {
      name: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: ShoppingBag,
    },
  ],

  vendor: [
    {
      name: "Overview",
      href: "/dashboard/vendor/overview",
      icon: LayoutDashboard,
    },
    {
      name: "Add Menu Item",
      href: "/dashboard/vendor/addmenu",
      icon: Store,
    },
    {
      name: "My Menu Items",
      href: "/dashboard/vendor/mymenu",
      icon: UtensilsCrossed,
    },
    {
      name: "Customer Orders",
      href: "/dashboard/vendor/customer",
      icon: ClipboardList,
    },
    {
      name: "Subscription",
      href: "/dashboard/vendor/subscription",
      icon: ClipboardList,
    },
  ],

  customer: [
    {
      name: "Overview",
      href: "/dashboard/customer/overview",
      icon: LayoutDashboard,
    },
    {
      name: "My Orders",
      href: "/dashboard/customer/myorders",
      icon: ShoppingBag,
    },
  ],
};

const DashboardSidebar = () => {
  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  const userRole = session?.user?.role;
  const role = userRole === "user" ? "customer" : userRole;

  if (isPending) {
    return (
      <aside className="w-full p-5">
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      </aside>
    );
  }

  if (!role || !["admin", "vendor", "customer"].includes(role)) {
    return (
      <aside className="w-full p-5">
        <p className="text-sm text-red-500">Unauthorized Access</p>
      </aside>
    );
  }

  const items = menuItems[role as keyof MenuItems];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-full flex-col overflow-y-auto bg-white p-4 dark:bg-gray-950 sm:flex sm:p-5">
        {/* Logo */}
        <Link
          href="/"
          className="mb-10 flex items-center gap-2 px-2 text-2xl font-extrabold tracking-tight text-red-600"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-500/20">
            P
          </span>
          PizzaHub
        </Link>

        {/* Dashboard Title */}
        <div className="mb-5 px-3">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400">
            {role} Dashboard
          </p>
          <div className="mt-3 h-1 w-10 rounded-full bg-red-600" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-red-400"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                  className={`shrink-0 transition-transform duration-200 ${
                    active ? "text-white" : "group-hover:scale-110"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-800">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Settings size={19} />
            Settings
          </Link>

          <div className="mt-5 rounded-xl bg-red-50 p-3 dark:bg-gray-900">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400">
              PizzaHub Dashboard
            </p>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              Manage your business easily.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="relative z-40 w-full bg-white p-3 shadow-sm dark:bg-gray-950 sm:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-red-600"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white">
              P
            </span>
            PizzaHub
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 transition hover:bg-red-50 hover:text-red-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
            aria-label="Toggle dashboard menu"
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 top-[64px] z-40 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />

            <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-80px)] overflow-y-auto border-t border-gray-100 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-950">
              {/* Dashboard Title */}
              <div className="mb-5 px-2">
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400">
                  {role} Dashboard
                </p>
                <div className="mt-3 h-1 w-10 rounded-full bg-red-600" />
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                        active
                          ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                          : "text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-red-400"
                      }`}
                    >
                      <Icon size={19} strokeWidth={2} className="shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Settings */}
              <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-800">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Settings size={19} />
                  Settings
                </Link>

                <div className="mt-5 rounded-xl bg-red-50 p-3 dark:bg-gray-900">
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                    PizzaHub Dashboard
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                    Manage your business easily.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardSidebar;
