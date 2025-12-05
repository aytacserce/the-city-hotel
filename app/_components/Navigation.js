import Link from "next/link";
import { auth } from "../lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/rooms"
            className="hover:text-accent-400 transition-colors"
          >
            Rooms
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex ietms-center gap-4"
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
              <span>Account</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Account
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
