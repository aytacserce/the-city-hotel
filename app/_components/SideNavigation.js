"use client";

import {
  HomeIcon,
  CalenderDaysIcon,
  UserIcon,
  CalendarDateRangeIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "../lib/actions";

const navLinks = [
  {
    name: "Account",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDateRangeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <form action={signOutAction}>
            <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
              <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-primary-600" />
              <span>Sign out</span>
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}
