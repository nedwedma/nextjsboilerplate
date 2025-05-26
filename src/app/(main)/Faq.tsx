import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is included in the Next.js boilerplate?",
    answer:
      "Our boilerplate includes everything you need to build modern web applications: Next.js App Router, TypeScript, Tailwind CSS, Auth.js for authentication, Prisma ORM with PostgreSQL, Maileroo for emails, Stripe integration, and more.",
  },
  {
    question: "Do I need to know Next.js to use this boilerplate?",
    answer:
      "Basic knowledge of React and Next.js is helpful, but our documentation and code structure make it accessible even for developers new to the framework. The boilerplate follows best practices and includes detailed comments.",
  },
  {
    question: "How is authentication handled?",
    answer:
      "We use Auth.js (formerly NextAuth.js) to provide secure authentication with multiple providers. The boilerplate includes Google OAuth and credential-based authentication out of the box, with easy configuration for additional providers.",
  },
  {
    question: "Can I use a different database than PostgreSQL?",
    answer:
      "Yes! While we include PostgreSQL with Prisma ORM by default, you can easily switch to another database supported by Prisma such as MySQL, SQLite, or MongoDB. The schema and models are designed to be database-agnostic.",
  },
  {
    question: "Is the boilerplate suitable for production applications?",
    answer: 
      "Absolutely! The boilerplate is built with production-ready best practices, including proper error handling, security considerations, and performance optimizations. Many successful applications have been built using this foundation.",
  },
  {
    question: "How do I deploy my application?",
    answer:
      "The boilerplate is optimized for deployment on Vercel, but can be deployed on any platform that supports Next.js applications. We include deployment guides for Vercel, Netlify, and traditional hosting environments.",
  },
  {
    question: "Is there documentation available?",
    answer:
      "Yes, comprehensive documentation is included covering all aspects of the boilerplate, from setup to advanced customization. We also provide code comments and examples throughout the codebase.",
  },
  {
    question: "Can I contribute to the boilerplate?",
    answer:
      "We welcome contributions from the community! Check our GitHub repository for contribution guidelines and open issues that need attention.",
  }
];

export default function FAQ() {
  // Generate the FAQ Schema for Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* Add the schema markup as JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div
        id="faq"
        className="bg-gray-50 px-4 py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium mb-4 uppercase tracking-wider">FAQ</p>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our Next.js boilerplate. 
              Can&apos;t find the answer you&apos;re looking for?{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:underline font-medium"
              >
                Contact our team
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left">
                  <h3 className="text-lg font-medium text-gray-800">
                    {faq.question}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 pt-2 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Have more questions? Check our{" "}
              <Link
                href="/docs"
                className="text-blue-600 hover:underline font-medium"
              >
                documentation
              </Link>{" "}
              for detailed information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
