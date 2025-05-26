import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation | Antimetal",
  description: "Documentation and guides for the Antimetal boilerplate",
};

export default function DocsPage() {
  return (
    <div className="px-6 py-10 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Documentation
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Welcome to the Antimetal documentation. Here you&apos;ll find comprehensive guides and documentation to help you get started with the Antimetal boilerplate as quickly as possible.
          </p>
        </div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Link href="/docs/getting-started" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition">Getting Started</h2>
              <p className="text-gray-600">Learn how to set up and run the Antimetal boilerplate for your project.</p>
            </div>
          </Link>
          
          <Link href="/docs/architecture" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition">Architecture</h2>
              <p className="text-gray-600">Understand the architecture and structure of the Antimetal boilerplate.</p>
            </div>
          </Link>
          
          <Link href="/docs/components" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition">Components</h2>
              <p className="text-gray-600">Explore the pre-built components and how to use them in your application.</p>
            </div>
          </Link>
          
          <Link href="/docs/authentication" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition">Authentication</h2>
              <p className="text-gray-600">Learn how to implement and customize authentication in your application.</p>
            </div>
          </Link>
          
          <Link href="/docs/styling" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition">Styling</h2>
              <p className="text-gray-600">Discover how to customize the look and feel of your application.</p>
            </div>
          </Link>
          
          <Link href="/docs/deployment" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition">Deployment</h2>
              <p className="text-gray-600">Learn how to deploy your application to various hosting platforms.</p>
            </div>
          </Link>
        </div>

        {/* Additional Resources */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">GitHub Repository</h3>
              <p className="text-gray-600 mb-4">
                Check out the source code and contribute to the project on GitHub.
              </p>
              <a 
                href="https://github.com/yourusername/antimetal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                View on GitHub →
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you&apos;re stuck or have questions, feel free to reach out for support.
              </p>
              <Link 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}