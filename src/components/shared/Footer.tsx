import React from "react";
import {
  Pizza,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

interface SocialLink {
  icon: React.ComponentType<{ size?: number }>;
  href: string;
  label: string;
}

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Menu", href: "/menu" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks: SocialLink[] = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#101010] text-white">
      <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto container px-4 pb-3 pt-5 sm:px-6 sm:pb-6 sm:pt-12 lg:px-10">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-400 to-red-600">
                <Pizza size={26} />
              </div>

              <span className="text-2xl font-extrabold sm:text-3xl">
                Pizza<span className="text-red-600">Hub</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Pizza Ordering & Delivery Platform. Enjoy delicious, freshly baked
              pizza delivered straight to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold">
              Quick Links
              <span className="mt-2 block h-1 w-10 rounded-full bg-red-500" />
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex w-fit items-center gap-2 text-sm text-gray-400 transition-all hover:translate-x-1 hover:text-red-500"
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-red-500 opacity-0 transition group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-bold">
              Contact Us
              <span className="mt-2 block h-1 w-10 rounded-full bg-red-500" />
            </h3>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-red-400" />
                <a
                  href="tel:+880123456789"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  +880 123 456 789
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-red-400" />
                <a
                  href="mailto:info@pizzahub.com"
                  className="break-all text-sm text-gray-400 transition hover:text-red-500"
                >
                  info@pizzahub.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-red-400" />
                <span className="text-sm text-gray-400">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-lg font-bold">
              Follow Us
              <span className="mt-2 block h-1 w-10 rounded-full bg-red-500" />
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-400">
              Follow us for exclusive offers and delicious updates.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-7 border-t border-white/10 pt-4 sm:mt-12 sm:pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-red-400">PizzaHub</span>. All
              rights reserved.
            </p>

            <p className="text-xs text-gray-500">
              Made with <span className="text-red-500">♥</span> for pizza
              lovers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import {
//   Pizza,
//   Phone,
//   Mail,
//   MapPin,
//   ArrowUpRight,
//   type LucideIcon,
// } from "lucide-react";
// import Link from "next/link";
// import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

// interface SocialLink {
//   icon: React.ComponentType<{ size?: number }>;
//   href: string;
//   label: string;
// }

// const quickLinks = [
//   { name: "Home", href: "/" },
//   { name: "Browse Menu", href: "/menu" },
//   { name: "About Us", href: "/about" },
//   { name: "Contact", href: "/contact" },
// ];

// const socialLinks: SocialLink[] = [
//   {
//     icon: FaFacebookF,
//     href: "https://facebook.com",
//     label: "Facebook",
//   },
//   {
//     icon: FaYoutube,
//     href: "https://youtube.com",
//     label: "YouTube",
//   },
//   {
//     icon: FaInstagram,
//     href: "https://instagram.com",
//     label: "Instagram",
//   },
// ];

// const Footer = () => {
//   return (
//     <footer className="relative overflow-hidden bg-[#101010] text-white">
//       <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />

//       <div className="relative mx-auto container px-4 pb-6 pt-10 sm:px-6 sm:pt-12 lg:px-10">
//         <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">
//           {/* Brand */}
//           <div>
//             <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
//               <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-400 to-red-600">
//                 <Pizza size={26} />
//               </div>

//               <span className="text-2xl font-extrabold sm:text-3xl">
//                 Pizza<span className="text-red-600">Hub</span>
//               </span>
//             </Link>

//             <p className="max-w-xs text-sm leading-7 text-gray-400">
//               Pizza Ordering & Delivery Platform. Enjoy delicious, freshly baked
//               pizza delivered straight to your doorstep.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="mb-5 text-lg font-bold">
//               Quick Links
//               <span className="mt-2 block h-1 w-10 rounded-full bg-red-500" />
//             </h3>

//             <ul className="space-y-3">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="group flex w-fit items-center gap-2 text-sm text-gray-400 transition-all hover:translate-x-1 hover:text-red-500"
//                   >
//                     <ArrowUpRight
//                       size={14}
//                       className="text-red-500 opacity-0 transition group-hover:opacity-100"
//                     />
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="mb-5 text-lg font-bold">
//               Contact Us
//               <span className="mt-2 block h-1 w-10 rounded-full bg-red-500" />
//             </h3>

//             <ul className="space-y-4">
//               <li className="flex items-center gap-3">
//                 <Phone size={18} className="shrink-0 text-red-400" />
//                 <a
//                   href="tel:+880123456789"
//                   className="text-sm text-gray-400 transition hover:text-red-500"
//                 >
//                   +880 123 456 789
//                 </a>
//               </li>

//               <li className="flex items-center gap-3">
//                 <Mail size={18} className="shrink-0 text-red-400" />
//                 <a
//                   href="mailto:info@pizzahub.com"
//                   className="break-all text-sm text-gray-400 transition hover:text-red-500"
//                 >
//                   info@pizzahub.com
//                 </a>
//               </li>

//               <li className="flex items-center gap-3">
//                 <MapPin size={18} className="shrink-0 text-red-400" />
//                 <span className="text-sm text-gray-400">Dhaka, Bangladesh</span>
//               </li>
//             </ul>
//           </div>

//           {/* Social */}
//           <div>
//             <h3 className="mb-5 text-lg font-bold">
//               Follow Us
//               <span className="mt-2 block h-1 w-10 rounded-full bg-red-500" />
//             </h3>

//             <p className="mb-5 text-sm leading-6 text-gray-400">
//               Follow us for exclusive offers and delicious updates.
//             </p>

//             <div className="flex items-center gap-3">
//               {socialLinks.map((social) => {
//                 const Icon = social.icon;

//                 return (
//                   <a
//                     key={social.label}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.label}
//                     className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-500 hover:text-white"
//                   >
//                     <Icon size={20} />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12">
//           <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
//             <p className="text-xs text-gray-500">
//               © {new Date().getFullYear()}{" "}
//               <span className="font-semibold text-red-400">PizzaHub</span>. All
//               rights reserved.
//             </p>

//             <p className="text-xs text-gray-500">
//               Made with <span className="text-red-500">♥</span> for pizza
//               lovers.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
