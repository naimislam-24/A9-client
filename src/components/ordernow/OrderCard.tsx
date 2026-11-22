"use client";

import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useSession } from "@/lib/auth-client";

interface BoockCardProps {
  product: {
    _id: string;
    itemName: string;
    price: number;
    imageUrl: string;
  };
}

const OrderCard = ({ product }: BoockCardProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = useSession();

  const userRole = session?.user?.role;
  const canOrder = userRole === "user";

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canOrder) {
      alert("Only customers can place orders!");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const orderData = {
      productId: product._id,
      itemName: product.itemName,
      price: product.price,
      imageUrl: product.imageUrl,
      deliveryDate: formData.get("deliveryDate"),
      deliveryAddress: formData.get("deliveryAddress"),
      instructions: formData.get("instructions"),
    };

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed!");
      }

      form.reset();
    } catch (error) {
      console.error("Order Error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <p className="mt-7 text-sm text-gray-500">Loading...</p>;
  }

  if (!session) {
    return (
      <p className="mt-7 rounded-lg bg-orange-50 p-4 text-sm text-orange-700">
        Please login as a customer to place an order.
      </p>
    );
  }

  if (!canOrder) {
    return (
      <p className="mt-7 rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
        Only customers can place orders.
      </p>
    );
  }

  return (
    <div>
      <form className="mt-7 space-y-4" onSubmit={handleOrder}>
        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            Delivery Date
          </label>

          <input
            type="date"
            name="deliveryDate"
            required
            min={new Date().toISOString().split("T")[0]}
            className="h-12 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            Delivery Address
          </label>

          <input
            type="text"
            name="deliveryAddress"
            placeholder="Enter your delivery address"
            required
            className="h-12 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            Special Instructions
          </label>

          <textarea
            name="instructions"
            rows={3}
            placeholder="Extra crispy, please..."
            className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />

          <p className="mt-1 text-xs text-gray-400">Optional</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ShoppingBag size={20} />

          {loading
            ? "Placing Order..."
            : `Place Order - $${Number(product.price).toFixed(2)}`}

          {!loading && <ArrowLeft className="rotate-180" size={18} />}
        </button>
      </form>
    </div>
  );
};

export default OrderCard;

// "use client";

// import { useState } from "react";
// import { ArrowLeft, ShoppingBag } from "lucide-react";

// interface BoockCardProps {
//   product: {
//     _id: string;
//     itemName: string;
//     price: number;
//     imageUrl: string;
//   };
// }

// const OrderCard = ({ product }: BoockCardProps) => {
//   const [loading, setLoading] = useState(false);

//   const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     const orderData = {
//       productId: product._id,
//       itemName: product.itemName,
//       price: product.price,
//       imageUrl: product.imageUrl,
//       deliveryDate: formData.get("deliveryDate"),
//       deliveryAddress: formData.get("deliveryAddress"),
//       instructions: formData.get("instructions"),
//     };
//     console.log("Order", orderData);

//     try {
//       setLoading(true);

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message || "Order failed!");
//       }
//       // console.log("Order Successful:", data);
//       // alert("Your order has been placed successfully!");
//       form.reset();
//     } catch (error) {
//       console.error("Order Error:", error);
//       alert(error instanceof Error ? error.message : "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form className="mt-7 space-y-4" onSubmit={handleOrder}>
//         {/* Delivery Date */}
//         <div>
//           <label className="mb-2 block text-xs font-semibold text-gray-600">
//             Delivery Date
//           </label>

//           <input
//             type="date"
//             name="deliveryDate"
//             required
//             min={new Date().toISOString().split("T")[0]}
//             className="h-12 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
//           />
//         </div>

//         {/* Delivery Address */}
//         <div>
//           <label className="mb-2 block text-xs font-semibold text-gray-600">
//             Delivery Address
//           </label>

//           <input
//             type="text"
//             name="deliveryAddress"
//             placeholder="Enter your delivery address"
//             required
//             className="h-12 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
//           />
//         </div>

//         {/* Special Instructions */}
//         <div>
//           <label className="mb-2 block text-xs font-semibold text-gray-600">
//             Special Instructions
//           </label>

//           <textarea
//             name="instructions"
//             rows={3}
//             placeholder="Extra crispy, please..."
//             className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
//           />

//           <p className="mt-1 text-xs text-gray-400">Optional</p>
//         </div>

//         {/* Place Order Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           <ShoppingBag size={20} />

//           {loading
//             ? "Placing Order..."
//             : `Place Order - $${Number(product.price).toFixed(2)}`}

//           {!loading && <ArrowLeft className="rotate-180" size={18} />}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OrderCard;
