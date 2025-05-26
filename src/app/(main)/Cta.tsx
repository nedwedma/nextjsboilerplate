import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-100 p-2">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Start building your next project today
        </h2>
        <p className="mb-8 mx-auto max-w-2xl text-lg text-gray-600">
          Our Next.js boilerplate gives you everything you need to launch faster. 
          Authentication, payments, emails, and UI components — all pre-configured and ready to go.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://github.com/antimetal/nextjs-boilerplate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e9ff1a] px-6 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-[#d9ef0a]"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            View Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
