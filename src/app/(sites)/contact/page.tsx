import ContactForm from '@/src/components/reusable/ContactForm';
import { generateMetadata } from '@/src/lib/seo';
import Header from "@/src/components/navigation/Header";
import Footer from "@/src/components/navigation/Footer";

export const metadata = generateMetadata({
  title: 'Contact - Your Site Name',
  description: 'Contact us for more information',
  canonicalUrl: '/contact',
});

export default function ContactPage() {
  return (
    <div className="bg-white">
      <Header />
      <div className="bg-white">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Have questions or suggestions? We are here for you and look forward to your message.
              </p>
            </div>
            
            <div className="mt-16">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 