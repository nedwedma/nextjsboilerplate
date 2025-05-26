'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { authClient } from "@/src/lib/auth-client"; 
import { useRouter } from 'next/navigation';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMenu();
          router.push('/'); 
        },
      },
    });
  };

  // Navigation links for non-logged in users
  const navLinks = [
    { href: "/enterprise", label: "Enterprise" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
    { href: "/faq", label: "FAQ" },
  ];

  // Navigation links for logged in users
  const userLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <div className="md:hidden"> {/* Only show on mobile */} 
      <button onClick={toggleMenu} className="text-gray-700">
        {isMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Menu overlay */} 
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={closeMenu}></div>
      )}

      {/* Menu content */} 
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4">
          <button onClick={closeMenu} className="absolute top-4 right-4 text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>

          <nav className="mt-16 flex flex-col gap-4">
            {isPending ? (
              <div className="h-10 w-full animate-pulse bg-gray-200 rounded-md"></div>
            ) : session ? (
              <>
                {userLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-gray-700 hover:text-blue-600 py-2" 
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-4" />
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left text-red-600 hover:bg-red-50 py-2 px-2 rounded"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-gray-700 hover:text-blue-600 py-2" 
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-4" />
                <Link 
                  href="/sign-in" 
                  className="text-blue-600 hover:bg-blue-50 py-2 px-2 rounded"
                  onClick={closeMenu}
                >
                  Sign in
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
} 