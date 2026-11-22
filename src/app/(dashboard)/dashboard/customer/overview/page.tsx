"use client";

import React, { useEffect, useState } from "react";
import { Utensils, CheckCircle2, ShoppingCart, BadgeCheck } from "lucide-react";
import pizza from "@/app/image/banner.jpg";

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
  const pendingOrderss = orders.length;

  const activeItems = products.filter((item) =>
    ["active", "approved"].includes(item.status?.toLowerCase() || ""),
  ).length;

  // const pendingOrders = orders.filter(
  //   (order) => order.status?.toLowerCase() === "pending",
  // ).length;
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
    // {
    //   title: "Pending Orders",
    //   value: pendingOrders,
    //   icon: ShoppingCart,
    //   iconBg: "bg-orange-500",
    //   cardBg: "bg-gradient-to-br from-orange-50 to-white",
    //   border: "border-orange-100",
    // },
    {
      title: "Pending Orders",
      value: pendingOrderss,
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
          className="relative mb-6 flex min-h-[120px] items-center overflow-hidden rounded-2xl border border-orange-100 bg-cover bg-center px-5 py-6 shadow-sm sm:px-8"
          style={{
            backgroundImage: `linear-gradient(90deg, #fff7f2 0%, rgba(255,247,242,0.96) 35%, rgba(255,247,242,0.2) 100%), url("${pizza.src}")`,
          }}
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

// *************************************************************

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Utensils,
//   CheckCircle2,
//   ShoppingCart,
//   BadgeCheck,
//   CalendarDays,
//   MapPin,
// } from "lucide-react";

// import pizza from "@/app/image/banner.jpg";

// interface Product {
//   _id: string;
//   itemName: string;
//   status?: string;
//   imageUrl?: string;
// }

// interface Order {
//   _id: string;
//   productId?: string;
//   itemName: string;
//   price: number;
//   imageUrl?: string;
//   deliveryDate: string;
//   deliveryAddress: string;
//   instructions?: string;
//   status?: string;
// }

// const OverviewPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Dashboard Data
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch Products and Orders
//         const [productRes, orderRes] = await Promise.all([
//           fetch(`${process.env.NEXT_PUBLIC_API_URL}/usersvendor`, {
//             cache: "no-store",
//           }),

//           fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
//             cache: "no-store",
//           }),
//         ]);

//         if (!productRes.ok || !orderRes.ok) {
//           throw new Error("Failed to fetch dashboard data");
//         }

//         const productData = await productRes.json();
//         const orderData = await orderRes.json();

//         // Set Products
//         setProducts(
//           Array.isArray(productData) ? productData : productData.data || [],
//         );

//         // Set Orders
//         const fetchedOrders = Array.isArray(orderData)
//           ? orderData
//           : orderData.data || [];

//         setOrders(fetchedOrders);

//         // Check API Data in Console
//         console.log("Orders Data:", fetchedOrders);
//         console.log("Products Data:", productData);
//       } catch (error) {
//         console.error("Dashboard Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Calculate Statistics
//   const totalItems = products.length;

//   // Total Orders
//   const pendingOrderss = orders.length;

//   // Active Items
//   const activeItems = products.filter((item) =>
//     ["active", "approved"].includes(item.status?.toLowerCase() || ""),
//   ).length;

//   // Pending Orders
//   const pendingOrders = orders.filter(
//     (order) => order.status?.toLowerCase() === "pending",
//   );

//   // Accepted Orders
//   const acceptedOrders = orders.filter(
//     (order) => order.status?.toLowerCase() === "accepted",
//   ).length;

//   // Dashboard Statistics
//   const stats = [
//     {
//       title: "Total Items",
//       value: totalItems,
//       icon: Utensils,
//       iconBg: "bg-rose-500",
//       cardBg: "bg-gradient-to-br from-rose-50 to-white",
//       border: "border-rose-100",
//     },
//     {
//       title: "Active Items",
//       value: activeItems,
//       icon: CheckCircle2,
//       iconBg: "bg-green-500",
//       cardBg: "bg-gradient-to-br from-green-50 to-white",
//       border: "border-green-100",
//     },
//     {
//       title: "Pending Orders",
//       value: pendingOrderss,
//       icon: ShoppingCart,
//       iconBg: "bg-orange-500",
//       cardBg: "bg-gradient-to-br from-orange-50 to-white",
//       border: "border-orange-100",
//     },
//     {
//       title: "Accepted Orders",
//       value: acceptedOrders,
//       icon: BadgeCheck,
//       iconBg: "bg-violet-600",
//       cardBg: "bg-gradient-to-br from-violet-50 to-white",
//       border: "border-violet-100",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex min-h-60 items-center justify-center">
//         <span className="loading loading-spinner loading-lg text-orange-500"></span>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-[#faf9f6] p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Welcome Banner */}
//         <div
//           className="relative mb-6 flex min-h-[120px] items-center overflow-hidden rounded-2xl border border-orange-100 bg-cover bg-center px-5 py-6 shadow-sm sm:px-8"
//           style={{
//             backgroundImage: `linear-gradient(90deg, #fff7f2 0%, rgba(255,247,242,0.96) 35%, rgba(255,247,242,0.2) 100%), url("${pizza.src}")`,
//           }}
//         >
//           <div className="relative z-10">
//             <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
//               Welcome back,
//               <br />
//               Pizza Palace! 👋
//             </h1>

//             <p className="mt-2 text-sm font-medium text-gray-700 sm:text-base">
//               Manage your restaurant and orders
//             </p>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {stats.map((stat) => {
//             const Icon = stat.icon;

//             return (
//               <div
//                 key={stat.title}
//                 className={`flex items-center gap-4 rounded-2xl border ${stat.border} ${stat.cardBg} p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5`}
//               >
//                 {/* Icon */}
//                 <div
//                   className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg} text-white shadow-md`}
//                 >
//                   <Icon size={23} strokeWidth={2.5} />
//                 </div>

//                 {/* Information */}
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500">
//                     {stat.title}
//                   </p>

//                   <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
//                     {stat.value}
//                   </h2>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Pending Orders Section */}
//         <div className="mt-8">
//           {/* Header */}
//           <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
//                 Pending Orders
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 Recently placed customer orders
//               </p>
//             </div>

//             <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
//               {pendingOrders.length} Orders
//             </span>
//           </div>

//           {/* Orders Cards */}
//           <div className="space-y-3">
//             {pendingOrders.length > 0 ? (
//               pendingOrders.map((order) => (
//                 <div
//                   key={order._id}
//                   className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-4"
//                 >
//                   {/* Product Information */}
//                   <div className="flex min-w-0 items-center gap-3 sm:gap-4">
//                     {/* Product Image */}
//                     <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-orange-50 sm:h-16 sm:w-16">
//                       {order.imageUrl ? (
//                         <img
//                           src={order.imageUrl}
//                           alt={order.itemName || "Food"}
//                           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center">
//                           <Utensils size={24} className="text-orange-400" />
//                         </div>
//                       )}
//                     </div>

//                     {/* Order Details */}
//                     <div className="min-w-0">
//                       <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
//                         {order.itemName || "Unknown Item"}
//                       </h3>

//                       <p className="mt-1 text-sm font-semibold text-orange-600">
//                         ${order.price ?? 0}
//                       </p>

//                       <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
//                         {/* Delivery Date */}
//                         <span className="flex items-center gap-1">
//                           <CalendarDays size={13} />
//                           {order.deliveryDate
//                             ? new Date(order.deliveryDate).toLocaleDateString()
//                             : "No date"}
//                         </span>

//                         {/* Delivery Address */}
//                         <span className="flex items-center gap-1">
//                           <MapPin size={13} />
//                           {order.deliveryAddress || "No address"}
//                         </span>
//                       </div>

//                       {/* Instructions */}
//                       {order.instructions && (
//                         <p className="mt-1 truncate text-xs text-gray-400">
//                           Note: {order.instructions}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Order Status */}
//                   <div className="flex shrink-0 justify-end">
//                     <span className="rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600">
//                       Pending
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               /* Empty State */
//               <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-12 text-center">
//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
//                   <ShoppingCart size={28} className="text-orange-400" />
//                 </div>

//                 <h3 className="mt-4 font-bold text-gray-800">
//                   No Pending Orders
//                 </h3>

//                 <p className="mt-1 text-sm text-gray-500">
//                   New pending orders will appear here.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OverviewPage;
