import type React from "react";
import Header from "@/src/components/navigation/Header";
import Footer from "@/src/components/navigation/Footer";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
