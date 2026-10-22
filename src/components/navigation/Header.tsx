import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { siteConfig } from "@/src/lib/site-config";

export default function Header() {
  return (
    <header className="top-0 z-50 w-full bg-[#e6f2ff]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt={`${siteConfig.name} Logo`}
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-lg font-semibold text-gray-800">{siteConfig.name}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
} 