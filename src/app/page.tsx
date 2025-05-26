import CTA from "@/src/app/(main)/Cta";
import FAQ from "@/src/app/(main)/Faq";
import FeaturedTime from "@/src/app/(main)/FeaturedTime";
import Footer from "@/src/components/navigation/Footer";
import HeroSection from "@/src/app/(main)/Hero";
import FeatureSection from "@/src/app/(main)/FeatureSection";
import PricingSection from "@/src/app/(main)/pricing";
import TestimonialsPage from "@/src/app/(main)/Testimonials";
import Header from "@/src/components/navigation/Header";
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Your Site Name - Home",
  description: "Welcome to our amazing platform",
  canonicalUrl: "/",
  ogImageUrl: "/og-image.png",
  twitterHandle: "yourhandle",
});

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <FeaturedTime />
      <FeatureSection />
      <PricingSection />
      <FAQ />
      <TestimonialsPage />
      <CTA />
      <Footer />
    </div>
  );
}
