import { Metadata } from "next";
import Link from "next/link";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://gopump.co
// - Name: Pump
// - Description: An application responsible for help Personal Trainers and People that like to go to the gym improve their performance.
// - User data collected: name, email, phone, and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: To know better our clients
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: official@gopump.co

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata: Metadata = {
  title: "Privacy Policy | Antimetal",
  description: "Privacy Policy for Antimetal services and website",
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
            Last updated: March 6, 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Welcome to Antimetal. Your privacy is of utmost importance to us. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to protect it.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">1. Collection and Use of Information</h2>
          
          <p>We collect the following types of information:</p>
          
          <p><strong>Personal Data:</strong> This includes your name, email address, phone number, and payment information. We collect this data to better understand and serve our customers.</p>
          
          <p><strong>Non-Personal Data:</strong> We use web cookies to enhance your experience on our website. These cookies help us understand user behavior on our site but do not collect personal information.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">2. Purpose of Data Collection</h2>
          
          <p>The primary purpose of data collection is to improve our services and provide a personalized experience for our users. Understanding our customers helps us enhance our application and offer more tailored guidance and support.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">3. Data Sharing and Disclosure</h2>
          
          <p>Antimetal respects your privacy. We do not share your personal data with third parties. Any data collected is exclusively for the purpose of improving our service and is not shared externally.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">4. Children&apos;s Privacy</h2>
          
          <p>Our services are not directed at children under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have inadvertently received personal information from a child under the age of 13, we will delete such information from our records.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">5. Changes to Our Privacy Policy</h2>
          
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You will also be informed of any significant changes via the email address you have provided us.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">6. Contact Us</h2>
          
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@antimetal.com" className="text-blue-600 hover:text-blue-800 transition">contact@antimetal.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
