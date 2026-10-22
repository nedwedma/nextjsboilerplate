import Link from "next/link";
import { siteConfig } from "@/src/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-gray-900">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-gray-600">{siteConfig.description}</p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-600 hover:text-blue-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/tos"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/licenses"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
