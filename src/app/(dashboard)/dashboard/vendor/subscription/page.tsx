// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "@/lib/auth-client";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";
// import {
//   Check,
//   Crown,
//   Loader2,
//   AlertCircle,
//   Utensils,
//   Sparkles,
// } from "lucide-react";

// interface SubscriptionData {
//   plan: "free" | "premium";
//   status: string;
//   activeItems: number;
// }

// const SubscriptionPage = () => {
//   const { data: session, isPending } = useSession();

//   const [subscription, setSubscription] = useState<SubscriptionData>({
//     plan: "free",
//     status: "active",
//     activeItems: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [upgrading, setUpgrading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const email = session?.user?.email;
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

//   useEffect(() => {
//     if (isPending) return;

//     if (!email || !apiUrl) {
//       setLoading(false);
//       return;
//     }

//     const fetchSubscription = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const token = await getTokenFromClient();

//         const response = await fetch(
//           `${apiUrl}/subscription/${encodeURIComponent(email)}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             credentials: "include",
//           },
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to load subscription");
//         }

//         setSubscription({
//           plan: data.plan,
//           status: data.status,
//           activeItems: data.activeItems,
//         });
//       } catch (error) {
//         setError(
//           error instanceof Error ? error.message : "Something went wrong",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubscription();
//   }, [email, apiUrl, isPending]);

//   const handleUpgrade = async () => {
//     try {
//       setUpgrading(true);
//       setError("");
//       setSuccess("");

//       const token = await getTokenFromClient();

//       const response = await fetch(`${apiUrl}/subscription/upgrade`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Upgrade failed");
//       }

//       setSubscription((prev) => ({
//         ...prev,
//         plan: "premium",
//         status: "active",
//       }));

//       setSuccess("Congratulations! Your Premium plan is now active.");
//     } catch (error) {
//       setError(error instanceof Error ? error.message : "Something went wrong");
//     } finally {
//       setUpgrading(false);
//     }
//   };

//   if (loading || isPending) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <Loader2 className="animate-spin text-red-500" size={35} />
//       </div>
//     );
//   }

//   const isPremium = subscription.plan === "premium";

//   const freeFeatures = [
//     "Maximum 3 active menu items",
//     "Basic vendor dashboard",
//     "Order management",
//   ];

//   const premiumFeatures = [
//     "Unlimited active menu items",
//     "Premium vendor badge",
//     "Featured menu placement",
//     "Basic vendor dashboard",
//     "Order management",
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8f9fc] px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-500">
//             <Sparkles size={17} />
//             Vendor Membership
//           </div>

//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//             Subscription Plans
//           </h1>

//           <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
//             Choose the right plan for your restaurant and grow your business
//             with more opportunities.
//           </p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//             <AlertCircle size={19} />
//             {error}
//           </div>
//         )}

//         {/* Success */}
//         {success && (
//           <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
//             {success}
//           </div>
//         )}

//         {/* Current Subscription */}
//         <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Your Current Subscription
//               </p>

//               <div className="mt-2 flex flex-wrap items-center gap-3">
//                 <h2 className="text-2xl font-extrabold capitalize text-gray-900">
//                   {subscription.plan} Plan
//                 </h2>

//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-bold ${
//                     isPremium
//                       ? "bg-amber-100 text-amber-700"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {isPremium ? "Premium Member" : "Free Member"}
//                 </span>
//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 Subscription status:{" "}
//                 <span className="font-semibold capitalize text-green-600">
//                   {subscription.status}
//                 </span>
//               </p>
//             </div>

//             <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
//                 <Utensils size={22} />
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-gray-500">
//                   Active Menu Items
//                 </p>

//                 <p className="text-xl font-extrabold text-gray-900">
//                   {subscription.activeItems}
//                   <span className="text-sm font-medium text-gray-400">
//                     {isPremium ? " / Unlimited" : " / 3"}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {!isPremium && (
//             <div className="border-t border-gray-100 px-5 py-4 sm:px-7">
//               <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
//                 <span>Free Plan Usage</span>
//                 <span>{Math.min(subscription.activeItems, 3)} of 3 items</span>
//               </div>

//               <div className="h-2 overflow-hidden rounded-full bg-gray-100">
//                 <div
//                   className="h-full rounded-full bg-red-500 transition-all"
//                   style={{
//                     width: `${Math.min(
//                       (subscription.activeItems / 3) * 100,
//                       100,
//                     )}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Plans */}
//         <div className="grid items-stretch gap-6 md:grid-cols-2">
//           {/* Free Plan */}
//           <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
//             <div>
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
//                 <Utensils size={24} />
//               </div>

//               <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
//                 Free Plan
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-gray-500">
//                 Everything you need to get your restaurant started.
//               </p>

//               <div className="mt-6">
//                 <span className="text-4xl font-extrabold text-gray-900">
//                   ৳0
//                 </span>
//                 <span className="ml-2 text-sm text-gray-400">Forever</span>
//               </div>

//               <div className="my-7 border-t border-gray-100" />

//               <p className="mb-5 text-sm font-bold text-gray-800">
//                 Free plan includes:
//               </p>

//               <ul className="space-y-4">
//                 {freeFeatures.map((feature) => (
//                   <li
//                     key={feature}
//                     className="flex items-start gap-3 text-sm text-gray-600"
//                   >
//                     <Check
//                       size={19}
//                       className="mt-0.5 shrink-0 text-green-500"
//                     />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-auto pt-8">
//               {isPremium ? (
//                 <div className="rounded-xl bg-gray-100 py-3 text-center text-sm font-bold text-gray-500">
//                   Free Plan
//                 </div>
//               ) : (
//                 <div className="rounded-xl border border-gray-200 py-3 text-center text-sm font-bold text-gray-600">
//                   Your Current Plan
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Premium Plan */}
//           <div className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-amber-400 bg-white p-6 shadow-lg shadow-amber-100/50 sm:p-8">
//             <div className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-700">
//               RECOMMENDED
//             </div>

//             <div>
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
//                 <Crown size={25} />
//               </div>

//               <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
//                 Premium Plan
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-gray-500">
//                 Unlock more features and grow your restaurant without menu item
//                 limits.
//               </p>

//               <div className="mt-6">
//                 <span className="text-4xl font-extrabold text-gray-900">
//                   Premium
//                 </span>
//               </div>

//               <div className="my-7 border-t border-gray-100" />

//               <p className="mb-5 text-sm font-bold text-gray-800">
//                 Everything in Free, plus:
//               </p>

//               <ul className="space-y-4">
//                 {premiumFeatures.map((feature) => (
//                   <li
//                     key={feature}
//                     className="flex items-start gap-3 text-sm text-gray-600"
//                   >
//                     <Check
//                       size={19}
//                       className="mt-0.5 shrink-0 text-green-500"
//                     />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-auto pt-8">
//               {isPremium ? (
//                 <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 py-3 text-sm font-bold text-amber-700">
//                   <Crown size={18} />
//                   Your Current Plan
//                 </div>
//               ) : (
//                 <button
//                   onClick={handleUpgrade}
//                   disabled={upgrading}
//                   className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {upgrading ? (
//                     <>
//                       <Loader2 size={19} className="animate-spin" />
//                       Upgrading...
//                     </>
//                   ) : (
//                     <>
//                       <Crown size={19} />
//                       Upgrade to Premium
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <p className="mt-7 text-center text-xs leading-5 text-gray-400">
//           Need help with your subscription? Contact our support team.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;

// *****************************************************

"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import {
  Check,
  Crown,
  Loader2,
  AlertCircle,
  Utensils,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface SubscriptionData {
  plan: "free" | "premium";
  status: string;
  activeItems: number;
}

const SubscriptionPage = () => {
  const { data: session, isPending } = useSession();

  const [subscription, setSubscription] = useState<SubscriptionData>({
    plan: "free",
    status: "active",
    activeItems: 0,
  });

  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const email = session?.user?.email;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  // Fetch subscription
  useEffect(() => {
    if (isPending) return;

    if (!email || !apiUrl) {
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        setLoading(true);
        setError("");

        const token = await getTokenFromClient();

        const response = await fetch(
          `${apiUrl}/subscription/${encodeURIComponent(email)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load subscription");
        }

        setSubscription({
          plan: data.plan,
          status: data.status,
          activeItems: data.activeItems,
        });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [email, apiUrl, isPending]);

  // Upgrade to Premium
  const handleUpgrade = async () => {
    try {
      setUpgrading(true);
      setError("");
      setSuccess("");

      const token = await getTokenFromClient();

      const response = await fetch(`${apiUrl}/subscription/upgrade`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upgrade failed");
      }

      setSubscription((prev) => ({
        ...prev,
        plan: "premium",
        status: "active",
      }));

      setSuccess("Congratulations! Your Premium plan is now active.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setUpgrading(false);
    }
  };

  // Loading
  if (loading || isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-red-500" size={35} />
      </div>
    );
  }

  const isPremium = subscription.plan === "premium";

  const freeFeatures = [
    "Maximum 3 menu items (Pending + Approved)",
    "Basic vendor dashboard",
    "Order management",
  ];

  const premiumFeatures = [
    "Unlimited active menu items",
    "Premium vendor badge",
    "Featured menu placement",
    "Basic vendor dashboard",
    "Order management",
  ];

  const usage = Math.min(subscription.activeItems, 3);

  const progress = Math.min((subscription.activeItems / 3) * 100, 100);

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-500">
            <Sparkles size={17} />
            Vendor Membership
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Subscription Plans
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Choose the right plan for your restaurant and grow your business
            with more opportunities.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <AlertCircle size={19} />
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            <CheckCircle2 size={19} />
            {success}
          </div>
        )}

        {/* Current Subscription */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Your Current Subscription
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-extrabold capitalize text-gray-900">
                  {subscription.plan} Plan
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isPremium
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isPremium ? "Premium Member" : "Free Member"}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Subscription status:{" "}
                <span className="font-semibold capitalize text-green-600">
                  {subscription.status}
                </span>
              </p>
            </div>

            {/* Active Items */}
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <Utensils size={22} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Active Menu Items
                </p>

                <p className="text-xl font-extrabold text-gray-900">
                  {subscription.activeItems}

                  <span className="text-sm font-medium text-gray-400">
                    {isPremium ? " / Unlimited" : " / 3"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Usage Progress */}
          {!isPremium && (
            <div className="border-t border-gray-100 px-5 py-4 sm:px-7">
              <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
                <span>Free Plan Usage</span>
                <span>{usage} of 3 items</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              {subscription.activeItems >= 3 && (
                <p className="mt-2 text-xs font-semibold text-red-500">
                  Your Free Plan limit has been reached. Upgrade to Premium to
                  add more items.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Plans */}
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <Utensils size={24} />
              </div>

              <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
                Free Plan
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Everything you need to get your restaurant started.
              </p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  ৳0
                </span>

                <span className="ml-2 text-sm text-gray-400">Forever</span>
              </div>

              <div className="my-7 border-t border-gray-100" />

              <p className="mb-5 text-sm font-bold text-gray-800">
                Free plan includes:
              </p>

              <ul className="space-y-4">
                {freeFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <Check
                      size={19}
                      className="mt-0.5 shrink-0 text-green-500"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              {isPremium ? (
                <div className="rounded-xl bg-gray-100 py-3 text-center text-sm font-bold text-gray-500">
                  Free Plan
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 py-3 text-center text-sm font-bold text-gray-600">
                  Your Current Plan
                </div>
              )}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-amber-400 bg-white p-6 shadow-lg shadow-amber-100/50 sm:p-8">
            <div className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-700">
              RECOMMENDED
            </div>

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Crown size={25} />
              </div>

              <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
                Premium Plan
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Unlock more features and grow your restaurant without menu item
                limits.
              </p>

              {/* <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  Premium
                </span>
              </div> */}
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  Premium
                </span>
                <p className="mt-2 text-2xl font-bold text-gray-700">
                  $50
                  <span className="text-sm font-medium text-gray-500">
                    / month
                  </span>
                </p>
              </div>

              <div className="my-7 border-t border-gray-100" />

              <p className="mb-5 text-sm font-bold text-gray-800">
                Everything in Free, plus:
              </p>

              <ul className="space-y-4">
                {premiumFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <Check
                      size={19}
                      className="mt-0.5 shrink-0 text-green-500"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Upgrade Button */}
            <div className="mt-auto pt-8">
              {isPremium ? (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 py-3 text-sm font-bold text-amber-700">
                  <Crown size={18} />
                  Your Current Plan
                </div>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={upgrading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {upgrading ? (
                    <>
                      <Loader2 size={19} className="animate-spin" />
                      Upgrading...
                    </>
                  ) : (
                    <>
                      <Crown size={19} />
                      Upgrade to Premium
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="mt-7 text-center text-xs leading-5 text-gray-400">
          Need help with your subscription? Contact our support team.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
