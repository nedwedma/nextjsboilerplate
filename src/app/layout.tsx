import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { siteConfig } from "@/src/lib/site-config";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={cn("antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
