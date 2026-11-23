// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import {
//   Clock,
//   CheckCircle2,
//   XCircle,
//   Pencil,
//   Trash2,
//   Utensils,
//   MapPin,
//   RefreshCw,
// } from "lucide-react";
// import Editvendor from "@/components/Editvendor";
// import DeleteVendor from "@/components/DeleteVendor";
// import { useSession } from "@/lib/auth-client";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";

// type TMenuItem = {
//   _id: string;
//   itemName: string;
//   category: string;
//   description: string;
//   price: number;
//   location: string;
//   imageUrl: string;
//   status?: "Pending" | "Approved" | "Rejected" | "Active";
//   approvalStatus?: "Pending" | "Approved" | "Rejected";
//   availability?: boolean;
//   isAvailable?: boolean;
// };

// // const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export default function MyMenuItems() {
//   const { data: session } = useSession();
//   // console.log(session);

//   const [items, setItems] = useState<TMenuItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const token = await getTokenFromClient();
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/usersvendor/featured/${session?.user?.email}`,
//           {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch menu items");
//         }

//         const result = await response.json();

//         setItems(Array.isArray(result) ? result : []);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         setError("Unable to load menu items. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [session?.user.email]);

//   const getStatus = (item: TMenuItem) => {
//     return item.approvalStatus || item.status || "Pending";
//   };

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "Approved":
//       case "Active":
//         return "bg-emerald-50 text-emerald-700 ring-emerald-200";

//       case "Rejected":
//         return "bg-rose-50 text-rose-700 ring-rose-200";

//       default:
//         return "bg-amber-50 text-amber-700 ring-amber-200";
//     }
//   };

//   const getAvailability = (item: TMenuItem) => {
//     return item.availability ?? item.isAvailable;
//   };

//   return (
//     <section className="min-w-0 space-y-5">
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
//             My Menu Items
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             Manage your restaurant menu and item availability.
//           </p>
//         </div>

//         <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2">
//           <Utensils size={17} className="text-orange-600" />
//           <span className="text-sm font-semibold text-orange-700">
//             {items.length} Items
//           </span>
//         </div>
//       </div>

//       {/* Main Table */}
//       <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//         {/* Table Header */}
//         <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
//           <div>
//             <h3 className="font-bold text-gray-800">All Menu Items</h3>
//             <p className="mt-1 text-xs text-gray-500">
//               Your submitted food items and approval status
//             </p>
//           </div>

//           <div className="rounded-lg bg-gray-50 p-2 text-gray-500">
//             <Utensils size={19} />
//           </div>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <RefreshCw className="animate-spin text-orange-500" size={30} />
//             <p className="mt-3 text-sm text-gray-500">Loading menu items...</p>
//           </div>
//         ) : error ? (
//           <div className="px-5 py-12 text-center">
//             <p className="text-sm font-medium text-red-500">{error}</p>
//           </div>
//         ) : items.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <Utensils size={38} className="text-gray-300" />
//             <h3 className="mt-3 font-semibold text-gray-700">
//               No Menu Items Found
//             </h3>
//             <p className="mt-1 text-sm text-gray-400">
//               Add your first menu item to get started.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Desktop & Tablet Table */}
//             <div className="hidden overflow-x-auto md:block">
//               <table className="w-full min-w-[750px] text-left">
//                 <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
//                   <tr>
//                     <th className="px-5 py-4">Image</th>
//                     <th className="px-4 py-4">Item Name</th>
//                     <th className="px-4 py-4">Category</th>
//                     <th className="px-4 py-4">Price</th>
//                     <th className="px-4 py-4">Approval Status</th>
//                     <th className="px-4 py-4">Availability</th>
//                     <th className="px-4 py-4 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">
//                   {items.map((item) => {
//                     const status = getStatus(item);
//                     const available = getAvailability(item);

//                     return (
//                       <tr
//                         key={item._id}
//                         className="transition hover:bg-orange-50/40"
//                       >
//                         {/* Image */}
//                         <td className="px-5 py-3">
//                           <div className="relative h-12 w-14 overflow-hidden rounded-xl border border-gray-100">
//                             <Image
//                               src={item.imageUrl}
//                               alt={item.itemName}
//                               fill
//                               sizes="56px"
//                               unoptimized
//                               className="object-cover"
//                             />
//                           </div>
//                         </td>

//                         {/* Name */}
//                         <td className="px-4 py-3">
//                           <p className="max-w-[150px] truncate text-sm font-semibold text-gray-800">
//                             {item.itemName}
//                           </p>
//                           <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
//                             <MapPin size={11} />
//                             {item.location}
//                           </p>
//                         </td>

//                         {/* Category */}
//                         <td className="px-4 py-3">
//                           <span className="rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-medium text-orange-700">
//                             {item.category}
//                           </span>
//                         </td>

//                         {/* Price */}
//                         <td className="px-4 py-3">
//                           <span className="text-sm font-bold text-gray-800">
//                             ${Number(item.price).toFixed(2)}
//                           </span>
//                         </td>

//                         {/* Status */}
//                         <td className="px-4 py-3">
//                           <span
//                             className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(status)}`}
//                           >
//                             {status === "Approved" || status === "Active" ? (
//                               <CheckCircle2 size={13} />
//                             ) : status === "Rejected" ? (
//                               <XCircle size={13} />
//                             ) : (
//                               <Clock size={13} />
//                             )}
//                             {status}
//                           </span>
//                         </td>

//                         {/* Availability */}
//                         <td className="px-4 py-3">
//                           {available === undefined ? (
//                             <span className="text-xs text-gray-400">
//                               Not set
//                             </span>
//                           ) : (
//                             <span
//                               className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
//                                 available
//                                   ? "bg-green-50 text-green-700"
//                                   : "bg-gray-100 text-gray-500"
//                               }`}
//                             >
//                               {available ? "Available" : "Unavailable"}
//                             </span>
//                           )}
//                         </td>

//                         {/* Actions */}
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-center gap-2">
//                             <Editvendor item={item} />

//                             {/* <button
//                               type="button"
//                               title="Delete item"
//                               // disabled
//                               className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
//                             >
//                               <Trash2 size={16} />
//                             </button> */}
//                             {/* <DeleteVendor item={item} /> */}
//                             <DeleteVendor
//                               item={item}
//                               onDelete={(id: string) => {
//                                 setItems((prevItems) =>
//                                   prevItems.filter(
//                                     (product) => product._id !== id,
//                                   ),
//                                 );
//                               }}
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Cards */}
//             <div className="space-y-3 p-3 md:hidden">
//               {items.map((item) => {
//                 const status = getStatus(item);
//                 const available = getAvailability(item);

//                 return (
//                   <div
//                     key={item._id}
//                     className="rounded-xl border border-gray-100 bg-white p-3 transition hover:border-orange-200"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
//                         <Image
//                           src={item.imageUrl}
//                           alt={item.itemName}
//                           fill
//                           sizes="64px"
//                           unoptimized
//                           className="object-cover"
//                         />
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <h3 className="truncate text-sm font-bold text-gray-900">
//                           {item.itemName}
//                         </h3>

//                         <p className="mt-1 text-xs text-gray-500">
//                           {item.category} · {item.location}
//                         </p>

//                         <p className="mt-1 text-sm font-bold text-orange-600">
//                           ${Number(item.price).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <span
//                           className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(status)}`}
//                         >
//                           {status}
//                         </span>

//                         <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
//                           {available === undefined
//                             ? "Availability not set"
//                             : available
//                               ? "Available"
//                               : "Unavailable"}
//                         </span>
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           type="button"
//                           disabled
//                           title="Edit item"
//                           className="rounded-lg bg-blue-50 p-2 text-blue-600 disabled:opacity-60"
//                         >
//                           <Pencil size={16} />
//                         </button>

//                         <button
//                           type="button"
//                           disabled
//                           title="Delete item"
//                           className="rounded-lg bg-red-50 p-2 text-red-600 disabled:opacity-60"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}

//         {/* Footer */}
//         {!loading && !error && items.length > 0 && (
//           <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
//             <p className="text-xs text-gray-500">
//               Showing {items.length} menu items
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  Utensils,
  MapPin,
  RefreshCw,
} from "lucide-react";
import Editvendor from "@/components/Editvendor";
import DeleteVendor from "@/components/DeleteVendor";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type TMenuItem = {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  status?: "Pending" | "Approved" | "Rejected" | "Active";
  approvalStatus?: "Pending" | "Approved" | "Rejected";
  availability?: boolean;
  isAvailable?: boolean;
};

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyMenuItems() {
  const { data: session } = useSession();
  // console.log(session);

  const [items, setItems] = useState<TMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError("");

        const token = await getTokenFromClient();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usersvendor/featured/${session?.user?.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const result = await response.json();

        setItems(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Unable to load menu items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [session?.user.email]);

  const getStatus = (item: TMenuItem) => {
    return item.approvalStatus || item.status || "Pending";
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
      case "Active":
        return "bg-emerald-50 text-emerald-700 ring-emerald-200";

      case "Rejected":
        return "bg-rose-50 text-rose-700 ring-rose-200";

      default:
        return "bg-amber-50 text-amber-700 ring-amber-200";
    }
  };

  const getAvailability = (item: TMenuItem) => {
    return item.availability ?? item.isAvailable;
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-full space-y-4 px-1 sm:px-2 md:max-w-[95%] md:space-y-5 lg:max-w-full lg:px-0">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            My Menu Items
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage your restaurant menu and item availability.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-2.5 py-2 sm:px-3">
          <Utensils
            size={16}
            className="text-orange-600 sm:h-[17px] sm:w-[17px]"
          />
          <span className="text-xs font-semibold text-orange-700 sm:text-sm">
            {items.length} Items
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
        {/* Table Header */}
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-3 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-800 sm:text-base">
              All Menu Items
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Your submitted food items and approval status
            </p>
          </div>

          <div className="shrink-0 rounded-lg bg-gray-50 p-2 text-gray-500">
            <Utensils size={17} className="sm:h-[19px] sm:w-[19px]" />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <RefreshCw className="animate-spin text-orange-500" size={30} />
            <p className="mt-3 text-sm text-gray-500">Loading menu items...</p>
          </div>
        ) : error ? (
          <div className="px-3 py-10 text-center sm:px-5 sm:py-12">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <Utensils size={38} className="text-gray-300" />
            <h3 className="mt-3 font-semibold text-gray-700">
              No Menu Items Found
            </h3>
            <p className="mt-1 px-3 text-center text-xs text-gray-400 sm:text-sm">
              Add your first menu item to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Image</th>
                    <th className="px-4 py-4">Item Name</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Approval Status</th>
                    <th className="px-4 py-4">Availability</th>
                    <th className="px-4 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => {
                    const status = getStatus(item);
                    const available = getAvailability(item);

                    return (
                      <tr
                        key={item._id}
                        className="transition hover:bg-orange-50/40"
                      >
                        {/* Image */}
                        <td className="px-5 py-3">
                          <div className="relative h-12 w-14 overflow-hidden rounded-xl border border-gray-100">
                            <Image
                              src={item.imageUrl}
                              alt={item.itemName}
                              fill
                              sizes="56px"
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        </td>

                        {/* Name */}
                        <td className="px-4 py-3">
                          <p className="max-w-[150px] truncate text-sm font-semibold text-gray-800">
                            {item.itemName}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                            <MapPin size={11} />
                            {item.location}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3">
                          <span className="rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-medium text-orange-700">
                            {item.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3">
                          <span className="text-sm font-bold text-gray-800">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(status)}`}
                          >
                            {status === "Approved" || status === "Active" ? (
                              <CheckCircle2 size={13} />
                            ) : status === "Rejected" ? (
                              <XCircle size={13} />
                            ) : (
                              <Clock size={13} />
                            )}
                            {status}
                          </span>
                        </td>

                        {/* Availability */}
                        <td className="px-4 py-3">
                          {available === undefined ? (
                            <span className="text-xs text-gray-400">
                              Not set
                            </span>
                          ) : (
                            <span
                              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                                available
                                  ? "bg-green-50 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {available ? "Available" : "Unavailable"}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Editvendor item={item} />

                            {/* <button
                              type="button"
                              title="Delete item"
                              // disabled
                              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <Trash2 size={16} />
                            </button> */}
                            {/* <DeleteVendor item={item} /> */}
                            <DeleteVendor
                              item={item}
                              onDelete={(id: string) => {
                                setItems((prevItems) =>
                                  prevItems.filter(
                                    (product) => product._id !== id,
                                  ),
                                );
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile & Tablet Cards */}
            <div className="mx-auto w-full max-w-[420px] space-y-3 p-2 sm:max-w-[520px] sm:p-3 md:max-w-[620px] lg:hidden">
              {items.map((item) => {
                const status = getStatus(item);
                const available = getAvailability(item);

                return (
                  <div
                    key={item._id}
                    className="w-full rounded-xl border border-gray-100 bg-white p-2.5 transition hover:border-orange-200 sm:p-3"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16 sm:rounded-xl">
                        <Image
                          src={item.imageUrl}
                          alt={item.itemName}
                          fill
                          sizes="64px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-gray-900">
                          {item.itemName}
                        </h3>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {item.category} · {item.location}
                        </p>

                        <p className="mt-1 text-sm font-bold text-orange-600">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
                      <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-inset sm:px-3 sm:text-xs ${getStatusStyle(status)}`}
                        >
                          {status}
                        </span>

                        <span className="rounded-full bg-gray-100 px-2.5 py-1.5 text-[11px] font-medium text-gray-600 sm:px-3 sm:text-xs">
                          {available === undefined
                            ? "Availability not set"
                            : available
                              ? "Available"
                              : "Unavailable"}
                        </span>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          disabled
                          title="Edit item"
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 disabled:opacity-60"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          disabled
                          title="Delete item"
                          className="rounded-lg bg-red-50 p-2 text-red-600 disabled:opacity-60"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer */}
        {!loading && !error && items.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/70 px-3 py-3 sm:px-5">
            <p className="text-xs text-gray-500">
              Showing {items.length} menu items
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
