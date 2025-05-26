import { Metadata } from "next";
import Link from "next/link";
import { getMarkdownContent } from "@/src/lib/markdown";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Understand the architecture and structure of the Antimetal boilerplate",
};

export default async function ArchitecturePage() {
  // Get the HTML content from the markdown file
  const contentHtml = await getMarkdownContent('/architecture');
  
  return (
    <div className="px-6 py-10 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Architecture
          </h1>
          <p className="text-gray-600">
            Understand the architecture and structure of the Antimetal boilerplate.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
        
        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between">
          <Link 
            href="/docs/getting-started" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clipRule="evenodd"
              />
            </svg>
            Previous: Getting Started
          </Link>
          <Link 
            href="/docs/components" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            Next: Components
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 