import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Boilerplate Docs",
    default: "Documentation | Boilerplate",
  },
  description: "Documentation and guides for the Boilerplate",
};

// Navigation items for the sidebar
const navItems = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
  },
  {
    title: "Components",
    href: "/docs/components",
  },
  {
    title: "Authentication",
    href: "/docs/authentication",
  },
  {
    title: "Styling",
    href: "/docs/styling",
  },
  {
    title: "Deployment",
    href: "/docs/deployment",
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - hidden on mobile, shown on desktop */}
        <aside className="hidden md:block w-64 border-r border-gray-200 min-h-screen p-6 shrink-0">
          <Link href="/docs" className="flex items-center mb-8">
            <span className="text-xl font-bold text-gray-800">Boilerplate Docs</span>
          </Link>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="mt-12 pt-6 border-t border-gray-200">
            <Link 
              href="/"
              className="flex items-center text-sm text-gray-600 hover:text-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </aside>
        
        {/* Mobile navigation toggle - only shown on mobile */}
        <div className="md:hidden border-b border-gray-200 p-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Boilerplate Docs</span>
          </Link>
          
          <details className="relative">
            <summary className="list-none cursor-pointer p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="border-t border-gray-200 my-1"></div>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </details>
        </div>
        
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
} 