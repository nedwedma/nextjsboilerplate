import Link from "next/link";
import { verifySession } from "@/src/lib/dal";
import UserMenu from "./UserMenu";

async function AuthStatus() {
  const session = await verifySession();
  return (
    <div className="flex items-center gap-4">
      {session ? (
        <>
          <Link 
            href="/dashboard"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Dashboard
          </Link>
          {session.role === 'admin' && (
            <Link 
              href="/admin"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
          )}
          <UserMenu initialSession={{ user: session.user }} />
        </>
      ) : (
        <Link 
          href="/sign-in"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </Link>
      )}
    </div>
  );
}

export default async function Navigation() {
  const session = await verifySession();
  const navLinks = [
    { href: "/enterprise", label: "Enterprise" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="hidden items-center gap-8 text-sm md:flex">
      {!session && navLinks.map((link) => (
        <Link 
          key={link.href} 
          href={link.href} 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <div> 
        <AuthStatus /> 
      </div>
    </nav>
  );
} 