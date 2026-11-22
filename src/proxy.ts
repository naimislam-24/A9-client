import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/customer/overview",
    "/cards/:path",
    "/dashboard/vendor/addmenu",
    "/dashboard/vendor/customer",
    "/dashboard/vendor/mymenu",
    "/dashboard/vendor/overview",
    "/dashboard/vendor/subscription",
    "/dashboard/customer/myorders",
    "/dashboard/admin/managemenuitem",
    "/dashboard/admin/manageusers",
    "/dashboard/admin/overview",
    "/dashboard/admin/transactions",
  ], // Specify the routes the middleware applies to
};
