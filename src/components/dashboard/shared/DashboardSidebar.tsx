// import Link from "next/link";
// import React from "react";

// const DashboardSidebar = () => {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <ul>
//         <li>
//           <Link href={"/dashboard/admin/usermanagement"}>Admin Page</Link>
//         </li>
//         <li>Item 2</li>
//         <li>Item 3</li>
//         <li>Item 4</li>
//       </ul>
//     </div>
//   );
// };

// export default DashboardSidebar;

// ****************************************************

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

// // User Interface
// // interface UserInfo {
// //   role: "admin" | "vendor" | "customer";
// // }

// // Menu Item Interface
// interface MenuItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
// }

// // Menu Items Interface
// interface MenuItems {
//   admin: MenuItem[];
//   vendor: MenuItem[];
//   customer: MenuItem[];
// }

// // Sidebar Menu Items
// const menuItems: MenuItems = {
//   admin: [
//     {
//       // name: "Overview",
//       name: "Admin",
//       href: "/dashboard/admin",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "User Management",
//       href: "/dashboard/admin/usermanagement",
//       icon: Users,
//     },
//     {
//       name: "Restaurant Management",
//       href: "/dashboard/admin/restaurants",
//       icon: Store,
//     },
//     {
//       name: "Order Management",
//       href: "/dashboard/admin/orders",
//       icon: ShoppingBag,
//     },
//   ],

//   vendor: [
//     {
//       // name: "Overview",
//       name: "Overview",
//       href: "/dashboard/vendor/overview",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Add Menu Item",
//       href: "/dashboard/vendor/restaurant",
//       icon: Store,
//     },
//     {
//       name: "My Menu Items",
//       href: "/dashboard/vendor/menu",
//       icon: UtensilsCrossed,
//     },
//     {
//       name: "Customer Orders",
//       href: "/dashboard/vendor/orders",
//       icon: ClipboardList,
//     },
//     {
//       name: "Subscription",
//       href: "/dashboard/vendor/orders",
//       icon: ClipboardList,
//     },
//   ],

//   customer: [
//     {
//       // name: "Overview",
//       name: "Customar",
//       href: "/dashboard/customer",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Orders",
//       href: "/dashboard/customer/orders",
//       icon: ShoppingBag,
//     },
//     {
//       name: "My Profile",
//       href: "/dashboard/customer/profile",
//       icon: User,
//     },
//   ],
// };

// const DashboardSidebar = () => {
//   const pathname = usePathname();

//   const { data: session, isPending } = useSession();

//   // const role = session?.user?.role;
//   // console.log("User", role);
//   const userRole = session?.user?.role;
//   const role = userRole === "user" ? "customer" : userRole;
//   console.log(role);

//   if (isPending) {
//     return (
//       <aside className="w-64 min-h-screen p-5">
//         <p className="text-sm text-gray-500">Loading dashboard...</p>
//       </aside>
//     );
//   }

//   if (!role || !["admin", "vendor", "customer"].includes(role)) {
//     return (
//       <aside className="w-64 min-h-screen p-5">
//         <p className="text-sm text-red-500">Unauthorized Access</p>
//       </aside>
//     );
//   }

//   const items = menuItems[role as keyof MenuItems];

//   return (
//     <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
//       {/* Logo */}
//       <Link href="/" className="mb-10 text-2xl font-bold text-orange-500">
//         PizzaHub
//       </Link>

//       {/* Dashboard Title */}
//       <div className="mb-5">
//         <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//           {role} Dashboard
//         </p>
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
//               className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
//                 active
//                   ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
//                   : "text-gray-600 hover:bg-orange-50 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-gray-800"
//               }`}
//             >
//               <Icon size={19} />
//               <span>{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Settings */}
//       <Link
//         href="/dashboard/settings"
//         className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//       >
//         <Settings size={19} />
//         Settings
//       </Link>
//     </aside>
//   );
// };

// export default DashboardSidebar;

// *********************************************

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingBag,
  UtensilsCrossed,
  ClipboardList,
  User,
  Settings,
  LucideIcon,
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
      name: "Admin",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "User Management",
      href: "/dashboard/admin/usermanagement",
      icon: Users,
    },
    {
      name: "Restaurant Management",
      href: "/dashboard/admin/restaurants",
      icon: Store,
    },
    {
      name: "Order Management",
      href: "/dashboard/admin/orders",
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
    // {
    //   name: "My Profile",
    //   href: "/dashboard/customer/profile",
    //   icon: User,
    // },
  ],
};

const DashboardSidebar = () => {
  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  const userRole = session?.user?.role;
  const role = userRole === "user" ? "customer" : userRole;

  if (isPending) {
    return (
      <aside className="min-h-screen w-full p-5">
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      </aside>
    );
  }

  if (!role || !["admin", "vendor", "customer"].includes(role)) {
    return (
      <aside className="min-h-screen w-full p-5">
        <p className="text-sm text-red-500">Unauthorized Access</p>
      </aside>
    );
  }

  const items = menuItems[role as keyof MenuItems];

  return (
    <aside className="sticky top-0 flex h-screen w-full flex-col overflow-y-auto bg-white p-4 dark:bg-gray-950 sm:p-5">
      {/* Logo */}
      <Link
        href="/"
        className="mb-10 flex items-center gap-2 px-2 text-2xl font-extrabold tracking-tight text-orange-500"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
          P
        </span>
        PizzaHub
      </Link>

      {/* Dashboard Title */}
      <div className="mb-5 px-3">
        <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400">
          {role} Dashboard
        </p>
        <div className="mt-3 h-1 w-10 rounded-full bg-orange-500" />
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
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-400"
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
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-orange-50 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Settings size={19} />
          Settings
        </Link>

        <div className="mt-5 rounded-xl bg-orange-50 p-3 dark:bg-gray-900">
          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
            PizzaHub Dashboard
          </p>
          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            Manage your business easily.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
