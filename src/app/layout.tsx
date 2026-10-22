import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Indie Boilerplate",
  description: "A modern Next.js boilerplate for indie hackers",
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
