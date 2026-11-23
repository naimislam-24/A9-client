// "use client";

// import { useState } from "react";
// import { ArrowLeft, ShoppingBag } from "lucide-react";
// import { useSession } from "@/lib/auth-client";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";

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
//   const { data: session, isPending } = useSession();

//   const userRole = session?.user?.role;
//   const canOrder = userRole === "user";

//   const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!canOrder) {
//       alert("Only customers can place orders!");
//       return;
//     }

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

//     try {
//       setLoading(true);
//       const token = getTokenFromClient();

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(orderData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Order failed!");
//       }

//       form.reset();
//     } catch (error) {
//       console.error("Order Error:", error);
//       alert(error instanceof Error ? error.message : "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isPending) {
//     return <p className="mt-7 text-sm text-gray-500">Loading...</p>;
//   }

//   if (!session) {
//     return (
//       <p className="mt-7 rounded-lg bg-orange-50 p-4 text-sm text-orange-700">
//         Please login as a customer to place an order.
//       </p>
//     );
//   }

//   if (!canOrder) {
//     return (
//       <p className="mt-7 rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
//         Only customers can place orders.
//       </p>
//     );
//   }

//   return (
//     <div>
//       <form className="mt-7 space-y-4" onSubmit={handleOrder}>
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
// ********************************************************

"use client";

import { useState } from "react";
import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  X,
  CreditCard,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BoockCardProps {
  product: {
    _id: string;
    itemName: string;
    price: number;
    imageUrl: string;
  };
}

interface OrderData {
  productId: string;
  itemName: string;
  price: number;
  imageUrl: string;
  deliveryDate: FormDataEntryValue | null;
  deliveryAddress: FormDataEntryValue | null;
  instructions: FormDataEntryValue | null;
}

const OrderCard = ({ product }: BoockCardProps) => {
  const [loading, setLoading] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<OrderData | null>(null);

  const { data: session, isPending } = useSession();

  const userRole = session?.user?.role;
  const canOrder = userRole === "user";

  // Open checkout popup
  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canOrder) {
      alert("Only customers can place orders!");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const orderData: OrderData = {
      productId: product._id,
      itemName: product.itemName,
      price: product.price,
      imageUrl: product.imageUrl,
      deliveryDate: formData.get("deliveryDate"),
      deliveryAddress: formData.get("deliveryAddress"),
      instructions: formData.get("instructions"),
    };

    setPendingOrder(orderData);
    setOpenCheckout(true);
  };

  // Confirm payment and create order
  const handlePayment = async () => {
    if (!pendingOrder) return;

    try {
      setLoading(true);

      const token = await getTokenFromClient();
      // console.log("My token", token);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pendingOrder),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed!");
      }

      alert("Order placed successfully!");

      setOpenCheckout(false);
      setPendingOrder(null);

      // Reset order form
      const form = document.getElementById(
        "order-form",
      ) as HTMLFormElement | null;

      form?.reset();
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
      {/* Order Form */}
      <form id="order-form" className="mt-7 space-y-4" onSubmit={handleOrder}>
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
            className="h-12 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]"
        >
          <ShoppingBag size={20} />
          Place Order - ${Number(product.price).toFixed(2)}
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Secure Checkout Popup */}
      <Dialog
        open={openCheckout}
        onOpenChange={(value) => {
          if (!loading) setOpenCheckout(value);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-h-[90vh] overflow-y-auto border-0 bg-[#fffaf5] p-0 sm:max-w-[430px]"
        >
          <div className="p-5 sm:p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white">
                <ShoppingBag size={20} />
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={() => setOpenCheckout(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-[#29221e]">
              Secure demo checkout
            </h2>

            {/* Demo Payment Info */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <ShieldCheck size={23} />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-800">
                    Demo payment
                  </h4>

                  <p className="text-[10px] text-gray-500">
                    No real card or money is used
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-[9px] font-bold text-orange-600">
                TEST MODE
              </span>
            </div>

            {/* Product Details */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={product.imageUrl}
                  alt={product.itemName}
                  className="h-12 w-12 rounded-lg object-cover"
                />

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-gray-800">
                    {product.itemName}
                  </h3>

                  <p className="text-[10px] text-gray-500">Order checkout</p>
                </div>
              </div>

              <p className="shrink-0 text-sm font-bold text-gray-800">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            {/* Demo Card */}
            <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#70422f] to-[#47251c] p-5 text-white shadow-lg">
              <div className="text-[9px] font-semibold tracking-[2px] text-white/60">
                DEMO CARD
              </div>

              <div className="mt-7 flex items-center gap-2 text-lg font-semibold tracking-widest">
                <span>••••</span>
                <span>••••</span>
                <span>••••</span>
                <span>4242</span>
              </div>

              <div className="mt-7 flex items-center justify-between text-[10px] font-medium text-white/70">
                <span>VISA</span>
                <span>12/30</span>
              </div>

              <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-5 -top-10 h-28 w-28 rounded-full border border-white/10" />
            </div>

            {/* Demo Notice */}
            <p className="mt-4 text-[10px] leading-5 text-gray-500">
              This checkout is for demonstration only. No payment is processed
              and no card details are collected.
            </p>

            {/* Payment Button */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#d94335] text-sm font-bold text-white shadow-md transition hover:bg-[#c93629] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Processing Order..."
              ) : (
                <>
                  Pay ${Number(product.price).toFixed(2)}
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Back Button */}
            <button
              type="button"
              disabled={loading}
              onClick={() => setOpenCheckout(false)}
              className="mt-4 w-full text-center text-xs font-medium text-gray-500 transition hover:text-gray-900"
            >
              Back to order details
            </button>

            <div className="mt-5 flex items-center justify-center gap-1 text-[10px] text-gray-400">
              <CreditCard size={13} />
              Secure demo checkout
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderCard;

// **************************************************

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
