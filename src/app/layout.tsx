import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body className={cn("antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
