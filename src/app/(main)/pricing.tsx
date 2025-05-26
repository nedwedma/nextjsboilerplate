import { Check, Star } from "lucide-react";
import type React from "react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <div
      id="pricing"
      className="bg-white text-gray-800 px-4 py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4 uppercase tracking-wider">Pricing Plans</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Choose the perfect plan for your project
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All plans include core features like Next.js App Router, TypeScript, Tailwind CSS, and ESLint. 
            Upgrade for additional features and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="rounded-xl bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Starter</h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Perfect for side projects and learning
              </p>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <Feature>Next.js boilerplate</Feature>
              <Feature>Basic SEO setup</Feature>
              <Feature>Email templates</Feature>
              <Feature>Google OAuth</Feature>
              <Feature>Basic components</Feature>
              <Feature>Community support</Feature>
            </div>

            <Link
              href="https://github.com/yourusername/nextjs-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-gray-200"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="rounded-xl bg-white p-8 border-2 border-blue-500 shadow-lg relative flex flex-col h-full scale-105 z-10">
            <div className="absolute -top-4 inset-x-0 mx-auto w-max bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              Pro
              <Star className="w-5 h-5 text-yellow-500 ml-2 fill-yellow-500" />
            </h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-blue-600 text-sm mt-2 font-medium">
                Recommended for professional projects
              </p>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <Feature highlighted>Everything in Starter</Feature>
              <Feature highlighted>Advanced SEO optimization</Feature>
              <Feature highlighted>Maileroo integration</Feature>
              <Feature highlighted>Stripe payment processing</Feature>
              <Feature highlighted>PostgreSQL with Prisma</Feature>
              <Feature highlighted>Premium UI components</Feature>
              <Feature highlighted>Authentication (Google, Credentials)</Feature>
              <Feature highlighted>Priority support</Feature>
            </div>

            <Link
              href="https://github.com/yourusername/nextjs-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              Get Pro Access
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-xl bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Enterprise</h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                For large-scale applications and teams
              </p>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <Feature>Everything in Pro</Feature>
              <Feature>Custom branding</Feature>
              <Feature>Advanced analytics</Feature>
              <Feature>Multiple database support</Feature>
              <Feature>Custom integrations</Feature>
              <Feature>Team collaboration tools</Feature>
              <Feature>Dedicated support</Feature>
              <Feature>SLA guarantees</Feature>
            </div>

            <Link
              href="/contact"
              className="w-full bg-gray-800 hover:bg-gray-900 transition-colors text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto">
            All plans include updates and improvements. Need a custom solution? 
            <Link href="/contact" className="text-blue-600 font-medium ml-1 hover:underline">
              Contact us
            </Link> for custom enterprise solutions.
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ children, highlighted = false }: { children: React.ReactNode; highlighted?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <Check className={`w-5 h-5 ${highlighted ? 'text-blue-500' : 'text-gray-500'} flex-shrink-0`} />
      <span className={`${highlighted ? 'text-gray-800' : 'text-gray-600'}`}>{children}</span>
    </div>
  );
}
