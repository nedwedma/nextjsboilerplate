import { Metadata } from "next";
import Link from "next/link";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://gopump.co
// - Name: Pump
// - Contact information: official@gopump.co
// - Description: An application responsible for help Personal Trainers and People that like to go to the gym improve their performance.
// - Ownership: when buying a plan/subscription, users can interact with many features. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email, phone and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://gopump.co/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata: Metadata = {
  title: "Terms of Service | Antimetal",
  description: "Terms of Service for Antimetal services and website",
};

const TOS = () => {
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
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: March 6, 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Welcome to Antimetal. These Terms of Service (&quot;Terms&quot;) govern your use of our application, which aims to help developers and businesses improve their performance. By accessing or using Antimetal, you agree to comply with these Terms.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">1. Contact Information</h2>
          
          <p>For any questions or information, please contact us at <a href="mailto:contact@antimetal.com" className="text-blue-600 hover:text-blue-800 transition">contact@antimetal.com</a>.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">2. Ownership and Service Usage</h2>
          
          <p>When purchasing a plan or subscription on Antimetal, you gain access to various features. If you are not satisfied, we offer a full refund within 7 days after purchase.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">3. Data Collection</h2>
          
          <p>We collect personal data such as name, email, phone, and payment information. We also use web cookies to collect non-personal data. More information can be found in our <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 transition">Privacy Policy</Link>.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">4. Applicable Law</h2>
          
          <p>These Terms are governed by the laws of the United States.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">5. Changes to Terms</h2>
          
          <p>We reserve the right to modify these Terms at any time. Changes will take effect immediately upon posting on the website. We will inform you about significant changes through the email you provided.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">6. Acceptance of Terms</h2>
          
          <p>By using Antimetal, you declare that you have read, understood, and agreed to be bound by these Terms.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">7. Limitation of Liability</h2>
          
          <p>To the maximum extent permitted by law, Antimetal shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use or inability to use the service.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">8. Account Termination</h2>
          
          <p>We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </div>
      </div>
    </div>
  );
};

export default TOS;
