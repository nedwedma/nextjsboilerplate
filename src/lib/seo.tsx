// components/SEO.tsx
import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  ogType?: "website" | "article" | "book" | "profile";
  twitterHandle?: string;
}

export function generateMetadata({
  title,
  description,
  canonicalUrl,
  ogImageUrl,
  ogType = "website",
  twitterHandle,
}: SEOProps): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Your Site Name",
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
      creator: twitterHandle,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
