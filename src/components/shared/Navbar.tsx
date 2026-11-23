"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Pizza, Menu, ArrowRight, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { signOut, useSession } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const user = session?.user;

  // User Role
  const userRole = user?.role;

  // Convert user role to customer
  const role = userRole === "user" ? "customer" : userRole;

  // Dynamic Dashboard Link
  const dashboardLink =
    role === "admin"
      ? "/dashboard/admin/overview"
      : role === "vendor"
        ? "/dashboard/vendor/overview"
        : role === "customer"
          ? "/dashboard/customer/overview"
          : "/sign-in";

  // Navigation Links
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Browse Menu",
      href: "/cards",
    },
    {
      name: "Dashboard",
      href: dashboardLink,
    },
  ];

  // Active Link
  const isLinkActive = (href: string, name: string) => {
    if (name === "Dashboard") {
      return pathname.startsWith("/dashboard");
    }

    return pathname === href;
  };

  // Logout Handler
  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 transition group-hover:rotate-12">
            <Pizza size={28} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            Pizza<span className="text-red-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href, link.name);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-all duration-200 ${
                  isActive ? "text-red-600" : "text-gray-600 hover:text-red-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication */}
        {!isPending &&
          (user ? (
            <div className="hidden items-center gap-3 md:flex">
              <Avatar className="h-10 w-10 border-2 border-red-100">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />

                <AvatarFallback>
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <Button
                onClick={handleLogout}
                className="h-11 rounded-xl bg-red-600 px-6 font-semibold text-white shadow-md shadow-red-200 transition-all hover:bg-red-700 hover:shadow-lg"
              >
                Log Out
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex">
              <Button className="h-11 rounded-xl bg-red-600 px-6 font-semibold text-white shadow-md shadow-red-200 transition-all hover:bg-red-700 hover:shadow-lg">
                <Link href="/sign-in" className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="">
                <Button
                  variant="outline"
                  className="flex h-11 w-auto items-center gap-3 rounded-xl border-orange-200 bg-white px-2.5 text-gray-800 shadow-sm hover:bg-red-50"
                  aria-label="Open navigation menu"
                >
                  {!isPending && user && (
                    <Avatar className="h-8 w-8 border border-orange-200">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />

                      <AvatarFallback className="bg-red-50 text-sm font-bold text-red-600">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <Menu className="h-6 w-6 shrink-0 text-gray-700" />
                </Button>
              </div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-orange-100 bg-white px-5"
            >
              <SheetTitle className="flex items-center gap-2 py-5 text-xl font-extrabold">
                <Pizza className="h-7 w-7 text-red-600" />
                Pizza<span className="text-red-600">Hub</span>
              </SheetTitle>

              <div className="mt-8 flex flex-col gap-3">
                {/* Mobile Links */}
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href, link.name);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`rounded-xl px-4 py-3 font-semibold transition ${
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="my-3 border-t border-orange-100" />

                {/* Mobile Authentication */}
                {!isPending &&
                  (user ? (
                    <Button
                      onClick={handleLogout}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white shadow-md shadow-red-200 transition-all hover:bg-red-700"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </Button>
                  ) : (
                    <Button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white shadow-md shadow-red-200 transition-all hover:bg-red-700">
                      <Link
                        href="/sign-in"
                        className="flex w-full items-center justify-center gap-2"
                      >
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
