import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/src/lib/site-config";

// Placeholder content — replace with your own Privacy Policy before going live.

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name}`,
};

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition"
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
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {siteConfig.legalLastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">1. Collection and Use of Information</h2>
          
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          
          <p><strong>Personal Data:</strong> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          
          <p><strong>Non-Personal Data:</strong> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">2. Purpose of Data Collection</h2>
          
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">3. Data Sharing and Disclosure</h2>
          
          <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">4. Children&apos;s Privacy</h2>
          
          <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">5. Changes to Our Privacy Policy</h2>
          
          <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">6. Contact Us</h2>
          
          <p>At vero eos et accusamus et iusto odio dignissimos: <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-600 hover:text-blue-800 transition">{siteConfig.contactEmail}</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
