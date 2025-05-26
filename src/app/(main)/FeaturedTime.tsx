import { Check, ArrowDown } from "lucide-react";
import {
  FaHackerNews,
  FaProductHunt,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

export default function FeaturedTime() {
  const features = [
    { title: "Authentication", description: "Google OAuth and session management" },
    { title: "API Routes", description: "Pre-configured API endpoints with validation" },
    { title: "Database", description: "Prisma ORM with PostgreSQL setup" },
    { title: "UI Components", description: "Modern, responsive UI components" },
    { title: "Email Integration", description: "Ready-to-use email templates and sending" },
    { title: "Deployment", description: "Optimized for Vercel and other platforms" },
  ];

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Featured section */}
        <div className="text-center space-y-6">
          <p className="text-gray-600 text-lg uppercase tracking-wider mb-6 font-medium">
            Trusted by developers from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-gray-700">
              <FaHackerNews className="w-6 h-6" />
              <span className="text-base font-medium">Hacker News</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaProductHunt className="w-6 h-6" />
              <span className="text-base font-medium">Product Hunt</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaTwitter className="w-6 h-6" />
              <span className="text-base font-medium">Twitter</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaGithub className="w-6 h-6" />
              <span className="text-base font-medium">GitHub</span>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Everything you need to build faster</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stop wasting time on boilerplate setup. Our Next.js template includes all the essentials.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#f8fafc] p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-[#e6f2ff] p-2 rounded-md">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom arrow */}
        <div className="text-center text-gray-600 pt-8">
          <ArrowDown className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-medium">Explore more features below</p>
        </div>
      </div>
    </div>
  );
}
