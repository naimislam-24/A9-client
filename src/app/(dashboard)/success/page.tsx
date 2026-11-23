// import { checkoutVerify } from "@/lib/actions/Payments";
// import { stripe } from "@/lib/stripe";
// import { redirect } from "next/navigation";

// export default async function SuccessPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ session_id?: string }>;
// }) {
//   const { session_id } = await searchParams;

//   if (!session_id)
//     throw new Error("Please provide a valid session_id (`cs_test_...`)");

//   const { status, payment_status, customer_email, metadata, payment_intent } =
//     await stripe.checkout.sessions.retrieve(session_id, {
//       expand: ["line_items", "payment_intent"],
//     });

//   if (status === "open") {
//     return redirect("/");
//   }

//   if (status === "complete" && payment_status === "paid") {
//     console.log(
//       status,
//       payment_status,
//       customer_email,
//       metadata,
//       payment_intent,
//     );
//     const result = await checkoutVerify(session_id);
//     console.log(result);

//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to If
//           you have any questions, please email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );
//   }
// }

import { checkoutVerify } from "@/lib/actions/Payments";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Plus, ShieldCheck } from "lucide-react";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const { status, payment_status, customer_email, metadata, payment_intent } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && payment_status === "paid") {
    console.log(
      status,
      payment_status,
      customer_email,
      metadata,
      payment_intent,
    );

    const result = await checkoutVerify(session_id);
    console.log(result);

    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 px-4 py-12">
        <section
          id="success"
          className="w-full max-w-xl overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl shadow-red-900/5"
        >
          {/* Top Section */}
          <div className="bg-gradient-to-r from-red-600 to-rose-500 px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 ring-8 ring-white/10">
              <CheckCircle2 size={44} strokeWidth={2.2} />
            </div>

            <h1 className="text-2xl font-extrabold sm:text-3xl">
              Payment Successful!
            </h1>

            <p className="mt-3 text-sm leading-6 text-red-50 sm:text-base">
              Your payment has been completed successfully.
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
            <div className="mx-auto mb-6 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-left">
              <ShieldCheck size={27} className="shrink-0 text-red-600" />

              <div>
                <p className="text-sm font-bold text-gray-800">
                  Premium Subscription
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Thank you for upgrading! Enjoy your premium benefits.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Thank You for Your Purchase!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              We appreciate your business. Your premium subscription is being
              processed. You can now continue adding menu items to your
              restaurant.
            </p>

            <Link
              href="/dashboard/vendor/addmenu"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30 sm:w-auto"
            >
              <Plus size={19} />
              Add Menu Item
            </Link>

            <p className="mt-6 text-xs text-gray-400">
              Thank you for choosing our premium service.
            </p>
          </div>
        </section>
      </main>
    );
  }
}
